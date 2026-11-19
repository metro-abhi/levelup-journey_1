(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const stage = $('#stage'), panel = $('#panel'), hud = $('#hud'), lb = $('#lb'), plate = $('#plate'), intro = $('#intro'), bubble = $('#bubble'), ghud = $('#ghud');
  const cv = $('#scene'), ctx = cv.getContext('2d'); ctx.imageSmoothingEnabled = false;
  const W = Art.W, H = Art.H, N = SLIDES.length;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  const split = s => { const i = s.indexOf(' ¦ '); return i < 0 ? [s, null] : [s.slice(0, i), s.slice(i + 3)]; };
  const flag = f => f ? `<span class="fl"><span class="fl-i">check</span>${esc(f)}</span>` : '';
  const initials = n => n.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const stopNo = i => i === 0 ? 'START' : `STOP 0${i}`;

  /* ---------- scene engine ---------- */
  let cur = -1, scene = 0, tr = null, game = null, rain = [], last = 0, sceneT0 = 0, peekT0 = 0, climbed = false;
  const EDGE = ['enter', 'blinds', 'zoom', 'x', 'up', 'iris', 'down', 'zoom', 'up'];
  const BLK = (() => { const o = []; for (let y = 0; y < 270; y += 18) for (let x = 0; x < 480; x += 16) o.push([x, y]); let s = 7; for (let i = o.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor(s / 233280 * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; } return o; })();   // how the camera moves between stop i and i+1
  const ease = p => p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  const snap = v => Math.round(v / 4) * 4;
  function drawScene(i, t, ox = 0, oy = 0, st = 99) { ctx.drawImage(Art.base(i), ox, oy); ctx.save(); ctx.translate(ox, oy); Art.anim(i, ctx, t, st); ctx.restore(); }
  function paint(now) {
    const t = now / 1000; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
    if (tr) {
      const p = (now - tr.t0) / tr.dur;
      if (p >= 1) { tr = null; sceneT0 = now; }
      else {
        const e = ease(p), A = tr.from, B = tr.to, d = tr.dir, mA = Art.meta(A), mB = Art.meta(B);
        if (tr.type === 'enter') {
          if (d > 0 && p < .55) {
            const q = p / .55, walk = clamp2(q / .3), zq = clamp2((q - .25) / .75), s = 1 + zq * zq * 3.4;
            ctx.drawImage(Art.doorsOpen(clamp2((q - .15) / .4)), 116 * (1 - s), 158 * (1 - s), W * s, H * s);
            if (walk < 1) Art.sprite(ctx, Math.round(52 + walk * 30), 246, 1 + Math.floor(now / 170) % 2, false, 0);
          } else if (d > 0) { drawScene(B, t, 0, 0, 0); Art.sprite(ctx, 52, Art.meta(B).feet, 0, false, 0); ctx.globalAlpha = Math.max(0, 1 - Math.floor((p - .55) / .45 * 6) / 6); ctx.fillStyle = '#FFF8E0'; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
          else { const off = snap(e * W); drawScene(A, t, off, 0); drawScene(B, t, off - W, 0); Art.sprite(ctx, 52, Art.meta(B).feet, 1 + Math.floor(now / 170) % 2, true, 0); }
          drawRain(t); return;
        }
        if (tr.type === 'iris' || tr.type === 'blinds' || tr.type === 'pixel') {
          drawScene(A, t); ctx.save(); ctx.beginPath();
          let r = 0;
          if (tr.type === 'iris') { r = snap(e * 290); ctx.arc(W / 2, H * .56, r, 0, Math.PI * 2); }
          else if (tr.type === 'blinds') { const n = 12, bw = W / n; for (let k = 0; k < n; k++) { const kk = d > 0 ? k : n - 1 - k, q = clamp2(e * 1.7 - k / n * .7); ctx.rect(kk * bw, 0, Math.ceil(bw * q / 4) * 4, H); } }
          else { const q = Math.floor(e * BLK.length); for (let k = 0; k < q; k++) ctx.rect(BLK[k][0], BLK[k][1], 16, 18); }
          ctx.clip(); drawScene(B, t); ctx.restore();
          if (tr.type === 'iris' && r > 4 && r < 280) { ctx.strokeStyle = '#FFD100'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(W / 2, H * .56, r, 0, Math.PI * 2); ctx.stroke(); ctx.strokeStyle = '#003D7C'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(W / 2, H * .56, r + 4, 0, Math.PI * 2); ctx.stroke(); }
          drawRain(t); return;
        }
        if (tr.type === 'x') { const off = snap(e * W) * d; drawScene(A, t, -off, 0); drawScene(B, t, d * W - off, 0); }
        else if (tr.type === 'up' || tr.type === 'down') { const vd = (tr.type === 'down' ? 1 : -1) * d, off = snap(e * H) * vd; drawScene(A, t, 0, -off); drawScene(B, t, 0, vd * H - off); }
        else { const s = d > 0 ? 1 + e * 1.4 : 2.4 - e * 1.4, Z = d > 0 ? A : B, O = d > 0 ? B : A; drawScene(O, t); ctx.globalAlpha = d > 0 ? 1 - Math.floor(e * 6) / 6 : Math.floor(e * 6) / 6 + .01; ctx.drawImage(Art.base(Z), 150 * (1 - s), 120 * (1 - s), W * s, H * s); ctx.globalAlpha = 1; if (d < 0 && e > .98) drawScene(B, t); }
        if (tr.type !== 'zoom' && (mA.sprite || mB.sprite)) { const fa = mA.sprite ? mA.feet : mB.feet, fb = mB.sprite ? mB.feet : mA.feet; const off = tr.type === 'x' && !mB.sprite ? snap(e * W) * d : 0; Art.sprite(ctx, 52 - off, Math.round(fa + (fb - fa) * e), 1 + Math.floor(now / 170) % 2, d < 0, Art.cartAt(d > 0 ? A : B, 99)); }
        drawRain(t); return;
      }
    }
    const m = Art.meta(scene), st = (now - sceneT0) / 1000;
    drawScene(scene, t, 0, 0, st);
    if (game) gameStep(now);
    else if (scene === 9 && stage.classList.contains('peek')) climb(now);
    else if (m.sprite) Art.sprite(ctx, 52, m.feet, 0, false, Art.cartAt(scene, st));
    updInv(st);
    drawRain(t);
  }
  function loop(now) { const m = Art.meta(scene), busy = tr || game || rain.length || (m.seq && (now - sceneT0) / 1000 < m.seq + .3) || (scene === 9 && stage.classList.contains('peek') && !climbed); if (busy || now - last > 90) { last = now; paint(now); } (document.hidden ? setTimeout(() => requestAnimationFrame(loop), 500) : requestAnimationFrame(loop)); }
  const clamp2 = v => Math.max(0, Math.min(1, v));

  /* ---------- the chef climbs to FY27 when you view the roof scene ---------- */
  function climb(now) {
    const p = (now - peekT0) / 1000; let x = 52, f = 256, fr = 0;
    const hops = [...Array(6)].map((_, i) => [150 + i * 46 + 4, 162 - i * 22]);
    if (p < 1.2) { x = 52 + (124 - 52) * (p / 1.2); fr = 1 + Math.floor(now / 170) % 2; }
    else { const k = Math.min(5.999, (p - 1.2) / .55), i = Math.floor(k), q = k - i, [ax, af] = i ? hops[i - 1] : [124, 256], [bx, bf] = hops[i]; x = ax + (bx - ax) * q; f = af + (bf - af) * q - Math.sin(q * Math.PI) * 18; fr = 2; if (p > 1.2 + 6 * .55) { [x, f] = hops[5]; fr = 0; if (!climbed) { climbed = true; makeRain(false); say('FY27, here we come!'); } } }
    Art.sprite(ctx, Math.round(x), Math.round(f), fr, false, 0);
  }

  /* ---------- inventory: what the customer has picked up so far ---------- */
  const INV = [['card', 'Customer card', 1, 3.3], ['checkout', 'Trolley', 1, 5.4], ['order', 'First items', 2, 2.3], ['ordermgmt', 'Receipt', 4, 1.8], ['app', 'The app', 5, 0]];
  let invKey = '';
  function updInv(st) {
    const have = INV.map(([k, l, sc, at]) => scene > sc || (scene === sc && st >= at)), key = have.join();
    if (key === invKey) return; const before = invKey ? invKey.split(',') : []; invKey = key;
    document.querySelectorAll('.inv i').forEach((el, n) => { el.classList.toggle('got', have[n]); if (have[n] && before[n] === 'false') { el.classList.remove('new'); void el.offsetWidth; el.classList.add('new'); } });
  }

  /* ---------- easter eggs ---------- */
  function drawRain(t) {
    if (!rain.length) return;
    rain = rain.filter(r => r.y < H + 10);
    rain.forEach(r => { r.y += r.v; ctx.fillStyle = r.hat ? '#FFFFFF' : '#FFD84A'; if (r.hat) { ctx.fillRect(r.x, r.y, 10, 6); ctx.fillRect(r.x + 1, r.y + 6, 8, 4); ctx.fillStyle = '#DCE4EE'; ctx.fillRect(r.x + 1, r.y + 9, 8, 1); } else { ctx.fillRect(r.x, r.y, 6, 8); ctx.fillStyle = '#FFFFFF'; ctx.fillRect(r.x, r.y, 2, 8); ctx.fillStyle = '#D99B12'; ctx.fillRect(r.x, r.y + 8, 6, 1); } });
  }
  const makeRain = hat => { if (reduce) return; for (let i = 0; i < 70; i++) rain.push({ x: Math.random() * W, y: -Math.random() * 260, v: 2 + Math.random() * 3, hat }); };
  const QUOTES = ['Oui, chef!', 'Mise en place first.', 'Net price, please. VAT comes later.', 'Table 12 needs 40 covers by eight.', 'One trolley is never enough.', 'Is it in stock in my store?', 'Cash and carry since 1964.', 'HoReCa runs on mornings like this.'];
  let qi = 0, bubT;
  function say(s) { bubble.textContent = s; bubble.hidden = false; clearTimeout(bubT); bubT = setTimeout(() => { bubble.hidden = true; }, 2600); }
  let typed = '';

  /* ---------- secrets ---------- */
  const SECRETS = { horeca: 'Oui, chef!', metro: 'Level up!', konami: 'Cheat code accepted: +30 lives', tareq: 'Tareq approves this roadmap.', level: 'Leveling up, one squad at a time.', cart: 'Cart full. AtP says: in stock.', fsd: 'Fresh, Seafood, Dairy. In that order.', tea: 'Break time. Back in 5.', hbr: 'Half-year business review: HBR1 or HBR2?', idle: 'Zzz… the shop never really sleeps.' };
  let found = new Set(); try { found = new Set(JSON.parse(localStorage.getItem('lvl-secrets') || '[]')); } catch (e) {}
  const secretBadge = document.createElement('div'); secretBadge.className = 'secrets pix'; secretBadge.hidden = true; stage.appendChild(secretBadge);
  const showBadge = () => { secretBadge.textContent = 'Secrets ' + found.size + '/' + Object.keys(SECRETS).length; secretBadge.hidden = found.size === 0; };
  function secret(id, msg) { if (!SECRETS[id]) return; say(msg || SECRETS[id]); if (!found.has(id)) { found.add(id); try { localStorage.setItem('lvl-secrets', JSON.stringify([...found])); } catch (e) {} } showBadge(); if (found.size === Object.keys(SECRETS).length) setTimeout(() => { makeRain(true); say('All secrets found. You are a true HoReCa hero.'); }, 2800); }
  showBadge();
  let kbuf = []; const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const word = w => typed.endsWith(w);
  let idleT = 0; const idleReset = () => { clearTimeout(idleT); stage.classList.remove('sleepy'); idleT = setTimeout(() => { stage.classList.add('sleepy'); secret('idle'); }, 90000); };
  ['pointermove', 'keydown', 'touchstart', 'wheel'].forEach(ev => addEventListener(ev, idleReset, { passive: true })); idleReset();
  /* ---------- help overlay ---------- */
  const help = document.createElement('div'); help.className = 'help'; help.hidden = true;
  help.innerHTML = '<div class="hbox"><h2 class="pix">Controls</h2><div class="hcols"><ul><li><b>← →</b> previous / next part or slide</li><li><b>1–7</b> spotlight a section type</li><li><b>P</b> who presents what</li><li><b>O</b> overview of every slide</li><li><b>/</b> search all slides</li><li><b>Home / End</b> first / last slide</li></ul><ul><li><b>S</b> spotlight on / off</li><li><b>F</b> show / hide items to confirm</li><li><b>T</b> 90-minute pacing timer</li><li><b>L</b> laser pointer</li><li><b>.</b> blackout screen</li><li><b>V</b> view scene · <b>G</b> mini-game</li></ul></div><p>Psst: some words and key combinations do things. Try typing a few, or searching for them.</p><button class="pix">Close</button></div>';
  stage.appendChild(help); help.addEventListener('click', () => { help.hidden = true; });

  /* ---------- optional mini-game: fill the trolley ---------- */
  const GAME_NAME = { 0: 'Stock up before service', 1: 'Collect your customer cards', 2: 'Grab the offers', 4: 'Load the order', 6: 'Catch the applications', 7: 'Catch the data packets', 9: 'Collect the quests' };
  function startGame() {
    if (!Art.meta(scene).sprite || tr) return;
    game = { t0: performance.now(), dur: 20000, x: 200, tx: 200, items: [], score: 0, next: 0, over: false, lt: performance.now(), dirL: false };
    stage.classList.add('gaming'); ghud.hidden = false; $('#play').setAttribute('aria-pressed', 'true');
  }
  function endGame() { game = null; stage.classList.remove('gaming'); ghud.hidden = true; $('#play').setAttribute('aria-pressed', 'false'); }
  function gameStep(now) {
    const g = game, m = Art.meta(scene), dt = Math.min(.1, (now - g.lt) / 1000); g.lt = now;
    const left = Math.max(0, g.dur - (now - g.t0));
    if (!g.over) {
      if (g.key) g.tx += g.key * 220 * dt;
      g.tx = Math.max(0, Math.min(W - 72, g.tx)); const dx = g.tx - g.x; if (Math.abs(dx) > 1) g.dirL = dx < 0; g.x += dx * Math.min(1, dt * 14);
      if (now > g.next) { g.items.push({ x: 16 + Math.random() * (W - 40), y: -12, v: 70 + Math.random() * 70, k: Math.random() * 4 | 0 }); g.next = now + 520; }
      g.items.forEach(it => { it.y += it.v * dt; const cx = g.dirL ? g.x + 20 : g.x + 48; if (!it.hit && it.y > m.feet - 44 && it.y < m.feet - 14 && Math.abs(it.x + 6 - cx) < 24) { it.hit = true; g.score++; } });
      g.items = g.items.filter(it => !it.hit && it.y < H);
      if (left <= 0) g.over = true;
    }
    g.items.forEach(it => { ctx.fillStyle = ['#D9A15F', '#E5484D', '#18A96B', '#FFB81C'][it.k]; ctx.fillRect(it.x | 0, it.y | 0, 12, 10); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(it.x | 0, it.y | 0, 12, 2); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect((it.x | 0) + 5, it.y | 0, 2, 10); });
    Art.sprite(ctx, Math.round(g.x), m.feet, g.over ? 0 : 1 + Math.floor(now / 120) % 2, g.dirL);
    ghud.innerHTML = g.over ? `<b>${g.score}</b> on the trolley. ${g.score >= 20 ? 'Service is saved.' : g.score >= 12 ? 'A solid shop.' : 'The chef wants more.'} &nbsp; G = again · Esc = back`
      : `${esc(GAME_NAME[scene] || 'Fill the trolley')} &nbsp; <b>${g.score}</b> &nbsp; ${Math.ceil(left / 1000)}s`;
  }

  /* ---------- pixel icons ---------- */
  const BMP = {
    star: ['...#...', '..###..', '#######', '.#####.', '..###..', '.##.##.', '.#...#.'],
    link: ['.......', '.##.##.', '#..#..#', '#..#..#', '#..#..#', '.##.##.', '.......'],
    wrench: ['....#.#', '....###', '...##..', '..##...', '.##....', '##.....', '#......'],
    rocket: ['...#...', '..###..', '..#.#..', '..###..', '.#####.', '#.###.#', '..#.#..'],
    arrow: ['...#...', '....#..', '.....#.', '#######', '.....#.', '....#..', '...#...'],
    bubble: ['.#####.', '#######', '#######', '#######', '.#####.', '..#....', '.#.....'],
    card: ['.......', '#######', '#######', '#.....#', '#.##..#', '#######', '.......'],
    cart: ['#......', '.######', '.#.#.#.', '.######', '..#####', '.......', '..#..#.'],
    box: ['.......', '.#####.', '#######', '#..#..#', '#######', '#######', '.......'],
    receipt: ['.#####.', '.#...#.', '.#####.', '.#...#.', '.#####.', '.#.#.#.', '.......'],
    phone: ['.#####.', '.#...#.', '.#...#.', '.#...#.', '.#...#.', '.#####.', '..###..'],
    flag: ['#......', '#####..', '######.', '#####..', '#......', '#......', '#......']
  };
  const ICO = new Set(['trophy', 'harmonize', 'fix', 'launch', 'roadmap', 'question', 'bubble', 'report', 'customer', 'strategy', 'squads', 'unlock', 'delivered', 'progress', 'missed', 'highlight', 'performance', 'security', 'search', 'web', 'app', 'checkout', 'delivery', 'order', 'ordermgmt', 'websites', 'catalogue', 'service', 'media', 'platform', 'direction', 'levelup', 'milestone', 'finish', 'summit', 'goal', 'markets', 'idea', 'value']);
  const icon = (n, col) => ICO.has(n) ? `<img class="ico pxi" src="img/ico/${n}.png" alt="">` : svgIcon(n, col);
  const svgIcon = (n, col = 'currentColor') => `<svg class="ico" viewBox="0 0 7 7" aria-hidden="true">${BMP[n].map((r, y) => [...r].map((c, x) => c === '#' ? `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>` : '').join('')).join('')}</svg>`.replace('<svg', `<svg fill="${col}"`);
  const keyOf = k => KEYS[k] || KEYS.next;

  /* ---------- HUD ---------- */
  hud.innerHTML = `<div class="lvl box"><span class="pix lv" id="lv"></span><span class="lvn" id="lvn"></span><span class="inv">${INV.map(([k, l]) => `<i title="${l}">${icon(k)}</i>`).join('')}</span></div>
    <div class="map">${STOPS.map((s, i) => `<button class="node" data-scene="${i}" aria-label="${esc(s.name)}">${i === 0 ? '★' : i}<span class="tip">${esc(s.name)}</span></button>`).join('')}</div>
    <div class="right"><span class="cnt pix box" id="cnt"></span><button class="fbtn pix box" id="fbtn" aria-pressed="true" title="Show or hide items still to confirm (F)">Checks on</button></div>`;

  /* ---------- slide parts ---------- */

  /* ---------- pixel avatars: one deterministic 8-bit face per person ---------- */
  const hsh = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h; };
  const SKIN = ['#F6D2B0', '#E8B58A', '#C98E62', '#8D5A3B'], HAIR = ['#2B1B10', '#5A3A1E', '#B9772E', '#1B1B1B', '#C9C9CF', '#7A2E1A'], SHIRT = [['#003D7C', '#FFD84A'], ['#FFB81C', '#003D7C'], ['#5AA2FF', '#003D7C'], ['#1F6FD1', '#FFFFFF']];
  const avCache = {};
  const avatar = (n, big) => {
    if (!n) return '<svg class="pa" viewBox="0 0 12 12"><rect width="12" height="12" fill="#FFE2A3"/><text x="6" y="9" font-size="9" text-anchor="middle" fill="#7A4A00" font-family="Silkscreen,monospace">?</text></svg>';
    if (avCache[n]) return avCache[n];
    const h = hsh(n), sk = SKIN[h % 4], hr = HAIR[(h >>> 3) % 6], [sh, tr] = SHIRT[(h >>> 6) % 4], st = (h >>> 9) % 4, gl = (h >>> 12) % 3 === 0;
    const R = (x, y, w, hh, c) => `<rect x="${x}" y="${y}" width="${w}" height="${hh}" fill="${c}"/>`;
    let s = R(0, 0, 12, 12, '#E2F4FF') + R(1, 9, 10, 3, sh) + R(5, 9, 2, 1, tr) + R(4, 8, 4, 1, sk) + R(3, 3, 6, 5, sk) + R(4, 5, 1, 1, '#0B2447') + R(7, 5, 1, 1, '#0B2447') + R(5, 7, 2, 1, '#B5543B');
    if (gl) s += R(3, 5, 3, 1, 'rgba(11,36,71,.0)') + R(3, 4, 3, 1, '#0B2447') + R(6, 4, 3, 1, '#0B2447') + R(4, 5, 1, 1, '#FFFFFF') + R(7, 5, 1, 1, '#FFFFFF');
    s += st === 0 ? R(3, 2, 6, 2, hr) + R(2, 3, 1, 3, hr) + R(9, 3, 1, 3, hr) : st === 1 ? R(3, 2, 6, 1, hr) + R(3, 3, 2, 1, hr) : st === 2 ? R(2, 2, 8, 2, hr) + R(2, 4, 1, 4, hr) + R(9, 4, 1, 4, hr) : R(3, 2, 6, 2, hr) + R(3, 4, 1, 1, hr) + R(8, 4, 1, 1, hr);
    return avCache[n] = `<svg class="pa" viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true">${s}</svg>`;
  };
  const NAMEOF = w => w[0];
  const firstOf = n => SLIDES.findIndex(s => (s.who || []).some(w => !w[2] && w[0] === n));
  const nextPresenter = i => { const cu = (SLIDES[i].who || []).map(NAMEOF).join('|'); for (let j = i + 1; j < N; j++) { const w = (SLIDES[j].who || []).filter(x => !x[2]); if (w.length && w.map(NAMEOF).join('|') !== cu) return { w: w[0], j }; } return null; };
  const ART = s => s.room ?? s.scene, ROOMS = { 10: 'Dispatch · Order Management', 11: 'The media world · Wholesale Media' };
  const scenePeople = (i, stop) => { const seen = new Set(), out = []; SLIDES.filter(s => ART(s) === i && s.stop === stop).forEach(s => (s.who || []).forEach(w => { const k = w[0] + w[1]; if (!seen.has(k)) { seen.add(k); out.push(w); } })); return out; };
  const stopPeople = st => { const seen = new Set(), out = []; SLIDES.filter(x => x.stop === st).forEach(x => (x.who || []).forEach(w => { const k = w[0] + w[1]; if (!seen.has(k) && !seen.has(w[0])) { seen.add(k); seen.add(w[0]); out.push(w); } })); return out; };
  const person = ([n, role, tbc, note]) => `<div class="pp${tbc ? ' tbc' : ''}${note ? ' chk' : ''}" ${note ? `title="${esc(note)}"` : ''}><span class="av">${avatar(tbc ? '' : n)}</span><div><b>${esc(tbc ? role : n)}</b><span>${tbc ? 'Squad lead <em>· name to add</em>' : esc(role)}${note ? ` <em>· ${esc(note)}</em>` : ''}</span></div></div>`;
  const chip = ([n, role, tbc]) => `<span class="wc${tbc ? ' tbc' : ''}"><span class="wa">${avatar(tbc ? '' : n)}</span>${tbc ? esc(role) + ' <i>squad lead</i>' : esc(n)}</span>`;
  const trf = t => { const m = t.match(/^(.{1,40}?)\s*(?:→|->)\s*(.{1,40})$/); return m ? `<span class="was">${md(m[1])}</span><span class="arr">→</span><span class="now">${md(m[2])}</span>` : md(t).replace(/ → /g, ' <span class="arr">→</span> '); };
  function item(it) {
    if (typeof it === 'string') { const [t, f] = split(it); return `<li>${trf(t)}${flag(f)}</li>`; }
    const sub = it.sub ? `<ul class="sub">${it.sub.map(x => `<li>${md(x)}</li>`).join('')}</ul>` : '';
    const go = it.go ? ` class="go" data-go="${it.go}" tabindex="0"` : '';
    return `<li${go}><b>${trf(it.t)}</b>${it.s ? `<span class="st">${md(it.s)}</span>` : ''}${sub}${flag(it.f)}${it.go ? '<span class="ga">▸ more</span>' : ''}</li>`;
  }
  const kv = K => `--kc:${K.col};--kt:${K.txt || K.col};--ko:${K.on || '#fff'}`;
  const secHtml = (c, i) => { const K = keyOf(c.k); return `<section class="sec step" data-k="${c.k}" style="${kv(K)};--d:${i}"><div class="sh">${icon(K.icon)}<span>${esc(c.h.trim() || K.label)}</span></div><ul>${c.items.map(item).join('')}</ul></section>`; };
  function numsHtml(nums) {
    return `<div class="nums">${nums.map(([v, l, back], i) => {
      const [bt, f] = split(back || ''); const vv = v.includes('→') ? (([x, y]) => `<span class="was">${esc(x.trim())}</span><span class="arr">→</span>${esc(y.trim())}`)(v.split('→')) : esc(v); const front = `<div class="f"><div class="v${v.includes('→') ? ' tr' : ''}">${vv}</div><div class="l">${md(l)}</div></div>`;
      if (!back) return `<div class="num" style="--d:${i}">${front}</div>`;
      return `<button class="num flipn${f ? ' chk' : ''}" style="--d:${i}" aria-label="${esc(v)}: tap for detail">${front}<div class="b"><span class="pix">${esc(v)} · ${md(l)}</span>${bt ? md(bt) : ''}${flag(f)}</div></button>`;
    }).join('')}</div>`;
  }
  function lanesHtml(L, i) {
    const n = L.cols.length;
    const rows = L.rows.map(r => { const K = keyOf(r.k); return `<div class="lrow" style="${kv(K)}"><div class="lk">${icon(K.icon)}<span>${esc(K.label)}</span></div><div class="lgrid" style="--n:${n}">${r.items.map(([t, a, w], j) => `<div class="bar2" style="grid-column:${a + 1} / span ${w};--j:${j}"><span>${esc(t)}</span></div>`).join('')}</div></div>`; }).join('');
    const ks = [...new Set(L.rows.map(r => r.k))];
    return `<section class="lanes step" data-k="${ks.join(' ')}" style="--d:${i}"><div class="sh plain">${esc(L.h)}</div><div class="lrow head"><div class="lk"></div><div class="lgrid" style="--n:${n}">${L.cols.map(c => `<div class="lc pix">${esc(c)}</div>`).join('')}</div></div>${rows}${L.foot ? `<div class="lfoot">${esc(L.foot)}</div>` : ''}</section>`;
  }
  function cardsHtml(cards) {
    return `<div class="cards n${cards.length}">${cards.map((c, i) => { const K = keyOf(c.k); return `<div class="card step" data-k="${c.k}" style="${kv(K)};--d:${i}" tabindex="0" role="button" aria-label="${esc(c.h)}: turn the card">
      <div class="cin"><div class="cf"><div class="cimg">${c.img2 ? '<span class="bab pix">Before</span>' : ''}<img loading="lazy" decoding="async" src="img/${c.img[0]}.webp" alt="${esc(c.img[1])}"></div><div class="ct">${icon(K.icon)}<b>${esc(c.h)}</b></div><div class="cl pix">Problem</div><p>${md(c.p)}</p><span class="turn pix">Turn ↻</span></div>
      <div class="cb">${c.img2 ? `<div class="cimg"><span class="bab after pix">After</span><img loading="lazy" decoding="async" src="img/${c.img2[0]}.webp" alt="${esc(c.img2[1])}"></div>` : ''}<div class="ct">${icon(K.icon)}<b>${esc(c.h)}</b></div><div class="cl pix">Status</div><p>${md(c.st)}</p>${flag(c.f)}<span class="turn pix">↺ Back</span></div></div></div>`; }).join('')}</div>`;
  }
  let gallery = [];
  function shotsHtml(shots) {
    gallery = []; shots.forEach(s => { if (Array.isArray(s)) gallery.push(s); else { gallery.push(s.a); gallery.push(s.b); } });
    const max = 4, vis = shots.slice(0, max), extra = shots.length - max; let gi = 0;
    return `<div class="shots n${vis.length}">${vis.map((s, k) => {
      if (!Array.isArray(s)) { const i0 = gi; gi += 2; return `<div class="shot ba" style="--x:50"><div class="baw"><img class="b0" loading="lazy" decoding="async" src="img/${s.a[0]}.webp" alt="${esc(s.a[1])}"><div class="b1"><img loading="lazy" decoding="async" src="img/${s.b[0]}.webp" alt="${esc(s.b[1])}"></div><span class="bal pix">Before</span><span class="bar pix">After</span><span class="bah" aria-hidden="true"><i>◀ ▶</i></span></div><div class="cap">Drag to compare · ${esc(s.b[1])}</div><button class="zoom" data-g="${i0}" aria-label="Enlarge">+</button></div>`; }
      const i0 = gi++; const more = k === max - 1 && extra > 0;
      return `<button class="shot" data-g="${i0}"><img loading="lazy" decoding="async" src="img/${s[0]}.webp" alt="${esc(s[1])}"><div class="cap">${esc(s[1])}</div>${more ? `<span class="more">+${extra} more</span>` : ''}</button>`;
    }).join('')}</div>`;
  }
  const kinds = s => { const ks = []; (s.secs || []).forEach(c => ks.push(c.k)); (s.cards || []).forEach(c => ks.push(c.k)); if (s.lanes) s.lanes.rows.forEach(r => ks.push(r.k)); if (s.collect) ks.push(s.collect); return [...new Set(ks)].filter(k => k !== 'ask' || true); };
  const chipsHtml = s => { const ks = kinds(s); if (!ks.length) return ''; return `<div class="keys">${ks.map((k, i) => { const K = keyOf(k); return `<button class="key" data-key="${k}" style="${kv(K)};--d:${i}">${icon(K.icon)}<span>${esc(K.label)}</span></button>`; }).join('')}</div>`; };


  /* ---------- M.Companion dashboard ---------- */
  const cnt = (v, dp) => `<span class="count" data-to="${v}" data-dp="${dp}">${(+v).toFixed(dp)}</span>`;
  const up = g => `<span class="dup">▲ ${esc(g)}</span>`;
  const dtile = ([l, v, u, dp, g, f], cls, i) => { const [ft, fl] = f ? split(f) : ['', null]; return `<div class="dt ${cls} step" data-k="succ" style="--d:${i}"><span class="dl">${esc(l)}</span><span class="dv">${cnt(v, dp)}<small>${esc(u)}</small></span>${up(g)}${ft ? `<span class="dx">${esc(ft)}</span>` : ''}${flag(fl)}</div>`; };
  function donut(c, i) {
    let off = 25; const segs = c.parts.map(([n, p, col], k) => { const s = `<circle class="seg" r="15.9155" cx="21" cy="21" stroke="${col}" style="stroke-dasharray:${p} ${100 - p};stroke-dashoffset:${off};--k:${k}"/>`; off -= p; return s; }).join('');
    const top = c.parts.reduce((m, x) => x[1] > m[1] ? x : m);
    return `<div class="dnut step" data-k="succ" style="--d:${i}"><div class="dh">${esc(c.h)}</div><div class="dnw"><svg viewBox="0 0 42 42" aria-hidden="true"><circle r="15.9155" cx="21" cy="21" class="dbg"/>${segs}</svg><div class="dc"><b>${top[1]}%</b><span>${esc(top[0])}</span></div></div><ul class="dleg">${c.parts.map(([n, p, col]) => `<li><i style="background:${col}"></i>${esc(n)}<b>${p}%</b></li>`).join('')}</ul>${c.note ? `<p class="dnote">${esc(c.note)}</p>` : ''}</div>`;
  }
  const dshot = (s, i) => `<button class="dshot step" data-k="succ" data-g="0" style="--d:${i}"><img loading="lazy" decoding="async" src="img/${s.shots[0][0]}.webp" alt="${esc(s.shots[0][1])}"><span class="pix">Daily trend · open the dashboard view ⤢</span></button>`;
  function dashHtml(s) {
    gallery = s.shots.slice();
    const tabs = `<div class="dtabs">${[['dash1', 'Sales'], ['dash2', 'Customers'], ['dash3', 'PDEs']].map(([id, l]) => `<button class="dtab pix${s.id === id ? ' on' : ''}" data-go="${id}">${l}</button>`).join('')}<span class="dper pix">1 Oct 2025 – 30 Sept 2026</span></div>`;
    if (s.view === 'sales') {
      const fastest = s.branches.flatMap(b => [b.n, ...b.leaves]).reduce((m, x) => parseFloat(x[4]) > parseFloat(m[4]) ? x : m);
      return tabs + `<div class="dash sales"><div class="dtree">
        ${dtile(s.total, 'total', 0)}
        <svg class="dlk l1" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50 H45 V25 H100 M45 50 V75 H100"/></svg>
        ${s.branches.map((b, k) => `${dtile(b.n, 'mid r' + (k + 1), k + 1)}<svg class="dlk l2 r${k + 1}" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50 H100"/></svg>${b.leaves.map((x, j) => dtile(x, 'leaf r' + (k + 1) + ' c' + (j + 1), 3 + k * 2 + j)).join('')}`).join('')}
      </div><div class="dside">${donut(s.ctg, 7)}<div class="dins step" data-k="succ" style="--d:8"><span class="pix">Fastest growth</span><b>${esc(fastest[0])}</b> ${up(fastest[4])}</div>${dshot(s, 9)}</div></div>`;
    }
    if (s.view === 'cust') {
      const fastest = s.tiles.reduce((m, x) => parseFloat(x[4]) > parseFloat(m[4]) ? x : m);
      return tabs + `<div class="dash cust"><div class="dtiles">${s.tiles.map((x, i) => dtile(x, 'kp' + (x === fastest ? ' hot' : ''), i)).join('')}</div><div class="drow">${donut(s.ctg, 4)}${dshot(s, 5)}</div></div>`;
    }
    const mx = Math.max(...s.events.map(e => e[1]));
    return tabs + `<div class="dash pde"><div class="dpl"><div class="dt big step" data-k="succ" style="--d:0"><span class="dl">${esc(s.pde[2])}</span><span class="dv">${cnt(s.pde[0], 1)}<small>${esc(s.pde[1])}</small></span><span class="dok">✓ ${esc(s.pde[3])}</span></div>${dshot(s, 2)}</div>
      <div class="dbars step" data-k="succ" style="--d:1"><div class="dh">Which events drive purchases</div><div class="dgrid"><i style="--x:0"></i><i style="--x:33.3"></i><i style="--x:66.6"></i><i style="--x:100"></i></div>${s.events.map(([n, v], j) => `<div class="dbr" style="--j:${j}"><span class="dn">${esc(n)}</span><span class="dtrk"><i style="--w:${(v / 60 * 100).toFixed(1)}"></i></span></div>`).join('')}<div class="dax pix"><span>0</span><span>20m</span><span>40m</span><span>60m</span></div><p class="dnote">${esc(s.evnote)}</p></div></div>`;
  }

  /* ---------- special slide types ---------- */
  function reportHtml(s) {
    const tiles = s.kpis.map((k, i) => {
      let viz = '';
      if (k.split) viz = `<div class="split">${k.split.map(([n, p], j) => `<i style="--w:${p};--c:${j ? '#E5484D' : '#1F6FD1'}" title="${esc(n)} ${p}%"></i>`).join('')}</div><div class="leg">${k.split.map(([n, p, v, g], j) => `<span><i style="background:${j ? '#E5484D' : '#1F6FD1'}"></i>${esc(n)} <b>${p}%</b></span>`).join('')}</div>`;
      else if (k.m) viz = `<div class="meter"><i style="--w:${(k.m.val / k.m.max * 100).toFixed(1)}"></i>${k.m.tgt ? `<b class="tgt" style="left:${(k.m.tgt / k.m.max * 100).toFixed(1)}%" title="target"></b>` : ''}</div><div class="leg"><span>${esc(k.m.lab)}</span></div>`;
      const back = k.split ? k.split.map(([n, p, v, g]) => `<li><b>${esc(n)}</b> ${esc(v)} · ${esc(g)} · share ${p}%</li>`).join('') : `<li>${esc(k.m.lab)}</li>`;
      return `<button class="kpi step" style="--d:${i}" data-k="succ"><div class="kf"><div class="kh pix">${esc(k.h)}</div><div class="kv"><span class="count" data-to="${k.v}" data-dp="${k.d}">0</span><small>${esc(k.u)}</small><em>▲ ${esc(k.g)}</em></div>${viz}</div><div class="kb"><div class="kh pix">${esc(k.h)} · FY26</div><ul>${back}</ul><div class="src2">Digital Commerce Report · Platform KPIs · Owner DigiCom · Source DANA / GA4 / Controlling</div></div></button>`;
    }).join('');
    return `<div class="rep"><div class="ticks step" data-k="say" style="--d:0"><div class="sh" style="--kc:${KEYS.say.col}">${icon('bubble')}<span>From the report slide</span></div>${s.ticks.map((t, i) => `<button class="tick" style="--d:${i}"><span class="box2"></span><span>${md(t)}</span></button>`).join('')}<button class="open-rep" data-g="0">${icon('star')} Open the report</button></div><div class="kpis">${tiles}</div></div>`;
  }
  function o2oHtml(s) {
    return `<div class="o2o step" data-k="succ" style="--d:0"><div class="sh plain">Who drove O2O · share of the uplift as written on the slide</div><div class="split big">${s.split.map(([n, p, u], j) => `<i style="--w:${p};--c:${['#E5484D', '#1F6FD1', '#FFB81C'][j]}"><span>${p >= 10 ? `${esc(n)} ${p}%` : ''}</span></i>`).join('')}</div><div class="leg">${s.split.map(([n, p, u], j) => `<span><i style="background:${['#E5484D', '#1F6FD1', '#FFB81C'][j]}"></i><b>${esc(n)}</b> ${p}% · ${esc(u)}</span>`).join('')}</div></div>`;
  }
  function routeHtml(s) {
    return `<div class="route">${s.route.map(([n, name, who], i) => `<button class="stop step" data-scene="${n}" style="--d:${i}"><span class="sn pix">${String(n).padStart(2, '0')}</span><b>${esc(name)}</b><span>${esc(who)}</span></button>`).join('')}</div>`;
  }
  function atpHtml(s) {
    const tiles = s.status.flatMap(([k, lab, cs, col]) => cs.split(' ').map(c => `<span class="ctry" data-st="${k}" style="--c:${col}">${c}</span>`)).join('');
    return `<div class="atp step" data-k="succ" style="--d:0"><div class="sh" style="--kc:${KEYS.succ.col}">${icon('star')}<span>FY26 · where AtP is live</span></div><div class="ctrys">${tiles}</div><div class="stl">${s.status.map(([k, lab, cs, col]) => `<button class="stb" data-st="${k}" style="--c:${col}"><i></i>${esc(lab)} <b>${cs.split(' ').length}</b></button>`).join('')}</div></div>`;
  }
  function tableHtml(s) {
    return `<div class="ptab"><div class="prow ph pix"><span>Project</span><span>Goal</span><span>Result</span><span>Next step</span><span></span></div>${s.table.map(([p, g, r, nx, go], i) => `<button class="prow step" data-k="proj" data-go="${go}" style="--d:${i}"><span class="pn">${esc(p)}</span><span class="pg">${esc(g)}</span><span class="pr">${esc(r)}</span><span class="px">${esc(nx)}</span><span class="ga">▸</span></button>`).join('')}<div class="lfoot">Tap a project to open its slide</div></div>`;
  }

  function harmHtml(s) {
    return `<div class="hm"><div class="hblock step" data-k="harm" style="--d:0">${icon('link')}<div class="hc">${esc(s.country)}</div><div class="hs">${esc(s.csub)}</div>
      <div class="hshare"><span class="pix">Digital Sales Share</span><b>${esc(s.share[0])}</b><div class="meter gold"><i style="--w:${s.share[1]}"></i></div></div></div>
      <div class="hsteps">${s.steps.map((st, i) => `<div class="hstep step" data-k="harm" style="--d:${i + 1}"><span class="hn">${i + 1}</span><div><b>${md(st.t)}</b>${st.sub ? `<ul>${st.sub.map(x => `<li>${md(x)}</li>`).join('')}</ul>` : ''}</div></div>`).join('')}</div></div>`;
  }
  function matrixHtml(s) {
    const mark = v => v === 'L' ? '<span class="mk live"><img class="pxi" src="img/ico/delivered.png" alt="Live"></span>' : v === 'R' ? '<span class="mk roll"><img class="pxi" src="img/ico/progress.png" alt="Rolling out"></span>' : v === 'P' ? '<span class="mk plan">○</span>' : '';
    return `<div class="mx step" data-k="harm" style="--d:0"><table><thead><tr><th class="pix">Capability</th>${s.cols.map(c => `<th><button class="mxc pix" data-col="${c}">${c}</button></th>`).join('')}</tr></thead><tbody>${s.rows.map(([cap, go, m], i) => `<tr style="--d:${i}"><th><button data-go="${go}">${esc(cap)} <span>▸</span></button></th>${s.cols.map(c => `<td data-col="${c}">${mark(m[c])}</td>`).join('')}</tr>`).join('')}</tbody></table>
      <div class="mleg"><span>${mark('L')} Live</span><span>${mark('R')} Rolling out</span><span>${mark('P')} Planned</span></div></div>`;
  }
  function barsHtml(b) {
    const max = Math.max(...b.items.map(x => x[1]));
    return `<div class="bars step" data-k="succ" style="--d:0"><div class="sh plain">${esc(b.h)}</div>${b.items.map(([l, v, d], i) => `<div class="br"><span class="bl">${esc(l)}</span><span class="bt"><i style="--w:${Math.max(2, v / max * 100).toFixed(1)};--j:${i}"></i></span><b>${esc(d)}</b></div>`).join('')}</div>`;
  }
  const SQ = s => s.squad || (s.tag || '').split('·').pop().trim();
  function collectHtml(s) {
    const groups = [];
    SLIDES.forEach(x => (x.secs || []).concat(x.lanes ? [] : []).forEach(c => {
      if (c.k !== s.collect || x.type === 'collect' || x.id === 'h1' || x.id === 'h2' || /Strategic projects/.test(x.tag || '') || /^h\d$|^hood/.test(x.id)) return;
      let g = groups.find(g => g.sq === SQ(x)); if (!g) groups.push(g = { sq: SQ(x), id: x.id, src: x.src, items: [] });
      (c.ch ? [c.h] : c.items.map(it => typeof it === 'string' ? split(it)[0] : it.t)).forEach(t => { if (!g.items.includes(t)) g.items.push(t); });
    }));
    SLIDES.forEach(x => { if (x.lanes && !/Strategic projects/.test(x.tag || '')) x.lanes.rows.filter(r => r.k === s.collect).forEach(r => { let g = groups.find(g => g.sq === SQ(x)); if (!g) groups.push(g = { sq: SQ(x), id: x.id, src: x.src, items: [] }); r.items.forEach(([t]) => { if (!g.items.includes(t)) g.items.push(t); }); }); });
    const K = keyOf(s.collect);
    return `<div class="coll" style="${kv(K)}">${groups.map((g, i) => `<div class="cg step" data-k="${s.collect}" style="--d:${i}"><button class="cgh" data-go="${g.id}">${icon(K.icon)}<b>${esc(g.sq)}</b><span class="pix">slide ${esc(g.src)} ▸</span></button><ul>${g.items.map(t => `<li>${md(t)}</li>`).join('')}</ul></div>`).join('')}</div>${s.note ? (() => { const [t, f] = split(s.note); return `<p class="qnote">${md(t)}${flag(f)}</p>`; })() : ''}`;
  }

  function render(s) {
    if (s.type === 'cover') return `<div class="tag pix">${esc(s.tag)}</div><h1 class="logo">LEVEL UP</h1><p class="cv-sub">${esc(s.sub)}</p><p class="cv-meta">${esc(s.meta)}</p><button class="start" data-go="report"><span class="pix">Press</span>→ Start the journey</button>`;
    if (s.type === 'close') return `<h1 class="logo">THANK YOU</h1><p class="cv-sub">${esc(s.sub)}</p>`;
    const title = s.squad ? s.squad : s.title, sub = s.squad ? s.period : s.sub;
    const tag = s.tag || `${stopNo(s.stop)} · ${STOPS[s.stop].name}`;
    let h = `<header class="hd"><div class="top"><div class="tag pix">${esc(tag)}</div><div class="by"><span class="pix">Presenting</span>${(s.who || []).map(chip).join('')}</div></div>
      <h1>${s.icon ? `<img class="hico pxi" src="img/ico/${s.icon}.png" alt="">` : ''}${md(title)}</h1>${sub ? `<p class="sub">${md(sub)}${s.squad && s.sub ? ` · <span>${md(s.sub)}</span>` : ''}</p>` : ''}${chipsHtml(s)}</header>`;
    if (s.type === 'report') return h + reportHtml(s) + (s.link ? `<a class="rlink pix" href="${esc(s.link[1])}" target="_blank" rel="noopener">${esc(s.link[0])} ↗</a>` : '') + srcHtml(s);
    if (s.type === 'dash') return h + dashHtml(s) + srcHtml(s);
    if (s.nums) h += numsHtml(s.nums);
    if (s.type === 'o2o') h += o2oHtml(s);
    if (s.type === 'route') h += routeHtml(s);
    if (s.type === 'atp') h += atpHtml(s);
    if (s.type === 'projects') h += tableHtml(s);
    if (s.type === 'collect') h += collectHtml(s);
    if (s.type === 'harm') h += harmHtml(s);
    if (s.type === 'matrix') h += matrixHtml(s);
    if (s.bars) h += barsHtml(s.bars);
    if (s.lanes) h += lanesHtml(s.lanes, 0);
    if (s.cards) h += cardsHtml(s.cards) + (s.hint ? `<p class="hint pix">${esc(s.hint)}</p>` : '');
    const shots = s.shots || [];
    if ((s.secs || []).length || shots.length) {
      h += `<div class="body${shots.length ? ' has-shots' : ''}"><div class="cols n${(s.secs || []).length}">${(s.secs || []).map(secHtml).join('')}</div>`;
      if (shots.length) h += shotsHtml(shots);
      h += '</div>';
    }
    if (s.quests) h += `<div class="quests">${s.quests.map(([n, t, l, f, ds], i) => `<div class="q${f ? ' qf' : ''}" style="--d:${i}"><span class="qn pix">${String(n).padStart(2, '0')}</span><b>${esc(t)}</b>${ds ? `<span class="qd">${esc(ds)}</span>` : ''}<span class="ql">▸ ${esc(l)}</span>${flag(f || '')}</div>`).join('')}</div>`;
    return h + srcHtml(s);
  }
  const srcHtml = s => s.src ? `<div class="src pix">${s.src === '—' ? 'Not in the deck yet' : /^\d/.test(s.src) ? `From deck slide ${esc(s.src)}` : `Source: ${esc(s.src)}`}</div>` : '';

  function fit() {
    if (panel.classList.contains('cover')) return;
    let fs = 1.14; panel.style.setProperty('--fs', fs);
    const els = () => [panel, $('.cols', panel), $('.quests', panel), $('.coll', panel)].filter(Boolean).concat([...panel.querySelectorAll('.q, .card .cf, .card .cb, .sec')]);
    const over = () => els().some(el => el.scrollHeight > el.clientHeight + 1 || (el.classList.contains('coll') && el.scrollWidth > el.clientWidth + 1));
    while (over() && fs > .66) { fs -= .03; panel.style.setProperty('--fs', fs.toFixed(2)); }
  }

  /* ---------- focus: highlight one part, dim the rest ---------- */
  let step = -1, stepping = true;
  const steps = () => [...panel.querySelectorAll('.step')].filter(e => !e.closest('.coll') && !e.matches('.kpi, .stop, .prow'));
  function clearFocus() { panel.classList.remove('focusing'); panel.querySelectorAll('.lit').forEach(e => e.classList.remove('lit')); panel.querySelectorAll('.key.on').forEach(e => e.classList.remove('on')); }
  function focusEls(els) { clearFocus(); if (!els.length) return; panel.classList.add('focusing'); els.forEach(e => e.classList.add('lit')); const ks = new Set(els.flatMap(e => (e.dataset.k || '').split(' '))); panel.querySelectorAll('.key').forEach(b => b.classList.toggle('on', ks.has(b.dataset.key))); }
  function focusStep(i) { const st = steps(); step = i; if (i < 0 || i >= st.length) { step = -1; clearFocus(); return; } focusEls([st[i]]); }
  function focusKey(k) { const els = [...panel.querySelectorAll('.step')].filter(e => (e.dataset.k || '').split(' ').includes(k)); const already = panel.querySelector(`.key[data-key="${k}"].on`) && panel.querySelectorAll('.lit').length === els.length; if (already) { clearFocus(); step = -1; } else { focusEls(els); step = -1; } }

  /* ---------- reveal after the screen settles ---------- */
  let revealT;
  function reveal(delay) {
    clearTimeout(revealT); panel.classList.remove('shown');
    revealT = setTimeout(() => {
      panel.classList.add('shown');
      panel.querySelectorAll('.count').forEach(el => countUp(el));
      setTimeout(fit, 50);
    }, delay);
  }
  function countUp(el) {
    const to = +el.dataset.to, dp = +el.dataset.dp; if (reduce) { el.textContent = to.toFixed(dp); return; }
    const t0 = performance.now(), dur = 1100; const f = now => { const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = (to * e).toFixed(dp); if (p < 1) requestAnimationFrame(f); }; requestAnimationFrame(f);
  }

  /* ---------- navigation ---------- */
  let introT, swapT;
  const idx = id => SLIDES.findIndex(s => s.id === id);
  const endIntro = () => { clearTimeout(introT); stage.classList.remove('intro-on'); };
  function go(n, fromBack = false) {
    n = Math.max(0, Math.min(N - 1, n));
    if (n === cur) return;
    if (game) endGame();
    const prev = cur, s = SLIDES[n], changed = prev >= 0 && ART(SLIDES[prev]) !== ART(s);
    cur = n; step = -1;
    let wait = 260;
    const stopCh = prev >= 0 && SLIDES[prev].stop !== s.stop;
    if ((changed || stopCh) && !reduce) {
      const a = ART(SLIDES[prev]), b = ART(s), d = (n > prev) ? 1 : -1;
      const ty = a < 10 && b < 10 && Math.abs(b - a) === 1 ? EDGE[Math.min(a, b)] : (a >= 10 || b >= 10 ? 'pixel' : 'iris');
      if (changed) tr = { from: a, to: b, dir: d, t0: performance.now(), dur: ty === 'enter' ? 1900 : 1350, type: ty };
      const newStop = stopCh, ppl = newStop ? stopPeople(s.stop) : scenePeople(b, s.stop); const ty2 = changed ? ty : 'iris';
      intro.innerHTML = `${newStop && s.stop ? `<div class="i-big pix">0${s.stop}</div>` : ''}<div class="i-k pix">${stopNo(s.stop)}${s.stop ? ' of 06' : ''}</div><h2>${esc(newStop ? STOPS[s.stop].name : (ROOMS[b] || SCENES[b].name))}</h2><div class="i-cast${ppl.length > 6 ? ' many' : ''}">${ppl.map(([nm, role, tbc]) => `<div class="i-c"><span class="wa">${avatar(tbc ? '' : nm)}</span><b>${tbc ? esc(role) : esc(nm)}</b><em>${tbc ? 'squad lead' : esc(role)}</em></div>`).join('')}</div>`; if (newStop) confetti();
      stage.classList.add('intro-on'); clearTimeout(introT); introT = setTimeout(endIntro, ty2 === 'enter' ? 2300 : 1800);
      wait = ty2 === 'enter' ? 2400 : 1850;
    } else endIntro();
    if (!changed || reduce) { if (prev < 0 || ART(SLIDES[prev]) !== ART(s)) sceneT0 = performance.now(); }
    else sceneT0 = performance.now() + 99999;
    scene = ART(s);
    const dir = (prev < 0 || n > prev) ? 1 : -1; panel.style.setProperty('--dir', dir);
    const fx = s.cards ? 'flip' : s.type === 'dash' ? 'zoom' : s.lanes ? 'wipe' : (s.type === 'projects' || s.quests || s.type === 'collect' || s.type === 'matrix') ? 'zoom' : (s.nums && s.nums.length > 2) ? 'rise' : 'slide';
    const sqChanged = !changed && prev >= 0 && SQ(SLIDES[prev]) !== SQ(s) && s.type !== 'cover' && s.type !== 'close';
    if (sqChanged && !reduce) { baton(s, dir); wait = Math.max(wait, 950); }
    const put = () => { panel.classList.remove('fx-slide', 'fx-rise', 'fx-flip', 'fx-wipe', 'fx-zoom'); void panel.offsetWidth; panel.classList.add('fx-' + fx); panel.innerHTML = render(s); panel.classList.toggle('cover', s.type === 'cover' || s.type === 'close'); panel.classList.remove('focusing', 'shown'); fit(); panel.classList.remove('out'); };
    clearTimeout(swapT);
    if (prev < 0 || reduce) put(); else { panel.classList.add('out'); swapT = setTimeout(put, 200); }
    reveal(reduce ? 0 : (prev < 0 ? 300 : wait));
    stage.classList.toggle('is-cover', s.type === 'cover');
    { const nx = nextPresenter(n); plate.innerHTML = `<div class="pl-k pix"><i class="live"></i>${stopNo(s.stop)} · ${esc(STOPS[s.stop].name)} · Presenting now</div><div class="pl-p">${(s.who || []).map(person).join('')}</div>${nx ? `<button class="pl-n" data-jump="${nx.j}" title="Jump to their part"><span class="pix">Then</span><span class="wa">${avatar(nx.w[0])}</span><b>${esc(nx.w[0])}</b><em>${esc(nx.w[1])}</em></button>` : ''}`; }
    $('#lv').textContent = s.stop === 0 ? 'START' : `STOP 0${s.stop}/06`;
    $('#lvn').textContent = STOPS[s.stop].name;
    $('#cnt').textContent = `${n + 1}/${N}`;
    $('#bar').style.width = ((n + 1) / N * 100) + '%';
    $('#play').hidden = !Art.meta(ART(s)).sprite;
    hud.querySelectorAll('.node').forEach((b, i) => { b.classList.toggle('on', i === s.stop); b.classList.toggle('done', i < s.stop); });
    try { history.replaceState(null, '', '#' + s.id); } catch (e) { }
    if (reduce) paint(0);
    lastHit && setTimeout(markHits, (reduce ? 0 : wait) + 700);
  }
  function next() {
    if (stage.classList.contains('intro-on')) { endIntro(); reveal(0); return; }
    if (!panel.classList.contains('shown')) { reveal(0); return; }
    if (stepping) { const st = steps(); if (st.length > 1 && step < st.length - 1) { focusStep(step + 1); return; } }
    go(cur + 1);
  }
  function prev() {
    if (stage.classList.contains('intro-on')) endIntro();
    if (stepping && step >= 0) { focusStep(step - 1); return; }
    if (panel.classList.contains('focusing')) { clearFocus(); return; }
    go(cur - 1, true);
  }
  const togglePeek = () => { const on = stage.classList.toggle('peek'); $('#peek').setAttribute('aria-pressed', String(on)); if (on) { peekT0 = performance.now(); climbed = false; } };
  function toggleFlags() { const off = stage.classList.toggle('noflags'); const b = $('#fbtn'); b.setAttribute('aria-pressed', String(!off)); b.textContent = off ? 'Checks off' : 'Checks on'; fit(); }
  function toggleStepping() { stepping = !stepping; const b = $('#stepb'); b.setAttribute('aria-pressed', String(stepping)); b.textContent = stepping ? 'Spotlight on' : 'Spotlight off'; if (!stepping) { clearFocus(); step = -1; } }

  /* ---------- lightbox ---------- */
  let gi = 0;
  function showLb(i) { if (SLIDES[cur].type === 'report') gallery = [SLIDES[cur].shots[0]]; gi = (i + gallery.length) % gallery.length; const [src, cap] = gallery[gi]; $('img', lb).src = `img/${src}.webp`; $('img', lb).alt = cap; $('figcaption', lb).textContent = `${cap}  ·  ${gi + 1} of ${gallery.length}`; lb.hidden = false; $('#lbp').hidden = $('#lbx').hidden = gallery.length < 2; }
  lb.addEventListener('click', e => { if (e.target.closest('#lbp')) return showLb(gi - 1); if (e.target.closest('#lbx')) return showLb(gi + 1); lb.hidden = true; });


  /* ---------- squad baton: who is presenting now ---------- */
  const bat = document.createElement('div'); bat.className = 'baton'; bat.setAttribute('aria-hidden', 'true'); stage.appendChild(bat);
  let batT;
  function baton(s, dir) {
    const w = (s.who || [])[0], pw = (SLIDES[cur - dir] && (SLIDES[cur - dir].who || [])[0]) || null; bat.innerHTML = `<div class="bin"><span class="pix">Now presenting</span>${pw && !pw[2] && w && !w[2] && pw[0] !== w[0] ? `<span class="wa big">${avatar(pw[0])}</span><i class="hand">▶</i>` : ''}${w && !w[2] ? `<span class="wa big">${avatar(w[0])}</span>` : ''}<b>${esc(SQ(s))}</b>${w && !w[2] ? `<em>${esc(w[0])}</em>` : ''}</div>`;
    bat.style.setProperty('--dir', dir); bat.classList.remove('go'); void bat.offsetWidth; bat.classList.add('go'); clearTimeout(batT); batT = setTimeout(() => bat.classList.remove('go'), 1500);
  }

  /* ---------- up next ---------- */
  const upn = document.createElement('button'); upn.className = 'upn'; upn.type = 'button'; upn.title = 'Next (→)'; $('.nav').appendChild(upn); upn.onclick = () => next();
  let upTxt = '';
  function updNext() {
    let t;
    const st = panel.classList.contains('shown') && stepping ? steps() : [];
    if (st.length > 1 && step < st.length - 1) t = `<span class="pix">Next</span> part ${step + 2} of ${st.length}`;
    else if (cur < N - 1) { const x = SLIDES[cur + 1], nw = x.stop !== SLIDES[cur].stop; t = `<span class="pix">${nw ? 'Next stop' : 'Next'}</span> ${esc(nw ? STOPS[x.stop].name : SQ(x))}${!nw && (x.period || x.sub) ? ' · ' + esc(x.period || x.sub) : ''}`; }
    else t = '<span class="pix">The end</span> thank you';
    if (t !== upTxt) { upTxt = t; upn.innerHTML = t + ' <i>▶</i>'; upn.classList.remove('pulse'); void upn.offsetWidth; upn.classList.add('pulse'); }
  }
  setInterval(updNext, 200);

  /* ---------- progress ticks: one per stop ---------- */
  (() => { const b = $('.bar'); STOPS.forEach((sc, k) => { const i = SLIDES.findIndex(s => s.stop === k); if (i > 0) { const m = document.createElement('b'); m.style.left = (i / N * 100) + '%'; m.title = sc.name; b.appendChild(m); } }); })();

  /* ---------- overview (O) ---------- */
  const ov = document.createElement('div'); ov.className = 'ov'; ov.hidden = true; stage.appendChild(ov);
  function openOv() {
    const groups = STOPS.map((sc, k) => ({ k, sc, items: SLIDES.map((s, i) => [s, i]).filter(([s]) => s.stop === k) }));
    ov.innerHTML = `<div class="ovh"><h2 class="pix">The whole flow</h2><span>${N} slides · click to jump · Esc to close</span></div><div class="ovg">${groups.map(g => `<section><h3 class="pix">${g.k ? 'STOP 0' + g.k : 'START'} · ${esc(g.sc.name)}</h3><div>${g.items.map(([s, i]) => `<button class="ovt${i === cur ? ' on' : ''}" data-i="${i}" style="--d:${i}"><b>${esc(s.squad || s.title)}</b><span>${esc(s.period || s.sub || '')}</span><em>${i + 1}</em></button>`).join('')}</div></section>`).join('')}</div>`;
    ov.hidden = false; requestAnimationFrame(() => ov.classList.add('open')); const on = ov.querySelector('.ovt.on'); on && on.scrollIntoView({ block: 'center' });
  }
  const closeOv = () => { ov.classList.remove('open'); ov.hidden = true; };
  ov.addEventListener('click', e => { const b = e.target.closest('.ovt'); if (b) { closeOv(); go(+b.dataset.i); } else if (e.target === ov) closeOv(); });
  const ovb = document.createElement('button'); ovb.className = 'wide'; ovb.textContent = 'Overview'; ovb.title = 'All slides at a glance (O)'; $('.nav').insertBefore(ovb, $('#peek')); ovb.onclick = () => ov.hidden ? openOv() : closeOv();

  /* ---------- search (/) ---------- */
  const TXT = SLIDES.map(s => { const o = []; const w = x => { if (typeof x === 'string') o.push(x.split(' ¦ ')[0]); else if (Array.isArray(x)) x.forEach(w); else if (x && typeof x === 'object') Object.entries(x).forEach(([k, v]) => { if (!['id', 'icon', 'k', 'img', 'img2', 'go', 'type', 'view', 'shots', 'a', 'b', 'link'].includes(k)) w(v); }); }; w(s); return o.join(' · '); });
  const sr = document.createElement('div'); sr.className = 'sr'; sr.hidden = true; sr.innerHTML = '<div class="srb"><input type="search" placeholder="Search every slide… e.g. AtP, 65k, Juliet" aria-label="Search slides"><ul></ul><p class="pix">↑ ↓ choose · Enter jump · Esc close</p></div>'; stage.appendChild(sr);
  const sin = $('input', sr), sul = $('ul', sr); let sres = [], ssel = 0, lastHit = '';
  function doSearch() {
    const q = sin.value.trim(); sres = []; ssel = 0;
    if (q.length > 1) { const ql = q.toLowerCase(); TXT.forEach((t, i) => { const p = t.toLowerCase().indexOf(ql); if (p >= 0) sres.push([i, p]); }); }
    if (SECRETS[q.toLowerCase()]) { secret(q.toLowerCase()); if (q.toLowerCase() === 'horeca' || q.toLowerCase() === 'konami') makeRain(true); }
    sul.innerHTML = sres.slice(0, 7).map(([i, p], k) => { const t = TXT[i], a0 = Math.max(0, p - 40), q0 = sin.value.trim(); return `<li class="${k === ssel ? 'on' : ''}" data-i="${i}"><b>${esc(SLIDES[i].squad || SLIDES[i].title)}</b> <small>${esc(SLIDES[i].period || SLIDES[i].sub || '')}</small><span>${a0 ? '…' : ''}${esc(t.slice(a0, p))}<mark>${esc(t.substr(p, q0.length))}</mark>${esc(t.slice(p + q0.length, p + q0.length + 60))}…</span></li>`; }).join('') || (q.length > 1 ? '<li class="none">Nothing found</li>' : '');
  }
  sin.addEventListener('input', doSearch);
  sul.addEventListener('click', e => { const li = e.target.closest('li[data-i]'); if (li) jumpHit(+li.dataset.i); });
  function jumpHit(i) { lastHit = sin.value.trim(); sr.hidden = true; if (i === cur) markHits(); else go(i); }
  function markHits() {
    if (!lastHit) return; const q = lastHit.toLowerCase(); lastHit = '';
    const tw = document.createTreeWalker(panel, NodeFilter.SHOW_TEXT); const hits = []; let nd;
    while ((nd = tw.nextNode())) { const p = nd.nodeValue.toLowerCase().indexOf(q); if (p >= 0) hits.push([nd, p]); }
    hits.slice(0, 6).forEach(([nd, p]) => { const r = document.createRange(); r.setStart(nd, p); r.setEnd(nd, p + q.length); const m = document.createElement('mark'); m.className = 'hit'; try { r.surroundContents(m); } catch (e) { } });
    const first = panel.querySelector('mark.hit'); const host = first && first.closest('.step'); if (host) focusEls([host]);
    setTimeout(() => panel.querySelectorAll('mark.hit').forEach(m => m.classList.add('fade')), 3500);
  }
  const openSearch = () => { sr.hidden = false; sin.value = ''; sul.innerHTML = ''; setTimeout(() => sin.focus(), 0); };

  /* ---------- pacing timer (T) ---------- */
  const tm = document.createElement('div'); tm.className = 'tm pix'; tm.hidden = true; stage.appendChild(tm); let tm0 = 0, tmI;
  function tick() { const el = (Date.now() - tm0) / 1000, mm = Math.floor(el / 60), ss = Math.floor(el % 60), tf = el / (90 * 60), sf = (cur + 1) / N, ok = sf >= tf - .04; tm.innerHTML = `<span>⏱ ${mm}:${String(ss).padStart(2, '0')}</span><span>of 90 min</span><span class="pc ${ok ? 'ok' : 'late'}">${ok ? 'on pace' : 'speed up'}</span><i style="--t:${Math.min(100, tf * 100)};--s:${sf * 100}"></i>`; }
  function toggleTimer() { if (!tm0) tm0 = Date.now(); tm.hidden = !tm.hidden; clearInterval(tmI); if (!tm.hidden) { tick(); tmI = setInterval(tick, 1000); } }

  /* ---------- laser pointer (L) ---------- */
  const lz = document.createElement('div'); lz.className = 'lz'; lz.innerHTML = '<i></i><i></i><i></i><i></i><i></i>'; stage.appendChild(lz); let lzOn = false; const lzp = [];
  stage.addEventListener('pointermove', e => { if (!lzOn) return; const r = stage.getBoundingClientRect(); lzp.unshift([e.clientX - r.left, e.clientY - r.top]); lzp.length = 5; [...lz.children].forEach((d, k) => { const p = lzp[k] || lzp[0]; d.style.transform = `translate(${p[0]}px,${p[1]}px)`; }); });
  const toggleLaser = () => { lzOn = !lzOn; stage.classList.toggle('laser', lzOn); };


  /* ---------- pixel confetti on every new stop ---------- */
  const cf = document.createElement('canvas'); cf.className = 'cf'; cf.setAttribute('aria-hidden', 'true'); stage.appendChild(cf);
  let cfRaf = 0;
  function confetti() {
    if (reduce) return;
    const r = stage.getBoundingClientRect(); cf.width = r.width; cf.height = r.height; const c = cf.getContext('2d'), u = Math.max(5, r.width / 160);
    const cols = ['#FFB81C', '#FFD84A', '#003D7C', '#5AA2FF', '#FFFFFF', '#1F6FD1'], ps = [];
    for (let i = 0; i < 90; i++) ps.push({ x: r.width * (.15 + Math.random() * .7), y: r.height * .55, vx: (Math.random() - .5) * u * 1.7, vy: -(Math.random() * u * 1.9 + u * .6), s: Math.ceil(Math.random() * 2) * u * .55, c: cols[i % 6], l: 70 + Math.random() * 40 });
    let f = 0; cancelAnimationFrame(cfRaf);
    (function tick() { c.clearRect(0, 0, cf.width, cf.height); let live = 0; ps.forEach(p => { if (p.l-- <= 0) return; live++; p.vy += u * .075; p.x += p.vx; p.y += p.vy; c.globalAlpha = Math.min(1, p.l / 25); c.fillStyle = p.c; c.fillRect(Math.round(p.x / 3) * 3, Math.round(p.y / 3) * 3, p.s, p.s); }); if (live && ++f < 200) cfRaf = requestAnimationFrame(tick); else c.clearRect(0, 0, cf.width, cf.height); })();
  }

  /* ---------- cast: who presents what (P or W) ---------- */
  const cast = document.createElement('div'); cast.className = 'cast'; cast.hidden = true; stage.appendChild(cast);
  function openCast() {
    const m = new Map();
    SLIDES.forEach((s, i) => (s.who || []).forEach(w => { if (w[2]) return; let e = m.get(w[0]); if (!e) { e = { n: w[0], first: i, parts: new Map(), cnt: 0, stops: new Set() }; m.set(w[0], e); } e.cnt++; e.stops.add(s.stop); const lab = s.squad || (s.title || ''); if (s.stop > 0) e.parts.set(lab, 1); }));
    const list = [...m.values()].sort((x, y) => x.first - y.first), now = (SLIDES[cur].who || []).map(w => w[0]);
    cast.innerHTML = `<div class="ovh"><h2 class="pix">Who presents what</h2><span>${list.length} presenters · click a card to jump to their first slide · Esc to close</span></div><div class="cg2">${list.map((e, k) => `<button class="cc${now.includes(e.n) ? ' now' : ''}" data-i="${e.first}" style="--d:${k}"><span class="wa huge">${avatar(e.n)}</span><b>${esc(e.n)}</b><div class="cs">${[...e.stops].sort().filter(x => x > 0).map(x => `<i>0${x}</i>`).join('')}</div><span class="cp">${esc([...e.parts.keys()].slice(0, 5).join(' · ') || 'Opening')}</span>${now.includes(e.n) ? '<em class="pix">Now presenting</em>' : ''}</button>`).join('')}</div>`;
    cast.hidden = false; requestAnimationFrame(() => cast.classList.add('open'));
  }
  const closeCast = () => { cast.classList.remove('open'); setTimeout(() => { cast.hidden = true; }, 180); };
  cast.addEventListener('click', e => { const b = e.target.closest('.cc'); if (b) { closeCast(); go(+b.dataset.i); } else if (e.target === cast) closeCast(); });
  plate.addEventListener('click', e => { const j = e.target.closest('[data-jump]'); if (j) go(+j.dataset.jump); else if (e.target.closest('.av')) { const s = SLIDES[cur], w = (s.who || []).find(x => !x[2]); if (w) say(`${w[0]}: ${s.squad || s.title}`); } });
  plate.style.pointerEvents = 'auto';
  const cbtn = document.createElement('button'); cbtn.className = 'fbtn pix box cbtn'; cbtn.id = 'cbtn'; cbtn.textContent = 'Who’s who'; cbtn.title = 'See who presents what (P)'; cbtn.onclick = () => (cast.hidden ? openCast() : closeCast()); hud.querySelector('.right').prepend(cbtn);

  /* ---------- blackout (.) ---------- */
  const blk = document.createElement('div'); blk.className = 'blk'; blk.hidden = true; blk.innerHTML = '<div><b class="pix">LEVEL UP</b><span>Back in a moment</span></div>'; stage.appendChild(blk); blk.onclick = () => { blk.hidden = true; };

  /* ---------- single-letter shortcuts wait a beat, so typed secret words do not toggle things ---------- */
  let pendK = null, pendT = 0, lastLetter = 0;
  const SHORT = { f: () => toggleFlags(), v: () => togglePeek(), s: () => toggleStepping(), g: () => startGame(), o: () => ov.hidden ? openOv() : closeOv(), t: () => toggleTimer(), l: () => toggleLaser(), p: () => cast.hidden ? openCast() : closeCast(), w: () => cast.hidden ? openCast() : closeCast() };
  function queueShortcut(k) { const now = Date.now(), burst = now - lastLetter < 330; lastLetter = now; clearTimeout(pendT); if (burst) { pendK = null; return; } pendK = k; pendT = setTimeout(() => { if (pendK && SHORT[pendK]) SHORT[pendK](); pendK = null; }, 330); }

  /* ---------- input ---------- */
  addEventListener('keydown', e => {
    const k = e.key;
    if (!sr.hidden) { if (k === 'Escape') { sr.hidden = true; e.preventDefault(); } else if (k === 'ArrowDown' || k === 'ArrowUp') { ssel = Math.max(0, Math.min(Math.min(sres.length, 7) - 1, ssel + (k === 'ArrowDown' ? 1 : -1))); sul.querySelectorAll('li').forEach((li, j) => li.classList.toggle('on', j === ssel)); e.preventDefault(); } else if (k === 'Enter' && sres[ssel]) { jumpHit(sres[ssel][0]); e.preventDefault(); } return; }
    if (!cast.hidden) { if (['Escape', 'p', 'P', 'w', 'W'].includes(k)) closeCast(); e.preventDefault(); return; }
    if (!blk.hidden) { blk.hidden = true; e.preventDefault(); return; }
    if (!ov.hidden) { if (k === 'Escape' || k === 'o' || k === 'O') closeOv(); e.preventDefault(); return; }
    if (k === '/') { e.preventDefault(); openSearch(); return; }
    if (k === '.') { blk.hidden = false; return; }
    if (!lb.hidden) { if (k === 'ArrowRight') showLb(gi + 1); else if (k === 'ArrowLeft') showLb(gi - 1); else if (['Escape', ' ', 'Enter'].includes(k)) lb.hidden = true; e.preventDefault(); return; }
    if (game) { if (k === 'ArrowLeft') game.key = -1; else if (k === 'ArrowRight') game.key = 1; else if (k === 'Escape') endGame(); else if (k === 'g' || k === 'G') { endGame(); startGame(); } e.preventDefault(); return; }
    kbuf.push(k.length === 1 ? k.toLowerCase() : k); kbuf = kbuf.slice(-10); if (kbuf.join() === KONAMI.join()) { makeRain(true); secret('konami'); }
    if (k === '?') { help.hidden = !help.hidden; return; } if (!help.hidden && k === 'Escape') { help.hidden = true; return; }
    if (k.length === 1) { typed = (typed + k.toLowerCase()).slice(-8); for (const w of ['tareq', 'level', 'cart', 'fsd', 'tea', 'hbr']) if (word(w)) secret(w); if (typed.endsWith('horeca')) { makeRain(true); secret('horeca'); } if (typed.endsWith('metro')) { makeRain(false); secret('metro'); } }
    const fl = document.activeElement && document.activeElement.closest && document.activeElement.closest('.flipc, .card, li.go, .tick');
    if ((k === 'Enter') && fl) { fl.click(); e.preventDefault(); return; }
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(k)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0); else if (k === 'End') go(N - 1);
    else if (/^[a-z]$/i.test(k) && !e.ctrlKey && !e.metaKey && !e.altKey) queueShortcut(k.toLowerCase());
    else if (k >= '1' && k <= '7') { const b = panel.querySelectorAll('.key')[+k - 1]; if (b) focusKey(b.dataset.key); }
    else if (k === 'Escape') { if (panel.classList.contains('focusing')) { clearFocus(); step = -1; } else if (stage.classList.contains('peek')) togglePeek(); }
  });
  addEventListener('keyup', e => { if (game && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) game.key = 0; });
  let wl = 0;
  addEventListener('wheel', e => { if (!lb.hidden || game || Math.abs(e.deltaY) < 18) return; const t = Date.now(); if (t - wl < 800) return; wl = t; e.deltaY > 0 ? next() : prev(); }, { passive: true });
  let tx = null;
  addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  addEventListener('touchend', e => { if (tx == null || game) return; const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 45) d < 0 ? next() : prev(); tx = null; });
  stage.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width, ny = (e.clientY - r.top) / r.height;
    if (!reduce) { stage.style.setProperty('--px', (nx * 2 - 1).toFixed(3)); stage.style.setProperty('--py', (ny * 2 - 1).toFixed(3)); }
    if (game) game.tx = nx * W - 36;
  });
  cv.addEventListener('click', e => {
    if (game) return;
    const r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * W, y = (e.clientY - r.top) / r.height * H, m = Art.meta(scene);
    if (scene === 1 && x < 150 && y > 70 && y < 200) { sceneT0 = performance.now(); say('A new card, fresh off the press.'); return; }
    if (scene === 4 && x > 100 && x < 150 && y > 105 && y < 140) { sceneT0 = performance.now(); say('Tap. Paid. Next!'); return; }
    if ((scene === 2 || scene === 3 || scene === 8) && !(m.sprite && x > 44 && x < 130 && y > m.feet - 46)) { sceneT0 = performance.now(); return; }
    if (m.sprite && x > 44 && x < 130 && y > m.feet - 46 && y < m.feet + 4) say(QUOTES[qi++ % QUOTES.length]);
    else if (stage.classList.contains('peek')) togglePeek();
  });
  $('#next').onclick = next; $('#prev').onclick = prev; $('#peek').onclick = togglePeek; $('#stepb').onclick = toggleStepping;
  $('#play').onclick = () => game ? endGame() : startGame();
  hud.addEventListener('click', e => { const nd = e.target.closest('.node'); if (nd) go(SLIDES.findIndex(s => s.stop === +nd.dataset.scene)); if (e.target.closest('#fbtn')) toggleFlags(); });
  panel.addEventListener('click', e => {
    const key = e.target.closest('.key'); if (key) return focusKey(key.dataset.key);
    const g = e.target.closest('[data-go]'); if (g) return go(idx(g.dataset.go));
    const sc = e.target.closest('[data-scene]'); if (sc) return go(SLIDES.findIndex(s => s.stop === +sc.dataset.scene));
    const z = e.target.closest('[data-g]'); if (z) { showLb(+z.dataset.g); e.stopPropagation(); return; }
    const mc = e.target.closest('.mxc'); if (mc) { const on = !mc.classList.contains('on'); panel.querySelectorAll('.mxc').forEach(b => b.classList.remove('on')); panel.querySelector('.mx').classList.toggle('pick', on); panel.querySelectorAll('.mx td').forEach(td => td.classList.toggle('hl', on && td.dataset.col === mc.dataset.col)); mc.classList.toggle('on', on); return; }
    const tk = e.target.closest('.tick'); if (tk) { tk.classList.toggle('on'); return; }
    const stb = e.target.closest('.stb'); if (stb) { const on = !stb.classList.contains('on'); panel.querySelectorAll('.stb').forEach(b => b.classList.remove('on')); panel.querySelector('.ctrys').classList.toggle('pick', on); panel.querySelectorAll('.ctry').forEach(c => c.classList.toggle('hl', on && c.dataset.st === stb.dataset.st)); stb.classList.toggle('on', on); return; }
    if (e.target.closest('.ba')) return;
    const card = e.target.closest('.card'); if (card) { card.classList.toggle('turned'); return; }
    const f = e.target.closest('.flipc, .flipn, .kpi'); if (f) { f.classList.toggle('on'); return; }
    const st = e.target.closest('.step'); if (st) { if (st.classList.contains('lit') && panel.querySelectorAll('.lit').length === 1) { clearFocus(); step = -1; } else { focusEls([st]); step = steps().indexOf(st); } return; }
    if (!e.target.closest('a, button')) { clearFocus(); step = -1; }
  });

  let baDrag = null;
  const baSet = (el, e) => { const r = el.querySelector('.baw').getBoundingClientRect(); el.style.setProperty('--x', Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100)).toFixed(1)); };
  panel.addEventListener('pointerdown', e => { const el = e.target.closest('.ba'); if (!el || e.target.closest('.zoom')) return; baDrag = el; el.setPointerCapture(e.pointerId); baSet(el, e); el.classList.add('drag'); e.preventDefault(); });
  panel.addEventListener('pointermove', e => { if (baDrag) baSet(baDrag, e); });
  addEventListener('pointerup', () => { if (baDrag) baDrag.classList.remove('drag'); baDrag = null; });
  const fromHash = () => { const i = idx(location.hash.slice(1)); return i < 0 ? 0 : i; };
  addEventListener('hashchange', () => go(fromHash()));
  addEventListener('resize', fit);
  go(fromHash());
  if (document.fonts) document.fonts.ready.then(fit);
  if (reduce) paint(0); else requestAnimationFrame(loop);
  window.__lvl = { go, startGame, togglePeek, idx, next, focusKey };
})();
