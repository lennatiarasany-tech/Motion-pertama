import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT, ZONE} from '../theme';
import {CHUNKS, WORDS} from '../voTiming';

/**
 * Subtitle karaoke yang mengikuti VO kata per kata (frame global).
 * Kata yang sudah diucapkan putih penuh, yang belum redup; kata kunci menyala kuning.
 */
export const VoSubtitle: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ci = CHUNKS.findIndex((c) => frame >= c.s && frame < c.e);
  if (ci < 0) return null;
  const c = CHUNKS[ci];
  const pop = spring({frame: frame - c.s, fps, config: {damping: 18, mass: 0.5}});
  const words = WORDS.slice(c.w[0], c.w[1] + 1);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: ZONE.subtitle.top,
        height: ZONE.subtitle.bottom - ZONE.subtitle.top,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: 'rgba(25,41,59,0.85)',
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 40,
          padding: '16px 34px',
          borderRadius: 999,
          maxWidth: 920,
          textAlign: 'center',
          transform: `scale(${0.92 + 0.08 * pop})`,
          opacity: Math.min(1, pop * 1.5),
        }}
      >
        {words.map((w, i) => {
          const said = frame >= w.s - 1;
          const now = frame >= w.s - 1 && frame < w.e;
          return (
            <React.Fragment key={i}>
              <span
                style={{
                  color: w.k && said ? C.HIGHLIGHT : '#FFFFFF',
                  opacity: said ? 1 : 0.42,
                  display: 'inline-block',
                  transform: `scale(${now ? 1.06 : 1})`,
                }}
              >
                {w.t}
              </span>
              {i < words.length - 1 ? ' ' : ''}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
