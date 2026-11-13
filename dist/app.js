
const app = document.querySelector('#app');
const zone = 'America/Santiago';
const dateKey = date => new Intl.DateTimeFormat('sv-SE', {timeZone: zone}).format(date);
const stamp = date => new Intl.DateTimeFormat('es-CL', {dateStyle:'medium',timeStyle:'short',timeZone:zone}).format(date);
const percent = (right,total) => total ? Math.round(100 * right / total) : 0;
const pct = n => n + '%';
const questionCount = exams.reduce((sum,e) => sum + e.questions.length,0);
const byCode = Object.fromEntries(exams.map(e => [e.code,e]));
const bank = Object.fromEntries(exams.flatMap(e => e.questions).map(q => [q.id,q]));
const key = 'cloudprep.v1';
let state = {attempts:[], active:null};
try {
  const saved = JSON.parse(localStorage.getItem(key));
  if (saved && Array.isArray(saved.attempts)) state = saved;
} catch {
  document.querySelector('#storage').hidden = false;
}
let filters = {search:'', provider:'', level:''};

function save() {
  try { localStorage.setItem(key,JSON.stringify(state)); }
  catch { document.querySelector('#storage').hidden = false; }
}

function shuffled(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i],copy[j]] = [copy[j],copy[i]];
  }
  return copy;
}

function sampleExam(exam, size, language = 'es') {
  const original = language === 'en' ? [] : exam.questions.filter(q => !q.concept);
  const variants = new Map();
  for (const q of exam.questions) {
    if (!q.concept) continue;
    if (!variants.has(q.concept)) variants.set(q.concept, []);
    variants.get(q.concept).push(q);
  }
  const groups = [...variants.values()].map(shuffled);
  const ordered = [0, 1, 2].flatMap(index => shuffled(groups.map(group => group[index])));
  return shuffled([...original, ...ordered].slice(0, size));
}

function languagePicker(language = 'es') {
  return '<label class="row subtle">Idioma del examen <select class="field" data-language>' +
    '<option value="es"' + (language === 'es' ? ' selected' : '') + '>Español</option>' +
    '<option value="en"' + (language === 'en' ? ' selected' : '') + '>English</option></select></label>';
}

function questionText(q, language) {
  if (language !== 'en' || !q.en) return q;
  return {...q, ...q.en, correct:q.en.choices[0]};
}

function missedQuestions(attempt) {
  return [...new Set(attempt.items.filter(item => item.answer && !item.right).map(item => item.id))]
    .map(id => bank[id]).filter(Boolean);
}

function startReview(id) {
  const attempt = state.attempts.find(entry => entry.id === id);
  if (!attempt) return;
  if (state.active?.reviewOf === id) {
    location.hash = 'simulacro';
    return;
  }
  const questions = missedQuestions(attempt);
  if (!questions.length || (state.active && !confirm('Hay una práctica en curso. ¿Reemplazarla por este repaso?'))) return;
  openAttempt(attempt.code, attempt.language || 'es', questions, null, id);
}

function start(code, size, language = 'es') {
  const exam = byCode[code];
  if (!exam) return;
  const count = exam.provider === 'Azure' && [40,50,60].includes(size) ? size : exam.size;
  if (state.active) {
    if (!state.active.reviewOf && state.active.code === code && state.active.items.length >= 40 && (state.active.language || 'es') === language && state.active.items.length === count) { location.hash = 'simulacro'; return; }
    const message = state.active.items.length < 40
      ? 'Tienes un intento breve de la versión anterior. ¿Reemplazarlo por un simulacro completo?'
      : 'Hay un simulacro en curso. ¿Reemplazarlo por este?';
    if (!confirm(message)) return;
  }
  openAttempt(code, language, sampleExam(exam,count,language), Date.now() + exam.duration * 60000);
}

function openAttempt(code, language, questions, end, reviewOf = null) {
  const now = Date.now();
  state.active = {
    id: now.toString(36) + Math.random().toString(36).slice(2), code,
    end, index:0, answers:{}, language, reviewOf,
    items: questions.map(q => ({id:q.id, choices:shuffled(questionText(q,language).choices)}))
  };
  save();
  if (!reviewOf) trackExam(code);
  location.hash = 'simulacro';
}

