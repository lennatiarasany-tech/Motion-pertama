import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// Poppins disimpan lokal di public/fonts (render tidak bergantung internet)
export const FONT = 'Poppins, "Noto Color Emoji", sans-serif';
for (const w of ['600', '700', '800']) {
  loadFont({family: 'Poppins', url: staticFile(`fonts/Poppins-${w}.woff2`), weight: w});
}

// A2 — palet seri (jangan pakai warna di luar ini untuk UI/teks)
export const C = {
  BG_LIGHT: '#E6EEFA',
  SKYLINE: '#DBE6F4',
  BG_DARK: '#162638',
  NAVY: '#19293B',
  BRAND_BLUE: '#2D64CF',
  ALERT_RED: '#DE5243',
  SUCCESS: '#22B573',
  HIGHLIGHT: '#FFD84D',
  CARD_WHITE: '#FFFFFF',
  KICKER: '#7A8BA6',
} as const;

// Warna khusus karakter & properti (turunan palet + warna kulit/benda)
export const CHAR = {
  skinOwner: '#E2A57E',
  skinOwnerShade: '#CF8F69',
  skinKaryawan: '#B47450',
  skinKaryawanShade: '#9C6141',
  skinKasir: '#EDB993',
  hair: '#1B1B22',
  coat: '#FDFDFD',
  coatShade: '#E3E9F2',
  pants: '#19293B',
  shoe: '#0F1A26',
  scrub: '#2E9C74',
  scrubShade: '#25835F',
  tee: '#9AA6B5',
  teeShade: '#86929F',
  cap: '#1F3A66',
  hijab: '#3F78DD',
  hijabShade: '#2D64CF',
  blush: '#F08C7E',
  box: '#C98A4B',
  boxShade: '#AC713A',
  boxTape: '#E3B27A',
  tree: '#C9E2D3',
  treeShade: '#B6D6C3',
  floor: '#D3DFEF',
  counter: '#1FA9A0',
  counterShade: '#188C85',
} as const;

// A4 — zona layout 1080×1920
export const W = 1080;
export const H = 1920;
export const ZONE = {
  text: {top: 220, bottom: 620},
  action: {top: 640, bottom: 1300},
  character: {top: 1000, bottom: 1700},
  floorY: 1700,
  subtitle: {top: 1720, bottom: 1860},
  marginX: 80,
} as const;

export const SPRING = {damping: 16, mass: 0.75} as const;
