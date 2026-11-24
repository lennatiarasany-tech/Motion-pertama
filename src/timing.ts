/** Durasi tiap scene dalam frame @30fps. Total 1650 frame = 55 detik. */
export const FPS = 30;
export const TRANSITION = 10; // crossfade antar-scene (frame)

// Disesuaikan dengan VO (public/vo.mp3, 63,2 dtk): tiap potongan scene jatuh di jeda kalimat.
export const SCENES = {
  s1Hook: 142,
  s2Setup: 241,
  s3BuruBuru: 236,
  s4Terbongkar: 262,
  s5Twist: 354,
  s6Solusi: 474,
  s7Cta: 211,
} as const;

export const TOTAL = Object.values(SCENES).reduce((a, b) => a + b, 0); // 1920 = 64 dtk

/**
 * Di dalam <TransitionSeries>, transisi memakan durasi dua scene yang bertemu.
 * Agar setiap scene tetap tampil penuh sesuai tabel, scene 1–6 ditambah TRANSITION frame.
 */
export const seqDur = (key: keyof typeof SCENES) => SCENES[key] + (key === 's7Cta' ? 0 : TRANSITION);
