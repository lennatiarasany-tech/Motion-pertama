import React from 'react';
import {random, useCurrentFrame} from 'remotion';
import {CHAR, C} from '../theme';

/**
 * Basis karakter seri Apotek Digital.
 * Gaya: flat vector, kepala bulat, mata titik, pipi merona, tanpa outline,
 * bayangan lembut satu tingkat. Titik (0,0) = telapak kaki di lantai.
 * Tinggi badan ±650px pada scale 1.
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

type P = [number, number];
type ArmPose = {elbow: P; hand: P};
type PoseDef = {L: ArmPose; R: ArmPose; legSwing?: number};

// Titik siku & tangan relatif terhadap bahu (bahu kiri layar x=-64, kanan x=+64, y=-392)
export const POSES: Record<Pose, PoseDef> = {
  idle: {L: {elbow: [-12, 86], hand: [-16, 168]}, R: {elbow: [12, 86], hand: [16, 168]}},
  point: {L: {elbow: [-12, 86], hand: [-16, 168]}, R: {elbow: [72, -36], hand: [150, -92]}},
  thinking: {L: {elbow: [-12, 86], hand: [-16, 168]}, R: {elbow: [48, -70], hand: [-6, -146]}},
  shocked: {L: {elbow: [-70, -38], hand: [-82, -128]}, R: {elbow: [70, -38], hand: [82, -128]}},
  thumbsUp: {L: {elbow: [-12, 86], hand: [-16, 168]}, R: {elbow: [44, 74], hand: [104, 16]}},
  holdPaper: {L: {elbow: [-20, 78], hand: [36, 104]}, R: {elbow: [20, 78], hand: [-36, 104]}},
  sign: {L: {elbow: [-20, 78], hand: [36, 104]}, R: {elbow: [34, 80], hand: [-20, 92]}},
  walk: {L: {elbow: [-30, 80], hand: [-46, 160]}, R: {elbow: [30, 80], hand: [50, 158]}, legSwing: 1},
  phone: {L: {elbow: [-12, 86], hand: [-16, 168]}, R: {elbow: [54, -4], hand: [14, -94]}},
  carry: {L: {elbow: [-20, 78], hand: [36, 104]}, R: {elbow: [20, 78], hand: [-36, 104]}, legSwing: 1},
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpP = (a: P, b: P, t: number): P => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
const mixPose = (a: PoseDef, b: PoseDef, t: number): PoseDef => ({
  L: {elbow: lerpP(a.L.elbow, b.L.elbow, t), hand: lerpP(a.L.hand, b.L.hand, t)},
  R: {elbow: lerpP(a.R.elbow, b.R.elbow, t), hand: lerpP(a.R.hand, b.R.hand, t)},
  legSwing: lerp(a.legSwing ?? 0, b.legSwing ?? 0, t),
});

export type Look = {
  skin: string;
  skinShade: string;
  top: string; // baju/jas
  topShade: string;
  sleeve: string;
  pants: string;
  shoe: string;
  hairBack?: React.ReactNode; // di belakang kepala
  hairFront?: React.ReactNode; // di depan kepala
  torsoDetail?: React.ReactNode; // dasi, name tag, kerah
  longCoat?: boolean;
  headTilt?: number;
};

export type PersonProps = {
  pose?: Pose;
  fromPose?: Pose;
  poseT?: number; // 0..1 transisi dari fromPose ke pose
  expression?: Expression;
  seed?: string;
  flip?: boolean;
  /** Benda yang dipegang tangan kanan (koordinat lokal tangan) */
  rightProp?: React.ReactNode;
  leftProp?: React.ReactNode;
  /** benda di depan dada (clipboard/faktur), digambar di atas badan, di bawah tangan */
  chestProp?: React.ReactNode;
  walkPhase?: number;
  /** mulut bergerak seperti sedang bicara */
  talking?: boolean;
};

const HEAD_Y = -488;
const HEAD_R = 80;
const SHOULDER_Y = -392;
const SHOULDER_X = 64;

const Eyes: React.FC<{expression: Expression; blink: number}> = ({expression, blink}) => {
  const ey = HEAD_Y + 4;
  const ex = 28;
  const big = expression === 'shocked';
  const r = big ? 9.5 : 7.5;
  const sy = Math.max(0.12, 1 - blink);
  if (expression === 'suspicious') {
    return (
      <g>
        {[-ex, ex].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy={ey + 2} rx={8.5} ry={4.5 * sy} fill={CHAR.hair} />
            <rect x={x - 12} y={ey - 6} width={24} height={5} rx={2.5} fill={CHAR.hair} opacity={0.85} />
          </g>
        ))}
      </g>
    );
  }
  return (
    <g>
      {[-ex, ex].map((x) => (
        <ellipse key={x} cx={x} cy={ey} rx={r} ry={r * sy} fill={CHAR.hair} />
      ))}
    </g>
  );
};

