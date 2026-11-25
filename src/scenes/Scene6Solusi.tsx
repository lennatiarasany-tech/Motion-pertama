import React from 'react';
import {at} from '../vo';
import {AbsoluteFill, Freeze, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Karyawan, Owner, Place} from '../characters';
import {HeadScrim, Stage, useDolly} from '../components/Camera';
import {PharmacyRoom} from '../components/PharmacyRoom';
import {Chip} from '../components/Chip';
import {Headline} from '../components/Headline';
import {CHIPS, HEAD} from '../script';
import {C} from '../theme';

/**
 * SCENE 6 — SOLUSI (390 frame / 13 detik)
 * Memakai screen recording asli fitur "Upload & Baca Faktur" (public/screens/penerimaan.mp4, 1728×1080).
 *   0–90    rekaman diputar 2× : Upload → Baca → Petakan → Analisa
 *   90+     gambar dibekukan di layar Analisa, kamera zoom ke 3 temuan
 *   95–165  Keterangan "Tidak Dipesan"     → 🚫 produk di luar SP
 *   170–250 kartu "Perubahan Harga" & "ED" → 📈 / ⏳
 *   255+    zoom out, chip berjajar + centang, owner masuk (thumbsUp)
 */

const SRC = {w: 1728, h: 1080, chrome: 128}; // tinggi bar browser yang dipotong
const BOX = {x: 70, y: 650, w: 940};
const BOX_H = Math.round((BOX.w * (SRC.h - SRC.chrome)) / SRC.w); // 518
const S0 = BOX.w / SRC.w;

/** zoom pertama tepat sebelum VO "Produk di luar SP"; zoom out di "Jadi, bisa cek cepat" */
const ZOOM1 = at('s6Solusi', 'produk2', -12);
const OUT = at('s6Solusi', 'jadi2', -6);
type Cam = {at: number; dur: number; fx: number; fy: number; z: number};
const FULL = {fx: SRC.w / 2, fy: SRC.chrome + (SRC.h - SRC.chrome) / 2, z: 1};
const CAMS: Cam[] = [
  {at: ZOOM1, dur: 26, fx: 1400, fy: 660, z: 2.6}, // keterangan baris 1–3
  {at: at('s6Solusi', 'harga1', -10), dur: 26, fx: 460, fy: 392, z: 2.1}, // kartu harga & ED
  {at: OUT, dur: 30, ...FULL},
];

// kotak sorot dalam koordinat rekaman asli
const HL = [
  {x: 1420, y: 566, w: 216, h: 50, at: at('s6Solusi', 'luar1')}, // "Tidak Dipesan" baris 1
  {x: 1420, y: 692, w: 216, h: 64, at: at('s6Solusi', 'sp1')}, // baris 3
  {x: 66, y: 305, w: 386, h: 165, at: at('s6Solusi', 'harga1', 4)}, // Perubahan Harga Tidak Wajar
  {x: 470, y: 305, w: 386, h: 165, at: at('s6Solusi', 'ed2')}, // ED < 12 Bulan
];

const useCam = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  let {fx, fy, z} = FULL;
  for (const k of CAMS) {
    const p = spring({frame: frame - k.at, fps, durationInFrames: k.dur, config: {damping: 200}});
    fx += (k.fx - fx) * p;
    fy += (k.fy - fy) * p;
    z += (k.z - z) * p;
  }
  const s = S0 * z;
  // jaga supaya tepi rekaman tidak terlihat
  let tx = BOX.w / 2 - fx * s;
  let ty = BOX_H / 2 - fy * s;
  tx = Math.min(0, Math.max(BOX.w - SRC.w * s, tx));
  ty = Math.min(-SRC.chrome * s, Math.max(BOX_H - SRC.h * s, ty));
  return {tx, ty, s};
};

