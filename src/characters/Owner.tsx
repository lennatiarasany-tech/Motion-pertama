import React from 'react';
import {CHAR, C} from '../theme';
import {HEAD, Person, PersonProps} from './Person';

const Y = HEAD.y;

/** OWNER / APOTEKER — rambut hitam panjang lurus belah tengah, jas lab putih, dasi biru, name tag. */
export const Owner: React.FC<PersonProps> = (p) => (
  <Person
    seed="owner"
    {...p}
    look={{
      skin: CHAR.skinOwner,
      skinShade: CHAR.skinOwnerShade,
      top: CHAR.coat,
      topShade: CHAR.coatShade,
      sleeve: CHAR.coat,
      pants: CHAR.pants,
      shoe: CHAR.shoe,
      longCoat: true,
      hairBack: (
        <path
          d={`M -90 ${Y} Q -96 ${Y - 92} 0 ${Y - 94} Q 96 ${Y - 92} 90 ${Y} L 96 ${Y + 150} Q 92 ${Y + 160} 80 ${Y + 160}
              L -80 ${Y + 160} Q -92 ${Y + 160} -96 ${Y + 150} Z`}
          fill={CHAR.hair}
        />
      ),
      hairFront: (
        <g fill={CHAR.hair}>
          {/* belah tengah: dua sisi poni */}
          <path d={`M -2 ${Y - 80} Q -60 ${Y - 74} -78 ${Y - 10} L -84 ${Y + 52} Q -92 ${Y - 60} -40 ${Y - 82} Q -18 ${Y - 88} -2 ${Y - 80} Z`} />
          <path d={`M 2 ${Y - 80} Q 60 ${Y - 74} 78 ${Y - 10} L 84 ${Y + 52} Q 92 ${Y - 60} 40 ${Y - 82} Q 18 ${Y - 88} 2 ${Y - 80} Z`} />
          <path d={`M -4 ${Y - 82} Q -48 ${Y - 60} -70 ${Y - 30} Q -60 ${Y - 90} 0 ${Y - 82} Q 60 ${Y - 90} 70 ${Y - 30} Q 48 ${Y - 60} 4 ${Y - 82} Z`} />
        </g>
      ),
      torsoDetail: (
        <g>
          {/* dalaman biru + dasi */}
          <path d="M -30 -398 L 30 -398 L 0 -300 Z" fill={C.BRAND_BLUE} />
          <path d="M -8 -380 L 8 -380 L 12 -318 L 0 -300 L -12 -318 Z" fill="#1F4FB0" />
          {/* kerah jas */}
          <path d="M -30 -398 L -6 -330 L -38 -360 Z" fill={CHAR.coatShade} />
          <path d="M 30 -398 L 6 -330 L 38 -360 Z" fill={CHAR.coatShade} />
          {/* garis kancing */}
          <rect x={-2} y={-300} width={4} height={120} rx={2} fill={CHAR.coatShade} />
          {/* name tag biru di dada kiri */}
          <rect x={22} y={-346} width={40} height={18} rx={5} fill={C.BRAND_BLUE} />
          <rect x={28} y={-340} width={22} height={5} rx={2.5} fill="#FFFFFF" opacity={0.85} />
          {/* saku */}
          <rect x={-66} y={-262} width={40} height={6} rx={3} fill={CHAR.coatShade} />
        </g>
      ),
    }}
  />
);
