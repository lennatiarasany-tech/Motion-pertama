"""Musik latar + SFX sintesis (bebas royalti) untuk video "Selisih Kasir Rp500 Ribu".

Jalankan dari folder proyek:  python3 audio/buat_audio.py
Hasil: assets/audio/musik.wav, assets/audio/sfx.wav (stem terpisah), assets/audio/mix.wav (musik + SFX, tanpa VO).
Musik dinormalkan ke ±-19 LUFS, SFX ke puncak ±-11 dBFS (aman ditumpuk VO di CapCut).
"""
import json, pathlib, subprocess, sys
import numpy as np

SR = 44100
DUR = 59.0
N = int(SR * DUR)
rng = np.random.default_rng(7)
ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets' / 'audio'
OUT.mkdir(parents=True, exist_ok=True)

# waktu kejadian dari scene.html (WAKTU + kata), lihat audio/waktu.json
W = json.loads((ROOT / 'audio' / 'waktu.json').read_text())
WK = W['W']


def hz(n):  # nomor MIDI -> Hz
    return 440.0 * 2 ** ((n - 69) / 12)


def tt(d):
    return np.arange(int(SR * d)) / SR


def lp(x, k):  # lowpass sederhana (rata-rata bergerak)
    if k <= 1:
        return x
    return np.convolve(x, np.ones(k) / k, mode='same')


def env(d, a=.005, r=None):
    t = tt(d)
    e = np.minimum(1, t / max(a, 1e-4))
    if r:
        e *= np.exp(-t / r)
    return e


def taruh(buf, sig, t0, g=1.0, pan=0.0):
    i = int(t0 * SR)
    if i >= len(buf):
        return
    s = sig[:len(buf) - i] * g
    L, R = np.sqrt((1 - pan) / 2), np.sqrt((1 + pan) / 2)
    buf[i:i + len(s), 0] += s * L * 1.414
    buf[i:i + len(s), 1] += s * R * 1.414


# ---------------------------------------------------------------- instrumen
def piano(n, d=1.6, v=1.0):
    t = tt(d); f = hz(n)
    s = sum(a * np.sin(2 * np.pi * f * h * t) * np.exp(-t * (2.2 + h * .9)) for h, a in [(1, 1), (2, .45), (3, .22), (4, .1)])
    return s * np.minimum(1, t / .004) * v * .5


def pluk(n, d=.45, v=1.0):
    t = tt(d); f = hz(n)
    s = np.sin(2 * np.pi * f * t) + .35 * np.sin(2 * np.pi * 2 * f * t) + .12 * np.sign(np.sin(2 * np.pi * f * t))
    return lp(s, 3) * np.exp(-t * 9) * np.minimum(1, t / .003) * v * .4


def pad(ns, d, v=1.0, att=.6):
    t = tt(d)
    s = sum(np.sin(2 * np.pi * hz(n) * t * (1 + dt)) for n in ns for dt in (-.003, .003))
    s = lp(s, 6) / (2 * len(ns))
    e = np.minimum(1, t / att) * np.minimum(1, (d - t) / .5)
    return s * e * v


def bas(n, d=.4, v=1.0):
    t = tt(d); f = hz(n)
    s = np.sin(2 * np.pi * f * t) + .25 * np.sin(2 * np.pi * 2 * f * t)
    return s * np.exp(-t * 4) * np.minimum(1, t / .01) * v * .7


def kick(v=1.0):
    t = tt(.35); f = 120 * np.exp(-t * 18) + 45
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * v


def clap(v=1.0):
    t = tt(.22); n = rng.standard_normal(len(t))
    n = n - lp(n, 8)
    return n * np.exp(-t * 22) * v * .35


def shaker(v=1.0):
    t = tt(.07); n = rng.standard_normal(len(t)); n = n - lp(n, 4)
    return n * np.exp(-t * 60) * v * .12


# ---------------------------------------------------------------- MUSIK
mus = np.zeros((N, 2))
# Bagian 1 (0–15): tegang — denyut bas A minor + motif piano staccato + pad gelap
bpm = 96; b = 60 / bpm
pola = [45, 45, 45, 48, 45, 45, 44, 43]
for i in range(int(15 / (b / 2))):
    t0 = i * b / 2
    taruh(mus, bas(pola[i % 8] - 12 + 12, .3, .55), t0)
