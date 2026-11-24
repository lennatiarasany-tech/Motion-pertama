import React from 'react';
import {C, CHAR, FONT, ZONE} from '../theme';

/**
 * Interior apotek — gaya flat yang sama dengan latar luar (BG_LIGHT + SKYLINE),
 * jendela menampilkan skyline + pohon supaya tetap senada dengan seri.
 * Semua elemen dinding berada di bawah y=820 supaya tidak menimpa zona teks.
 * Digambar lebih lebar dari layar (-400..1480) agar aman saat kamera bergerak.
 */
const MED = [C.BRAND_BLUE, '#FFFFFF', C.ALERT_RED, C.SUCCESS, C.HIGHLIGHT, '#8FB0E8'];

const Shelf: React.FC<{x: number; y: number; w: number; h: number}> = ({x, y, w, h}) => {
  const rows = 4;
  const rh = h / rows;
  const items: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    let xx = x + 16;
    let i = 0;
    while (xx < x + w - 40) {
      const bw = 26 + ((r * 7 + i * 13) % 4) * 8;
      const bh = rh * (0.5 + ((r + i * 3) % 3) * 0.12);
      items.push(
        <rect
          key={`${r}-${i}`}
          x={xx}
          y={y + rh * (r + 1) - 12 - bh}
          width={bw}
          height={bh}
          rx={4}
          fill={MED[(r * 2 + i) % MED.length]}
          opacity={0.75}
        />,
      );
      xx += bw + 6;
      i++;
    }
  }
  return (
    <g>
      <rect x={x - 10} y={y - 14} width={w + 20} height={h + 24} rx={12} fill="#C9D8EC" />
      <rect x={x} y={y} width={w} height={h} rx={6} fill="#EEF3FB" />
      {items}
      {Array.from({length: rows}).map((_, r) => (
        <rect key={r} x={x} y={y + rh * (r + 1) - 12} width={w} height={12} fill="#C9D8EC" />
      ))}
    </g>
  );
};

export const PharmacyRoom: React.FC<{frame: number; doorOpen?: number}> = ({frame, doorOpen = 0}) => {
  const hand = (frame / 30) * 6; // jarum detik
  return (
    <g>
      {/* dinding */}
      <rect x={-400} y={0} width={1880} height={ZONE.floorY} fill={C.BG_LIGHT} />
      <rect x={-400} y={1340} width={1880} height={ZONE.floorY - 1340} fill={C.SKYLINE} />
      <rect x={-400} y={1334} width={1880} height={10} fill="#C9D8EC" />

      {/* papan nama apotek */}
      <g transform="translate(-40 840)">
        <rect x={0} y={0} width={500} height={84} rx={42} fill={CHAR.counter} />
        <rect x={34} y={22} width={40} height={40} rx={8} fill="#FFFFFF" />
        <rect x={49} y={28} width={10} height={28} rx={3} fill={CHAR.counter} />
        <rect x={40} y={37} width={28} height={10} rx={3} fill={CHAR.counter} />
        <text x={96} y={56} fontFamily={FONT} fontWeight={800} fontSize={36} fill="#FFFFFF" letterSpacing={1}>
          APOTEK SEHAT
        </text>
      </g>
      {/* rak obat di belakang kasir */}
      <Shelf x={-60} y={950} w={540} h={380} />

      {/* jendela dengan skyline (senada latar luar) */}
      <g>
        <rect x={530} y={930} width={330} height={290} rx={18} fill="#C9D8EC" />
        <rect x={544} y={944} width={302} height={262} rx={10} fill="#F4F8FD" />
        <clipPath id="win">
          <rect x={544} y={944} width={302} height={262} rx={10} />
        </clipPath>
        <g clipPath="url(#win)">
          <rect x={560} y={1060} width={60} height={160} rx={6} fill={C.SKYLINE} />
          <rect x={630} y={1010} width={70} height={210} rx={6} fill={C.SKYLINE} />
          <rect x={712} y={1080} width={54} height={140} rx={6} fill={C.SKYLINE} />
          <rect x={776} y={1040} width={66} height={180} rx={6} fill={C.SKYLINE} />
          <circle cx={600} cy={1170} r={40} fill={CHAR.tree} />
          <circle cx={800} cy={1180} r={34} fill={CHAR.tree} />
          <path d="M 560 944 L 640 944 L 560 1050 Z" fill="#FFFFFF" opacity={0.6} />
        </g>
        <rect x={691} y={944} width={8} height={262} fill="#C9D8EC" />
      </g>

      {/* layar nomor antrean */}
      <g transform="translate(560 838)">
        <rect x={0} y={0} width={270} height={70} rx={14} fill={C.NAVY} />
        <text x={135} y={47} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={34} fill={C.HIGHLIGHT}>
          ANTREAN 08
        </text>
      </g>

      {/* jam dinding */}
      <g transform="translate(985 890)">
        <circle r={48} fill="#FFFFFF" />
        <circle r={48} fill="none" stroke="#C9D8EC" strokeWidth={8} />
        <rect x={-3} y={-30} width={6} height={30} rx={3} fill={C.NAVY} transform="rotate(300)" />
        <rect x={-2.5} y={-38} width={5} height={38} rx={2.5} fill={C.NAVY} transform="rotate(60)" />
        <rect x={-1.5} y={-40} width={3} height={40} rx={1.5} fill={C.ALERT_RED} transform={`rotate(${hand})`} />
        <circle r={5} fill={C.NAVY} />
      </g>

      {/* pintu kaca */}
      <g>
        <rect x={900} y={990} width={190} height={ZONE.floorY - 990} rx={10} fill="#C9D8EC" />
        <rect x={914} y={1004} width={162} height={ZONE.floorY - 1004} rx={6} fill="#DDEAF8" />
        <g transform={`translate(${914 + 162 * doorOpen * 0.7} 0)`}>
          <rect x={0} y={1004} width={162 * (1 - doorOpen * 0.7)} height={ZONE.floorY - 1004} rx={6} fill="#F4F8FD" opacity={0.9} />
          <path d={`M 20 1030 L ${70 * (1 - doorOpen * 0.7)} 1030 L 20 1110 Z`} fill="#FFFFFF" />
        </g>
        <rect x={938} y={1140} width={114} height={46} rx={10} fill={C.SUCCESS} />
        <text x={995} y={1174} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={32} fill="#FFFFFF">
          BUKA
        </text>
      </g>
      {/* tanaman pot di sudut */}
      <g transform="translate(-130 1700)">
        <rect x={-34} y={-80} width={68} height={80} rx={10} fill="#C98A4B" />
        <circle cx={0} cy={-130} r={56} fill={CHAR.tree} />
        <circle cx={-26} cy={-160} r={34} fill={CHAR.treeShade} />
      </g>

      {/* lantai keramik */}
      <rect x={-400} y={ZONE.floorY} width={1880} height={400} fill={CHAR.floor} />
      <rect x={-400} y={ZONE.floorY} width={1880} height={6} fill="#C6D5E9" />
      {Array.from({length: 14}).map((_, i) => (
        <rect key={i} x={-400 + i * 140} y={ZONE.floorY} width={4} height={220} fill="#C6D5E9" opacity={0.7} />
      ))}
    </g>
  );
};
