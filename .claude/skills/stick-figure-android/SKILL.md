---
name: stick-figure-android
description: Membuat video explainer kartun 9:16 (30 sampai 45 detik) dengan karakter Dodi (kepala telur abu-abu, rambut coklat, kacamata bulat, hoodie merah, tangan-kaki lidi, sepatu kuning) yang bisa dibuat dan direkam langsung dari HP Android. Hasilnya SATU file HTML berisi animasi kode, teks layar 1 sampai 2 kata, musik dan efek suara sintetis, voice over AI Kokoro (bahasa Inggris, dibuat di HP), tombol rekam suara sendiri, dan tombol rekam video MP4/WebM. Juga menangani alur ide topik (sejarah / fakta unik) → narasi → "buat video". Pakai saat pengguna minta ide topik video, narasi video pendek, video stick figure, video Dodi, explainer kartun "kenapa / bagaimana kalau", mengetik "buat video", atau memanggil /stick-figure-android.
---

# Stick Figure Android (karakter Dodi)

```
┌──────────────────────┐
│  ☀   ☁        ?      │  dunia cerah digambar dengan kode
│        ( o_o )       │  Dodi: kepala telur, kacamata, rambut coklat
│         /[■]\        │  hoodie merah, tangan & kaki lidi
│          / \         │  sepatu kuning
│      teks layar      │  1-2 kata, huruf kecil, di ~70% tinggi layar
└──────────────────────┘
```

Skill ini tidak butuh komputer, ffmpeg, Node, atau Python. Claude menulis satu file `.html`. Pengguna membukanya di **Google Chrome di HP Android**, menekan **🤖 Suara AI (Kokoro)** (atau merekam suaranya sendiri), lalu menekan **⏺ Rekam video**. Video tersimpan di HP.

Di bawah ada **TEMPLATE** lengkap: bagian ENGINE (jangan diubah) dan bagian REEL (contoh jadi: "Why is the sky blue?", 9 kalimat, 9 adegan, bahasa Inggris). Setiap video baru = salin TEMPLATE, tulis ulang bagian REEL saja.

## Alur percakapan

Pengguna sering memakai tiga langkah ini. Ikuti tanpa bertanya ulang:

1. **Minta ide topik** (mis. "kasih 10 ide sejarah / fakta unik"): beri 10 pilihan bernomor, campuran sejarah dan fakta unik kecuali diminta lain. Tiap pilihan = judul pendek yang bikin penasaran + satu kalimat hook. Tulis daftarnya dalam bahasa Indonesia supaya pengguna mudah memilih. Jangan membuat narasi dulu.
2. **Pengguna memilih nomor**: langsung tulis narasinya (langkah 1 dan 2 di bawah) dalam bahasa video. Kalau pengguna minta bahasa Inggris, narasi dalam bahasa Inggris, lalu tambahkan terjemahan Indonesia singkat di bawahnya agar pengguna paham. Akhiri dengan: "Ketik **buat video** kalau sudah cocok."
3. **Pengguna mengetik "buat video"**: langsung buat file HTML (langkah 3 sampai 6) memakai narasi terakhir, persis kata per kata. Jangan bertanya lagi. Untuk video bahasa Inggris, isi `lang: 'en-US'` dan pilih `voice` Kokoro yang cocok.

## Langkah kerja Claude

1. **Naskah.** Dari topik pengguna, tulis naskah 75 sampai 100 kata (30 sampai 45 detik), 8 sampai 11 kalimat, satu ide per kalimat, kalimat pendek dan mudah diucapkan. Urutan: hook pertanyaan ("Kenapa…?", "Bagaimana kalau…?"), anggapan umum, belokan ("Padahal…", "Tapi…"), contoh yang makin kuat, satu kalimat yang menunjukkan mekanismenya, lalu jawaban yang menutup hook. Bahasa mengikuti permintaan pengguna (default Indonesia; kalau diminta Inggris, pakai bahasa Inggris percakapan yang sederhana). Angka ditulis dengan huruf di naskah ("twenty five") agar dibaca benar oleh suara AI, lalu ubah di `captions` (`{'twenty five': '25'}`). **Tunjukkan naskah dan tunggu persetujuan ("buat video") sebelum menulis animasi.**
2. **Fakta.** Cek setiap klaim (pakai pencarian web kalau ada). Teori ditulis hati-hati ("ilmuwan menduga…"). Jangan mengarang angka.
3. **Rencana adegan.** Buat tabel singkat: nomor kalimat → tempat, aksi Dodi, properti, kata yang memicu aksi/SFX. Kira-kira satu adegan per kalimat (kalimat panjang boleh 2 adegan dengan `w`). Ide baru = tempat/sudut baru.
4. **Tulis file.** Salin TEMPLATE di bawah **persis** dari `<!doctype html>` sampai `</html>`. Ganti hanya isi di antara `// ===================== REEL` dan akhir script itu (objek `REEL`, fungsi bantu khusus video, `scene(...)`, `sfx(...)`). Jangan mengubah ENGINE.
   - Kalau ada alat pembuat file: simpan sebagai `<judul-pendek>.html` dan berikan sebagai file unduhan. Kalau tidak ada, keluarkan sebagai artifact HTML.
5. **Periksa sendiri** dengan daftar cek di bawah sebelum menyerahkan.
6. **Serahkan** file + kirim teks "Cara pakai di HP" (di bawah) ke pengguna.
7. **Revisi.** Kalau pengguna minta ubah adegan, ubah blok REEL lalu kirim ulang file utuh.

## Gaya (wajib)

- **Dodi** adalah tokoh utama di hampir setiap adegan dan selalu *beraksi* sesuai kalimat (menunjuk, kaget, lari, duduk, bersorak), bukan hanya berdiri.
- Dunia cerah, warna jenuh, kamera selalu bergerak pelan (`handheld` + sedikit zoom), parallax latar, transisi whip dengan motion blur (otomatis).
- Hook langsung beraksi di frame pertama.
- Teks layar otomatis dari naskah: 1 sampai 2 kata, huruf kecil, tanpa tanda baca. Teks lain di layar hanya untuk nama konsep penting (`label()`), jangan kalimat.
- Benturan = `burst` + `shake` + `flash` + `sfx('impact')`. Muncul = `popIn` + `sfx('swish')`. Ketemu jawaban = `sparkle` + `sfx('ding')`.
- SFX di bawah suara (sudah diatur), musik pelan dan otomatis mengecil saat ada suara. Jangan pakai bunyi seperti laser.
- Tanpa em dash di layar.

## Tata letak (kanvas 1080 × 1920)

- **Pita teks layar y 1250 sampai 1420. Wajah tidak boleh masuk.** Untuk Dodi berdiri di `y` dengan ukuran `s`: dagu = `y − 0.565·s`, ubun-ubun = `y − 0.93·s`. Pastikan dagu ≤ 1240 (atau seluruh kepala di bawah 1430).
  - Contoh aman: `s: 860, y: 1640` (close-up), `s: 600, y: 1590`, `s: 380, y: 1380`.
- Area aman Instagram/TikTok: x 100 sampai 980, y 220 sampai 1500. Properti penting di dalamnya.
- Duduk (`pose: 'sit'`): kaki menyentuh tanah kalau `y = tanah + 0.15·s`; pantat ada di `tanah − 0.15·s` (gambar bangku/batu setinggi itu).
- Hadap kiri: `flip: -1`. Tampak samping otomatis untuk pose `run`, `walk`, `sit`, `stand`.

## API ringkas (untuk menulis blok REEL)

**Isi REEL**
```js
const REEL = { title, file, lang: 'en-US'|'id-ID', voice: 'am_michael', voiceSpeed: 1, music: 'ceria'|'misteri'|'tenang'|false, script: [ 'kalimat 1', ... ], captions: { 'twenty five': '25' }, speed: 1 };
```
- `captions` = ganti teks layar (mis. angka ditulis angka). `speed` > 1 memperlambat perkiraan tempo kalau suara belum dibuat.
- `voice` = suara Kokoro awal (pengguna bisa mengganti di menu). Pilihan: `am_michael` (pria US, netral, default), `am_adam`, `am_fenrir` (berat, cocok sejarah/misteri), `am_puck` (ceria), `af_heart` (wanita US), `af_bella`, `af_nicole` (lembut), `bm_george` (pria UK, cocok sejarah), `bm_fable`, `bf_emma` (wanita UK). Kokoro hanya untuk bahasa Inggris; untuk video bahasa Indonesia pengguna merekam suaranya sendiri.
- `music`: `misteri` untuk sejarah/misteri, `ceria` untuk fakta lucu/sains, `tenang` untuk topik sedih/serius.

**Adegan**
```js
scene({ s: 3, w: 0, off: 0, tr: 'whip'|'cut'|'flash', draw(ctx, lt, t, d) { ... } });
```
- Adegan mulai saat kata ke-`w` kalimat ke-`s` diucapkan (adegan pertama selalu di 0). `tr` = transisi KELUAR adegan ini.
- `lt` = detik sejak adegan mulai, `t` = detik global, `d` = durasi adegan.
- `T(s, w)` = detik saat kata ke-w kalimat ke-s mulai (w negatif dihitung dari belakang, `T(2,-1)` = kata terakhir). `TE(s, w)` = saat kata itu selesai. **Selalu pakai `T()` untuk mengatur aksi ke kata**, karena waktunya ikut menyesuaikan suara yang direkam.
- `sfx(jenis, s, w, offset = 0, gain = 1)` di luar `scene`. Jenis: `whoosh swish thud impact tap ding sparkle rise step cash buzz`. Whoosh transisi whip sudah otomatis.

**Kamera & gerak**
- `CAM(ctx, {x, y, z, r}, par)`: titik (x,y) dunia di tengah layar, `z` zoom, `r` miring. Panggil `CAM(ctx, cam, .05)` untuk langit, `.2` awan, `.5` bukit jauh, `1` dunia depan (parallax).
- `handheld(t, amp)` → [dx, dy]. `shake(t, amp, freq)`.
- `kf(t, [[t0, v0], [t1, v1, easing?], ...])` keyframe (angka atau array). `popIn(t, t0, dur)` 0→1 memantul. `inv(a, b, v)` 0..1. `lerp`, `clamp`, `ease`, `easeOut`, `easeIn`, `backOut`, `elastic`, `rng(seed)`.

**Dodi**
```js
drawDodi(ctx, { x, y, s, t, pose, face, look: [x, y], turn, flip, tilt, lean, air, squash, alpha, talk, view: 'back', hold(ctx, hx, hy, ang) {}, acc(ctx, hx, hy, turn) {}, arms, legs, pal, hair, glasses, shadow, seed });
```
- Selalu isi `t` (untuk kedip & animasi pose). `y` = posisi telapak kaki. `s` = tinggi badan dalam piksel.
- `pose`: `idle wave point pointUp cheer shock think shrug hips explain hold facepalm sad jump fall run walk stand sit`.
- `face`: `smile happy grin laugh smug shock think angry sad worried neutral sleepy determined wow scared`, atau objek `{ e: 'open|wide|happy|closed|half|angry', b: 'flat|up|high|angry|worry|one', m: 'smile|grin|laugh|smirk|teeth|O|hmm|frown|wobble|flat' }`.
- `look` arah bola mata (−1..1). `turn` −1..1 memutar wajah. `air` = piksel melayang (bayangan tetap di tanah). `talk: true` = mulut bergerak ikut suara.
- `hold(ctx, hx, hy, ang)` menggambar benda di tangan kanan, dalam satuan badan (1 = tinggi badan). Contoh HP: `rrect(ctx, hx - .03, hy - .1, .06, .11, .01); ctx.fillStyle = '#222'; ctx.fill();`
- `arms: { R: [a1, a2] }` sudut bahu & siku manual, atau `R: { ik: [x, y] }` tangan ke titik (satuan badan, kaki di 0, kepala ~ −0.75).
- Tokoh lain: `drawDodi(ctx, { ...CAST.RINA, x, y, s, t, ... })`. Tersedia `CAST.RINA` (rambut panjang, hoodie biru), `CAST.BUDI` (rambut pendek, hoodie hijau), `CAST.PAK` (rambut putih, kacamata). Bisa juga `pal: { top: '#2f7de1', top2: '#1f55a6', hair: '#111' }`, `hair: 'wavy'|'short'|'long'|'none'`, `glasses: false`.

**Dunia** (koordinat dunia, panggil setelah `CAM`)
`sky(ctx, atas, bawah)`, `sky3(ctx, a, b, c)`, `sun(ctx, x, y, r, t, warna, glow)`, `cloud(ctx, x, y, s, seed, alpha)`, `ground(ctx, y, c1, c2)`, `hill(ctx, cx, y, w, h, warna)`, `tree(ctx, x, y, s, t)`, `bush(ctx, x, y, s)`, `house(ctx, x, y, s, dinding, atap)`, `city(ctx, dasarY, seed, warna)`, `room(ctx, { floorY, wall, floor, window, winX, winY, winSky, frame })`, `table(ctx, x, y, s)`, `laptop(ctx, x, y, s, layar(ctx, w, h))`, `phone(ctx, x, y, s, rot, layar(ctx, w, h))`, `board(ctx, x, y, w, h, judul)`, `arrow(ctx, x1, y1, x2, y2, progres, warna, tebal, lengkung)`, `bars(ctx, x, y, w, h, nilai[], progres)`, `label(ctx, teks, x, y, size, bg, fg, skala)`, `icon(ctx, nama, x, y, s, t)` dengan nama `q ex check cross bulb heart coin money clock star zzz fire`.

**Efek**
`burst(ctx, x, y, r, n, warna)`, `flash(ctx, alpha)`, `sparkle(ctx, x, y, r, a)`, `puff(ctx, x, y, r, a)`, `sweat(ctx, x, y, s, a)`, `speedLines(ctx, t, a)`, `motionLines(ctx, x, y, arah, panjang)`.

**Bentuk dasar**
`circle`, `ellipse`, `rrect`, `poly`, `line`, `fs(ctx, isi, tebal, garis)`, `text(ctx, str, x, y, size, isi, garis, tebalGaris)`. Properti khusus video (prisma, molekul, kapal, dll.) ditulis sebagai fungsi di blok REEL, lihat contoh `molecule()` dan `wave()`.

## Daftar cek sebelum menyerahkan