for bar, ch in enumerate([[57, 60, 64], [57, 60, 65], [55, 59, 62], [56, 59, 64]] * 2):
    t0 = bar * b * 4
    if t0 > 15:
        break
    taruh(mus, pad([c - 12 for c in ch], b * 4 + .4, .55), t0)
    for k, n in enumerate([ch[0] + 12, ch[2] + 12, ch[1] + 12]):
        taruh(mus, piano(n, .5, .25), t0 + k * b * 1.33 + b * .5, pan=(-.3 if k % 2 else .3))
# Bagian 2 (15–25): makin sendu, lebih jarang
for bar, ch in enumerate([[57, 60, 64], [53, 57, 60], [55, 59, 62], [52, 56, 59]]):
    t0 = 15 + bar * 2.5
    taruh(mus, pad([c - 12 for c in ch], 2.9, .5), t0)
    for k, n in enumerate([ch[0], ch[1], ch[2], ch[1] + 12]):
        taruh(mus, piano(n + 12, 1.4, .3), t0 + k * .55, pan=(-.25 if k % 2 else .25))
# Bagian 3 (25.3–29): piano minor pelan (hening 0,3 dtk di 25)
for k, (n, d) in enumerate([(69, 1), (72, 1), (76, 1.4), (65, 1), (69, 1.6)]):
    taruh(mus, piano(n, 2.2, .35), 25.3 + k * .72)
taruh(mus, pad([45, 52, 57], 3.6, .35, 1.2), 25.3)
# Bagian 4 (29.3–59): cerah & optimis — C mayor I–V–vi–IV, 112 bpm
bpm = 112; b = 60 / bpm; t0 = 29.3
prog = [[48, 52, 55], [43, 47, 50], [45, 48, 52], [41, 45, 48]]
bar = 0
while t0 + bar * 4 * b < 58.2:
    ch = prog[bar % 4]; tb = t0 + bar * 4 * b
    taruh(mus, pad([c + 12 for c in ch], 4 * b + .2, .32, .2), tb)
    for q in range(4):
        taruh(mus, bas(ch[0], b * .9, .55), tb + q * b)
        taruh(mus, kick(.55), tb + q * b)
        if q in (1, 3):
            taruh(mus, clap(.6), tb + q * b, pan=.1)
    arp = [ch[0] + 24, ch[1] + 24, ch[2] + 24, ch[1] + 24]
    for e in range(8):
        taruh(mus, pluk(arp[e % 4] + (12 if e == 4 else 0), .4, .55), tb + e * b / 2, pan=(-.35 if e % 2 else .35))
        taruh(mus, shaker(.8), tb + e * b / 2 + b / 4, pan=.4)
    bar += 1
# akhir: akor penutup C mayor
taruh(mus, pad([60, 64, 67, 72], 1.8, .5, .05), 57.2)
for k, n in enumerate([72, 76, 79, 84]):
    taruh(mus, piano(n, 1.6, .35), 57.2 + k * .06)
# fade-out & dip (hening 25.0–25.3)
tg = np.arange(N) / SR
g = np.ones(N)
g *= np.clip((DUR - tg) / 1.2, 0, 1)
g *= np.where((tg > 24.85) & (tg < 25.3), .05, 1)
mus *= g[:, None]

# ---------------------------------------------------------------- SFX
sfx = np.zeros((N, 2))


def noise(d):
    return rng.standard_normal(int(SR * d))


def bass_hit():
    t = tt(1.1); f = 90 * np.exp(-t * 6) + 42
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3.5)
    return s + lp(noise(1.1), 20) * np.exp(-t * 30) * .5


def glitch(d=.45):
    s = np.zeros(int(SR * d)); i = 0
    while i < len(s):
        L = int(SR * rng.uniform(.012, .04)); f = rng.uniform(150, 1800)
        seg_ = np.sign(np.sin(2 * np.pi * f * tt(L / SR))) * rng.uniform(.2, .8)
        if rng.random() < .3:
            seg_ = noise(L / SR) * .4
        m = min(len(seg_), len(s) - i); s[i:i + m] = seg_[:m]; i += L
    return np.round(s * 6) / 6 * np.linspace(1, .3, len(s))