function complete() {
  const active = state.active;
  if (!active) return;
  const items = active.items.map(item => {
    const q = questionText(bank[item.id],active.language);
    const answer = active.answers[item.id] || '';
    return {id:item.id, area:q.area, prompt:q.prompt, answer, correct:q.correct, reason:q.reason, right:answer === q.correct};
  });
  const ended = Math.min(Date.now(),active.end ?? Infinity);
  const result = {
    id:active.id, code:active.code, reviewOf:active.reviewOf, language:active.language || 'es', ended, day:dateKey(new Date(ended)), items,
    right:items.filter(i => i.right).length, total:items.length
  };
  state.attempts.unshift(result);
  state.active = null;
  save();
  location.hash = 'resultado/' + result.id;
}

function progress(exam) {
  const seen = new Set();
  for (const attempt of state.attempts) {
    if (attempt.code !== exam.code) continue;
    for (const item of attempt.items) if (item.right && bank[item.id]) seen.add(item.id);
  }
  return percent(seen.size, exam.questions.length);
}

const meter = (value,label) => '<progress class="meter" max="100" value="' + value + '" aria-label="' + escapeText(label) + '"></progress>';
const button = (label, action, cls='') => '<button class="btn ' + cls + '" ' + action + '>' + label + '</button>';
const badge = e => '<span class="badge ' + e.provider.toLowerCase() + '">' + e.provider + '</span>';
const empty = (title,desc) => '<div class="blank"><strong>' + title + '</strong>' + desc + '</div>';

function card(e) {
  const value = progress(e);
  const active = state.active?.code === e.code ? state.active : null;
  return '<article class="cert"><div class="row">' + badge(e) + '<span class="code">' + e.code + '</span></div><h3>' +
    e.name + '</h3><small class="meta">' + e.level + ' · ' + (e.provider === 'Azure' ? '40–60' : e.size) + ' preguntas · ' + e.duration +
    ' min</small>' + (e.prerequisite ? '<small>' + e.prerequisite + '</small>' : '') +
    '<div class="row subtle"><span>Banco dominado</span><strong>' + pct(value) + '</strong></div>' +
    meter(value,'Banco dominado de ' + e.code) +
    (e.provider === 'Azure'
      ? '<label class="row subtle">Preguntas del simulacro <select class="field" data-size>' +
        [40,50,60].map(size => '<option' + (size === (active && !active.reviewOf && active.items.length >= 40 ? active.items.length : 50) ? ' selected' : '') + '>' + size + '</option>').join('') +
        '</select></label>' : '') + languagePicker(active?.language) +
    '<div class="row">' +
    button(active && !active.reviewOf && active.items.length >= 40 ? 'Continuar' : 'Iniciar simulacro', 'data-start="' + e.code + '"') +
    '<a class="subtle" target="_blank" rel="noopener" href="' + e.url + '">Guía oficial ↗</a></div></article>';
}

function accuracy(attempts) {
  return percent(attempts.reduce((sum,a) => sum + a.right,0),attempts.reduce((sum,a) => sum + a.total,0));
}

function analytics(attempts = state.attempts.filter(attempt => !attempt.reviewOf)) {
  const daily = new Map();
  const skills = new Map();
  const recent = [...attempts].sort((a,b) => b.ended - a.ended);
  for (const a of recent) {
    if (!daily.has(a.day)) daily.set(a.day,[]);
    daily.get(a.day).push(a);
    for (const item of a.items) {
      if (!skills.has(item.area)) skills.set(item.area,new Map());
      const entries = skills.get(item.area);
      if (!entries.has(item.id)) entries.set(item.id,item.right);
    }
  }
  const ranked = [...skills].map(([area,entries]) => {
    const sample = [...entries.values()];
    return {area, total:sample.length, score:percent(sample.filter(Boolean).length,sample.length)};
  }).sort((a,b) => b.score - a.score || b.total - a.total || a.area.localeCompare(b.area));
  return {daily, ranked};
}

function dailyChart(daily, dates) {
  return '<div class="trend">' + dates.map(date => {
    const data = daily.get(dateKey(date));
    const value = data ? accuracy(data) : null;
    const label = new Intl.DateTimeFormat('es-CL',{weekday:'short',timeZone:zone}).format(date) + ' ' + date.getUTCDate();
    return '<div class="day" aria-label="' + label + ': ' + (value === null ? 'sin práctica' : pct(value)) + '">' +
      '<strong>' + (value === null ? '—' : pct(value)) + '</strong><div class="track" aria-hidden="true"><b ' +
      (value === null ? 'class="no-data"' : 'style="height:' + Math.max(value,2) + '%"') + '></b></div>' +
      label + '</div>';
  }).join('') + '</div>';
}

