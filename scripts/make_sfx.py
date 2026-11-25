"""Membuat efek suara sederhana (sintesis) ke public/sfx/*.wav.
Jalankan: python3 scripts/make_sfx.py
Boleh diganti kapan saja dengan file SFX sendiri bernama sama.
"""
import os, wave, numpy as np

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'sfx')
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)

def t(sec):
    return np.arange(int(SR * sec)) / SR

def env(n, a=0.005, d=None, curve=4.0):
    e = np.ones(n)
    na = max(1, int(SR * a))
    e[:na] = np.linspace(0, 1, na)
    rest = n - na
    e[na:] = np.exp(-curve * np.linspace(0, 1, rest))
    return e

def lp(x, cut):
    # low-pass satu kutub, cukup untuk mewarnai derau
    a = np.exp(-2 * np.pi * cut / SR)
    y = np.zeros_like(x); acc = 0.0
    for i, v in enumerate(x):
        acc = (1 - a) * v + a * acc; y[i] = acc
    return y

def save(name, x, gain=0.8):
    x = x / (np.max(np.abs(x)) + 1e-9) * gain
    pcm = (np.clip(x, -1, 1) * 32767).astype(np.int16)
    st = np.stack([pcm, pcm], axis=1).reshape(-1)
    with wave.open(os.path.join(OUT, name), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())

# POP — chip/kartu muncul: sinus dengan pitch turun cepat
tt = t(0.12)
f = 900 * np.exp(-tt * 28) + 380
x = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(tt), 0.002, curve=7)
save('pop.wav', x, 0.7)

# WHOOSH — transisi/kamera cepat: derau difilter dengan sapuan
tt = t(0.45)
n = rng.standard_normal(len(tt))
shape = np.sin(np.pi * np.linspace(0, 1, len(tt))) ** 2
x = lp(n, 900) * 0.6 + lp(n, 2600) * 0.4 * np.linspace(0.2, 1, len(tt))
save('whoosh.wav', x * shape, 0.55)

# SLOWMO — whoosh rendah dan panjang (masuk slow-motion)
tt = t(0.9)
n = rng.standard_normal(len(tt))
shape = np.sin(np.pi * np.linspace(0, 1, len(tt))) ** 1.5
x = lp(n, 350) + 0.4 * np.sin(2 * np.pi * np.cumsum(140 - 70 * np.linspace(0, 1, len(tt))) / SR)
save('slowmo.wav', x * shape, 0.6)

# DING — temuan di aplikasi: lonceng (harmonik tidak bulat, decay)
tt = t(1.0)
x = sum(a * np.sin(2 * np.pi * fr * tt) * np.exp(-tt * d) for fr, a, d in [(1318, 1, 4), (2637, .45, 6), (3520, .25, 9), (1975, .2, 5)])
save('ding.wav', x * env(len(tt), 0.002, curve=0.1), 0.55)

# ERROR — ❌ muncul: dua nada buzz turun
def buzz(fr, sec):
    tt = t(sec)
    return np.sign(np.sin(2 * np.pi * fr * tt)) * 0.5 + np.sin(2 * np.pi * fr * tt) * 0.5
x = np.concatenate([buzz(330, .11) * env(int(SR * .11), .003, curve=1), np.zeros(int(SR * .03)), buzz(247, .16) * env(int(SR * .16), .003, curve=2)])
save('error.wav', lp(x, 2500), 0.45)

# THUD — dus jatuh: sinus rendah + klik derau
tt = t(0.35)
x = np.sin(2 * np.pi * np.cumsum(110 * np.exp(-tt * 9) + 45) / SR) * env(len(tt), 0.001, curve=6)
x[:600] += rng.standard_normal(600) * np.linspace(1, 0, 600) * 0.6
save('thud.wav', x, 0.9)

# BOOM — twist (lampu mati): dentuman rendah panjang
tt = t(1.6)
x = np.sin(2 * np.pi * np.cumsum(70 * np.exp(-tt * 2) + 32) / SR) * env(len(tt), 0.01, curve=3)
x += lp(rng.standard_normal(len(tt)), 200) * env(len(tt), 0.01, curve=5) * 0.6
save('boom.wav', x, 0.75)

# TICK — jam dinding (dipakai pelan)
tt = t(0.03)
x = rng.standard_normal(len(tt)) * env(len(tt), 0.0005, curve=12)
save('tick.wav', lp(x, 4000), 0.35)

# SPARKLE — CTA/shield: arpeggio naik
notes = [1046, 1318, 1568, 2093]
x = np.concatenate([np.sin(2 * np.pi * fr * t(.09)) * env(int(SR * .09), .002, curve=3) for fr in notes] + [np.zeros(int(SR * .3))])
tail = np.sin(2 * np.pi * 2093 * t(len(x) / SR)) * 0
save('sparkle.wav', x + tail, 0.45)

# SCRIBBLE — tanda tangan cepat
tt = t(0.5)
n = rng.standard_normal(len(tt))
am = (np.sin(2 * np.pi * 9 * tt) > 0).astype(float) * 0.8 + 0.2
save('scribble.wav', lp(n, 3000) * am * np.sin(np.pi * np.linspace(0, 1, len(tt))), 0.35)

print('ok', sorted(os.listdir(OUT)))
