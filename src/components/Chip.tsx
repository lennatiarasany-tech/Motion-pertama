import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from '../theme';

type Variant = 'yellow' | 'red' | 'blue' | 'green' | 'white' | 'navy';
const STY: Record<Variant, {bg: string; fg: string}> = {
  yellow: {bg: C.HIGHLIGHT, fg: C.NAVY},
  red: {bg: C.ALERT_RED, fg: '#FFFFFF'},
  blue: {bg: C.BRAND_BLUE, fg: '#FFFFFF'},
  green: {bg: C.SUCCESS, fg: '#FFFFFF'},
  white: {bg: C.CARD_WHITE, fg: C.NAVY},
  navy: {bg: C.NAVY, fg: '#FFFFFF'},
};

export const Chip: React.FC<{
  text: string;
  variant?: Variant;
  x: number;
  y: number;
  delay?: number;
  size?: number;
  anchor?: 'center' | 'left' | 'right';
  style?: React.CSSProperties;
}> = ({text, variant = 'yellow', x, y, delay = 0, size = 34, anchor = 'center', style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 14, mass: 0.6}});
  const tx = anchor === 'center' ? '-50%' : anchor === 'right' ? '-100%' : '0';
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(${tx}, -50%) scale(${s}) rotate(${(1 - s) * -4}deg)`,
        background: STY[variant].bg,
        color: STY[variant].fg,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: size,
        padding: '14px 28px',
        borderRadius: 999,
        whiteSpace: 'nowrap',
        boxShadow: '0 10px 24px rgba(25,41,59,0.18)',
        ...style,
      }}
    >
      {text}
    </div>
  );
};
