// Parses a Dion Training exam-results PDF (browser "Print to PDF" of the results page)
// into an attempt record: { attempt, date, score, total, items:[{k, ok, obj, pbq}] }.
// Uses pdf.js (vendor/pdf.min.js), loaded on demand.
(function(){
  const PBQ_TITLES = {
    "Social Engineering": "2.2", "Classify Threat Actors": "2.1", "Firewall Configuration": "4.5",
    "Log Analysis": "2.4", "Authentication Methods": "4.6", "Categorize Security Controls": "1.1",
    "Physical Security": "1.2", "Deception Technologies": "1.2", "Network Security Controls": "3.2"
  };
  // Objectives Dion sometimes leaves off; keyword fallback so every question lands in a domain.
  const KEYWORD_OBJ = [
    [/osint|open-source intelligence/i, "4.3"], [/penetration test|pen test/i, "5.5"],
    [/vendor|third-party/i, "5.3"], [/risk/i, "5.2"], [/phish|social engineer/i, "2.2"],
    [/firewall|port /i, "4.5"], [/encrypt|certificate|hash/i, "1.4"]
  ];
  let pdfjsPromise = null;
  function loadPdfjs(){
    if (!pdfjsPromise){
      const base = new URL("vendor/", document.baseURI).href;
      pdfjsPromise = import(base + "pdf.min.js").then(m => {
        m.GlobalWorkerOptions.workerSrc = base + "pdf.worker.min.js";
        return m;
      });
    }
    return pdfjsPromise;
  }

  async function pdfToLines(arrayBuffer){
    const pdfjs = await loadPdfjs();
    const doc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    const lines = [];
    for (let p = 1; p <= doc.numPages; p++){
      const page = await doc.getPage(p);
      const tc = await page.getTextContent();
      const rows = [];
      tc.items.forEach(it => {
        if (!it.str || !it.str.trim()) return;
        const y = it.transform[5], x = it.transform[4];
        let row = rows.find(r => Math.abs(r.y - y) < 2.5);
        if (!row){ row = { y, parts: [] }; rows.push(row); }
        row.parts.push({ x, s: it.str });
      });
      rows.sort((a, b) => b.y - a.y);
      rows.forEach(r => {
        r.parts.sort((a, b) => a.x - b.x);
        const text = r.parts.map(q => q.s).join(" ").replace(/\s+/g, " ").trim();
        if (/Dion Training: Exam App/.test(text) || /^https:\/\/exam\.diontraining/.test(text)) return;
        lines.push(text);
      });
    }
    return lines;
  }

  function normKey(text){
    return text.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 90);
  }

  function parseLines(lines){
    const all = lines.join("\n");
    const am = all.match(/Attempt:\s*(\d+)\s+(\d+)\s*\/\s*(\d+)/);
    const dm = all.match(/([A-Z][a-z]{2})\s+(\d{1,2})\s*,\s*(20\d\d)/);
    if (!am) throw new Error("This doesn't look like a Dion Training results page (no 'Attempt: N  X/90' line found).");
    const items = [];
    let cur = null;
    const flush = () => { if (cur) items.push(cur); };
    lines.forEach(l => {
      if (/^(Incorrect Answer|Correct answer|Skipped)$/i.test(l)){
        flush();
        cur = { ok: /^Correct/i.test(l), text: [] };
      } else if (cur){
        cur.text.push(l);
      }
    });
    flush();
    const out = items.map(it => {
      const body = it.text.join(" ");
      const first = it.text.find(t => t.length > 3) || "";
      let pbq = null;
      Object.keys(PBQ_TITLES).forEach(t => { if (first.indexOf(t) === 0) pbq = t; });
      let obj = null;
      if (pbq) obj = PBQ_TITLES[pbq];
      else {
        const om = body.match(/OBJ:?\s*(\d)\.(\d+)/);
        if (om) obj = om[1] + "." + om[2];
        else { const kw = KEYWORD_OBJ.find(k => k[0].test(body)); obj = kw ? kw[1] : "4.4"; }
      }
      // Key = start of the question stem (PBQs are keyed by title + next line)
      const stem = pbq ? it.text.slice(0, 3).join(" ") : it.text.slice(0, 3).join(" ");
      return { k: normKey(stem), ok: it.ok, obj, pbq: pbq || undefined };
    });
    return {
      attempt: parseInt(am[1], 10),
      score: parseInt(am[2], 10),
      total: parseInt(am[3], 10),
      date: dm ? `${dm[1]} ${dm[2]}` : "",
      year: dm ? parseInt(dm[3], 10) : null,
      items: out
    };
  }

  window.DionParser = {
    async parseFile(file){
      const buf = await file.arrayBuffer();
      const lines = await pdfToLines(buf);
      const rec = parseLines(lines);
      if (rec.items.length < rec.total * 0.8){
        throw new Error(`Only found ${rec.items.length} of ${rec.total} questions. Make sure you saved the full results page with "All Questions" selected.`);
      }
      return rec;
    },
    parseLines, pdfToLines
  };
})();
