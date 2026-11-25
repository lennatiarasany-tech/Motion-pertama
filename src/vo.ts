import {AT} from './voTiming';
import {START, SceneKey} from './timing';

/** Frame LOKAL scene saat kata `id` mulai diucapkan di VO (lihat src/voTiming.ts). */
export const at = (scene: SceneKey, id: string, offset = 0) => {
  const v = AT[id];
  if (v === undefined) throw new Error(`Kata VO tidak dikenal: ${id}`);
  return v - START[scene] + offset;
};
