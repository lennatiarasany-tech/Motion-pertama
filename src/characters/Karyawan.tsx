import React from 'react';
import {Person, PersonProps} from './Person';

/** KARYAWAN (faktur) — dari aset resmi karyawan-faktur_*.svg */
export const Karyawan: React.FC<PersonProps> = (p) => (
  <Person
    seed="karyawan"
    {...p}
    look={{
      skin: '#B97A50',
      skinShade: '#9C6340',
      sleeve: '#5BAC72',
      pants: '#2F3E52',
      shoe: '#22262F',
      hairFront: (
        <path d="M138,168 Q134,90 200,88 Q266,90 262,168 Q256,124 200,120 Q148,124 138,168 Z" fill="#1E2233" />
      ),
      torso: (
        <g>
          <path d="M132,292 Q132,262 166,262 L234,262 Q268,262 268,292 L280,545 L120,545 Z" fill="#5BAC72" />
          <path d="M176,262 L224,262 L200,300 Z" fill="#FFFFFF" />
          <line x1={200} y1={300} x2={200} y2={360} stroke="#4A9A60" strokeWidth={3} />
          <rect x={214} y={300} width={36} height={8} rx={3} fill="#FFFFFF" opacity={0.8} />
        </g>
      ),
    }}
  />
);
