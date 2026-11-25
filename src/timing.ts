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

export const ORDER = ['s1Hook', 's2Setup', 's3BuruBuru', 's4Terbongkar', 's5Twist', 's6Solusi', 's7Cta'] as const;
export type SceneKey = (typeof ORDER)[number];
/** Awal tiap scene di timeline global (frame). */
export const START: Record<SceneKey, number> = (() => {
  const o = {} as Record<SceneKey, number>;
  let t = 0;
  for (const k of ORDER) {
    o[k] = t;
    t += SCENES[k];
  }
  return o;
})();
