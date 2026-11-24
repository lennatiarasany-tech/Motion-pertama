import React from 'react';
import {Person, PersonProps} from './Person';

/**
 * Pasien antrean (figuran) — dibuat dengan rig & proporsi yang sama
 * dengan aset resmi supaya seragam.
 */
const torso = (fill: string, extra?: React.ReactNode) => (
  <g>
    <path d="M132,292 Q132,262 166,262 L234,262 Q268,262 268,292 L280,545 L120,545 Z" fill={fill} />
    {extra}
  </g>
);

/** Ibu: rambut sanggul, blus merah bata. */
export const PasienIbu: React.FC<PersonProps> = (p) => (
  <Person
    seed="ibu"
    {...p}
    look={{
      skin: '#E3A67E',
      skinShade: '#C98863',
      sleeve: '#C8574B',
      pants: '#4A3A44',
      shoe: '#2B2F3A',
      hairBack: <circle cx={200} cy={92} r={40} fill="#3A2A24" />,
      hairFront: <path d="M138,168 Q130,92 200,92 Q270,92 262,168 Q250,124 200,122 Q150,124 138,168 Z" fill="#3A2A24" />,
      torso: torso('#C8574B', <path d="M176,262 L224,262 L200,292 Z" fill="#C98863" />),
    }}
  />
);

/** Bapak tua: rambut uban, kacamata, kumis, kemeja batik cokelat. */
export const PasienBapak: React.FC<PersonProps> = (p) => (
  <Person
    seed="bapak"
    {...p}
    look={{
      skin: '#D89A6E',
      skinShade: '#BC7F55',
      sleeve: '#8A5A3A',
      pants: '#3B4452',
      shoe: '#22262F',
      hairFront: (
        <g>
          <path d="M138,166 Q134,94 200,92 Q266,94 262,166 Q256,128 200,126 Q144,128 138,166 Z" fill="#C9CED6" />
          <g fill="none" stroke="#1B2B3B" strokeWidth={4}>
            <circle cx={178} cy={175} r={16} />
            <circle cx={222} cy={175} r={16} />
            <path d="M194,174 L206,174" />
          </g>
          <path d="M186,198 Q200,192 214,198 Q200,203 186,198 Z" fill="#C9CED6" />
        </g>
      ),
      torso: torso(
        '#8A5A3A',
        <g fill="#C9874F" opacity={0.7}>
          {[150, 190, 230].map((x) => [310, 370, 430, 490].map((y) => <circle key={`${x}${y}`} cx={x + ((y / 60) % 2) * 10} cy={y} r={8} />))}
        </g>,
      ),
    }}
  />
);

/** Mas: anak muda, hoodie kuning. */
export const PasienMas: React.FC<PersonProps> = (p) => (
  <Person
    seed="mas"
    {...p}
    look={{
      skin: '#C98A5E',
      skinShade: '#AE7248',
      sleeve: '#F2C230',
      pants: '#2F4A6E',
      shoe: '#F4F6FA',
      hairFront: (
        <path d="M138,168 Q132,88 204,88 Q268,90 262,166 Q250,128 222,124 L208,138 L196,122 L182,138 Q150,130 138,168 Z" fill="#1E2233" />
      ),
      torso: torso(
        '#F2C230',
        <g>
          <path d="M166,262 Q200,300 234,262 Z" fill="#DDAC1E" />
          <rect x={160} y={430} width={80} height={44} rx={14} fill="#DDAC1E" />
        </g>,
      ),
    }}
  />
);
