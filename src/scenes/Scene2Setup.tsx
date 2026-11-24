import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Karyawan, Kasir, PasienBapak, PasienIbu, PasienMas, Pose, Sales} from '../characters';
import {Chip} from '../components/Chip';
import {HeadScrim} from '../components/Camera';
import {Headline} from '../components/Headline';
import {PharmacyRoom} from '../components/PharmacyRoom';
import {Box, CashierDesk, Clipboard} from '../components/Props';
import {Subs} from '../components/Subtitle';
import {SUBS} from '../script';
import {C, FONT, ZONE} from '../theme';

/**
 * SCENE 2 — SETUP (241 frame / 8 detik, mengikuti VO)
 * Kamera "slow-motion dolly": maju-mundur mengikuti karakter.
 *   0–40   dorong pelan ke kasir & ibu yang sedang bicara
 *   45–85  geser ke kanan mengikuti bapak & mas di antrean
 *   90–120 tarik mundur ke lebar, pintu terbuka
 *   120+   sales masuk (walk), kamera mendorong mengikuti sales
 * Origin zoom = garis lantai, jadi kaki karakter tidak pernah terpotong.
 */

const S = 0.68; // skala karakter di scene ini
const FLOOR = ZONE.floorY;

type Key = {at: number; dur: number; fx: number; z: number};
const CAM: Key[] = [
  {at: 0, dur: 54, fx: 400, z: 1.42},
  {at: 62, dur: 56, fx: 800, z: 1.42},
  {at: 125, dur: 36, fx: 540, z: 1.0},
  {at: 172, dur: 66, fx: 860, z: 1.28},
];
const CAM_START = {fx: 540, z: 1.0};

const useCamera = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  let fx = CAM_START.fx;
  let z = CAM_START.z;
  for (const k of CAM) {
    const p = spring({frame: frame - k.at, fps, durationInFrames: k.dur, config: {damping: 200}});
    fx = fx + (k.fx - fx) * p;
    z = z + (k.z - z) * p;
  }
  return {fx, z};
};

const worldT = (fx: number, z: number) => `translate(${540 - fx * z} ${FLOOR - FLOOR * z}) scale(${z})`;

