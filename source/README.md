# Security+ Range

A free, installable study app for **CompTIA Security+ (SY0-701)**. Open it in a browser, or add it to your phone's home screen — it works offline after the first visit. Progress is saved on your device.

**How it works**

- **The Path** — 5 domains → all 28 exam objectives. Each objective has a lesson, flashcards, unlimited practice with every answer choice explained, and (for most objectives) a hands-on lab in the style of the exam's performance-based questions.
- **Gates** — score **80% or better** on an objective's gate test to unlock the next one.
- **Bosses** — each domain ends with a timed Hard Mode boss battle. The final step is a 90-question, 90-minute exam simulation weighted like the real exam (12/22/18/28/20).
- **Level up** — XP for lessons, cards, correct answers, labs and gates; ranks from Recruit to Security+ Elite; daily streaks and badges.
- **Arcade** — 60-second speed rounds, Hard Mode runs, quick quizzes by domain, missed-question review, confusion sets, a searchable keyword sheet, ports & firewall drills, an acronym blitz, and the Sec+ Defender arcade game.
- **Checkpoint phrases** — every passed gate gives a phrase. Type it under Profile → Restore on any device to pick up where you left off.

**Content:** 1,100+ original scenario questions with an explanation for every choice (600 standard, 500 hard), plus 180 more in the final exam pool, 25+ hands-on labs, and hundreds of flashcards.

Not affiliated with or endorsed by CompTIA. Security+ is a trademark of CompTIA.

## Building (RangeKit)

Lessons are RangeKit parts. Edit `source/rk/rk-secd1…5.src.js`, then:

```
cd source
python3 rk/build-sec.py        # fills SEC() placeholders from rk/sec-sections.json (the original lesson text)
python3 build.py               # writes dist/
node rangekit/rk-check.js dist/index.html                                  # must print "all checks passed"
node rangekit/rk-coverage.js dist/index.html objectives/sy0-701-bullets.json  # official-term audit
```
`src/rk-build-sec.js` maps each objective to its original stage (questions, cards and labs carry over exactly);
`src/rk-secterms.js` adds the "Exam wording" glossary to each objective.
