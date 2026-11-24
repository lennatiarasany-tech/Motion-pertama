import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {ZONE} from '../theme';

/**
 * KAMERA "SLOW-MO DOLLY" untuk semua scene.
 * - fx  = titik dunia (x) yang ditaruh di tengah layar
 * - z   = zoom. Origin zoom = garis lantai, jadi kaki karakter tidak pernah terpotong
 *         dan dunia hanya "tumbuh" ke atas (headline tetap di zona teks).
 * - dur pendek  = gerak cepat (whip / punch-in)
 *   dur panjang = dorongan pelan ala slow-motion
 */
export type CamKey = {at: number; dur: number; fx: number; z: number};
export type CamState = {fx: number; z: number};

export const useDolly = (start: CamState, keys: CamKey[]): CamState => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  let {fx, z} = start;
  for (const k of keys) {
    const p = spring({frame: frame - k.at, fps, durationInFrames: k.dur, config: {damping: 200}});
    fx += (k.fx - fx) * p;
    z += (k.z - z) * p;
  }
  return {fx, z};
};

/** Getaran kamera singkat pada frame-frame benturan. */
export const useShake = (hits: number[], amp = 12, len = 12) => {
  const frame = useCurrentFrame();
  let x = 0;
  let y = 0;
  for (const h of hits) {
    const d = frame - h;
    if (d >= 0 && d < len) {
      const k = (1 - d / len) * amp;
      x += Math.sin(d * 2.7) * k;
      y += Math.cos(d * 3.3) * k * 0.6;
    }
  }
  return {x, y};
};

export const worldT = (fx: number, z: number) => `translate(${540 - fx * z} ${ZONE.floorY - ZONE.floorY * z}) scale(${z})`;

/**
 * Panggung: lapisan latar (paralaks lebih lambat + blur kedalaman saat zoom)
 * dan lapisan dunia (karakter & properti) dalam satu koordinat dunia 1080×1920.
 */
export const Stage: React.FC<{
  cam: CamState;
  room: React.ReactNode;
  children?: React.ReactNode;
  /** kekuatan blur latar per unit zoom */
  blur?: number;
  parallax?: number;
  shake?: {x: number; y: number};
  worldFilter?: string;
  roomFilter?: string;
}> = ({cam, room, children, blur = 8, parallax = 0.4, shake = {x: 0, y: 0}, worldFilter, roomFilter}) => {
  const zBg = 1 + (cam.z - 1) * parallax;
  const fxBg = 540 + (cam.fx - 540) * (0.4 + parallax);
  const b = Math.max(0, (cam.z - 1) * blur);
  return (
    <AbsoluteFill style={{transform: `translate(${shake.x}px, ${shake.y}px)`}}>
      <AbsoluteFill style={{filter: [`blur(${b}px)`, roomFilter].filter(Boolean).join(' ')}}>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <g transform={worldT(fxBg, zBg)}>{room}</g>
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{filter: worldFilter}}>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{overflow: 'visible'}}>
          <g transform={worldT(cam.fx, cam.z)}>{children}</g>
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Vinyet yang menguat saat kamera mendekat. */
export const Vignette: React.FC<{z: number; base?: number; dark?: boolean}> = ({z, base = 0.06, dark}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse at 50% 62%, rgba(22,38,56,0) 52%, rgba(${dark ? '5,10,18' : '22,38,56'},${base + (z - 1) * 0.35}) 100%)`,
      pointerEvents: 'none',
    }}
  />
);

/** Karakter di koordinat dunia. */
export const At: React.FC<{x: number; y?: number; s?: number; children: React.ReactNode}> = ({x, y = ZONE.floorY, s = 0.72, children}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>
);

/** Kilat putih singkat (dipakai saat punch-in / benturan). */
export const Flash: React.FC<{at: number; len?: number; max?: number}> = ({at, len = 8, max = 0.5}) => {
  const frame = useCurrentFrame();
  const d = frame - at;
  if (d < 0 || d > len) return null;
  return <AbsoluteFill style={{background: '#fff', opacity: max * (1 - d / len)}} />;
};

/**
 * Gradasi lembut di belakang ZONA TEKS: latar yang ikut naik saat kamera zoom
 * memudar di bawah headline, jadi teks tidak pernah tertimpa elemen latar.
 */
export const HeadScrim: React.FC<{dark?: boolean; until?: number}> = ({dark, until = 640}) => {
  const c = dark ? '22,38,56' : '230,238,250';
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(to bottom, rgba(${c},0.97) 0px, rgba(${c},0.92) ${until - 90}px, rgba(${c},0) ${until + 110}px)`,
        pointerEvents: 'none',
      }}
    />
  );
};
