/* Security+ Range — course definition (CompTIA Security+ SY0-701). Game-mode path: 5 domains → 28 objectives → domain boss → final exam. */
window.Q = function (q, right, wrong, e, d) { return [q, [right].concat(wrong), 0, e, d]; };
window.TYPE = function (q, accept, e, d, ph) { return { q: q, input: true, accept: accept, show: typeof accept[0] === 'string' ? accept[0] : undefined, e: e, d: d, ph: ph }; };
window.COURSE = {
  id: 'secplusrange',
  title: 'Security+ Range',
  subtitle: 'CompTIA Security+ SY0-701 · every domain, every objective · level up to exam-ready',
  codeExample: 'CIA TRIAD LOCKED',
  passPct: 80,
  passInclusive: true,
  noStepNums: true,
  tracks: [{ id: 'sec', name: 'Security+ SY0-701', short: 'SEC', subtitle: 'Clear each objective (80%+), beat each domain boss, then pass the final exam' }],
  tiers: [
    { id: 'd1', name: 'Domain 1 · General Security Concepts', desc: '12% of the exam — controls, CIA/AAA/Zero Trust, change management, cryptography.' },
    { id: 'd2', name: 'Domain 2 · Threats, Vulnerabilities & Mitigations', desc: '22% — actors, vectors, vulnerabilities, indicators of attack, mitigations.' },
    { id: 'd3', name: 'Domain 3 · Security Architecture', desc: '18% — architecture models, secure infrastructure, data protection, resilience.' },
    { id: 'd4', name: 'Domain 4 · Security Operations', desc: '28% — hardening, assets, vuln mgmt, monitoring, IAM, automation, IR, forensics.' },
    { id: 'd5', name: 'Domain 5 · Security Program Management & Oversight', desc: '20% — governance, risk, third parties, compliance, audits, awareness.' },
    { id: 'fin', name: 'Final · Full exam simulation', desc: '90 questions weighted like the real exam, 90-minute timer.' }
  ],
  domains: { 1: 'General Security Concepts', 2: 'Threats, Vulnerabilities & Mitigations', 3: 'Security Architecture', 4: 'Security Operations', 5: 'Program Management & Oversight' },
  weights: { 1: 12, 2: 22, 3: 18, 4: 28, 5: 20 },
  objNames: {},
  toolsLabel: 'Arcade',
  toolsTitle: 'Arcade, drills & reference',
  toolsIntro: 'Extra ways to train once a domain is open: timed speed rounds, Hard Mode, the full-bank exam simulator, your missed-question review, confusion sets, and quick reference sheets.',
  game: {
    k: 30,
    ranks: [[1, 'Recruit'], [3, 'Help Desk Hero'], [5, 'SOC Trainee'], [7, 'SOC Analyst I'], [10, 'SOC Analyst II'], [13, 'Threat Hunter'], [16, 'Incident Responder'], [19, 'Security Engineer'], [22, 'Security Architect'], [25, 'Security+ Elite']],
    badges: [
      { id: 'd1', icon: '🛡️', name: 'Concepts Cleared', desc: 'Defeated the Domain 1 boss.' },
      { id: 'd2', icon: '🕵️', name: 'Threat Spotter', desc: 'Defeated the Domain 2 boss.' },
      { id: 'd3', icon: '🏗️', name: 'Architect', desc: 'Defeated the Domain 3 boss.' },
      { id: 'd4', icon: '🚨', name: 'Operator', desc: 'Defeated the Domain 4 boss.' },
      { id: 'd5', icon: '📜', name: 'Governor', desc: 'Defeated the Domain 5 boss.' },
      { id: 'final', icon: '🏆', name: 'Exam Ready', desc: 'Passed the full final exam simulation.' },
      { id: 'perfect', icon: '💯', name: 'Flawless', desc: 'Scored 100% on any gate, boss or exam.' },
      { id: 'labs', icon: '🧪', name: 'Hands-On', desc: 'Completed every hands-on lab.' },
      { id: 'streak3', icon: '🔥', name: 'On a Roll', desc: 'Studied 3 days in a row.' },
      { id: 'streak7', icon: '☄️', name: 'Unstoppable', desc: 'Studied 7 days in a row.' },
      { id: 'speed', icon: '⚡', name: 'Speed Demon', desc: 'Scored 15+ in one Speed Round.' },
      { id: 'hard', icon: '🔥', name: 'Hard Mode Survivor', desc: 'Scored 80%+ on a 25-question Hard Mode run.' }
    ]
  },
  stages: [],
  labs: {},
  gens: {},
  tools: []
};

/* ---- builders shared by the domain files ---- */
(function () {
  var C = window.COURSE, B = window.SECBANK, R = window.SECREF;
  C.objNames = R.objNames;
  function fromBank(row, kind) { // [obj, q, choices, a, ex[]]
    return { q: row[1], c: row[2], a: row[3], ex: row[4].map(function (t) { return String(t).replace(/^(Correct|Incorrect|Wrong|Right)[.!:]\s*/i, ''); }), e: '', o: row[0], d: +String(row[0])[0], showAll: true, src: kind };
  }
  window.SEC = {
    bankFor: function (obj, kind) { return (B[kind || 'fresh']).filter(function (r) { return r[0] === obj; }).map(function (r) { return fromBank(r, kind || 'fresh'); }); },
    hardFor: function (dom) { return B.hard.filter(function (r) { return String(r[0])[0] === String(dom); }).map(function (r) { return fromBank(r, 'hard'); }); },
    classic: function () { return B.classic.map(function (r) { return { q: r[1], c: r[2], a: r[3], e: r[4], d: +r[0], src: 'classic' }; }); },
    vocabCards: function (obj) {
      var out = [];
      R.vocab.forEach(function (v) { if (v.objs.indexOf(obj) >= 0) v.terms.forEach(function (t) { out.push([t[0], t[1] + (t[2] ? '<div class="dim small" style="margin-top:6px">Clue words: ' + t[2].replace(/</g, '&lt;') + '</div>' : '')]); }); });
      return out;
    },
    // one objective = one stage
    obj: function (o) {
      var qs = window.SEC.bankFor(o.obj);
      C.stages.push({
        id: 'o' + o.obj.replace('.', '_'), tier: 'd' + o.obj[0], title: o.obj + ' ' + o.title, code: o.code, goal: o.goal,
        lesson: o.lesson, cards: (o.cards || []).concat(window.SEC.vocabCards(o.obj)), qs: qs.concat(o.qs || []), labs: o.labs || [], gateN: o.gateN || 15, obj: o.obj
      });
    },
    boss: function (dom, o) {
      C.stages.push({
        id: 'boss' + dom, tier: 'd' + dom, kind: 'boss', icon: '⚔', title: 'Domain ' + dom + ' Boss: ' + o.title, code: o.code, goal: o.goal, badge: 'd' + dom,
        lesson: o.lesson, cards: o.cards || [], qs: window.SEC.hardFor(dom), labs: o.labs || [], gateN: o.n || 30, minutes: o.minutes || 45, byObj: true,
        gateNote: 'Boss questions come from Hard Mode: longer scenarios and closer distractors than the objective gates. Results break down by objective so you can see exactly where to go back.'
      });
    }
  };
})();
