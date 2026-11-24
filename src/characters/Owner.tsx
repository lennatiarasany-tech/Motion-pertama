import React from 'react';
import {Person, PersonProps} from './Person';

/** BU OWNER / APOTEKER — dari aset resmi bu-owner_*.svg */
export const Owner: React.FC<PersonProps> = (p) => (
  <Person
    seed="owner"
    {...p}
    look={{
      skin: '#E3A67E',
      skinShade: '#C98863',
      sleeve: '#FFFFFF',
      sleeveStroke: '#C9D3E3',
      pants: '#1B2B3B',
      shoe: '#2B2F3A',
      hairBack: <path d="M134,165 Q130,86 200,84 Q270,86 266,165 L284,340 Q200,358 116,340 Z" fill="#1E2233" />,
      hairFront: (
        <path d="M138,168 Q130,92 200,92 Q270,92 262,168 Q252,124 214,118 Q192,146 150,152 Q141,158 138,168 Z" fill="#1E2233" />
      ),
      torso: (
        <g>
          <path d="M132,292 Q132,262 166,262 L234,262 Q268,262 268,292 L286,610 L114,610 Z" fill="#FFFFFF" stroke="#D5DDEA" strokeWidth={2} />
          <path d="M172,262 L228,262 L214,420 L186,420 Z" fill="#3064D1" />
          <path d="M172,262 L200,330 L186,420 L166,300 Z" fill="#EEF2F8" />
          <path d="M228,262 L200,330 L214,420 L234,300 Z" fill="#EEF2F8" />
          <line x1={200} y1={420} x2={200} y2={610} stroke="#D5DDEA" strokeWidth={3} />
          <rect x={146} y={470} width={40} height={44} rx={6} fill="#EEF2F8" />
          <rect x={214} y={470} width={40} height={44} rx={6} fill="#EEF2F8" />
          <rect x={218} y={330} width={34} height={42} rx={5} fill="#fff" stroke="#2C59AE" strokeWidth={2} />
          <rect x={218} y={330} width={34} height={11} rx={4} fill="#2C59AE" />
          <rect x={225} y={350} width={20} height={4} rx={2} fill="#B8C4D6" />
          <rect x={225} y={359} width={14} height={4} rx={2} fill="#B8C4D6" />
        </g>
      ),
    }}
  />
);
