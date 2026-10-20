/* Domain 2 — Threats, Vulnerabilities & Mitigations (22%) */
(function () {
  var O = window.SEC.obj, L = COURSE.labs;

  O({ obj: '2.1', title: 'Threat actors & motivations', code: 'WHO WANTS WHAT',
    goal: 'Identify the actor from the scenario and the motivation behind it.',
    lesson: [
      { h: 'Actors', html: '<table><tr><th>Actor</th><th>Resources / sophistication</th><th>Typical motivation</th></tr><tr><td><b>Nation-state</b></td><td>Highest; APTs that persist for months</td><td>Espionage, war/disruption of infrastructure, political</td></tr><tr><td><b>Unskilled attacker</b></td><td>Low; uses others\' tools/scripts</td><td>Thrill, notoriety, disruption</td></tr><tr><td><b>Hacktivist</b></td><td>Varies</td><td>Philosophical/political beliefs — defacement, leaks, DDoS</td></tr><tr><td><b>Insider threat</b></td><td>Has legitimate access</td><td>Revenge, financial gain, (or careless mistakes)</td></tr><tr><td><b>Organized crime</b></td><td>High; well funded</td><td>Financial gain — ransomware, fraud, data theft</td></tr><tr><td><b>Shadow IT</b></td><td>Employees, no malicious intent</td><td>Convenience — unapproved apps/cloud create risk</td></tr></table>' },
      { h: 'Attributes', html: '<ul><li><b>Internal vs external</b> — inside the organization or not.</li><li><b>Resources/funding</b> — nation-state and organized crime are highest.</li><li><b>Level of sophistication/capability</b>.</li></ul>' },
      { h: 'Motivations', html: '<p>Data exfiltration · espionage · service disruption · blackmail · financial gain · philosophical/political beliefs · ethical (white-hat disclosure) · revenge · disruption/chaos · war.</p><div class="callout trap"><b class="k">Trap</b>Motivation is <b>why</b>, not what happened. Encrypted files is the <i>effect</i>; financial gain (ransom) is the <i>motivation</i>. Insider vs Shadow IT turns on <b>malicious intent</b>.</div>' }
    ],
    cards: [['Nation-state', 'Government-backed, most resources; espionage or war.'], ['APT', 'Advanced persistent threat — long-term stealthy campaign, usually nation-state.'], ['Unskilled attacker', 'Uses existing tools; low sophistication.'], ['Hacktivist', 'Attacks for a cause or ideology.'], ['Insider threat', 'Someone with authorized access who misuses it.'], ['Organized crime', 'Profit-driven, well-funded groups.'], ['Shadow IT', 'Unapproved technology used without malicious intent.'], ['Motivation', 'The reason behind the attack, not its effect.']],
    labs: ['l-actors'] });

  O({ obj: '2.2', title: 'Threat vectors & attack surfaces', code: 'EVERY DOOR IS A VECTOR',
    goal: 'How attacks get in: messages, files, unsupported software, open ports, default creds, supply chain and human vectors.',
    lesson: [
      { h: 'Vectors', html: '<ul><li><b>Message-based</b>: email, SMS (smishing), instant messaging.</li><li><b>Image-based</b> and <b>file-based</b> (malicious attachments, macros), <b>voice call</b> (vishing), <b>removable device</b> (USB drops).</li><li><b>Vulnerable software</b>: <b>client-based</b> (agent installed) vs <b>agentless</b>; <b>unsupported systems and applications</b> (end-of-life, no patches).</li><li><b>Unsecure networks</b>: wireless, wired, Bluetooth.</li><li><b>Open service ports</b>, <b>default credentials</b>.</li><li><b>Supply chain</b>: managed service providers (MSPs), vendors, suppliers.</li></ul>' },
      { h: 'Human vectors / social engineering', html: '<table><tr><th>Term</th><th>Clue</th></tr><tr><td>Phishing</td><td>Broad email lure</td></tr><tr><td>Spear phishing / whaling</td><td>Targeted / targets executives</td></tr><tr><td>Vishing / smishing</td><td>Voice / SMS</td></tr><tr><td>Misinformation / disinformation</td><td>False info (accidental / deliberate)</td></tr><tr><td>Impersonation, pretexting</td><td>Pretending to be someone with a made-up story</td></tr><tr><td>Business email compromise (BEC)</td><td>Compromised/spoofed exec or vendor account asks for payment change</td></tr><tr><td>Watering hole</td><td>Compromise a site the targets visit</td></tr><tr><td>Brand impersonation</td><td>Fake site/emails using a known brand</td></tr><tr><td>Typosquatting</td><td>Look-alike domain: examp1e.com</td></tr></table>' }
    ],
    cards: [['Attack surface', 'Every point where an attacker could try to get in.'], ['Smishing', 'Phishing by SMS.'], ['Vishing', 'Phishing by voice call.'], ['Whaling', 'Phishing that targets executives.'], ['Pretexting', 'Invented scenario to justify a request.'], ['BEC', 'Business email compromise — fraudulent payment requests from a trusted account.'], ['Watering hole', 'Compromising a site the target group visits.'], ['Typosquatting', 'Registering look-alike domains.'], ['Supply chain vector', 'Attack via a vendor, MSP or supplier.'], ['Default credentials', 'Factory passwords never changed.'], ['Unsupported system', 'End-of-life software that no longer gets patches.']],
    labs: ['l-social'] });

  O({ obj: '2.3', title: 'Vulnerability types', code: 'INPUT IS NEVER TRUSTED',
    goal: 'Application, OS, web, hardware, virtualization, cloud, supply-chain, crypto, misconfiguration, mobile and zero-day vulnerabilities.',
    lesson: [
      { h: 'Application', html: '<ul><li><b>Memory injection</b>, <b>buffer overflow</b> (writing past a buffer\'s end), <b>race condition</b> — including <b>TOCTOU</b> (time-of-check to time-of-use).</li><li><b>Malicious update</b> — a trusted update channel delivers malware.</li></ul>' },
      { h: 'Web', html: '<ul><li><b>SQL injection</b> — input changes the meaning of a database query. Fix: parameterized queries, input validation.</li><li><b>Cross-site scripting (XSS)</b> — attacker-supplied script runs in other users\' browsers. Fix: output encoding, CSP, input validation.</li></ul>' },
      { h: 'Platform & hardware', html: '<ul><li>OS-based flaws; <b>firmware</b>; <b>end-of-life / legacy</b> hardware.</li><li>Virtualization: <b>VM escape</b> (break out to the hypervisor), <b>resource reuse</b> (data left in reallocated memory/disk).</li><li><b>Cloud-specific</b>: misconfigured storage, exposed keys.</li><li><b>Supply chain</b>: service, hardware or software providers.</li><li><b>Cryptographic</b>: weak algorithms, bad key handling.</li><li><b>Misconfiguration</b>: open ports, default settings, permissive permissions.</li><li>Mobile: <b>side loading</b> (apps from outside the store), <b>jailbreaking/rooting</b>.</li><li><b>Zero-day</b>: unknown to the vendor; no patch exists yet.</li></ul>' }
    ],
    cards: [['Buffer overflow', 'Writing more data than a buffer holds, overwriting adjacent memory.'], ['Race condition', 'Outcome depends on timing of concurrent events.'], ['TOCTOU', 'State changes between the check and the use.'], ['SQL injection', 'Input alters a database query; fix with parameterized queries.'], ['XSS', 'Injected script runs in other users\' browsers; fix with output encoding.'], ['VM escape', 'Breaking out of a VM into the host/hypervisor.'], ['Resource reuse', 'Leftover data in reallocated resources.'], ['Side loading', 'Installing apps from outside the official store.'], ['Jailbreaking', 'Removing OS restrictions on a mobile device.'], ['Zero-day', 'Vulnerability with no vendor patch yet.'], ['Malicious update', 'Malware delivered through a trusted update mechanism.']] });

  O({ obj: '2.4', title: 'Indicators of malicious activity', code: 'READ THE INDICATORS',
    goal: 'Recognize malware types, physical, network, application, password and crypto attacks — and the indicators that reveal them.',
    lesson: [
      { h: 'Malware by symptom', html: '<table><tr><th>Malware</th><th>Tell-tale sign</th></tr><tr><td>Ransomware</td><td>Files encrypted, ransom note</td></tr><tr><td>Trojan</td><td>Looks legitimate, hides malicious function</td></tr><tr><td>Worm</td><td>Spreads by itself across the network</td></tr><tr><td>Virus</td><td>Needs a host file/user action to spread</td></tr><tr><td>Spyware / keylogger</td><td>Watches activity / records keystrokes</td></tr><tr><td>Rootkit</td><td>Hides deep in the OS (kernel), evades tools</td></tr><tr><td>Logic bomb</td><td>Triggers on a date/event</td></tr><tr><td>Bloatware</td><td>Unwanted preinstalled software</td></tr></table>' },
      { h: 'Network & application attacks', html: '<ul><li><b>DDoS</b> (amplified/reflected — small request, big response sent to the victim), <b>DNS attacks</b>, <b>on-path</b> (man-in-the-middle), <b>credential replay</b>, wireless attacks.</li><li><b>Injection</b>, <b>buffer overflow</b>, <b>replay</b>, <b>privilege escalation</b>, <b>forgery</b> (CSRF/SSRF), <b>directory traversal</b> (<code>../../etc/passwd</code>).</li><li>Physical: brute force (forcing a door), <b>RFID cloning</b>, environmental.</li><li>Crypto: <b>downgrade</b> (force weaker protocol), <b>collision</b>, <b>birthday</b>.</li></ul>' },
      { h: 'Password attacks', html: '<ul><li><b>Brute force</b>: many passwords against <b>one</b> account → lockouts on one user.</li><li><b>Password spraying</b>: one or a few common passwords against <b>many</b> accounts → a few failures per user across many users, avoiding lockout.</li><li>Dictionary, credential stuffing (reusing leaked username/password pairs).</li></ul>' },
      { h: 'Indicators', html: '<p>Account lockout · concurrent session usage · blocked content · <b>impossible travel</b> (logins from two distant places minutes apart) · resource consumption · resource inaccessibility · out-of-cycle logging · published/documented (the data shows up online) · missing logs (attacker covering tracks).</p>' }
    ],
    cards: [['Ransomware', 'Encrypts data and demands payment.'], ['Worm', 'Self-propagating malware.'], ['Trojan', 'Malware disguised as legitimate software.'], ['Rootkit', 'Hides at a privileged level to evade detection.'], ['Logic bomb', 'Malicious code triggered by a condition.'], ['Keylogger', 'Records keystrokes.'], ['Password spraying', 'Few passwords tried against many accounts.'], ['Brute force', 'Many passwords tried against one account.'], ['Credential stuffing', 'Leaked credential pairs reused on other sites.'], ['Directory traversal', '../ sequences to read files outside the web root.'], ['On-path attack', 'Attacker intercepts traffic between two parties.'], ['Downgrade attack', 'Forces use of a weaker protocol or cipher.'], ['Impossible travel', 'Logins from distant locations too close in time.'], ['Missing logs', 'Gaps that may mean an attacker erased evidence.']],
    labs: ['l-indicators'] });

  O({ obj: '2.5', title: 'Mitigation techniques', code: 'SEGMENT PATCH HARDEN',
    goal: 'Segmentation, access control, application allow lists, isolation, patching, encryption, monitoring, least privilege, configuration enforcement, decommissioning and hardening.',
    lesson: [
      { h: 'The mitigation toolbox', html: '<ul><li><b>Segmentation</b> — split the network so a breach can\'t spread (VLANs, subnets, microsegmentation).</li><li><b>Access control</b> — ACLs and permissions.</li><li><b>Application allow list</b> — only approved software runs (stronger than a deny list).</li><li><b>Isolation</b> — quarantine a suspect host.</li><li><b>Patching</b>, <b>encryption</b>, <b>monitoring</b>, <b>least privilege</b>.</li><li><b>Configuration enforcement</b> — baselines pushed and checked (GPO, MDM, config management).</li><li><b>Decommissioning</b> — retire systems properly (wipe, remove from inventory/DNS).</li></ul>' },
      { h: 'Hardening techniques', html: '<ul><li>Encryption, installing <b>endpoint protection</b> (EDR), <b>host-based firewall</b>, <b>HIPS</b>.</li><li><b>Disable ports/protocols</b> and services you don\'t need.</li><li><b>Change default passwords</b>.</li><li><b>Remove unnecessary software</b> — smaller attack surface.</li></ul>' }
    ],
    cards: [['Segmentation', 'Dividing the network to contain breaches.'], ['Application allow list', 'Only explicitly approved applications may run.'], ['Isolation', 'Separating a compromised system from the network.'], ['Least privilege', 'Only the access required for the job.'], ['Configuration enforcement', 'Automatically applying and checking secure baselines.'], ['Decommissioning', 'Securely retiring systems and data.'], ['HIPS', 'Host-based intrusion prevention system.'], ['Hardening', 'Reducing attack surface: disable, remove, change defaults.']],
    labs: ['l-mitigate'] });

  window.SEC.boss(2, { title: 'Threats, Vulnerabilities & Mitigations', code: 'DOMAIN TWO DEFEATED',
    goal: 'Hard-mode scenarios across 2.1–2.5 — the second biggest domain.',
    lesson: [{ h: 'Domain 2 recap', html: '<ul><li>Actor = who; motivation = why. Nation-state → espionage/war; organized crime → money; hacktivist → beliefs; insider → revenge/money; Shadow IT → convenience, no malice.</li><li>Vectors: message, file, voice, removable media, unsupported software, open ports, default creds, supply chain, people.</li><li>SQLi → parameterized queries. XSS → output encoding. TOCTOU = timing. VM escape. Zero-day = no patch.</li><li>Spraying = few passwords, many accounts. Brute force = many passwords, one account. Impossible travel, missing logs, out-of-cycle logging.</li><li>Mitigate: segment, allow-list, isolate, patch, encrypt, monitor, least privilege, enforce config, decommission, harden.</li></ul>' }] });

  // ---------------- labs ----------------
  var ACT = ['Nation-state', 'Unskilled attacker', 'Hacktivist', 'Insider threat', 'Organized crime', 'Shadow IT'];
  var MOT = ['Espionage', 'War / disruption', 'Financial gain', 'Philosophical / political beliefs', 'Revenge', 'Convenience (no malicious intent)', 'Thrill / notoriety'];
  L['l-actors'] = { kind: 'match', title: 'Profile the threat actor', sum: 'Actor + motivation from 8 scenarios',
    brief: 'Read each incident summary and pick the most likely <b>actor</b> and their <b>motivation</b>.',
    cols: [{ name: 'Actor', options: ACT }, { name: 'Motivation', options: MOT }],
    items: [
      { t: 'A months-long stealthy intrusion into a defense contractor quietly copies design documents.', a: ['Nation-state', 'Espionage'], why: 'Long-term stealth and state secrets = APT espionage.' },
      { t: 'Ransomware encrypts a hospital\'s systems; the group runs a support desk to take payment.', a: ['Organized crime', 'Financial gain'], why: 'Professionalized profit operation.' },
      { t: 'A group defaces an oil company\'s website with climate protest slogans.', a: ['Hacktivist', 'Philosophical / political beliefs'], why: 'Ideological message.' },
      { t: 'A fired admin uses a still-active account to delete production databases.', a: ['Insider threat', 'Revenge'], why: 'Authorized access misused out of anger.' },
      { t: 'Marketing starts storing customer lists in an unapproved file-sharing app because it is easier.', a: ['Shadow IT', 'Convenience (no malicious intent)'], why: 'Unapproved tech, no intent to harm.' },
      { t: 'A teenager runs a downloaded DDoS tool against a game server to brag online.', a: ['Unskilled attacker', 'Thrill / notoriety'], why: 'Borrowed tools, bragging rights.' },
      { t: 'Malware disables a rival country\'s power grid during a border conflict.', a: ['Nation-state', 'War / disruption'], why: 'Critical-infrastructure attack tied to conflict.' },
      { t: 'An employee sells customer records to a competitor.', a: ['Insider threat', 'Financial gain'], why: 'Insider motivated by money.' }
    ], debrief: 'Identify WHO from resources and access, and WHY from the goal — not from the damage done.' };
  L['l-social'] = { kind: 'match', title: 'Name the social-engineering vector', sum: '10 lures, name each one',
    brief: 'Each message or event is a human-vector attack. Name it precisely — the exam rewards the most specific term.',
    options: ['Phishing', 'Spear phishing', 'Whaling', 'Smishing', 'Vishing', 'Business email compromise', 'Pretexting', 'Watering hole', 'Typosquatting', 'Brand impersonation', 'Removable device (USB drop)'],
    items: [
      { t: 'Thousands of employees get a generic "your mailbox is full" email.', a: 'Phishing', why: 'Broad, untargeted.' },
      { t: 'An email to the accounts payable clerk references her real manager and a real invoice number.', a: 'Spear phishing', why: 'Researched and targeted at one person.' },
      { t: 'A fake legal summons is emailed only to the CEO and CFO.', a: 'Whaling', why: 'Targets executives.' },
      { t: 'A text says your package is held and links to a fake carrier site.', a: 'Smishing', why: 'SMS.' },
      { t: 'A caller claiming to be IT asks a user to read out the MFA code.', a: 'Vishing', why: 'Voice.' },
      { t: 'The real vendor\'s mailbox, now compromised, emails new bank details for future payments.', a: 'Business email compromise', why: 'Trusted account used to redirect payments.' },
      { t: 'Someone in a hi-vis vest says he\'s auditing fire alarms and needs into the server room.', a: 'Pretexting', why: 'An invented story to justify access.' },
      { t: 'A forum popular with the target company\'s engineers is compromised to serve malware.', a: 'Watering hole', why: 'Poison the place the targets go.' },
      { t: 'Users are lured to micros0ft-support.com.', a: 'Typosquatting', why: 'Look-alike domain.' },
      { t: 'USB sticks labeled "Payroll Q4" are left in the parking lot.', a: 'Removable device (USB drop)', why: 'Bait media.' }
    ], debrief: 'Channel (email/SMS/voice), target (broad/person/exec) and trick (story, trusted account, look-alike) give you the exact term.' };
  L['l-indicators'] = { kind: 'match', title: 'Triage the alerts', sum: 'Read 10 log excerpts and identify the activity',
    brief: 'You are the SOC analyst. Each item is a simplified log excerpt or alert from <b>your own</b> organization\'s systems. Identify what activity it indicates.',
    options: ['Password spraying', 'Brute force', 'SQL injection', 'Cross-site scripting', 'Directory traversal', 'Impossible travel', 'DDoS', 'Ransomware', 'Privilege escalation', 'Log tampering', 'Worm', 'Downgrade attack'],
    items: [
      { t: '<code>09:01–09:04 auth fail user=alice, bob, carol, dave, erin … (240 users), 1 attempt each, password=Winter2026!</code>', a: 'Password spraying', why: 'One password, many accounts, low per-user count.' },
      { t: '<code>auth fail user=admin ×3,000 from 203.0.113.9 in 10 min → account locked</code>', a: 'Brute force', why: 'Many passwords against one account.' },
      { t: '<code>GET /item?id=7 OR 1=1-- 200 (rows returned: 18,442)</code>', a: 'SQL injection', why: 'Input changed the query logic.' },
      { t: '<code>POST /comment body="&lt;script&gt;new Image().src=…+document.cookie&lt;/script&gt;"</code>', a: 'Cross-site scripting', why: 'Script stored for other users\' browsers.' },
      { t: '<code>GET /download?file=../../../../windows/win.ini</code>', a: 'Directory traversal', why: '../ walking out of the web root.' },
      { t: 'VPN login for jsmith from Chicago at 08:02 and from Singapore at 08:19.', a: 'Impossible travel', why: 'Physically impossible in 17 minutes.' },
      { t: 'Web tier at 100% CPU; 40,000 requests/s from thousands of residential IPs.', a: 'DDoS', why: 'Distributed resource exhaustion.' },
      { t: 'File server: 90,000 files renamed to *.locked in 6 minutes; README_RESTORE.txt in every folder.', a: 'Ransomware', why: 'Mass encryption plus ransom note.' },
      { t: 'Standard user "temp1" is added to the local Administrators group by a script it ran.', a: 'Privilege escalation', why: 'Gaining rights beyond those assigned.' },
      { t: 'Security log on DC01 cleared (event 1102) at 03:14 with no change ticket.', a: 'Log tampering', why: 'Missing/cleared logs = covering tracks.' },
      { t: 'Same exploit traffic appears from host to host across three subnets with no user action.', a: 'Worm', why: 'Self-propagation.' },
      { t: 'Client and server negotiate SSL 3.0 after a middlebox strips TLS 1.3 from the handshake.', a: 'Downgrade attack', why: 'Forced weaker protocol.' }
    ], debrief: 'Look at the shape of the evidence: how many accounts, how many attempts, what the input contains, what changed, and what is missing.' };
  L['l-mitigate'] = { kind: 'match', title: 'Choose the best mitigation', sum: 'Match 9 problems to the mitigation that fits',
    brief: 'Pick the <b>best</b> mitigation for each situation.',
    options: ['Segmentation', 'Application allow list', 'Isolation', 'Patching', 'Encryption', 'Least privilege', 'Configuration enforcement', 'Decommissioning', 'Change default passwords', 'Disable unused ports/services'],
    items: [
      { t: 'Only the five approved programs should ever run on kiosk PCs.', a: 'Application allow list', why: 'Default-deny for software.' },
      { t: 'A workstation is beaconing to a known command-and-control server right now.', a: 'Isolation', why: 'Contain it immediately.' },
      { t: 'Flat network: a compromised printer could reach the payment servers.', a: 'Segmentation', why: 'Separate zones limit lateral movement.' },
      { t: 'Vendor released a fix for a remotely exploitable flaw in your VPN appliance.', a: 'Patching', why: 'Apply the fix.' },
      { t: 'Interns have domain admin "so they don\'t get blocked."', a: 'Least privilege', why: 'Remove unneeded rights.' },
      { t: 'Settings on 400 laptops drift from the baseline after users tweak them.', a: 'Configuration enforcement', why: 'Push and re-apply the baseline automatically.' },
      { t: 'An old file server nobody uses is still powered on and in DNS.', a: 'Decommissioning', why: 'Retire it properly — wipe, remove records.' },
      { t: 'New IP cameras still accept admin/admin.', a: 'Change default passwords', why: 'Default credentials are a top vector.' },
      { t: 'A web server also runs FTP and Telnet that nobody needs.', a: 'Disable unused ports/services', why: 'Reduce attack surface.' },
      { t: 'Laptops are often lost in airports and hold customer data.', a: 'Encryption', why: 'Full-disk encryption protects data at rest.' }
    ], debrief: 'Match the mitigation to the root problem: who can run, who can reach, who has rights, what is exposed.' };
})();
