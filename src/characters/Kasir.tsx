import React from 'react';
import {Person, PersonProps} from './Person';

/** KASIR — dari aset resmi kasir_netral.svg (hijab biru, seragam toska). */
export const Kasir: React.FC<PersonProps> = (p) => (
  <Person
    seed="kasir"
    {...p}
    look={{
      skin: '#C98A5E',
      skinShade: '#AE7248',
      sleeve: '#4BA299',
      pants: '#1B2B3B',
      shoe: '#2B2F3A',
      hideEars: true,
      torso: (
        <g>
          <path d="M132,292 Q132,262 166,262 L234,262 Q268,262 268,292 L280,545 L120,545 Z" fill="#4BA299" />
          <path d="M150,262 L250,262 L262,545 L138,545 Z" fill="#FFFFFF" opacity={0.92} />
          <rect x={168} y={420} width={64} height={40} rx={6} fill="#4BA299" opacity={0.25} />
        </g>
      ),
      overHead: (
        <g>
          <path d="M128,178 Q126,88 200,86 Q274,88 272,178 Q276,260 300,330 Q200,365 100,330 Q124,260 128,178 Z" fill="#2C59AE" />
          <ellipse cx={200} cy={178} rx={54} ry={62} fill="#C98A5E" />
        </g>
      ),
      hairFront: (
        <path d="M146,160 Q150,112 200,110 Q250,112 254,160 Q236,128 200,126 Q164,128 146,160 Z" fill="#2C59AE" />
      ),
    }}
  />
);
