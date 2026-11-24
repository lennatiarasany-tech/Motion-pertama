import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, CHAR, ZONE} from '../theme';

type Mode = 'light' | 'dark' | 'flashback';

const Building: React.FC<{x: number; w: number; h: number; color: string; win?: string}> = ({x, w, h, color, win}) => {
  const top = ZONE.floorY - h;
  const wins = [];
  if (win) {
    for (let yy = top + 30; yy < ZONE.floorY - 50; yy += 52) {
      for (let xx = x + 18; xx < x + w - 30; xx += 38) {
        wins.push(<rect key={`${xx}-${yy}`} x={xx} y={yy} width={18} height={26} rx={3} fill={win} />);
      }
    }
  }
  return (
    <g>
      <rect x={x} y={top} width={w} height={h} rx={10} fill={color} />
      {wins}
    </g>
  );
};

const Tree: React.FC<{x: number; s?: number; color: string; shade: string}> = ({x, s = 1, color, shade}) => (
  <g transform={`translate(${x} ${ZONE.floorY}) scale(${s})`}>
    <rect x={-7} y={-120} width={14} height={120} rx={7} fill={shade} />
    <circle cx={0} cy={-170} r={70} fill={color} />
    <circle cx={22} cy={-150} r={44} fill={shade} opacity={0.5} />
  </g>
);

export const Background: React.FC<{
  mode?: Mode;
  sun?: boolean;
  clouds?: boolean;
  /** jarak zoom kamera 1.00→1.04, dihitung di scene */
  children?: React.ReactNode;
}> = ({mode = 'light', sun = false, clouds = false, children}) => {
  const dark = mode === 'dark';
  const bg = dark ? C.BG_DARK : C.BG_LIGHT;
  const sky = dark ? '#1E3249' : C.SKYLINE;
  const win = dark ? '#2B4560' : '#E9F0F9';
  const floor = dark ? '#111E2D' : CHAR.floor;
  return (
    <AbsoluteFill style={{background: bg}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute'}}>
        {sun && !dark && (
          <g opacity={0.9}>
            {/* matahari di pojok kanan atas, di luar zona teks */}
            <circle cx={960} cy={140} r={70} fill={C.HIGHLIGHT} opacity={0.45} />
            <circle cx={960} cy={140} r={48} fill={C.HIGHLIGHT} opacity={0.8} />
          </g>
        )}
        {clouds && !dark && (
          <g fill="#FFFFFF" opacity={0.4}>
            <g transform="translate(130 150)">
              <ellipse cx={0} cy={0} rx={70} ry={26} />
              <ellipse cx={34} cy={-14} rx={40} ry={26} />
            </g>
            <g transform="translate(900 700)">
              <ellipse cx={0} cy={0} rx={60} ry={22} />
              <ellipse cx={-26} cy={-12} rx={34} ry={22} />
            </g>
          </g>
        )}
        {dark && (
          <g fill="#FFFFFF">
            {[[120, 150], [300, 90], [860, 120], [990, 260], [70, 680], [1000, 760], [560, 110]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 2 ? 2.5 : 3.5} opacity={0.5} />
            ))}
            <circle cx={930} cy={170} r={44} fill="#E9EEF5" opacity={0.85} />
            <circle cx={950} cy={158} r={40} fill={C.BG_DARK} />
          </g>
        )}
        {/* skyline di 1/3 bawah */}
        <g>
          <Building x={-20} w={150} h={420} color={sky} win={win} />
          <Building x={150} w={110} h={300} color={sky} win={win} />
          <Building x={290} w={170} h={520} color={sky} win={win} />
          <Building x={620} w={150} h={360} color={sky} win={win} />
          <Building x={790} w={120} h={480} color={sky} win={win} />
          <Building x={930} w={170} h={330} color={sky} win={win} />
        </g>
        <Tree x={110} s={0.95} color={dark ? '#1C3A3A' : CHAR.tree} shade={dark ? '#163030' : CHAR.treeShade} />
        <Tree x={560} s={0.75} color={dark ? '#1C3A3A' : CHAR.tree} shade={dark ? '#163030' : CHAR.treeShade} />
        <Tree x={985} s={1.05} color={dark ? '#1C3A3A' : CHAR.tree} shade={dark ? '#163030' : CHAR.treeShade} />
        {/* lantai */}
        <rect x={0} y={ZONE.floorY} width={1080} height={1920 - ZONE.floorY} fill={floor} />
        <rect x={0} y={ZONE.floorY} width={1080} height={6} fill={dark ? '#0C1622' : '#C6D5E9'} />
      </svg>
      {mode === 'flashback' && (
        <AbsoluteFill style={{background: 'rgba(196,140,70,0.28)', mixBlendMode: 'multiply'}} />
      )}
      {children}
    </AbsoluteFill>
  );
};
