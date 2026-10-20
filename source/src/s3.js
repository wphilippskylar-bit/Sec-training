/* Domain 3 — Security Architecture (18%) */
(function () {
  var O = window.SEC.obj, L = COURSE.labs;

  O({ obj: '3.1', title: 'Architecture models', code: 'SHARED RESPONSIBILITY',
    goal: 'Cloud, IaC, serverless, microservices, on-prem, centralized vs decentralized, containers, virtualization, IoT, ICS/SCADA, RTOS and embedded systems — and their security trade-offs.',
    lesson: [
      { h: 'Cloud and responsibility', html: '<table><tr><th>Model</th><th>You manage</th><th>Provider manages</th></tr><tr><td>IaaS</td><td>OS, apps, data, config</td><td>Hardware, hypervisor, facility</td></tr><tr><td>PaaS</td><td>Apps, data</td><td>Runtime, OS, infrastructure</td></tr><tr><td>SaaS</td><td>Data, users, access</td><td>Almost everything else</td></tr></table><p>The <b>responsibility matrix</b> (shared responsibility model) defines who secures what. <b>Hybrid</b> = on-prem + cloud. <b>Third-party vendors</b> add supply-chain risk.</p>' },
      { h: 'Modern architecture', html: '<ul><li><b>Infrastructure as Code (IaC)</b> — infrastructure defined in templates: repeatable, reviewable, but a bad template replicates mistakes everywhere.</li><li><b>Serverless</b> — run functions without managing servers; provider handles the OS.</li><li><b>Microservices</b> — small independent services talking over APIs; more API surface to secure.</li><li><b>Network infrastructure</b>: physical isolation (<b>air gap</b>), logical segmentation, <b>SDN</b> (software-defined networking — control plane separated from data plane).</li><li><b>Centralized vs decentralized</b> — single point of control/failure vs distributed resilience but harder governance.</li><li><b>Containerization</b> (share the host kernel, lightweight) vs <b>virtualization</b> (full guest OS on a hypervisor).</li></ul>' },
      { h: 'Specialized systems', html: '<ul><li><b>IoT</b> — weak defaults, rarely patched → segment them.</li><li><b>ICS/SCADA</b> — industrial control; availability and safety first, legacy protocols → isolate/air-gap.</li><li><b>RTOS</b> — real-time OS with strict timing (vehicles, medical).</li><li><b>Embedded systems</b> — fixed-function, hard to patch.</li><li><b>High availability</b> — redundancy so a failure doesn\'t stop service.</li></ul><p>Considerations the exam lists: availability, resilience, cost, responsiveness, scalability, ease of deployment, risk transference, ease of recovery, patch availability, inability to patch, power, compute.</p>' }
    ],
    cards: [['Shared responsibility model', 'Division of security duties between cloud provider and customer.'], ['IaaS', 'You manage OS and up; provider manages hardware.'], ['PaaS', 'You manage apps and data; provider manages platform.'], ['SaaS', 'Provider manages the app; you manage data and access.'], ['IaC', 'Infrastructure defined as code templates.'], ['Serverless', 'Run functions without managing servers.'], ['Microservices', 'App built from small independent API-connected services.'], ['Air gap', 'Physical isolation from other networks.'], ['SDN', 'Software-defined networking; separates control and data planes.'], ['Container', 'Isolated app runtime sharing the host kernel.'], ['ICS/SCADA', 'Industrial control systems; availability and safety critical.'], ['RTOS', 'Real-time operating system with deterministic timing.']] });

  O({ obj: '3.2', title: 'Secure enterprise infrastructure', code: 'DMZ BETWEEN TWO WORLDS',
    goal: 'Device placement, security zones, attack surface, connectivity, failure modes, appliances (jump server, proxy, IDS/IPS, load balancer, sensors), port security, firewall types, VPN/IPsec/TLS, SD-WAN and SASE.',
    lesson: [
      { h: 'Placement, zones, failure modes', html: '<ul><li><b>Security zones</b>: internet (untrusted) → <b>screened subnet/DMZ</b> (public-facing servers) → internal → restricted. Place devices by what must reach them.</li><li><b>Fail-open</b> keeps traffic flowing if the device fails (availability); <b>fail-closed</b> blocks everything (security).</li><li><b>Inline / active</b> devices sit in the traffic path and can block (IPS); <b>tap / monitor / passive</b> devices see a copy and only alert (IDS).</li></ul>' },
      { h: 'Appliances', html: '<table><tr><th>Device</th><th>Purpose</th></tr><tr><td>Jump server</td><td>Hardened host admins go through to reach secure zones</td></tr><tr><td>Proxy server</td><td>Makes requests on behalf of clients; filtering, caching (reverse proxy = in front of servers)</td></tr><tr><td>IDS / IPS</td><td>Detect / detect + block (signature or anomaly)</td></tr><tr><td>Load balancer</td><td>Spreads traffic across servers (active/active, active/passive)</td></tr><tr><td>Sensors</td><td>Collect traffic/data for monitoring</td></tr><tr><td>WAF</td><td>Layer-7 firewall for web apps (SQLi, XSS)</td></tr><tr><td>UTM</td><td>All-in-one: firewall, IPS, AV, filtering</td></tr><tr><td>NGFW</td><td>Application-aware firewall with IPS and identity</td></tr><tr><td>Layer 4 vs Layer 7 firewall</td><td>Ports/IPs vs application content</td></tr></table>' },
      { h: 'Port security & secure communication', html: '<ul><li><b>802.1X</b> port-based NAC with <b>EAP</b>, usually backed by RADIUS — authenticate before the port passes traffic.</li><li><b>VPN</b>: remote access (user) or site-to-site. <b>IPsec</b>: <b>AH</b> = integrity/authentication only, <b>ESP</b> = encryption + integrity; <b>tunnel mode</b> encrypts the whole packet (site-to-site), <b>transport mode</b> just the payload. <b>TLS</b> VPN works through browsers.</li><li><b>SD-WAN</b> — software-defined WAN across links (broadband, LTE, MPLS).</li><li><b>SASE</b> — cloud-delivered networking + security (SD-WAN, SWG, CASB, ZTNA, FWaaS) close to users.</li></ul>' }
    ],
    cards: [['Screened subnet (DMZ)', 'Zone for public-facing servers between internet and internal network.'], ['Fail-open', 'On failure, traffic passes (availability first).'], ['Fail-closed', 'On failure, traffic is blocked (security first).'], ['IDS', 'Passive: detects and alerts.'], ['IPS', 'Inline: detects and blocks.'], ['Jump server', 'Hardened intermediary host for admin access.'], ['Reverse proxy', 'Sits in front of servers handling inbound requests.'], ['WAF', 'Web application firewall (layer 7).'], ['NGFW', 'Next-gen, application-aware firewall.'], ['UTM', 'Unified threat management all-in-one appliance.'], ['802.1X', 'Port-based network access control using EAP/RADIUS.'], ['IPsec ESP', 'Encrypts and authenticates IPsec payloads.'], ['IPsec AH', 'Authenticates/integrity only, no encryption.'], ['Tunnel mode', 'IPsec encrypts the entire original packet.'], ['SASE', 'Cloud-delivered network + security services.'], ['SD-WAN', 'Software-defined management of WAN links.']],
    labs: ['l-zones', 'l-acl'] });

  O({ obj: '3.3', title: 'Protecting data', code: 'CLASSIFY THEN PROTECT',
    goal: 'Data types, classifications, states, sovereignty and geolocation, and methods: encryption, hashing, masking, tokenization, obfuscation, segmentation, permission restrictions.',
    lesson: [
      { h: 'Types and classifications', html: '<ul><li>Types: <b>regulated</b> (PII, PHI, PCI), <b>trade secret</b>, <b>intellectual property</b>, <b>legal</b>, <b>financial</b>, human- vs non-human-readable.</li><li>Classifications: <b>sensitive</b>, <b>confidential</b>, <b>public</b>, <b>restricted</b>, <b>private</b>, <b>critical</b>. Classification decides the controls.</li></ul>' },
      { h: 'States of data', html: '<table><tr><th>State</th><th>Protect with</th></tr><tr><td><b>At rest</b> (stored)</td><td>Full-disk / database / file encryption, permissions</td></tr><tr><td><b>In transit</b> (moving)</td><td>TLS, IPsec, VPN</td></tr><tr><td><b>In use</b> (in memory/processing)</td><td>Secure enclaves, memory protection, access control</td></tr></table><p><b>Data sovereignty</b> — data is subject to the laws of the country where it is stored. <b>Geolocation</b> — restrict where data/users can be.</p>' },
      { h: 'Methods', html: '<ul><li><b>Encryption</b> (reversible with the key) vs <b>hashing</b> (one-way).</li><li><b>Masking</b> — hide part of the value for display (****1234).</li><li><b>Tokenization</b> — substitute a meaningless token; original kept in a vault.</li><li><b>Obfuscation</b> — make it hard to understand.</li><li><b>Segmentation</b> — keep sensitive data in separate zones.</li><li><b>Permission restrictions</b> — least privilege on the data itself.</li></ul>' }
    ],
    cards: [['Data at rest', 'Stored data; protect with encryption at rest.'], ['Data in transit', 'Moving data; protect with TLS/IPsec.'], ['Data in use', 'Being processed in memory.'], ['Data sovereignty', 'Data is subject to the laws where it is stored.'], ['PII', 'Personally identifiable information.'], ['PHI', 'Protected health information.'], ['Masking', 'Hide part of data for display.'], ['Regulated data', 'Data governed by law or industry rules.']],
    labs: ['l-data'] });

  O({ obj: '3.4', title: 'Resilience & recovery', code: 'RPO DATA RTO TIME',
    goal: 'High availability, site considerations, platform diversity, multi-cloud, continuity of operations, capacity planning, testing, backups and power.',
    lesson: [
      { h: 'Availability', html: '<ul><li><b>High availability</b>: load balancing vs <b>clustering</b> (servers acting as one, failover).</li><li><b>Sites</b>: <b>hot</b> (ready now, most expensive), <b>warm</b> (hardware, needs data/config), <b>cold</b> (space and power only, cheapest, slowest). <b>Geographic dispersion</b> so one disaster can\'t take both.</li><li><b>Platform diversity</b> and <b>multi-cloud</b> avoid single-vendor failure.</li><li><b>Continuity of operations (COOP)</b>, <b>capacity planning</b> (people, technology, infrastructure).</li></ul>' },
      { h: 'Metrics', html: '<table><tr><th>Metric</th><th>Means</th></tr><tr><td><b>RPO</b></td><td>Max acceptable <b>data loss</b>, in time (e.g. 4 h → back up at least every 4 h)</td></tr><tr><td><b>RTO</b></td><td>Max time to <b>restore service</b></td></tr><tr><td><b>MTTR</b></td><td>Mean time to repair</td></tr><tr><td><b>MTBF</b></td><td>Mean time between failures (reliability)</td></tr></table>' },
      { h: 'Backups', html: '<ul><li><b>Full</b> — everything; fastest restore.</li><li><b>Incremental</b> — changes since the <i>last backup of any kind</i>; fastest backup; restore = last full + <b>every</b> incremental since.</li><li><b>Differential</b> — changes since the <i>last full</i>; restore = last full + the <b>latest</b> differential.</li><li><b>Snapshots</b>, <b>replication</b> (near-real-time copy), <b>journaling</b>, onsite vs offsite, frequency, <b>encryption</b> of backups.</li></ul>' },
      { h: 'Testing & power', html: '<p>Testing: <b>tabletop exercises</b> (discussion), <b>fail over</b>, <b>simulation</b>, <b>parallel processing</b>. Power: <b>UPS</b> (short-term battery, clean shutdown), <b>generators</b> (long-term).</p>' }
    ],
    cards: [['Hot site', 'Fully equipped and ready almost immediately.'], ['Warm site', 'Partially equipped; needs data and configuration.'], ['Cold site', 'Space and power only; slowest to activate.'], ['RPO', 'Maximum acceptable data loss measured in time.'], ['RTO', 'Maximum acceptable time to restore.'], ['MTTR', 'Mean time to repair.'], ['MTBF', 'Mean time between failures.'], ['Incremental backup', 'Changes since last backup; restore needs full + all incrementals.'], ['Differential backup', 'Changes since last full; restore needs full + latest differential.'], ['Clustering', 'Multiple servers acting as one with failover.'], ['UPS', 'Battery power for short outages.'], ['Tabletop exercise', 'Discussion-based walk-through of a scenario.']],
    labs: ['l-recovery'] });

  window.SEC.boss(3, { title: 'Security Architecture', code: 'DOMAIN THREE DEFEATED',
    goal: 'Hard-mode scenarios across 3.1–3.4.',
    lesson: [{ h: 'Domain 3 recap', html: '<ul><li>IaaS/PaaS/SaaS responsibility; IaC, serverless, microservices, containers vs VMs, air gap, SDN, IoT/ICS/RTOS/embedded.</li><li>DMZ for public servers. Fail-open vs fail-closed. IDS passive vs IPS inline. Jump server, proxy, WAF, NGFW, UTM, load balancer.</li><li>802.1X/EAP/RADIUS. IPsec AH vs ESP, tunnel vs transport. SD-WAN, SASE.</li><li>Data at rest / in transit / in use. Sovereignty. Masking vs tokenization vs encryption vs hashing.</li><li>Hot/warm/cold. RPO = data, RTO = time. Incremental vs differential restore. UPS vs generator. Tabletop.</li></ul>' }] });

  // ---------------- labs ----------------
  L['l-zones'] = { kind: 'match', title: 'Place it in the right zone', sum: 'Design a segmented network',
    brief: 'You are designing the network for a mid-size company. Place each system in the zone where it belongs.',
    options: ['Screened subnet (DMZ)', 'Internal user LAN', 'Server / data center VLAN', 'Management VLAN', 'OT / ICS segment (isolated)', 'Guest Wi-Fi', 'IoT VLAN'],
    items: [
      { t: 'Public company website', a: 'Screened subnet (DMZ)', why: 'Internet-facing, so it sits between the internet and internal zones.' },
      { t: 'Inbound email gateway / mail relay', a: 'Screened subnet (DMZ)', why: 'Accepts connections from the internet.' },
      { t: 'Employee laptops and desktops', a: 'Internal user LAN', why: 'Trusted users, still separated from servers.' },
      { t: 'HR database server', a: 'Server / data center VLAN', why: 'Sensitive internal data; reachable only from approved sources.' },
      { t: 'Switch and firewall admin interfaces, jump server', a: 'Management VLAN', why: 'Admin plane is separated and tightly restricted.' },
      { t: 'PLCs controlling the plant\'s chemical mixers', a: 'OT / ICS segment (isolated)', why: 'Safety-critical, legacy protocols — isolate or air-gap.' },
      { t: 'Visitors\' phones', a: 'Guest Wi-Fi', why: 'Internet only; no route to internal zones.' },
      { t: 'Smart thermostats and lobby TVs', a: 'IoT VLAN', why: 'Weak, rarely patched devices are fenced off.' }
    ], debrief: 'Place systems by who must reach them and how sensitive they are; untrusted and fragile devices get their own segments.' };
  L['l-acl'] = { kind: 'acl', title: 'Firewall PBQ: write the rule set', sum: 'Build an ACL that passes 8 traffic tests', rows: 5, maxRules: 5,
    brief: 'Configure the perimeter firewall. Requirements:<ol><li>Anyone on the internet may reach the <b>web server</b> on <b>HTTPS</b> only.</li><li>Internal users may reach the internet on <b>HTTPS</b>.</li><li>Internal users may query the <b>internal DNS server</b> (UDP 53).</li><li>Only the <b>admin jump host</b> may SSH to the web server.</li><li>Everything else is denied.</li></ol>Rules are evaluated top-down, first match wins, with an implicit deny at the end.',
    nets: [['0.0.0.0/0', 'Internet'], ['203.0.113.10', 'Web server (DMZ)'], ['10.10.0.0/16', 'Internal users'], ['10.20.0.53', 'Internal DNS'], ['10.30.0.5', 'Admin jump host']],
    tests: [
      { name: 'Internet customer → web HTTPS', src: '198.51.100.20', dst: '203.0.113.10', proto: 'TCP', port: 443, expect: 'ALLOW' },
      { name: 'Internet → web HTTP (plain)', src: '198.51.100.20', dst: '203.0.113.10', proto: 'TCP', port: 80, expect: 'DENY' },
      { name: 'Internet → web SSH', src: '198.51.100.20', dst: '203.0.113.10', proto: 'TCP', port: 22, expect: 'DENY' },
      { name: 'Jump host → web SSH', src: '10.30.0.5', dst: '203.0.113.10', proto: 'TCP', port: 22, expect: 'ALLOW' },
      { name: 'Internal user → web SSH', src: '10.10.4.50', dst: '203.0.113.10', proto: 'TCP', port: 22, expect: 'DENY' },
      { name: 'Internal user → internet HTTPS', src: '10.10.4.50', dst: '142.250.80.46', proto: 'TCP', port: 443, expect: 'ALLOW' },
      { name: 'Internal user → DNS', src: '10.10.4.50', dst: '10.20.0.53', proto: 'UDP', port: 53, expect: 'ALLOW' },
      { name: 'Internal user → internet Telnet', src: '10.10.4.50', dst: '192.0.2.77', proto: 'TCP', port: 23, expect: 'DENY' }
    ],
    hints: ['Who <i>starts</i> the connection is the <b>source</b>. Customers start connections to the web server, so the source is Internet and the destination is the web server.', 'Rule for internal browsing: source Internal users, destination Internet (0.0.0.0/0), TCP 443, ALLOW. Note the internet range also contains the web server\'s public IP — that is fine here.', 'You don\'t need a final "deny all" rule: the implicit deny handles it. Four ALLOW rules are enough.'],
    debrief: 'Source = who starts the connection, the narrowest destination and port that meets the requirement, and let the implicit deny block the rest. That is the logic behind every firewall PBQ.' };
  L['l-data'] = { kind: 'match', title: 'Protect the data correctly', sum: 'State + method for 8 data scenarios',
    brief: 'For each scenario choose the <b>state</b> of the data and the <b>best protection method</b>.',
    cols: [{ name: 'State', options: ['At rest', 'In transit', 'In use'] }, { name: 'Method', options: ['Full-disk encryption', 'TLS', 'Tokenization', 'Masking', 'Hashing', 'Secure enclave', 'Permission restrictions', 'Geolocation restriction'] }],
    items: [
      { t: 'Customer card numbers stored by the e-commerce app, which never needs the real number after checkout.', a: ['At rest', 'Tokenization'], why: 'Replace with tokens; the vault holds the real values.' },
      { t: 'Call-center screen should show only the last four digits of an SSN.', a: ['In use', 'Masking'], why: 'Hide most of the value during display.' },
      { t: 'Laptops carrying engineering drawings.', a: ['At rest', 'Full-disk encryption'], why: 'Protects data if the device is lost.' },
      { t: 'Browser sessions to the HR portal.', a: ['In transit', 'TLS'], why: 'Encrypts data moving over the network.' },
      { t: 'Stored user passwords.', a: ['At rest', 'Hashing'], why: 'Store salted hashes, never reversible values.' },
      { t: 'Biometric templates processed on a phone.', a: ['In use', 'Secure enclave'], why: 'Isolated processing hardware.' },
      { t: 'Payroll share readable by everyone in the company.', a: ['At rest', 'Permission restrictions'], why: 'Least privilege on the folder.' },
      { t: 'EU customer records must not be stored outside the EU.', a: ['At rest', 'Geolocation restriction'], why: 'Data sovereignty requirement.' }
    ], debrief: 'Identify the state first; then choose the method that keeps the data usable for the business while protecting it.' };
  L['l-recovery'] = { kind: 'calc', title: 'Recovery math', sum: 'Backups, RPO and availability numbers', tolPct: 1,
    brief: 'A company runs a <b>full backup every Sunday at 01:00</b> and backups every other night at 01:00. The server fails <b>Thursday at 15:00</b>.',
    fields: [
      { label: 'If the nightly backups are <b>incremental</b>: how many backup sets must be restored (count the full too)?', a: 5, why: 'Sunday full + Mon, Tue, Wed, Thu incrementals = 5.' },
      { label: 'If the nightly backups are <b>differential</b>: how many backup sets must be restored?', a: 2, why: 'Sunday full + Thursday\'s differential = 2.' },
      { label: 'With backups only at 01:00, how many hours of data are lost (failure at 15:00)?', a: 14, unit: 'hours', why: '01:00 to 15:00 = 14 hours since the last backup.' },
      { label: 'The business sets an RPO of 4 hours. What is the longest allowed interval between backups, in hours?', a: 4, unit: 'hours', why: 'RPO = maximum data loss, so back up at least every 4 hours.' },
      { label: 'A server has MTBF of 1,000 h and MTTR of 10 h. Availability = MTBF ÷ (MTBF + MTTR). Enter as a percentage (two decimals).', a: 99.01, show: '99.01', unit: '%', why: '1000 / 1010 = 0.990099 → 99.01%.' }
    ], debrief: 'Incremental = fast backups, slow restores; differential = the reverse. RPO is about data, RTO about time; MTBF/MTTR drive availability.' };
})();