def klik():
    n = noise(.012); n = n - lp(n, 3)
    return n * np.exp(-tt(.012) * 400) * .8


def detik():
    t = tt(.03)
    return np.sin(2 * np.pi * 2200 * t) * np.exp(-t * 180) * .7


def lonceng(fs, d=1.4):
    t = tt(d)
    return sum(np.sin(2 * np.pi * f * t) * np.exp(-t * 3.2) + .3 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t * 6) for f in fs) / len(fs)


def whoosh(d=.45, v=1.0, cerah=1.0):
    n = noise(d); t = tt(d)
    e = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2
    lo = lp(n, 30); hi = n - lp(n, 6)
    k = np.clip(t / d, 0, 1)
    return (lo * (1 - k) * 2 + hi * k * .5 * cerah) * e * v


def buzzer():
    t = tt(.32)
    s = np.sign(np.sin(2 * np.pi * 98 * t)) + .5 * np.sign(np.sin(2 * np.pi * 104 * t))
    return lp(s, 10) * np.minimum(1, t / .01) * np.minimum(1, (.32 - t) / .05) * .35


def stamp():
    t = tt(.9); f = 70 * np.exp(-t * 10) + 40
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7)
    return s + lp(noise(.9), 6) * np.exp(-t * 25) * .9


def riser(d=1.1):
    t = tt(d); k = t / d
    sweep = np.sin(2 * np.pi * np.cumsum(200 + 1400 * k ** 2) / SR) * .35
    n = noise(d); n = n - lp(n, max(2, 1))
    return (sweep + lp(noise(d), 8) * .5 * (1 - k) + n * .25 * k) * k ** 2


def ting():
    return lonceng([1760, 2637], .6) * .8


def ui_klik():
    t = tt(.05)
    return np.sin(2 * np.pi * 1300 * t) * np.exp(-t * 90) * .6 + np.pad(klik(), (0, len(t) - len(klik()))) * .5


def keramaian(d):
    s = np.zeros(int(SR * d))
    for v in range(6):
        n = noise(d); bp = lp(n, 14) - lp(n, 60)
        am = .5 + .5 * np.sin(2 * np.pi * rng.uniform(1.5, 4) * tt(d) + rng.uniform(0, 6)) ** 2
        s += bp * am
    return s / 3 * np.minimum(1, tt(d) / .6) * np.minimum(1, (d - tt(d)) / .4)


def chime():
    s = np.zeros(int(SR * 1.8))
    for k, f in enumerate([1047, 1319, 1568, 2093]):
        b = lonceng([f], 1.8 - k * .09); i = int(k * .09 * SR); s[i:i + len(b)] += b[:len(s) - i] * .6
    return s


def sting():
    s = np.zeros(int(SR * 2.4))
    b = sum(np.sin(2 * np.pi * hz(n) * tt(2.4)) for n in (72, 76, 79, 84)) / 4 * np.exp(-tt(2.4) * 1.4) * np.minimum(1, tt(2.4) / .02)
    w = whoosh(.6, .8); s[:len(w)] += w
    return s + b * .8


# per adegan (sesuai storyboard)
taruh(sfx, bass_hit(), 0.0, 1.0)
taruh(sfx, glitch(.5), 0.05, .5)
taruh(sfx, glitch(.25), .6, .35)
for x in np.arange(4.5, 8.7, .19):  # klik keyboard
    if rng.random() < .8:
        taruh(sfx, klik(), x + rng.uniform(0, .07), .45, pan=-.3)
taruh(sfx, keramaian(3.2), 9.0, .55)
for k in range(28):  # ticker jam (timelapse)
    taruh(sfx, detik(), 9.2 + k * .085, .25 + .1 * (k % 2), pan=.3)
taruh(sfx, whoosh(.35, .7), 12.15)
taruh(sfx, lonceng([880, 932]), 13.75, .7)  # "ding" sumbang
taruh(sfx, glitch(.3), 13.8, .3)
for k, m in enumerate([15.5, 17.4, 19.3]):
    taruh(sfx, whoosh(.3, .5), m - .05, pan=-.2)
    taruh(sfx, buzzer(), m + 1.1, .6)
