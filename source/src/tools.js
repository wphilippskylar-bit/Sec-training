/* Arcade, drills & reference for the Security+ Range */
(function () {
  var C = window.COURSE, R = window.SECREF, B = window.SECBANK;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function openStages(api) { return api.stages.filter(function (s) { return s.obj && api.unlocked(s); }); }
  function openDomains(api) { var d = {}; openStages(api).forEach(function (s) { d[s.obj[0]] = 1; }); return Object.keys(d).sort(); }
  function poolFresh(api) { var out = []; openStages(api).forEach(function (s) { s.qs.forEach(function (q) { out.push(q); }); }); return out; }
  function poolHard(api) { var doms = openDomains(api); return B.hard.filter(function (r) { return doms.indexOf(String(r[0])[0]) >= 0; }).map(function (r) { return { q: r[1], c: r[2], a: r[3], ex: r[4].map(function (t) { return String(t).replace(/^(Correct|Incorrect|Wrong|Right)[.!:]\s*/i, ''); }), e: '', o: r[0], d: +String(r[0])[0], showAll: true }; }); }

  // generic quiz runner: instant feedback each question
  function quiz(el, api, set, opts) {
    var i = 0, right = 0, t0 = Date.now(), timer = null, over = false;
    function end() {
      over = true; if (timer) clearInterval(timer);
      var pct = set.length ? Math.round(100 * right / (opts.timed ? Math.max(i, 1) : set.length)) : 0;
      el.innerHTML = '<div class="panel center"><div class="tag">' + esc(opts.label) + '</div><div class="big">' + (opts.timed ? right : pct + '%') + '</div><p>' + (opts.timed ? right + ' correct in ' + opts.timed + ' seconds (' + i + ' answered)' : right + '/' + set.length + ' correct') + '</p><button class="btn pri" id="again">Play again</button></div>';
      el.querySelector('#again').onclick = function () { opts.restart(); };
      if (opts.done) opts.done(right, i, pct);
    }
    function show() {
      if (over) return;
      if (i >= set.length) return end();
      var q = api.prep(set[i]);
      el.innerHTML = '<div class="qmeta"><span>' + esc(opts.label) + ' · ' + (i + 1) + (opts.timed ? '' : '/' + set.length) + ' · ' + right + ' correct' + (q.o ? ' · ' + q.o : '') + '</span>' + (opts.timed ? '<span class="timer" id="tm"></span>' : '') + '</div><div class="panel" id="qp">' + api.renderQ(q) + '</div>';
      if (opts.timed) tick();
      api.wire(el.querySelector('#qp'), q, function (ok, picked) {
        if (ok) { right++; api.award(opts.xp || 3, 'Correct', true); }
        if (opts.onAnswer) opts.onAnswer(set[i], ok);
        if (opts.timed) { i++; setTimeout(show, ok ? 250 : 900); return; }
        var b = document.createElement('div'); b.className = 'row'; b.style.marginTop = '10px'; b.innerHTML = '<button class="btn pri">Next</button>';
        el.querySelector('#qp').appendChild(b); b.firstChild.onclick = function () { i++; show(); };
      }, !opts.timed || true);
    }
    function tick() { var e = el.querySelector('#tm'); if (!e) return; var left = opts.timed - Math.floor((Date.now() - t0) / 1000); if (left <= 0) { end(); return; } e.textContent = '0:' + ('0' + left).slice(-2); }
    if (opts.timed) { timer = setInterval(tick, 500); api.setCleanup(function () { clearInterval(timer); }); }
    show();
  }

  C.tools = [
    { id: 'speed', title: '⚡ Speed Round', desc: '60 seconds. Answer as many questions from your unlocked objectives as you can. +5 XP each.',
      render: function (el, api) {
        function start() {
          var pool = shuffle(poolFresh(api)); var best = api.store('speedBest') || 0;
          el.innerHTML = '<div class="panel"><p>60-second sprint across every objective you have unlocked (' + pool.length + ' questions available). Personal best: <b>' + best + '</b>.</p><button class="btn pri" id="go">Start</button></div>';
          el.querySelector('#go').onclick = function () { quiz(el, api, pool, { label: 'SPEED', timed: 60, xp: 5, restart: start, done: function (r) { if (r > best) { api.store('speedBest', r); api.toast('New personal best: ' + r); } if (r >= 15) window.ENGINE.badge('speed'); } }); };
        }
        start();
      } },
    { id: 'hard', title: '🔥 Hard Mode', desc: '25 tough scenario questions from the Hard bank for your unlocked domains. 80% earns the Hard Mode badge.',
      render: function (el, api) {
        function start() {
          var pool = poolHard(api), doms = openDomains(api);
          el.innerHTML = '<div class="panel"><p>' + pool.length + ' Hard Mode questions available from domain' + (doms.length > 1 ? 's ' : ' ') + doms.join(', ') + '. Unlock more domains on the Path to widen the pool.</p><button class="btn pri" id="go">Start 25-question run</button></div>';
          el.querySelector('#go').onclick = function () { quiz(el, api, shuffle(pool).slice(0, 25), { label: 'HARD MODE', xp: 6, restart: start, done: function (r, n, pct) { if (pct >= 80 && n >= 25) window.ENGINE.badge('hard'); api.award(20, 'Hard Mode run'); } }); };
        }
        start();
      } },
    { id: 'quick', title: '🎯 Quick quiz by domain', desc: 'Pick an unlocked domain and a length. Mixed standard + hard questions with full explanations.',
      render: function (el, api) {
        function start() {
          var doms = openDomains(api);
          el.innerHTML = '<div class="panel"><div class="row">' + doms.map(function (d) { return '<button class="btn" data-d="' + d + '">Domain ' + d + '</button>'; }).join('') + '<button class="btn" data-d="all">All unlocked</button></div><div class="row" style="margin-top:8px">Length: <select id="len"><option>10</option><option selected>20</option><option>40</option></select></div></div>';
          el.querySelectorAll('[data-d]').forEach(function (b) { b.onclick = function () {
            var d = b.dataset.d, pool = poolFresh(api).concat(poolHard(api)).filter(function (q) { return d === 'all' || String(q.d) === d; });
            quiz(el, api, shuffle(pool).slice(0, +el.querySelector('#len').value), { label: d === 'all' ? 'MIXED' : 'DOMAIN ' + d, restart: start });
          }; });
        }
        start();
      } },
    { id: 'missed', title: '🔁 Missed-question review', desc: 'Every question you have missed in objective Practice, in one place. Answer correctly to clear it.',
      render: function (el, api) {
        function start() {
          var S = window.ENGINE.state(), set = [];
          Object.keys(S.missed || {}).forEach(function (k) { var p = k.split(':'), s = api.stages.filter(function (x) { return x.id === p[0]; })[0]; if (s && s.qs[+p[1]]) set.push({ q: s.qs[+p[1]], key: k }); });
          if (!set.length) { el.innerHTML = '<div class="panel">Nothing to review — miss a question in an objective\'s Practice tab and it will appear here.</div>'; return; }
          el.innerHTML = '<div class="panel"><p>' + set.length + ' missed question' + (set.length > 1 ? 's' : '') + ' waiting.</p><button class="btn pri" id="go">Review them</button></div>';
          el.querySelector('#go').onclick = function () { var sh = shuffle(set); quiz(el, api, sh.map(function (x) { return x.q; }), { label: 'REVIEW', restart: start, onAnswer: function (q, ok) { if (!ok) return; var hit = sh.filter(function (x) { return x.q === q; })[0]; if (hit) { delete window.ENGINE.state().missed[hit.key]; window.ENGINE.persist(); } } }); };
        }
        start();
      } },
    { id: 'confusion', title: '🧩 Confusion sets', desc: 'Groups of terms the exam loves to mix up (SLA vs MOU vs MSA, SPF vs DKIM vs DMARC…). Study table or quiz yourself.',
      render: function (el, api) {
        function list() {
          el.innerHTML = '<div class="list">' + R.vocab.map(function (v, i) { return '<button class="li" data-v="' + i + '"><span class="grow"><b>' + esc(v.name) + '</b><div class="s">' + v.objs.join(', ') + ' · ' + v.terms.length + ' terms</div></span><span class="muted">›</span></button>'; }).join('') + '</div>';
          el.querySelectorAll('[data-v]').forEach(function (b) { b.onclick = function () { show(+b.dataset.v); }; });
        }
        function show(i) {
          var v = R.vocab[i];
          el.innerHTML = '<div class="row" style="margin-bottom:8px"><button class="btn sm ghost" id="bk">← All sets</button><span class="grow"></span><button class="btn sm pri" id="qz">Quiz me</button></div><h2>' + esc(v.name) + '</h2><table class="reftable"><tr><th>Term</th><th>Meaning</th><th>Clue words</th></tr>' + v.terms.map(function (t) { return '<tr><td><b>' + esc(t[0]) + '</b></td><td>' + esc(t[1]) + '</td><td class="muted">' + esc(t[2] || '') + '</td></tr>'; }).join('') + '</table>';
          el.querySelector('#bk').onclick = list;
          el.querySelector('#qz').onclick = function () {
            var set = shuffle(v.terms).map(function (t) { var wrong = shuffle(v.terms.filter(function (x) { return x !== t; })).slice(0, 3).map(function (x) { return x[0]; }); return { q: t[1] + (t[2] ? '  (clue: ' + t[2] + ')' : ''), c: [t[0]].concat(wrong), a: 0, e: '<b>' + esc(t[0]) + '</b> — ' + esc(t[1]) }; });
            quiz(el, api, set, { label: v.name.toUpperCase(), xp: 2, restart: function () { show(i); } });
          };
        }
        list();
      } },
    { id: 'keywords', title: '🔑 Keyword sheet', desc: '"Keyword in the question → answer" tables for every domain, searchable, with a hide-the-answers quiz mode.',
      render: function (el, api) {
        var q = '', hide = false;
        function draw() {
          var ql = q.toLowerCase();
          el.innerHTML = '<div class="row" style="margin-bottom:10px"><input class="answer-in grow" id="ks" placeholder="Search (e.g. LDAPS, BEC, failover)" value="' + esc(q) + '"><button class="btn sm" id="hd">' + (hide ? 'Show answers' : 'Hide answers') + '</button></div>' +
            R.sheet.map(function (sct) {
              var rows = sct.rows.filter(function (r) { return !ql || r.join(' ').toLowerCase().indexOf(ql) >= 0 || sct.title.toLowerCase().indexOf(ql) >= 0; });
              if (!rows.length) return '';
              return '<div class="panel tight" style="margin-bottom:10px"><h3 style="margin-top:0">' + esc(sct.title) + '</h3>' + (sct.tip ? '<p class="small muted">' + esc(sct.tip) + '</p>' : '') + '<table class="reftable"><tr>' + sct.cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr>' + rows.map(function (r) { return '<tr>' + r.map(function (c, ci) { return '<td' + (hide && ci > 0 ? ' class="kwh" style="filter:blur(5px);cursor:pointer"' : '') + '>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div>';
            }).join('');
          var inp = el.querySelector('#ks'); inp.oninput = function () { q = inp.value; var pos = inp.selectionStart; draw(); var n = el.querySelector('#ks'); n.focus(); try { n.setSelectionRange(pos, pos); } catch (e) { } };
          el.querySelector('#hd').onclick = function () { hide = !hide; draw(); };
          el.querySelectorAll('.kwh').forEach(function (c) { c.onclick = function () { c.style.filter = 'none'; }; });
        }
        draw();
      } },
    { id: 'ports', title: '🔌 Ports & firewall drills', desc: 'The port table plus quick firewall-rule questions (source/destination/port logic).',
      render: function (el, api) {
        function start() {
          el.innerHTML = '<div class="row" style="margin-bottom:10px"><button class="btn pri" id="fw">Firewall drills</button><button class="btn" id="pq">Port quiz</button></div><table class="reftable"><tr><th>Service</th><th>Port</th><th>Protocol</th><th>Used for</th></tr>' + R.ports.map(function (p) { return '<tr><td><b>' + esc(p[0]) + '</b></td><td class="mono">' + esc(p[1]) + '</td><td>' + esc(p[2]) + '</td><td class="muted">' + esc(p[3]) + '</td></tr>'; }).join('') + '</table>';
          el.querySelector('#fw').onclick = function () { quiz(el, api, shuffle(R.fw).map(function (f) { return { q: f.q, c: f.c, a: 0, e: esc(f.why) }; }), { label: 'FIREWALL', restart: start }); };
          el.querySelector('#pq').onclick = function () {
            var set = shuffle(R.ports).slice(0, 15).map(function (p) { var wrong = shuffle(R.ports.filter(function (x) { return x[1] !== p[1]; })).slice(0, 3).map(function (x) { return x[1]; }); return { q: 'Which port does ' + p[0] + ' use? (' + p[3] + ')', c: [p[1]].concat(wrong), a: 0, e: esc(p[0]) + ' = ' + esc(p[1]) + ' ' + esc(p[2]) + '.' }; });
            quiz(el, api, set, { label: 'PORTS', restart: start });
          };
        }
        start();
      } },
    { id: 'acronyms', title: '🔤 Acronym blitz', desc: 'CompTIA\'s acronym list (330+). Pick the right expansion — 20 per round.',
      render: function (el, api) {
        function start() {
          el.innerHTML = '<div class="panel"><p>' + R.acr.length + ' acronyms. Each round draws 20 at random.</p><button class="btn pri" id="go">Start</button></div>';
          el.querySelector('#go').onclick = function () {
            var set = shuffle(R.acr).slice(0, 20).map(function (a) { var wrong = shuffle(R.acr.filter(function (x) { return x !== a; })).slice(0, 3).map(function (x) { return x[1]; }); return { q: 'What does ' + a[0] + ' stand for?', c: [a[1]].concat(wrong), a: 0, e: '<b>' + esc(a[0]) + '</b> = ' + esc(a[1]) }; });
            quiz(el, api, set, { label: 'ACRONYMS', xp: 2, restart: start });
          };
        }
        start();
      } },
    { id: 'arcade', title: '🕹️ Sec+ Defender (arcade game)', desc: 'The original arcade-style drill game. Opens in its own page.',
      render: function (el) { el.innerHTML = '<div class="panel"><p>Sec+ Defender is a separate arcade-style game that drills the same material with its own scoring.</p><a class="btn pri" href="game.html">Launch Sec+ Defender</a></div>'; } }
  ];
})();
