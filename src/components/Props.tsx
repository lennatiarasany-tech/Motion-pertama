import React from 'react';
import {C, CHAR, FONT} from '../theme';

/** Dus cokelat. (x,y) = tengah bawah. */
export const Box: React.FC<{x: number; y: number; w?: number; h?: number; rot?: number; label?: string}> = ({
  x,
  y,
  w = 170,
  h = 120,
  rot = 0,
  label,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={8} fill={CHAR.box} />
    <rect x={w / 2 - w * 0.22} y={-h} width={w * 0.22} height={h} rx={0} fill={CHAR.boxShade} opacity={0.6} />
    <rect x={-w / 2} y={-h} width={w} height={16} rx={6} fill={CHAR.boxShade} />
    <rect x={-14} y={-h} width={28} height={h * 0.45} fill={CHAR.boxTape} />
    {label && (
      <g>
        <rect x={-w / 2 + 8} y={-h * 0.5} width={w - 16} height={46} rx={10} fill={C.ALERT_RED} />
        <text
          x={0}
          y={-h * 0.5 + 34}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={800}
          fontSize={32}
          letterSpacing={-0.5}
          fill="#FFFFFF"
        >
          {label}
        </text>
      </g>
    )}
  </g>
);

/** Lingkaran anotasi putus-putus digambar dengan stroke-dashoffset (progress 0..1). */
export const CircleAnnotation: React.FC<{cx: number; cy: number; rx: number; ry: number; progress: number; dashed?: boolean}> = ({
  cx,
  cy,
  rx,
  ry,
  progress,
  dashed = true,
}) => {
  const len = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
  return (
    <g>
      <mask id={`m-${cx}-${cy}`}>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#fff" strokeWidth={14} strokeDasharray={len} strokeDashoffset={len * (1 - progress)} transform={`rotate(-90 ${cx} ${cy})`} />
      </mask>
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="none"
        stroke={C.ALERT_RED}
        strokeWidth={9}
        strokeDasharray={dashed ? '22 14' : undefined}
        strokeLinecap="round"
        mask={`url(#m-${cx}-${cy})`}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </g>
  );
};

/** Coretan merah di atas teks/objek (progress 0..1). */
export const StrikeThrough: React.FC<{x1: number; y1: number; x2: number; y2: number; progress: number; width?: number}> = ({
  x1,
  y1,
  x2,
  y2,
  progress,
  width = 16,
}) => (
  <line
    x1={x1}
    y1={y1}
    x2={x1 + (x2 - x1) * progress}
    y2={y1 + (y2 - y1) * progress}
    stroke={C.ALERT_RED}
    strokeWidth={width}
    strokeLinecap="round"
  />
);

/** Lembar faktur kecil di tangan (koordinat lokal). */
export const PaperProp: React.FC<{w?: number; h?: number; x?: number; y?: number; rot?: number}> = ({
  w = 92,
  h = 120,
  x = 0,
  y = 0,
  rot = 0,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={8} fill="#FFFFFF" />
    <rect x={-w / 2} y={-h / 2} width={w} height={20} rx={6} fill={C.BRAND_BLUE} />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={-w / 2 + 12} y={-h / 2 + 34 + i * 18} width={w - 24 - (i % 2) * 20} height={7} rx={3.5} fill="#C9D4E4" />
    ))}
  </g>
);

export const Clipboard: React.FC<{x?: number; y?: number; rot?: number}> = ({x = 0, y = 0, rot = 0}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-58} y={-76} width={116} height={152} rx={10} fill="#A86E37" />
    <rect x={-48} y={-62} width={96} height={128} rx={6} fill="#FFFFFF" />
    <rect x={-24} y={-84} width={48} height={20} rx={6} fill="#7A8BA6" />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={-36} y={-42 + i * 20} width={72 - (i % 2) * 22} height={7} rx={3.5} fill="#C9D4E4" />
    ))}
  </g>
);

export const Pen: React.FC = () => (
  <g transform="rotate(-50)">
    <rect x={-4} y={-46} width={8} height={46} rx={3} fill={C.NAVY} />
    <path d="M -4 0 L 4 0 L 0 10 Z" fill={C.NAVY} />
  </g>
);

export const Phone: React.FC = () => (
  <g transform="rotate(10)">
    <rect x={-14} y={-34} width={28} height={58} rx={6} fill={C.NAVY} />
    <rect x={-10} y={-28} width={20} height={42} rx={3} fill="#5D8BE6" />
  </g>
);

/** Meja kasir hijau toska; (x,y)= tengah bawah di lantai. */
export const CashierDesk: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-190} y={-250} width={380} height={250} rx={14} fill={CHAR.counter} />
    <rect x={-190} y={-250} width={380} height={30} rx={12} fill={CHAR.counterShade} />
    <rect x={-150} y={-180} width={300} height={8} rx={4} fill={CHAR.counterShade} />
    {/* mesin kasir */}
    <rect x={40} y={-320} width={110} height={70} rx={10} fill={C.NAVY} />
    <rect x={52} y={-308} width={86} height={34} rx={5} fill="#5D8BE6" />
    {/* plus hijau apotek */}
    <rect x={-40} y={-140} width={80} height={24} rx={6} fill="#FFFFFF" />
    <rect x={-12} y={-168} width={24} height={80} rx={6} fill="#FFFFFF" />
  </g>
);

/** Siluet antrean pasien (opacity 40%). */
export const QueueSilhouette: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={C.NAVY} opacity={0.4}>
    <circle cx={0} cy={-470} r={62} />
    <path d="M -70 -390 Q 0 -410 70 -390 L 80 -180 L -80 -180 Z" />
    <rect x={-54} y={-200} width={42} height={200} rx={20} />
    <rect x={12} y={-200} width={42} height={200} rx={20} />
  </g>
);

/** Lampu meja untuk scene malam. */
export const DeskLamp: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -40 -390 L 330 260 L -330 260 Z" fill={C.HIGHLIGHT} opacity={0.13} />
    <rect x={-90} y={-12} width={180} height={18} rx={9} fill="#2B4560" />
    <rect x={-8} y={-300} width={16} height={290} rx={8} fill="#2B4560" />
    <path d="M -100 -330 Q 0 -440 100 -330 Z" fill={C.BRAND_BLUE} transform="rotate(-12 0 -330)" />
    <ellipse cx={-6} cy={-322} rx={60} ry={12} fill={C.HIGHLIGHT} transform="rotate(-12 0 -330)" />
  </g>
);