- [ ] Jumlah `scene` ≈ jumlah kalimat, indeks `s` urut naik, semua `s` < jumlah kalimat, `w` < jumlah kata kalimat itu.
- [ ] Setiap adegan menggambar latar penuh dulu (`sky`/`room`/warna) supaya tidak ada area hitam saat kamera bergerak.
- [ ] Dagu Dodi ≤ 1240 di setiap adegan (rumus di atas).
- [ ] Setiap aksi penting dikunci ke kata dengan `T(s, w)`, bukan detik mati.
- [ ] Tidak ada kalimat panjang di layar; hanya `label()` untuk nama konsep.
- [ ] ENGINE tidak diubah satu karakter pun. Kurung kurawal REEL seimbang.
- [ ] Nama file pendek, huruf kecil, pakai tanda hubung.

## Cara pakai di HP (kirim teks ini ke pengguna)

1. Unduh file `.html`, lalu buka dengan **Chrome** (dari aplikasi Files: ketuk file → Buka dengan → Chrome). Kalau tombol di dalam aplikasi Claude tidak jalan, selalu buka lewat Chrome.
2. Ketuk **▶ Putar** untuk melihat animasi (suara masih perkiraan).
3. Ketuk **🤖 Suara AI (Kokoro)**. Pertama kali akan mengunduh model suara ±90 MB (pakai Wi-Fi), lalu membuat suara kalimat demi kalimat, biasanya 1 sampai 4 menit di HP. Suara bisa diganti dari menu 🗣 di sebelahnya, lalu ketuk 🤖 lagi. Animasi dan teks otomatis menyesuaikan suara.
   - Alternatif: **🎙 Rekam suara saya** (bacakan naskah yang muncul, jeda di setiap titik, lalu **■ Selesai**), atau **📁 Pakai file suara** (MP3 dari ElevenLabs/CapCut).
4. Ketuk **▶ Putar** lagi untuk cek, lalu **⏺ Rekam video**. Biarkan layar menyala sampai selesai.
5. Ketuk **⬇ Simpan video** atau **↗ Bagikan** (ke Galeri, WhatsApp, CapCut). File berformat MP4 (Chrome baru) atau WebM. Kalau WebM, impor ke CapCut lalu ekspor ulang jadi MP4.
6. **Kualitas: 1080p** untuk hasil lebih tajam (HP lama bisa patah-patah, pakai 720p).
- 🔊 **Suara HP** hanya untuk pratinjau, tidak ikut terekam di video.

## Masalah umum

- *Layar hitam / tidak bergerak*: ada error di blok REEL. Periksa ejaan fungsi dan kurung. Paling sering: `s` adegan melebihi jumlah kalimat, atau properti dipanggil sebelum didefinisikan.
- *Teks tidak sinkron*: kalimat di naskah harus sama persis dengan yang dibaca, dan beri jeda jelas di setiap titik saat merekam.
- *Mikrofon ditolak*: buka lewat Chrome dan izinkan mikrofon, atau rekam di aplikasi perekam lalu pakai 📁.
- *Video tanpa suara*: suara HP (TTS) memang tidak terekam; pakai 🤖, 🎙, atau 📁.
- *Suara AI gagal / lama sekali*: butuh internet untuk unduhan pertama; tutup aplikasi lain; HP lama bisa butuh beberapa menit. Kalau tetap gagal, pakai 🎙 atau 📁.

## TEMPLATE

Salin persis. Ganti hanya blok REEL.