/** Balon bicara di koordinat dunia. Muncul pop + hilang pelan. */
const Speech: React.FC<{x: number; y: number; text: string; from: number; to: number; tail?: number}> = ({
  x,
  y,
  text,
  from,
  to,
  tail = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sIn = spring({frame: frame - from, fps, config: {damping: 14, mass: 0.6}});
  const out = interpolate(frame, [to - 8, to], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = sIn * out;
  if (s <= 0.001) return null;
  const fs = 34;
  const w = text.length * fs * 0.56 + 48;
  const h = 72;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={Math.min(1, s * 1.5)}>
      <path d={`M ${tail - 16} ${h / 2 - 4} L ${tail + 4} ${h / 2 + 26} L ${tail + 18} ${h / 2 - 4} Z`} fill="#FFFFFF" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill="#FFFFFF" />
      <text x={0} y={12} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={fs} fill={C.NAVY}>
        {text}
      </text>
    </g>
  );
};

/** Karakter di koordinat dunia. */
const At: React.FC<{x: number; y?: number; children: React.ReactNode}> = ({x, y = FLOOR, children}) => (
  <g transform={`translate(${x} ${y}) scale(${S})`}>{children}</g>
);

export const Scene2Setup: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {fx, z} = useCamera();

  // latar bergerak lebih lambat (paralaks) dan sedikit blur saat kamera mendekat (kesan depth of field)
  const zBg = 1 + (z - 1) * 0.4;
  const fxBg = 540 + (fx - 540) * 0.6;
  const blur = (z - 1) * 9;

  const sp = (d: number) => spring({frame: frame - d, fps, config: {damping: 16, mass: 0.75}});

  // pintu & sales
  const door = sp(162);
  const walkIn = spring({frame: frame - 170, fps, durationInFrames: 48, config: {damping: 200}});
  const salesX = interpolate(walkIn, [0, 1], [1260, 1040]);
  const salesWalking = frame >= 170 && frame < 216;
  const salesPose: Pose = 'carry';

  // pose & ekspresi yang berganti
  const karyawanT = sp(18);
  const bapakT = sp(70);

  return (
    <AbsoluteFill style={{background: C.BG_LIGHT}}>
      {/* LATAR (paralaks + blur) */}
      <AbsoluteFill style={{filter: `blur(${blur}px)`}}>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <g transform={worldT(fxBg, zBg)}>
            <PharmacyRoom frame={frame} doorOpen={door} />
          </g>
        </svg>
      </AbsoluteFill>

      {/* DUNIA (karakter) */}
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
        <g transform={worldT(fx, z)}>
          {/* kasir di balik meja */}
          <At x={210} y={FLOOR - 60}>
            <Kasir pose={frame < 40 ? 'point' : 'idle'} expression="smile" talking={frame < 38} />
          </At>
          <g transform={`translate(210 ${FLOOR}) scale(0.82)`}>
            <CashierDesk x={0} y={0} />
          </g>

          {/* karyawan andalan — sibuk, idle → holdPaper */}
          <At x={400}>
            <Karyawan
              fromPose="idle"
              pose="holdPaper"
              poseT={karyawanT}
              expression={frame > 190 ? 'shocked' : 'worried'}
              holding={karyawanT > 0.5 ? 'clipboard' : null}
            />
          </At>

          {/* antrean pasien (karakter nyata) */}
          <At x={600}>
            <PasienIbu pose="idle" expression={frame < 95 ? 'neutral' : 'smile'} talking={frame >= 35 && frame < 95} flip />
          </At>
          <At x={740}>
            <PasienBapak fromPose="idle" pose="thinking" poseT={bapakT} expression="worried" talking={frame >= 78 && frame < 135} flip />
          </At>
          <At x={880}>
            <PasienMas pose="phone" expression={frame < 95 ? 'neutral' : 'suspicious'} talking={frame >= 102 && frame < 165} rightProp={<PhoneIcon />} />
          </At>

          {/* sales masuk dari pintu */}
          {frame >= 166 && (
            <At x={salesX}>
              <Sales pose={salesPose} walkPhase={salesWalking ? undefined : 0} expression="smile" flip talking={frame >= 205} holding="box" />
            </At>
          )}

          {/* balon bicara */}
          <Speech x={500} y={1200} text="Mbak, obat batuk ada?" from={35} to={97} tail={90} />
          <Speech x={730} y={1160} text="Masih lama, Mbak?" from={78} to={140} tail={10} />
          <Speech x={900} y={1240} text="Iya, masih antre…" from={104} to={168} tail={-20} />
          <Speech x={900} y={1200} text="Permisi, antar barang!" from={205} to={260} tail={130} />

          {/* chip antrean menempel di dunia, di atas antrean */}
          <foreignObject x={560} y={1040} width={400} height={90}>
            <div style={{position: 'relative', width: 400, height: 90}}>
              <Chip text="antre 8 pasien" variant="red" x={200} y={45} delay={128} />
            </div>
          </foreignObject>
        </g>
      </svg>

      {/* vignette halus, makin terasa saat kamera mendekat */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 62%, rgba(22,38,56,0) 55%, rgba(22,38,56,${0.06 + (z - 1) * 0.35}) 100%)`,
        }}
      />

      <HeadScrim />
      {/* LAYAR (tidak ikut kamera): headline selalu di zona teks */}
      <Headline kicker="SETIAP HARI" lines={['APOTEK RAMAI,', 'YANG JAGA', 'CUMA *2* *ORANG*']} size={100} />
      <Subs subs={SUBS.s2} />
    </AbsoluteFill>
  );
};

const PhoneIcon: React.FC = () => (
  <g transform="rotate(10)">
    <rect x={-14} y={-34} width={28} height={58} rx={6} fill={C.NAVY} />
    <rect x={-10} y={-28} width={20} height={42} rx={3} fill="#5D8BE6" />
  </g>
);
