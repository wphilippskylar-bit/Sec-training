// Keyword Sheet — "keyword in the question → answer" tables built during review sessions (Oct 5–13, 2026)
(function(){
  // Each section: title, tip (optional), cols, rows. ★ = missed on 2+ Dion attempts.
  const SHEET = [
    { id:"habits", title:"Exam-day habits", cols:["Habit","Why"], rows:[
      ["Circle NOT first", "On \"NOT true\" questions, hunt for the ONE false statement."],
      ["Say the keyword before clicking", "Most misses come from rushing past the clue word."],
      ["Only change an answer with proof", "Change only if a specific word proves your first pick wrong. Gut-feeling changes usually turn right into wrong."],
      ["PBQs: quick ones now, hard ones flagged", "If you can see the path in ~3–4 min, do it. If not, flag and return after multiple choice."],
      ["Read every PBQ row slowly", "Swapped rows and wrong source/destination cost ~3 points per test."],
      ["Pick the PRIMARY purpose", "When two answers fit, the exam wants the control/term's main job."]
    ]},
    { id:"ports", title:"Ports & protocols", tip:"\"Secure\" in the question = use the encrypted port. 99x = mail, 636 = directory. Highlighted = missed before.", cols:["Service","Port","Proto","Used for"], rows:null },
    { id:"fw", title:"Firewall sim rules of thumb", cols:["Clue","Do this"], rows:[
      ["Who starts the connection?", "That's the SOURCE. Clients retrieving mail → source = clients."],
      ["\"Secure ___\"", "Use the encrypted port (LDAPS 636, IMAPS 993, SMTPS 465)."],
      ["\"Secure FTP\" / FTP over TLS ★", "FTPS 990"],
      ["\"Secure file transfer\" / SFTP ★", "22 (runs over SSH)"],
      ["\"Any workstation\" / \"any server in zone\" ★", "Use the whole SUBNET (e.g. 192.168.100.0/24), not one host."],
      ["Ping / ICMP", "Port ANY, protocol ICMP."],
      ["UDP services", "DNS, NTP, DHCP, TFTP, SNMP, Syslog, IKE."],
      ["Block rule", "Same logic: source = where traffic starts, action Deny."],
      ["Database rule", "Check which DB: MS SQL 1433, Oracle 1521, MySQL 3306."]
    ]},
    { id:"actors", title:"Threat actors & motivations", tip:"Actor = WHO (by intent). Motivation = WHY (not the effect).", cols:["Keyword","Answer"], rows:[
      ["Unapproved tool/cloud for convenience, no bad intent ★", "Shadow IT (data leaves → data exfiltration)"],
      ["Deliberately steals or sabotages; fired employee with working creds", "Insider threat (angry → revenge)"],
      ["Insider vs Shadow IT difference", "Malicious intent"],
      ["Steals trade secrets / ransomware for money", "Organized crime → financial gain"],
      ["Government attacks grid / infrastructure", "Nation-state → war"],
      ["Government quietly steals intel / SCADA data", "Nation-state → espionage"],
      ["Leaks data to expose wrongdoing ★", "Hacktivist → ethical"],
      ["Influence elections / attack government", "→ political"],
      ["Pushing a belief system", "→ philosophical"],
      ["Toolkit, defaces site, \"for fun / see what happens\" ★", "Unskilled attacker → disruption/chaos"],
      ["Goal is taking the service DOWN (stop sales)", "→ service disruption"],
      ["Complexity of methods", "Sophistication"]
    ]},
    { id:"social", title:"Social engineering", cols:["Keyword","Answer"], rows:[
      ["Impersonates exec/vendor + MOVE MONEY (wire, invoice, bank change) ★", "BEC"],
      ["Victim is C-level (CEO, CFO) + malware/credentials ★", "Whaling"],
      ["Personal details (project name) + malware link/attachment", "Spear phishing"],
      ["Misspelled / look-alike URL (amaz0n) ★", "Typosquatting (URL clue wins)"],
      ["Same look & logos, no URL clue", "Brand impersonation"],
      ["Infects a site the victims visit", "Watering hole"],
      ["Text message / phone call", "Smishing / Vishing"],
      ["Common passwords tried across many accounts", "Password spraying"]
    ]},
    { id:"malware", title:"Malware by symptom", cols:["Behavior","Malware"], rows:[
      ["Outsider CONTROLS the machine remotely", "RAT"],
      ["Watches & collects: screenshots, webcam, redirects ★", "Spyware"],
      ["Hides from OS tools, survives cleanup, reimage only", "Rootkit"],
      ["Spreads by itself, no user action", "Worm"],
      ["Disguised as legit software", "Trojan"],
      ["Waits for date/event trigger", "Logic bomb"],
      ["Records keystrokes", "Keylogger"],
      ["Encrypts files, demands payment", "Ransomware"],
      ["Memory only, no files on disk, gone after reboot", "Fileless"],
      ["Pop-ups, hijacked homepage", "Adware"]
    ]},
    { id:"attacks", title:"Attacks & indicators", cols:["Keyword","Answer"], rows:[
      ["Same account, multiple sessions at once", "Concurrent session usage"],
      ["Two distant logins too fast to travel", "Impossible travel"],
      ["Performs action without re-verifying ★", "TOU (time-of-use)"],
      ["Spoofed IP, replies bounce to victim, same size", "Reflected (mirror)"],
      ["Small request → huge reply (60 B → 4,000 B)", "Amplified (megaphone)"],
      ["../ or files outside intended directories", "Directory traversal"],
      ["Script in browser steals cookies/tokens", "XSS"],
      ["Unwanted actions using victim's logged-in session", "CSRF"],
      ["Rogue WAP intercepting traffic", "On-path"],
      ["SMB mass access + odd encrypted traffic", "Malicious code propagation"],
      ["Normal MFA logins, graceful disconnects", "No attack suspected"]
    ]},
    { id:"controls", title:"Security controls", tip:"Category = HOW it's implemented. Type = WHAT it does. Classify by PRIMARY purpose.", cols:["Control","Category / Type"], rows:[
      ["RBAC ★", "Technical / Preventive"],
      ["AUP, security policy, backup policy ★", "Managerial / Directive"],
      ["Hardening checklist (people work it) ★", "Operational / Preventive"],
      ["Security lighting, signs ★", "Physical / Deterrent"],
      ["DLP", "Technical / Preventive"],
      ["SIEM collecting logs", "Technical"],
      ["People reviewing logs", "Operational"],
      ["Restoring from backup", "Corrective (the action)"],
      ["DR plan", "Directive (the document)"],
      ["Substitute when main control isn't possible", "Compensating"],
      ["Honeypot", "Detective"]
    ]},
    { id:"zt", title:"Zero trust", tip:"Judge decides, clerk does paperwork, bailiff guards the door.", cols:["Component","Role / Plane"], rows:[
      ["Policy Engine (PE)", "DECIDES grant/deny — control plane"],
      ["Policy Administrator (PA)", "Issues tokens/session creds, tells PEP — control plane"],
      ["Policy Enforcement Point (PEP)", "ENFORCES, opens/closes the connection — data plane"],
      ["Subject / System", "User or device requesting — data plane"]
    ]},
    { id:"vuln", title:"Vulnerability & risk", cols:["Keyword","Answer"], rows:[
      ["Vulnerability ID (CVE-2024-1234) ★", "CVE"],
      ["Severity score 0–10 ★", "CVSS"],
      ["How attacker reaches it (Network/Adjacent/Local/Physical)", "AV (Attack Vector)"],
      ["Automated compliance / baseline checking", "SCAP"],
      ["Secure config baselines", "CIS Benchmarks"],
      ["Chance it happens ★", "Likelihood"],
      ["% of asset lost ★", "EF"],
      ["Dollar loss per event", "SLE = AV × EF"],
      ["Times per year", "ARO"],
      ["Yearly loss", "ALE = SLE × ARO"],
      ["Time to repair (typically) ★", "MTTR"],
      ["Max downtime allowed ★", "RTO"],
      ["How much data can be lost", "RPO"],
      ["Can't patch now, formally approved", "Vulnerability exception"],
      ["One-off assessment at a specific moment", "One-time assessment"],
      ["Confirm remediation worked", "Review event logs (Dion) / rescan"]
    ]},
    { id:"arch", title:"Architecture & resilience", cols:["Keyword","Answer"], rows:[
      ["Infra defined by scripts (Terraform) ★", "IaC"],
      ["Ship code, provider runs servers ★", "Serverless"],
      ["No network connection at all", "Air-gapped"],
      ["ICS/SCADA biggest risk ★", "Legacy unencrypted protocols / hard to patch"],
      ["Operator's screen & controls ★", "HMI (Human-Machine Interface)"],
      ["Controls the machinery directly", "PLC"],
      ["Microservices security implication", "Granular access control requirements"],
      ["Timely feedback to requests ★", "Responsiveness"],
      ["Keeps working under adverse conditions", "Resilience"],
      ["Multiple ACTIVE servers act as one", "Clustering"],
      ["Switch to idle STANDBY ★", "Failover"],
      ["Spread traffic to least-busy server", "Load balancing"],
      ["Run multiple procedures simultaneously", "Parallel processing"],
      ["Ready in minutes / hours-days / empty", "Hot / Warm / Cold site"],
      ["AWS + Azure to avoid lock-in", "Multi-cloud → vendor lock-in"],
      ["Exact copy kept in sync ★", "Replication"],
      ["Logs every transaction to replay ★", "Journaling"],
      ["Restore to any point", "Continuous backup"],
      ["Changes since last backup of any kind", "Incremental"],
      ["Changes since last full", "Differential"],
      ["Point-in-time image", "Snapshot"],
      ["P2P ledger no one controls ★", "Blockchain / open public ledger"],
      ["Firewall/config change implication ★", "Downtime / service restart → maintenance window"]
    ]},
    { id:"appliances", title:"Network appliances & tools", cols:["Keyword","Answer"], rows:[
      ["Many functions in one box, small biz", "UTM"],
      ["App awareness (DPI) — FB chat vs games", "NGFW"],
      ["Blocks by what the communication IS", "Layer 7 firewall"],
      ["Ports / IPs / TCP-UDP only", "Layer 4 firewall"],
      ["Protects web apps (SQLi, XSS)", "WAF"],
      ["Inspects & BLOCKS network traffic", "IPS"],
      ["Only rule-based filtering on one device", "Host-based firewall"],
      ["Detects & blocks attacks on one device", "HIPS"],
      ["Passively copies traffic to IDS", "Sensor"],
      ["Log into one hardened box to manage others ★", "Jump server"],
      ["Checks device posture before network access", "NAC (agentless = less client detail)"],
      ["Port-based authentication", "802.1X"],
      ["MAC-address-based port control", "Port security"],
      ["Many branch sites over cheap internet", "SD-WAN"],
      ["Consolidated cloud security bundle", "SASE (Secure Access Service Edge)"],
      ["Visibility/control over cloud apps", "CASB"],
      ["Malware C2 / exfil from user web traffic", "SWG"],
      ["Ensure data reaches the right network", "Routers"],
      ["TLS VPN limitation", "Consistent endpoint security"]
    ]},
    { id:"monitor", title:"Monitoring & ops tools", cols:["Tool","Does / Doesn't"], rows:[
      ["SIEM", "Collects & correlates logs. NOT procurement or response."],
      ["SOAR", "Automates response with playbooks."],
      ["EDR", "Endpoints only: behavioral analysis + threat intel."],
      ["XDR", "EDR extended: endpoint + network + cloud + email correlated."],
      ["Vulnerability scanner ★", "Finds & assesses. Does NOT fix."],
      ["DLP", "Stops data leaving. Not system access."],
      ["NetFlow", "Traffic metadata, not contents."],
      ["SNMP", "Monitors/manages devices. Does NOT secure app communication."],
      ["Infrastructure monitoring", "Holistic view: network + cloud + servers."],
      ["Systems monitoring", "One host's CPU, memory, processes."],
      ["APIs", "Integrate & automate tools."],
      ["Playbook", "Pre-defined steps / data-driven SOP for an incident."],
      ["Guard rails", "Keep automation in bounds. NOT physical security."],
      ["Technical debt", "Cost of shortcuts. NOT RTO or money."],
      ["User provisioning", "Account access. NOT creating VMs."],
      ["Windows OS security log", "Has logins, firewall changes, password changes. NOT AV signature version ★"],
      ["Document metadata", "Creator, timestamps. NOT who accessed it."]
    ]},
    { id:"email", title:"Email authentication", tip:"Nightclub: guest list, wax seal, bouncer's rules. None encrypt.", cols:["Standard","Does"], rows:[
      ["SPF ★", "Lists AUTHORIZED mail servers (guest list)"],
      ["DKIM", "Digital signature → integrity (wax seal)"],
      ["DMARC", "POLICY on failure (quarantine/reject) + REPORTS (bouncer)"]
    ]},
    { id:"pki", title:"Crypto & PKI", cols:["Keyword","Answer"], rows:[
      ["Real-time check of ONE cert ★", "OCSP"],
      ["Full downloadable revoked list", "CRL"],
      ["Issues & revokes certs", "CA"],
      ["Same key encrypts & decrypts", "Symmetric (AES)"],
      ["Encrypt TO someone", "Their PUBLIC key"],
      ["Deprecated WEP → replace with ★", "AES (WPA2/WPA3)"],
      ["Encrypt each record individually", "Record-level encryption"]
    ]},
    { id:"gov", title:"Governance, compliance & vendors", cols:["Keyword","Answer"], rows:[
      ["Uptime %, response times", "SLA"],
      ["Intent to collaborate, not binding ★", "MOU"],
      ["Specific tasks, deliverables, deadline, cost ★", "SOW"],
      ["Umbrella terms for all future work", "MSA"],
      ["Profit split, IP ownership", "BPA"],
      ["Pentest scope, hours, no DoS", "Rules of engagement"],
      ["Vendor finances, reputation, breach history", "Due diligence"],
      ["Decides how data is used/accessed", "Data owner"],
      ["Day-to-day protection / access control", "Data custodian"],
      ["Develops & runs the security program", "Security officer"],
      ["Specialized analysis for the board", "Committees"],
      ["Signed formal statement by senior official ★", "Attestation"],
      ["Track stored data & retention", "Data inventory & retention"],
      ["Monthly trend report to management", "Recurring report"],
      ["Report compliance to public/stakeholders", "External compliance reporting"],
      ["Federal crypto module standard", "FIPS"],
      ["1987 act: federal agency security plans", "Computer Security Act"],
      ["Banking money-laundering rules", "AML / KYC"],
      ["Privacy law enforcers", "Data protection authorities"],
      ["Limit info on need-to-know basis", "Operational security (OPSEC)"],
      ["Test assessing ability to PREVENT attacks", "Defensive pentest"],
      ["Direct interaction, may alert target", "Active reconnaissance"]
    ]}
  ];

  function esc(s){ return String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c])); }
  let query = "";
  let hideAnswers = false;

  window.renderKeywordsImpl = function(ctx){
    const { app, header, tabs, wireTabs } = ctx;
    const q = query.trim().toLowerCase();
    const portRows = (ctx.ports || []).map(p => [(p[4] ? "★ " : "") + p[0], p[1], p[2], p[3]]);
    if (!portRows.some(r => r[1] === "990")) portRows.splice(portRows.findIndex(r => r[1] === "993"), 0, ["★ FTPS (FTP over TLS)", "990", "TCP", "\"secure FTP\" (SFTP is 22)"]);
    portRows.push(["ICMP (ping)", "no port → ANY", "ICMP", "connectivity tests"]);
    const sections = SHEET.map(s0 => {
      const s = s0.rows ? s0 : Object.assign({}, s0, { rows: portRows });
      const rows = s.rows.filter(r => !q || r.join(" ").toLowerCase().includes(q) || s.title.toLowerCase().includes(q));
      if (!rows.length) return "";
      const body = rows.map(r => `<tr class="${r[0].includes("★") ? "hot" : ""}">${r.map((c,i) => {
        const hidden = hideAnswers && i > 0;
        return `<td${(i===1||i===2) && s.id==="ports" ? ' class="mono"' : ''}>${hidden ? `<span class="kw-hide" style="filter:blur(5px); cursor:pointer;" title="Tap to reveal">${esc(c)}</span>` : esc(c)}</td>`;
      }).join("")}</tr>`).join("");
      return `<div class="card" id="kw-${s.id}"><div style="font-weight:600; margin-bottom:4px;">${esc(s.title)}</div>
        ${s.tip ? `<div class="muted" style="margin-bottom:6px;">${esc(s.tip)}</div>` : ""}
        <div class="tbl-wrap"><table class="dt"><tr>${s.cols.map(c => `<th>${esc(c)}</th>`).join("")}</tr>${body}</table></div></div>`;
    }).join("");
    const jump = SHEET.map(s => `<a href="#kw-${s.id}" class="tell" style="margin-right:10px; text-decoration:none;">${esc(s.title)}</a>`).join(" ");
    app.innerHTML = header() + tabs() + `
      <div class="card">
        <div style="font-weight:600;">Keyword Sheet</div>
        <div class="muted">Keyword in the question &rarr; answer. Highlighted rows (&#9733;) were missed on 2+ Dion attempts.</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:12px;">
          <input id="kw-search" type="search" placeholder="Search (e.g. LDAPS, BEC, failover)" value="${esc(query)}"
            style="flex:1; min-width:180px; padding:9px 11px; border-radius:8px; border:1px solid var(--line); background:var(--panel-2); color:var(--text); font-size:14px;">
          <button id="kw-toggle" class="btn btn-ghost btn-sm">${hideAnswers ? "Show answers" : "Quiz mode: hide answers"}</button>
        </div>
        <div style="margin-top:12px; line-height:2;">${jump}</div>
      </div>
      ${sections || '<div class="card muted">No matches.</div>'}`;
    wireTabs();
    const inp = app.querySelector("#kw-search");
    inp.addEventListener("input", () => { query = inp.value; const pos = inp.selectionStart; ctx.render(); const n = app.querySelector("#kw-search"); n.focus(); try { n.setSelectionRange(pos,pos); } catch(e){} });
    app.querySelector("#kw-toggle").addEventListener("click", () => { hideAnswers = !hideAnswers; ctx.render(); });
    app.querySelectorAll(".kw-hide").forEach(el => el.addEventListener("click", () => { el.style.filter = "none"; }));
  };
})();