```html
<!doctype html>
<html lang="id"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<title>Why is the sky blue?</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&display=swap" rel="stylesheet">
<style>
:root{color-scheme:dark}*{box-sizing:border-box}
body{margin:0;background:#15131a;color:#f3f1f7;font:15px/1.4 system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:10px 12px 28px}
h1{font-size:16px;margin:4px 0 8px;font-weight:700;text-align:center}
#stage{width:min(100%,calc(66vh*9/16));aspect-ratio:9/16;background:#000;border-radius:14px;overflow:hidden;box-shadow:0 8px 30px #0008}
#stage canvas{width:100%;height:100%;display:block}
#bar{width:min(100%,520px);margin-top:10px;display:flex;flex-direction:column;gap:8px}
.row{display:flex;gap:8px;flex-wrap:wrap}
button,.btn,select{flex:1 1 0;min-width:120px;padding:12px 10px;border:0;border-radius:12px;background:#2b2735;color:#fff;font:600 14px system-ui;text-align:center;cursor:pointer;text-decoration:none}
.main{background:#e0453a}.on{background:#3a8d5c}
input[type=range]{width:100%;accent-color:#e0453a}
#status{font-size:13px;color:#b9b4c6;min-height:1.4em;text-align:center}
#out{display:none;flex-direction:column;gap:8px}#out video{width:100%;border-radius:12px;background:#000}
#prompter{display:none;position:fixed;inset:0;background:#0d0c10f5;z-index:9;padding:20px 20px 90px;overflow:auto}
#prompter p{font-size:23px;line-height:1.5;margin:0 0 16px}
#prompter .hint{font-size:14px;color:#ff8a80}
#bStop{position:fixed;left:20px;right:20px;bottom:20px;background:#e0453a;font-size:17px;padding:16px}
</style></head><body>
<h1 id="ttl"></h1>
<div id="stage"><canvas id="c"></canvas></div>
<div id="bar">
 <input id="scrub" type="range" min="0" max="1000" value="0">
 <div class="row"><button id="bPlay" class="main">▶ Putar</button><button id="bRec">⏺ Rekam video</button></div>
 <div class="row"><button id="bAi" class="main">🤖 Suara AI (Kokoro)</button><select id="sVoice" class="btn"></select></div>
 <div class="row"><button id="bMic">🎙 Rekam suara saya</button><label class="btn">📁 Pakai file suara<input id="fVo" type="file" accept="audio/*" hidden></label></div>
 <div class="row"><button id="bTts">🔊 Suara HP: mati</button><button id="bHd">Kualitas: 720p</button></div>
 <div id="status">Ketuk ▶ Putar untuk melihat animasi.</div>
 <div id="out"><video id="vid" controls playsinline></video><div class="row"><a id="dl" class="btn main">⬇ Simpan video</a><button id="bShare">↗ Bagikan</button></div></div>
</div>
<div id="prompter"><p class="hint">● Merekam. Bacakan pelan dan jelas, beri jeda sebentar di setiap titik.</p><div id="ptext"></div><button id="bStop">■ Selesai merekam</button></div>
<script>
// ===================== ENGINE v1 — SALIN PERSIS, JANGAN DIUBAH =====================
// ---------- dasar ----------
const W = 1080, H = 1920, TAU = Math.PI * 2, INK = '#221c22';
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a) * t, inv = (a, b, v) => clamp((v - a) / (b - a));
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, easeOut = t => 1 - Math.pow(1 - t, 3), easeIn = t => t * t * t;
const backOut = t => { const c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
const elastic = t => t <= 0 ? 0 : t >= 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - .75) * TAU / 3) + 1;
function kf(t, keys, fn = ease) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, v0] = keys[i], [t1, v1] = keys[i + 1];
    if (t <= t1) { const e = (keys[i + 1][2] || fn)(inv(t0, t1, t)); return Array.isArray(v0) ? v0.map((x, j) => lerp(x, v1[j], e)) : lerp(v0, v1, e); }
  }
  return keys[keys.length - 1][1];
}
function rng(seed) { let s = (seed * 9301 + 49297) >>> 0 || 1; return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; }; }
function shake(t, amp, freq = 1, seed = 0) { return [amp * (Math.sin(t * 13.1 * freq + seed) * .6 + Math.sin(t * 7.3 * freq + 1.3 + seed) * .4), amp * (Math.sin(t * 11.7 * freq + 2.1 + seed) * .6 + Math.sin(t * 5.9 * freq + .4 + seed) * .4)]; }
const handheld = (t, a = 4) => shake(t * .35, a, 1, 2);
const popIn = (t, t0, d = .35) => t < t0 ? 0 : backOut(clamp((t - t0) / d));
const hexA = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
// ---------- bentuk ----------
function circle(ctx, x, y, r) { ctx.beginPath(); ctx.arc(x, y, Math.max(.01, r), 0, TAU); }
function ellipse(ctx, x, y, rx, ry, rot = 0) { ctx.beginPath(); ctx.ellipse(x, y, Math.max(.001, rx), Math.max(.001, ry), rot, 0, TAU); }
function rrect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
function poly(ctx, pts, close = true) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); if (close) ctx.closePath(); }
function fs(ctx, fill, lw = 6, stroke = INK) { if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (lw > 0) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); } }
function line(ctx, x1, y1, x2, y2, lw, col = INK) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineWidth = lw; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke(); }
function text(ctx, str, x, y, size, fill = '#fff', stroke = INK, sw = 0, weight = 800, align = 'center') {
  ctx.font = `${weight} ${size}px Poppins, system-ui, sans-serif`; ctx.textAlign = align; ctx.textBaseline = 'middle';
  if (sw) { ctx.lineWidth = sw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.strokeText(str, x, y); }
  ctx.fillStyle = fill; ctx.fillText(str, x, y);
}
// ---------- kanvas & kamera ----------
let K = 720 / 1080;
const cv = document.getElementById('c'), out = cv.getContext('2d'), buf = document.createElement('canvas'), bctx = buf.getContext('2d');
function setRes(k) { K = k; cv.width = buf.width = Math.round(W * K); cv.height = buf.height = Math.round(H * K); }
function screen(ctx) { ctx.setTransform(K, 0, 0, K, 0, 0); }
// c = {x, y, z, r}: titik (x,y) dunia ada di tengah layar, z = zoom, r = miring. par < 1 = lapisan jauh (parallax)
function CAM(ctx, c = {}, par = 1) {
  const z = 1 + ((c.z || 1) - 1) * par, x = c.x ?? 540, y = c.y ?? 960;
  ctx.setTransform(K, 0, 0, K, 0, 0); ctx.translate(540, 960); ctx.rotate((c.r || 0) * par); ctx.scale(z, z); ctx.translate(-(540 + (x - 540) * par), -(960 + (y - 960) * par));
}
// ---------- DODI (karakter utama) ----------
const PAL_DODI = { head: '#eceaf2', head2: '#c3bfd3', hair: '#6a3a22', hair2: '#8f5737', top: '#d8392f', top2: '#a2261e', limb: '#4b2a1c', shoe: '#f5b91f', shoe2: '#c98a0b', face: '#1c2860', glass: '#1a171d' };
const CAST = {
  DODI: {},
  RINA: { pal: { top: '#2f7de1', top2: '#1f55a6', hair: '#1d1416', hair2: '#3b2b2e', shoe: '#ffffff', shoe2: '#c9cfdb' }, hair: 'long', glasses: false },
  BUDI: { pal: { top: '#3aa05a', top2: '#25723d', hair: '#151214', hair2: '#2f2729', shoe: '#e84a3c', shoe2: '#a6281c' }, hair: 'short', glasses: false },
  PAK: { pal: { top: '#6b5b95', top2: '#4a3d6e', hair: '#d9d6d2', hair2: '#f2f0ec', shoe: '#5a3a26', shoe2: '#3a2416', head: '#e6e3ea' }, hair: 'short', glasses: true },
};
function limbPts(ox, oy, sd, a1, a2, l1, l2) { const ex = ox + sd * Math.sin(a1) * l1, ey = oy + Math.cos(a1) * l1, b = a1 + a2; return [[ox, oy], [ex, ey], [ex + sd * Math.sin(b) * l2, ey + Math.cos(b) * l2], b]; }
function ik(sd, sx, sy, tx, ty, l1, l2, bend = 1) {
  const vx = tx - sx, vy = ty - sy; let d = Math.hypot(vx, vy); d = clamp(d, Math.abs(l1 - l2) + 1e-4, (l1 + l2) * .999);
  const at = Math.atan2(sd * vx, vy), al = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1)), be = Math.acos(clamp((l1 * l1 + l2 * l2 - d * d) / (2 * l1 * l2), -1, 1));
  return [at + bend * al, -bend * (Math.PI - be)];
}
function getPose(name, t = 0) {
  const s = Math.sin;
  const idle = { arms: { L: [.2, -.1], R: [.2, -.1] }, legs: { L: [.07, -.02], R: [.07, -.02] }, bob: s(t * 2.2) * .004 };
  switch (name) {
    case 'wave': return { ...idle, arms: { L: [.2, -.1], R: [2.55 + s(t * 10) * .25, .4] } };
    case 'point': return { ...idle, arms: { L: [.9, -2.1], R: [1.5, .05] } };
    case 'pointUp': return { ...idle, arms: { L: [.2, -.1], R: [2.85, .1] } };
    case 'cheer': return { arms: { L: [2.6 + s(t * 8) * .12, .25], R: [2.6 - s(t * 8) * .12, .25] }, legs: idle.legs, bob: -Math.abs(s(t * 8)) * .025 };
    case 'shock': return { arms: { L: [2.0, .9], R: [2.0, .9] }, legs: { L: [.22, -.05], R: [.22, -.05] } };
    case 'think': return { ...idle, front: 'R', arms: { L: [.55, -1.75], R: { ik: [.03, -.575], bend: -1 } } };
    case 'shrug': return { ...idle, arms: { L: [.75, 1.5], R: [.75, 1.5] } };
    case 'hips': return { arms: { L: [.95, -2.1], R: [.95, -2.1] }, legs: { L: [.15, -.03], R: [.15, -.03] } };
    case 'explain': return { ...idle, arms: { L: [.2, -.1], R: [1.0 + s(t * 3) * .15, 1.1] } };
    case 'hold': return { ...idle, arms: { L: { ik: [-.035, -.42] }, R: { ik: [.035, -.42] } } };
    case 'facepalm': return { ...idle, front: 'R', arms: { L: [.15, -.05], R: { ik: [.02, -.74], bend: -1 } } };
    case 'sad': return { arms: { L: [.08, -.02], R: [.08, -.02] }, legs: idle.legs, bob: .008 };
    case 'jump': return { arms: { L: [2.5, .4], R: [2.5, .4] }, legs: { L: [.5, -1.1], R: [.5, -1.1] } };
    case 'fall': return { arms: { L: [2.2 + s(t * 14) * .4, .6], R: [2.2 - s(t * 14) * .4, .6] }, legs: { L: [.4 + s(t * 12) * .3, -.4], R: [.4 - s(t * 12) * .3, -.4] } };
    case 'sit': return { side: true, arms: { L: [.35, .9], R: [.45, .9] }, legs: { L: [1.5, -1.5], R: [1.45, -1.5] } };
    case 'run': { const p = t * 13; return { side: true, lean: .16, bob: -Math.abs(s(p)) * .03, legs: { L: [s(p) * .85 + .1, -Math.max(0, s(p + 1.3)) * 1.5 - .1], R: [-s(p) * .85 + .1, -Math.max(0, -s(p + 1.3)) * 1.5 - .1] }, arms: { L: [-s(p) * .9, 1.4], R: [s(p) * .9, 1.4] } }; }
    case 'walk': { const p = t * 7; return { side: true, lean: .04, bob: -Math.abs(s(p)) * .012, legs: { L: [s(p) * .45 + .03, -Math.max(0, s(p + 1.3)) * .6], R: [-s(p) * .45 + .03, -Math.max(0, -s(p + 1.3)) * .6] }, arms: { L: [-s(p) * .5, .4], R: [s(p) * .5, .4] } }; }
    case 'stand': return { side: true, arms: { L: [.05, .15], R: [-.05, .15] }, legs: { L: [.05, -.02], R: [-.05, -.02] } };
    default: return idle;
  }
}
const FACES = {
  smile: { e: 'open', b: 'flat', m: 'smile' }, happy: { e: 'happy', b: 'up', m: 'grin' }, grin: { e: 'open', b: 'up', m: 'grin' },
  laugh: { e: 'happy', b: 'up', m: 'laugh' }, smug: { e: 'half', b: 'one', m: 'smirk' }, shock: { e: 'wide', b: 'high', m: 'O' },
  think: { e: 'open', b: 'one', m: 'hmm', look: [.6, -.7] }, angry: { e: 'angry', b: 'angry', m: 'teeth' }, sad: { e: 'open', b: 'worry', m: 'frown', look: [0, .6] },
  worried: { e: 'open', b: 'worry', m: 'wobble' }, neutral: { e: 'open', b: 'flat', m: 'flat' }, sleepy: { e: 'closed', b: 'flat', m: 'flat' },
  determined: { e: 'angry', b: 'angry', m: 'grin' }, wow: { e: 'wide', b: 'high', m: 'laugh' }, scared: { e: 'wide', b: 'worry', m: 'teeth' },
};
function drawDodi(ctx, o = {}) {
  const P = Object.assign({}, PAL_DODI, o.pal || {}), t = o.t || 0, s = o.s || 600, flip = o.flip || 1;
  const po = typeof o.pose === 'object' ? o.pose : getPose(o.pose || 'idle', t), base = getPose('idle', t);
  const side = !!po.side, arms = Object.assign({}, po.arms || base.arms, o.arms || {}), legs = Object.assign({}, po.legs || base.legs, o.legs || {});
  const back = o.view === 'back', turn = back ? 0 : (o.turn ?? (side ? 1 : 0));
  ctx.save(); ctx.translate(o.x ?? 540, o.y ?? 1650);
  if (o.alpha != null) ctx.globalAlpha *= o.alpha;
  if (o.shadow !== false) { const a = clamp(1 - (o.air || 0) / (s * .8)); ctx.save(); ctx.scale(s, s); ellipse(ctx, 0, 0, .1 + .12 * a, .02 + .016 * a); ctx.fillStyle = `rgba(30,20,50,${.08 + .16 * a})`; ctx.fill(); ctx.restore(); }
  ctx.translate(0, -(o.air || 0)); ctx.scale(s * flip, s * (o.squash || 1)); ctx.rotate((o.lean || 0) + (po.lean || 0)); ctx.translate(0, (po.bob || 0) + (o.bob || 0));
  const shade = (c, k) => { const n = parseInt(c.slice(1), 16), f = v => Math.round(v * k); return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`; };
  // kaki
  for (const [k, sd] of [['L', -1], ['R', 1]]) {
    const L = legs[k], sdd = side ? 1 : sd, far = side && k === 'L';
    const p = limbPts(side ? (k === 'L' ? -.012 : .012) : sd * .045, -.3, sdd, L[0], L[1], .15, .15);
    ctx.beginPath(); ctx.moveTo(...p[0]); ctx.lineTo(...p[1]); ctx.lineTo(...p[2]); ctx.lineWidth = .024; ctx.strokeStyle = far ? shade(P.limb, .75) : P.limb; ctx.lineCap = ctx.lineJoin = 'round'; ctx.stroke();
    const fx = p[2][0] + (side ? .028 : sd * .014), fy = p[2][1] - .008, rx = side ? .066 : .056, ry = side ? .032 : .034;
    const rot = side ? clamp(-(p[3]) * .5, -.6, .6) * 0 + (L[0] > 1.2 ? -.2 : 0) : 0;
    const g = ctx.createLinearGradient(0, fy - ry, 0, fy + ry); g.addColorStop(0, far ? shade(P.shoe, .82) : P.shoe); g.addColorStop(1, P.shoe2);
    ellipse(ctx, fx, fy, rx, ry, rot); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = .004; ctx.strokeStyle = 'rgba(80,50,0,.35)'; ctx.stroke();
    ellipse(ctx, fx - rx * .3, fy - ry * .45, rx * .35, ry * .25, -.2); ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fill();
  }
  // tangan
  const shY = -.505;
  const drawArm = (k, sd) => {
    const A = arms[k], sdd = side ? 1 : sd, ox = side ? (k === 'L' ? -.01 : .01) : sd * .098, far = side && k === 'L';
    const [a1, a2] = A.ik ? ik(sdd, ox, shY, A.ik[0], A.ik[1], .13, .125, A.bend || 1) : A;
    const p = limbPts(ox, shY, sdd, a1, a2, .13, .125);
    ctx.beginPath(); ctx.moveTo(...p[0]); ctx.lineTo(...p[1]); ctx.lineTo(...p[2]); ctx.lineWidth = .022; ctx.strokeStyle = far ? shade(P.limb, .75) : P.limb; ctx.lineCap = ctx.lineJoin = 'round'; ctx.stroke();
    if (o.hold && k === (o.holdHand || 'R')) o.hold(ctx, p[2][0], p[2][1], p[3] * sdd);
    circle(ctx, p[2][0], p[2][1], .027); ctx.fillStyle = far ? shade(P.limb, .75) : P.limb; ctx.fill();
    circle(ctx, p[2][0] - .008, p[2][1] - .009, .008); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fill();
  };
  if (side) drawArm('L', -1);
  // badan (hoodie)
  const tw = side ? .19 : .23;
  const tor = () => { ctx.beginPath(); ctx.roundRect(-tw / 2, -.565, tw, .29, [.1, .1, .07, .07]); };
  const g = ctx.createLinearGradient(-tw / 2, 0, tw / 2, 0); g.addColorStop(0, shade(P.top, 1.08)); g.addColorStop(.55, P.top); g.addColorStop(1, P.top2);
  tor(); ctx.fillStyle = g; ctx.fill();
  ctx.save(); tor(); ctx.clip();
  ctx.fillStyle = 'rgba(0,0,0,.13)'; ctx.fillRect(-tw, -.305, tw * 2, .04);
  ellipse(ctx, -tw * .22, -.47, .03, .07, .1); ctx.fillStyle = 'rgba(255,255,255,.16)'; ctx.fill();
  if (!back && !side) { rrect(ctx, -.075, -.37, .15, .065, .03); ctx.fillStyle = 'rgba(0,0,0,.07)'; ctx.fill(); ctx.lineWidth = .005; ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.stroke(); }
  ctx.restore();
  tor(); ctx.lineWidth = .005; ctx.strokeStyle = 'rgba(60,10,10,.35)'; ctx.stroke();
  if (back) { ellipse(ctx, 0, -.52, .095, .065); ctx.fillStyle = P.top2; ctx.fill(); ctx.lineWidth = .005; ctx.strokeStyle = 'rgba(60,10,10,.3)'; ctx.stroke(); }
  else {
    ellipse(ctx, turn * .02, -.556, side ? .08 : .098, .03); ctx.fillStyle = P.top2; ctx.fill();
    ellipse(ctx, turn * .03, -.553, .055, .015); ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fill();
    if (Math.abs(turn) < .6) for (const sd of [-1, 1]) { const x0 = sd * .028 + turn * .02; line(ctx, x0, -.545, x0 + sd * .004, -.465, .007, '#f4f0ea'); circle(ctx, x0 + sd * .004, -.462, .008); ctx.fillStyle = '#f4f0ea'; ctx.fill(); }
  }
  const fr = o.front || po.front; if (side) { if (fr !== 'R') drawArm('R', 1); } else { if (fr !== 'L') drawArm('L', -1); if (fr !== 'R') drawArm('R', 1); }
  // kepala
  const hx = 0, hy = -.745, rx = .145, ry = .18;
  ctx.save(); ctx.translate(0, hy + .14); ctx.rotate(o.tilt || 0); ctx.translate(0, -(hy + .14));
  const hairStyle = o.hair || 'wavy';
  if (hairStyle === 'long') { const hg = ctx.createLinearGradient(0, hy - .2, 0, hy + .25); hg.addColorStop(0, P.hair2); hg.addColorStop(1, P.hair); rrect(ctx, hx - .175 - turn * .03, hy - .12, .35, .37, [.08, .08, .1, .1]); ctx.fillStyle = hg; ctx.fill(); }
  const hgd = ctx.createRadialGradient(hx - .05 + turn * .03, hy - .08, .01, hx, hy, .21); hgd.addColorStop(0, '#fbfaff'); hgd.addColorStop(.55, P.head); hgd.addColorStop(1, P.head2);
  ellipse(ctx, hx, hy, rx, ry); ctx.fillStyle = hgd; ctx.fill();
  ctx.beginPath(); ctx.ellipse(hx, hy, rx - .007, ry - .007, 0, -.9, .9); ctx.lineWidth = .008; ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.stroke();
  ellipse(ctx, hx, hy, rx, ry); ctx.lineWidth = .005; ctx.strokeStyle = 'rgba(60,50,90,.3)'; ctx.stroke();
  drawHair(ctx, hx, hy, P, hairStyle, turn, back);
  if (!back) drawFace(ctx, hx, hy, rx, P, o, turn, t);
  if (o.acc) o.acc(ctx, hx, hy, turn);
  ctx.restore();
  if (fr) drawArm(fr, fr === 'L' ? -1 : 1);
  ctx.restore();
}
function drawHair(ctx, hx, hy, P, style, turn, back) {
  if (style === 'none') return;
  ctx.save(); ctx.translate(-turn * .025, 0);
  const g = ctx.createLinearGradient(hx - .1, hy - .25, hx + .12, hy - .02); g.addColorStop(0, P.hair2); g.addColorStop(1, P.hair);
  ctx.beginPath();
  if (back) {
    ctx.moveTo(hx - .158, hy + .03); ctx.bezierCurveTo(hx - .2, hy - .14, hx - .13, hy - .25, hx, hy - .24); ctx.bezierCurveTo(hx + .13, hy - .25, hx + .2, hy - .14, hx + .158, hy + .03);
    ctx.bezierCurveTo(hx + .1, hy + .07, hx + .05, hy + .03, hx, hy + .07); ctx.bezierCurveTo(hx - .05, hy + .03, hx - .1, hy + .07, hx - .158, hy + .03);
  } else if (style === 'short') {
    ctx.moveTo(hx - .152, hy - .03); ctx.bezierCurveTo(hx - .17, hy - .17, hx - .1, hy - .215, hx, hy - .212); ctx.bezierCurveTo(hx + .1, hy - .215, hx + .17, hy - .17, hx + .152, hy - .03);
    ctx.bezierCurveTo(hx + .13, hy - .09, hx + .1, hy - .12, hx + .05, hy - .125); ctx.lineTo(hx - .06, hy - .13); ctx.bezierCurveTo(hx - .11, hy - .12, hx - .14, hy - .09, hx - .152, hy - .03);
  } else {
    ctx.moveTo(hx - .16, hy + .02); ctx.bezierCurveTo(hx - .2, hy - .12, hx - .14, hy - .25, hx - .02, hy - .238); ctx.bezierCurveTo(hx + .1, hy - .25, hx + .2, hy - .16, hx + .165, hy);
    ctx.bezierCurveTo(hx + .15, hy - .06, hx + .12, hy - .1, hx + .08, hy - .105); ctx.bezierCurveTo(hx + .05, hy - .08, hx + .02, hy - .13, hx - .02, hy - .118);
    ctx.bezierCurveTo(hx - .06, hy - .108, hx - .09, hy - .15, hx - .12, hy - .09); ctx.bezierCurveTo(hx - .135, hy - .06, hx - .14, hy - .02, hx - .16, hy + .02);
  }
  ctx.closePath(); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = .005; ctx.strokeStyle = 'rgba(40,15,5,.4)'; ctx.stroke();
  ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(255,220,190,.28)'; ctx.lineWidth = .008;
  ctx.beginPath(); ctx.moveTo(hx - .1, hy - .2); ctx.quadraticCurveTo(hx - .02, hy - .235, hx + .07, hy - .2); ctx.stroke();
  if (!back && style === 'wavy') { ctx.beginPath(); ctx.moveTo(hx + .0, hy - .13); ctx.bezierCurveTo(hx + .035, hy - .1, hx + .04, hy - .07, hx + .015, hy - .07); ctx.lineWidth = .014; ctx.strokeStyle = P.hair; ctx.stroke(); }
  ctx.restore();
}
function drawFace(ctx, hx, hy, rx, P, o, turn, t) {
  const f = Object.assign({}, FACES.smile, typeof o.face === 'string' ? FACES[o.face] : (o.face || {}));
  const look = o.look || f.look || [0, 0], ey = hy - .005, cx = hx + turn * .065, C = P.face;
  const autoBlink = ((t * .27 + (o.seed || 0) * .37) % 1) < .035 ? 1 : 0, blink = o.blink ?? autoBlink;
  let lvl = 0; if (o.talk) lvl = voLevel(t);
  for (const sd of [-1, 1]) {
    const sx = 1 - Math.max(0, -sd * turn) * .55, x = cx + sd * .062 * (1 - Math.abs(turn) * .35), y = ey;
    ctx.save(); ctx.translate(x, y); ctx.scale(sx, 1);
    const e = f.e;
    ctx.lineCap = 'round'; ctx.strokeStyle = C; ctx.fillStyle = C;
    const dot = (r1, r2) => { const bl = (e === 'open' || e === 'wide') ? blink : 0; ellipse(ctx, look[0] * .014, look[1] * .012, r1, r2 * (1 - bl * .9)); ctx.fill(); if (bl < .5) { circle(ctx, look[0] * .014 - r1 * .35, look[1] * .012 - r2 * .38, r1 * .32); ctx.fillStyle = '#fff'; ctx.fill(); } };
    if (e === 'happy') { ctx.beginPath(); ctx.arc(0, .01, .02, Math.PI * 1.12, Math.PI * 1.88); ctx.lineWidth = .009; ctx.stroke(); }
    else if (e === 'closed') { ctx.beginPath(); ctx.arc(0, -.006, .018, .2 * Math.PI, .8 * Math.PI); ctx.lineWidth = .008; ctx.stroke(); }
    else if (e === 'wide') dot(.021, .025);
    else if (e === 'half') { ellipse(ctx, look[0] * .01, .004, .015, .011); ctx.fill(); line(ctx, -.022, -.006, .022, -.006, .008, C); }
    else if (e === 'angry') { dot(.016, .019); poly(ctx, [[-sd * .03 / sx, .0], [sd * .03 / sx, -.024], [sd * .03 / sx, -.05], [-sd * .03 / sx, -.05]]); ctx.fillStyle = P.head; ctx.fill(); line(ctx, -sd * .024, -.002, sd * .024, -.022, .008, C); }
    else dot(.015, .019);
    ctx.restore();
    // kacamata
    if (o.glasses !== false) {
      ctx.save(); ctx.translate(x, y); ctx.scale(sx, 1);
      circle(ctx, 0, 0, .048); ctx.fillStyle = 'rgba(255,255,255,.1)'; ctx.fill(); ctx.lineWidth = .0095; ctx.strokeStyle = P.glass; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-.022, -.03); ctx.lineTo(-.006, -.04); ctx.lineWidth = .006; ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.stroke();
      ctx.restore();
      if (sd * turn >= -.2) { const ex2 = x + sd * .048 * sx, edge = hx + sd * rx * .98 - turn * .02; if (Math.abs(edge - ex2) > .005) line(ctx, ex2, y - .01, edge, y - .02, .0075, P.glass); }
    }
    // alis
    const by = ey - .078, B = f.b; let i0 = 0, o0 = 0;
    if (B === 'up') { i0 = -.012; o0 = -.01; } else if (B === 'high') { i0 = -.024; o0 = -.02; } else if (B === 'angry') { i0 = .014; o0 = -.012; } else if (B === 'worry') { i0 = -.016; o0 = .006; } else if (B === 'one') { i0 = sd > 0 ? -.024 : 0; o0 = sd > 0 ? -.02 : .004; }
    ctx.beginPath(); ctx.moveTo(x - sd * .024 * sx, by + i0); ctx.quadraticCurveTo(x, by + Math.min(i0, o0) - .008, x + sd * .026 * sx, by + o0); ctx.lineWidth = .011; ctx.strokeStyle = C; ctx.lineCap = 'round'; ctx.stroke();
  }
  if (o.glasses !== false) { const xa = cx - .062 * (1 - Math.abs(turn) * .35) + .048 * (1 - Math.max(0, turn) * .55), xb = cx + .062 * (1 - Math.abs(turn) * .35) - .048 * (1 - Math.max(0, -turn) * .55); ctx.beginPath(); ctx.moveTo(xa, ey - .005); ctx.quadraticCurveTo((xa + xb) / 2, ey - .02, xb, ey - .005); ctx.lineWidth = .008; ctx.strokeStyle = P.glass; ctx.stroke(); }
  // mulut
  const mx = cx, my = hy + .085, ws = 1 - Math.abs(turn) * .3;
  ctx.save(); ctx.translate(mx, my); ctx.scale(ws, 1);
  let m = f.m; if (lvl > .08 && !['O', 'teeth'].includes(m)) m = 'talk';
  ctx.lineCap = ctx.lineJoin = 'round'; ctx.strokeStyle = C; ctx.lineWidth = .009;
  const inner = (path, sc = 1) => { path(); ctx.fillStyle = '#3a1630'; ctx.fill(); ctx.save(); path(); ctx.clip(); ctx.fillStyle = '#fff'; ctx.fillRect(-.07, -.03 * sc, .14, .022 * sc); ellipse(ctx, 0, .055 * sc, .03 * sc, .02 * sc); ctx.fillStyle = '#e8707e'; ctx.fill(); ctx.restore(); path(); ctx.stroke(); };
  if (m === 'smile') { ctx.beginPath(); ctx.arc(0, -.035, .042, .6, Math.PI - .6); ctx.stroke(); }
  else if (m === 'grin' || m === 'laugh') { const k = m === 'laugh' ? 1.25 : 1; inner(() => { ctx.beginPath(); ctx.moveTo(-.048 * k, -.01); ctx.quadraticCurveTo(0, .002, .048 * k, -.01); ctx.quadraticCurveTo(.042 * k, .06 * k, 0, .062 * k); ctx.quadraticCurveTo(-.042 * k, .06 * k, -.048 * k, -.01); ctx.closePath(); }, k); }
  else if (m === 'smirk' || m === 'teeth') {
    const path = m === 'smirk' ? () => { ctx.beginPath(); ctx.moveTo(-.055, -.004); ctx.quadraticCurveTo(0, .006, .056, -.022); ctx.quadraticCurveTo(.05, .034, 0, .038); ctx.quadraticCurveTo(-.05, .034, -.055, -.004); ctx.closePath(); } : () => { rrect(ctx, -.05, -.018, .1, .042, .016); };
    path(); ctx.fillStyle = '#fff'; ctx.fill(); ctx.save(); path(); ctx.clip(); ctx.lineWidth = .005; for (let i = -2; i <= 2; i++) line(ctx, i * .019, -.04, i * .019, .05, .005, C); line(ctx, -.06, .004, .06, .004, .005, C); ctx.restore(); ctx.lineWidth = .009; path(); ctx.stroke();
  }
  else if (m === 'O') { ellipse(ctx, 0, .01, .018, .025); ctx.fillStyle = '#3a1630'; ctx.fill(); ctx.stroke(); ellipse(ctx, 0, .025, .01, .007); ctx.fillStyle = '#e8707e'; ctx.fill(); }
  else if (m === 'talk') { const h = .008 + .03 * clamp(lvl); ellipse(ctx, 0, .004 + h * .3, .03, h); ctx.fillStyle = '#3a1630'; ctx.fill(); ctx.stroke(); ctx.save(); ellipse(ctx, 0, .004 + h * .3, .03, h); ctx.clip(); ctx.fillStyle = '#fff'; ctx.fillRect(-.04, .004 + h * .3 - h, .08, h * .45); ctx.restore(); }
  else if (m === 'hmm') { ctx.beginPath(); ctx.moveTo(-.024, .006); ctx.quadraticCurveTo(.004, -.008, .03, .004); ctx.stroke(); }
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(0, .035, .034, Math.PI + .65, -.65); ctx.stroke(); }
  else if (m === 'wobble') { ctx.beginPath(); ctx.moveTo(-.03, .004); for (let i = 1; i <= 6; i++) ctx.lineTo(-.03 + i * .01, .004 + (i % 2 ? -.006 : .004)); ctx.stroke(); }
  else { line(ctx, -.025, .002, .025, .002, .009, C); }
  ctx.restore();
}
// ---------- dunia (latar & properti) ----------
function sky(ctx, top = '#4fb3f0', bot = '#d9f2ff') { ctx.save(); screen(ctx); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function sky3(ctx, a, b, c) { ctx.save(); screen(ctx); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, a); g.addColorStop(.55, b); g.addColorStop(1, c); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function sun(ctx, x, y, r, t = 0, col = '#ffd23f', glow = 1) {
  const g = ctx.createRadialGradient(x, y, r * .5, x, y, r * 3.2); g.addColorStop(0, hexA('#fff6c8', .7 * glow)); g.addColorStop(1, 'rgba(255,240,180,0)'); ctx.fillStyle = g; ctx.fillRect(x - r * 3.3, y - r * 3.3, r * 6.6, r * 6.6);
  ctx.save(); ctx.translate(x, y); ctx.rotate(t * .15); ctx.fillStyle = hexA('#fff3b0', .35 * glow);
  for (let i = 0; i < 12; i++) { ctx.rotate(TAU / 12); poly(ctx, [[r * 1.15, -r * .1], [r * 2.1, 0], [r * 1.15, r * .1]]); ctx.fill(); }
  ctx.restore(); const d = ctx.createRadialGradient(x - r * .3, y - r * .3, r * .1, x, y, r); d.addColorStop(0, '#fffbe6'); d.addColorStop(1, col); circle(ctx, x, y, r); ctx.fillStyle = d; ctx.fill();
}
function cloud(ctx, x, y, s, seed = 1, a = 1) {
  const R = rng(seed), bumps = [[-1.1, .15, .45], [-.55, -.2, .62], [.1, -.38, .72], [.75, -.12, .55], [1.2, .18, .4]].map(([bx, by, br]) => [bx, by, br * (.85 + R() * .3)]);
  const shp = () => { ctx.beginPath(); bumps.forEach(([bx, by, br]) => { ctx.moveTo(x + (bx + br) * s, y + by * s); ctx.arc(x + bx * s, y + by * s, br * s, 0, TAU); }); ctx.rect(x - 1.3 * s, y + .05 * s, 2.6 * s, .38 * s); };
  ctx.save(); ctx.globalAlpha *= a; shp(); ctx.fillStyle = '#fff'; ctx.fill(); ctx.save(); shp(); ctx.clip(); const g = ctx.createLinearGradient(0, y - .2 * s, 0, y + .45 * s); g.addColorStop(0, 'rgba(160,190,230,0)'); g.addColorStop(1, 'rgba(150,180,225,.55)'); ctx.fillStyle = g; ctx.fillRect(x - 2 * s, y - s, 4 * s, 2 * s); ctx.restore(); ctx.restore();
}
function ground(ctx, y, c1 = '#86d35f', c2 = '#4f9f3a') { const g = ctx.createLinearGradient(0, y, 0, y + 900); g.addColorStop(0, c1); g.addColorStop(1, c2); ctx.fillStyle = g; ctx.fillRect(-3000, y, 7080, 4000); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(-3000, y, 7080, 6); }
function hill(ctx, cx, y, w, h, col = '#6cc04f') { ctx.beginPath(); ctx.ellipse(cx, y, w / 2, h, 0, Math.PI, 0); ctx.lineTo(cx + w / 2, y + 2000); ctx.lineTo(cx - w / 2, y + 2000); ctx.closePath(); const g = ctx.createLinearGradient(0, y - h, 0, y + 400); g.addColorStop(0, col); g.addColorStop(1, '#3d8a31'); ctx.fillStyle = g; ctx.fill(); }
function tree(ctx, x, y, s = 1, t = 0, col = '#4fae4c') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -18, -190, 36, 190, 10); ctx.fillStyle = '#7a4b2a'; ctx.fill();
  const sw = Math.sin(t * 1.3) * 4; [[-60, -230, 85], [55, -245, 90], [0, -310, 105]].forEach(([bx, by, r], i) => { const g = ctx.createRadialGradient(bx - r * .3 + sw, by - r * .4, r * .1, bx + sw, by, r); g.addColorStop(0, '#8fe07a'); g.addColorStop(1, col); circle(ctx, bx + sw * (i + 1) * .5, by, r); ctx.fillStyle = g; ctx.fill(); }); ctx.restore();
}
function bush(ctx, x, y, s = 1, col = '#4fae4c') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); [[-50, -40, 55], [10, -60, 70], [65, -35, 50]].forEach(([bx, by, r]) => { const g = ctx.createRadialGradient(bx - 15, by - 20, 5, bx, by, r); g.addColorStop(0, '#8fe07a'); g.addColorStop(1, col); circle(ctx, bx, by, r); ctx.fillStyle = g; ctx.fill(); }); ctx.restore(); }
function house(ctx, x, y, s = 1, wall = '#f6e3c1', roof = '#d8553f') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -170, -260, 340, 260, 6); fs(ctx, wall, 0); ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(60, -260, 110, 260);
  poly(ctx, [[-200, -250], [0, -420], [200, -250]]); fs(ctx, roof, 0); rrect(ctx, -40, -150, 80, 150, [40, 40, 0, 0]); fs(ctx, '#8a5530', 0);
  for (const wx of [-120, 70]) { rrect(ctx, wx, -210, 60, 60, 6); fs(ctx, '#bfe6ff', 6, '#fff'); } ctx.restore();
}
function city(ctx, baseY, seed = 3, col = '#8ea8cc', win = 'rgba(255,255,255,.55)') {
  const R = rng(seed); let x = -500;
  while (x < 1600) { const w = 120 + R() * 140, h = 250 + R() * 520; ctx.fillStyle = col; ctx.fillRect(x, baseY - h, w, h); ctx.fillStyle = win; for (let wy = baseY - h + 30; wy < baseY - 40; wy += 58) for (let wx = x + 22; wx < x + w - 30; wx += 44) if (R() > .35) ctx.fillRect(wx, wy, 20, 28); x += w + 8; }
}
function room(ctx, o = {}) {
  const fy = o.floorY ?? 1480, wall = o.wall || '#f1e4d3', floor = o.floor || '#c8905d';
  ctx.fillStyle = wall; ctx.fillRect(-2000, -2000, 5080, fy + 2000); ctx.fillStyle = 'rgba(0,0,0,.05)'; for (let x = -2000; x < 3080; x += 120) ctx.fillRect(x, -2000, 4, fy + 2000);
  const g = ctx.createLinearGradient(0, fy, 0, fy + 700); g.addColorStop(0, floor); g.addColorStop(1, '#7c5434'); ctx.fillStyle = g; ctx.fillRect(-2000, fy, 5080, 3000);
  ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 4; for (let i = -14; i <= 14; i++) { ctx.beginPath(); ctx.moveTo(540 + i * 90, fy); ctx.lineTo(540 + i * 260, fy + 1500); ctx.stroke(); }
  ctx.fillStyle = '#fff'; ctx.fillRect(-2000, fy - 34, 5080, 34); ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(-2000, fy - 6, 5080, 6);
  if (o.window !== false) { const wx = o.winX ?? 720, wy = o.winY ?? 520; rrect(ctx, wx - 170, wy - 210, 340, 420, 10); fs(ctx, '#ffffff', 0); const sg = ctx.createLinearGradient(0, wy - 190, 0, wy + 190); sg.addColorStop(0, o.winSky || '#62bdf2'); sg.addColorStop(1, '#d9f2ff'); rrect(ctx, wx - 150, wy - 190, 300, 380, 6); ctx.fillStyle = sg; ctx.fill(); line(ctx, wx, wy - 190, wx, wy + 190, 14, '#fff'); line(ctx, wx - 150, wy, wx + 150, wy, 14, '#fff'); }
  if (o.frame !== false) { const px = o.frameX ?? 260, py = o.frameY ?? 560; rrect(ctx, px - 110, py - 80, 220, 160, 8); fs(ctx, '#f7c948', 12, '#6b4a2b'); poly(ctx, [[px - 90, py + 60], [px - 20, py - 30], [px + 30, py + 30], [px + 60, py], [px + 90, py + 60]]); fs(ctx, '#58a85a', 0); }
}
function table(ctx, x, y, s = 1, col = '#a8693a') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (const lx of [-170, 150]) { rrect(ctx, lx, -230, 22, 230, 6); fs(ctx, '#7a4a28', 0); } rrect(ctx, -210, -260, 420, 40, 12); fs(ctx, col, 0); ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fillRect(-200, -258, 400, 8); ctx.restore(); }
function laptop(ctx, x, y, s = 1, scr) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -110, -150, 220, 140, 10); fs(ctx, '#3b3f4a', 0); rrect(ctx, -98, -140, 196, 120, 6); ctx.fillStyle = '#7fc8ff'; ctx.fill(); if (scr) { ctx.save(); rrect(ctx, -98, -140, 196, 120, 6); ctx.clip(); ctx.translate(-98, -140); scr(ctx, 196, 120); ctx.restore(); } poly(ctx, [[-135, -10], [135, -10], [150, 4], [-150, 4]]); fs(ctx, '#c9ced8', 0); ctx.restore(); }
function phone(ctx, x, y, s = 1, rot = 0, scr) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); rrect(ctx, -70, -140, 140, 280, 22); fs(ctx, '#1d1b22', 0); rrect(ctx, -62, -128, 124, 256, 16); ctx.fillStyle = '#eaf4ff'; ctx.fill(); if (scr) { ctx.save(); rrect(ctx, -62, -128, 124, 256, 16); ctx.clip(); ctx.translate(-62, -128); scr(ctx, 124, 256); ctx.restore(); } rrect(ctx, -20, -124, 40, 8, 4); ctx.fillStyle = '#1d1b22'; ctx.fill(); ctx.restore(); }
function board(ctx, x, y, w, h, title = '', col = '#ffffff') { rrect(ctx, x - w / 2 - 14, y - h / 2 - 14, w + 28, h + 28, 18); fs(ctx, '#5a5f6e', 0); rrect(ctx, x - w / 2, y - h / 2, w, h, 10); fs(ctx, col, 0); if (title) text(ctx, title, x, y - h / 2 + 60, 54, INK, INK, 0, 800); }
function arrow(ctx, x1, y1, x2, y2, p = 1, col = '#ff4d3d', w = 18, bend = 0) {
  if (p <= 0) return; const mx = (x1 + x2) / 2 - (y2 - y1) * bend, my = (y1 + y2) / 2 + (x2 - x1) * bend, q = (a, b, c, u) => (1 - u) * (1 - u) * a + 2 * (1 - u) * u * b + u * u * c;
  ctx.beginPath(); ctx.moveTo(x1, y1); const n = 24; for (let i = 1; i <= n * p; i++) ctx.lineTo(q(x1, mx, x2, i / n), q(y1, my, y2, i / n));
  const ex = q(x1, mx, x2, p), ey = q(y1, my, y2, p); ctx.lineTo(ex, ey); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  const u = Math.max(0, p - .04), a = Math.atan2(ey - q(y1, my, y2, u), ex - q(x1, mx, x2, u)); ctx.save(); ctx.translate(ex, ey); ctx.rotate(a); poly(ctx, [[w * 1.6, 0], [-w * .8, -w * 1.4], [-w * .8, w * 1.4]]); ctx.fillStyle = col; ctx.fill(); ctx.restore();
}
function bars(ctx, x, y, w, h, vals, p = 1, cols = ['#ff6b5a', '#ffc23d', '#4fc3f7', '#7bd88f']) { const n = vals.length, bw = w / n * .64, mx = Math.max(...vals); vals.forEach((v, i) => { const e = backOut(clamp(p * n - i)), bh = h * v / mx * clamp(e, 0, 1.2); rrect(ctx, x + i * w / n + (w / n - bw) / 2, y - bh, bw, bh, [12, 12, 0, 0]); fs(ctx, cols[i % cols.length], 0); }); line(ctx, x - 10, y, x + w + 10, y, 8, INK); }
function label(ctx, str, x, y, size = 60, bg = '#ffffff', fg = INK, sc = 1) {
  if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.font = `800 ${size}px Poppins, system-ui, sans-serif`; const w = ctx.measureText(str).width + size * .9, h = size * 1.45;
  ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 8; rrect(ctx, -w / 2, -h / 2, w, h, h / 2); ctx.fillStyle = bg; ctx.fill(); ctx.shadowColor = 'transparent'; text(ctx, str, 0, 2, size, fg); ctx.restore();
}
function icon(ctx, name, x, y, s = 1, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = ctx.lineJoin = 'round';
  const disc = (c) => { ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 6; circle(ctx, 0, 0, 70); ctx.fillStyle = c; ctx.fill(); ctx.shadowColor = 'transparent'; };
  switch (name) {
    case 'q': disc('#ffffff'); text(ctx, '?', 0, 6, 100, '#3a7bd5'); break;
    case 'ex': disc('#ffd23f'); text(ctx, '!', 0, 6, 100, INK); break;
    case 'check': disc('#3fbf6a'); poly(ctx, [[-32, 0], [-8, 26], [36, -24]], false); ctx.lineWidth = 18; ctx.strokeStyle = '#fff'; ctx.stroke(); break;
    case 'cross': disc('#e5483c'); line(ctx, -26, -26, 26, 26, 18, '#fff'); line(ctx, 26, -26, -26, 26, 18, '#fff'); break;
    case 'bulb': { const g = ctx.createRadialGradient(0, -20, 5, 0, -10, 90); g.addColorStop(0, 'rgba(255,240,150,.9)'); g.addColorStop(1, 'rgba(255,240,150,0)'); ctx.fillStyle = g; ctx.fillRect(-100, -120, 200, 200); circle(ctx, 0, -20, 46); fs(ctx, '#ffe04d', 0); rrect(ctx, -22, 22, 44, 34, 8); fs(ctx, '#9aa3b5', 0); break; }
    case 'heart': ctx.beginPath(); ctx.moveTo(0, 40); ctx.bezierCurveTo(-90, -20, -40, -80, 0, -35); ctx.bezierCurveTo(40, -80, 90, -20, 0, 40); fs(ctx, '#ff4d6a', 0); break;
    case 'coin': circle(ctx, 0, 0, 56); fs(ctx, '#ffcf3a', 8, '#c98f0b'); text(ctx, '$', 0, 4, 64, '#c98f0b'); break;
    case 'money': rrect(ctx, -80, -44, 160, 88, 10); fs(ctx, '#6fcf7a', 6, '#3d8f48'); circle(ctx, 0, 0, 24); fs(ctx, null, 6, '#3d8f48'); break;
    case 'clock': disc('#ffffff'); circle(ctx, 0, 0, 58); fs(ctx, null, 8, INK); line(ctx, 0, 0, 0, -38, 8); line(ctx, 0, 0, Math.cos(t * 4) * 30, Math.sin(t * 4) * 30, 8, '#e5483c'); break;
    case 'star': { const pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 28 : 64; pts.push([Math.cos(a) * r, Math.sin(a) * r]); } poly(ctx, pts); fs(ctx, '#ffd23f', 0); break; }
    case 'zzz': text(ctx, 'z', -20, 20, 50, '#6b7cff'); text(ctx, 'z', 10, -10, 66, '#6b7cff'); text(ctx, 'z', 44, -48, 82, '#6b7cff'); break;
    case 'fire': ctx.beginPath(); ctx.moveTo(0, -80); ctx.bezierCurveTo(60, -20, 60, 50, 0, 60); ctx.bezierCurveTo(-60, 50, -60, -20, 0, -80); fs(ctx, '#ff7a2f', 0); ctx.beginPath(); ctx.moveTo(0, -20); ctx.bezierCurveTo(30, 10, 30, 50, 0, 55); ctx.bezierCurveTo(-30, 50, -30, 10, 0, -20); fs(ctx, '#ffd23f', 0); break;
  }
  ctx.restore();
}
// ---------- efek ----------
function burst(ctx, x, y, r, n = 11, fill = '#ffd23a', seed = 5) { const R = rng(seed), pts = []; for (let i = 0; i < n * 2; i++) { const a = i / (n * 2) * TAU, rr = i % 2 ? r * .55 * (.85 + R() * .3) : r * (.8 + R() * .4); pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); } poly(ctx, pts); fs(ctx, fill, r * .06, '#fff'); }
function flash(ctx, a, col = '#fff') { if (a <= 0) return; ctx.save(); screen(ctx); ctx.globalAlpha = clamp(a); ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function sparkle(ctx, x, y, r, a = 1) { if (a <= 0 || r <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r); ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r); ctx.fillStyle = '#fff'; ctx.fill(); ctx.restore(); }
function puff(ctx, x, y, r, a = 1, col = '#f3efe6', seed = 3) { if (a <= 0) return; const R = rng(seed); ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); for (let i = 0; i < 6; i++) { const an = R() * TAU, d = r * (.3 + R() * .5), br = r * (.35 + R() * .3), bx = x + Math.cos(an) * d, by = y + Math.sin(an) * d * .7; ctx.moveTo(bx + br, by); ctx.arc(bx, by, br, 0, TAU); } ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
function sweat(ctx, x, y, s, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.moveTo(x, y - s); ctx.quadraticCurveTo(x + s * .7, y, x, y + s * .55); ctx.quadraticCurveTo(x - s * .7, y, x, y - s); fs(ctx, '#8fd8ff', 0); circle(ctx, x - s * .12, y + s * .05, s * .14); ctx.fillStyle = '#fff'; ctx.fill(); ctx.restore(); }
function speedLines(ctx, t, a = 1, cx = 540, cy = 900) { if (a <= 0) return; ctx.save(); screen(ctx); ctx.globalAlpha = a * .5; const R = rng(Math.floor(t * 20)); for (let i = 0; i < 40; i++) { const an = R() * TAU, r0 = 520 + R() * 300; line(ctx, cx + Math.cos(an) * r0, cy + Math.sin(an) * r0, cx + Math.cos(an) * 1500, cy + Math.sin(an) * 1500, 3 + R() * 8, '#fff'); } ctx.restore(); }
function motionLines(ctx, x, y, dir = -1, len = 140, n = 3, col = 'rgba(255,255,255,.8)') { for (let i = 0; i < n; i++) line(ctx, x, y + (i - (n - 1) / 2) * 34, x + dir * (len - i * 25), y + (i - (n - 1) / 2) * 34, 9, col); }
// ---------- waktu: kalimat & kata ----------
const TM = { sent: [], words: [], dur: 10, env: null, hop: .02, thr: 1 };
const wWeight = w => .11 + .052 * Math.max(1, w.replace(/[^\p{L}\p{N}]/gu, '').length);
function sentWords(i) { return REEL.script[i].trim().split(/\s+/); }
function estTiming() {
  let t = .3; TM.sent = []; TM.words = []; TM.env = null;
  REEL.script.forEach((str, si) => { const ws = sentWords(si), S = { s: t, words: [] }; ws.forEach(w => { const d = wWeight(w) * (REEL.speed || 1); const wd = { w, s: t, e: t + d, si }; S.words.push(wd); TM.words.push(wd); t += d; if (/[,;:]$/.test(w)) t += .2; }); S.e = t; TM.sent.push(S); t += .4; });
  TM.dur = t + .6;
}
function T(si, wi = 0) { const S = TM.sent[si]; if (!S) return TM.dur; const n = S.words.length; wi = wi < 0 ? n + wi : wi; return S.words[clamp(wi, 0, n - 1)].s; }
function TE(si, wi = -1) { const S = TM.sent[si]; if (!S) return TM.dur; const n = S.words.length; wi = wi < 0 ? n + wi : wi; return S.words[clamp(wi, 0, n - 1)].e; }
function voLevel(t) {
  if (TM.env) { const i = Math.floor(t / TM.hop); return clamp(((TM.env[i] || 0) - TM.thr) / (TM.thr * 5)); }
  const w = TM.words.find(w => t >= w.s && t < w.e); return w ? .35 + .5 * Math.abs(Math.sin((t - w.s) * 16)) : 0;
}
function analyzeVO(abuf) {
  const sr = abuf.sampleRate, n0 = abuf.length, chs = abuf.numberOfChannels, mono = new Float32Array(n0);
  for (let c = 0; c < chs; c++) { const d = abuf.getChannelData(c); for (let i = 0; i < n0; i++) mono[i] += d[i] / chs; }
  const hopS = Math.round(sr * .02), env = (data) => { const n = Math.floor(data.length / hopS), e = new Float32Array(n); for (let i = 0; i < n; i++) { let s = 0; for (let j = i * hopS; j < (i + 1) * hopS; j++) s += data[j] * data[j]; e[i] = Math.sqrt(s / hopS); } return e; };
  let E = env(mono); const sorted = Array.from(E).sort((a, b) => a - b), thr = Math.max(.006, sorted[Math.floor(sorted.length * .95)] * .14);
  const regions = (E) => { const r = []; let st = -1; for (let i = 0; i <= E.length; i++) { const v = i < E.length && E[i] > thr; if (v && st < 0) st = i; if (!v && st >= 0) { r.push([st * .02, i * .02]); st = -1; } } const m = []; r.forEach(x => { if (m.length && x[0] - m[m.length - 1][1] < .12) m[m.length - 1][1] = x[1]; else m.push(x); }); return m.filter(x => x[1] - x[0] > .05); };
  let R = regions(E); if (!R.length) throw new Error('Suara tidak terdeteksi');
  const a = Math.max(0, R[0][0] - .12), b = Math.min(n0 / sr, R[R.length - 1][1] + .3), i0 = Math.floor(a * sr), i1 = Math.floor(b * sr);
  const outB = new AudioBuffer({ length: i1 - i0, numberOfChannels: chs, sampleRate: sr }); for (let c = 0; c < chs; c++) outB.copyToChannel(abuf.getChannelData(c).slice(i0, i1), c);
  E = env(mono.slice(i0, i1)); R = regions(E);
  return { buf: outB, env: E, thr, regs: R, cut: a };
}
function alignVO(A, known) {
  const regs = A.regs, N = REEL.script.length, SW = REEL.script.map((_, i) => sentWords(i).reduce((s, w) => s + wWeight(w), 0)), tot = SW.reduce((a, b) => a + b, 0);
  const S0 = regs[0][0], S1 = regs[regs.length - 1][1], gaps = []; for (let i = 0; i < regs.length - 1; i++) gaps.push({ a: regs[i][1], b: regs[i + 1][0] });
  const M = N - 1, exp = []; let c = 0; for (let k = 0; k < M; k++) { c += SW[k]; exp.push(S0 + (S1 - S0) * c / tot); }
  let B = [];
  if (known) B = known.slice(0, M).map((k, i) => ({ a: k[1] - A.cut, b: known[i + 1][0] - A.cut }));
  else if (M > 0 && gaps.length >= M) {
    const G = gaps.length, sc = (k, g) => (gaps[g].b - gaps[g].a) * 4 - Math.abs((gaps[g].a + gaps[g].b) / 2 - exp[k]);
    const dp = [], bk = []; for (let k = 0; k < M; k++) { dp.push(new Array(G).fill(-1e9)); bk.push(new Array(G).fill(-1)); let best = -1e9, bi = -1; for (let g = 0; g < G; g++) { if (k === 0) dp[k][g] = sc(k, g); else { if (g - 1 >= 0 && dp[k - 1][g - 1] > best) { best = dp[k - 1][g - 1]; bi = g - 1; } if (bi >= 0) { dp[k][g] = best + sc(k, g); bk[k][g] = bi; } } } }
    let g = dp[M - 1].indexOf(Math.max(...dp[M - 1])); for (let k = M - 1; k >= 0; k--) { B[k] = gaps[g]; g = bk[k][g]; }
  } else B = exp.map(x => ({ a: x, b: x }));
  TM.sent = []; TM.words = [];
  for (let k = 0; k < N; k++) {
    const s0 = k ? B[k - 1].b : (known ? Math.max(0, known[0][0] - A.cut) : S0), s1 = k < M ? B[k].a : S1, segs = regs.map(r => [Math.max(r[0], s0), Math.min(r[1], s1)]).filter(r => r[1] - r[0] > .01);
    if (!segs.length) segs.push([s0, Math.max(s1, s0 + .2)]);
    const V = segs.reduce((a, r) => a + r[1] - r[0], 0), map = v => { for (const r of segs) { const L = r[1] - r[0]; if (v <= L) return r[0] + v; v -= L; } return segs[segs.length - 1][1]; };
    const ws = sentWords(k), S = { s: s0, e: s1, words: [] }; let acc = 0;
    ws.forEach(w => { const st = map(acc / SW[k] * V); acc += wWeight(w); const wd = { w, s: st, e: map(acc / SW[k] * V), si: k }; S.words.push(wd); TM.words.push(wd); });
    TM.sent.push(S);
  }
  TM.env = A.env; TM.thr = A.thr; TM.dur = Math.max(A.buf.duration, S1) + .5;
}
// ---------- teks layar (caption) ----------
let CH = [];
const capText = s => s.toLowerCase().replace(/[-–—]/g, ' ').replace(/[^\p{L}\p{N}% ]/gu, '').replace(/\s+/g, ' ').trim();
function buildChunks() {
  CH = []; let cur = null;
  TM.words.forEach((w, i) => { const prev = TM.words[i - 1]; const brk = !cur || cur.n >= 2 || (cur.text + ' ' + w.w).length > 13 || /[.,?!;:]$/.test(prev ? prev.w : '') || (prev && prev.si !== w.si); if (brk) { cur = { n: 1, text: w.w, s: w.s, e: w.e }; CH.push(cur); } else { cur.n++; cur.text += ' ' + w.w; cur.e = w.e; } });
  CH.forEach((c, i) => { const nx = CH[i + 1]; c.e = nx && nx.s - c.e < .5 ? nx.s : c.e + .25; let tx = capText(c.text); for (const [k, v] of Object.entries(REEL.captions || {})) tx = tx.replace(k.toLowerCase(), v); c.tx = tx; });
}
function drawCaption(ctx, t) {
  if (REEL.captionsOff) return; const c = CH.find(c => t >= c.s && t < c.e); if (!c || !c.tx) return;
  const sc = .82 + .18 * backOut(clamp((t - c.s) / .1)); ctx.save(); screen(ctx); ctx.translate(540, 1345); ctx.scale(sc, sc);
  ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 5; text(ctx, c.tx, 0, 0, 74, '#fff', '#111', 14, 800); ctx.shadowColor = 'transparent'; text(ctx, c.tx, 0, 0, 74, '#fff', '#111', 0, 800); ctx.restore();
}
// ---------- adegan & kompositor ----------
const SCENES = [], SFXQ = [];
function scene(o) { SCENES.push(o); }
function sfx(type, si, wi = 0, off = 0, gain = 1) { SFXQ.push({ type, si, wi, off, gain }); }
let SP = [];
function spans() { const st = SCENES.map((s, i) => i === 0 ? 0 : T(s.s, s.w || 0) + (s.off || 0)); SP = st.map((s, i) => [s, i < st.length - 1 ? Math.max(s + .1, st[i + 1]) : TM.dur]); }
let VIG = null;
function renderFrame(t) {
  let i = SP.findIndex(p => t >= p[0] && t < p[1]); if (i < 0) i = SP.length - 1;
  const sc = SCENES[i], [st, en] = SP[i], WT = .18; let dx = 0, blur = 0, fl = 0;
  if (sc.tr !== 'cut' && i < SCENES.length - 1 && t > en - WT && (SCENES[i].tr || 'whip') === 'whip') { const p = easeIn((t - (en - WT)) / WT); dx = -p * 420; blur = p * 260; }
  const pv = SCENES[i - 1]; if (pv && (pv.tr || 'whip') === 'whip' && t < st + WT) { const p = 1 - easeOut((t - st) / WT); dx = p * 420; blur = p * 260; }
  if (pv && pv.tr === 'flash') fl = 1 - clamp((t - st) / .3);
  bctx.setTransform(1, 0, 0, 1, 0, 0); bctx.globalAlpha = 1; bctx.filter = 'none'; bctx.fillStyle = '#000'; bctx.fillRect(0, 0, buf.width, buf.height);
  bctx.save(); try { sc.draw(bctx, t - st, t, en - st); } catch (e) { console.error(e); } bctx.restore();
  out.setTransform(1, 0, 0, 1, 0, 0); out.fillStyle = '#000'; out.fillRect(0, 0, cv.width, cv.height);
  const n = blur > 2 ? 5 : 1, bw = cv.width;
  for (let k = 0; k < n; k++) { const x = (dx + (n > 1 ? (k / (n - 1) - .5) * blur : 0)) * K; out.globalAlpha = 1 / (k + 1); out.drawImage(buf, x, 0); if (x > 0) out.drawImage(buf, x - bw, 0); if (x < 0) out.drawImage(buf, x + bw, 0); }
  out.globalAlpha = 1;
  if (!VIG || VIG.k !== K) { const g = out.createRadialGradient(540 * K, 900 * K, 500 * K, 540 * K, 960 * K, 1250 * K); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(10,5,20,.3)'); VIG = { k: K, g }; }
  out.fillStyle = VIG.g; out.fillRect(0, 0, cv.width, cv.height);
  flash(out, fl * .8);
  drawCaption(out, t);
}
// ---------- audio: musik & SFX disintesis ----------
let actx = null, master = null, recDest = null, VO = null, FX = null, srcs = [];
function ensureAudio() { if (actx) return; actx = new (window.AudioContext || window.webkitAudioContext)(); master = actx.createGain(); master.connect(actx.destination); recDest = actx.createMediaStreamDestination(); master.connect(recDest); }
function noiseBuf(oc, d = 1.5) { const b = oc.createBuffer(1, Math.ceil(oc.sampleRate * d), oc.sampleRate), x = b.getChannelData(0); for (let i = 0; i < x.length; i++) x[i] = Math.random() * 2 - 1; return b; }
const SFXLIB = {
  whoosh(oc, d, t, g) { const n = oc.createBufferSource(); n.buffer = noiseBuf(oc, .6); const f = oc.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.1; f.frequency.setValueAtTime(350, t); f.frequency.exponentialRampToValueAtTime(2400, t + .2); f.frequency.exponentialRampToValueAtTime(700, t + .45); const e = oc.createGain(); e.gain.setValueAtTime(0, t); e.gain.linearRampToValueAtTime(.9 * g, t + .17); e.gain.exponentialRampToValueAtTime(.001, t + .5); n.connect(f).connect(e).connect(d); n.start(t); n.stop(t + .55); },
  swish(oc, d, t, g) { const n = oc.createBufferSource(); n.buffer = noiseBuf(oc, .3); const f = oc.createBiquadFilter(); f.type = 'highpass'; f.frequency.setValueAtTime(1500, t); f.frequency.linearRampToValueAtTime(4000, t + .18); const e = oc.createGain(); e.gain.setValueAtTime(0, t); e.gain.linearRampToValueAtTime(.6 * g, t + .06); e.gain.exponentialRampToValueAtTime(.001, t + .24); n.connect(f).connect(e).connect(d); n.start(t); n.stop(t + .3); },
  thud(oc, d, t, g) { const o = oc.createOscillator(); o.frequency.setValueAtTime(130, t); o.frequency.exponentialRampToValueAtTime(42, t + .25); const e = oc.createGain(); e.gain.setValueAtTime(1.1 * g, t); e.gain.exponentialRampToValueAtTime(.001, t + .35); o.connect(e).connect(d); o.start(t); o.stop(t + .4); SFXLIB.tap(oc, d, t, g * .6); },
  impact(oc, d, t, g) { SFXLIB.thud(oc, d, t, g * 1.2); const n = oc.createBufferSource(); n.buffer = noiseBuf(oc, .5); const f = oc.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1400; const e = oc.createGain(); e.gain.setValueAtTime(.8 * g, t); e.gain.exponentialRampToValueAtTime(.001, t + .4); n.connect(f).connect(e).connect(d); n.start(t); n.stop(t + .45); },
  tap(oc, d, t, g) { const n = oc.createBufferSource(); n.buffer = noiseBuf(oc, .08); const f = oc.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1800; const e = oc.createGain(); e.gain.setValueAtTime(.7 * g, t); e.gain.exponentialRampToValueAtTime(.001, t + .06); n.connect(f).connect(e).connect(d); n.start(t); n.stop(t + .08); },
  ding(oc, d, t, g) { [[1568, .5], [3136, .18], [2350, .12]].forEach(([fr, a]) => { const o = oc.createOscillator(); o.type = 'sine'; o.frequency.value = fr; const e = oc.createGain(); e.gain.setValueAtTime(0, t); e.gain.linearRampToValueAtTime(a * g, t + .005); e.gain.exponentialRampToValueAtTime(.001, t + 1.3); o.connect(e).connect(d); o.start(t); o.stop(t + 1.4); }); },
  sparkle(oc, d, t, g) { [2637, 3136, 3951, 4699].forEach((fr, i) => { const o = oc.createOscillator(); o.frequency.value = fr; const e = oc.createGain(), tt = t + i * .06; e.gain.setValueAtTime(0, tt); e.gain.linearRampToValueAtTime(.18 * g, tt + .004); e.gain.exponentialRampToValueAtTime(.001, tt + .35); o.connect(e).connect(d); o.start(tt); o.stop(tt + .4); }); },
  rise(oc, d, t, g) { const n = oc.createBufferSource(); n.buffer = noiseBuf(oc, 1.2); const f = oc.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 2; f.frequency.setValueAtTime(300, t); f.frequency.exponentialRampToValueAtTime(3500, t + 1); const e = oc.createGain(); e.gain.setValueAtTime(.001, t); e.gain.exponentialRampToValueAtTime(.7 * g, t + .95); e.gain.exponentialRampToValueAtTime(.001, t + 1.1); n.connect(f).connect(e).connect(d); n.start(t); n.stop(t + 1.15); },
  step(oc, d, t, g) { const o = oc.createOscillator(); o.frequency.setValueAtTime(90, t); o.frequency.exponentialRampToValueAtTime(50, t + .08); const e = oc.createGain(); e.gain.setValueAtTime(.5 * g, t); e.gain.exponentialRampToValueAtTime(.001, t + .12); o.connect(e).connect(d); o.start(t); o.stop(t + .14); },
  cash(oc, d, t, g) { SFXLIB.ding(oc, d, t + .08, g * .7); SFXLIB.tap(oc, d, t, g); SFXLIB.tap(oc, d, t + .05, g); },
  buzz(oc, d, t, g) { const o = oc.createOscillator(); o.type = 'square'; o.frequency.value = 110; const f = oc.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 700; const e = oc.createGain(); e.gain.setValueAtTime(.25 * g, t); e.gain.setValueAtTime(.25 * g, t + .32); e.gain.exponentialRampToValueAtTime(.001, t + .4); o.connect(f).connect(e).connect(d); o.start(t); o.stop(t + .42); },
};
function music(oc) {
  if (REEL.music === false) return;
  const mood = REEL.music || 'ceria', vol = REEL.musicVol ?? .16, dur = TM.dur;
  const bus = oc.createGain(), lp = oc.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = mood === 'misteri' ? 1500 : 2600; bus.connect(lp).connect(oc.destination);
  bus.gain.setValueAtTime(0, 0); bus.gain.linearRampToValueAtTime(vol * .55, 1.2);
  TM.sent.forEach((S, i) => { const nx = TM.sent[i + 1], ge = nx ? nx.s : dur - 1.4; if (ge - S.e > .9 && S.e + .1 > 1.2) { bus.gain.setValueAtTime(vol * .55, S.e + .1); bus.gain.linearRampToValueAtTime(vol, S.e + .35); bus.gain.setValueAtTime(vol, ge - .3); bus.gain.linearRampToValueAtTime(vol * .55, ge - .1); } });
  bus.gain.setValueAtTime(vol * .55, Math.max(1.3, dur - 1.4)); bus.gain.linearRampToValueAtTime(0, dur);
  const cfg = mood === 'misteri' ? { bpm: 84, root: 220, prog: [[0, 3, 7], [-4, 0, 3], [-7, -4, 0], [-5, -1, 2]], pat: [0, 2, 1, 2, 0, 2, 1, 2] } : mood === 'tenang' ? { bpm: 76, root: 261.6, prog: [[0, 4, 7], [-3, 0, 4], [-7, -3, 0], [-5, -1, 2]], pat: [0, 1, 2, 3, 2, 1, 0, 1] } : { bpm: 104, root: 261.6, prog: [[0, 4, 7], [-3, 0, 4], [-7, -3, 0], [-5, -1, 2]], pat: [0, 1, 2, 1, 3, 1, 2, 1] };
  const beat = 60 / cfg.bpm, hz = st => cfg.root * Math.pow(2, st / 12);
  for (let bar = 0; bar * 4 * beat < dur; bar++) {
    const ch = cfg.prog[bar % 4], notes = [...ch, ch[0] + 12];
    for (let i = 0; i < 8; i++) { const t = bar * 4 * beat + i * beat / 2; if (t > dur) break; const o = oc.createOscillator(); o.type = 'triangle'; o.frequency.value = hz(notes[cfg.pat[i]]); const e = oc.createGain(); e.gain.setValueAtTime(0, t); e.gain.linearRampToValueAtTime(.32, t + .006); e.gain.exponentialRampToValueAtTime(.001, t + .42); o.connect(e).connect(bus); o.start(t); o.stop(t + .45); }
    for (const b of [0, 2]) { const t = bar * 4 * beat + b * beat; if (t > dur) break; const o = oc.createOscillator(); o.frequency.value = hz(ch[0] - 24); const e = oc.createGain(); e.gain.setValueAtTime(0, t); e.gain.linearRampToValueAtTime(.5, t + .02); e.gain.exponentialRampToValueAtTime(.001, t + beat * 1.8); o.connect(e).connect(bus); o.start(t); o.stop(t + beat * 2); }
  }
}
async function buildFX() {
  const sr = 44100, oc = new OfflineAudioContext(2, Math.ceil((TM.dur + .5) * sr), sr); music(oc);
  const bus = oc.createGain(); bus.gain.value = REEL.sfxVol ?? .38; bus.connect(oc.destination);
  SP.forEach((p, i) => { if (i > 0 && (SCENES[i - 1].tr || 'whip') === 'whip') SFXLIB.whoosh(oc, bus, Math.max(0, p[0] - .17), .8); });
  SFXQ.forEach(q => { const t = (typeof q.si === 'number' ? T(q.si, q.wi) : q.wi) + q.off; if (SFXLIB[q.type] && t >= 0) SFXLIB[q.type](oc, bus, t, q.gain); });
  return await oc.startRendering();
}
// ---------- pemutar, rekam suara, rekam video ----------
let playing = false, t0 = 0, tNow = 0, ttsOn = false, rec = null, recording = false, ttsTimers = [];
const $ = id => document.getElementById(id), status = m => { $('status').textContent = m; };
function stopSources() { srcs.forEach(s => { try { s.stop(); } catch (e) { } }); srcs = []; ttsTimers.forEach(clearTimeout); ttsTimers = []; if (window.speechSynthesis) speechSynthesis.cancel(); }
async function play() {
  ensureAudio(); await actx.resume(); if (!FX) { status('Menyiapkan musik & efek suara…'); FX = await buildFX(); }
  if (tNow >= TM.dur - .05) tNow = 0;
  const when = actx.currentTime + .08; t0 = when - tNow;
  for (const b of [FX, VO]) if (b) { const s = actx.createBufferSource(); s.buffer = b; s.connect(master); s.start(when, tNow); srcs.push(s); }
  if (ttsOn && !VO && window.speechSynthesis) TM.sent.forEach((S, i) => { if (S.s >= tNow) ttsTimers.push(setTimeout(() => { const u = new SpeechSynthesisUtterance(REEL.script[i]); u.lang = REEL.lang || 'id-ID'; u.rate = 1.05; speechSynthesis.speak(u); }, (S.s - tNow) * 1000 + 80)); });
  playing = true; $('bPlay').textContent = '⏸ Jeda'; status(recording ? '⏺ Merekam video… jangan tutup halaman.' : 'Memutar…');
}
function pause() { playing = false; stopSources(); $('bPlay').textContent = '▶ Putar'; }
function onEnd() { pause(); tNow = TM.dur; if (recording) { recording = false; setTimeout(() => rec && rec.state !== 'inactive' && rec.stop(), 350); } else status('Selesai. Ketuk ⏺ Rekam video untuk menyimpan MP4/WebM.'); }
async function recordVideo() {
  if (recording) return; if (!window.MediaRecorder || !cv.captureStream) { status('Browser ini tidak bisa merekam. Buka file di Google Chrome.'); return; }
  ensureAudio(); await actx.resume(); if (!FX) { status('Menyiapkan musik & efek suara…'); FX = await buildFX(); }
  pause(); tNow = 0;
  const ms = new MediaStream([...cv.captureStream(30).getVideoTracks(), ...recDest.stream.getAudioTracks()]);
  const mime = ['video/mp4;codecs=avc1.42E01E,mp4a.40.2', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'].find(m => MediaRecorder.isTypeSupported(m)) || '';
  const chunks = []; rec = new MediaRecorder(ms, mime ? { mimeType: mime, videoBitsPerSecond: K > .9 ? 12e6 : 8e6 } : {});
  rec.ondataavailable = e => e.data.size && chunks.push(e.data);
  rec.onstop = () => { if (wake) { wake.release(); wake = null; } const type = rec.mimeType || mime || 'video/webm', blob = new Blob(chunks, { type }), ext = type.includes('mp4') ? 'mp4' : 'webm', name = (REEL.file || 'reel') + '.' + ext, url = URL.createObjectURL(blob);
    $('vid').src = url; $('dl').href = url; $('dl').download = name; $('out').style.display = 'flex'; window._file = new File([blob], name, { type });
    status(`Video siap (${ext.toUpperCase()}, ${(blob.size / 1e6).toFixed(1)} MB). Ketuk ⬇ Simpan video.` + (ttsOn && !VO ? ' Catatan: suara HP tidak ikut terekam.' : '')); };
  rec.start(250); recording = true; try { wake = navigator.wakeLock && await navigator.wakeLock.request('screen'); } catch (e) { } await play();
}
async function setVoice(arrayBuf, known) {
  ensureAudio(); status('Membaca suara…');
  try { const ab = arrayBuf instanceof AudioBuffer ? arrayBuf : await actx.decodeAudioData(arrayBuf); const A = analyzeVO(ab); VO = A.buf; alignVO(A, known); buildChunks(); spans(); FX = null; tNow = 0; ttsOn = false; $('bTts').textContent = '🔊 Suara HP: mati'; $('bTts').classList.remove('on');
    status(`Suara dipakai: ${VO.duration.toFixed(1)} dtk, ${TM.sent.length} kalimat. Ketuk ▶ Putar untuk cek, lalu ⏺ Rekam video.`); }
  catch (e) { status('Gagal membaca suara: ' + e.message); }
}
const KOKORO_VOICES = { am_michael: 'Michael (pria US)', am_adam: 'Adam (pria US)', am_fenrir: 'Fenrir (pria US, berat)', am_puck: 'Puck (pria US, ceria)', af_heart: 'Heart (wanita US)', af_bella: 'Bella (wanita US)', af_nicole: 'Nicole (wanita US, lembut)', bm_george: 'George (pria UK)', bm_fable: 'Fable (pria UK)', bf_emma: 'Emma (wanita UK)' };
let kokoro = null, aiBusy = false;
async function aiVoice() {
  if (aiBusy) return; aiBusy = true; $('bAi').disabled = true; ensureAudio(); if (playing) pause();
  try {
    if (!kokoro) {
      status('Memuat mesin suara AI…');
      const { KokoroTTS } = await import('https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/dist/kokoro.web.js');
      kokoro = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'q8', device: 'wasm', progress_callback: p => { if (p.status === 'progress' && /onnx$/.test(p.file || '')) status(`Mengunduh suara AI (sekali, ±90 MB)… ${Math.round(p.progress || 0)}%`); } });
    }
    const voice = $('sVoice').value, parts = [];
    for (let i = 0; i < REEL.script.length; i++) { status(`Membuat suara AI… kalimat ${i + 1} dari ${REEL.script.length}`); const a = await kokoro.generate(REEL.script[i], { voice, speed: REEL.voiceSpeed || 1 }); parts.push(a); }
    const sr = parts[0].sampling_rate, lead = Math.round(sr * .15), gap = Math.round(sr * (REEL.voiceGap ?? .35)), total = lead + parts.reduce((n, p) => n + p.audio.length, 0) + gap * (parts.length - 1) + Math.round(sr * .4);
    const ab = new AudioBuffer({ length: total, numberOfChannels: 1, sampleRate: sr }), ch = ab.getChannelData(0), known = []; let o = lead;
    parts.forEach(p => { ch.set(p.audio, o); known.push([o / sr, (o + p.audio.length) / sr]); o += p.audio.length + gap; });
    await setVoice(ab, known);
  } catch (e) { console.error(e); status('Suara AI gagal: ' + (e.message || e) + '. Pastikan internet nyala dan buka lewat Chrome.'); }
  aiBusy = false; $('bAi').disabled = false;
}
let micRec = null;
async function startMic() {
  try { const st = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }); const ch = []; micRec = new MediaRecorder(st);
    micRec.ondataavailable = e => e.data.size && ch.push(e.data);
    micRec.onstop = async () => { st.getTracks().forEach(t => t.stop()); $('prompter').style.display = 'none'; const b = new Blob(ch, { type: micRec.mimeType }); await setVoice(await b.arrayBuffer()); };
    $('ptext').innerHTML = REEL.script.map(s => `<p>${s}</p>`).join(''); $('prompter').style.display = 'block'; micRec.start(); }
  catch (e) { status('Mikrofon tidak bisa dipakai di sini. Buka file ini di Chrome, atau pakai 📁 file suara.'); }
}
let lastTick = 0, wake = null;
function tick() {
  lastTick = performance.now();
  if (playing) { tNow = actx.currentTime - t0; if (tNow >= TM.dur) onEnd(); }
  renderFrame(Math.min(tNow, TM.dur - .001)); $('scrub').value = Math.round(tNow / TM.dur * 1000);
}
function loop() { tick(); requestAnimationFrame(loop); }
setInterval(() => { if (performance.now() - lastTick > 120) tick(); }, 40);
function START() {
  $('ttl').textContent = REEL.title || ''; document.title = REEL.title || 'Reel';
  setRes(720 / 1080); estTiming(); buildChunks(); spans();
  $('bPlay').onclick = () => playing ? pause() : play();
  $('bRec').onclick = recordVideo;
  const sv = $('sVoice'); for (const [k, v] of Object.entries(KOKORO_VOICES)) { const op = document.createElement('option'); op.value = k; op.textContent = '🗣 ' + v; sv.appendChild(op); } sv.value = KOKORO_VOICES[REEL.voice] ? REEL.voice : 'am_michael';
  $('bAi').onclick = aiVoice;
  $('bMic').onclick = startMic; $('bStop').onclick = () => micRec && micRec.state !== 'inactive' && micRec.stop();
  $('fVo').onchange = async e => { const f = e.target.files[0]; if (f) await setVoice(await f.arrayBuffer()); };
  $('bTts').onclick = () => { ttsOn = !ttsOn; $('bTts').textContent = ttsOn ? '🔊 Suara HP: nyala' : '🔊 Suara HP: mati'; $('bTts').classList.toggle('on', ttsOn); if (playing) pause(); };
  $('bHd').onclick = () => { setRes(K > .9 ? 720 / 1080 : 1); $('bHd').textContent = K > .9 ? 'Kualitas: 1080p' : 'Kualitas: 720p'; };
  $('scrub').oninput = e => { if (playing) pause(); tNow = e.target.value / 1000 * TM.dur; };
  $('bShare').onclick = async () => { try { if (window._file && navigator.canShare && navigator.canShare({ files: [window._file] })) await navigator.share({ files: [window._file], title: REEL.title }); else status('Bagikan tidak didukung, pakai ⬇ Simpan video.'); } catch (e) { } };
  const go = () => requestAnimationFrame(loop);
  (document.fonts && document.fonts.load ? Promise.race([document.fonts.load('800 74px Poppins'), new Promise(r => setTimeout(r, 2500))]) : Promise.resolve()).then(go, go);
  window.renderAt = t => renderFrame(t);
}
// ===================== AKHIR ENGINE =====================

