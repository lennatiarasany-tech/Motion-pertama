import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Owner} from '../characters';
import {At, Flash, HeadScrim, Stage, Vignette, useDolly, useShake} from '../components/Camera';
import {Chip} from '../components/Chip';
import {Headline} from '../components/Headline';
import {Box} from '../components/Props';
import {Subs} from '../components/Subtitle';
import {EdStack, Warehouse} from '../components/Warehouse';
import {CHIPS, HEAD, SUBS} from '../script';
import {ZONE} from '../theme';

/**
 * SCENE 1 — HOOK (120f) · GUDANG APOTEK
 * 0–46   close-up dus "ED 4 BLN"; dus atas jatuh SLOW-MO ke dalam frame
 * 46     benturan: getar + kilat + SFX pop
 * 48–70  whip pull-back ke lebar: owner kaget di samping tumpukan
 * 72–120 dorongan pelan ke owner
 */
export const IMPACT = 46;

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cam = useDolly({fx: 735, z: 2.3}, [
    {at: 48, dur: 20, fx: 560, z: 1.0},
    {at: 74, dur: 68, fx: 470, z: 1.25},
  ]);
  const shake = useShake([IMPACT], 16, 14);

  // jatuh slow-motion: lambat di awal (kesan melayang), mantul setelah benturan
  const fallT = interpolate(frame, [14, IMPACT], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fall = Math.pow(fallT, 2.4);
  const bounce = spring({frame: frame - IMPACT, fps, config: {damping: 8, mass: 0.6}});
  const landY = ZONE.floorY - 26 - 3 * 120;
  const boxY = frame < IMPACT ? interpolate(fall, [0, 1], [880, landY]) : landY - (1 - bounce) * 0;
  const boxRot = frame < IMPACT ? interpolate(fall, [0, 1], [-28, 4]) : 4 + Math.sin((frame - IMPACT) / 2) * (1 - bounce) * 6;
  const squash = frame >= IMPACT ? 1 - (1 - bounce) * 0.12 : 1;

  const shocked = spring({frame: frame - IMPACT - 2, fps, config: {damping: 14, mass: 0.6}});

  return (
    <AbsoluteFill>
      <Stage cam={cam} room={<Warehouse frame={frame} />} shake={shake} blur={6}>
        <EdStack x={720} />
        <g transform={`translate(735 ${boxY}) scale(1 ${squash}) translate(-735 ${-boxY})`}>
          <Box x={735} y={boxY} rot={boxRot} label="ED 4 BLN" />
        </g>
        <At x={330} s={0.9}>
          <Owner fromPose="idle" pose="shocked" poseT={shocked} expression={frame < IMPACT ? 'neutral' : 'shocked'} />
        </At>
      </Stage>
      <Vignette z={cam.z} />
      <Flash at={IMPACT} max={0.35} />
      <div style={{opacity: Math.min(1, Math.max(0, (frame - 44) / 10))}}>
        <HeadScrim />
      </div>
      <Headline kicker={HEAD.s1.kicker} lines={HEAD.s1.lines} delay={50} />
      <Chip text={CHIPS.s1} variant="yellow" x={700} y={760} delay={80} />
      <Subs subs={SUBS.s1} />
    </AbsoluteFill>
  );
};
