import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT, ZONE} from '../theme';

/** Kata kunci ditandai dengan *kata* (merah), _kata_ (biru), ~kata~ (hijau), ^kata^ (kuning). */
const colorOf = (w: string, base: string) => {
  if (w.startsWith('*')) return {t: w.replace(/\*/g, ''), c: C.ALERT_RED, key: true};
  if (w.startsWith('_')) return {t: w.replace(/_/g, ''), c: C.BRAND_BLUE, key: true};
  if (w.startsWith('~')) return {t: w.replace(/~/g, ''), c: C.SUCCESS, key: true};
  if (w.startsWith('^')) return {t: w.replace(/\^/g, ''), c: C.HIGHLIGHT, key: true};
  return {t: w, c: base, key: false};
};

export const Headline: React.FC<{
  kicker?: string;
  kickerColor?: string;
  lines: string[];
  size?: number;
  color?: string;
  delay?: number;
}> = ({kicker, kickerColor = C.KICKER, lines, size = 108, color = C.NAVY, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = lines.map((l) => l.split(' ').map((w) => colorOf(w, color)));
  const plainCount = words.flat().filter((w) => !w.key).length;
  let idx = 0;
  let keyIdx = 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: ZONE.marginX,
        right: ZONE.marginX,
        top: ZONE.text.top,
        height: ZONE.text.bottom - ZONE.text.top,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: FONT,
      }}
    >
      {kicker && (
        <div
          style={{
            fontWeight: 700,
            fontSize: 44,
            color: kickerColor,
            letterSpacing: 1,
            marginBottom: 14,
            opacity: spring({frame: frame - delay, fps, config: {damping: 16, mass: 0.7}}),
          }}
        >
          {kicker}
        </div>
      )}
      {words.map((line, li) => (
        <div key={li} style={{display: 'flex', gap: size * 0.26, justifyContent: 'center', lineHeight: 1.02}}>
          {line.map((w, wi) => {
            const order = w.key ? plainCount + keyIdx++ : idx++;
            const s = spring({frame: frame - delay - 6 - order * 4, fps, config: {damping: 15, mass: 0.7}});
            const scale = w.key ? 1.15 - 0.15 * s + (1 - s) * 0 : 1;
            return (
              <span
                key={wi}
                style={{
                  fontWeight: 800,
                  fontSize: size,
                  color: w.c,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  opacity: Math.min(1, s * 1.4),
                  transform: `translateY(${(1 - s) * 40}px) scale(${w.key ? Math.max(1, scale) : 1})`,
                }}
              >
                {w.t}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
