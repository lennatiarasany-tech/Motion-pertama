import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Karyawan, Owner} from '../characters';
import {At, Flash, HeadScrim, Stage, Vignette, useDolly} from '../components/Camera';
import {Chip} from '../components/Chip';
import {Headline} from '../components/Headline';
import {PharmacyRoom} from '../components/PharmacyRoom';
import {Subs} from '../components/Subtitle';
import {CHIPS, HEAD, SUBS} from '../script';
import {C, FONT} from '../theme';

/**
 * SCENE 7 — CTA (180f) · APOTEK (terang)
 * A (0–90)  mulai close-up owner berpikir → tarik mundur; shield hijau + sunburst; "PERNAH KECOLONGAN JUGA?"
 * B (90–180) headline berganti "STOK AMAN. MODAL AMAN."; logo + tombol Coba GRATIS berdenyut; owner menunjuk.
 */
export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cam = useDolly({fx: 300, z: 1.75}, [
    {at: 6, dur: 24, fx: 540, z: 1.0},
    {at: 118, dur: 93, fx: 540, z: 1.1},
  ]);
  const shieldIn = spring({frame: frame - 18, fps, config: {damping: 12, mass: 0.7}});
  const toB = spring({frame: frame - 114, fps, config: {damping: 16, mass: 0.8}});
  const shieldY = interpolate(toB, [0, 1], [880, 760]);
  const shieldS = shieldIn * interpolate(toB, [0, 1], [1, 0.62]);
  const logos = spring({frame: frame - 122, fps, config: {damping: 15}});
  const btn = spring({frame: frame - 130, fps, config: {damping: 12, mass: 0.6}});
  const pulse = frame > 145 ? 1 + Math.sin((frame - 145) / 5) * 0.035 : 1;
  const ownerPose = frame < 60 ? 'thinking' : frame < 116 ? 'idle' : 'point';
  const ownerT = spring({frame: frame - (frame < 116 ? 60 : 116), fps, config: {damping: 16, mass: 0.75}});

  return (
    <AbsoluteFill>
      <Stage cam={cam} room={<PharmacyRoom frame={frame} />}>
        <At x={260} s={0.75}>
          <Owner
            fromPose={frame < 60 ? undefined : frame < 116 ? 'thinking' : 'idle'}
            pose={ownerPose}
            poseT={ownerT}
            expression={frame < 60 ? 'worried' : 'smile'}
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
      <Headline lines={HEAD.s7a.lines} delay={14} out={106} />
      {frame >= 112 && <Headline lines={HEAD.s7b.lines} size={116} delay={114} />}
      {frame < 114 && <Chip text={CHIPS.s7} variant="yellow" x={540} y={1185} delay={72} />}
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
      <Flash at={114} max={0.25} />
      <Subs subs={SUBS.s7} />
    </AbsoluteFill>
  );
};
