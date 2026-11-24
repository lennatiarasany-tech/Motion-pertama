import React from 'react';
import {C, CHAR} from '../theme';
import {HEAD, Person, PersonProps} from './Person';

const Y = HEAD.y;

/** Pasien antrean (figuran) — tiga variasi supaya antrean terasa hidup. */

/** Ibu: rambut sanggul, blus merah bata. */
export const PasienIbu: React.FC<PersonProps> = (p) => (
  <Person
    seed="ibu"
    {...p}
    look={{
      skin: '#E8B08A',
      skinShade: '#D29872',
      top: '#C8574B',
      topShade: '#AE473C',
      sleeve: '#C8574B',
      pants: '#4A3A44',
      shoe: CHAR.shoe,
      longCoat: true,
      hairBack: <circle cx={0} cy={Y - 92} r={42} fill="#3A2A24" />,
      hairFront: (
        <path
          d={`M -84 ${Y + 14} Q -92 ${Y - 94} 0 ${Y - 92} Q 92 ${Y - 94} 84 ${Y + 14} Q 78 ${Y - 40} 30 ${Y - 58} Q -10 ${Y - 46} -50 ${Y - 58} Q -80 ${Y - 40} -84 ${Y + 14} Z`}
          fill="#3A2A24"
        />
      ),
      torsoDetail: <path d="M -26 -398 Q 0 -360 26 -398 Z" fill="#D29872" />,
    }}
  />
);

/** Bapak tua: rambut uban, kacamata, kemeja batik cokelat. */
export const PasienBapak: React.FC<PersonProps> = (p) => (
  <Person
    seed="bapak"
    {...p}
    look={{
      skin: '#D49A74',
      skinShade: '#BC845F',
      top: '#8A5A3A',
      topShade: '#744A2F',
      sleeve: '#8A5A3A',
      pants: '#3B4452',
      shoe: CHAR.shoe,
      hairFront: (
        <g>
          <path
            d={`M -82 ${Y - 6} Q -86 ${Y - 90} 0 ${Y - 88} Q 86 ${Y - 90} 82 ${Y - 6} Q 70 ${Y - 54} 0 ${Y - 60} Q -70 ${Y - 54} -82 ${Y - 6} Z`}
            fill="#C9CED6"
          />
          {/* kacamata */}
          <g fill="none" stroke={C.NAVY} strokeWidth={5}>
            <circle cx={-28} cy={Y + 4} r={20} />
            <circle cx={28} cy={Y + 4} r={20} />
            <path d={`M -8 ${Y + 2} L 8 ${Y + 2}`} />
          </g>
          {/* kumis */}
          <path d={`M -20 ${Y + 30} Q 0 ${Y + 22} 20 ${Y + 30} Q 0 ${Y + 36} -20 ${Y + 30} Z`} fill="#C9CED6" />
        </g>
      ),
      torsoDetail: (
        <g fill="#C9874F" opacity={0.7}>
          {[-50, -10, 30].map((x) =>
            [-360, -310, -260].map((y) => <circle key={`${x}${y}`} cx={x + ((y / 50) % 2) * 10} cy={y} r={9} />),
          )}
        </g>
      ),
    }}
  />
);

/** Mas: anak muda, hoodie kuning, rambut berponi. */
export const PasienMas: React.FC<PersonProps> = (p) => (
  <Person
    seed="mas"
    {...p}
    look={{
      skin: '#DFA47C',
      skinShade: '#C88D66',
      top: '#F2C230',
      topShade: '#DDAC1E',
      sleeve: '#F2C230',
      pants: '#2F4A6E',
      shoe: '#FFFFFF',
      hairFront: (
        <path
          d={`M -82 ${Y - 10} Q -86 ${Y - 98} 6 ${Y - 96} Q 90 ${Y - 92} 82 ${Y - 10} Q 74 ${Y - 50} 40 ${Y - 44} L 20 ${Y - 62} L 0 ${Y - 40} L -20 ${Y - 60} Q -64 ${Y - 54} -82 ${Y - 10} Z`}
          fill={CHAR.hair}
        />
      ),
      torsoDetail: (
        <g>
          <path d="M -40 -398 Q 0 -350 40 -398 Z" fill="#DDAC1E" />
          <rect x={-50} y={-270} width={100} height={40} rx={14} fill="#DDAC1E" />
        </g>
      ),
    }}
  />
);
