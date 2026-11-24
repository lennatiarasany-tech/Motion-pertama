import React from 'react';
import {Person, PersonProps} from './Person';

/** KURIR / SALES PBF — dari aset resmi kurir-pbf_bawa-dus.svg */
export const Sales: React.FC<PersonProps> = (p) => (
  <Person
    seed="sales"
    {...p}
    look={{
      skin: '#D89A6E',
      skinShade: '#BC7F55',
      sleeve: '#5A6B80',
      pants: '#3B4757',
      shoe: '#22262F',
      torso: (
        <g>
          <path d="M132,292 Q132,262 166,262 L234,262 Q268,262 268,292 L280,545 L120,545 Z" fill="#5A6B80" />
          <rect x={120} y={400} width={160} height={16} fill="#F2C94C" />
        </g>
      ),
      hairFront: (
        <g>
          <path d="M136,150 Q136,86 200,84 Q264,86 264,150 Z" fill="#2C59AE" />
          <path d="M136,150 L264,150 L300,160 Q270,166 136,158 Z" fill="#1B2B3B" />
        </g>
      ),
    }}
  />
);
