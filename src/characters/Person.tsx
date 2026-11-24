import React from 'react';
import {random, useCurrentFrame} from 'remotion';
import {C} from '../theme';

/**
 * RIG KARAKTER SERI APOTEK DIGITAL
 * Geometri diambil persis dari aset resmi `karakter-apotek-digital.zip`
 * (viewBox 640×940, isi digeser translate(120,40)). Lengan memakai sendi bahu
 * (138,285)/(262,285) + siku 125px, sama seperti file aslinya, sehingga pose
 * bisa dianimasikan. Titik (0,0) komponen = telapak kaki di lantai.
 */

export type Pose =
  | 'idle'
  | 'point'
  | 'thinking'
  | 'shocked'
  | 'thumbsUp'
  | 'holdPaper'
  | 'sign'
  | 'walk'
  | 'phone'
  | 'carry';

export type Expression = 'neutral' | 'smile' | 'worried' | 'shocked' | 'suspicious';
export type Holding = 'clipboard' | 'paper' | 'box' | null;

type Arm = [number, number]; // [rotasi lengan atas, rotasi lengan bawah]
type PoseDef = {L: Arm; R: Arm; legSwing?: number};

// Sudut diambil dari file SVG resmi (bu-owner_*, karyawan-faktur_*, kurir-pbf_*)
export const POSES: Record<Pose, PoseDef> = {
  idle: {L: [10, -4], R: [-10, 4]},
  shocked: {L: [32, 160], R: [-32, -160]}, // bu-owner_kaget
  thinking: {L: [10, -4], R: [-141, -102]}, // bu-owner_bingung
  thumbsUp: {L: [10, -4], R: [-28, -150]}, // *_senang-jempol
  point: {L: [10, -4], R: [-112, 18]}, // bu-owner_menunjuk
  holdPaper: {L: [12, -105], R: [-12, 105]}, // karyawan-faktur_netral
  sign: {L: [12, -105], R: [-12, 105]},
  carry: {L: [12, -100], R: [-12, 100], legSwing: 1}, // kurir-pbf_bawa-dus
  walk: {L: [10, -4], R: [-10, 4], legSwing: 1},
  phone: {L: [10, -4], R: [-117, -134]},
};

const INK = '#1B2B3B';
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mixArm = (a: Arm, b: Arm, t: number): Arm => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];

export type Look = {
  skin: string;
  skinShade: string;
  sleeve: string;
  sleeveStroke?: string;
  pants: string;
  shoe: string;
  torso: React.ReactNode; // badan/baju (koordinat file)
  hairBack?: React.ReactNode;
  overHead?: React.ReactNode; // hijab: digambar di atas kepala, sebelum wajah
  hairFront?: React.ReactNode;
  hideEars?: boolean;
};

export type PersonProps = {
  pose?: Pose;
  fromPose?: Pose;
  poseT?: number;
  expression?: Expression;
  seed?: string;
  flip?: boolean;
  holding?: Holding;
  /** benda di tangan kanan (koordinat lokal tangan) */
  rightProp?: React.ReactNode;
  leftProp?: React.ReactNode;
  /** benda tambahan di depan badan, koordinat file (badan x 120–280, y 262–610) */
  chestProp?: React.ReactNode;
  walkPhase?: number;
  talking?: boolean;
};

/** Skala internal: tinggi karakter ±640px pada scale 1. */
const K = 0.82;
const FEET_Y = 862;

