const escapeText = value => value.replace(/[&<>"']/g, char => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
})[char]);
const validName = name => typeof name === 'string' && name.trim().length > 0 && name.trim().length <= 60;
const validId = id => typeof id === 'string' && /^[a-zA-Z0-9_-]{1,100}$/.test(id);

const profileKey = 'cloudprep.profile';

function saveProfileName(name) {
  try { localStorage.setItem(profileKey,name); }
  catch { document.querySelector('#storage').hidden = false; }
}

function restoreProfileName() {
  try {
    const name = localStorage.getItem(profileKey);
    if (validName(name)) state.name = name;
    else if (validName(state.name)) saveProfileName(state.name);
  } catch {
    document.querySelector('#storage').hidden = false;
  }
}

function mergeBackup(backup) {
  if (backup?.format !== 'cloudprep-progress' || backup.version !== 1 || !Array.isArray(backup.attempts)) {
    throw new Error('Formato de respaldo incompatible.');
  }
  const imported = backup.attempts.map(attempt => {
    if (!validId(attempt?.id) || typeof attempt.code !== 'string' || !Object.hasOwn(byCode,attempt.code) ||
        !Number.isFinite(attempt.ended) || attempt.ended < 0 || attempt.ended > 8.64e15 ||
        !Array.isArray(attempt.items) || !attempt.items.length || attempt.items.length > 100 ||
        (attempt.reviewOf != null && !validId(attempt.reviewOf))) {
      throw new Error('El respaldo contiene un intento inválido.');
    }
    const ids = new Set();
    const items = attempt.items.map(item => {
      if (!validId(item?.id) || !item.id.startsWith(attempt.code + '-') || ids.has(item.id) ||
          !['area','prompt','answer','correct','reason'].every(field => typeof item[field] === 'string' && item[field].length <= 10000)) {
        throw new Error('El respaldo contiene una pregunta inválida.');
      }
      ids.add(item.id);
      const {id,area,prompt,answer,correct,reason} = item;
      return {id,area,prompt,answer,correct,reason,right:answer === correct && answer !== ''};
    });
    return {
      id:attempt.id, code:attempt.code, ended:attempt.ended, day:dateKey(new Date(attempt.ended)),
      language:attempt.language === 'en' ? 'en' : 'es', reviewOf:attempt.reviewOf ?? null,
      items, total:items.length, right:items.filter(item => item.right).length
    };
  });
  const attempts = new Map(state.attempts.map(attempt => [attempt.id,attempt]));
  const previous = attempts.size;
  for (const attempt of imported) if (!attempts.has(attempt.id)) attempts.set(attempt.id,attempt);
  const next = {...state, attempts:[...attempts.values()].sort((a,b) => b.ended-a.ended)};
  localStorage.setItem(key,JSON.stringify(next));
  state = next;
  return attempts.size - previous;
}

function exportProgress() {
  const backup = {format:'cloudprep-progress',version:1,attempts:state.attempts};
  const file = new Blob([JSON.stringify(backup,null,2)],{type:'application/json'});
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'cloudprep-progreso-' + dateKey(new Date()) + '.json';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url),1000);
}

let profileNotice = '';
function profilePage() {
  const name = validName(state.name) ? escapeText(state.name) : '';
  return '<div class="page-head"><h1>Mi perfil</h1><p>El nombre se guarda en este navegador.</p></div>' +
    '<section class="panel profile"><form id="profile-form"><label for="profile-name">Tu nombre</label>' +
    '<input class="field" id="profile-name" required maxlength="60" autocomplete="given-name" value="' + name + '">' +
    '<button class="btn" type="submit">Guardar nombre</button></form>' +
    '<h2>Respaldo de progreso</h2><p>Exporta tus simulacros y repasos finalizados. En el otro navegador, importa el archivo para añadir los intentos a tu historial.</p>' +
    '<div class="actions"><button class="btn ghost" data-export>Exportar progreso</button>' +
    '<label for="progress-file">Importar progreso</label><input id="progress-file" type="file" accept=".json,application/json"></div>' +
    '<p role="status" id="profile-status">' + escapeText(profileNotice) + '</p></section>';
}

app.addEventListener('submit', event => {
  if (event.target.id !== 'profile-form') return;
  event.preventDefault();
  const name = document.querySelector('#profile-name').value.trim();
  if (!validName(name)) {
    document.querySelector('#profile-status').textContent = 'Escribe un nombre de hasta 60 caracteres.';
    return;
  }
  const first = !validName(state.name);
  state.name = name;
  saveProfileName(name);
  profileNotice = 'Nombre guardado.';
  if (first && location.hash === '#perfil') location.hash = 'inicio';
  else render();
});

app.addEventListener('change', async event => {
  if (event.target.id !== 'progress-file') return;
  const file = event.target.files[0];
  if (!file) return;
  event.target.value = '';
  try {
    const count = mergeBackup(JSON.parse(await file.text()));
    profileNotice = count ? 'Intentos importados: ' + count : 'El archivo no contiene intentos nuevos.';
  } catch {
    profileNotice = 'No se pudo importar el respaldo. Revisa el archivo y el espacio disponible en el navegador.';
  }
  const status = document.querySelector('#profile-status');
  if (status) status.textContent = profileNotice;
});

restoreProfileName();
render();