</script>
<script>
// ===================== REEL — bagian ini yang ditulis ulang untuk tiap video =====================
const REEL = {
  title: 'Why is the sky blue?',
  file: 'why-is-the-sky-blue',
  lang: 'en-US',
  voice: 'am_michael',      // suara Kokoro (lihat daftar di SKILL.md)
  music: 'ceria',            // 'ceria' | 'misteri' | 'tenang' | false
  script: [
    'Ever wondered why the sky is blue?',
    'But sunlight is actually pure white.',
    'White light is a mix of every rainbow color.',
    'When it enters the air, it crashes into tiny air molecules.',
    'Blue light has short waves, so it scatters in every direction.',
    "That's why blue reaches you from all over the sky.",
    'But at sunset, light travels through much more air.',
    'The blue gets scattered away, leaving red and orange.',
    'So the sky is blue because air scatters blue light into your eyes.',
  ],
  captions: {},
};
const RAINBOW = ['#ff3b3b', '#ff8a1f', '#ffd400', '#3fcf5a', '#2f8cff', '#6a4bff'];
function park(ctx, t, cam, o = {}) {
  CAM(ctx, cam, .05); sky(ctx, o.top || '#3fa7ee', '#cfeeff');
  CAM(ctx, cam, .1); sun(ctx, 880, 300, 80, t);
  CAM(ctx, cam, .2); cloud(ctx, 220 + t * 8, 380, 110, 1); cloud(ctx, 820 + t * 5, 560, 80, 2);
  CAM(ctx, cam, .5); hill(ctx, 250, 1250, 1100, 260, '#7fcf5a'); hill(ctx, 950, 1290, 900, 200, '#74c653');
  CAM(ctx, cam, 1); ground(ctx, 1450); tree(ctx, 140, 1480, 1.3, t); bush(ctx, 940, 1470, 1.1);
}
function molecule(ctx, x, y, r, t, seed = 0) {
  const w = Math.sin(t * 3 + seed) * .15;
  for (const k of [-1, 1]) { const cx = x + k * r * .62 * Math.cos(w), cy = y + k * r * .62 * Math.sin(w); const g = ctx.createRadialGradient(cx - r * .35, cy - r * .35, r * .1, cx, cy, r); g.addColorStop(0, '#ffffff'); g.addColorStop(.4, '#9fd4ff'); g.addColorStop(1, '#3d7fd6'); circle(ctx, cx, cy, r); ctx.fillStyle = g; ctx.fill(); }
}
function wave(ctx, x0, x1, y, len, amp, ph, col, lw, p = 1) {
  ctx.beginPath(); const xe = lerp(x0, x1, p); for (let x = x0; x <= xe; x += 4) { const yy = y + Math.sin((x - x0) / len * TAU - ph) * amp; x === x0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); }
  ctx.lineWidth = lw; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke();
}

