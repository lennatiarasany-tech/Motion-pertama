// Perkakas ilustrasi vektor datar (canvas 2D) untuk gambar uji gaya
const W = 1080, H = 1920;
const cv = document.getElementById('cv'), g = cv.getContext('2d');
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function rr(x, y, w, h, r, c) { g.fillStyle = c; g.beginPath(); g.roundRect(x, y, w, h, r); g.fill(); }
function el(x, y, rx, ry, c, rot = 0) { g.fillStyle = c; g.beginPath(); g.ellipse(x, y, rx, ry, rot, 0, 7); g.fill(); }
function poly(pts, c) { g.fillStyle = c; g.beginPath(); g.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) g.lineTo(pts[i], pts[i + 1]); g.closePath(); g.fill(); }

// gedung latar dengan garis jendela
function gedung(x, y, w, h, c, cj, benih = 1) {
  rr(x, y, w, h, 4, c);
  g.fillStyle = cj; const R = rng(benih);
  const kol = Math.max(2, Math.floor(w / 46));
  for (let yy = y + 26; yy < y + h - 20; yy += 26) for (let i = 0; i < kol; i++) {
    if (R() < .12) continue; g.fillRect(x + 16 + i * (w - 32) / kol, yy, (w - 32) / kol - 10, 9);
  }
}
// pohon gumpal + bintik tekstur
function pohon(x, y, r, c, cd, benih = 1, batang = '#7A6A58') {
  const R = rng(benih);
  rr(x - r * .07, y - r * .2, r * .14, r * 1.4, r * .07, batang);
  const bl = [[0, -r * .9, r * .75], [-r * .5, -r * .45, r * .6], [r * .5, -r * .4, r * .62], [0, -r * .2, r * .7]];
  g.save(); g.beginPath(); bl.forEach(([a, b, q]) => { g.moveTo(x + a + q, y + b); g.arc(x + a, y + b, q, 0, 7); }); g.fillStyle = c; g.fill(); g.clip();
  // sisi bayang
  g.fillStyle = cd; g.globalAlpha = .55; g.beginPath(); g.ellipse(x + r * .55, y - r * .3, r * .9, r * 1.3, 0, 0, 7); g.fill(); g.globalAlpha = 1;
  // bintik
  for (let i = 0; i < r * 3; i++) { const a = R() * 7, d = Math.sqrt(R()) * r * 1.3; g.fillStyle = R() < .5 ? cd : 'rgba(255,255,255,.25)';
    g.beginPath(); g.arc(x + Math.cos(a) * d, y - r * .45 + Math.sin(a) * d, 1.5 + R() * 3, 0, 7); g.fill(); }
  g.restore();
}
// semak tepi layar
function semak(x, y, w, h, c, cd, benih) { g.save(); g.beginPath(); g.ellipse(x, y, w, h, 0, 0, 7); g.fillStyle = c; g.fill(); g.clip(); const R = rng(benih);
  for (let i = 0; i < 260; i++) { g.fillStyle = cd; g.beginPath(); g.arc(x + (R() - .5) * w * 2, y + (R() - .5) * h * 2, 2 + R() * 4, 0, 7); g.fill(); } g.restore(); }
