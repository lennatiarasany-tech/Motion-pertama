import React from 'react';
import {C, FONT, ZONE} from '../theme';

/** Subtitle di safe bawah. Kata kunci ditulis dengan *kata* → kuning. */
export const Subtitle: React.FC<{text: string}> = ({text}) => (
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
        color: '#FFFFFF',
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 40,
        padding: '16px 34px',
        borderRadius: 999,
        maxWidth: 920,
        textAlign: 'center',
      }}
    >
      {text.split(' ').map((w, i) => (
        <span key={i} style={{color: w.startsWith('*') ? C.HIGHLIGHT : undefined}}>
          {w.replace(/\*/g, '')}{' '}
        </span>
      ))}
    </div>
  </div>
);