// 1. hook — Dodi bingung menatap langit
scene({ s: 0, draw(ctx, lt, t) {
  const hh = handheld(t, 3), cam = { x: 540 + hh[0], y: 900 + hh[1] - lt * 12, z: 1.02 + lt * .03 };
  park(ctx, t, cam);
  drawDodi(ctx, { x: 560, y: 1640, s: 860, t, pose: 'think', face: 'think', look: [.4, -.9], tilt: -.06 });
  icon(ctx, 'q', 820, 700 + Math.sin(t * 3) * 10, 1.2 * popIn(t, T(0, 2)), t);
} });
sfx('swish', 0, 2);
// 2. matahari ternyata putih
scene({ s: 1, draw(ctx, lt, t) {
  const hh = handheld(t, 3), cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1 + lt * .04 }, wt = inv(T(1, 5) - .1, T(1, 5) + .2, t);
  CAM(ctx, cam, .05); sky(ctx, '#2f95e6', '#bfe6ff');
  CAM(ctx, cam, .15); sun(ctx, 540, 560, 170 + 25 * wt, t, wt > .5 ? '#ffffff' : '#ffd23f', 1 + wt);
  if (wt > 0) { ctx.save(); ctx.globalAlpha = .45 * wt; poly(ctx, [[470, 650], [610, 650], [760, 1900], [320, 1900]]); const g = ctx.createLinearGradient(0, 650, 0, 1900); g.addColorStop(0, '#ffffff'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fill(); ctx.restore(); }
  CAM(ctx, cam, 1); ground(ctx, 1580, '#8fd668', '#5aa842');
  drawDodi(ctx, { x: 540, y: 1690, s: 780, t, pose: 'pointUp', face: { e: 'happy', b: 'up', m: wt > .5 ? 'O' : 'smile' }, tilt: -.05 });
  flash(ctx, (1 - inv(T(1, 5), T(1, 5) + .4, t)) * .7 * (t > T(1, 5) ? 1 : 0));
} });
sfx('ding', 1, 5);
// 3. prisma: putih = semua warna
scene({ s: 2, draw(ctx, lt, t) {
  const hh = handheld(t, 2), cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.04 - lt * .02 }, p = easeOut(inv(T(2, 0), T(2, 3), t));
  CAM(ctx, cam, .2); sky(ctx, '#1b2140', '#323e7a');
  CAM(ctx, cam, 1);
  ctx.save(); ctx.globalAlpha = .9; poly(ctx, [[-80, 640], [-80, 700], [500, 760], [500, 740]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore();
  const n = RAINBOW.length; RAINBOW.forEach((c, i) => { const a0 = 640 + i * 95, a1 = a0 + 95, xe = lerp(640, 1180, p); ctx.save(); ctx.globalAlpha = .9; poly(ctx, [[640, 770 + i * 8], [xe, lerp(770, a0, p)], [xe, lerp(778, a1, p)], [640, 778 + i * 8]]); ctx.fillStyle = c; ctx.fill(); ctx.restore(); });
  poly(ctx, [[560, 560], [700, 820], [420, 820]]); const pg = ctx.createLinearGradient(420, 560, 700, 820); pg.addColorStop(0, 'rgba(255,255,255,.75)'); pg.addColorStop(1, 'rgba(170,210,255,.4)'); ctx.fillStyle = pg; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.stroke();
  const shocked = t > T(2, 7);
  drawDodi(ctx, { x: 300, y: 1640, s: 700, t, pose: shocked ? 'shock' : 'point', face: shocked ? 'wow' : 'grin', look: [.6, -.4] });
  sparkle(ctx, 1000, 900, 50 * popIn(t, T(2, 7)), 1); sparkle(ctx, 880, 1080, 34 * popIn(t, T(2, 7) + .1), 1);
} });
sfx('sparkle', 2, 7);
// 4. cahaya menabrak molekul udara
scene({ s: 3, draw(ctx, lt, t) {
  const hit = T(3, 6), small = inv(T(3, 8), T(3, 10) + .2, t), sh = t > hit ? shake(t, 14 * (1 - inv(hit, hit + .4, t)), 3) : [0, 0];
  const cam = { x: 540 + sh[0], y: 960 + sh[1], z: 1 + lt * .03 };
  CAM(ctx, cam, .1); sky(ctx, '#62bdf5', '#2a78cc');
  const R = rng(4); for (let i = 0; i < 70; i++) { const x = (R() * 1300 + t * (20 + R() * 30)) % 1300 - 110, y = R() * 1900; circle(ctx, x, y, 3 + R() * 5); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fill(); }
  CAM(ctx, cam, 1);
  const mx = 650, my = 800, ms = lerp(95, 30, easeOut(small));
  const bp = inv(T(3, 2), hit, t), hx = lerp(-150, mx - ms, bp), hy = lerp(150, my - ms * .6, bp);
  if (bp > 0) RAINBOW.forEach((c, i) => line(ctx, -200 + i * 6, 120 + i * 9, hx + i * 2, hy + i * 5, 10, c));
  molecule(ctx, mx, my, ms, t);
  if (t > hit) { const k = inv(hit, hit + .35, t); burst(ctx, mx - ms, my - ms * .5, 120 * backOut(k) * (1 - k * .4), 10, '#fff36b'); }
  if (small > 0) for (let i = 0; i < 5; i++) molecule(ctx, 300 + i * 150 + Math.sin(i * 7) * 60, 520 + (i % 2) * 260, 26 * small, t, i);
  drawDodi(ctx, { x: 250, y: 1590, s: 600, t, pose: 'point', face: t > hit ? 'shock' : 'grin', look: [.7, -.6] });
  flash(ctx, t > hit ? (1 - inv(hit, hit + .25, t)) * .5 : 0);
} });
sfx('impact', 3, 6); sfx('swish', 3, 8);
// 5. gelombang biru pendek, mudah tersebar
scene({ s: 4, draw(ctx, lt, t) {
  const hh = handheld(t, 2), cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1 + lt * .02 };
  CAM(ctx, cam, .2); sky(ctx, '#16204a', '#25326e');
  CAM(ctx, cam, 1);
  const pr = easeOut(inv(T(4, 0) - .3, T(4, 0) + .6, t)), pb = easeOut(inv(T(4, 1), T(4, 3), t));
  wave(ctx, 140, 940, 520, 380, 55, t * 5, '#ff4a3d', 16, pr);
  const glow = .5 + .5 * Math.sin(t * 8);
  ctx.save(); ctx.shadowColor = '#5fb0ff'; ctx.shadowBlur = 20 + glow * 20; wave(ctx, 140, 940, 760, 110, 55, t * 9, '#4aa3ff', 18, pb); ctx.restore();
  const sp = inv(T(4, 7), T(4, 10), t);
  if (sp > 0) { molecule(ctx, 680, 1010, 42, t); for (let i = 0; i < 10; i++) { const a = i / 10 * TAU + .3, r0 = 70; arrow(ctx, 680 + Math.cos(a) * r0, 1010 + Math.sin(a) * r0, 680 + Math.cos(a) * (r0 + 190), 1010 + Math.sin(a) * (r0 + 190) * .85, easeOut(clamp(sp * 1.6 - i * .05)), '#4aa3ff', 10); } }
  drawDodi(ctx, { x: 230, y: 1590, s: 600, t, pose: 'explain', face: sp > 0 ? 'happy' : 'grin', look: [.8, -.6] });
} });
sfx('whoosh', 4, 7, 0, .6);
// 6. biru datang dari segala arah
scene({ s: 5, draw(ctx, lt, t) {
  const hh = handheld(t, 2), cam = { x: 540 + hh[0], y: 1000 + hh[1], z: 1 + lt * .05 };
  CAM(ctx, cam, .05); sky(ctx, '#1f7fe0', '#a9dcff');
  CAM(ctx, cam, .2); cloud(ctx, 200 + t * 6, 420, 90, 3, .9); cloud(ctx, 880 + t * 4, 300, 70, 4, .9);
  CAM(ctx, cam, 1); hill(ctx, 540, 1380, 1500, 230, '#7fcf5a');
  const head = [540, 1380 - .75 * 380];
  for (let i = 0; i < 16; i++) { const a = Math.PI + (i + .5) / 16 * Math.PI, ph = (t * .8 + i * .37) % 1, r = lerp(950, 120, ph), x = head[0] + Math.cos(a) * r, y = head[1] + Math.sin(a) * r * .9; const x2 = head[0] + Math.cos(a) * (r + 110), y2 = head[1] + Math.sin(a) * (r + 110) * .9; ctx.save(); ctx.globalAlpha = Math.sin(ph * Math.PI); ctx.shadowColor = '#bfe3ff'; ctx.shadowBlur = 16; line(ctx, x2, y2, x, y, 12, '#bfe4ff'); ctx.restore(); }
  const ch = t > T(5, 5);
  drawDodi(ctx, { x: 540, y: 1380, s: 380, t, pose: ch ? 'cheer' : 'idle', face: 'happy', look: [0, -1] });
} });
sfx('sparkle', 5, 5, 0, .7);
// 7. senja
scene({ s: 6, draw(ctx, lt, t) {
  const hh = handheld(t, 2), cam = { x: 540 + hh[0] + lt * 6, y: 960 + hh[1], z: 1.02 + lt * .02 }, dk = inv(T(6, 6), T(6, 8), t);
  CAM(ctx, cam, .05); sky3(ctx, '#3b2f7d', '#f0715a', '#ffc46b');
  ctx.save(); screen(ctx); ctx.fillStyle = `rgba(40,10,60,${dk * .25})`; ctx.fillRect(0, 0, W, H); ctx.restore();
  CAM(ctx, cam, .12); sun(ctx, 790, 1260, 150, t, '#ff8a3d', .9);
  CAM(ctx, cam, .25); ctx.save(); ctx.globalAlpha = .9; cloud(ctx, 260, 520, 120, 6); cloud(ctx, 900, 760, 80, 7); ctx.restore();
  CAM(ctx, cam, .6); ctx.beginPath(); ctx.moveTo(-300, 1330); ctx.quadraticCurveTo(540, 1250, 1400, 1360); ctx.lineTo(1400, 2400); ctx.lineTo(-300, 2400); ctx.closePath(); ctx.fillStyle = '#5a2f63'; ctx.fill();
  CAM(ctx, cam, 1); ctx.beginPath(); ctx.moveTo(-300, 1420); ctx.quadraticCurveTo(540, 1370, 1400, 1440); ctx.lineTo(1400, 2400); ctx.lineTo(-300, 2400); ctx.closePath(); ctx.fillStyle = '#3a2350'; ctx.fill();
  const gy = 1410, s = 540; rrect(ctx, 250, gy - .15 * s - 10, 260, .15 * s + 20, 30); ctx.fillStyle = '#b7834f'; ctx.fill(); ellipse(ctx, 510, gy - .075 * s + 5, 22, .085 * s); ctx.fillStyle = '#d9a76e'; ctx.fill();
  drawDodi(ctx, { x: 360, y: gy + .15 * s, s, t, pose: 'sit', face: 'smile', shadow: false });
} });
// 8. diagram: jalur panjang, biru habis
scene({ s: 7, draw(ctx, lt, t) {
  const hh = handheld(t, 2), cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1 + lt * .03 }, p = inv(T(7, 0) - .2, T(7, 5), t);
  CAM(ctx, cam, .1); sky(ctx, '#0b0f2a', '#1b2150');
  const R = rng(9); for (let i = 0; i < 60; i++) { circle(ctx, R() * 1080, R() * 1900, 2 + R() * 3); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fill(); }
  CAM(ctx, cam, 1);
  const ex = 600, ey = 2100, er = 1050, ar = 1230;
  circle(ctx, ex, ey, ar); ctx.fillStyle = 'rgba(90,170,255,.28)'; ctx.fill();
  circle(ctx, ex, ey, er); const eg = ctx.createRadialGradient(ex - 300, ey - 800, 100, ex, ey, er); eg.addColorStop(0, '#5fd17a'); eg.addColorStop(1, '#2b7a45'); ctx.fillStyle = eg; ctx.fill();
  sun(ctx, 40, 930, 70, t, '#fff2b0', .8);
  const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([lerp(110, 590, u), lerp(950, 1040, u)]); }
  const upto = Math.floor(p * 40);
  for (let i = 0; i < upto; i++) { const u = i / 40, c = u < .35 ? '#fffbe8' : u < .7 ? '#ffb347' : '#ff5a3a'; line(ctx, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], 18, c); }
  for (let k = 0; k < 5; k++) { const u = .2 + k * .12; if (p > u) { const a = clamp((p - u) * 4), [x, y] = pts[Math.floor(u * 40)]; arrow(ctx, x, y - 14, x - 20 + k * 6, y - 120 - k * 6, easeOut(a), '#4aa3ff', 9); } }
  drawDodi(ctx, { x: 600, y: 1052, s: 150, t, pose: 'wave', face: 'happy', flip: -1, shadow: false });
  const lr = popIn(t, T(7, 6)); if (lr > 0) { circle(ctx, 600, 1052 - .75 * 150, 90 * lr); ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(255,140,80,.9)'; ctx.stroke(); }
} });
sfx('swish', 7, 3); sfx('ding', 7, 6, 0, .7);
// 9. payoff
scene({ s: 8, tr: 'cut', draw(ctx, lt, t, d) {
  const hh = handheld(t, 3), cam = { x: 540 + hh[0], y: 920 + hh[1], z: 1.12 - easeOut(clamp(lt / d)) * .1 };
  park(ctx, t, cam, { top: '#2f95ea' });
  const end = t > T(8, 10);
  drawDodi(ctx, { x: 540, y: 1640, s: 860, t, pose: end ? 'cheer' : 'wave', face: end ? 'laugh' : 'happy', look: [0, -.2] });
  for (let i = 0; i < 6; i++) sparkle(ctx, 180 + i * 150, 420 + Math.sin(i * 2.3) * 160, 30 * popIn(t, T(8, 10) + i * .05) * (.6 + .4 * Math.sin(t * 6 + i)), 1);
} });
sfx('sparkle', 8, 10); sfx('ding', 8, -1, .3, .8);

</script>
<script>START();</script>
</body></html>
```
