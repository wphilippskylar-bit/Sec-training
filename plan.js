// Path to Test Day: Sep 29 - Oct 15, 2026
(function(){
  const THM = {
    cs101: "https://tryhackme.com/path/outline/cybersecurity101",
    risks: "https://tryhackme.com/module/threats-and-risks",
    seceng: "https://tryhackme.com/module/introduction-to-security-engineering",
    gov: "https://tryhackme.com/room/cybergovernanceregulation"
  };
  // Each day: date (YYYY-MM-DD), focus, objectives, THM rooms [name, link, source label, minutes], extra tasks
  const PLAN = [
    { d:"2026-09-29", focus:"Governance & data roles", objs:["5.1","5.4"], rooms:[["Governance & Regulation", THM.gov, "Security Engineer › Threats and Risks", 60]],
      extra:["Flashcards: Data roles + Laws & standards sets"] },
    { d:"2026-09-30", focus:"Risk management & the math", objs:["5.2"], rooms:[["Risk Management", THM.risks, "Security Engineer › Threats and Risks", 60]],
      extra:["Bank: drill objective 5.2 (15 q) — work every ALE by hand"] },
    { d:"2026-10-01", focus:"Firewalls & rule logic", objs:["4.5","3.2"], rooms:[["Firewall Fundamentals", THM.cs101, "Cyber Security 101 › Security Solutions", 45]],
      extra:["Weak Spots: Firewall rule drill (16 q)"] },
    { d:"2026-10-02", focus:"Ports & core protocols", objs:["4.5"], rooms:[["Networking Core Protocols", THM.cs101, "Cyber Security 101 › Networking", 60]],
      extra:["Weak Spots: Port drill (30 q)"] },
    { d:"2026-10-03", focus:"Secure protocols (TLS, SSH, SFTP, SMTPS, IMAPS)", objs:["4.5","1.4","3.2"], rooms:[["Networking Secure Protocols", THM.cs101, "Cyber Security 101 › Networking", 60]],
      extra:["Port drill again, aim for 90%+"] },
    { d:"2026-10-04", focus:"Detection: IDS & SIEM", objs:["4.4","3.2"], rooms:[["IDS Fundamentals", THM.cs101, "Cyber Security 101 › Security Solutions", 45],["Introduction to SIEM", THM.cs101, "Cyber Security 101 › Security Solutions", 60]],
      extra:["Bank: drill objective 4.4"] },
    { d:"2026-10-05", focus:"Vulnerability management & scanning", objs:["4.3","4.4"], rooms:[["Vulnerability Management", THM.risks, "Security Engineer › Threats and Risks", 60],["Vulnerability Scanner Overview", THM.cs101, "Cyber Security 101 › Security Solutions", 45]],
      extra:["Bank: drill objective 4.3"] },
    { d:"2026-10-06", focus:"Identity & access management", objs:["4.6","1.2"], rooms:[["Identity and Access Management", THM.seceng, "Security Engineer › Intro to Security Engineering", 60]],
      extra:["Flashcards: Identity & access set"] },
    { d:"2026-10-07", focus:"Cryptography & PKI", objs:["1.4","3.3"], rooms:[["Public Key Cryptography Basics", THM.cs101, "Cyber Security 101 › Cryptography", 60],["Hashing Basics", THM.cs101, "Cyber Security 101 › Cryptography", 45]],
      extra:["Flashcards: Certificates & keys + Protecting data sets"] },
    { d:"2026-10-08", focus:"Security principles & threat modelling", objs:["1.1","1.2","2.1"], rooms:[["Security Principles", THM.seceng, "Security Engineer › Intro to Security Engineering", 45],["Threat Modelling", THM.risks, "Security Engineer › Threats and Risks", 60]],
      extra:["Flashcards: Control categories & types, Zero Trust"] },
    { d:"2026-10-09", focus:"Incident response & logs", objs:["4.8","4.9"], rooms:[["Incident Response Fundamentals", THM.cs101, "Cyber Security 101 › Defensive Security", 45],["Logs Fundamentals", THM.cs101, "Cyber Security 101 › Defensive Security", 45]],
      extra:["Bank: drill objective 4.8"] },
    { d:"2026-10-10", focus:"Web attacks (XSS, CSRF, SQLi)", objs:["2.3","2.4"], rooms:[["Web Application Basics", THM.cs101, "Cyber Security 101 › Web Hacking", 45],["SQL Fundamentals", THM.cs101, "Cyber Security 101 › Web Hacking", 45]],
      extra:["Bank: drill objectives 2.3 and 2.4"] },
    { d:"2026-10-11", focus:"CHECKPOINT: go / no-go", objs:[], checkpoint:true, rooms:[],
      extra:["Timed 90-question BANK exam (Question Bank tab) in one sitting","Decide: keep Oct 15 if bank exam ≥ 90% AND today's Dion ≥ 85% with the firewall sim right. Otherwise move the date 1–2 weeks and keep this plan running."] },
    { d:"2026-10-12", focus:"Forensics & SOC workflow", objs:["4.8","4.9","4.4"], rooms:[["Digital Forensics Fundamentals", THM.cs101, "Cyber Security 101 › Defensive Security", 45],["SOC Fundamentals", THM.cs101, "Cyber Security 101 › Defensive Security", 45]],
      extra:["Redo my bank misses"] },
    { d:"2026-10-13", focus:"Close the gaps", objs:[], rooms:[],
      extra:["Targeted quiz twice","Firewall rule drill + port drill","Re-read the Confusion sets for your 3 weakest objectives"] },
    { d:"2026-10-14", focus:"Light review, rest", objs:[], light:true, rooms:[],
      extra:["Flashcards only (unknown cards)","Skim the port table and the 'Fix these first' list","No new material. Sleep."] },
    { d:"2026-10-15", focus:"EXAM DAY", objs:[], exam:true, rooms:[],
      extra:["Do the PBQs last if they're slow — flag and come back","Read every stem for BEST / MOST / FIRST / NOT","Pick the most specific answer that fits every detail"] }
  ];
  const CHECK_KEY = "plan-checks";
  const loadChecks = () => { try { return JSON.parse(localStorage.getItem(CHECK_KEY) || "{}"); } catch(e){ return {}; } };
  const saveChecks = c => { try { localStorage.setItem(CHECK_KEY, JSON.stringify(c)); } catch(e){} };
  const todayISO = () => { const n = new Date(); return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`; };
  const fmt = iso => new Date(iso + "T12:00:00").toLocaleDateString(undefined, { weekday:"short", month:"short", day:"numeric" });

  function dayTasks(day){
    if (day.exam) return day.extra.map((t,i) => ({ id:`x${i}`, html: t }));
    const t = [];
    if (!day.light) t.push({ id:"dion", html:`<b>Dion practice exam</b> (~90 min) → then upload the results PDF below`, act:"upload" });
    if (!day.light && !day.checkpoint) t.push({ id:"target", html:`<b>Targeted bank quiz</b> (25 q, ~30 min) — read every "why not"`, act:"target" });
    day.rooms.forEach((r,i) => t.push({ id:`r${i}`, html:`<b>TryHackMe:</b> <a href="${r[1]}" target="_blank" rel="noopener">${r[0]}</a> <span class="muted">(${r[2]}, ~${r[3]} min)</span>` }));
    day.extra.forEach((x,i) => t.push({ id:`e${i}`, html: x }));
    return t;
  }

  window.renderPlanImpl = function(ctx){
    const { app, header, tabs, wireTabs, startQuiz, BANK_PREFIX, uploadCardHtml, wireUpload, computeStats, getHistory, esc, OBJ_NAMES, render } = ctx;
    const checks = loadChecks();
    const today = todayISO();
    const exam = new Date("2026-10-15T08:00:00");
    const daysLeft = Math.max(0, Math.ceil((exam - new Date()) / 86400000));
    const st = computeStats(getHistory());
    const lastA = st.attempts[st.attempts.length-1];
    const recentNew = st.attempts.slice(-3).filter(a => a.newPct != null);
    const newAvg = recentNew.length ? Math.round(recentNew.reduce((s,a)=>s+a.newPct,0)/recentNew.length) : null;
    let bankStats = {}; try { bankStats = JSON.parse(localStorage.getItem("bank-stats") || "{}"); } catch(e){}
    const bk = Object.keys(bankStats); const bankPct = bk.length ? Math.round(100 * bk.filter(k => bankStats[k][2]===1).length / bk.length) : null;
    const todayIdx = PLAN.findIndex(p => p.d === today);
    const cur = todayIdx >= 0 ? PLAN[todayIdx] : (today < PLAN[0].d ? PLAN[0] : null);

    const dayCard = (day, open) => {
      const tasks = dayTasks(day);
      const done = tasks.filter(t => checks[day.d + ":" + t.id]).length;
      const isToday = day.d === today, past = day.d < today;
      const objs = day.objs.length ? `<div class="tell" style="margin:4px 0 8px;">Objectives: ${day.objs.map(o => `${o} ${OBJ_NAMES[o] ? "(" + OBJ_NAMES[o] + ")" : ""}`).join(" · ")}</div>` : "";
      const list = tasks.map(t => `<label class="ptask"><input type="checkbox" data-ck="${day.d}:${t.id}" ${checks[day.d+":"+t.id] ? "checked" : ""}><span>${t.html}${t.act==="target" ? ` <button class="btn btn-ghost btn-sm" data-go="target" style="margin-left:6px;">Start</button>` : ""}${day.objs.length && t.id==="target" ? "" : ""}</span></label>`).join("");
      const drills = day.objs.length ? `<div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">${day.objs.map(o => `<button class="btn btn-ghost btn-sm" data-go="o${o}">Drill ${o}</button>`).join("")}</div>` : "";
      return `<details class="vset pday ${isToday ? "today" : ""} ${past ? "past" : ""}" ${open ? "open" : ""}>
        <summary><span>${fmt(day.d)} &middot; ${esc(day.focus)}${isToday ? ' <span class="flag" style="color:var(--accent); border-color:var(--accent);">TODAY</span>' : ""}</span><span class="sub">${done}/${tasks.length}</span></summary>
        <div class="inner">${objs}${list}${drills}</div></details>`;
    };

    app.innerHTML = `
      ${header()}
      ${tabs()}
      <div class="card">
        <h2>Path to test day &middot; ${daysLeft} day${daysLeft===1?"":"s"} to Oct 15</h2>
        <div class="kpis">
          <div class="kpi"><div class="kv ${newAvg!=null && newAvg>=85 ? "pct-good" : newAvg>=70 ? "pct-mid" : "pct-bad"}">${newAvg!=null ? newAvg+"%" : "—"}</div><div class="kl">Dion, first-seen questions (last 3)</div></div>
          <div class="kpi"><div class="kv">${lastA ? lastA.pct+"%" : "—"}</div><div class="kl">Latest Dion (#${lastA ? lastA.attempt : "-"})</div></div>
          <div class="kpi"><div class="kv ${bankPct!=null && bankPct>=90 ? "pct-good" : bankPct!=null && bankPct>=75 ? "pct-mid" : "pct-bad"}">${bankPct!=null ? bankPct+"%" : "—"}</div><div class="kl">Question bank (${bk.length} seen)</div></div>
        </div>
        <p class="muted">Pass targets before Oct 11: <b>85%+ on Dion</b> (on questions you haven't seen before) and <b>90%+ in the console</b> (question bank). Each day is one Dion exam to <i>measure</i>, one targeted bank quiz and one or two TryHackMe rooms to <i>understand</i>, and flashcards on your drives. Rooms are ordered by your weakest objectives.</p>
      </div>
      ${cur ? `<div class="card"><h2>${cur.d === today ? "Today" : "Starts"}: ${esc(cur.focus)}</h2>${dayCard(cur, true).replace('<details class="vset pday','<details class="vset pday big')}</div>` : ""}
      ${uploadCardHtml()}
      <div class="card">
        <h2>Full schedule</h2>
        ${PLAN.map(p => dayCard(p, false)).join("")}
      </div>
      <div class="card">
        <h2>About the TryHackMe rooms</h2>
        <p class="muted">All rooms are from TryHackMe's <a href="${THM.cs101}" target="_blank" rel="noopener">Cyber Security 101</a> path and the Security Engineer path's <a href="${THM.risks}" target="_blank" rel="noopener">Threats and Risks</a> and <a href="${THM.seceng}" target="_blank" rel="noopener">Introduction to Security Engineering</a> modules. Links go to the room or its module page. Minutes are estimates. If a day runs long, skip the room before you skip the targeted quiz.</p>
      </div>
      <div class="footer-note">Checkboxes and uploads are saved in this browser.</div>
    `;
    wireTabs();
    wireUpload();
    app.querySelectorAll("[data-ck]").forEach(cb => cb.addEventListener("change", () => {
      const c = loadChecks(); if (cb.checked) c[cb.getAttribute("data-ck")] = 1; else delete c[cb.getAttribute("data-ck")]; saveChecks(c);
      render();
    }));
    app.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", e => {
      e.preventDefault();
      const k = b.getAttribute("data-go");
      ctx.state.returnView = "plan";
      startQuiz(BANK_PREFIX + k, k === "target" ? "Targeted Weak Objectives" : "Objective " + k.slice(1), false);
    }));
  };
})();
