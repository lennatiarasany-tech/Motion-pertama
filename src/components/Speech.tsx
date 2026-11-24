import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from '../theme';

/** Balon bicara di koordinat dunia (ikut kamera). tail = posisi ekor relatif x. */
export const Speech: React.FC<{x: number; y: number; text: string; from: number; to: number; tail?: number; size?: number}> = ({
  x,
  y,
  text,
  from,
  to,
  tail = 0,
  size = 34,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sIn = spring({frame: frame - from, fps, config: {damping: 14, mass: 0.6}});
  const out = interpolate(frame, [to - 8, to], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = sIn * out;
  if (s <= 0.001) return null;
  const w = text.length * size * 0.56 + 48;
  const h = size * 2.1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={Math.min(1, s * 1.5)}>
      <path d={`M ${tail - 16} ${h / 2 - 4} L ${tail + 4} ${h / 2 + 26} L ${tail + 18} ${h / 2 - 4} Z`} fill="#FFFFFF" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill="#FFFFFF" />
      <text x={0} y={size * 0.36} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={size} fill={C.NAVY}>
        {text}
      </text>
    </g>
  );
};
