import React from 'react';
import {AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Owner} from '../characters';
import {At, HeadScrim, Stage, Vignette, useDolly, useShake} from '../components/Camera';
import {ChatBubble} from '../components/Cards';
import {Headline} from '../components/Headline';
import {PharmacyRoom} from '../components/PharmacyRoom';
import {CashierDesk, Phone} from '../components/Props';
import {Subs} from '../components/Subtitle';
import {Warehouse} from '../components/Warehouse';
import {CHIPS, HEAD, SUBS} from '../script';
import {C, FONT, ZONE} from '../theme';

/**
 * SCENE 5 — TWIST (270f)
 * A (0–125)  GUDANG, siang: owner menelepon sales. Kamera mulai close-up wajah, mundur pelan.
 *            "RETUR?" dicoret merah + getar.
 * Iris (120–140) melingkar dari owner → APOTEK MALAM (satu-satunya BG_DARK).
 * B (120–270) lampu meja kasir, owner memegang faktur. Kamera dorong pelan.
 *            Headline 1 → jeda hening 15f → ekspresi berubah → Headline 2.
 */
export const STRIKE = 50;
export const IRIS = 138;
export const SILENCE = [236, 248] as const;

const PartA: React.FC = () => {
  const frame = useCurrentFrame();
  const cam = useDolly({fx: 420, z: 1.75}, [{at: 4, dur: 60, fx: 520, z: 1.12}]);
  const shake = useShake([STRIKE], 10, 10);
  const strike = interpolate(frame, [STRIKE - 12, STRIKE], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const {fps} = useVideoConfig();
  const retur = spring({frame: frame - 6, fps, config: {damping: 12, mass: 0.6}});
  return (
    <AbsoluteFill>
      <Stage cam={cam} room={<Warehouse frame={frame} />} shake={shake}>
        <At x={420} s={0.9}>
          <Owner pose="phone" expression={frame < STRIKE ? 'worried' : 'shocked'} rightProp={<Phone />} />
        </At>
      </Stage>
      <Vignette z={cam.z} />
      <HeadScrim />
      <div style={{position: 'absolute', top: ZONE.text.top, height: 400, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translate(${shake.x}px,0)`}}>
        <div style={{position: 'relative', fontFamily: FONT, fontWeight: 800, fontSize: 160, color: C.NAVY, letterSpacing: 1, transform: `scale(${retur})`}}>
          RETUR?
          <svg width="112%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{position: 'absolute', left: '-6%', top: 0, overflow: 'visible'}}>
            {strike > 0.01 && <line x1={0} y1={64} x2={100 * strike} y2={64 - 22 * strike} stroke={C.ALERT_RED} strokeLinecap="round" style={{strokeWidth: 18}} vectorEffect="non-scaling-stroke" />}
          </svg>
        </div>
      </div>
      <ChatBubble x={330} y={700} w={680} name="Sales PBF" text={CHIPS.s5chat} tail="left" delay={64} />
    </AbsoluteFill>
  );
};

const PartB: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cam = useDolly({fx: 600, z: 1.0}, [{at: 0, dur: 216, fx: 560, z: 1.34}]);
  const realize = spring({frame: frame - (SILENCE[0] - IRIS + 4), fps, config: {damping: 16}});
  const flick = 0.92 + Math.sin(frame / 3) * 0.02 + Math.sin(frame / 7.3) * 0.02;
  return (
    <AbsoluteFill style={{background: C.BG_DARK}}>
      <Stage cam={cam} room={<PharmacyRoom frame={frame} />} roomFilter="brightness(0.3) saturate(0.7)" worldFilter="brightness(0.82)">
        {/* cahaya lampu meja */}
        <defs>
          <radialGradient id="lamp" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={C.HIGHLIGHT} stopOpacity={0.42 * flick} />
            <stop offset="100%" stopColor={C.HIGHLIGHT} stopOpacity={0} />
          </radialGradient>
        </defs>
        <ellipse cx={640} cy={1420} rx={460} ry={420} fill="url(#lamp)" />
        <At x={500} s={0.9}>
          <Owner pose="holdPaper" holding="paper" expression={realize < 0.5 ? 'worried' : 'suspicious'} />
        </At>
        <g transform={`translate(860 ${ZONE.floorY}) scale(0.82)`}>
          <CashierDesk x={0} y={0} />
        </g>
        {/* lampu meja di atas kasir */}
        <g transform={`translate(760 ${ZONE.floorY - 205})`}>
          <rect x={-50} y={-10} width={100} height={14} rx={7} fill="#3A5876" />
          <rect x={-6} y={-150} width={12} height={145} rx={6} fill="#3A5876" />
          <path d="M -70 -150 Q -5 -230 60 -150 Z" fill={C.BRAND_BLUE} />
          <ellipse cx={-5} cy={-150} rx={66} ry={11} fill={C.HIGHLIGHT} opacity={flick} />
        </g>
      </Stage>
      <Vignette z={cam.z} base={0.3} dark />
      <HeadScrim dark />
      <Headline lines={HEAD.s5a.lines} color="#FFFFFF" size={108} delay={14} out={SILENCE[0] - IRIS - 8} />
      {frame >= SILENCE[1] - IRIS && <HeadlineAt from={SILENCE[1] - IRIS} />}
    </AbsoluteFill>
  );
};

const HeadlineAt: React.FC<{from: number}> = ({from}) => {
  // Headline kedua muncul setelah jeda hening
  return <Headline lines={HEAD.s5b.lines} color="#FFFFFF" size={100} delay={from} />;
};

export const Scene5Twist: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const iris = spring({frame: frame - IRIS, fps, durationInFrames: 20, config: {damping: 200}});
  const r = iris * 2300;
  // pusat iris = wajah owner di part A
  return (
    <AbsoluteFill>
      {frame < IRIS + 22 && <PartA />}
      {frame >= IRIS && (
        <AbsoluteFill style={{clipPath: `circle(${r}px at 470px 1180px)`}}>
          <SequenceFrom from={IRIS}>
            <PartB />
          </SequenceFrom>
        </AbsoluteFill>
      )}
      <Subs subs={SUBS.s5} />
    </AbsoluteFill>
  );
};

/** Sequence kecil supaya PartB punya frame lokal mulai 0. */
const SequenceFrom: React.FC<{from: number; children: React.ReactNode}> = ({from, children}) => (
  <Sequence from={from} layout="none">
    {children}
  </Sequence>
);