for k in range(18):
    taruh(sfx, detik(), 21.05 + k * .1, .3)
taruh(sfx, stamp(), 23.0, 1.0)
taruh(sfx, whoosh(.9, .4), 25.3)  # angin pelan
for k in range(4):  # tangan menaruh uang (kertas)
    taruh(sfx, lp(noise(.12), 3) * np.exp(-tt(.12) * 25) * .4, 25.55 + k * .4, pan=(-.4 if k % 2 == 0 else .4))
taruh(sfx, riser(1.1), 28.15, .7)
taruh(sfx, whoosh(.6, 1.2, 1.4), 29.05)  # whoosh besar
for c in ('c1', 'c2', 'c3', 'c4'):
    taruh(sfx, ting(), WK[c] + .15, .7)
taruh(sfx, ui_klik(), 43.0, .8)
for k in range(5):  # scroll
    taruh(sfx, detik() * .6, 43.6 + k * .07, .3)
for x in (W['sh'], W['be'], W['si']):
    taruh(sfx, ting(), x, .55)
taruh(sfx, chime(), 49.9, .8)
taruh(sfx, sting(), 52.8, .8)
taruh(sfx, ui_klik(), 55.45, .9)
# transisi
for T, j in [(WK['s2'], 'whip'), (WK['s3'], 'wipe'), (WK['s4'], 'zoom'), (WK['s5'], 'wipe'), (WK['s6'], 'wipe'), (WK['s8'], 'zoom'), (WK['s9'], 'wipe'), (WK['s10'], 'whip'), (WK['s11'], 'wipe')]:
    taruh(sfx, whoosh(.4, .55 if j != 'zoom' else .45, 1.2), T - .22, pan=(.3 if j == 'wipe' else -.2))


# ---------------------------------------------------------------- tulis + normalisasi
def tulis(buf, path):
    x = np.clip(buf / max(1e-9, np.abs(buf).max()) * .9, -1, 1)
    import wave
    with wave.open(str(path), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype('<i2').tobytes())


tulis(mus, OUT / '.musik-mentah.wav')
tulis(sfx, OUT / '.sfx-mentah.wav')
ff = 'ffmpeg'
# musik: -19 LUFS (dua tahap loudnorm sederhana) + sedikit reverb
subprocess.run([ff, '-y', '-loglevel', 'error', '-i', str(OUT / '.musik-mentah.wav'), '-af',
                'aecho=0.8:0.6:60|120:0.18|0.1,loudnorm=I=-19:TP=-3:LRA=11', '-ar', str(SR), str(OUT / 'musik.wav')], check=True)
# SFX: puncak -11 dBFS
subprocess.run([ff, '-y', '-loglevel', 'error', '-i', str(OUT / '.sfx-mentah.wav'), '-af', 'aecho=0.8:0.5:40:0.12,volume=-11dB',
                str(OUT / '.sfx-tmp.wav')], check=True)
r = subprocess.run([ff, '-i', str(OUT / '.sfx-tmp.wav'), '-af', 'volumedetect', '-f', 'null', '-'], capture_output=True, text=True).stderr
peak = float([l for l in r.splitlines() if 'max_volume' in l][0].split(':')[1].split()[0])
subprocess.run([ff, '-y', '-loglevel', 'error', '-i', str(OUT / '.sfx-tmp.wav'), '-af', f'volume={-11 - peak}dB', str(OUT / 'sfx.wav')], check=True)
subprocess.run([ff, '-y', '-loglevel', 'error', '-i', str(OUT / 'musik.wav'), '-i', str(OUT / 'sfx.wav'), '-filter_complex',
                'amix=inputs=2:normalize=0,alimiter=limit=0.89', '-t', str(DUR), str(OUT / 'mix.wav')], check=True)
for f in ('.musik-mentah.wav', '.sfx-mentah.wav', '.sfx-tmp.wav'):
    (OUT / f).unlink()
print('selesai ->', OUT / 'mix.wav')
