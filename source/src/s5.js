/* Domain 5 — Security Program Management & Oversight (20%) */
(function () {
  var O = window.SEC.obj, L = COURSE.labs;

  O({ obj: '5.1', title: 'Security governance', code: 'POLICY STANDARD PROCEDURE',
    goal: 'Guidelines, policies, standards, procedures, external considerations, monitoring and revision, governance structures, and data roles.',
    lesson: [
      { h: 'The document hierarchy', html: '<table><tr><th>Document</th><th>Is it mandatory?</th><th>Example</th></tr><tr><td><b>Policy</b></td><td>Yes — high-level intent from leadership</td><td>AUP, information security policy, BC/DR, IR, SDLC, change management policies</td></tr><tr><td><b>Standard</b></td><td>Yes — specific measurable requirement</td><td>Password, access control, physical security, encryption standards</td></tr><tr><td><b>Procedure</b></td><td>Yes — step-by-step how</td><td>Change management, onboarding/offboarding, playbooks</td></tr><tr><td><b>Guideline</b></td><td>No — recommendation</td><td>"Consider using a password manager"</td></tr></table>' },
      { h: 'External considerations & structures', html: '<ul><li>External: regulatory, legal, industry, local/regional, national, global.</li><li>Monitoring and revision — documents are reviewed on a schedule and after changes.</li><li>Structures: <b>boards</b>, <b>committees</b>, <b>government entities</b>; <b>centralized vs decentralized</b> governance.</li></ul>' },
      { h: 'Data roles', html: '<table><tr><th>Role</th><th>Responsibility</th></tr><tr><td><b>Owner</b></td><td>Senior person accountable for the data; decides classification</td></tr><tr><td><b>Controller</b></td><td>Decides why and how personal data is processed (privacy law)</td></tr><tr><td><b>Processor</b></td><td>Processes data on behalf of the controller (e.g. a payroll vendor)</td></tr><tr><td><b>Custodian / steward</b></td><td>Day-to-day handling: backups, permissions, data quality</td></tr></table>' }
    ],
    cards: [['Policy', 'Mandatory high-level statement of intent.'], ['Standard', 'Mandatory specific requirement supporting a policy.'], ['Procedure', 'Mandatory step-by-step instructions.'], ['Guideline', 'Recommended, not mandatory.'], ['AUP', 'Acceptable use policy.'], ['Playbook', 'Step-by-step response procedure for a scenario.'], ['Data owner', 'Accountable for the data and its classification.'], ['Data controller', 'Determines purposes and means of processing.'], ['Data processor', 'Processes data for the controller.'], ['Data custodian', 'Implements day-to-day protection of the data.']],
    labs: ['l-govdocs'] });

  O({ obj: '5.2', title: 'Risk management', code: 'ALE EQUALS SLE TIMES ARO',
    goal: 'Risk identification, assessment types, analysis (qualitative/quantitative, SLE/ALE/ARO, probability, impact), registers, tolerance/appetite, strategies, reporting, and BIA (RTO, RPO, MTTR, MTBF).',
    lesson: [
      { h: 'Assessment', html: '<ul><li>Assessments: <b>ad hoc</b>, <b>recurring</b>, <b>one-time</b>, <b>continuous</b>.</li><li><b>Qualitative</b> — low/medium/high, heat maps, judgment. <b>Quantitative</b> — money and numbers.</li></ul><table><tr><th>Term</th><th>Formula / meaning</th></tr><tr><td><b>AV</b> asset value</td><td>What the asset is worth</td></tr><tr><td><b>EF</b> exposure factor</td><td>% of the asset lost in one event</td></tr><tr><td><b>SLE</b></td><td>AV × EF — loss from one event</td></tr><tr><td><b>ARO</b></td><td>How many times per year (0.2 = once every 5 years)</td></tr><tr><td><b>ALE</b></td><td>SLE × ARO — expected yearly loss</td></tr></table>' },
      { h: 'Registers & appetite', html: '<ul><li><b>Risk register</b>: each risk with key risk indicators, <b>risk owners</b> and the <b>risk threshold</b>.</li><li><b>Risk tolerance</b> — acceptable variation. <b>Risk appetite</b>: <b>expansionary</b> (seeks risk for growth), <b>conservative</b> (avoids), <b>neutral</b>.</li></ul>' },
      { h: 'Strategies', html: '<table><tr><th>Strategy</th><th>What it means</th></tr><tr><td><b>Transfer</b></td><td>Shift it to someone else — insurance, outsourcing</td></tr><tr><td><b>Accept</b></td><td>Live with it (<b>exemption</b> / <b>exception</b> documented)</td></tr><tr><td><b>Avoid</b></td><td>Stop the risky activity entirely</td></tr><tr><td><b>Mitigate</b></td><td>Add controls to reduce likelihood or impact</td></tr></table><p><b>Inherent risk</b> (before controls) − controls = <b>residual risk</b> (what remains).</p>' },
      { h: 'Business impact analysis', html: '<p>The <b>BIA</b> identifies critical functions and sets <b>RTO</b> (time to restore), <b>RPO</b> (acceptable data loss), and uses <b>MTTR</b>/<b>MTBF</b> for reliability.</p>' }
    ],
    cards: [['SLE', 'Single loss expectancy = AV × EF.'], ['ALE', 'Annualized loss expectancy = SLE × ARO.'], ['ARO', 'Annualized rate of occurrence.'], ['EF', 'Exposure factor — fraction of value lost per event.'], ['Qualitative analysis', 'Ranks risk with categories (low/med/high).'], ['Quantitative analysis', 'Measures risk in numbers/money.'], ['Risk register', 'Record of risks, owners, indicators, thresholds.'], ['Risk appetite', 'How much risk the organization is willing to pursue.'], ['Risk tolerance', 'Acceptable deviation around the appetite.'], ['Transfer', 'Shift risk to a third party — insurance.'], ['Avoid', 'Stop the activity causing the risk.'], ['Mitigate', 'Reduce risk with controls.'], ['Accept', 'Acknowledge and live with the risk.'], ['Residual risk', 'Risk remaining after controls.'], ['BIA', 'Business impact analysis — identifies critical functions, RTO, RPO.']],
    labs: ['l-risk', 'l-strategy'] });

  O({ obj: '5.3', title: 'Third-party risk', code: 'TRUST BUT VERIFY VENDORS',
    goal: 'Vendor assessment, selection, agreement types, monitoring, questionnaires and rules of engagement.',
    lesson: [
      { h: 'Assessment & selection', html: '<ul><li>Vendor assessment: <b>penetration testing</b>, <b>right-to-audit clause</b>, evidence of <b>internal audits</b>, <b>independent assessments</b>, <b>supply chain analysis</b>.</li><li>Selection: <b>due diligence</b>, check for <b>conflicts of interest</b>.</li><li><b>Vendor monitoring</b>, <b>questionnaires</b>, <b>rules of engagement</b> (what testers may and may not do).</li></ul>' },
      { h: 'Agreement types', html: '<table><tr><th>Agreement</th><th>Purpose</th></tr><tr><td><b>SLA</b></td><td>Measurable service levels: uptime, response time, penalties</td></tr><tr><td><b>MOA</b></td><td>Memorandum of agreement — formal terms of cooperation</td></tr><tr><td><b>MOU</b></td><td>Memorandum of understanding — intent to work together, usually not binding</td></tr><tr><td><b>MSA</b></td><td>Master service agreement — umbrella terms for future work</td></tr><tr><td><b>SOW / WO</b></td><td>Statement of work / work order — specific tasks, deliverables, timeline under the MSA</td></tr><tr><td><b>NDA</b></td><td>Non-disclosure — keep information confidential</td></tr><tr><td><b>BPA</b></td><td>Business partners agreement — how partners share profit/loss and responsibilities</td></tr></table>' }
    ],
    cards: [['Right-to-audit clause', 'Contract term letting you audit the vendor.'], ['Due diligence', 'Investigating a vendor before signing.'], ['SLA', 'Service-level agreement with measurable metrics.'], ['MOU', 'Non-binding statement of mutual intent.'], ['MOA', 'More formal agreement of cooperation terms.'], ['MSA', 'Umbrella contract for future engagements.'], ['SOW', 'Specific deliverables, timeline and cost for one project.'], ['NDA', 'Confidentiality agreement.'], ['BPA', 'Business partners agreement.'], ['Rules of engagement', 'What a tester or vendor may and may not do.']] });

  O({ obj: '5.4', title: 'Security compliance', code: 'COMPLY OR PAY',
    goal: 'Compliance reporting and monitoring, consequences of non-compliance, privacy concepts and data subject rights.',
    lesson: [
      { h: 'Reporting & monitoring', html: '<ul><li>Reporting: <b>internal</b> and <b>external</b> (to regulators).</li><li>Consequences of non-compliance: <b>fines</b>, <b>sanctions</b>, <b>reputational damage</b>, <b>loss of license</b>, <b>contractual impacts</b>.</li><li>Monitoring: <b>due diligence/care</b>, <b>attestation and acknowledgement</b>, internal and external, <b>automation</b>.</li></ul>' },
      { h: 'Privacy', html: '<ul><li>Legal implications: local/regional, national, global (e.g. <b>GDPR</b> in the EU).</li><li><b>Data subject</b> — the person the data is about; rights include access and the <b>right to be forgotten</b>.</li><li>Controller vs processor (see 5.1), <b>ownership</b>, <b>data inventory and retention</b>.</li></ul>' },
      { h: 'Frameworks you should recognize', html: '<p>PCI DSS (card data), HIPAA (US health), GDPR (EU personal data), SOX (financial reporting), GLBA (financial institutions), NIST CSF / RMF, ISO 27001 (ISMS) / 27002 (controls), CIS Controls, SOC 2 (service organization controls).</p>' }
    ],
    cards: [['Data subject', 'The individual the personal data is about.'], ['Right to be forgotten', 'Right to have personal data erased (GDPR).'], ['GDPR', 'EU personal data protection regulation.'], ['PCI DSS', 'Payment card industry data security standard.'], ['HIPAA', 'US health information privacy law.'], ['Attestation', 'Formal statement that requirements are met.'], ['Sanctions', 'Penalties imposed for non-compliance.'], ['Due care', 'Acting reasonably to protect assets.']] });

  O({ obj: '5.5', title: 'Audits & assessments', code: 'KNOWN PARTIAL UNKNOWN',
    goal: 'Attestation, internal and external audits, and penetration testing — types, environments and reconnaissance.',
    lesson: [
      { h: 'Audits', html: '<ul><li><b>Internal</b>: compliance, audit committee, <b>self-assessments</b>.</li><li><b>External</b>: regulatory, examinations, assessment, <b>independent third-party audit</b>.</li><li><b>Attestation</b> — an auditor formally states controls meet requirements.</li></ul>' },
      { h: 'Penetration testing', html: '<ul><li>Types: <b>physical</b>, <b>offensive</b> (red team), <b>defensive</b> (blue team), <b>integrated</b> (purple — red and blue together).</li><li>Knowledge of the environment: <b>known</b> (full info, white box), <b>partially known</b> (gray box), <b>unknown</b> (no info, black box).</li><li>Reconnaissance: <b>passive</b> (OSINT, no contact with targets) vs <b>active</b> (scanning that touches targets).</li><li>Always with written authorization and <b>rules of engagement</b> — scope, timing, what is off-limits.</li></ul>' }
    ],
    cards: [['Attestation (audit)', 'Auditor formally affirms controls meet requirements.'], ['Internal audit', 'Assessment performed by the organization itself.'], ['External audit', 'Independent third-party assessment.'], ['Known environment test', 'Testers have full information.'], ['Partially known environment', 'Testers have some information.'], ['Unknown environment', 'Testers start with no information.'], ['Passive reconnaissance', 'Gathering info without touching the target.'], ['Active reconnaissance', 'Probing the target directly.'], ['Red team', 'Offensive testers.'], ['Blue team', 'Defenders.'], ['Purple team', 'Red and blue working together.']],
    labs: ['l-audits'] });

  O({ obj: '5.6', title: 'Security awareness', code: 'REPORT IT FAST',
    goal: 'Phishing campaigns, anomalous behavior recognition, user guidance and training, reporting and monitoring, and program development and execution.',
    lesson: [
      { h: 'Program elements', html: '<ul><li><b>Phishing campaigns</b> — simulated phishing, teach users to <b>recognize</b> and <b>respond</b> (report, don\'t click).</li><li><b>Anomalous behavior recognition</b>: risky, unexpected or unintentional behavior.</li><li>User guidance/training: policy/handbooks, <b>situational awareness</b>, <b>insider threat</b>, password management, removable media and cables, social engineering, operational security, <b>hybrid/remote work</b> environments.</li><li>Reporting and monitoring: <b>initial</b> and <b>recurring</b>; track metrics (click rate, report rate).</li><li>Development and execution — plan, deliver, measure, improve.</li></ul><div class="callout pro"><b class="k">What success looks like</b>The metric that matters most is the <b>report rate</b>: people who report a phish quickly turn every employee into a sensor.</div>' }
    ],
    cards: [['Phishing simulation', 'Controlled fake phishing to train and measure users.'], ['Report rate', 'Share of users who report a simulated phish.'], ['Click rate', 'Share of users who click a simulated phish.'], ['Situational awareness', 'Noticing what is unusual in your environment.'], ['Operational security (OPSEC)', 'Not leaking sensitive details through everyday behavior.'], ['Recurring training', 'Ongoing training rather than one-time.']],
    labs: ['l-awareness'] });

  window.SEC.boss(5, { title: 'Program Management & Oversight', code: 'DOMAIN FIVE DEFEATED',
    goal: 'Hard-mode scenarios across 5.1–5.6.',
    lesson: [{ h: 'Domain 5 recap', html: '<ul><li>Policy (mandatory intent) → standard (mandatory specifics) → procedure (mandatory steps); guideline = optional.</li><li>Owner, controller, processor, custodian/steward.</li><li>SLE = AV × EF; ALE = SLE × ARO. Transfer / accept / avoid / mitigate. Inherent vs residual. Appetite expansionary/conservative/neutral. BIA sets RTO/RPO.</li><li>Vendors: due diligence, right-to-audit, questionnaires. SLA, MOU, MOA, MSA, SOW, NDA, BPA.</li><li>Non-compliance: fines, sanctions, reputation, loss of license, contracts. Data subject rights; right to be forgotten.</li><li>Audits internal/external, attestation. Pen test known/partially known/unknown; passive vs active recon; red/blue/purple.</li><li>Awareness: phishing campaigns, anomalous behavior, recurring training, report rate.</li></ul>' }] });

  C_final();
  function C_final() {
    var all = [];
    COURSE.stages.forEach(function (s) { all.push(s.id); });
    COURSE.stages.push({
      id: 'final', tier: 'fin', kind: 'final', icon: '🏆', title: 'Final exam simulation', code: 'SECURITY PLUS READY', badge: 'final',
      goal: '90 questions drawn from every objective and the Hard Mode bank, weighted 12/22/18/28/20 like SY0-701, with a 90-minute timer.',
      lesson: [{ h: 'How to treat this run', html: '<ul><li>This simulates the multiple-choice part of the real exam: 90 questions, 90 minutes, weighted by domain.</li><li>The real exam is scored on a 100–900 scale with 750 to pass and also includes performance-based questions — the hands-on labs in this app are your PBQ practice.</li><li>Passing here needs 80%. A comfortable margin (85%+ on repeat runs with fresh questions) is a strong sign of readiness.</li><li>Afterward, the domain breakdown shows where to go back: re-open that domain\'s objectives and use <b>Practice → Missed only</b>.</li></ul>' }],
      qs: window.SEC.classic(), cards: [], labs: [], capstone: { n: 90, minutes: 90, pool: all.concat(['final']), weights: COURSE.weights, domains: COURSE.domains }
    });
  }

  // ---------------- labs ----------------
  L['l-govdocs'] = { kind: 'match', title: 'Governance documents & data roles', sum: 'Classify 10 statements',
    brief: 'Decide what each statement is.',
    options: ['Policy', 'Standard', 'Procedure', 'Guideline', 'Data owner', 'Data controller', 'Data processor', 'Data custodian'],
    items: [
      { t: '"All company data must be protected according to its classification." — signed by the CEO', a: 'Policy', why: 'High-level mandatory intent.' },
      { t: '"Passwords must be at least 14 characters; MFA is required for remote access."', a: 'Standard', why: 'Specific, measurable mandatory requirement.' },
      { t: '"Step 1: disable the account. Step 2: collect the laptop. Step 3: revoke VPN certificates…"', a: 'Procedure', why: 'Step-by-step instructions (offboarding).' },
      { t: '"We recommend using the approved password manager for personal accounts too."', a: 'Guideline', why: 'A recommendation — optional.' },
      { t: 'The VP of Sales decides customer data is Confidential and who may access it.', a: 'Data owner', why: 'Accountable executive who sets classification.' },
      { t: 'The company decides to collect customer emails for marketing and how they will be used.', a: 'Data controller', why: 'Determines purpose and means.' },
      { t: 'An outside email-marketing service sends campaigns using the company\'s list.', a: 'Data processor', why: 'Processes on the controller\'s behalf.' },
      { t: 'The DBA runs backups and applies the permissions the owner defined.', a: 'Data custodian', why: 'Day-to-day handling.' }
    ], debrief: 'Mandatory: policy → standard → procedure. Optional: guideline. Owners decide, controllers set purpose, processors act for them, custodians handle the data day to day.' };
  L['l-risk'] = { kind: 'calc', title: 'Quantitative risk analysis', sum: 'SLE, ALE and the value of a control', tolPct: 0.5,
    brief: 'A customer database is valued at <b>$400,000</b>. A breach is estimated to cost <b>25%</b> of its value per incident, and is expected to happen <b>once every 4 years</b>. A proposed DLP and monitoring package costs <b>$20,000 per year</b> and would cut the ARO to <b>once every 20 years</b>.',
    fields: [
      { label: 'Exposure factor (EF) as a decimal', a: 0.25, why: '25% = 0.25.' },
      { label: 'Single loss expectancy (SLE) = AV × EF', a: 100000, show: '$100,000', unit: '$', why: '400,000 × 0.25.' },
      { label: 'Annualized rate of occurrence (ARO)', a: 0.25, why: 'Once every 4 years = 1/4 = 0.25.' },
      { label: 'Annualized loss expectancy (ALE) = SLE × ARO', a: 25000, show: '$25,000', unit: '$', why: '100,000 × 0.25.' },
      { label: 'ALE after the control (ARO = 1/20)', a: 5000, show: '$5,000', unit: '$', why: '100,000 × 0.05.' },
      { label: 'Annual value of the control = ALE before − ALE after − annual cost', a: 0, show: '$0', unit: '$', why: '25,000 − 5,000 − 20,000 = 0: it exactly breaks even, so the decision depends on risk appetite and non-financial factors.' }
    ], debrief: 'SLE = AV × EF; ALE = SLE × ARO; a control is cost-justified when the ALE reduction exceeds its annual cost.' };
  L['l-strategy'] = { kind: 'match', title: 'Pick the risk strategy', sum: 'Transfer, accept, avoid or mitigate',
    brief: 'Which risk-management strategy is being used?',
    options: ['Transfer', 'Accept', 'Avoid', 'Mitigate'],
    items: [
      { t: 'The company buys cyber-insurance to cover ransomware losses.', a: 'Transfer', why: 'Financial impact shifts to the insurer.' },
      { t: 'A low-value kiosk vulnerability is documented with an exception and left as is.', a: 'Accept', why: 'Cost of fixing exceeds the risk.' },
      { t: 'Leadership cancels a plan to store card numbers and uses a payment processor instead.', a: 'Avoid', why: 'The risky activity is removed entirely.' },
      { t: 'MFA is added to the VPN to reduce credential-theft risk.', a: 'Mitigate', why: 'A control reduces likelihood.' },
      { t: 'Hosting is outsourced to a provider contractually responsible for physical security.', a: 'Transfer', why: 'Responsibility shifted by contract.' },
      { t: 'The business stops offering a legacy FTP upload service.', a: 'Avoid', why: 'No service, no risk.' },
      { t: 'Backups and segmentation are added to limit ransomware impact.', a: 'Mitigate', why: 'Reduce impact.' },
      { t: 'Management signs off on a risk that falls within its stated appetite.', a: 'Accept', why: 'Formal acceptance.' }
    ], debrief: 'Insurance/outsourcing = transfer, stop doing it = avoid, add controls = mitigate, consciously live with it = accept.' };
  L['l-audits'] = { kind: 'match', title: 'Audit & testing types', sum: 'Name the assessment',
    brief: 'Identify each assessment.',
    options: ['Internal audit', 'External audit', 'Attestation', 'Known environment', 'Partially known environment', 'Unknown environment', 'Passive reconnaissance', 'Active reconnaissance', 'Red team', 'Blue team', 'Purple team', 'Physical penetration test'],
    items: [
      { t: 'Testers receive network diagrams, source code and credentials before starting.', a: 'Known environment', why: 'Full information (white box).' },
      { t: 'Testers get only the company name and the in-scope IP range.', a: 'Partially known environment', why: 'Some information (gray box).' },
      { t: 'Testers get no information at all, like a real outside attacker.', a: 'Unknown environment', why: 'No information (black box).' },
      { t: 'Reading the company\'s job postings and DNS records to learn its technology stack.', a: 'Passive reconnaissance', why: 'No direct contact with the target\'s systems.' },
      { t: 'Running an authorized port scan of the in-scope servers.', a: 'Active reconnaissance', why: 'Touches the targets.' },
      { t: 'Offensive and defensive teams work side by side, sharing findings in real time.', a: 'Purple team', why: 'Integrated testing.' },
      { t: 'An authorized tester tries to tailgate into the data center.', a: 'Physical penetration test', why: 'Testing physical controls.' },
      { t: 'An independent CPA firm reviews controls for a SOC 2 report.', a: 'External audit', why: 'Independent third party.' },
      { t: 'The auditor formally states the controls operate as described.', a: 'Attestation', why: 'Formal affirmation.' },
      { t: 'The company\'s own audit team checks compliance with its password standard.', a: 'Internal audit', why: 'Performed in-house.' }
    ], debrief: 'Testing is always written-authorization-first with rules of engagement; how much the testers know names the environment type.' };
  L['l-awareness'] = { kind: 'calc', title: 'Phishing campaign metrics', sum: 'Measure an awareness program', tolPct: 0.5,
    brief: 'A simulated phishing campaign went to <b>500</b> employees. <b>60</b> clicked the link, <b>15</b> of those also entered credentials, and <b>210</b> reported the email to the security team. Last quarter the click rate was 20%.',
    fields: [
      { label: 'Click rate (%)', a: 12, unit: '%', why: '60 / 500 = 12%.' },
      { label: 'Credential-submission rate (% of all recipients)', a: 3, unit: '%', why: '15 / 500 = 3%.' },
      { label: 'Report rate (%)', a: 42, unit: '%', why: '210 / 500 = 42%.' },
      { label: 'Change in click rate since last quarter, in percentage points (enter a negative number for a drop)', a: -8, why: '12 − 20 = −8 points.' }
    ], debrief: 'Falling click rate and rising report rate show the program working. Follow up with the 15 who submitted credentials: targeted training, not punishment.' };
})();