const Face: React.FC<{expression: Expression; blink: number; talk: number; skinShade: string}> = ({
  expression,
  blink,
  talk,
  skinShade,
}) => {
  const sy = Math.max(0.1, 1 - blink);
  const eye = (cx: number) => (
    <g transform={`translate(${cx} 174) scale(1 ${sy}) translate(${-cx} -174)`}>
      <ellipse cx={cx} cy={174} rx={6.5} ry={8.5} fill={INK} />
      <circle cx={cx + 2} cy={171} r={2.2} fill="#fff" />
    </g>
  );
  const stroke = {stroke: INK, strokeWidth: 4, strokeLinecap: 'round' as const, fill: 'none'};
  let eyes: React.ReactNode;
  let brows: React.ReactNode;
  let mouth: React.ReactNode;
  let extra: React.ReactNode = null;
  switch (expression) {
    case 'smile':
      eyes = (
        <>
          <path d="M170,176 Q178,166 187,176" {...stroke} />
          <path d="M213,176 Q222,166 230,176" {...stroke} />
        </>
      );
      brows = (
        <>
          <path d="M166,150 Q177,143 189,148" {...stroke} />
          <path d="M211,148 Q223,143 234,150" {...stroke} />
        </>
      );
      mouth = (
        <>
          <path d="M183,200 Q200,224 217,200 Z" fill="#7A2E3A" />
          <path d="M186,201 L214,201 L212,206 L188,206 Z" fill="#fff" />
        </>
      );
      break;
    case 'shocked':
      eyes = (
        <g transform={`translate(0 172) scale(1 ${sy}) translate(0 -172)`}>
          <ellipse cx={178} cy={172} rx={10} ry={12.5} fill="#fff" stroke={INK} strokeWidth={2.5} />
          <circle cx={178} cy={173} r={5} fill={INK} />
          <ellipse cx={222} cy={172} rx={10} ry={12.5} fill="#fff" stroke={INK} strokeWidth={2.5} />
          <circle cx={222} cy={173} r={5} fill={INK} />
        </g>
      );
      brows = (
        <>
          <path d="M164,146 Q177,134 190,142" {...stroke} />
          <path d="M210,142 Q223,134 236,146" {...stroke} />
        </>
      );
      mouth = <ellipse cx={200} cy={210} rx={9} ry={11} fill="#7A2E3A" />;
      break;
    case 'worried':
      eyes = (
        <>
          {eye(178)}
          {eye(222)}
        </>
      );
      brows = (
        <>
          <path d="M166,152 L189,144" {...stroke} />
          <path d="M211,144 L234,152" {...stroke} />
        </>
      );
      mouth = <path d="M187,208 Q193,203 200,208 Q207,213 213,208" {...stroke} />;
      extra = <path d="M248,128 Q256,142 248,148 Q240,142 248,128 Z" fill="#8EC5F5" />;
      break;
    case 'suspicious':
      eyes = (
        <g transform={`translate(0 176) scale(1 ${sy}) translate(0 -176)`}>
          <ellipse cx={178} cy={176} rx={7.5} ry={4} fill={INK} />
          <ellipse cx={222} cy={176} rx={7.5} ry={4} fill={INK} />
        </g>
      );
      brows = (
        <>
          <path d="M166,156 L189,160" {...stroke} />
          <path d="M211,150 Q223,142 234,148" {...stroke} />
        </>
      );
      mouth = <path d="M189,208 L213,204" {...stroke} />;
      break;
    default:
      eyes = (
        <>
          {eye(178)}
          {eye(222)}
        </>
      );
      brows = (
        <>
          <path d="M166,152 Q177,145 189,150" {...stroke} />
          <path d="M211,150 Q223,145 234,152" {...stroke} />
        </>
      );
      mouth = <path d="M186,204 Q200,215 214,204" {...stroke} />;
  }
  if (talk > 0.05) {
    mouth = <ellipse cx={200} cy={207} rx={10} ry={3 + 10 * talk} fill="#7A2E3A" />;
  }
  return (
    <g>
      {eyes}
      {brows}
      {mouth}
      <path d="M200,182 Q195,192 202,194" stroke={skinShade} strokeWidth={3} strokeLinecap="round" fill="none" />
      <circle cx={166} cy={196} r={9} fill="#F07A7A" opacity={0.3} />
      <circle cx={234} cy={196} r={9} fill="#F07A7A" opacity={0.3} />
      {extra}
    </g>
  );
};

