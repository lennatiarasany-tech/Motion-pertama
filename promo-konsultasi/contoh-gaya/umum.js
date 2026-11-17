// Helper bersama untuk gambar contoh gaya (three.js r128)
const W = 1080, H = 1920;
function lin(hex) { return new THREE.Color(hex).convertSRGBToLinear(); }
function siapkan(bg) {
  const ren = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true, alpha: true});
  ren.setSize(W, H); ren.setPixelRatio(1);
  ren.outputEncoding = THREE.sRGBEncoding; ren.toneMapping = THREE.ACESFilmicToneMapping; ren.toneMappingExposure = 1.0;
  ren.shadowMap.enabled = true; ren.shadowMap.type = THREE.PCFSoftShadowMap;
  document.getElementById('dunia').appendChild(ren.domElement);
  const sc = new THREE.Scene(); if (bg) sc.background = null;
  return {ren, sc};
}
// kotak bersudut bulat (ekstrusi)
function rbox(w, h, d, r, mat) {
  r = Math.min(r, w / 2 - .001, h / 2 - .001);
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  const bv = Math.min(r * .6, d / 3);
  const g = new THREE.ExtrudeGeometry(s, {depth: d - 2 * bv, bevelEnabled: true, bevelThickness: bv, bevelSize: bv * .9, bevelSegments: 4, curveSegments: 6});
  g.translate(0, 0, -(d - 2 * bv) / 2);
  const m = new THREE.Mesh(g, mat); m.castShadow = m.receiveShadow = true; return m;
}
function mat(hex, o = {}) { return new THREE.MeshStandardMaterial(Object.assign({color: lin(hex), roughness: .6, metalness: 0}, o)); }
function mesh(geo, m, x = 0, y = 0, z = 0) { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; return o; }
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
// rak obat penuh kotak warna-warni
function rak(lebar, tinggi, dalam, warnaRak, palet, benih, matF) {
  const g = new THREE.Group(), R = rng(benih), mf = matF || ((c) => mat(c, {roughness: .55}));
  const badan = rbox(lebar, tinggi, dalam, .04, mf(warnaRak)); badan.position.y = tinggi / 2; g.add(badan);
  const tingkat = 4, th = tinggi / tingkat;
  for (let i = 0; i < tingkat; i++) {
    let x = -lebar / 2 + .08;
    const y = i * th + .1;
    while (x < lebar / 2 - .18) {
      const w = .12 + R() * .16, h = th * (.45 + R() * .35);
      const b = rbox(w, h, dalam * .6, .015, mf(palet[Math.floor(R() * palet.length)]));
      b.position.set(x + w / 2, y + h / 2, dalam * .22); g.add(b); x += w + .02;
    }
  }
  return g;
}
// teks ke tekstur kanvas
function teksTex(teks, o = {}) {
  const c = document.createElement('canvas'); c.width = o.w || 512; c.height = o.h || 128; const x = c.getContext('2d');
  if (o.bg) { x.fillStyle = o.bg; x.fillRect(0, 0, c.width, c.height); }
  x.fillStyle = o.warna || '#fff'; x.font = o.font || '700 70px Onest'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(teks, c.width / 2, c.height / 2 + (o.dy || 0));
  const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 8; return t;
}
function siapFont() { return document.fonts.ready.then(() => new Promise(r => setTimeout(r, 300))); }
