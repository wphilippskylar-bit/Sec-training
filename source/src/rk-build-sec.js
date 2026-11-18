/* Security+ RangeKit build table. Stage ids stay o1_1… so existing progress carries over; questions, vocab cards
   and labs move exactly from each old objective stage (oldByObj). Domain wrap-ups are added before each boss. */
(function () {
  var RK = window.RK, D = [];
  var names = { 1: 'General Security Concepts', 2: 'Threats, Vulnerabilities & Mitigations', 3: 'Security Architecture', 4: 'Security Operations', 5: 'Security Program Management & Oversight' };
  var counts = { 1: 4, 2: 5, 3: 4, 4: 9, 5: 6 };
  for (var d = 1; d <= 5; d++) {
    var map = {}, old = [];
    for (var i = 1; i <= counts[d]; i++) { map[d + '.' + i] = 'o' + d + '_' + i; old.push('o' + d + '_' + i); }
    D.push({ d: d, tier: 'd' + d, name: names[d], old: old, oldByObj: map, wrapLab: 'sx-d' + d + '-wrap', next: 'the Domain ' + d + ' boss' });
  }
  RK.build({ track: 'sec', pfx: '', domains: D });
})();
