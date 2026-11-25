import React from 'react';
import {at} from '../vo';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Karyawan, Owner} from '../characters';
import {At, Flash, HeadScrim, Stage, Vignette, useDolly} from '../components/Camera';
import {Chip} from '../components/Chip';
import {Headline} from '../components/Headline';
import {PharmacyRoom} from '../components/PharmacyRoom';
import {CHIPS, HEAD} from '../script';
import {C, FONT} from '../theme';

/**
 * SCENE 7 — CTA (180f) · APOTEK (terang)
 * A (0–90)  mulai close-up owner berpikir → tarik mundur; shield hijau + sunburst; "PERNAH KECOLONGAN JUGA?"
 * B (90–180) headline berganti "STOK AMAN. MODAL AMAN."; logo + tombol Coba GRATIS berdenyut; owner menunjuk.
 */
export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  /** B = mulai bagian 2 ("Coba gratis…"), T1 = owner berhenti berpikir */
  const B = at('s7Cta', 'coba1', -4);
  const T1 = at('s7Cta', 'juga2', 6);
  const cam = useDolly({fx: 300, z: 1.75}, [
    {at: 6, dur: 24, fx: 540, z: 1.0},
    {at: B, dur: 90, fx: 540, z: 1.1},
  ]);
  const shieldIn = spring({frame: frame - 18, fps, config: {damping: 12, mass: 0.7}});
  const toB = spring({frame: frame - B, fps, config: {damping: 16, mass: 0.8}});
  const shieldY = interpolate(toB, [0, 1], [880, 760]);
  const shieldS = shieldIn * interpolate(toB, [0, 1], [1, 0.62]);
  const logos = spring({frame: frame - at('s7Cta', 'apotek6', -4), fps, config: {damping: 15}});
  const btn = spring({frame: frame - at('s7Cta', 'gratis1'), fps, config: {damping: 12, mass: 0.6}});
  const P = at('s7Cta', 'gratis1', 14);
  const pulse = frame > P ? 1 + Math.sin((frame - P) / 5) * 0.035 : 1;
  const ownerPose = frame < T1 ? 'thinking' : frame < B ? 'idle' : 'point';
  const ownerT = spring({frame: frame - (frame < B ? T1 : B), fps, config: {damping: 16, mass: 0.75}});

  return (
    <AbsoluteFill>
      <Stage cam={cam} room={<PharmacyRoom frame={frame} />}>
        <At x={260} s={0.75}>
          <Owner
            fromPose={frame < T1 ? undefined : frame < B ? 'thinking' : 'idle'}
            pose={ownerPose}
            poseT={ownerT}
            expression={frame < T1 ? 'worried' : 'smile'}
          />
        </At>
        <At x={860} s={0.75}>
          <Karyawan pose={frame < 40 ? 'idle' : 'thumbsUp'} fromPose="idle" poseT={spring({frame: frame - 40, fps, config: {damping: 16}})} expression="smile" />
        </At>
      </Stage>
      <Vignette z={cam.z} />
      <HeadScrim />
      {/* sunburst + shield */}
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute'}}>
        <g transform={`translate(540 ${shieldY})`} opacity={0.22 * shieldIn}>
          {Array.from({length: 16}).map((_, i) => (
            <path key={i} d="M 0 0 L -42 -380 L 42 -380 Z" fill={C.HIGHLIGHT} transform={`rotate(${i * 22.5 + frame * 0.35})`} />
          ))}
        </g>
        <g transform={`translate(540 ${shieldY}) scale(${shieldS})`}>
          <path d="M 0 -170 L 140 -120 Q 140 90 0 170 Q -140 90 -140 -120 Z" fill={C.SUCCESS} />
          <path d="M 0 -170 L 140 -120 Q 140 90 0 170 Z" fill="#1E9E64" />
          <path d="M -58 0 L -14 44 L 64 -44" stroke="#fff" strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      <Headline lines={HEAD.s7a.lines} times={['pernah1', 'kecolongan1', 'juga2'].map((w) => at('s7Cta', w))} out={B - 6} />
      {frame >= B && <Headline lines={HEAD.s7b.lines} size={116} times={[B + 2, B + 8, at('s7Cta', 'gratis1'), at('s7Cta', 'gratis1', 6)]} />}
      {frame < B && <Chip text={CHIPS.s7} variant="yellow" x={540} y={1185} delay={at('s7Cta', 'tulis1')} />}
      {/* logo resmi + tombol */}
      <div
        style={{
          position: 'absolute',
          top: 930,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 30,
          opacity: logos,
          transform: `translateY(${(1 - logos) * 40}px)`,
        }}
      >
        <div style={{background: '#fff', borderRadius: 28, padding: '18px 30px', display: 'flex', alignItems: 'center', gap: 26, boxShadow: '0 12px 28px rgba(25,41,59,0.12)'}}>
          <Img src={staticFile('logo-apotek-digital.png')} style={{height: 86}} />
          <span style={{fontFamily: FONT, fontWeight: 700, fontSize: 40, color: C.KICKER}}>×</span>
          <Img src={staticFile('logo-digikes.png')} style={{height: 70}} />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 1080,
          left: 540,
          transform: `translateX(-50%) scale(${btn * pulse})`,
          background: C.BRAND_BLUE,
          color: '#fff',
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 56,
          padding: '24px 70px',
          borderRadius: 999,
          boxShadow: `0 16px ${34 + 10 * (pulse - 1) * 20}px rgba(45,100,207,0.4)`,
          whiteSpace: 'nowrap',
        }}
      >
        Coba GRATIS
      </div>
      <Flash at={B} max={0.25} />
    </AbsoluteFill>
  );
};
