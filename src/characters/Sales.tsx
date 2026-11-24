import React from 'react';
import {CHAR} from '../theme';
import {HEAD, Person, PersonProps} from './Person';

const Y = HEAD.y;

/** SALES PBF — topi biru navy, kaos abu-abu, celana gelap. */
export const Sales: React.FC<PersonProps> = (p) => (
  <Person
    seed="sales"
    {...p}
    look={{
      skin: '#D99A72',
      skinShade: '#C2845E',
      top: CHAR.tee,
      topShade: CHAR.teeShade,
      sleeve: CHAR.tee,
      pants: '#2A3442',
      shoe: CHAR.shoe,
      hairFront: (
        <g>
          <path d={`M -76 ${Y - 12} Q -70 ${Y - 30} -60 ${Y - 34} L -60 ${Y - 10} Z`} fill={CHAR.hair} />
          {/* kubah topi */}
          <path
            d={`M -84 ${Y - 24} Q -86 ${Y - 104} 0 ${Y - 104} Q 86 ${Y - 104} 84 ${Y - 24} Z`}
            fill={CHAR.cap}
          />
          {/* lidah topi */}
          <path d={`M -10 ${Y - 30} L 118 ${Y - 30} Q 130 ${Y - 22} 118 ${Y - 14} L -10 ${Y - 14} Z`} fill="#16294A" />
          <circle cx={0} cy={Y - 102} r={7} fill="#16294A" />
          <rect x={-26} y={Y - 74} width={52} height={20} rx={6} fill="#FFFFFF" opacity={0.85} />
        </g>
      ),
      torsoDetail: (
        <g>
          <path d="M -28 -398 Q 0 -370 28 -398 Z" fill="#C2845E" />
          <rect x={-84} y={-226} width={168} height={14} rx={4} fill={CHAR.teeShade} />
        </g>
      ),
    }}
  />
);