const ArmG: React.FC<{
  x: number;
  a: Arm;
  look: Look;
  thumb?: boolean;
  finger?: boolean;
  prop?: React.ReactNode;
}> = ({x, a, look, thumb, finger, prop}) => {
  const st = look.sleeveStroke ? {stroke: look.sleeveStroke, strokeWidth: 2} : {};
  return (
    <g transform={`translate(${x},285) rotate(${a[0]})`}>
      <rect x={-17} y={-12} width={34} height={142} rx={17} fill={look.sleeve} {...st} />
      <g transform={`translate(0,125) rotate(${a[1]})`}>
        <rect x={-15} y={-14} width={30} height={122} rx={15} fill={look.sleeve} {...st} />
        <rect x={-15} y={88} width={30} height={14} rx={5} fill="#000" opacity={0.08} />
        {thumb && <rect x={4} y={112} width={13} height={40} rx={6.5} fill={look.skin} />}
        {finger && <rect x={-6} y={115} width={12} height={46} rx={6} fill={look.skin} />}
        <circle cx={0} cy={118} r={19} fill={look.skin} />
        {prop && <g transform="translate(0,118)">{prop}</g>}
      </g>
    </g>
  );
};

const HeldProp: React.FC<{holding: Holding; skin: string; pose: Pose; frame: number}> = ({holding, skin, pose, frame}) => {
  if (!holding) return null;
  if (holding === 'box') {
    return (
      <g>
        <g transform="translate(122,330)">
          <rect width={156} height={120} rx={6} fill="#C8935A" />
          <rect width={156} height={26} rx={6} fill="#B07D48" />
          <rect x={66} y={0} width={24} height={120} fill="#E8D3A8" />
          <rect x={104} y={64} width={38} height={38} rx={4} fill="#fff" />
          <path d="M115,83 L123,91 L134,74" stroke="#5BAC72" strokeWidth={4} fill="none" strokeLinecap="round" />
        </g>
        <circle cx={126} cy={392} r={19} fill={skin} />
        <circle cx={274} cy={392} r={19} fill={skin} />
      </g>
    );
  }
  const paper = holding === 'paper';
  // tangan kanan bergerak menulis saat pose sign
  const writing = pose === 'sign';
  const wx = writing ? 214 + Math.sin(frame / 2.2) * 14 : 240;
  const wy = writing ? 396 + Math.cos(frame / 3.1) * 6 : 400;
  return (
    <g>
      <g transform="translate(150,330)">
        {paper ? (
          <>
            <rect width={100} height={130} rx={6} fill="#fff" stroke="#D5DDEA" strokeWidth={2} />
            <rect width={100} height={24} rx={6} fill={C.BRAND_BLUE} />
          </>
        ) : (
          <>
            <rect width={100} height={130} rx={8} fill="#9B6B43" />
            <rect x={8} y={12} width={84} height={110} rx={4} fill="#fff" />
            <rect x={34} y={-6} width={32} height={16} rx={4} fill="#C7CED8" />
          </>
        )}
        <rect x={18} y={paper ? 36 : 30} width={60} height={6} rx={3} fill={paper ? '#C7CED8' : '#3064D1'} />
        <rect x={18} y={48} width={64} height={5} rx={2.5} fill="#C7CED8" />
        <rect x={18} y={62} width={50} height={5} rx={2.5} fill="#C7CED8" />
        <rect x={18} y={76} width={58} height={5} rx={2.5} fill="#C7CED8" />
        {paper && <path d="M20,104 q10,-12 20,0 t20,0" stroke={C.BRAND_BLUE} strokeWidth={3} fill="none" />}
      </g>
      <circle cx={160} cy={400} r={19} fill={skin} />
      {writing && (
        <g transform={`translate(${wx} ${wy - 4}) rotate(-40)`}>
          <rect x={-4} y={-50} width={8} height={50} rx={3} fill={C.NAVY} />
        </g>
      )}
      <circle cx={wx} cy={wy} r={19} fill={skin} />
    </g>
  );
};