// tenda bergaris
function tenda(x, y, w, n, c1, c2, h = 110) {
  const sw = w / n;
  for (let i = 0; i < n; i++) { const c = i % 2 ? c2 : c1;
    poly([x + i * sw, y, x + (i + 1) * sw, y, x + (i + 1) * sw, y + h * .55, x + i * sw, y + h * .55], c);
    g.fillStyle = c; g.beginPath(); g.moveTo(x + i * sw, y + h * .55); g.lineTo(x + (i + 1) * sw, y + h * .55); g.arc(x + i * sw + sw / 2, y + h * .55, sw / 2, 0, Math.PI); g.fill(); }
}
// palang apotek
function palang(x, y, s, c) { rr(x - s * .18, y - s / 2, s * .36, s, s * .06, c); rr(x - s / 2, y - s * .18, s, s * .36, s * .06, c); }
// rak kotak obat datar
function rakObat(x, y, w, h, cr, pal, benih, tingkat = 4) {
  rr(x, y, w, h, 6, cr); const R = rng(benih), th = h / tingkat;
  for (let i = 0; i < tingkat; i++) { let xx = x + 14; const by = y + (i + 1) * th - 10;
    while (xx < x + w - 40) { const bw = 22 + R() * 34, bh = th * (.4 + R() * .4);
      rr(xx, by - bh, bw, bh, 3, pal[Math.floor(R() * pal.length)]); g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(xx + bw * .65, by - bh, bw * .35, bh); xx += bw + 5; }
    g.fillStyle = 'rgba(0,0,0,.18)'; g.fillRect(x + 6, by, w - 12, 8); }
}
// balon kata
function balon(x, y, w, h, teks, o = {}) {
  g.save();
  if (o.bayang) { g.shadowColor = o.bayang; g.shadowBlur = 30; g.shadowOffsetY = 12; }
  rr(x, y, w, h, h / 2.2, o.bg || '#fff');
  g.beginPath(); const tx = o.ekorX ?? x + w / 2; g.moveTo(tx - 30, y + h - 4); g.lineTo(tx + 26, y + h - 4); g.lineTo(tx + (o.ekorDx ?? 10), y + h + 60); g.fill();
  g.restore();
  g.fillStyle = o.warna || '#1B2B4A'; g.font = o.font || "700 58px Montserrat"; g.textAlign = 'center'; g.textBaseline = 'middle';
  (Array.isArray(teks) ? teks : [teks]).forEach((t, i, a) => g.fillText(t, x + w / 2, y + h / 2 + (i - (a.length - 1) / 2) * (o.lh || 70)));
}
// tokoh vektor datar. (x,y)=titik kaki, s=tinggi px. o: warna & pose
function orang(x, y, s, o) {
  const k = s / 1000; g.save(); g.translate(x, y); g.scale(k * (o.balik ? -1 : 1), k);
  const kulit = o.kulit || '#E9A87C', kulitG = o.kulitG || '#D18C62';
  const baju = o.baju || '#3A6FD8', bajuG = o.bajuG || '#2F5CB8';
  // kaki
  if (!o.tanpaKaki) {
    rr(-78, -430, 70, 430, 22, o.celana || '#1E2340'); rr(8, -430, 70, 430, 22, o.celana || '#1E2340');
    g.fillStyle = 'rgba(0,0,0,.12)'; g.fillRect(40, -430, 38, 430);
    el(-48, -6, 52, 20, o.sepatu || '#2B2F45'); el(48, -6, 52, 20, o.sepatu || '#2B2F45');
  }
  // rambut panjang belakang
  if (o.rambut === 'panjang') rr(-92, -910, 184, 330, 70, o.cRambut || '#1E1A22');
  // badan
  g.fillStyle = baju; g.beginPath(); g.moveTo(-128, -650); g.quadraticCurveTo(-130, -712, -60, -716); g.lineTo(60, -716); g.quadraticCurveTo(130, -712, 128, -650);
  g.lineTo(110, -400); g.lineTo(-110, -400); g.closePath(); g.fill();
  g.save(); g.clip(); g.fillStyle = bajuG; g.fillRect(40, -720, 120, 330); g.restore();
  if (o.jas) { // jas putih terbuka
    const jas = o.jas, jasG = o.jasG || '#D9E1EC';
    poly([-130, -650, -60, -716, -18, -716, -30, -560, -14, -330, -128, -330], jas);
    poly([130, -650, 60, -716, 18, -716, 30, -560, 14, -330, 128, -330], jasG);
    poly([-60, -716, -18, -716, -6, -650, -40, -620], '#F4F7FB');
    poly([60, -716, 18, -716, 6, -650, 40, -620], '#C9D3E2');
    if (o.dasi) poly([-10, -700, 10, -700, 16, -560, 0, -530, -16, -560], o.dasi);
    rr(-104, -560, 44, 10, 4, o.aksenJas || '#2E9E5B');
  }
  // leher & kepala
  rr(-24, -760, 48, 60, 14, kulitG);
  el(-66, -828, 14, 20, kulitG); el(66, -828, 14, 20, kulitG);
  el(0, -830, 68, 84, kulit);
  // rambut atas
  const cr = o.cRambut || '#1E1A22';
  g.fillStyle = cr; g.beginPath();
  if (o.rambut === 'pendek') { g.moveTo(-70, -830); g.bezierCurveTo(-78, -940, 70, -950, 72, -840); g.quadraticCurveTo(60, -880, 10, -888); g.quadraticCurveTo(-40, -880, -56, -810); g.closePath(); }
  else { g.moveTo(-74, -800); g.bezierCurveTo(-84, -945, 84, -945, 74, -800); g.quadraticCurveTo(70, -870, 20, -885); g.quadraticCurveTo(-30, -870, -60, -880); g.closePath(); }
  g.fill();
  if (o.kerudung) { g.fillStyle = o.kerudung; g.beginPath(); g.moveTo(-86, -820); g.bezierCurveTo(-92, -960, 92, -960, 86, -820); g.lineTo(96, -690); g.quadraticCurveTo(0, -640, -96, -690); g.closePath(); g.fill();
    el(0, -820, 60, 74, kulit); g.fillStyle = o.kerudung; g.beginPath(); g.ellipse(0, -880, 64, 30, 0, Math.PI, 0); g.fill(); }
  // wajah
  const ek = o.ekspresi || 'sedih';
  g.fillStyle = '#1D1A24'; el(-26, -828, 8, 10, '#1D1A24'); el(26, -828, 8, 10, '#1D1A24');
  if (o.kacamata) { g.strokeStyle = o.kacamata; g.lineWidth = 5; g.beginPath(); g.roundRect(-50, -846, 42, 34, 10); g.roundRect(8, -846, 42, 34, 10); g.moveTo(-8, -834); g.lineTo(8, -834); g.stroke(); }
  g.strokeStyle = cr; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath();
  if (ek === 'sedih') { g.moveTo(-40, -850); g.lineTo(-14, -858); g.moveTo(40, -850); g.lineTo(14, -858); } else { g.moveTo(-40, -858); g.quadraticCurveTo(-26, -866, -12, -858); g.moveTo(40, -858); g.quadraticCurveTo(26, -866, 12, -858); }
  g.stroke();
  g.strokeStyle = kulitG; g.lineWidth = 5; g.beginPath(); g.moveTo(0, -822); g.lineTo(-6, -800); g.lineTo(4, -798); g.stroke();
  g.strokeStyle = '#8E3F3A'; g.lineWidth = 6; g.beginPath();
  if (ek === 'sedih') g.arc(0, -760, 22, Math.PI * 1.25, Math.PI * 1.75); else g.arc(0, -790, 22, Math.PI * .2, Math.PI * .8);
  g.stroke();
  g.globalAlpha = .35; el(-42, -800, 14, 9, '#E0607A'); el(42, -800, 14, 9, '#E0607A'); g.globalAlpha = 1;
  // lengan
  const lengan = o.jas ? (o.jas) : baju, lenganG = o.jas ? (o.jasG || '#D9E1EC') : bajuG;
  g.lineCap = 'round';
  const arm = (pts, cAtas, cBawah) => { g.strokeStyle = cAtas; g.lineWidth = 62; g.beginPath(); g.moveTo(pts[0], pts[1]); g.lineTo(pts[2], pts[3]); g.stroke();
    g.strokeStyle = cBawah; g.lineWidth = 52; g.beginPath(); g.moveTo(pts[2], pts[3]); g.lineTo(pts[4], pts[5]); g.stroke(); el(pts[4], pts[5], 30, 34, kulit); };
  // kiri (layar) turun
  if (o.kiri === 'pinggang') arm([-112, -670, -190, -540, -105, -470], lengan, o.jas ? lengan : kulit);
  else arm([-112, -670, -138, -520, -130, -390], lengan, o.jas ? lengan : kulit);
  // kanan
  if (o.kanan === 'garuk') arm([112, -670, 200, -790, 80, -880], lenganG, o.jas ? lenganG : kulit);
  else if (o.kanan === 'dagu') arm([112, -670, 120, -560, 30, -740], lenganG, o.jas ? lenganG : kulit);
  else if (o.kanan === 'tunjuk') arm([112, -670, 230, -720, 330, -820], lenganG, o.jas ? lenganG : kulit);
  else arm([112, -670, 138, -520, 130, -390], lenganG, o.jas ? lenganG : kulit);
  if (o.tas) { g.strokeStyle = '#2B4FA0'; g.lineWidth = 8; g.beginPath(); g.arc(-130, -360, 34, Math.PI, 0); g.stroke(); poly([-195, -360, -65, -360, -55, -180, -205, -180], o.tas); }
  g.restore();
}
function grain(alpha = .06, benih = 3) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 256; const x = c.getContext('2d'), d = x.createImageData(256, 256), R = rng(benih);
  for (let i = 0; i < d.data.length; i += 4) { const v = R() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  x.putImageData(d, 0, 0); g.save(); g.globalAlpha = alpha; g.globalCompositeOperation = 'overlay'; g.fillStyle = g.createPattern(c, 'repeat'); g.fillRect(0, 0, W, H); g.restore();
}
function selesai() { window.SIAP = true; }