const Brows: React.FC<{expression: Expression}> = ({expression}) => {
  const y = HEAD_Y - 22;
  const brow = (x: number, rot: number, dy = 0) => (
    <rect
      x={x - 13}
      y={y + dy - 3}
      width={26}
      height={6}
      rx={3}
      fill={CHAR.hair}
      opacity={0.9}
      transform={`rotate(${rot} ${x} ${y + dy})`}
    />
  );
  switch (expression) {
    case 'worried':
      return (
        <g>
          {brow(-28, -16, 2)}
          {brow(28, 16, 2)}
        </g>
      );
    case 'shocked':
      return (
        <g>
          {brow(-29, -6, -10)}
          {brow(29, 6, -10)}
        </g>
      );
    case 'suspicious':
      return (
        <g>
          {brow(-28, 14, 4)}
          {brow(28, -6, -4)}
        </g>
      );
    default:
      return null;
  }
};

const Mouth: React.FC<{expression: Expression; talk?: number}> = ({expression, talk = 0}) => {
  const y = HEAD_Y + 38;
  if (talk > 0.05) {
    return <ellipse cx={0} cy={y + 4} rx={13} ry={3 + 12 * talk} fill="#7A2E2A" />;
  }
  switch (expression) {
    case 'smile':
      return (
        <g>
          <path d={`M -18 ${y - 4} Q 0 ${y + 22} 18 ${y - 4} Z`} fill="#7A2E2A" />
          <path d={`M -10 ${y + 8} Q 0 ${y + 16} 10 ${y + 8} Q 0 ${y + 4} -10 ${y + 8} Z`} fill="#E9766D" />
        </g>
      );
    case 'shocked':
      return <ellipse cx={0} cy={y + 4} rx={12} ry={16} fill="#7A2E2A" />;
    case 'worried':
      return (
        <path
          d={`M -16 ${y + 6} Q -8 ${y - 2} 0 ${y + 4} Q 8 ${y + 10} 16 ${y + 2}`}
          stroke="#7A2E2A"
          strokeWidth={5}
          fill="none"
          strokeLinecap="round"
        />
      );
    case 'suspicious':
      return <rect x={-4} y={y} width={22} height={5} rx={2.5} fill="#7A2E2A" />;
    default:
      return (
        <path
          d={`M -12 ${y} Q 0 ${y + 9} 12 ${y}`}
          stroke="#7A2E2A"
          strokeWidth={5}
          fill="none"
          strokeLinecap="round"
        />
      );
  }
};