function providerProgress(provider, dates) {
  const catalog = exams.filter(exam => exam.provider === provider);
  const attempts = state.attempts.filter(attempt => !attempt.reviewOf && byCode[attempt.code]?.provider === provider);
  const practiced = new Set(attempts.map(attempt => byCode[attempt.code].name)).size;
  const total = new Set(catalog.map(exam => exam.name)).size;
  const coverage = percent(practiced,total);
  const {daily} = analytics(attempts);
  return '<article class="panel provider-panel ' + provider.toLowerCase() + '-progress"><div class="panel-head"><h3>' +
    provider + '</h3><small>' + (attempts.length ? pct(accuracy(attempts)) + ' de aciertos acumulados' : 'Sin simulacros completados') +
    '</small></div><div class="row subtle"><span>Certificaciones practicadas</span><strong>' + practiced + '/' + total +
    ' · ' + pct(coverage) + '</strong></div>' + meter(coverage,'Certificaciones practicadas de ' + provider) +
    '<p class="subtle muted">Aciertos diarios · últimos 7 días</p>' + dailyChart(daily,dates) + '</article>';
}

function overview() {
  const attempts = state.attempts.filter(attempt => !attempt.reviewOf);
  const {daily,ranked} = analytics(attempts);
  const today = dateKey(new Date());
  const anchor = new Date(today + 'T12:00:00Z');
  const dates = Array.from({length:7},(_,i) => {
    const date = new Date(anchor);
    date.setUTCDate(date.getUTCDate() + i - 6);
    return date;
  });
  const days = [...daily.keys()].sort().reverse();
  const delta = days.length > 1 ? accuracy(daily.get(days[0])) - accuracy(daily.get(days[1])) : null;
  const deltaLabel = delta === null ? 'Se calcula al practicar en dos días' :
    (delta > 0 ? '↑ +' : delta < 0 ? '↓ ' : '→ ') + delta + ' pp entre los dos últimos días con práctica';
  const strong = ranked.find(s => s.total >= 3);
  const quick = [...new Set([state.active?.code,'CLF-C02','AZ-900','SAA-C03'].filter(Boolean))].slice(0,3);
  return '<section class="hero"><div class="hero-content"><span class="eyebrow">AWS + MICROSOFT AZURE</span><h1>Prepárate para certificarte</h1>' +
    '<p>Practica en español o inglés, revisa tus respuestas y mide tu avance con cada simulacro.</p><a class="btn light" href="#' +
    (state.active && (state.active.reviewOf || state.active.items.length >= 40) ? 'simulacro">Continuar simulacro' : 'certificaciones">Explorar certificaciones') +
    ' <span aria-hidden="true">→</span></a></div><div class="orbit" aria-hidden="true"><span>☁</span></div></section>' +
    '<section class="stats" aria-label="Indicadores">' +
    stat('◎','Simulacros completados',attempts.length,days.length + ' días de práctica') +
    stat('↗','Precisión general',attempts.length ? pct(accuracy(attempts)) : '—',deltaLabel) +
    stat('◇','Área más fuerte',escapeText(strong?.area || '—'),strong ? pct(strong.score) + ' · ' + strong.total + ' preguntas distintas' : 'Mínimo 3 preguntas distintas por área') +
    '</section><div class="section-head"><h2>Progreso por proveedor</h2></div><section class="providers">' +
    ['AWS','Azure'].map(provider => providerProgress(provider,dates)).join('') +
    '</section><div class="section-head"><h2>Rendimiento general</h2></div>' +
    '<section class="analytics"><article class="panel"><div class="panel-head"><h2>Rendimiento diario</h2><small>Últimos 7 días</small></div>' +
    '<p class="muted subtle">Porcentaje de aciertos en simulacros completados.</p>' +
    dailyChart(daily,dates) + '</article><article class="panel"><div class="panel-head"><h2>Dominio por área</h2></div>' +
    '<p class="muted subtle">Último resultado de cada pregunta distinta.</p>' +
    (ranked.length ? ranked.map(s => '<div class="skill"><div class="row"><strong>' + escapeText(s.area) + '</strong><small>' +
      s.total + ' preg. · ' + pct(s.score) + '</small></div>' + meter(s.score,s.area) + '</div>').join('') :
      empty('Aún no hay resultados','Completa un simulacro para ver tus fortalezas.')) + '</article></section>' +
    '<div class="section-head"><h2>Acceso rápido</h2><a href="#certificaciones">Ver catálogo →</a></div>' +
    '<div class="cards">' + quick.map(code => card(byCode[code])).join('') + '</div>';
}

