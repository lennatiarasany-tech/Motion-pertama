/** Durasi tiap scene dalam frame @30fps. Total 1650 frame = 55 detik. */
export const FPS = 30;
export const TRANSITION = 10; // crossfade antar-scene (frame)

export const SCENES = {
  s1Hook: 120,
  s2Setup: 180,
  s3BuruBuru: 210,
  s4Terbongkar: 300,
  s5Twist: 270,
  s6Solusi: 390,
  s7Cta: 180,
} as const;

export const TOTAL = Object.values(SCENES).reduce((a, b) => a + b, 0); // 1650

/**
 * Di dalam <TransitionSeries>, transisi memakan durasi dua scene yang bertemu.
 * Agar setiap scene tetap tampil penuh sesuai tabel, scene 1–6 ditambah TRANSITION frame.
 */
export const seqDur = (key: keyof typeof SCENES) => SCENES[key] + (key === 's7Cta' ? 0 : TRANSITION);
