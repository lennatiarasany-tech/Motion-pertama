import React from 'react';
import {C, CHAR, FONT, ZONE} from '../theme';
import {Box} from './Props';

/**
 * GUDANG APOTEK — gaya flat sama dengan seri (palet BG_LIGHT/SKYLINE).
 * Rak besi, dus bertumpuk, jendela kecil tinggi dengan berkas cahaya,
 * garis kuning di lantai. Semua elemen dinding di bawah y=660.
 */
const RACK = '#9FB3CF';
const RACK_D = '#8299BA';

const Rack: React.FC<{x: number; w: number; top: number; seed: number; ed?: boolean}> = ({x, w, top, seed, ed}) => {
  const levels = 4;
  const h = ZONE.floorY - top;
  const lh = h / levels;
  const items: React.ReactNode[] = [];
  for (let l = 0; l < levels; l++) {
    let xx = x + 18;
    let i = 0;
    const base = top + lh * (l + 1) - 10;
    while (xx < x + w - 90) {
      const bw = 70 + ((seed + l * 3 + i * 5) % 3) * 18;
      const bh = lh * (0.52 + ((seed + l + i) % 3) * 0.1);
      items.push(
        <g key={`${l}-${i}`}>
          <rect x={xx} y={base - bh} width={bw} height={bh} rx={5} fill={(l + i) % 4 === 0 ? '#E8EEF7' : CHAR.box} />
          <rect x={xx} y={base - bh} width={bw} height={10} rx={4} fill={(l + i) % 4 === 0 ? '#D3DDEA' : CHAR.boxShade} />
          {ed && (l + i) % 3 === 1 && <rect x={xx + 8} y={base - bh * 0.5} width={bw * 0.55} height={14} rx={4} fill={C.ALERT_RED} opacity={0.85} />}
        </g>,
      );
      xx += bw + 10;
      i++;
    }
  }
  return (
    <g>
      {items}
      {Array.from({length: levels}).map((_, l) => (
        <rect key={l} x={x} y={top + lh * (l + 1) - 10} width={w} height={12} rx={3} fill={RACK} />
      ))}
      <rect x={x - 6} y={top} width={16} height={h} rx={4} fill={RACK_D} />
      <rect x={x + w - 10} y={top} width={16} height={h} rx={4} fill={RACK_D} />
    </g>
  );
};

export const Warehouse: React.FC<{frame: number; dim?: boolean}> = ({frame, dim}) => {
  const dust = Array.from({length: 18}).map((_, i) => {
    const t = frame / 30;
    const x = 760 - ((i * 53 + t * (8 + (i % 4) * 3)) % 420);
    const y = 900 + ((i * 97 + t * (14 + (i % 3) * 5)) % 760);
    return <circle key={i} cx={x} cy={y} r={2 + (i % 3)} fill="#FFFFFF" opacity={0.5} />;
  });
  return (
    <g>
      {/* dinding */}
      <rect x={-500} y={0} width={2080} height={ZONE.floorY} fill={C.BG_LIGHT} />
      <rect x={-500} y={980} width={2080} height={ZONE.floorY - 980} fill={C.SKYLINE} />
      {[1040, 1160, 1280, 1400, 1520, 1640].map((y) => (
        <rect key={y} x={-500} y={y} width={2080} height={3} fill="#CFDCEE" />
      ))}
      {/* jendela tinggi + berkas cahaya */}
      <rect x={720} y={800} width={200} height={110} rx={10} fill="#C9D8EC" />
      <rect x={732} y={812} width={176} height={86} rx={6} fill="#F4F8FD" />
      <rect x={816} y={812} width={8} height={86} fill="#C9D8EC" />
      <path d="M 732 898 L 908 898 L 640 1700 L 180 1700 Z" fill="#FFFFFF" opacity={dim ? 0.08 : 0.28} />
      {dust}
      {/* papan nama */}
      <g transform="translate(-20 840)">
        <rect width={330} height={78} rx={14} fill={C.NAVY} />
        <text x={165} y={52} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill="#FFFFFF" letterSpacing={2}>
          GUDANG OBAT
        </text>
      </g>
      {/* rak kiri & kanan */}
      <Rack x={-430} w={520} top={860} seed={1} ed />
      <Rack x={900} w={560} top={880} seed={4} ed />
      {/* lantai beton + garis kuning */}
      <rect x={-500} y={ZONE.floorY} width={2080} height={400} fill={CHAR.floor} />
      <rect x={-500} y={ZONE.floorY} width={2080} height={6} fill="#C6D5E9" />
      <rect x={-500} y={ZONE.floorY + 70} width={2080} height={10} fill={C.HIGHLIGHT} opacity={0.7} />
    </g>
  );
};

/** Tumpukan dus ED di atas palet (koordinat dunia). */
export const EdStack: React.FC<{x: number; skip?: number[]}> = ({x, skip = []}) => {
  const cells: [number, number, string?][] = [
    [-90, 0], [90, 0],
    [-80, 1, 'ED 4 BLN'], [95, 1],
    [-5, 2, 'ED 4 BLN'],
  ];
  return (
    <g>
      <rect x={x - 200} y={ZONE.floorY - 26} width={400} height={26} rx={4} fill="#B98A57" />
      <rect x={x - 190} y={ZONE.floorY - 12} width={60} height={12} fill="#8E6640" />
      <rect x={x - 30} y={ZONE.floorY - 12} width={60} height={12} fill="#8E6640" />
      <rect x={x + 130} y={ZONE.floorY - 12} width={60} height={12} fill="#8E6640" />
      {cells.map(([dx, row, label], i) =>
        skip.includes(i) ? null : <Box key={i} x={x + dx} y={ZONE.floorY - 26 - row * 120} label={label} />,
      )}
    </g>
  );
};