function stat(icon,label,value,detail) {
  return '<article class="stat"><span class="stat-icon" aria-hidden="true">' + icon + '</span><span>' + label +
    '</span><strong>' + value + '</strong><small>' + detail + '</small></article>';
}

const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

function list() {
  const needle = normalize(filters.search.trim());
  const matches = exams.filter(e => (!filters.provider || e.provider === filters.provider) &&
    (!filters.level || e.level.split(' · ')[0] === filters.level) &&
    normalize([e.code,e.name,e.provider,e.area,e.level].join(' ')).includes(needle));
  document.querySelector('#count').textContent = matches.length + ' exámenes';
  document.querySelector('#cards').innerHTML = matches.length ? matches.map(card).join('') :
    empty('Sin coincidencias','Prueba otro nombre, código o filtro.');
}

function catalog() {
  const levels = [...new Set(exams.map(e => e.level.split(' · ')[0]))];
  return '<div class="page-head"><h1>Certificaciones</h1><p>Explora los exámenes de AWS y Azure. ' +
    questionCount + ' preguntas de práctica y variantes de escenarios.</p></div><div class="filters">' +
    '<input class="field" type="search" id="search" aria-label="Buscar certificación" placeholder="Buscar por nombre, código o ámbito">' +
    '<select class="field" id="provider" aria-label="Proveedor"><option value="">Todos los proveedores</option><option>AWS</option><option>Azure</option></select>' +
    '<select class="field" id="level" aria-label="Nivel"><option value="">Todos los niveles</option>' +
    levels.map(l => '<option>' + l + '</option>').join('') + '</select><span class="muted subtle" id="count" role="status"></span></div>' +
    '<p class="muted subtle" style="margin-bottom:14px">AWS usa la cantidad publicada por examen. En Azure puedes elegir 40, 50 o 60 preguntas. El cronómetro de Azure se basa en la duración publicada o en la habitual para el nivel. El dominio indica qué porcentaje del banco has acertado al menos una vez.</p>' +
    '<div class="cards" id="cards"></div>';
}

function simulator() {
  const active = state.active;
  if (!active) return empty('No hay un simulacro activo','<a href="#certificaciones">Elige una certificación</a> para comenzar.');
  const exam = byCode[active.code];
  const item = active.items[active.index];
  const q = questionText(bank[item.id],active.language);
  const answered = Object.keys(active.answers).length;
  const en = active.language === 'en';
  const t = (es,english) => en ? english : es;
  return '<div class="exam" lang="' + (en ? 'en' : 'es') + '"><div class="page-head"><h1>' + exam.code + '</h1><p>' + exam.name + '</p></div><article class="panel">' +
    (active.reviewOf ? '<p class="subtle muted">' + t('Repaso de errores · Sin límite de tiempo','Mistake review · Untimed') + '</p>' :
      active.items.length < 40 ? '<p class="subtle muted">Intento breve anterior. <a href="#certificaciones">Iniciar un simulacro completo</a></p>' : '') +
    '<div class="row"><strong>' + t('Pregunta ','Question ') + (active.index+1) + t(' de ',' of ') + active.items.length +
    '</strong>' + (active.reviewOf ? '' : '<strong id="clock" aria-label="' + t('Tiempo restante','Time remaining') + '"></strong>') +
    '</div><div class="row subtle" style="margin:9px 0">' +
    '<span>' + answered + t(' respondidas',' answered') + '</span><span>' + pct(percent(answered,active.items.length)) + '</span></div>' +
    meter(percent(answered,active.items.length),t('Preguntas respondidas','Questions answered')) + '<h2 id="question" tabindex="-1">' + q.prompt + '</h2>' +
    '<small>' + t(q.area + ' · Selecciona una respuesta','Select one answer') + '</small><div class="choices">' +
    item.choices.map((value,i) => '<button class="choice" data-choice="' + i + '" aria-pressed="' + (active.answers[item.id] === value) +
      '"><b>' + 'ABCD'[i] + '</b><span>' + value + '</span></button>').join('') + '</div><div class="question-nav" aria-label="' + t('Navegar por preguntas','Navigate questions') + '">' +
    active.items.map((entry,i) => '<button data-index="' + i + '" aria-label="' + t('Pregunta ','Question ') + (i+1) + (active.answers[entry.id] ? t(', respondida',', answered') : '') + '"' +
      (active.answers[entry.id] ? ' class="done"' : '') + (i === active.index ? ' aria-current="step"' : '') + '>' + (i+1) + '</button>').join('') +
    '</div><div class="actions">' +
    button(t('← Anterior','← Previous'),'data-index="' + (active.index-1) + '"' + (active.index === 0 ? ' disabled' : ''),'ghost') +
    (active.index < active.items.length-1 ? button(t('Siguiente →','Next →'),'data-index="' + (active.index+1) + '"','ghost') : '') +
    button(active.reviewOf ? t('Finalizar repaso','Finish review') : t('Finalizar simulacro','Finish exam'),'data-finish') + '</div></article></div>';
}