export const Person: React.FC<PersonProps & {look: Look}> = ({
  look,
  pose = 'idle',
  fromPose,
  poseT = 1,
  expression = 'neutral',
  seed = 'p',
  flip = false,
  holding = null,
  rightProp,
  leftProp,
  chestProp,
  walkPhase,
  talking = false,
}) => {
  const frame = useCurrentFrame();
  const breath = Math.sin((frame / 90) * Math.PI * 2) * 2.4; // 2px setelah skala

  // kedip deterministik setiap 2–4 detik
  let blink = 0;
  {
    let t = Math.floor(random(seed + 'b0') * 40);
    let i = 0;
    while (t <= frame + 6 && i < 300) {
      const d = frame - t;
      if (d >= 0 && d < 6) blink = d < 3 ? d / 2.5 : (6 - d) / 3;
      t += 60 + Math.floor(random(seed + 'b' + i) * 60);
      i++;
    }
  }
  const talk = talking ? Math.abs(Math.sin(frame / 3.1 + random(seed + Math.floor(frame / 9)) * 2)) : 0;

  const A = POSES[pose];
  const B = fromPose ? POSES[fromPose] : A;
  const t = fromPose ? poseT : 1;
  let L = mixArm(B.L, A.L, t);
  let R = mixArm(B.R, A.R, t);
  const legSwing = lerp(B.legSwing ?? 0, A.legSwing ?? 0, t);
  const phase = walkPhase ?? frame / 6;
  const swing = legSwing * Math.sin(phase) * 14;
  const bob = legSwing * Math.abs(Math.cos(phase)) * -8;
  if (pose === 'walk') {
    L = [L[0] - swing, L[1]];
    R = [R[0] - swing, R[1]];
  }
  const holdingArms = holding !== null && (pose === 'holdPaper' || pose === 'sign' || pose === 'carry');
  const done = t > 0.6;

  return (
    <g transform={flip ? 'scale(-1 1)' : undefined}>
      <ellipse cx={0} cy={0} rx={96} ry={15} fill={C.NAVY} opacity={0.13} />
      <g transform={`scale(${K}) translate(-200 ${-FEET_Y})`}>
        <g transform={`translate(0 ${bob})`}>
          {/* kaki */}
          <g transform={`rotate(${swing} 168 525)`}>
            <rect x={140} y={520} width={56} height={320} rx={14} fill={look.pants} />
            <ellipse cx={164} cy={848} rx={36} ry={15} fill={look.shoe} />
          </g>
          <g transform={`rotate(${-swing} 232 525)`}>
            <rect x={204} y={520} width={56} height={320} rx={14} fill={look.pants} />
            <ellipse cx={236} cy={848} rx={36} ry={15} fill={look.shoe} />
          </g>
          <rect x={196} y={520} width={8} height={60} fill={look.pants} />
          <g transform={`translate(0 ${breath})`}>
            {look.hairBack}
            {look.torso}
            <rect x={183} y={222} width={34} height={48} rx={10} fill={look.skinShade} />
            {!look.hideEars && (
              <>
                <circle cx={141} cy={178} r={13} fill={look.skinShade} />
                <circle cx={259} cy={178} r={13} fill={look.skinShade} />
              </>
            )}
            <ellipse cx={200} cy={170} rx={60} ry={70} fill={look.skin} />
            {look.overHead}
            <Face expression={expression} blink={blink} talk={talk} skinShade={look.skinShade} />
            {look.hairFront}
            {chestProp}
            <ArmG x={138} a={L} look={look} prop={leftProp} />
            <ArmG
              x={262}
              a={R}
              look={look}
              thumb={pose === 'thumbsUp' && done}
              finger={pose === 'point' && done}
              prop={rightProp}
            />
            {holdingArms && <HeldProp holding={holding} skin={look.skin} pose={pose} frame={frame} />}
          </g>
        </g>
      </g>
    </g>
  );
};

/** Wrapper: menaruh karakter di layar (x, lantai y) dengan scale. */
export const Place: React.FC<{x: number; y?: number; scale?: number; children: React.ReactNode}> = ({
  x,
  y = 1700,
  scale = 1,
  children,
}) => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
    <g transform={`translate(${x} ${y}) scale(${scale})`}>{children}</g>
  </svg>
);

/** Posisi kepala dalam koordinat komponen (kaki = 0). Untuk avatar & balon. */
export const HEAD = {y: (170 - FEET_Y) * K, r: 70 * K, top: (84 - FEET_Y) * K};