const Arm: React.FC<{
  side: -1 | 1;
  def: ArmPose;
  look: Look;
  thumb?: boolean;
  point?: boolean;
  prop?: React.ReactNode;
}> = ({side, def, look, thumb, point, prop}) => {
  const sx = side * SHOULDER_X;
  const sy = SHOULDER_Y + 8;
  const e: P = [sx + def.elbow[0], sy + def.elbow[1]];
  const h: P = [sx + def.hand[0], sy + def.hand[1]];
  const angle = (Math.atan2(h[1] - e[1], h[0] - e[0]) * 180) / Math.PI;
  return (
    <g>
      <path
        d={`M ${sx} ${sy} L ${e[0]} ${e[1]}`}
        stroke={look.sleeve}
        strokeWidth={34}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M ${e[0]} ${e[1]} L ${lerp(e[0], h[0], 0.72)} ${lerp(e[1], h[1], 0.72)}`}
        stroke={look.sleeve}
        strokeWidth={31}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M ${lerp(e[0], h[0], 0.7)} ${lerp(e[1], h[1], 0.7)} L ${h[0]} ${h[1]}`}
        stroke={look.skin}
        strokeWidth={24}
        strokeLinecap="round"
        fill="none"
      />
      <g transform={`translate(${h[0]} ${h[1]}) rotate(${angle})`}>
        <circle r={17} fill={look.skin} />
        {point && <rect x={8} y={-6} width={30} height={12} rx={6} fill={look.skin} />}
        {thumb && <rect x={-6} y={-36} width={13} height={28} rx={6.5} fill={look.skin} transform={`rotate(${-angle - 0})`} />}
        {prop}
      </g>
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
  rightProp,
  leftProp,
  chestProp,
  walkPhase,
  talking = false,
}) => {
  const frame = useCurrentFrame();

  // Idle breathing: naik-turun 2px, siklus 3 detik (90 frame)
  const breath = Math.sin((frame / 90) * Math.PI * 2) * 2;

  // Kedip deterministik setiap 2–4 detik
  let blink = 0;
  {
    let t = Math.floor(random(seed + 'b0') * 40);
    let i = 0;
    while (t <= frame + 6 && i < 200) {
      const d = frame - t;
      if (d >= 0 && d < 6) blink = d < 3 ? d / 2.5 : (6 - d) / 3;
      t += 60 + Math.floor(random(seed + 'b' + i) * 60);
      i++;
    }
  }

  const def0 = fromPose ? mixPose(POSES[fromPose], POSES[pose], poseT) : POSES[pose];
  const def = def0;
  const phase = walkPhase ?? frame / 7;
  const swing = (def.legSwing ?? 0) * Math.sin(phase) * 16;
  const bob = (def.legSwing ?? 0) * Math.abs(Math.cos(phase)) * -6;
  const tilt = look.headTilt ?? 0;

  const legs = (
    <g>
      {[-1, 1].map((s) => {
        const off = s * swing;
        return (
          <g key={s}>
            <path
              d={`M ${s * 26} -230 L ${s * 26 + off} -18`}
              stroke={look.pants}
              strokeWidth={40}
              strokeLinecap="round"
            />
            <ellipse cx={s * 30 + off + s * 6} cy={-10} rx={30} ry={14} fill={look.shoe} />
          </g>
        );
      })}
    </g>
  );

  const torsoBottom = look.longCoat ? -170 : -212;

  return (
    <g transform={flip ? 'scale(-1 1)' : undefined}>
      {/* bayangan elips di lantai */}
      <ellipse cx={0} cy={0} rx={104} ry={16} fill={C.NAVY} opacity={0.14} />
      <g transform={`translate(0 ${bob})`}>
        {legs}
        <g transform={`translate(0 ${breath})`}>
          {look.hairBack && <g transform={`rotate(${tilt} 0 ${HEAD_Y})`}>{look.hairBack}</g>}
          {/* leher */}
          <rect x={-15} y={-420} width={30} height={40} rx={10} fill={look.skinShade} />
          {/* badan */}
          <path
            d={`M -64 -398 Q -76 -398 -78 -380 L -84 ${torsoBottom + 8} Q -84 ${torsoBottom} -74 ${torsoBottom}
                L 74 ${torsoBottom} Q 84 ${torsoBottom} 84 ${torsoBottom + 8} L 78 -380 Q 76 -398 64 -398 Z`}
            fill={look.top}
          />
          {/* bayangan lembut satu tingkat (sisi kanan) */}
          <path
            d={`M 30 -398 L 64 -398 Q 76 -398 78 -380 L 84 ${torsoBottom + 8} Q 84 ${torsoBottom} 74 ${torsoBottom} L 40 ${torsoBottom} Z`}
            fill={look.topShade}
          />
          {look.torsoDetail}
          {chestProp}
          <Arm side={-1} def={def.L} look={look} prop={leftProp} />
          <Arm
            side={1}
            def={def.R}
            look={look}
            thumb={pose === 'thumbsUp' && poseT > 0.6}
            point={pose === 'point' && poseT > 0.6}
            prop={rightProp}
          />
          {/* kepala */}
          <g transform={`rotate(${tilt} 0 ${HEAD_Y + 60})`}>
            <circle cx={-HEAD_R + 2} cy={HEAD_Y + 6} r={14} fill={look.skinShade} />
            <circle cx={HEAD_R - 2} cy={HEAD_Y + 6} r={14} fill={look.skinShade} />
            <circle cx={0} cy={HEAD_Y} r={HEAD_R} fill={look.skin} />
            <ellipse cx={-46} cy={HEAD_Y + 26} rx={15} ry={9} fill={CHAR.blush} opacity={0.45} />
            <ellipse cx={46} cy={HEAD_Y + 26} rx={15} ry={9} fill={CHAR.blush} opacity={0.45} />
            <Eyes expression={expression} blink={blink} />
            <Brows expression={expression} />
            <Mouth expression={expression} talk={talking ? Math.abs(Math.sin(frame / 3.1 + random(seed + Math.floor(frame / 9)) * 2)) : 0} />
            {expression === 'worried' && (
              <path d={`M 82 ${HEAD_Y - 40} q 10 18 0 26 q -10 -8 0 -26 Z`} fill="#8EC5F5" />
            )}
            {look.hairFront}
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
  <svg
    width={1080}
    height={1920}
    viewBox="0 0 1080 1920"
    style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}
  >
    <g transform={`translate(${x} ${y}) scale(${scale})`}>{children}</g>
  </svg>
);

export const HEAD = {y: HEAD_Y, r: HEAD_R};