const englishAreas = {
  'Fundamentos':'Fundamentals', 'Gobernanza':'Governance', 'Seguridad':'Security',
  'Arquitectura':'Architecture', 'Datos':'Data', 'Redes':'Networking', 'Operaciones':'Operations',
  'Desarrollo':'Development', 'Inteligencia artificial':'Artificial intelligence', 'Costos':'Costs'
};

function topicsToReview(items, en) {
  const topics = new Map();
  for (const item of items) {
    if (!topics.has(item.area)) topics.set(item.area,{right:0,total:0,wrong:0,blank:0});
    const topic = topics.get(item.area);
    topic.total++;
    if (item.right) topic.right++;
    else if (item.answer) topic.wrong++;
    else topic.blank++;
  }
  const rows = [...topics].sort(([,a],[,b]) => a.right/a.total - b.right/b.total || b.total - a.total);
  const t = (es,english) => en ? english : es;
  return '<section class="topic-review"><h2>' + t('Temas que debes reforzar','Topics to strengthen') + '</h2>' +
    rows.map(([area,topic]) => {
      const label = en ? (Object.hasOwn(englishAreas,area) ? englishAreas[area] : area) : area;
      const score = percent(topic.right,topic.total);
      const status = topic.right === topic.total ? t('Sin errores','All correct') :
        t('Reforzar','Needs practice') + ' · ' + topic.wrong + t(' incorrectas',' wrong') + ' · ' + topic.blank + t(' sin responder',' unanswered');
      return '<div class="skill"><div class="row"><strong>' + escapeText(label) + '</strong><small>' +
        topic.right + '/' + topic.total + ' · ' + pct(score) + '</small></div>' + meter(score,label) +
        '<small>' + status + '</small></div>';
    }).join('') + '</section>';
}

function result(id) {
  const a = state.attempts.find(entry => entry.id === id);
  if (!a) return empty('Resultado no disponible','<a href="#historial">Volver al historial</a>');
  const en = a.language === 'en';
  const t = (es,english) => en ? english : es;
  const missed = missedQuestions(a).length;
  return '<div class="exam" lang="' + (en ? 'en' : 'es') + '"><div class="page-head"><h1>' +
    (a.reviewOf ? t('Resultado del repaso · ','Review results · ') : t('Resultado de ','Results for ')) + a.code + '</h1><p>' + stamp(new Date(a.ended)) +
    '</p></div><article class="panel"><div class="row"><div><div class="metric">' + pct(percent(a.right,a.total)) +
    '</div><p>' + a.right + t(' aciertos de ',' correct out of ') + a.total + t(' preguntas',' questions') + '</p></div></div><div class="actions">' + button(t('Iniciar simulacro completo','Start full exam'),'data-start="' + a.code + '" data-retry-size="' + a.total +
      '" data-retry-language="' + (a.language || 'es') + '"') +
    (missed ? button(t('Repasar errores','Review mistakes') + ' (' + missed + ')','data-review="' + a.id + '"','ghost') : '') +
    '</div>' + topicsToReview(a.items,en) + '<div class="result-list">' + a.items.map((item,i) => '<details' + (item.right ? '' : ' open') +
      '><summary><strong class="' + (item.right ? 'good' : 'bad') + '">' + (item.right ? t('Correcta','Correct') : item.answer ? t('Incorrecta','Incorrect') : t('Sin responder','Unanswered')) +
      '</strong> · ' + (i+1) + '. ' + escapeText(item.prompt) + '</summary><p>' + t('Tu respuesta: ','Your answer: ') + escapeText(item.answer || '—') +
      '</p><p><strong>' + t('Respuesta correcta:','Correct answer:') + '</strong> ' + escapeText(item.correct) + '</p><p class="muted">' + escapeText(item.reason) + '</p></details>').join('') +
    '</div></article></div>';
}

