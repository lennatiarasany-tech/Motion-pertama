import React from 'react';
import {CHAR} from '../theme';
import {HEAD, Person, PersonProps} from './Person';

const Y = HEAD.y;

/** KASIR (cameo) — perempuan berhijab biru. Biasanya digambar di balik meja kasir. */
export const Kasir: React.FC<PersonProps> = (p) => (
  <Person
    seed="kasir"
    {...p}
    look={{
      skin: CHAR.skinKasir,
      skinShade: '#D9A47E',
      top: CHAR.hijab,
      topShade: CHAR.hijabShade,
      sleeve: CHAR.hijab,
      pants: CHAR.pants,
      shoe: CHAR.shoe,
      hairBack: (
        <path
          d={`M -96 ${Y} Q -100 ${Y - 104} 0 ${Y - 104} Q 100 ${Y - 104} 96 ${Y} L 110 ${Y + 128}
              Q 0 ${Y + 150} -110 ${Y + 128} Z`}
          fill={CHAR.hijabShade}
        />
      ),
      hairFront: (
        <path
          fillRule="evenodd"
          d={`M -94 ${Y + 4} Q -96 ${Y - 100} 0 ${Y - 100} Q 96 ${Y - 100} 94 ${Y + 4} Q 92 ${Y + 90} 0 ${Y + 96}
              Q -92 ${Y + 90} -94 ${Y + 4} Z
              M -66 ${Y + 2} Q -66 ${Y - 66} 0 ${Y - 66} Q 66 ${Y - 66} 66 ${Y + 2} Q 64 ${Y + 72} 0 ${Y + 74}
              Q -64 ${Y + 72} -66 ${Y + 2} Z`}
          fill={CHAR.hijab}
        />
      ),
    }}
  />
);
