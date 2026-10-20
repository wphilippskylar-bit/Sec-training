/* Domain 4 — Security Operations (28%, the largest domain) */
(function () {
  var O = window.SEC.obj, L = COURSE.labs;

  O({ obj: '4.1', title: 'Secure baselines & hardening', code: 'BASELINE DEPLOY MAINTAIN',
    goal: 'Secure baselines (establish, deploy, maintain); hardening targets; wireless security; mobile device management and deployment models; application security; sandboxing; monitoring.',
    lesson: [
      { h: 'Secure baselines', html: '<p><b>Establish</b> (from vendor guides, CIS Benchmarks), <b>deploy</b> (GPO, MDM, configuration management, IaC) and <b>maintain</b> (scan for drift, update as threats change).</p><p>Hardening targets: mobile devices, workstations, switches, routers, cloud infrastructure, servers, ICS/SCADA, embedded systems, RTOS, IoT — disable what you don\'t need, change defaults, patch, restrict management access.</p>' },
      { h: 'Wireless', html: '<ul><li><b>WPA3</b> — SAE (Simultaneous Authentication of Equals) replaces PSK handshake; resists offline dictionary attacks. WPA2 still common.</li><li><b>AAA/RADIUS</b> for enterprise Wi-Fi with <b>802.1X/EAP</b> (EAP-TLS uses certificates on both sides; PEAP uses a server certificate + password).</li><li><b>Site survey</b> and <b>heat maps</b> to place access points and find rogue APs; installation considerations.</li></ul>' },
      { h: 'Mobile', html: '<ul><li><b>MDM</b> — enforce PIN, encryption, remote wipe, app control.</li><li>Deployment models: <b>BYOD</b> (user owns), <b>COPE</b> (corporate-owned, personally enabled), <b>CYOD</b> (choose from an approved list).</li><li>Connection methods: cellular, Wi-Fi, Bluetooth.</li></ul>' },
      { h: 'Application security', html: '<ul><li><b>Input validation</b> (server side), <b>secure cookies</b> (Secure, HttpOnly, SameSite), <b>static code analysis (SAST)</b>, <b>code signing</b>.</li><li><b>Sandboxing</b> — run untrusted code in an isolated environment.</li><li><b>Monitoring</b> of applications and systems.</li></ul>' }
    ],
    cards: [['Secure baseline', 'Documented secure configuration standard.'], ['CIS Benchmark', 'Consensus hardening guide for a platform.'], ['Configuration drift', 'Systems slowly deviating from the baseline.'], ['WPA3 SAE', 'Handshake resistant to offline dictionary attacks.'], ['EAP-TLS', 'Certificate-based mutual Wi-Fi authentication.'], ['Heat map', 'Visual wireless signal coverage from a site survey.'], ['MDM', 'Central management/enforcement for mobile devices.'], ['BYOD', 'Employee-owned devices used for work.'], ['COPE', 'Corporate-owned, personally enabled.'], ['CYOD', 'Choose your own device from an approved list.'], ['Sandboxing', 'Isolated environment for untrusted code.'], ['Code signing', 'Digitally signing code to prove origin and integrity.'], ['Secure cookie flags', 'Secure, HttpOnly, SameSite.']],
    labs: ['l-mobile'] });

  O({ obj: '4.2', title: 'Asset management', code: 'YOU CANNOT PROTECT WHAT YOU CANNOT SEE',
    goal: 'Acquisition/procurement, assignment and accounting, monitoring and tracking, and disposal/decommissioning — sanitization, destruction, certification and retention.',
    lesson: [
      { h: 'Lifecycle', html: '<ul><li><b>Acquisition/procurement</b> — buy from approved vendors with security requirements.</li><li><b>Assignment/accounting</b> — <b>ownership</b> (who is accountable) and <b>classification</b>.</li><li><b>Monitoring/asset tracking</b> — <b>inventory</b> and <b>enumeration</b> (discovering what is actually on the network).</li></ul>' },
      { h: 'Disposal', html: '<table><tr><th>Method</th><th>What it does</th></tr><tr><td><b>Sanitization</b></td><td>Overwrite/erase so data can\'t be recovered; device can be reused</td></tr><tr><td><b>Destruction</b></td><td>Shred, pulverize, incinerate, degauss (magnetic media) — device is gone</td></tr><tr><td><b>Certification</b></td><td>Documented proof (certificate of destruction) from the vendor</td></tr><tr><td><b>Data retention</b></td><td>Keep data as long as required by law/policy — no longer</td></tr></table><div class="callout trap"><b class="k">Trap</b>Degaussing does nothing to SSDs (no magnetic storage) — use cryptographic erase or physical destruction.</div>' }
    ],
    cards: [['Asset inventory', 'Authoritative list of hardware, software and data assets.'], ['Enumeration', 'Discovering assets actually present on the network.'], ['Asset owner', 'Person accountable for an asset.'], ['Sanitization', 'Erasing data so it cannot be recovered; device reusable.'], ['Destruction', 'Physically destroying media.'], ['Degaussing', 'Erasing magnetic media with a strong field; useless on SSDs.'], ['Certificate of destruction', 'Proof media was destroyed.'], ['Data retention', 'Keeping data only as long as required.']],
    qs: [
      Q('A company wants to reuse old HDDs in another department without any chance of recovering previous data. Best approach?', 'Sanitization (secure overwrite/erase) with verification', ['Deleting the files', 'Quick formatting', 'Degaussing and then reusing'], 'Sanitization allows reuse; degaussing destroys HDDs.', 4),
      Q('Which disposal method is ineffective on SSDs?', 'Degaussing', ['Shredding', 'Cryptographic erase', 'Pulverizing'], 'SSDs are not magnetic.', 4),
      Q('A vendor shreds the company\'s drives. What should the company obtain as proof?', 'A certificate of destruction', ['An SLA', 'An NDA', 'A CSR'], 'Certification documents the destruction.', 4),
      Q('Which activity discovers devices actually connected to the network, including ones missing from the inventory?', 'Enumeration', ['Classification', 'Procurement', 'Retention'], 'Enumeration finds what is really there.', 4),
      Q('Who is accountable for an asset, including approving who may use it?', 'The asset owner', ['The help desk', 'Any user of the asset', 'The vendor'], 'Ownership assigns accountability.', 4),
      Q('Policy says records must be kept 7 years then destroyed. Which concept is this?', 'Data retention', ['Data sovereignty', 'Tokenization', 'Enumeration'], 'Retention defines how long data is kept.', 4),
      Q('Security requirements are added to purchasing contracts before hardware is bought. Which lifecycle stage is this?', 'Acquisition / procurement', ['Decommissioning', 'Monitoring', 'Disposal'], 'Security starts at procurement.', 4),
      Q('Why must every asset have a classification?', 'Classification determines the controls required to protect it', ['It sets the purchase price', 'It replaces encryption', 'It is only needed for audits'], 'Controls follow classification.', 4),
      Q('An unknown server appears on the network that nobody owns. Which asset-management weakness does this reveal?', 'Incomplete inventory and ownership assignment', ['Too many backups', 'Excessive encryption', 'A strong change process'], 'Unknown assets are unmanaged risk.', 4),
      Q('Which method makes data on a self-encrypting drive unrecoverable almost instantly by destroying the key?', 'Cryptographic erase', ['Degaussing', 'File deletion', 'Defragmentation'], 'Without the key the ciphertext is useless.', 4)
    ] });

  O({ obj: '4.3', title: 'Vulnerability management', code: 'IDENTIFY ANALYZE REMEDIATE',
    goal: 'Identification methods, analysis (CVSS, CVE, false positives/negatives, prioritization, exposure, tolerance), response, validation and reporting.',
    lesson: [
      { h: 'Identification', html: '<ul><li><b>Vulnerability scan</b> (credentialed = deeper, non-credentialed = attacker\'s view), <b>application security</b>: static analysis (code), dynamic analysis (running app), package monitoring.</li><li><b>Threat feeds</b>: OSINT, proprietary, information-sharing organizations (ISACs), <b>dark web</b>.</li><li><b>Penetration testing</b>, <b>responsible disclosure / bug bounty</b>, <b>system/process audit</b>.</li></ul>' },
      { h: 'Analysis', html: '<ul><li><b>CVE</b> = the ID of a specific vulnerability. <b>CVSS</b> = its severity score (0–10).</li><li><b>False positive</b> = reported but not real; <b>false negative</b> = real but missed (the dangerous one).</li><li><b>Prioritize</b> by severity <i>and</i> exposure, environmental variables, industry/organizational impact, and <b>risk tolerance</b>. An internet-facing CVSS 8 often beats an isolated CVSS 9.</li></ul>' },
      { h: 'Response, validation, reporting', html: '<ul><li>Response: <b>patching</b>, <b>insurance</b>, <b>segmentation</b>, <b>compensating controls</b>, <b>exceptions and exemptions</b> (documented, time-limited acceptance).</li><li>Validation: <b>rescanning</b>, <b>audit</b>, <b>verification</b>.</li><li>Reporting to stakeholders.</li></ul>' }
    ],
    cards: [['CVE', 'Common Vulnerabilities and Exposures identifier.'], ['CVSS', 'Common Vulnerability Scoring System severity score.'], ['Credentialed scan', 'Scan logged in to the target; deeper, fewer false positives.'], ['False positive', 'Reported vulnerability that is not real.'], ['False negative', 'Real vulnerability the scan missed.'], ['Exposure factor (vuln mgmt)', 'How reachable/exposed the vulnerable asset is.'], ['Exception / exemption', 'Documented acceptance of an unremediated vulnerability.'], ['Rescan', 'Validates that remediation worked.'], ['ISAC', 'Industry information sharing and analysis center.'], ['Responsible disclosure', 'Reporting a flaw privately so it can be fixed first.']],
    labs: ['l-vulnprio'] });

  O({ obj: '4.4', title: 'Alerting & monitoring', code: 'SIEM SEES ALL',
    goal: 'Monitoring computing resources; activities (log aggregation, alerting, scanning, reporting, archiving, alert response, quarantine, tuning); tools (SCAP, benchmarks, agents, SIEM, AV, DLP, SNMP traps, NetFlow, vulnerability scanners).',
    lesson: [
      { h: 'Activities', html: '<ul><li><b>Log aggregation</b> — collect logs centrally.</li><li><b>Alerting</b> and <b>alert response/remediation/validation</b>; <b>quarantine</b>.</li><li><b>Alert tuning</b> — reduce false positives so real alerts get attention.</li><li>Scanning, reporting, <b>archiving</b> (retention for investigations/compliance).</li></ul>' },
      { h: 'Tools', html: '<table><tr><th>Tool</th><th>What it does</th></tr><tr><td><b>SIEM</b></td><td>Aggregates and correlates logs from many sources; alerts and dashboards</td></tr><tr><td><b>SCAP</b></td><td>Standards for automated configuration/vulnerability checking</td></tr><tr><td>Benchmarks</td><td>Secure configuration standards to check against</td></tr><tr><td>Agent vs agentless</td><td>Software on the host vs remote checks</td></tr><tr><td>Antivirus</td><td>Signature/heuristic malware detection</td></tr><tr><td><b>DLP</b></td><td>Detects/blocks sensitive data leaving</td></tr><tr><td><b>SNMP traps</b></td><td>Devices push alerts to a manager</td></tr><tr><td><b>NetFlow</b></td><td>Metadata about traffic flows (who talked to whom, how much) — not content</td></tr><tr><td>Vulnerability scanners</td><td>Find known weaknesses</td></tr></table>' }
    ],
    cards: [['SIEM', 'Central log aggregation, correlation and alerting.'], ['Log aggregation', 'Collecting logs into one place.'], ['Alert tuning', 'Adjusting rules to cut false positives.'], ['SCAP', 'Security Content Automation Protocol for automated checks.'], ['DLP', 'Prevents sensitive data from leaving.'], ['SNMP trap', 'Unsolicited alert sent from a device to a manager.'], ['NetFlow', 'Traffic flow metadata, not payload.'], ['Archiving', 'Retaining logs for later investigation or compliance.']] });

  O({ obj: '4.5', title: 'Modify enterprise capabilities', code: 'SPF DKIM DMARC',
    goal: 'Firewall rules/ports/screened subnets; IDS/IPS signatures and trends; web filtering; OS security (GPO, SELinux); secure protocols; DNS filtering; email security; FIM; DLP; NAC; EDR/XDR; user behavior analytics.',
    lesson: [
      { h: 'Network & web', html: '<ul><li><b>Firewall</b> rules, access lists, ports/protocols, screened subnets.</li><li><b>IDS/IPS</b>: trends and <b>signatures</b>.</li><li><b>Web filter</b>: agent-based, <b>centralized proxy</b>, <b>URL scanning</b>, <b>content categorization</b>, block rules, <b>reputation</b>.</li><li><b>DNS filtering</b> — block lookups of malicious domains.</li><li><b>NAC</b> — check device posture before network access.</li></ul>' },
      { h: 'Email authentication', html: '<table><tr><th>Record</th><th>Purpose</th></tr><tr><td><b>SPF</b></td><td>DNS list of servers allowed to send for the domain</td></tr><tr><td><b>DKIM</b></td><td>Cryptographic signature on the message proving it wasn\'t altered and came from the domain</td></tr><tr><td><b>DMARC</b></td><td>Policy telling receivers what to do when SPF/DKIM fail (none/quarantine/reject) and where to send reports</td></tr></table><p>Plus a <b>gateway</b> that filters spam/malware.</p>' },
      { h: 'Hosts & users', html: '<ul><li>OS security: <b>Group Policy</b> (Windows), <b>SELinux</b> (mandatory access control on Linux).</li><li><b>Secure protocols</b>: choose the protocol, the port and the transport method (SSH not Telnet, SFTP not FTP, LDAPS not LDAP, HTTPS, SNMPv3).</li><li><b>File integrity monitoring (FIM)</b> — alerts when critical files change.</li><li><b>DLP</b>, <b>EDR</b> (endpoint detection & response) / <b>XDR</b> (extended across endpoints, network, cloud, email).</li><li><b>User behavior analytics (UBA)</b> — baselines normal user activity and flags anomalies.</li></ul>' }
    ],
    cards: [['SPF', 'DNS record listing authorized sending servers.'], ['DKIM', 'Signature proving email integrity and domain origin.'], ['DMARC', 'Policy for SPF/DKIM failures plus reporting.'], ['DNS filtering', 'Blocks resolution of malicious domains.'], ['Content categorization', 'Web filter classifying sites by category.'], ['NAC', 'Checks device health/identity before allowing access.'], ['FIM', 'Alerts on changes to critical files.'], ['EDR', 'Endpoint detection and response.'], ['XDR', 'Extended detection and response across many sources.'], ['UBA', 'User behavior analytics — detects anomalous user activity.'], ['SELinux', 'Mandatory access control for Linux.'], ['Group Policy', 'Centralized Windows configuration enforcement.']],
    labs: ['l-ports', 'l-email'] });

  O({ obj: '4.6', title: 'Identity & access management', code: 'LEAST PRIVILEGE ALWAYS',
    goal: 'Provisioning, identity proofing, federation, SSO (LDAP, OAuth, SAML), interoperability, attestation, access control models, MFA, password concepts and privileged access management.',
    lesson: [
      { h: 'Lifecycle & SSO', html: '<ul><li><b>Provisioning/de-provisioning</b>, <b>permission assignments</b>, <b>identity proofing</b> (verify who someone really is), <b>attestation</b> (periodic review/recertification of access).</li><li><b>Federation</b> — trust identities from another organization.</li><li>SSO: <b>LDAP</b> (directory queries), <b>SAML</b> (XML assertions, enterprise web SSO), <b>OAuth</b> (delegated <i>authorization</i> — "let this app access my calendar"), <b>OpenID Connect</b> (authentication layer on OAuth).</li></ul>' },
      { h: 'Access control models', html: '<table><tr><th>Model</th><th>Decided by</th></tr><tr><td><b>MAC</b> (mandatory)</td><td>Labels/clearances set by the system/admins (military)</td></tr><tr><td><b>DAC</b> (discretionary)</td><td>The owner of the resource</td></tr><tr><td><b>RBAC</b> (role-based)</td><td>Job role</td></tr><tr><td><b>Rule-based</b></td><td>System-wide rules (e.g. firewall ACLs)</td></tr><tr><td><b>ABAC</b> (attribute-based)</td><td>Attributes: user, resource, environment (dept=HR AND time=9–5)</td></tr><tr><td>Time-of-day restrictions</td><td>When access is allowed</td></tr></table><p>Plus <b>least privilege</b>.</p>' },
      { h: 'MFA & passwords', html: '<ul><li>Factors: <b>something you know</b> (password, PIN), <b>have</b> (token, phone, smart card), <b>are</b> (biometrics), <b>somewhere you are</b> (location). Two of the <i>same</i> factor is not MFA.</li><li>Implementations: biometrics, hard/soft <b>authentication tokens</b>, security keys (FIDO2).</li><li>Passwords: length, complexity, reuse, expiration, age; <b>password managers</b>; <b>passwordless</b>.</li><li><b>PAM</b>: <b>just-in-time</b> permissions, <b>password vaulting</b>, <b>ephemeral credentials</b>.</li></ul>' }
    ],
    cards: [['Provisioning', 'Creating accounts and granting initial access.'], ['De-provisioning', 'Removing access when no longer needed.'], ['Identity proofing', 'Verifying a person\'s real identity before issuing credentials.'], ['Attestation', 'Periodic review that access is still appropriate.'], ['Federation', 'Trusting identities from another organization.'], ['SAML', 'XML-based enterprise web SSO.'], ['OAuth', 'Delegated authorization framework.'], ['OpenID Connect', 'Authentication on top of OAuth.'], ['MAC', 'Access decided by labels/clearance.'], ['DAC', 'Owner decides access.'], ['RBAC', 'Access by job role.'], ['ABAC', 'Access by attributes and context.'], ['Just-in-time access', 'Privileges granted only when needed, then removed.'], ['Password vaulting', 'PAM stores and rotates privileged passwords.']],
    labs: ['l-iam'] });

  O({ obj: '4.7', title: 'Automation & orchestration', code: 'AUTOMATE THE BORING',
    goal: 'Use cases and benefits of automation and scripting, and the considerations that come with them.',
    lesson: [
      { h: 'Use cases', html: '<p>User provisioning · resource provisioning · <b>guard rails</b> · security groups · <b>ticket creation</b> · escalation · enabling/disabling services and access · continuous integration and testing · integrations and APIs. <b>SOAR</b> platforms run playbooks that automate response.</p>' },
      { h: 'Benefits & considerations', html: '<table><tr><th>Benefits</th><th>Considerations</th></tr><tr><td>Efficiency/time saving · enforcing baselines · standard infrastructure configurations · scaling securely · employee retention · reaction time · workforce multiplier</td><td>Complexity · cost · <b>single point of failure</b> · <b>technical debt</b> · ongoing supportability</td></tr></table>' }
    ],
    cards: [['Guard rails', 'Automated limits preventing insecure configurations.'], ['SOAR', 'Security orchestration, automation and response platform.'], ['Playbook', 'Automated/documented response steps.'], ['Workforce multiplier', 'Automation lets few staff do more.'], ['Technical debt', 'Future cost of shortcuts in automation/code.'], ['Single point of failure (automation)', 'One broken script or platform halts many processes.']],
    qs: [
      Q('A script automatically creates accounts with the right group memberships when HR adds a new hire. Which benefit is this?', 'Efficiency and consistent enforcement of baselines', ['Eliminating the need for MFA', 'Removing all single points of failure', 'Avoiding technical debt'], 'Automated provisioning is fast and consistent.', 4),
      Q('Which platform runs playbooks that automatically enrich, contain and ticket security alerts?', 'SOAR', ['SIEM only', 'DLP', 'NAC'], 'Security orchestration, automation and response.', 4),
      Q('Automation blocks a cloud engineer from creating a storage bucket with public access. This is an example of:', 'Guard rails', ['Technical debt', 'Shadow IT', 'A false negative'], 'Guard rails prevent insecure configurations.', 4),
      Q('Every incident response action now depends on one orchestration server. Which automation risk does this create?', 'A single point of failure', ['Workforce multiplier', 'Faster reaction time', 'Baseline enforcement'], 'If it fails, everything stops.', 4),
      Q('Quick-and-dirty scripts nobody maintains pile up over years. What is this called?', 'Technical debt', ['Guard rails', 'Continuous integration', 'Attestation'], 'Shortcuts create future cost.', 4)
    ] });

  O({ obj: '4.8', title: 'Incident response', code: 'CONTAIN BEFORE ERADICATE',
    goal: 'The IR process, training, testing, root cause analysis, threat hunting and digital forensics.',
    lesson: [
      { h: 'The process', html: '<ol><li><b>Preparation</b> — plans, tools, training, contacts.</li><li><b>Detection</b> — notice something is wrong.</li><li><b>Analysis</b> — confirm and scope the incident.</li><li><b>Containment</b> — stop the spread (isolate hosts, block accounts).</li><li><b>Eradication</b> — remove the cause (malware, accounts, vulnerabilities).</li><li><b>Recovery</b> — restore systems and monitor.</li><li><b>Lessons learned</b> — what to improve.</li></ol><p>Testing: <b>tabletop exercise</b> and <b>simulation</b>. <b>Root cause analysis</b> after. <b>Threat hunting</b> proactively searches for threats that evaded detection.</p>' },
      { h: 'Digital forensics', html: '<ul><li><b>Legal hold</b> — preserve relevant data; don\'t delete.</li><li><b>Chain of custody</b> — documented record of who handled evidence, when.</li><li><b>Acquisition</b> (image the drive, capture memory), <b>preservation</b> (hashes prove integrity), <b>reporting</b>, <b>e-discovery</b>.</li><li><b>Order of volatility</b> — collect the most volatile first: CPU registers/cache → RAM → swap/temp → disk → remote logs → archival/backup media.</li></ul>' }
    ],
    cards: [['Preparation', 'IR phase: plans, tools, training before incidents.'], ['Containment', 'Limit the spread and damage.'], ['Eradication', 'Remove the root cause.'], ['Recovery', 'Restore operations and monitor.'], ['Lessons learned', 'Post-incident review to improve.'], ['Root cause analysis', 'Determining the underlying cause.'], ['Threat hunting', 'Proactively searching for undetected threats.'], ['Legal hold', 'Requirement to preserve relevant data.'], ['Chain of custody', 'Documented handling of evidence.'], ['Order of volatility', 'Collect most-volatile evidence first (RAM before disk).'], ['E-discovery', 'Locating and producing electronic data for legal matters.']],
    labs: ['l-ir', 'l-volatility'] });

  O({ obj: '4.9', title: 'Data sources for investigations', code: 'LOGS TELL THE STORY',
    goal: 'Log data (firewall, application, endpoint, OS, IDS/IPS, network, metadata) and other sources (vulnerability scans, automated reports, dashboards, packet captures).',
    lesson: [
      { h: 'Logs and what they answer', html: '<table><tr><th>Source</th><th>Answers</th></tr><tr><td>Firewall logs</td><td>Which connections were allowed/blocked, from where</td></tr><tr><td>Application logs</td><td>What the app did, errors, user actions</td></tr><tr><td>Endpoint logs</td><td>Process launches, EDR detections on hosts</td></tr><tr><td>OS-specific security logs</td><td>Logons, privilege use, account changes</td></tr><tr><td>IDS/IPS logs</td><td>Which signatures fired</td></tr><tr><td>Network logs</td><td>Switch/router events, DHCP, DNS</td></tr><tr><td>Metadata</td><td>Email headers, file properties — who/when/where, not content</td></tr></table>' },
      { h: 'Other sources', html: '<p><b>Vulnerability scans</b> (was it exposed?), <b>automated reports</b>, <b>dashboards</b> (trend at a glance), <b>packet captures</b> (full content of traffic — the most detail, the most storage).</p>' }
    ],
    cards: [['Firewall log', 'Allowed/blocked connections and sources.'], ['Endpoint log', 'Host process and detection events.'], ['Metadata', 'Data about data — headers, timestamps, authors.'], ['Packet capture', 'Full copy of network traffic.'], ['Dashboard', 'Visual summary of security data.'], ['OS security log', 'Logons, privilege use, account changes.']],
    labs: ['l-sources'] });

  window.SEC.boss(4, { title: 'Security Operations', code: 'DOMAIN FOUR DEFEATED', n: 40, minutes: 55,
    goal: 'The biggest domain — 40 hard-mode questions across 4.1–4.9.',
    lesson: [{ h: 'Domain 4 recap', html: '<ul><li>Baselines: establish → deploy → maintain. WPA3 SAE, EAP-TLS, heat maps. MDM; BYOD/COPE/CYOD. Input validation, secure cookies, SAST, code signing, sandboxing.</li><li>Assets: ownership, classification, inventory, enumeration. Sanitize vs destroy vs certify. Degauss ≠ SSD.</li><li>Vuln mgmt: CVE = ID, CVSS = score. False negative is the dangerous one. Prioritize by exposure too. Rescan to validate.</li><li>SIEM, SCAP, DLP, SNMP traps, NetFlow. SPF/DKIM/DMARC. FIM, EDR/XDR, UBA, NAC, DNS filtering.</li><li>IAM: SAML vs OAuth vs OIDC; MAC/DAC/RBAC/rule/ABAC; MFA factors; PAM (JIT, vaulting, ephemeral).</li><li>Automation benefits vs complexity/SPOF/technical debt. IR: prepare → detect → analyze → contain → eradicate → recover → lessons learned. Chain of custody, legal hold, order of volatility.</li></ul>' }] });

  // ---------------- labs ----------------
  L['l-mobile'] = { kind: 'match', title: 'Harden the fleet', sum: 'Pick the control for 8 hardening needs',
    brief: 'You are building the secure baseline for laptops, phones and Wi-Fi. Choose the best control for each requirement.',
    options: ['MDM remote wipe', 'COPE', 'BYOD with containerization', 'WPA3-Enterprise with EAP-TLS', 'Site survey / heat map', 'CIS Benchmark baseline', 'Code signing', 'Sandboxing', 'Secure cookie flags'],
    items: [
      { t: 'A lost corporate phone must be erased from anywhere.', a: 'MDM remote wipe', why: 'MDM enforces and executes remote wipe.' },
      { t: 'Company buys phones but lets staff use them for personal apps too.', a: 'COPE', why: 'Corporate-owned, personally enabled.' },
      { t: 'Staff use their own phones; corporate data must stay separate and wipeable.', a: 'BYOD with containerization', why: 'A work container separates and protects corporate data.' },
      { t: 'Wi-Fi must authenticate every device with a certificate.', a: 'WPA3-Enterprise with EAP-TLS', why: 'EAP-TLS = certificates on both sides.' },
      { t: 'Find dead spots and a rogue access point before deployment.', a: 'Site survey / heat map', why: 'Wireless survey tools.' },
      { t: 'Start the Windows server build from a consensus hardening guide.', a: 'CIS Benchmark baseline', why: 'Established secure baseline.' },
      { t: 'Ensure scripts pushed to endpoints come from IT and weren\'t altered.', a: 'Code signing', why: 'Signature proves origin and integrity.' },
      { t: 'Open suspicious email attachments safely to see what they do.', a: 'Sandboxing', why: 'Isolated detonation environment.' },
      { t: 'Session cookies must never be readable by JavaScript or sent over HTTP.', a: 'Secure cookie flags', why: 'HttpOnly + Secure (+ SameSite).' }
    ], debrief: 'Baseline first (CIS), enforce it centrally (MDM/GPO), and pick the deployment model that matches who owns the device.' };
  L['l-vulnprio'] = { kind: 'order', title: 'Prioritize the scan results', sum: 'Order 5 findings by real risk',
    brief: 'Your scan returned these findings. Order them from <b>fix first</b> to <b>fix last</b>, considering severity <b>and</b> exposure.',
    items: [
      { t: 'CVSS 9.8 remote code execution on the <b>internet-facing</b> VPN appliance, exploited in the wild', why: 'Critical, exposed and actively exploited — emergency patch.' },
      { t: 'CVSS 8.1 SQL injection in the public customer portal', why: 'High severity and internet-facing with sensitive data.' },
      { t: 'CVSS 9.0 flaw on an <b>isolated</b> lab server with no network route from users', why: 'Severe score, but exposure is very low — compensating isolation.' },
      { t: 'CVSS 5.3 information disclosure on an internal intranet page', why: 'Moderate and internal.' },
      { t: 'CVSS 3.1 self-signed certificate on an internal test printer', why: 'Low severity and low impact.' }
    ], debrief: 'CVSS is the starting point, not the answer: exposure, exploitation in the wild and business impact decide the real order.' };
  L['l-ports'] = { kind: 'match', title: 'Ports & secure protocols', sum: '15 services → ports',
    brief: 'Match each service to its port. Expect at least a few of these in firewall PBQs.',
    options: ['22', '23', '25', '53', '123', '143', '389', '443', '445', '636', '993', '1433', '3389', '514', '6514', '161'],
    items: [
      { t: 'SSH / SFTP / SCP', a: '22', why: 'Secure shell — replaces Telnet and FTP.' },
      { t: 'Telnet (insecure — block it)', a: '23', why: 'Cleartext remote terminal.' },
      { t: 'SMTP between mail servers', a: '25', why: 'Mail relay.' },
      { t: 'DNS', a: '53', why: 'UDP for queries, TCP for zone transfers.' },
      { t: 'NTP time sync', a: '123', why: 'UDP 123 (don\'t confuse with IMAP 143).' },
      { t: 'IMAP (plain)', a: '143', why: 'IMAPS is 993.' },
      { t: 'LDAP (plain)', a: '389', why: 'LDAPS is 636.' },
      { t: 'LDAPS (secure directory)', a: '636', why: 'LDAP over TLS.' },
      { t: 'HTTPS', a: '443', why: 'TLS web traffic.' },
      { t: 'SMB file sharing', a: '445', why: 'Windows file shares.' },
      { t: 'IMAPS', a: '993', why: 'IMAP over TLS.' },
      { t: 'Microsoft SQL Server', a: '1433', why: 'TCP 1433.' },
      { t: 'RDP', a: '3389', why: 'Remote Desktop.' },
      { t: 'Secure syslog over TLS', a: '6514', why: 'Plain syslog is UDP 514.' },
      { t: 'SNMP queries', a: '161', why: 'Traps use 162; use SNMPv3.' }
    ], debrief: '"Secure" in the question means the encrypted port: 22, 443, 636, 993, 995, 6514. Know the cleartext twins to spot traps.' };
  L['l-email'] = { kind: 'match', title: 'Email security config', sum: 'SPF, DKIM, DMARC and friends',
    brief: 'Pick the email control that solves each problem.',
    options: ['SPF', 'DKIM', 'DMARC', 'Secure email gateway', 'DLP', 'DNS filtering'],
    items: [
      { t: 'Publish which IP addresses are allowed to send mail for example.com.', a: 'SPF', why: 'SPF is the authorized-sender list in DNS.' },
      { t: 'Receivers should be able to verify messages weren\'t modified in transit, using a key published in DNS.', a: 'DKIM', why: 'DKIM signs messages.' },
      { t: 'Tell receivers to reject mail that fails authentication and send us aggregate reports.', a: 'DMARC', why: 'DMARC = policy + reporting.' },
      { t: 'Scan inbound attachments and links for malware and spam before delivery.', a: 'Secure email gateway', why: 'Gateway filtering.' },
      { t: 'Stop outbound emails that contain customer card numbers.', a: 'DLP', why: 'Data loss prevention.' },
      { t: 'Prevent users\' devices from even resolving known phishing domains.', a: 'DNS filtering', why: 'Block at name resolution.' }
    ], debrief: 'SPF = who may send, DKIM = signed and unaltered, DMARC = what to do on failure plus reports.' };
  L['l-iam'] = { kind: 'match', title: 'IAM decisions', sum: 'Access models, MFA factors and SSO',
    brief: 'Classify each item.',
    options: ['MAC', 'DAC', 'RBAC', 'Rule-based', 'ABAC', 'Something you know', 'Something you have', 'Something you are', 'Somewhere you are', 'SAML', 'OAuth', 'Just-in-time access'],
    items: [
      { t: 'Files are labeled Secret; only users with Secret clearance can open them.', a: 'MAC', why: 'Labels and clearances.' },
      { t: 'The owner of a folder shares it with two coworkers.', a: 'DAC', why: 'Owner discretion.' },
      { t: 'All "Nurse" accounts get the same chart-viewing permissions.', a: 'RBAC', why: 'Job role.' },
      { t: 'Access granted only if department=Finance AND device=managed AND time is business hours.', a: 'ABAC', why: 'Multiple attributes/context.' },
      { t: 'A router ACL denies all traffic to port 23 for everyone.', a: 'Rule-based', why: 'System-wide rule.' },
      { t: 'A smart card.', a: 'Something you have', why: 'Possession factor.' },
      { t: 'A fingerprint scan.', a: 'Something you are', why: 'Biometric.' },
      { t: 'A PIN.', a: 'Something you know', why: 'Knowledge factor.' },
      { t: 'Login allowed only from inside the US by IP geolocation.', a: 'Somewhere you are', why: 'Location factor.' },
      { t: 'Enterprise web SSO with XML assertions from the identity provider.', a: 'SAML', why: 'SAML assertions.' },
      { t: 'A scheduling app gets permission to read your calendar without your password.', a: 'OAuth', why: 'Delegated authorization.' },
      { t: 'Admin rights granted for 2 hours to perform a change, then revoked automatically.', a: 'Just-in-time access', why: 'PAM just-in-time permissions.' }
    ], debrief: 'Who decides access (labels, owner, role, rule, attributes) names the model; the factor category names the MFA type.' };
  L['l-ir'] = { kind: 'order', title: 'Incident response, in order', sum: 'Sequence a ransomware response',
    brief: 'A ransomware outbreak hits two file servers. Put the response actions in the correct incident-response order.',
    items: [
      { t: 'Preparation: IR plan, contacts, tools and backups were in place beforehand', why: 'Preparation always comes first.' },
      { t: 'Detection: EDR alerts on mass file renames', why: 'Something is noticed.' },
      { t: 'Analysis: confirm ransomware, identify affected hosts and the entry point', why: 'Scope before acting broadly.' },
      { t: 'Containment: isolate the infected servers and disable the compromised account', why: 'Stop the spread first.' },
      { t: 'Eradication: remove the malware and close the exploited vulnerability', why: 'Remove the cause.' },
      { t: 'Recovery: restore from clean backups and monitor closely', why: 'Return to operations.' },
      { t: 'Lessons learned: root cause analysis and plan updates', why: 'Improve for next time.' }
    ], debrief: 'Preparation, detection, analysis, containment, eradication, recovery, lessons learned. Contain before you eradicate.' };
  L['l-volatility'] = { kind: 'order', title: 'Order of volatility', sum: 'Collect evidence most-volatile first',
    brief: 'You must collect evidence from a compromised server. Order the sources from <b>most volatile</b> (collect first) to <b>least volatile</b>.',
    items: [
      { t: 'CPU registers and cache', why: 'Gone in nanoseconds.' },
      { t: 'RAM (running processes, network connections)', why: 'Lost at power-off.' },
      { t: 'Swap / page file and temporary files', why: 'Overwritten as the system runs.' },
      { t: 'Hard drive (disk image)', why: 'Persistent, but changes with use.' },
      { t: 'Remote logs (SIEM)', why: 'Stored elsewhere, less likely to change.' },
      { t: 'Archived backups / tape', why: 'Least volatile.' }
    ], debrief: 'Most volatile first. And document chain of custody and hash every image you take.' };
  L['l-sources'] = { kind: 'match', title: 'Which data source answers it?', sum: 'Pick the log for 8 investigation questions',
    brief: 'During an investigation, pick the data source that best answers each question.',
    options: ['Firewall logs', 'Application logs', 'Endpoint (EDR) logs', 'OS security logs', 'IDS/IPS logs', 'Packet capture', 'Email metadata (headers)', 'Vulnerability scan', 'NetFlow', 'Dashboard'],
    items: [
      { t: 'Was the inbound RDP connection from 203.0.113.9 allowed or blocked at the perimeter?', a: 'Firewall logs', why: 'Allow/deny decisions.' },
      { t: 'Which process on the laptop spawned PowerShell after the attachment was opened?', a: 'Endpoint (EDR) logs', why: 'Process tree on the host.' },
      { t: 'Who logged on to the server interactively at 03:00?', a: 'OS security logs', why: 'Logon events.' },
      { t: 'What exact data was sent in the suspicious HTTP session?', a: 'Packet capture', why: 'Only a capture has the content.' },
      { t: 'Which mail servers did the phishing email pass through?', a: 'Email metadata (headers)', why: 'Received headers.' },
      { t: 'Was the exploited server known to be missing the patch last month?', a: 'Vulnerability scan', why: 'Historical exposure.' },
      { t: 'Which internal hosts sent unusually large volumes to one external IP overnight?', a: 'NetFlow', why: 'Flow metadata at scale.' },
      { t: 'Which signature fired on the exploit attempt?', a: 'IDS/IPS logs', why: 'Signature matches.' },
      { t: 'What errors did the web app record when the attacker sent malformed input?', a: 'Application logs', why: 'App-level events.' }
    ], debrief: 'Match the question to the layer that records it: perimeter, host, OS, app, network flow, full content.' };
})();