function history() {
  return '<div class="page-head"><h1>Historial</h1><p>Consulta tus simulacros, aciertos y correcciones.</p></div><div class="history">' +
    (state.attempts.length ? state.attempts.map(a => '<article class="panel row"><div><h3>' + a.code + ' · ' +
      pct(percent(a.right,a.total)) + '</h3><small>' + stamp(new Date(a.ended)) + ' · ' + a.right + '/' + a.total +
      ' aciertos' + (a.reviewOf ? ' · Repaso' : '') + '</small></div><a class="btn ghost" href="#resultado/' + a.id + '">Ver corrección</a></article>').join('') :
      empty('Todavía no hay intentos','<a href="#certificaciones">Empieza a practicar</a> para registrar tu primer resultado.')) + '</div>';
}

function render() {
  const [route,id] = (location.hash.slice(1) || 'inicio').split('/');
  const page = validName(state.name) ? route : 'perfil';
  document.querySelector('#sidebar-name').textContent = validName(state.name) ? state.name : 'Mi estudio';
  const labels = {inicio:'Resumen',certificaciones:'Certificaciones',historial:'Historial',perfil:'Mi perfil',simulacro:'Simulacro',resultado:'Resultado'};
  document.querySelector('#breadcrumb').textContent = 'Mi estudio / ' + (labels[page] || labels.inicio);
  document.querySelector('#today').textContent = new Intl.DateTimeFormat('es-CL',{dateStyle:'full',timeZone:zone}).format(new Date());
  for (const link of document.querySelectorAll('nav a')) {
    if (link.hash === '#' + page) link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  }
  if (page === 'perfil') app.innerHTML = profilePage();
  else if (page === 'certificaciones') {
    app.innerHTML = catalog();
    for (const [field,value] of Object.entries(filters)) document.querySelector('#' + field).value = value;
    list();
  } else if (page === 'historial') app.innerHTML = history();
  else if (page === 'simulacro') app.innerHTML = simulator();
  else if (page === 'resultado') app.innerHTML = result(id);
  else app.innerHTML = overview();
  if (validName(state.name)) tick();
}

function tick() {
  const active = state.active;
  if (!validName(state.name) || !active || active.reviewOf) return;
  const seconds = Math.max(0,Math.ceil((active.end-Date.now())/1000));
  if (!seconds) { complete(); return; }
  const clock = document.querySelector('#clock');
  if (clock) clock.textContent = Math.floor(seconds/60) + ':' + String(seconds%60).padStart(2,'0');
}

app.addEventListener('input', event => {
  if (!Object.hasOwn(filters,event.target.id)) return;
  filters[event.target.id] = event.target.value;
  list();
});

app.addEventListener('click', event => {
  const target = event.target.closest('button');
  if (!target) return;
  if (target.hasAttribute('data-export')) { exportProgress(); return; }
  if (target.dataset.review) {
    startReview(target.dataset.review);
    return;
  }
  if (target.dataset.start) {
    const controls = target.closest('.cert, .exam');
    const size = controls?.querySelector('[data-size]')?.value || target.dataset.retrySize;
    const language = controls?.querySelector('[data-language]')?.value || target.dataset.retryLanguage;
    start(target.dataset.start, Number(size), language);
    return;
  }
  const active = state.active;
  if (!active) return;
  if (!active.reviewOf && Date.now() >= active.end) { complete(); return; }
  if (target.hasAttribute('data-finish')) {
    const missing = active.items.length - Object.keys(active.answers).length;
    if (!missing || confirm(active.language === 'en' ? missing + ' questions are unanswered. Finish?' : 'Quedan ' + missing + ' preguntas sin responder. ¿Finalizar?')) complete();
  } else if (target.hasAttribute('data-index')) {
    const index = Number(target.dataset.index);
    if (index < 0 || index >= active.items.length) return;
    active.index = index;
    save();
    render();
    document.querySelector('#question')?.focus();
  } else if (target.hasAttribute('data-choice')) {
    const item = active.items[active.index];
    active.answers[item.id] = item.choices[Number(target.dataset.choice)];
    save();
    render();
    document.querySelector('[data-choice="' + target.dataset.choice + '"]')?.focus();
  }
});

window.addEventListener('hashchange', () => { render(); window.scrollTo(0,0); app.focus(); });
setInterval(tick,500);
