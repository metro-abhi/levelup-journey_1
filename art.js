/* Pixel-art scenes, painted on a 480x270 canvas. Original artwork. */
const Art = (() => {
  const W = 480, H = 270;
  let c;
  const NAVY = '#003D7C', BLUE = '#1F6FD1', LB = '#5AA2FF', Y = '#FFB81C', Y2 = '#FFD84A', INK = '#0B2447', WH = '#FFFFFF';
  const SKIN = '#F2C9A5', GREY = '#AEB9C8', GREY2 = '#8A97AB', PALE = '#DCE4EE', GRN = '#18A96B';
  const PROD = ['#E5484D', '#FFB81C', '#2A6FD6', '#18A96B', '#FF8A3D', '#7A5AF8', '#F4F7FB', '#C98B45', '#D9A15F', '#35B8C9'];
  const R = (x, y, w, h, col) => { if (w <= 0 || h <= 0) return; c.fillStyle = col; c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); };
  const hs = (a, b = 0, d = 0) => { let n = Math.imul(a + 1 | 0, 374761393) ^ Math.imul(b + 7 | 0, 668265263) ^ Math.imul(d + 3 | 0, 1274126177); n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
  const rgb = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const mix = (a, b, t) => { const A = rgb(a), B = rgb(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`; };
  const circle = (cx, cy, r, col) => { for (let dy = -r; dy <= r; dy++) { const w = Math.round(Math.sqrt(r * r - dy * dy)); R(cx - w, cy + dy, 2 * w + 1, 1, col); } };
  const line = (x0, y0, x1, y1, col) => { const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) | 0 || 1; for (let i = 0; i <= n; i++) R(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n, 1, 1, col); };

  const G = { A: '010101111101101', B: '110101110101110', C: '011100100100011', D: '110101101101110', E: '111100110100111', F: '111100110100100', G: '011100101101011', H: '101101111101101', I: '111010010010111', J: '001001001101010', K: '101101110101101', L: '100100100100111', M: '101111111101101', N: '110101101101101', O: '010101101101010', P: '110101110100100', Q: '010101101111011', R: '110101110101101', S: '011100010001110', T: '111010010010010', U: '101101101101111', V: '101101101101010', W: '101101111111101', X: '101101010101101', Y: '101101010010010', Z: '111001010100111',
    0: '111101101101111', 1: '010110010010111', 2: '110001010100111', 3: '110001010001110', 4: '101101111001001', 5: '111100110001110', 6: '011100111101111', 7: '111001010010010', 8: '111101111101111', 9: '111101111001110',
    '%': '101001010100101', '+': '000010111010000', '-': '000000111000000', '.': '000000000000010', '/': '001001010100100', '!': '010010010000010', '>': '100010001010100', ':': '000010000010000' };
  const T = (s, x, y, col, k = 1) => { for (const ch of String(s)) { const g = G[ch]; if (g) for (let i = 0; i < 15; i++) if (g[i] === '1') R(x + (i % 3) * k, y + (i / 3 | 0) * k, k, k, col); x += 4 * k; } };

  /* ---------- shared props ---------- */
  function sky(h = 170, bands = ['#7CC4FF', '#93D0FF', '#ABDCFF', '#C4E7FF', '#DCF1FF', '#EEF8FF']) { bands.forEach((b, i) => R(0, Math.round(i * h / bands.length), W, Math.ceil(h / bands.length) + 1, b)); }
  function cloud(x, y, s = 1) { R(x + 6 * s, y, 12 * s, 4 * s, WH); R(x + 2 * s, y + 3 * s, 22 * s, 5 * s, WH); R(x, y + 6 * s, 28 * s, 4 * s, WH); R(x + 2 * s, y + 9 * s, 24 * s, 1 * s, '#DCEEFF'); R(x + 14 * s, y - 2 * s, 6 * s, 3 * s, WH); }
  function skyline(y, col, seed, hmax = 30) { for (let x = 0, i = 0; x < W; i++) { const w = 10 + hs(seed, i) * 22 | 0, h = 8 + hs(i, seed) * hmax | 0; R(x, y - h, w, h, col); if (hs(i, 3, seed) > .6) R(x + 2, y - h - 4, w / 3, 4, col); x += w + (hs(i, 9, seed) * 6 | 0); } }
  function glass(x, y, w, h, o = {}) {
    R(x, y, w, h, '#9AD4FF'); R(x, y, w, h * .22, '#B6E1FF'); R(x, y + h * .6, w, h * .4, '#86C8F8');
    if (o.inside) o.inside();
    c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.fillStyle = 'rgba(255,255,255,.4)';
    for (let b = -h; b < w; b += o.gap || 52) for (let yy = 0; yy < h; yy++) { c.fillRect(Math.round(x + b + (h - yy) * .7), y + yy, 8, 1); c.fillRect(Math.round(x + b + 13 + (h - yy) * .7), y + yy, 3, 1); }
    c.restore();
    const mc = o.mc || '#0B4DA2';
    for (let mx = x; mx < x + w; mx += o.mw || 20) R(mx, y, 1, h, mc);
    R(x + w - 1, y, 1, h, mc); R(x, y, w, 1, mc); R(x, y + h - 1, w, 1, mc); (o.hz || []).forEach(v => R(x, y + v, w, 1, mc));
  }
  function rack(x, y, w, h, seed, lv = 4, bw = 28) {
    R(x, y, w, h, '#D3DEEB'); const lh = h / lv;
    for (let b = 0; b * bw < w; b++) for (let l = 0; l < lv; l++) {
      let px = x + b * bw + 3; const bot = Math.round(y + (l + 1) * lh) - 2, end = Math.min(x + (b + 1) * bw - 1, x + w);
      while (px < end - 3) {
        const bwid = 5 + (hs(seed + b, l, px) * 6 | 0), bh = Math.max(3, (lh - 5) * (.5 + .5 * hs(px, l, seed)) | 0), ww = Math.min(bwid, end - px);
        const col = PROD[hs(b + seed, px, l) * PROD.length | 0];
        R(px, bot - bh, ww, bh, col); R(px, bot - bh, ww, 1, 'rgba(255,255,255,.5)'); R(px + ww - 1, bot - bh, 1, bh, 'rgba(0,0,0,.16)'); px += bwid + 1;
      }
      R(x + b * bw, bot, Math.min(bw, x + w - x - b * bw), 2, '#FF8A3D');
    }
    for (let b = 0; b * bw <= w; b++) R(Math.min(x + b * bw, x + w - 2), y, 2, h, NAVY);
  }
  function hall(ch = 24) {
    R(0, 0, W, ch, '#E9EFF6'); R(0, ch - 5, W, 3, '#B8C5D6'); R(0, ch - 12, W, 1, '#C9D3DF');
    for (let x = 0; x < W; x += 24) { line(x, ch - 12, x + 12, ch - 5, '#C9D3DF'); line(x + 12, ch - 5, x + 24, ch - 12, '#C9D3DF'); }
    for (let x = 30; x < W; x += 96) { R(x + 10, ch - 2, 1, 4, GREY2); R(x, ch + 2, 22, 3, '#FFF6C9'); R(x - 2, ch + 5, 26, 1, 'rgba(255,246,201,.6)'); }
  }
  function floor(y, col = '#E3E9F0') {
    R(0, y, W, H - y, col); R(0, y, W, 2, '#CBD5E1');
    [10, 26, 50, 84].forEach(d => R(0, y + d, W, 1, '#D3DBE6'));
    for (let x = -40; x < W + 40; x += 34) line(x + 17, y, x + (x - 240) * .25, H, '#D3DBE6');
    for (let x = 40; x < W; x += 96) { R(x, y + 3, 14, H, 'rgba(255,255,255,.35)'); R(x + 4, y + 3, 5, H, 'rgba(255,255,255,.35)'); }
  }
  function person(x, y, body, hair = '#3A2A1E') { R(x + 2, y - 20, 5, 5, SKIN); R(x + 2, y - 21, 5, 2, hair); R(x + 1, y - 15, 7, 8, body); R(x, y - 14, 1, 6, body); R(x + 8, y - 14, 1, 6, body); R(x + 2, y - 7, 2, 7, '#23324A'); R(x + 5, y - 7, 2, 7, '#23324A'); }
  function cart(x, y) { R(x, y - 12, 10, 7, '#C9D3DF'); R(x, y - 12, 10, 1, GREY2); R(x + 3, y - 12, 1, 7, GREY2); R(x + 6, y - 12, 1, 7, GREY2); R(x + 10, y - 15, 2, 4, Y); R(x + 1, y - 5, 8, 1, GREY2); R(x + 1, y - 3, 2, 2, INK); R(x + 7, y - 3, 2, 2, INK); }
  function tree(x, y, s = 1) { R(x - 1, y - 10 * s, 3, 10 * s, '#9A6B3A'); circle(x, y - 17 * s, 9 * s, '#2F9E50'); circle(x - 2 * s, y - 19 * s, 6 * s, '#4DBB66'); circle(x - 3 * s, y - 21 * s, 2 * s, '#8BE07A'); }
  function boxes(x, y, cols, rows, seed, bw = 10, bh = 8) { R(x - 1, y, cols * bw + 2, 3, '#C98B45'); R(x + 1, y + 3, 3, 2, '#9A6B3A'); R(x + cols * bw - 4, y + 3, 3, 2, '#9A6B3A'); for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { if (j === rows - 1 && hs(i, seed, 5) > .7) continue; const col = PROD[hs(seed, i, j) * PROD.length | 0]; R(x + i * bw, y - (j + 1) * bh, bw - 1, bh - 1, col); R(x + i * bw, y - (j + 1) * bh, bw - 1, 1, 'rgba(255,255,255,.5)'); R(x + i * bw + bw - 2, y - (j + 1) * bh, 1, bh - 1, 'rgba(0,0,0,.15)'); } }
  function flag(x, y, col, t, w = 14) { const f = Math.floor(t * 4) % 2; for (let i = 0; i < w; i++) R(x + 1 + i, y + ((i + f * 2) % 4 < 2 ? 0 : 1), 1, 8, col); }
  function plate(x, y, s, bg = NAVY, fg = Y2, k = 1, pad = 3) { const w = String(s).length * 4 * k - k + pad * 2; R(x, y, w, 5 * k + pad * 2, bg); T(s, x + pad, y + pad, fg, k); return w; }

  /* ---------- customer sprite: a chef with a flatbed trolley ---------- */
  const SP = { W: WH, w: PALE, S: SKIN, s: '#D9A27C', K: '#3A2A1E', E: INK, B: NAVY, Y: Y, P: '#23324A', G: INK };
  const BODY = ['....WWWWWW......', '...WWWWWWWW.....', '...WWWWWWWw.....', '....WWWWWw......', '....KSSSSS......', '....KSSESS......', '....SSSSSS......', '.....SSSs.......', '...WWWWWWWW.....', '..WWWWBBWWWw....', '..WWWBBBBWWSS...', '..WWWBYYBWwSSS..', '..WWWBBBBWw.....', '...WWBBBBw......', '...BBBBBBB......', '...PPPPPPP......'];
  const LEGS = [['...PPP.PPP......', '...PPP.PPP......', '...PPP.PPP......', '..GGGG.GGGG.....'], ['..PPPP..PPP.....', '.PPP.....PPP....', '.PP.......PP....', 'GGG.......GGG...'], ['....PPPPP.......', '....PPPP........', '....PPPP........', '...GGGGG........']];
  function trolley(tx, feet, bob, w, load) {
    R(tx - 2, feet - 20 + bob / 2, 2, 14, GREY2); R(tx - 4, feet - 21 + bob / 2, 6, 2, INK);
    R(tx - 2, feet - 8, 40, 3, BLUE); R(tx - 2, feet - 8, 40, 1, LB);
    R(tx + 1, feet - 5, 5, 5, INK); R(tx + 2 + w, feet - 4, 2, 2, GREY); R(tx + 30, feet - 5, 5, 5, INK); R(tx + 31 + w, feet - 4, 2, 2, GREY);
    if (load < 2) return;
    R(tx + 2, feet - 20, 14, 12, '#D9A15F'); R(tx + 2, feet - 20, 14, 1, '#EBC48E'); R(tx + 8, feet - 20, 2, 12, '#C98B45');
    R(tx + 17, feet - 24, 12, 16, '#C98B45'); R(tx + 17, feet - 24, 12, 1, '#E0A866'); R(tx + 20, feet - 18, 6, 4, WH);
    R(tx + 30, feet - 16, 7, 8, Y); R(tx + 30, feet - 16, 7, 1, Y2);
    R(tx + 3, feet - 29, 12, 9, GRN); R(tx + 3, feet - 29, 12, 1, '#6EE0A8'); R(tx + 5, feet - 31, 3, 3, '#E5484D'); R(tx + 9, feet - 32, 3, 4, '#FF8A3D'); R(tx + 12, feet - 31, 2, 3, '#E5484D');
  }
  function sprite(ctx, x, feet, fr = 0, flip = false, load = 2) {
    c = ctx; c.save();
    if (flip) { c.translate(2 * x + 70, 0); c.scale(-1, 1); }
    const bob = fr === 2 ? -2 : 0, rows = BODY.concat(LEGS[fr]);
    R(x + 2, feet, load ? 68 : 32, 2, 'rgba(11,36,71,.22)');
    rows.forEach((r, j) => { const yy = feet - 40 + j * 2 + (j < 16 ? bob : 0); for (let i = 0; i < 16; i++) if (r[i] !== '.') R(x + i * 2, yy, 2, 2, SP[r[i]]); });
    if (load) trolley(x + 30, feet, bob, fr === 1 ? 1 : 0, load);
    c.restore();
  }

  /* ---------- the digital customer card ---------- */
  let cardBuf;
  function cardCanvas() {
    if (cardBuf) return cardBuf;
    cardBuf = document.createElement('canvas'); cardBuf.width = 108; cardBuf.height = 66; const keep = c; c = cardBuf.getContext('2d');
    R(0, 0, 108, 66, WH); R(0, 0, 108, 17, NAVY); T('METRO', 5, 4, Y2, 2); T('CUSTOMER CARD', 52, 6, LB, 1); R(0, 64, 108, 2, Y);
    R(6, 22, 15, 11, Y); R(6, 27, 15, 1, '#D99B12'); R(13, 22, 1, 11, '#D99B12');
    T('LE PETIT BISTRO', 6, 39, INK, 1); T('HORECA', 6, 47, BLUE, 1); T('2311 1964 0809', 6, 55, GREY2, 1);
    R(78, 22, 24, 24, WH); for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) if (hs(i, j, 64) > .5 || (i < 2 && j < 2) || (i > 5 && j < 2) || (i < 2 && j > 5)) R(78 + i * 3, 22 + j * 3, 3, 3, INK);
    c = keep; return cardBuf;
  }
  const clamp = v => Math.max(0, Math.min(1, v));
  /* card in hand: built at the desk, then carried */
  function joinSeq(st) {
    const cb = cardCanvas(), x0 = 28, y0 = 92;
    if (st < 3.3) {
      const p1 = clamp(st / 1.1), p2 = clamp((st - 1.1) / 1.3);
      c.save(); c.globalAlpha = .9; R(x0 + 3, y0 + 3, 108, 66 * p1, 'rgba(11,36,71,.25)'); c.restore();
      if (p2 <= 0) { R(x0, y0, 108, Math.round(66 * p1), '#EAF3FF'); for (let y = y0; y < y0 + 66 * p1; y += 3) R(x0, y, 108, 1, '#CFE4FF'); R(x0, y0 + Math.round(66 * p1) - 1, 108, 2, LB); }
      else { const h = [17, 34, 42, 50, 58, 66][Math.min(5, Math.floor(p2 * 6))]; R(x0, y0, 108, 66, '#EAF3FF'); c.drawImage(cb, 0, 0, 108, h, x0, y0, 108, h); }
      R(x0 - 1, y0 - 1, 110, 1, NAVY); R(x0 - 1, y0 + 66, 110, 1, NAVY); R(x0 - 1, y0, 1, 66, NAVY); R(x0 + 108, y0, 1, 66, NAVY);
      if (st > 2.4) { const k = Math.min(1, (st - 2.4) / .25); const sz = Math.round(18 + 10 * (1 - k)); circle(x0 + 96, y0 + 8, sz / 2, GRN); line(x0 + 90, y0 + 8, x0 + 94, y0 + 12, WH); line(x0 + 94, y0 + 12, x0 + 102, y0 + 3, WH); line(x0 + 90, y0 + 9, x0 + 94, y0 + 13, WH); line(x0 + 94, y0 + 13, x0 + 102, y0 + 4, WH); if (k >= 1) plate(x0 + 34, y0 - 14, 'VERIFIED', GRN, WH, 1, 3); }
      if (st < 1.2) T('CREATING YOUR CARD', x0 + 10, y0 + 76, NAVY, 1);
    } else if (st < 4.3) {
      const p = (st - 3.3), e = p * p * (3 - 2 * p), tx = 84, ty = 214, s = 1 - .82 * e;
      c.drawImage(cb, Math.round(x0 + (tx - x0) * e), Math.round(y0 + (ty - y0) * e - Math.sin(e * Math.PI) * 30), Math.round(108 * s), Math.round(66 * s));
    }
  }
  const cartAt = (i, st) => i >= 10 ? 2 : i === 1 ? (st > 5.4 ? 1 : 0) : i === 2 ? (st > 2.3 ? 2 : 1) : ({ 0: 0, 2: 1, 4: 2, 5: 2, 6: 0, 7: 0, 8: 0, 9: 0 })[i] ?? 2;

  /* ---------- scenes ---------- */
  const S = [];

  /* 0 Arrival: the wholesale store from outside */
  S[0] = { sprite: true, feet: 246, base() {
    sky(170); cloud(210, 14, 1); cloud(330, 30, 2); cloud(10, 4, 1); circle(440, 30, 13, '#FFF6C9'); circle(440, 30, 9, '#FFFBE6');
    skyline(190, '#C2DCF4', 4);
    R(0, 196, W, 74, '#66758B'); R(0, 196, W, 2, '#56647A'); R(0, 190, W, 6, PALE); R(0, 190, W, 1, WH);
    for (let i = 0; i < 9; i++) R(70 + i * 11, 199, 7, 34, '#F4F7FB');
    for (let i = 0; i < 7; i++) R(216 + i * 38, 216, 2, 44, '#E8EEF5');
    R(0, 262, W, 2, '#E8EEF5');
    R(14, 66, 400, 126, '#F1F5FA'); for (let x = 26; x < 414; x += 12) R(x, 80, 1, 104, '#DFE7F0'); R(14, 184, 400, 8, '#C9D3DF');
    R(10, 58, 408, 17, NAVY); R(10, 58, 408, 2, '#1F5AA8'); R(10, 75, 408, 3, Y); R(10, 78, 408, 1, '#D99B12');
    T('WHOLESALE', 234, 62, WH, 2); T('FOR PROFESSIONALS', 318, 65, LB, 1);
    R(26, 18, 122, 42, NAVY); R(26, 18, 122, 2, '#1F5AA8'); R(26, 56, 122, 2, Y); T('METRO', 40, 27, Y2, 5); R(44, 60, 3, 2, GREY2); R(126, 60, 3, 2, GREY2);
    glass(36, 98, 160, 86, { mw: 20, hz: [30], inside() { for (let i = 0; i < 5; i++) { R(42 + i * 30, 140, 22, 40, '#6FB4EA'); R(42 + i * 30, 152, 22, 1, '#9AD4FF'); R(42 + i * 30, 166, 22, 1, '#9AD4FF'); } R(36, 176, 160, 8, '#B6E1FF'); } });
    R(30, 90, 172, 7, Y); R(30, 97, 172, 2, '#D99B12'); R(30, 90, 172, 1, Y2);
    R(96, 132, 40, 52, '#CDEBFF'); R(96, 132, 40, 1, NAVY); R(96, 132, 1, 52, NAVY); R(135, 132, 1, 52, NAVY); plate(94, 118, 'WELCOME', NAVY, WH, 1, 4);
    glass(212, 98, 190, 18, { mw: 19 });
    [[216, '1'], [262, '2']].forEach(([x, n]) => { R(x, 132, 40, 52, GREY); for (let y = 136; y < 184; y += 4) R(x, y, 40, 1, GREY2); R(x - 2, 130, 44, 3, INK); R(x + 16, 122, 9, 9, Y); T(n, x + 19, 124, NAVY, 1); R(x - 3, 176, 3, 8, Y); R(x + 40, 176, 3, 8, Y); });
    R(306, 146, 102, 48, WH); R(306, 146, 102, 2, PALE); R(306, 184, 102, 4, BLUE); R(306, 188, 102, 6, '#C9D3DF'); T('DELIVERY', 318, 158, NAVY, 2); R(318, 172, 64, 2, Y);
    R(408, 158, 30, 36, BLUE); R(408, 158, 30, 2, LB); R(420, 163, 15, 12, '#BFE6FF'); R(420, 163, 15, 1, WH); R(436, 184, 4, 4, Y2); R(404, 190, 38, 4, INK);
    [[322, 198], [338, 198], [420, 198]].forEach(([x, y]) => { circle(x, y, 6, INK); circle(x, y, 2, GREY); });
    R(150, 206, 58, 3, NAVY); R(152, 209, 2, 22, GREY2); R(204, 209, 2, 22, GREY2); for (let i = 0; i < 6; i++) cart(156 + i * 7, 232);
    tree(8, 192, 1); tree(206, 192, .8); R(196, 186, 22, 6, '#C9D3DF');
    [448, 458, 468].forEach(x => { R(x, 96, 1, 96, PALE); R(x - 1, 94, 3, 2, Y); });
    R(250, 150, 2, 46, GREY2); R(244, 148, 14, 3, GREY2); R(244, 151, 5, 2, '#FFF6C9');
  }, anim(t) { flag(448, 98, BLUE, t); flag(458, 98, Y, t + .2); flag(468, 98, WH, t + .4, 11); const o = Math.round((Math.sin(t * .8) * .5 + .5) * 8); R(116 - o, 133, 1, 51, NAVY); R(116 + o, 133, 1, 51, NAVY); if (Math.floor(t * 2) % 2) R(436, 184, 4, 4, '#FF8A3D'); } };

  /* 1 Join: customer service desk and entrance gates */
  S[1] = { sprite: true, feet: 250, seq: 5.6, base() {
    glass(0, 22, W, 122, { mw: 40, hz: [56], gap: 70, inside() { cloud(60, 34, 2); cloud(300, 46, 2); cloud(200, 28, 1); R(0, 122, W, 22, '#A8DE8A'); skyline(124, '#C2DCF4', 7, 22); tree(250, 142, 1); tree(420, 142, 1.1); } });
    hall(24);
    R(0, 144, W, 26, '#F1F5FA'); R(0, 144, W, 4, NAVY); R(0, 148, W, 2, Y); floor(170);
    R(14, 70, 140, 76, NAVY); R(14, 70, 140, 2, '#1F5AA8'); R(14, 144, 140, 2, Y); T('CUSTOMER', 26, 80, WH, 3); T('SERVICE', 26, 100, Y2, 3); T('NEW CUSTOMERS WELCOME', 26, 122, LB, 1);
    R(56, 128, 12, 11, SKIN); R(56, 126, 12, 4, '#3A2A1E'); R(52, 139, 20, 14, GRN); R(60, 139, 4, 6, WH);
    R(100, 132, 24, 17, INK); R(102, 134, 20, 13, '#BFE6FF'); R(104, 137, 10, 1, BLUE); R(104, 140, 14, 1, BLUE); R(110, 149, 4, 4, GREY2);
    R(8, 152, 152, 6, WH); R(8, 158, 152, 1, PALE); R(12, 159, 144, 40, BLUE); R(12, 176, 144, 4, Y); R(12, 195, 144, 4, '#0B4DA2'); for (let x = 30; x < 150; x += 30) R(x, 159, 1, 40, '#195FB8');
    R(170, 150, 50, 26, WH); R(170, 150, 50, 2, NAVY); R(170, 174, 50, 2, NAVY); R(170, 150, 2, 26, NAVY); R(218, 150, 2, 26, NAVY); T('JOIN', 176, 155, NAVY, 2); T('HERE >', 178, 167, BLUE, 1); R(194, 176, 2, 22, GREY2); R(186, 198, 18, 2, GREY2);
    R(240, 52, 1, 14, GREY2); R(338, 52, 1, 14, GREY2); R(232, 64, 116, 20, NAVY); R(232, 82, 116, 2, Y); T('ENTRANCE', 244, 69, Y2, 3);
    [244, 290, 336].forEach(x => { R(x, 164, 12, 36, '#C9D3DF'); R(x, 164, 12, 2, WH); R(x - 1, 160, 14, 5, NAVY); R(x + 10, 170, 2, 30, GREY); if (x < 336) { R(x + 12, 172, 34, 20, 'rgba(154,212,255,.55)'); R(x + 12, 172, 34, 1, WH); } });
    for (let i = 0; i < 12; i++) cart(372 + i * 8, 200); R(366, 178, 108, 2, Y); R(366, 180, 2, 20, GREY2); R(472, 180, 2, 20, GREY2);
    person(402, 196, BLUE); person(444, 198, '#E5484D', '#7A4A00');
  }, anim(t, st = 9) {
    joinSeq(st);
    if (st > 4.3 && st < 5.4) { const p = (st - 4.3) / 1.1, x = Math.round(240 - (240 - 82) * (1 - Math.pow(1 - p, 3))); trolley(x, 250, 0, Math.floor(t * 8) % 2, 1); }
    [244, 290, 336].forEach((gx, i) => R(gx + 4, 167, 4, 4, Math.floor(t * 2 + i) % 3 ? '#6EF0A8' : GRN));
  } };

  /* 2 Discover: the promo hall */
  S[2] = { sprite: true, feet: 250, seq: 3.3, base() {
    rack(0, 26, W, 126, 21, 5, 32); R(0, 26, W, 126, 'rgba(233,242,251,.5)');
    hall(26); for (let i = 0; i < 4; i++) glass(36 + i * 112, 3, 72, 9, { mw: 18 });
    floor(152); R(0, 214, W, 2, Y);
    for (let x = 8; x < W; x += 16) { const col = [Y, BLUE, WH][(x / 16 | 0) % 3]; for (let k = 0; k < 6; k++) R(x + k, 26 + k, 12 - 2 * k, 1, col); }
    R(44, 0, 1, 34, GREY2); R(142, 0, 1, 34, GREY2); R(18, 34, 150, 84, INK); R(18, 34, 150, 2, '#33435A'); R(22, 38, 142, 76, BLUE);
    boxes(196, 204, 7, 5, 3, 11, 9); R(214, 142, 40, 16, Y); R(212, 144, 44, 12, Y); T('-20%', 220, 147, NAVY, 2);
    boxes(300, 208, 6, 4, 8, 12, 10); R(318, 152, 32, 14, '#E5484D'); T('NEW', 323, 155, WH, 2);
    boxes(400, 202, 6, 6, 5, 11, 8); R(416, 136, 38, 14, NAVY); T('BULK', 420, 139, Y2, 2);
    R(118, 166, 40, 46, WH); R(118, 166, 40, 1, PALE); R(118, 158, 40, 9, Y); T('CATALOGUE', 120, 160, NAVY, 1);
    for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) { R(121 + i * 9, 170 + j * 14, 7, 10, PROD[(i + j * 3) % 6]); R(122 + i * 9, 172 + j * 14, 5, 2, WH); } R(118, 212, 40, 3, GREY2);
    person(276, 212, GRN); person(380, 214, '#7A5AF8', '#7A4A00');
  }, anim(t, st = 9) {
    if (st > 1 && st < 2.3) { const p = (st - 1) / 1.3; [[230, 150, '#E5484D'], [330, 158, GRN], [420, 146, Y]].forEach(([sx, sy, col], k) => { const q = clamp(p * 1.6 - k * .3); if (q <= 0 || q >= 1) return; const x = sx + (100 - sx) * q, y = sy + (226 - sy) * q - Math.sin(q * Math.PI) * 40; R(x, y, 9, 8, col); R(x, y, 9, 1, 'rgba(255,255,255,.6)'); }); }
    if (st > 2.3 && st < 3.3) T('+3 ITEMS', 92, 196 - Math.round((st - 2.3) * 10), GRN, 1);

    const k = Math.floor(t / 2.4) % 3, x = 22, y = 38;
    if (k === 0) { R(x, y, 142, 76, Y); T('OFFERS', x + 12, y + 12, NAVY, 5); T('OF THE WEEK', x + 14, y + 44, NAVY, 2); R(x + 14, y + 60, 60, 3, NAVY); }
    else if (k === 1) { R(x, y, 142, 76, BLUE); T('NEW IN', x + 10, y + 10, WH, 4); R(x + 96, y + 10, 34, 40, Y); R(x + 96, y + 10, 34, 3, Y2); R(x + 104, y + 22, 18, 10, WH); T('FRESH EVERY DAY', x + 10, y + 40, Y2, 2); T('ORDER ONLINE', x + 10, y + 58, WH, 2); }
    else { R(x, y, 142, 76, '#F4F7FB'); for (let i = 0; i < 3; i++) { R(x + 8 + i * 44, y + 8, 38, 44, WH); R(x + 8 + i * 44, y + 8, 38, 1, PALE); R(x + 16 + i * 44, y + 14, 22, 18, PROD[i * 2]); R(x + 12 + i * 44, y + 38, 20, 2, GREY); R(x + 12 + i * 44, y + 44, 12, 3, NAVY); } R(x + 30, y + 58, 82, 12, Math.floor(t * 2) % 2 ? NAVY : BLUE); T('ADD TO CART', x + 50, y + 62, Y2, 1); }
    for (let yy = y; yy < y + 76; yy += 4) R(x, yy, 142, 1, 'rgba(255,255,255,.08)');
  } };

  /* 3 Find & choose: first-person view down the aisle */
  function aisle() {
    const vx = 200, g = 14;
    R(0, 0, W, H, '#E7EDF4');
    for (const tx of [-260, -70, 110, 290, 470, 700]) { for (let k = 0; k < 4; k++) line(vx, 96, tx + k * 1.5, 0, k === 1 || k === 2 ? WH : '#FFF3C4'); }
    for (const d of [18, 26, 40, 62, 98, 150]) { const y = 96 - (d - 14) * .74; R(vx - d, y, 2 * d, d > 60 ? 2 : 1, '#B8C5D6'); }
    for (let y = 138; y < H; y++) { const d = 14 + (y - 138) / .59; R(vx - d, y, 2 * d, 1, mix('#F4F7FB', '#D9E1EA', (y - 138) / 132)); R(vx - d * .14, y, d * .28, 1, 'rgba(255,255,255,.55)'); }
    for (const d of [18, 24, 34, 50, 76, 120, 190]) R(vx - d, 138 + (d - 14) * .59, 2 * d, 1, '#C3CEDB');
    for (let x = 0; x < W; x++) {
      const side = x >= vx ? 1 : 0, d = side ? x - vx + 1 : vx - x; if (d <= g) continue;
      const top = 96 - (d - g) * .74, bot = 138 + (d - g) * .59, u = 200 / d, bu = u * 2.4 + side * .5, bay = Math.floor(bu), fr = bu - bay, f = Math.min(.72, (u - 1) / 9);
      if (fr < .07) { R(x, top, 1, bot - top, mix(NAVY, '#CFE6FB', f)); }
      else {
        const sub = Math.floor(fr * 3), sf = fr * 3 - sub; let y0 = Math.max(0, Math.floor(top));
        for (let y = y0; y < bot; y++) {
          const v = (y - top) / (bot - top) * 5, lv = Math.floor(v), fv = v - lv; let col;
          if (fv > .93) col = '#FF8A3D';
          else { const hh = .12 + .45 * hs(bay, lv, sub + side * 9); col = fv < hh ? '#C5D2E3' : PROD[hs(bay + side * 31, lv, sub) * PROD.length | 0]; if (fv >= hh) { if (sf < .1) col = mix(col, '#FFFFFF', .45); else if (sf > .9) col = mix(col, '#000000', .2); else if (fv - hh < .05) col = mix(col, '#FFFFFF', .35); } }
          R(x, y, 1, 1, f > .02 ? mix(col, '#CFE6FB', f) : col);
        }
      }
      R(x, bot, 1, Math.max(1, 3 / u), Y);
    }
    R(vx - g, 96, 2 * g, 42, '#BFE4FF'); R(vx - g, 96, 2 * g, 3, NAVY); R(vx - g, 99, 2 * g, 1, Y); for (let x = vx - g; x <= vx + g; x += 7) R(x, 100, 1, 38, '#8DBFE8'); R(vx - g, 128, 2 * g, 10, '#DCEBF8'); R(vx - 6, 124, 5, 12, '#7FAFDD'); R(vx + 3, 126, 4, 10, '#7FAFDD');
    R(196, 70, 1, 10, GREY2); R(212, 70, 1, 10, GREY2); R(190, 80, 30, 10, NAVY); T('04', 200, 82, Y2, 1);
    R(98, 0, 1, 26, GREY2); R(176, 0, 1, 26, GREY2); R(86, 26, 104, 26, NAVY); R(86, 26, 104, 2, '#1F5AA8'); R(86, 50, 104, 2, Y); T('AISLE 03', 96, 33, Y2, 3);
    R(10, 150, 44, 16, Y); R(10, 150, 44, 1, Y2); T('FRESH', 14, 153, NAVY, 2); R(8, 150, 2, 16, '#D99B12');
  }
  function povCart() {
    R(186, 200, 34, 30, '#D9A15F'); R(186, 200, 34, 2, '#EBC48E'); R(200, 200, 4, 30, '#C98B45'); R(222, 192, 30, 40, '#E5484D'); R(222, 192, 30, 2, '#F28B8E'); R(228, 204, 18, 8, WH);
    R(254, 204, 26, 28, GRN); R(254, 204, 26, 2, '#6EE0A8'); R(258, 198, 6, 6, '#FF8A3D'); R(266, 196, 6, 8, '#E5484D'); R(282, 208, 18, 24, Y); R(282, 208, 18, 2, Y2);
    for (let i = 0; i <= 8; i++) line(176 + i * 16, 206, 150 + i * 22.5, 250, '#EEF2F7');
    [[206, 176, 304], [218, 169, 311], [231, 161, 319], [243, 154, 326]].forEach(([y, a, b]) => R(a, y, b - a, 1, '#EEF2F7'));
    R(174, 204, 132, 3, GREY); R(174, 204, 132, 1, WH);
    R(138, 250, 204, 8, BLUE); R(138, 250, 204, 2, LB); R(138, 257, 204, 1, NAVY); R(150, 249, 36, 10, INK); R(294, 249, 36, 10, INK);
    R(152, 242, 32, 13, SKIN); R(152, 242, 32, 2, '#F9DCC0'); [160, 168, 176].forEach(x => R(x, 244, 1, 9, '#D9A27C')); R(142, 255, 56, 15, WH); R(142, 255, 56, 2, PALE);
    R(296, 242, 32, 13, SKIN); R(296, 242, 32, 2, '#F9DCC0'); [304, 312, 320].forEach(x => R(x, 244, 1, 9, '#D9A27C')); R(282, 255, 56, 15, WH); R(282, 255, 56, 2, PALE);
  }
  S[3] = { pov: true, seq: 3.2, base() { aisle(); povCart(); }, anim(t, st = 9) {
    if (st > .8 && st < 1.8) { const on = Math.floor(st * 6) % 2; if (on) { R(318, 118, 22, 3, Y); R(318, 141, 22, 3, Y); R(318, 118, 3, 26, Y); R(337, 118, 3, 26, Y); } }
    if (st > 1.8 && st < 2.7) { const q = (st - 1.8) / .9, x = 322 + (236 - 322) * q, y = 122 + (196 - 122) * q - Math.sin(q * Math.PI) * 30; R(x, y, 14, 18, '#7A5AF8'); R(x, y, 14, 2, '#B9A7FF'); R(x + 3, y + 6, 8, 5, WH); }
    if (st > 2.7 && st < 3.6) { T('+1', 246, 186 - Math.round((st - 2.7) * 12), GRN, 2); R(232, 188, 14, 16, '#7A5AF8'); }
    if (st > 2.7) { R(232, 188, 14, 16, '#7A5AF8'); R(232, 188, 14, 2, '#B9A7FF'); }

    const k = Math.floor(t * 1.5) % 4, x = 60, y = 96; R(x, y, 64, 18, WH); R(x, y, 64, 1, NAVY); R(x, y + 17, 64, 1, NAVY); R(x, y, 1, 18, NAVY); R(x + 63, y, 1, 18, NAVY);
    circle(x + 9, y + 8, 5, 'rgba(0,0,0,0)'); circle(x + 9, y + 8, 5, Y); circle(x + 9, y + 8, 3, WH); line(x + 13, y + 12, x + 16, y + 15, Y);
    T('SEARCH'.slice(0, 3 + k), x + 20, y + 4, NAVY, 2); if (k < 3) R(x + 20 + (3 + k) * 8, y + 4, 2, 10, BLUE);
  } };

  /* 4 Order, pay, receive: checkout and the loading dock */
  S[4] = { sprite: true, feet: 252, seq: 3.6, base() {
    rack(0, 24, 236, 134, 12, 5, 30); R(0, 24, 236, 134, 'rgba(233,242,251,.45)');
    R(236, 24, 244, 134, '#F1F5FA'); for (let x = 248; x < W; x += 14) R(x, 24, 1, 134, '#E1E8F1'); R(236, 150, 244, 8, '#C9D3DF');
    hall(24);
    R(304, 52, 136, 106, '#9FD3FF'); R(304, 110, 136, 48, '#C4E7FF'); cloud(312, 60, 1);
    R(322, 64, 104, 94, WH); R(322, 64, 104, 3, PALE); R(328, 70, 92, 88, '#34455E'); R(328, 142, 92, 16, GREY2); R(328, 70, 92, 3, '#22314A');
    boxes(334, 142, 4, 5, 2, 10, 9); boxes(380, 142, 3, 3, 6, 11, 10);
    R(298, 44, 148, 9, GREY); for (let y = 46; y < 53; y += 2) R(298, y, 148, 1, GREY2);
    for (let i = 0; i < 13; i++) { R(298, 53 + i * 8, 6, 8, i % 2 ? INK : Y); R(440, 53 + i * 8, 6, 8, i % 2 ? Y : INK); }
    R(316, 26, 112, 16, NAVY); R(316, 40, 112, 2, Y); T('DELIVERY', 324, 29, Y2, 3);
    floor(158); for (let x = 292; x < 456; x += 8) { R(x, 160, 4, 3, Y); R(x + 4, 160, 4, 3, INK); }
    R(40, 30, 1, 14, GREY2); R(136, 30, 1, 14, GREY2); R(22, 44, 132, 22, NAVY); R(22, 64, 132, 2, Y); T('CHECKOUT', 30, 50, Y2, 3); R(130, 48, 18, 14, GRN); T('1', 136, 51, WH, 2);
    R(122, 128, 3, 48, GREY2); R(106, 112, 36, 24, INK); R(108, 114, 32, 20, '#12A06A');
    R(14, 176, 146, 6, WH); R(14, 182, 146, 1, PALE); R(18, 183, 138, 36, BLUE); R(18, 198, 138, 4, Y); R(18, 215, 138, 4, '#0B4DA2'); R(22, 170, 78, 6, '#34455E'); R(146, 168, 9, 9, INK); R(148, 170, 5, 3, LB);
    R(30, 158, 12, 12, '#D9A15F'); R(46, 154, 10, 16, '#E5484D'); R(60, 160, 14, 10, GRN);
    R(172, 204, 150, 4, GREY2); R(172, 204, 150, 1, PALE); for (let x = 176; x < 320; x += 6) R(x, 205, 3, 2, WH); [180, 240, 310].forEach(x => R(x, 208, 3, 22, GREY2));
    boxes(214, 246, 5, 3, 9, 11, 10); R(208, 214, 66, 30, 'rgba(255,255,255,.22)'); R(212, 218, 2, 24, 'rgba(255,255,255,.5)');
    R(276, 240, 30, 4, Y); R(302, 214, 4, 30, Y); R(298, 212, 12, 3, INK); circle(282, 247, 3, INK); circle(304, 247, 3, INK);
    person(452, 232, GRN); R(454, 219, 5, 1, Y);
  }, anim(t, st = 9) {
    for (let x = 22 + Math.floor(t * 8) % 8; x < 98; x += 8) R(x, 171, 3, 4, '#55677F');
    const cb = cardCanvas();
    if (st < 1.6) { R(108, 114, 32, 20, '#1F6FD1'); T('TAP', 113, 117, WH, 2); T('CARD', 112, 127, Y2, 1); const e = clamp((st - .3) / 1.1); c.drawImage(cb, Math.round(84 + (112 - 84) * e), Math.round(214 + (126 - 214) * e - Math.sin(e * Math.PI) * 24), 22, 14); }
    else if (Math.floor(t * 1.2) % 4) { line(116, 124, 121, 129, WH); line(121, 129, 132, 118, WH); line(116, 125, 121, 130, WH); line(121, 130, 132, 119, WH); } else T('PAID', 109, 119, WH, 2);
    if (st > 1.8) { const h = Math.min(30, Math.round((st - 1.8) * 18)); R(147, 177 - 2, 7, h, WH); for (let y = 179; y < 175 + h; y += 3) R(148, y, 5, 1, GREY); }
    for (let i = 0; i < 3; i++) { const x = 172 + ((t * 22 + i * 52) % 150); R(x, 192, 14, 12, i % 2 ? '#C98B45' : '#D9A15F'); R(x, 192, 14, 1, '#EBC48E'); R(x + 6, 192, 2, 12, '#A8763A'); }
    R(294, 36, 6, 6, Math.floor(t * 3) % 2 ? '#FF8A3D' : '#B55A1C'); R(444, 36, 6, 6, Math.floor(t * 3) % 2 ? '#B55A1C' : '#FF8A3D');
  } };

  /* 5 In the customer's pocket: first-person view of the app */
  let aisleBuf;
  S[5] = { pov: true, base() {
    if (!aisleBuf) { aisleBuf = document.createElement('canvas'); aisleBuf.width = W; aisleBuf.height = H; const keep = c; c = aisleBuf.getContext('2d'); aisle(); c = keep; }
    c.imageSmoothingEnabled = false; c.drawImage(aisleBuf, 40, 20, 330, 186, 0, 0, W, H); R(0, 0, W, H, 'rgba(236,245,255,.55)');
    R(46, 232, 106, 38, WH); R(46, 232, 106, 3, PALE); R(60, 236, 2, 34, PALE);
    [118, 142, 166, 190].forEach(y => { R(34, y, 16, 18, SKIN); R(34, y, 16, 2, '#F9DCC0'); R(34, y + 17, 16, 1, '#D9A27C'); });
    R(50, 22, 96, 228, INK); R(48, 24, 100, 224, INK); R(50, 22, 96, 1, '#33435A'); R(53, 30, 90, 212, WH); R(86, 25, 24, 3, '#33435A');
    R(53, 30, 90, 20, NAVY); T('METRO', 58, 36, Y2, 2); R(126, 36, 8, 7, Y); R(128, 34, 4, 2, Y); R(129, 43, 2, 2, Y);
    R(57, 54, 82, 11, '#EEF2F7'); circle(63, 59, 3, GREY2); circle(63, 59, 1, '#EEF2F7'); T('SEARCH 80.000', 70, 57, GREY2, 1);
    T('FOR YOUR KITCHEN', 57, 108, INK, 1);
    [[57, 116, 0], [100, 116, 3], [57, 158, 4], [100, 158, 2]].forEach(([x, y, p], i) => { R(x, y, 39, 38, WH); R(x, y, 39, 1, PALE); R(x, y + 37, 39, 1, PALE); R(x, y, 1, 38, PALE); R(x + 38, y, 1, 38, PALE); R(x + 8, y + 4, 22, 16, PROD[p]); R(x + 8, y + 4, 22, 2, 'rgba(255,255,255,.5)'); T(['4.99', '12.50', '7.20', '2.89'][i], x + 4, y + 24, INK, 1); circle(x + 32, y + 31, 4, BLUE); R(x + 30, y + 31, 5, 1, WH); R(x + 32, y + 29, 1, 5, WH); R(x + 4, y + 31, 4, 4, GRN); });
    R(57, 200, 82, 20, '#EAF3FF'); R(57, 200, 3, 20, BLUE); T('ORDER READY', 64, 203, NAVY, 1); T('PICK UP TODAY', 64, 211, BLUE, 1);
    R(53, 224, 90, 18, WH); R(53, 224, 90, 1, PALE); for (let i = 0; i < 5; i++) { R(61 + i * 17, 229, 8, 8, i === 0 ? BLUE : '#C9D3DF'); } R(58, 239, 14, 1, BLUE);
    R(140, 150, 16, 46, SKIN); R(140, 150, 16, 2, '#F9DCC0'); R(154, 152, 2, 42, '#D9A27C'); R(142, 154, 8, 6, '#F9DCC0');
    [[176, 60, 'AVAILABILITY', GRN], [196, 108, 'STORE LISTS', BLUE], [176, 156, 'RE-ORDER', '#FF8A3D'], [196, 204, 'OFFERS', '#E5484D']].forEach(([x, y, s, col]) => { R(x + 2, y + 2, 136, 30, 'rgba(11,36,71,.15)'); R(x, y, 136, 30, WH); R(x, y, 136, 2, NAVY); R(x, y + 28, 136, 2, NAVY); R(x, y, 2, 30, NAVY); R(x + 134, y, 2, 30, NAVY); R(x + 8, y + 8, 14, 14, col); R(x + 8, y + 8, 14, 2, 'rgba(255,255,255,.5)'); T(s, x + 30, y + 10, NAVY, 2); });
  }, anim(t) {
    const k = Math.floor(t / 2.2) % 2; R(57, 68, 82, 34, k ? BLUE : Y); if (k) { T('ORDER BY', 62, 73, WH, 2); T('12', 130, 73, Y2, 1); T('DELIVERED TOMORROW', 62, 88, Y2, 1); } else { T('-20%', 62, 73, NAVY, 3); T('FRESH FISH THIS WEEK', 59, 93, NAVY, 1); }
    if (Math.floor(t * 2) % 2) circle(135, 35, 2, '#E5484D');
    const p = (t % 5) / 5; if (p < .6) { const y = 32 + Math.min(1, p * 8) * 6 - 6 * (p > .5 ? (p - .5) * 10 : 0); R(56, y, 84, 16, INK); R(56, y, 84, 1, LB); R(60, y + 4, 8, 8, Y); T('ORDER IS READY', 72, y + 6, WH, 1); }
  } };

  /* 6 Beyond the shop: the campus */
  S[6] = { sprite: true, feet: 250, base() {
    sky(196); cloud(160, 20, 2); cloud(360, 50, 1); cloud(280, 10, 1); skyline(196, '#C2DCF4', 2, 40);
    R(0, 196, W, 74, '#E8EDF4'); R(0, 196, W, 2, '#CBD5E1'); for (let y = 206; y < H; y += 12) R(0, y, W, 1, '#D5DDE8'); for (let x = -60; x < W + 60; x += 30) line(x + 15, 196, x + (x - 240) * .3, H, '#D5DDE8');
    R(0, 214, W, 3, '#A8DE8A'); R(0, 217, W, 1, '#7CC96B');
    R(28, 28, 98, 168, '#9AD4FF'); for (let j = 0; j < 21; j++) for (let i = 0; i < 9; i++) { const r = hs(i, j, 4), col = j < 5 && i > 2 && i < 8 && hs(j, i) > .3 ? '#E9F6FF' : ['#7FC2F5', '#9AD4FF', '#B4E0FF', '#6FB4EA'][r * 4 | 0]; R(30 + i * 10.6, 30 + j * 8, 10, 7, col); R(30 + i * 10.6, 30 + j * 8, 10, 1, 'rgba(255,255,255,.4)'); }
    for (let i = 0; i <= 9; i++) R(28 + i * 10.6, 28, 2, 168, '#0B4DA2'); for (let j = 0; j <= 21; j += 3) R(28, 28 + j * 8, 98, 1, '#0B4DA2');
    R(24, 20, 106, 9, NAVY); R(24, 20, 106, 1, '#1F5AA8'); R(40, 40, 74, 21, NAVY); R(40, 59, 74, 2, Y); T('METRO', 48, 43, Y2, 3);
    R(54, 172, 46, 5, Y); R(58, 177, 38, 19, '#CDEBFF'); R(76, 177, 2, 19, NAVY);
    R(138, 104, 196, 92, '#F1F5FA'); R(138, 104, 196, 4, NAVY); R(138, 108, 196, 2, Y); glass(144, 116, 184, 16, { mw: 23 }); glass(144, 138, 184, 16, { mw: 23 }); glass(144, 166, 60, 30, { mw: 20 }); glass(268, 166, 60, 30, { mw: 20 });
    R(204, 160, 64, 36, Y); R(204, 160, 64, 2, Y2); R(204, 194, 64, 2, '#D99B12'); T('CAREERS', 210, 166, NAVY, 2); T('JOIN THE TEAM', 210, 180, NAVY, 1); T('80.000 GOAL', 214, 187, BLUE, 1);
    R(346, 138, 120, 58, '#F1F5FA'); R(346, 138, 120, 3, BLUE); glass(352, 150, 108, 46, { mw: 27, hz: [22] }); R(372, 126, 68, 13, BLUE); T('STORIES', 378, 129, WH, 2);
    tree(134, 198, 1); tree(338, 198, 1.1); tree(472, 198, .9); tree(4, 198, .9);
    [150, 160, 170].forEach(x => { R(x, 62, 1, 44, PALE); R(x - 1, 60, 3, 2, Y); });
    person(230, 216, BLUE); person(244, 218, '#E5484D', '#7A4A00'); person(300, 214, GRN); person(410, 220, '#7A5AF8'); person(424, 218, Y, '#111');
    R(360, 228, 60, 8, '#C9D3DF'); R(360, 228, 60, 2, WH); R(364, 230, 52, 4, '#9AD4FF');
  }, anim(t) { flag(150, 64, BLUE, t, 8); flag(160, 64, Y, t + .2, 8); flag(170, 64, WH, t + .4, 8);
    for (let i = 0; i < 7; i++) { const p = (t * .9 + i / 7) % 1; R(390 + (i - 3) * 3 * p * 2, 228 - Math.sin(p * Math.PI) * 18, 2, 2, i % 2 ? WH : '#BFE6FF'); }
    const g = Math.floor(t * 1.5) % 21; R(30, 30 + g * 8, 96, 2, 'rgba(255,255,255,.5)');
  } };

  /* 7 The engine room: under the shop floor */
  const gear = (x, y, r, fr, col) => { circle(x, y, r, col); for (let i = 0; i < 8; i++) { const a = (i + fr * .5) * Math.PI / 4; R(x + Math.cos(a) * (r + 1) - 1, y + Math.sin(a) * (r + 1) - 1, 3, 3, col); } circle(x, y, r * .45, INK); circle(x, y, 1, col); };
  S[7] = { sprite: true, feet: 264, base() {
    R(0, 0, W, 62, '#E9F2FB'); rack(0, 8, W, 54, 33, 3, 26); R(0, 8, W, 54, 'rgba(233,242,251,.3)'); person(120, 62, WH); cart(132, 62); person(330, 62, GRN); cart(310, 62);
    R(0, 62, W, 12, GREY); R(0, 62, W, 2, PALE); R(0, 72, W, 2, GREY2); for (let x = 0; x < W; x += 12) line(x, 73, x + 6, 66, '#9CA8BA');
    R(0, 74, W, 196, '#EEF4FB'); for (let x = 0; x < W; x += 16) R(x, 74, 1, 172, '#E1EAF5'); for (let y = 90; y < 246; y += 16) R(0, y, W, 1, '#E1EAF5');
    R(0, 246, W, 24, '#C9D3DF'); R(0, 246, W, 2, GREY); for (let x = 0; x < W; x += 20) R(x, 256, 10, 1, '#B8C4D4');
    R(0, 92, W, 5, GREY2); R(0, 92, W, 1, PALE); for (let x = 6; x < W; x += 18) R(x, 97, 2, 3, GREY2);
    plate(16, 108, 'PLATFORM', NAVY, Y2, 2, 4);
    for (let i = 0; i < 4; i++) { const x = 14 + i * 36; R(x, 128, 32, 118, '#12305E'); R(x, 128, 32, 2, '#2A5DA8'); R(x + 30, 128, 2, 118, '#0A2250'); for (let j = 0; j < 12; j++) { R(x + 3, 134 + j * 9, 25, 6, '#0A2250'); R(x + 4, 135 + j * 9, 12, 1, '#1B4A94'); } R(x + 12 + i, 97, 2, 31, [BLUE, Y, GRN, LB][i]); R(x + 18, 97, 2, 31, [Y, GRN, BLUE, Y][i]); }
    [[190, 'API', BLUE, WH, 'EVALUATE'], [286, 'AUTH', Y, NAVY, 'ENTRA ID'], [382, 'DATA', '#12A06A', WH, 'POSTGRES']].forEach(([x, s, col, fg, sub]) => { R(x, 138, 78, 54, col); R(x, 138, 78, 3, 'rgba(255,255,255,.45)'); R(x + 74, 138, 4, 54, 'rgba(0,0,0,.18)'); R(x, 188, 78, 4, 'rgba(0,0,0,.18)'); T(s, x + 8, 148, fg, 4); T(sub, x + 8, 176, fg, 1); R(x + 8, 192, 4, 26, GREY2); R(x + 66, 192, 4, 26, GREY2); R(x + 36, 74, 6, 64, col); R(x + 36, 74, 2, 64, 'rgba(255,255,255,.4)'); R(x + 32, 132, 14, 6, GREY2); });
    R(158, 162, 32, 5, BLUE); R(268, 162, 18, 5, Y); R(364, 162, 18, 5, '#12A06A');
    R(170, 222, 300, 5, GREY2); R(170, 222, 300, 1, PALE); for (let x = 176; x < 470; x += 30) R(x, 227, 3, 19, GREY2);
    R(404, 100, 64, 30, INK); R(406, 102, 60, 26, '#0E3B2A'); T('99.9%', 412, 105, '#6EF0A8', 2);
  }, anim(t) {
    const fr = Math.floor(t * 4) % 2; gear(180, 222, 7, fr, Y); gear(276, 222, 7, 1 - fr, Y); gear(372, 222, 7, fr, Y); gear(466, 222, 7, 1 - fr, Y);
    for (let i = 0; i < 6; i++) { const x = 186 + ((t * 30 + i * 47) % 276); R(x, 214, 8, 8, [LB, Y2, '#6EF0A8'][i % 3]); R(x, 214, 8, 2, WH); }
    for (let i = 0; i < 4; i++) for (let j = 0; j < 12; j++) { const on = hs(i, j, Math.floor(t * 3)) > .45; R(14 + i * 36 + 22, 136 + j * 9, 2, 2, on ? ['#6EF0A8', Y2, LB][(i + j) % 3] : '#1B4A94'); R(14 + i * 36 + 25, 136 + j * 9, 2, 2, hs(j, i, Math.floor(t * 2)) > .6 ? '#6EF0A8' : '#1B4A94'); }
    [226, 322, 418].forEach((x, i) => { const y = 132 - ((t * 26 + i * 20) % 58); R(x, y, 6, 4, WH); });
    for (let x = 0; x < 56; x += 2) R(408 + x, 122 - Math.round(Math.abs(Math.sin((x + t * 20) * .3)) * (x % 14 < 4 ? 5 : 1)), 2, 1, '#6EF0A8');
  } };

  /* 8 One platform: the overworld map */
  const NODES = [[62, 84, 'CZ', GRN], [150, 70, 'SK', GRN], [70, 168, 'AT', Y]];
  const DOTS = [[30, 50], [112, 34], [196, 110], [150, 190], [232, 60], [262, 150], [300, 96], [334, 176], [362, 70], [400, 130], [432, 86], [270, 210], [206, 40], [420, 190], [330, 40], [386, 214], [460, 150]];
  S[8] = { seq: 3, base() {
    R(0, 0, W, H, '#8FD0FF'); for (let i = 0; i < 90; i++) R(hs(i, 1) * W, hs(i, 2) * H, 5, 1, '#B6E1FF');
    const land = [[14, 36, 210, 160], [50, 18, 150, 30], [190, 60, 130, 124], [290, 46, 130, 140], [400, 60, 70, 110], [110, 180, 200, 44], [30, 180, 70, 36], [350, 170, 80, 56], [240, 26, 90, 40]];
    land.forEach(([x, y, w, h]) => { R(x - 3, y - 3, w + 6, h + 6, '#F7EFC8'); R(x - 5, y + 2, w + 10, h - 4, '#F7EFC8'); });
    land.forEach(([x, y, w, h]) => { R(x, y, w, h, '#A8DE8A'); R(x - 2, y + 4, w + 4, h - 8, '#A8DE8A'); });
    for (let i = 0; i < 60; i++) { const x = 20 + hs(i, 5) * 430, y = 30 + hs(i, 6) * 180; if (land.some(([a, b, w, h]) => x > a + 6 && x < a + w - 12 && y > b + 6 && y < b + h - 10)) { if (i % 3) { R(x, y, 8, 3, '#B9E79E'); } else { circle(x, y, 3, '#5DBB63'); R(x, y + 3, 1, 3, '#9A6B3A'); } } }
    const hub = [112, 122];
    const path = (a, b) => { const n = Math.hypot(b[0] - a[0], b[1] - a[1]) / 5 | 0; for (let i = 0; i <= n; i++) { const x = a[0] + (b[0] - a[0]) * i / n, y = a[1] + (b[1] - a[1]) * i / n; R(x - 1, y - 1, 3, 3, i % 2 ? Y : '#D99B12'); } };
    NODES.forEach(n => path(hub, n)); let prev = hub; [...DOTS].sort((a, b) => a[0] - b[0]).forEach((d, i) => { if (d[0] > 120) { if (i % 2 === 0) path(prev, d); prev = d; } });
    DOTS.forEach(([x, y]) => { R(x - 4, y - 4, 9, 9, NAVY); R(x - 3, y - 3, 7, 7, LB); R(x - 3, y - 3, 7, 2, WH); });
    R(hub[0] - 20, hub[1] - 14, 40, 26, '#F1F5FA'); R(hub[0] - 22, hub[1] - 18, 44, 7, NAVY); R(hub[0] - 22, hub[1] - 11, 44, 2, Y); R(hub[0] - 12, hub[1] - 4, 24, 16, '#9AD4FF'); R(hub[0], hub[1] - 4, 1, 16, NAVY); R(hub[0] - 22, hub[1] + 12, 44, 3, GREY);
    plate(hub[0] - 8, hub[1] + 17, 'ONE PLATFORM', NAVY, Y2, 1, 3);
    NODES.forEach(([x, y, s, col]) => { R(x - 15, y - 9, 32, 21, 'rgba(11,36,71,.25)'); R(x - 17, y - 11, 32, 21, NAVY); R(x - 15, y - 9, 28, 17, WH); T(s, x - 9, y - 6, NAVY, 2); R(x + 9, y - 26, 1, 16, INK); });
    R(8, 200, 124, 38, WH); R(8, 200, 124, 2, NAVY); R(8, 236, 124, 2, NAVY); R(8, 200, 2, 38, NAVY); R(130, 200, 2, 38, NAVY);
    R(14, 206, 7, 7, GRN); T('MOVED TO THE PLATFORM', 26, 207, INK, 1); R(14, 216, 7, 7, Y); T('ROLLING OUT TO APR 2027', 26, 217, INK, 1); R(14, 226, 7, 7, LB); T('COMPANION: 20 COUNTRIES', 26, 227, INK, 1);
    circle(446, 232, 14, WH); circle(446, 232, 12, '#EAF3FF'); R(445, 220, 3, 24, NAVY); R(434, 231, 24, 3, NAVY); T('N', 445, 211, NAVY, 1); R(445, 220, 3, 8, '#E5484D');
  }, anim(t, st = 9) {
    NODES.forEach(([x, y, s, col], i) => { if (st > .6 + i * .7) { flag(x + 9, y - 26, col, t + i * .3, 10); const k = st - .6 - i * .7; if (k < .5) { const r = Math.round(6 + k * 40); for (let a = 0; a < 8; a++) R(x - 1 + Math.cos(a * .785) * r, y + Math.sin(a * .785) * r, 3, 3, col); } } else R(x + 9, y - 26, 1, 16, '#F7EFC8'); });
    const b = Math.round(Math.abs(Math.sin(t * 3)) * 5); const [x, y] = NODES[2]; R(x - 6, y - 26 - b, 9, 9, '#E5484D'); R(x - 4, y - 24 - b, 5, 5, WH); R(x - 3, y - 17 - b, 3, 3, '#E5484D'); R(x - 2, y - 14 - b, 1, 2, '#E5484D');
    const sx = 330 + Math.sin(t * .3) * 60; R(sx, 238, 16, 5, '#9A6B3A'); R(sx + 2, 243, 12, 2, '#7A4A00'); R(sx + 7, 224, 1, 14, INK); R(sx + 8, 226, 7, 9, WH); R(sx - 6 - Math.floor(t * 3) % 3, 244, 5, 1, WH);
    for (let i = 0; i < 12; i++) if (hs(i, Math.floor(t * 1.5)) > .5) R(hs(i, 77) * W, 4 + hs(i, 78) * 14 + (i % 2) * 244, 6, 1, WH);
  } };

  /* 9 Next steps: the climb from the roof */
  S[9] = { sprite: true, feet: 256, base() {
    sky(180, ['#8ECBFF', '#A6D8FF', '#C0E5FF', '#DCF1FF', '#FFF6D6', '#FFE9A8']);
    circle(318, 150, 52, '#FFE27A'); circle(318, 150, 42, '#FFF0A8'); circle(318, 150, 30, '#FFFBE6');
    cloud(40, 30, 2); cloud(390, 26, 1); cloud(200, 60, 1);
    skyline(180, '#A9CBEA', 5, 46); skyline(184, '#8DB8E2', 9, 24);
    R(0, 184, W, 86, PALE); R(0, 176, W, 8, NAVY); R(0, 176, W, 1, '#1F5AA8'); R(0, 184, W, 2, Y);
    for (let y = 198; y < H; y += 14) R(0, y, W, 1, '#CBD5E1'); for (let x = 0; x < W; x += 40) R(x, 186, 1, 84, '#D3DBE6');
    glass(176, 214, 70, 14, { mw: 14 }); glass(270, 214, 70, 14, { mw: 14 }); glass(364, 214, 70, 14, { mw: 14 });
    R(196, 240, 34, 18, GREY); R(196, 240, 34, 2, WH); for (let x = 200; x < 228; x += 4) R(x, 245, 2, 10, GREY2); R(400, 238, 26, 20, GREY); R(400, 238, 26, 2, WH); circle(413, 248, 6, GREY2); circle(413, 248, 2, PALE);
    for (let i = 0; i < 6; i++) { const x = 150 + i * 46, top = 162 - i * 22; R(x, top, 46, 176 - top, Y); R(x, top, 46, 5, Y2); R(x + 42, top, 4, 176 - top, '#D99B12'); for (let y = top + 12; y < 176; y += 10) R(x, y, 42, 1, '#F0A500'); }
    T('HBR1', 156, 150, NAVY, 2); T('OCT-MAR', 202, 132, NAVY, 1); T('HBR2', 294, 84, NAVY, 2); T('APR-SEP', 340, 66, NAVY, 1); T('FY27', 386, 40, NAVY, 2);
    R(440, 4, 2, 48, PALE); R(438, 2, 6, 3, Y);
    R(34, 196, 3, 56, '#9A6B3A'); [['BASICS >', 198, NAVY, Y2], ['QUESTS >', 212, BLUE, WH], ['ASKS >', 226, Y, NAVY]].forEach(([s, y, bg, fg]) => plate(16, y, s, bg, fg, 1, 3));
  }, anim(t) { flag(442, 6, NAVY, t, 24); R(448, 9, 4, 3, Y2);
    for (let i = 0; i < 6; i++) { const x = 168 + i * 46, y = 146 - i * 22 + Math.round(Math.sin(t * 3 + i) * 2), s = Math.abs(Math.sin(t * 2 + i * .7)); const w = Math.max(1, Math.round(s * 4)); R(x + 4 - w, y - 8, w * 2, 8, Y2); R(x + 4 - w, y - 8, Math.max(1, w), 8, WH); R(x + 4 - w, y - 9, w * 2, 1, '#D99B12'); R(x + 4 - w, y, w * 2, 1, '#D99B12'); }
    if (Math.floor(t * 2) % 2) for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; R(318 + Math.cos(a) * 60, 150 + Math.sin(a) * 60, 3, 3, '#FFF6C9'); }
  } };


  /* small in-jokes for wholesale people */
  const EGG = {
    0() { R(138, 150, 36, 11, Y); T('EST 1964', 141, 153, NAVY, 1); R(344, 189, 40, 7, WH); T('D US 2311', 346, 190, INK, 1); },
    1() { [['HORECA', 244], ['TRADER', 290]].forEach(([s, x]) => { R(x + 14, 152, 30, 8, Y); T(s, x + 17, 154, NAVY, 1); }); },
    2() { R(404, 216, 56, 9, WH); T('MISE EN PLACE', 406, 218, NAVY, 1); R(22, 120, 64, 8, INK); T('NET PRICES ONLY', 24, 122, Y2, 1); },
    4() { R(24, 142, 22, 12, WH); R(24, 142, 22, 13, WH); T('TABLE', 25, 143, INK, 1); T('12', 31, 149, '#E5484D', 1); R(224, 222, 27, 8, WH); T('HORECA', 226, 224, NAVY, 1); },
    6() { R(280, 172, 40, 18, WH); T('OUI', 286, 175, NAVY, 2); T('CHEF!', 290, 184, '#E5484D', 1); },
    7() { T('CHERRY', 18, 250, '#E5484D', 1); T('DANA', 56, 250, BLUE, 1); T('FORT KNOX', 90, 250, GREY2, 1); },
    9() { R(190, 260, 44, 8, NAVY); T('COOL CHAIN', 193, 262, WH, 1); }
  };
  /* 10 Dispatch: Order Management's room */
  const ORD = [['A-1182', 'HOTEL ROMA'], ['A-1183', 'LE PETIT BISTRO'], ['A-1184', 'KOSIK PL'], ['A-1185', 'CAFE SOL'], ['A-1186', 'PIZZA NOVA']];
  const STS = [['RECEIVED', '#5AA2FF'], ['PICKED', '#FFD84A'], ['INVOICED', '#FFB81C'], ['DELIVERED', '#FFFFFF']];
  S[10] = { sprite: true, feet: 252, base() {
    R(0, 0, W, 160, '#EEF3F9'); for (let x = 0; x < W; x += 16) R(x, 22, 1, 138, '#E1E8F1');
    hall(22);
    for (let i = 0; i < 3; i++) { const x = 168 + i * 72; R(x, 40, 66, 120, '#D3DEEB'); [78, 118, 158].forEach((y, k) => { R(x, y, 66, 3, '#FF8A3D'); boxes(x + 4, y - 1, 5, 3, i * 7 + k, 11, 11); }); R(x, 40, 3, 120, NAVY); R(x + 63, 40, 3, 120, NAVY); }
    [[392, '3'], [438, '4']].forEach(([x, n]) => { R(x, 70, 40, 90, GREY); for (let y = 74; y < 160; y += 4) R(x, y, 40, 1, GREY2); R(x - 2, 66, 44, 5, NAVY); R(x + 2, 56, 36, 10, Y); T('GATE ' + n, x + 6, 58, NAVY, 1); });
    R(4, 22, 156, 108, NAVY); R(4, 22, 156, 2, '#1F5AA8'); R(8, 28, 148, 98, '#06264F'); R(8, 28, 148, 12, Y); T('ORDERS', 12, 31, NAVY, 2); T('LIVE', 128, 31, NAVY, 1); circle(150, 34, 2, '#E5484D');
    R(18, 130, 2, 10, GREY2); R(144, 130, 2, 10, GREY2);
    floor(160, '#E6ECF3'); R(0, 196, W, 3, Y);
    R(8, 150, 104, 6, WH); R(8, 156, 104, 1, PALE); R(12, 157, 96, 38, BLUE); R(12, 172, 96, 3, Y); R(12, 191, 96, 4, '#0B4DA2');
    R(18, 136, 26, 14, GREY); R(20, 138, 22, 3, INK); R(24, 130, 14, 6, WH);
    R(54, 128, 30, 20, INK); R(56, 130, 26, 16, '#E6F0FD'); T('INVOICE', 57, 132, NAVY, 1); R(58, 140, 12, 2, BLUE); line(72, 140, 75, 143, GRN); line(75, 143, 80, 137, GRN); R(66, 148, 6, 3, GREY2);
    R(90, 140, 16, 10, '#D9A15F'); R(90, 140, 16, 1, '#EBC48E'); R(96, 140, 2, 10, '#C98B45');
    R(120, 210, 360, 5, GREY2); R(120, 210, 360, 1, PALE); for (let x = 126; x < 480; x += 32) R(x, 215, 3, 20, GREY2);
    R(250, 176, 4, 40, NAVY); R(296, 176, 4, 40, NAVY); R(250, 172, 50, 8, NAVY); T('SCAN', 262, 173, Y2, 1);
    R(404, 214, 54, 20, Y); R(404, 214, 54, 2, Y2); R(440, 196, 16, 18, '#BFE6FF'); R(440, 196, 16, 1, WH); R(456, 184, 3, 30, INK); R(392, 222, 14, 3, INK); R(392, 214, 3, 9, INK); circle(414, 238, 5, INK); circle(448, 238, 5, INK); boxes(370, 212, 2, 2, 41, 11, 10);
    R(118, 134, 36, 14, Y2); T('MIP>MULE', 120, 138, NAVY, 1); R(118, 134, 36, 2, '#E8B93A');
  }, anim(t) {
    const k = Math.floor(t / 1.1);
    ORD.forEach(([id, who], i) => { const y = 44 + i * 15, s = STS[(k + i * 3) % 4]; R(12, y, 140, 12, i % 2 ? '#0A2F60' : '#082A57'); T(id, 15, y + 4, LB, 1); T(who, 44, y + 4, WH, 1); R(112, y + 2, 38, 8, s[1]); T(s[0], 114, y + 4, NAVY, 1); });
    T('14.5M ORDERS  +17%', 14, 120, Y2, 1);
    const p = Math.min(16, Math.round((t * 10) % 22)); R(25, 136 - p, 12, p, WH); for (let y = 136 - p + 2; y < 136; y += 3) R(27, y, 8, 1, GREY);
    for (let i = 0; i < 5; i++) { const x = 124 + ((t * 26 + i * 72) % 350); R(x, 199, 16, 11, i % 2 ? '#C98B45' : '#D9A15F'); R(x, 199, 16, 1, '#EBC48E'); R(x + 3, 202, 9, 4, WH); R(x + 4, 203, 7, 1, INK); }
    if (Math.floor(t * 4) % 2) R(254, 182, 42, 1, '#FF5A5F');
  } };

  /* 11 The media world: Wholesale Media */
  const ADS = [
    (x, y, w, h, k) => { R(x, y, w, h, Y); T('-20%', x + 4, y + 4, NAVY, Math.max(1, Math.floor(h / 14))); T('OLIVE OIL', x + 4, y + h - 9, NAVY, 1); },
    (x, y, w, h, k) => { R(x, y, w, h, BLUE); R(x + w - Math.min(30, w / 2.5) - 4, y + 4, Math.min(30, w / 2.5), h - 8, Y2); T('NEW', x + 4, y + 4, WH, 2); T('CHEF KNIVES', x + 4, y + h - 9, Y2, 1); },
    (x, y, w, h, k) => { R(x, y, w, h, NAVY); T('SPONSORED', x + 4, y + 4, LB, 1); for (let i = 0; i < 3; i++) R(x + 4 + i * ((w - 8) / 3), y + 12, (w - 8) / 3 - 3, h - 20, PROD[(i * 3 + k) % PROD.length]); },
    (x, y, w, h, k) => { R(x, y, w, h, WH); R(x, y, w, 6, Y); T('FRESH FISH', x + 4, y + 9, NAVY, 1); R(x + 4, y + 17, w - 8, h - 22, '#9AD4FF'); R(x + w / 2 - 8, y + h / 2 + 2, 16, 6, LB); },
    (x, y, w, h, k) => { R(x, y, w, h, '#0B4DA2'); T('COFFEE', x + 4, y + 4, Y2, 2); T('BUY MORE PAY LESS', x + 4, y + h - 9, WH, 1); }
  ];
  const SCREENS = [[12, 30, 140, 84, 0], [168, 26, 90, 50, 1], [264, 26, 74, 50, 2], [344, 26, 128, 60, 3], [168, 82, 60, 40, 4], [234, 82, 104, 40, 0], [344, 92, 60, 34, 1], [410, 92, 62, 34, 2]];
  S[11] = { sprite: true, feet: 252, base() {
    for (let y = 0; y < 22; y++) R(0, y, W, 1, mix('#7CC4FF', '#CFEAFF', y / 22));
    for (let x = 0; x < W; x += 30) R(x, 0, 2, 22, '#0B4DA2'); R(0, 21, W, 2, NAVY);
    R(0, 23, W, 117, '#0A2F60'); for (let x = 0; x < W; x += 6) R(x, 23, 1, 117, '#0C3670');
    SCREENS.forEach(([x, y, w, h]) => { R(x - 3, y - 3, w + 6, h + 6, '#021A38'); R(x - 3, y - 3, w + 6, 1, '#1F5AA8'); });
    R(0, 140, W, 10, NAVY); R(0, 140, W, 1, '#1F5AA8');
    for (let y = 150; y < H; y++) R(0, y, W, 1, mix('#DCE6F2', '#F4F8FC', (y - 150) / 120));
    for (let x = -40; x < W + 40; x += 34) line(x + 17, 150, x + (x - 240) * .3, H, '#D3DCE8');
    [[30, 190], [140, 196], [300, 188], [420, 194]].forEach(([x, y]) => { R(x, y - 30, 3, 30, GREY2); R(x - 10, y - 32, 24, 4, Y); });
  }, anim(t) {
    const k = Math.floor(t / 1.8);
    SCREENS.forEach(([x, y, w, h, a], i) => { ADS[(a + k + i) % ADS.length](x, y, w, h, i + k); for (let yy = y; yy < y + h; yy += 3) R(x, yy, w, 1, 'rgba(0,0,0,.06)'); R(x, y, w, 2, 'rgba(255,255,255,.35)'); });
    R(12, 30, 140, 84, 'rgba(0,0,0,0)');
    const msg = '3.36M EUR MEDIA REVENUE  ·  6 NEW COUNTRIES  ·  1ST GLOBAL CAMPAIGN  ·  SPONSORED ADS IN M.SHOP  ·  ', off = Math.floor(t * 30) % (msg.length * 4);
    c.save(); c.beginPath(); c.rect(0, 141, W, 9); c.clip(); for (let r = 0; r < 3; r++) T(msg, -off + r * msg.length * 4, 143, Y2, 1); c.restore();
    c.save(); c.globalAlpha = .13; [[60, 40], [200, 30], [300, 34], [410, 40]].forEach(([x, w], i) => { const sway = Math.round(Math.sin(t * .7 + i) * 8); c.fillStyle = i % 2 ? Y2 : '#FFFFFF'; c.beginPath(); c.moveTo(x - 4 + sway, 150); c.lineTo(x + 4 + sway, 150); c.lineTo(x + w + sway * 2, 262); c.lineTo(x - w + sway * 2, 262); c.fill(); }); c.restore();
    SCREENS.forEach(([x, y, w, h], i) => { c.save(); c.globalAlpha = .16; R(x, 151 + (i % 3) * 3, w, 5, i % 2 ? Y : LB); c.restore(); });
    const crowd = [];
    for (let i = 0; i < 26; i++) crowd.push([108 + (i % 13) * 28 + (i >= 13 ? 14 : 0) + Math.round(hs(i, 8) * 6), i >= 13 ? 244 : 214, i]);
    crowd.forEach(([x, y, i]) => { const b = Math.floor(t * 2.2 + i * .7) % 4 === 0 ? -1 : 0, col = [BLUE, Y, NAVY, '#E5484D', LB, GRN, '#7A5AF8'][i % 7]; person(x, y + b, col, i % 4 ? '#3A2A1E' : '#C98B45');
      R(x + 2, y - 21 + b, 5, 1, i % 4 ? '#3A2A1E' : '#C98B45');
      if (i % 3 === 0) { R(x + 7, y - 24 + b, 3, 5, INK); R(x + 7, y - 24 + b, 3, 3, Math.floor(t * 3 + i) % 2 ? Y2 : LB); }
      if (i % 5 === 2) { R(x + 10, y - 8, 9, 6, '#C9D3DF'); R(x + 10, y - 8, 9, 1, GREY2); R(x + 11, y - 2, 2, 2, INK); R(x + 16, y - 2, 2, 2, INK); }
      if (Math.floor(t * .8 + i * .37) % 7 === 0) { R(x + 2, y - 31 + b, 5, 7, WH); T('!', x + 3, y - 30 + b, '#E5484D', 1); } });
    for (let i = 0; i < 18; i++) { const p = (t * .35 + hs(i, 3)) % 1; R(hs(i, 1) * W, 140 - p * 110, 2, 2, i % 2 ? Y2 : WH); }
    SCREENS.forEach(([x, y, w, h], i) => { if (y < 60) { c.save(); c.globalAlpha = .12; R(x, 236 + (i % 3) * 6, w, 6, i % 2 ? Y : LB); c.restore(); } });
  } };

  const cache = [];
  function base(i) {
    if (!cache[i]) { const cv = document.createElement('canvas'); cv.width = W; cv.height = H; c = cv.getContext('2d'); c.imageSmoothingEnabled = false; S[i].base(); if (EGG[i]) EGG[i](); cache[i] = cv; }
    return cache[i];
  }
  function anim(i, ctx, t, st = 99) { c = ctx; if (S[i].anim) S[i].anim(t, st); }
  /* the arrival scene with its doors slid open (for the walk-in) */
  function doorsOpen(o) {
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const k = cv.getContext('2d'); k.drawImage(base(0), 0, 0); const keep = c; c = k;
    const g = Math.round(o * 19); R(116 - g, 133, 2 * g, 51, '#FFF3C4'); if (g > 4) { R(116 - g, 160, 2 * g, 24, '#E9EFF6'); for (let x = 116 - g + 2; x < 116 + g - 2; x += 5) R(x, 140, 3, 20, PROD[(x * 7) % PROD.length]); }
    R(97, 133, 19 - g, 51, '#CDEBFF'); R(116 + g, 133, 19 - g, 51, '#CDEBFF'); R(116 - g - 1, 133, 1, 51, NAVY); R(116 + g, 133, 1, 51, NAVY);
    c = keep; return cv;
  }
  return { W, H, base, anim, sprite, meta: i => S[i], cartAt, doorsOpen, cardCanvas };
})();
