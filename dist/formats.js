
const awsFormats = {
  'CLF-C02':[65,90], 'AIF-C01':[65,90], 'AIB-C01':[85,170],
  'SAA-C03':[65,130], 'DVA-C02':[65,130], 'DVA-C03':[65,130], 'SOA-C03':[65,130],
  'DEA-C01':[65,130], 'MLA-C01':[65,130], 'MLA-C02':[85,170],
  'SAP-C02':[75,180], 'SAP-C03':[75,180], 'DOP-C02':[75,180], 'AIP-C01':[75,180],
  'SCS-C03':[65,170], 'ANS-C01':[65,170]
};
const azure120 = new Set(['AI-103','AI-200','AI-300','AI-500','AB-620','AZ-401','AZ-802','DP-800']);
const topicOrder = {
  'CLF-C02':'core security compute data network ops', 'AIF-C01':'ai security data core',
  'AIB-C01':'ai governance security data core', 'SAA-C03':'compute network data security ops',
  'SAP-C02':'network compute security ops data', 'SAP-C03':'compute network ai security ops',
  'DVA-C02':'dev compute security ops data', 'DVA-C03':'dev ai compute security ops',
  'SOA-C03':'ops compute network security data', 'DEA-C01':'data dev security ops compute',
  'MLA-C01':'ai data ops security compute', 'MLA-C02':'ai data ops dev security',
  'DOP-C02':'ops dev compute security network', 'AIP-C01':'ai dev security data ops',
  'SCS-C03':'security network ops dev data', 'ANS-C01':'network security compute ops core',
  'AZ-900':'core compute security network data', 'AI-901':'ai data core security',
  'DP-900':'data core compute security', 'AZ-104':'compute network ops security data',
  'AZ-305':'compute network data security ops', 'AZ-700':'network security ops compute',
  'AZ-400':'dev ops security compute', 'AZ-401':'dev ai ops security compute',
  'AZ-140':'desktop compute security network ops', 'AZ-120':'sap compute data network ops',
  'DP-300':'sql data security ops compute', 'DP-420':'cosmos data ai security dev',
  'DP-750':'databricks data security ops compute', 'DP-800':'sql data ai security dev',
  'AI-103':'ai data security dev', 'AI-200':'dev ai compute data ops', 'AI-300':'ai ops data dev security',
  'AI-500':'ai dev security data ops', 'AB-620':'copilot ai dev security', 'AB-900':'copilot security governance ai',
  'SC-500':'security network ops ai compute', 'SC-300':'identity security governance ops',
  'SC-200':'sentinel security ops network', 'SC-900':'identity security governance core',
  'AZ-802':'windows compute network ops security'
};
const topicAreas = {
  core:'Fundamentos', governance:'Gobernanza', security:'Seguridad', identity:'Seguridad',
  sentinel:'Seguridad', compute:'Arquitectura', data:'Datos', sql:'Datos', cosmos:'Datos',
  databricks:'Datos', network:'Redes', ops:'Operaciones', desktop:'Operaciones',
  sap:'Arquitectura', windows:'Operaciones', dev:'Desarrollo', ai:'Inteligencia artificial',
  copilot:'Inteligencia artificial'
};

function buildPracticeBanks(data) {
  const topics = {};
  const english = new Map(englishFacts.trim().split('\n').map(line => {
    const [id, term, scenario, purpose] = line.trim().split('|');
    return [id, {term, scenario, purpose}];
  }));
  let group;
  for (const line of data.trim().split('\n')) {
    if (line.startsWith('#')) {
      group = line.slice(1).trim();
      topics[group] = [];
      continue;
    }
    if (!line.trim()) continue;
    const [id, term, scenario, purpose] = line.trim().split('|');
    topics[group].push({id, term, scenario, purpose, group:group.split(' ')[1]});
  }
  for (const exam of exams) {
    const aws = exam.provider === 'AWS';
    const [size, minutes] = aws ? awsFormats[exam.code] : [50, exam.level === 'Fundamentos' ? 45 : azure120.has(exam.code) ? 120 : 100];
    exam.size = size;
    exam.duration = minutes;
    const groups = topicOrder[exam.code].split(' ').flatMap(topic => [
      topics[(aws ? 'AWS ' : 'Azure ') + topic] || [],
      topics['Both ' + topic] || []
    ]);
    for (const facts of groups) {
      for (let index = 0; index < facts.length; index++) {
        const fact = facts[index];
        const near = [1,2,3].map(offset => facts[(index + offset) % facts.length]);
        const wrongTerms = near.map(other => other.term);
        const wrongPurposes = near.map(other => other.purpose);
        const wrongScenarios = near.map(other => other.scenario);
        const variants = [
          ['¿Qué opción encaja mejor con este requisito? ' + fact.scenario, fact.term, wrongTerms],
          ['¿Cuál es la función principal de «' + fact.term + '» en este contexto?', fact.purpose, wrongPurposes],
          ['¿Para cuál de estos casos elegirías «' + fact.term + '»?', fact.scenario, wrongScenarios]
        ];
        const translation = english.get(fact.id);
        const options = near.map(other => english.get(other.id));
        const englishVariants = [
          ['Which option best fits this requirement? ' + translation.scenario, 'term'],
          ['What is the primary purpose of “' + translation.term + '” in this context?', 'purpose'],
          ['For which of these scenarios would you choose “' + translation.term + '”?', 'scenario']
        ];
        variants.forEach(([prompt, correct, wrong], variant) => {
          const [englishPrompt, field] = englishVariants[variant];
          exam.questions.push({
            en: {
              prompt:englishPrompt,
              choices:[translation[field], ...options.map(option => option[field])],
              reason:translation.term + '. ' + translation.purpose
            },
            id: exam.code + '-case-' + fact.id + '-' + variant, concept:fact.id,
            area:topicAreas[fact.group], prompt, correct, choices:[correct,...wrong],
            reason:fact.term + '. ' + fact.purpose,
            variant
          });
        });
      }
    }
  }
}




