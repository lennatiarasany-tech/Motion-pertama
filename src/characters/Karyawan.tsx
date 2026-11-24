import React from 'react';
import {CHAR} from '../theme';
import {HEAD, Person, PersonProps} from './Person';

const Y = HEAD.y;

/** KARYAWAN ANDALAN — laki-laki, rambut pendek hitam, kulit lebih gelap, scrub hijau. */
export const Karyawan: React.FC<PersonProps> = (p) => (
  <Person
    seed="karyawan"
    {...p}
    look={{
      skin: CHAR.skinKaryawan,
      skinShade: CHAR.skinKaryawanShade,
      top: CHAR.scrub,
      topShade: CHAR.scrubShade,
      sleeve: CHAR.scrub,
      pants: CHAR.scrubShade,
      shoe: CHAR.shoe,
      hairFront: (
        <path
          d={`M -82 ${Y - 4} Q -88 ${Y - 96} 0 ${Y - 96} Q 88 ${Y - 96} 82 ${Y - 4} Q 76 ${Y - 44} 50 ${Y - 52}
              Q 10 ${Y - 40} -30 ${Y - 56} Q -70 ${Y - 50} -82 ${Y - 4} Z`}
          fill={CHAR.hair}
        />
      ),
      torsoDetail: (
        <g>
          {/* kerah V scrub */}
          <path d="M -26 -398 L 26 -398 L 0 -352 Z" fill={CHAR.skinKaryawanShade} />
          <path d="M -34 -398 L -26 -398 L 0 -352 L 0 -340 Z" fill={CHAR.scrubShade} />
          <path d="M 34 -398 L 26 -398 L 0 -352 L 0 -340 Z" fill={CHAR.scrubShade} />
          {/* saku dada */}
          <rect x={-60} y={-330} width={40} height={36} rx={6} fill={CHAR.scrubShade} />
          <rect x={-50} y={-342} width={5} height={22} rx={2.5} fill="#FFFFFF" />
        </g>
      ),
    }}
  />
);