const Screen: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {tx, ty, s} = useCam();
  const enter = spring({frame, fps, config: {damping: 16, mass: 0.75}});
  const video = staticFile('screens/penerimaan.mp4');
  return (
    <div
      style={{
        position: 'absolute',
        left: BOX.x,
        top: BOX.y,
        width: BOX.w,
        height: BOX_H,
        borderRadius: 28,
        overflow: 'hidden',
        background: '#fff',
        boxShadow: `0 ${14 + 18 * enter}px ${34 + 26 * enter}px rgba(25,41,59,${0.12 + 0.1 * enter})`,
        border: `6px solid ${C.CARD_WHITE}`,
        transform: `translateY(${(1 - enter) * 80}px)`,
        opacity: Math.min(1, enter * 1.5),
      }}
    >
      <div style={{position: 'absolute', left: 0, top: 0, width: SRC.w, height: SRC.h, transformOrigin: '0 0', transform: `translate(${tx}px, ${ty}px) scale(${s})`}}>
        <Sequence durationInFrames={ZOOM1} layout="none">
          <OffthreadVideo src={video} playbackRate={(6.3 * 30) / ZOOM1} muted style={{width: SRC.w, height: SRC.h}} />
        </Sequence>
        <Sequence from={ZOOM1} layout="none">
          <Freeze frame={195}>
            <OffthreadVideo src={video} muted style={{width: SRC.w, height: SRC.h}} />
          </Freeze>
        </Sequence>
        {HL.map((h, i) => {
          const p = spring({frame: frame - h.at, fps, config: {damping: 14, mass: 0.6}});
          const fade = interpolate(frame, [OUT, OUT + 18], [1, 0.0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          if (p < 0.01) return null;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: h.x,
                top: h.y,
                width: h.w,
                height: h.h,
                border: `${7 / s}px solid ${C.HIGHLIGHT}`,
                background: 'rgba(255,216,77,0.18)',
                borderRadius: 10,
                transform: `scale(${0.8 + 0.2 * p})`,
                opacity: p * fade,
                boxShadow: `0 0 0 ${3 / s}px rgba(25,41,59,0.15)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const Check: React.FC<{x: number; y: number; delay: number}> = ({x, y, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: {damping: 14, mass: 0.6}});
  return (
    <svg width={64} height={64} viewBox="-32 -32 64 64" style={{position: 'absolute', left: x - 32, top: y - 32, transform: `scale(${p})`}}>
      <circle r={28} fill={C.SUCCESS} />
      <path d="M -12 0 L -3 10 L 13 -9" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const Scene6Solusi: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ownerIn = spring({frame: frame - at('s6Solusi', 'jadi2'), fps, durationInFrames: 36, config: {damping: 200}});
  const ownerX = interpolate(ownerIn, [0, 1], [-160, 250]);
  const thumbs = spring({frame: frame - at('s6Solusi', 'cek1', 10), fps, config: {damping: 16, mass: 0.75}});
  const room = useDolly({fx: 300, z: 1.3}, [{at: 0, dur: 474, fx: 760, z: 1.22}]);
  const kPose = spring({frame: frame - 10, fps, config: {damping: 16, mass: 0.75}});
  return (
    <AbsoluteFill>
      <Stage cam={room} room={<PharmacyRoom frame={frame} />} blur={20} />
      <AbsoluteFill style={{background: 'rgba(230,238,250,0.35)'}} />
      <HeadScrim />
      <AbsoluteFill style={{transform: `scale(${interpolate(frame, [0, 390], [1, 1.03])})`, transformOrigin: '50% 60%'}}>
        <Headline
          kicker={HEAD.s6.kicker}
          kickerColor={C.BRAND_BLUE}
          kickerAt={at('s6Solusi', 'di4')}
          lines={HEAD.s6.lines}
          size={104}
          times={['faktur2', 'masuk1', 'langsung2', 'dicocokkan1'].map((w) => at('s6Solusi', w))}
        />
        <Screen />

        {/* chip temuan, menumpuk di bawah layar */}
        <Chip text={CHIPS.s6[0]} variant="white" x={430} y={1262} anchor="left" delay={at('s6Solusi', 'luar1')} size={32} />
        <Chip text={CHIPS.s6[1]} variant="white" x={430} y={1352} anchor="left" delay={at('s6Solusi', 'berubah1')} size={32} />
        <Chip text={CHIPS.s6[2]} variant="white" x={430} y={1442} anchor="left" delay={at('s6Solusi', 'kurang1')} size={32} />
        <Check x={392} y={1262} delay={at('s6Solusi', 'cek1')} />
        <Check x={392} y={1352} delay={at('s6Solusi', 'cek1', 6)} />
        <Check x={392} y={1442} delay={at('s6Solusi', 'cek1', 12)} />
        <Chip text={CHIPS.s6[3]} variant="blue" x={430} y={1540} anchor="left" delay={at('s6Solusi', 'cepat2')} size={34} />

        <Place x={frame < at('s6Solusi', 'jadi2') ? 170 : interpolate(ownerIn, [0, 1], [170, 80])} scale={0.7}>
          <Karyawan fromPose="idle" pose="holdPaper" poseT={kPose} holding="clipboard" expression={frame > 120 ? 'smile' : 'neutral'} />
        </Place>
        {frame >= at('s6Solusi', 'jadi2') && (
          <Place x={ownerX} scale={0.7}>
            <Owner pose={ownerIn < 0.98 ? 'walk' : 'thumbsUp'} fromPose={ownerIn < 0.98 ? undefined : 'idle'} poseT={thumbs} expression="smile" />
          </Place>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
