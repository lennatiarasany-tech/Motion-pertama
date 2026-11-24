import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Owner} from '../characters';
import {AvatarBubble, CompareCard, Counter, XList} from '../components/Cards';
import {HeadScrim, Stage, Vignette, useDolly} from '../components/Camera';
import {Chip} from '../components/Chip';
import {Subs} from '../components/Subtitle';
import {EdStack, Warehouse} from '../components/Warehouse';
import {CHIPS, HEAD, SUBS} from '../script';
import {C, FONT} from '../theme';

/**
 * SCENE 4 — TERBONGKAR (300f) · GUDANG (latar blur, fokus ke kartu)
 * Kamera latar bergerak pelan menyusuri tumpukan dus ED.
 * Setiap ❌ muncul, panggung "berdenyut" (punch kecil) + SFX error.
 */
export const X_AT = [40, 92, 160];

export const Scene4Terbongkar: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cam = useDolly({fx: 900, z: 1.45}, [{at: 0, dur: 300, fx: 600, z: 1.25}]);
  let punch = 0;
  for (const t of [...X_AT, 215]) {
    const d = frame - t;
    if (d >= 0 && d < 14) punch += Math.sin((d / 14) * Math.PI) * 0.025;
  }
  const push = 1 + (frame / 300) * 0.04 + punch;
  const avatar = spring({frame: frame - 24, fps, config: {damping: 14}});
  return (
    <AbsoluteFill>
      <Stage cam={cam} room={<Warehouse frame={frame} dim />} blur={40} parallax={0.6}>
        <EdStack x={720} />
      </Stage>
      <AbsoluteFill style={{background: 'rgba(230,238,250,0.55)'}} />
      <Vignette z={1.2} />
      <HeadScrim />
      <AbsoluteFill style={{transform: `scale(${push})`, transformOrigin: '50% 45%'}}>
        <div style={{position: 'absolute', top: 232, left: 0, right: 0, textAlign: 'center', fontFamily: FONT, fontWeight: 700, fontSize: 44, color: C.KICKER}}>
          {HEAD.s4.kicker}
        </div>
        <XList top={310} items={CHIPS.s4x} delays={X_AT} />
        <CompareCard top={680} delay={8} />
        <div style={{opacity: frame >= 215 ? 1 : 0}}>
          <Counter value={3750000} delay={215} x={390} y={1250} />
        </div>
        <Chip text="rugi" variant="red" x={390} y={1360} delay={240} size={36} />
        <div style={{opacity: avatar}}>
          <AvatarBubble x={900} y={1300} size={230} delay={24}>
            <svg width="100%" height="100%" viewBox="-95 -668 190 190">
              <Owner expression={frame < 215 ? 'worried' : 'shocked'} />
            </svg>
          </AvatarBubble>
        </div>
      </AbsoluteFill>
      <Subs subs={SUBS.s4} />
    </AbsoluteFill>
  );
};
