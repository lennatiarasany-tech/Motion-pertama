import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Karyawan, Kasir, PasienBapak, PasienIbu, Sales} from '../characters';
import {At, Flash, HeadScrim, Stage, Vignette, useDolly} from '../components/Camera';
import {Chip} from '../components/Chip';
import {Headline} from '../components/Headline';
import {PharmacyRoom} from '../components/PharmacyRoom';
import {Box, CashierDesk, CircleAnnotation, PaperProp} from '../components/Props';
import {Speech} from '../components/Speech';
import {Subs} from '../components/Subtitle';
import {CHIPS, HEAD, SUBS} from '../script';
import {ZONE} from '../theme';

/**
 * SCENE 3 — BURU-BURU (210f) · KASIR APOTEK
 * 0–48    medium: sales menyodorkan faktur ke karyawan
 * 50–76   whip ke antrean di kasir (karyawan cemas)
 * 78–100  whip balik + punch-in: karyawan tanda tangan cepat
 * 100–180 SLOW-MO: warna turun 40%, vinyet; sales menyelipkan 2 dus → lingkaran + chip
 * 182+    tarik mundur, warna kembali
 */
const FLOOR = ZONE.floorY;
const STACK_X = 690;
const BOX_H = 105;

export const Scene3BuruBuru: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cam = useDolly({fx: 690, z: 1.32}, [
    {at: 88, dur: 16, fx: 250, z: 1.42},
    {at: 136, dur: 14, fx: 480, z: 1.85},
    {at: 160, dur: 64, fx: 690, z: 1.5},
    {at: 226, dur: 30, fx: 600, z: 1.2},
  ]);

  // slow-motion: saturasi turun 40% + vinyet
  const slow = interpolate(frame, [154, 164, 226, 236], [0, 1, 1, 0.6], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sat = `saturate(${1 - 0.4 * slow})`;

  // dus selipan (gerak lambat)
  const slip1 = spring({frame: frame - 166, fps, durationInFrames: 30, config: {damping: 200}});
  const slip2 = spring({frame: frame - 182, fps, durationInFrames: 30, config: {damping: 200}});
  const ring = interpolate(frame, [200, 212], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const top0 = FLOOR - 3 * BOX_H;

  const signing = frame >= 138;
  const kPose = signing ? 'sign' : 'holdPaper';

  return (
    <AbsoluteFill>
      <Stage cam={cam} room={<PharmacyRoom frame={frame} />} worldFilter={sat} roomFilter={sat}>
        {/* kasir & antrean di kiri */}
        <At x={60} y={FLOOR - 60} s={0.68}>
          <Kasir expression="neutral" talking={frame > 70 && frame < 110} />
        </At>
        <g transform={`translate(60 ${FLOOR}) scale(0.82)`}>
          <CashierDesk x={0} y={0} />
        </g>
        <At x={250} s={0.7}>
          <PasienIbu expression="worried" flip talking={frame > 90 && frame < 128} />
        </At>
        <At x={-120} s={0.7}>
          <PasienBapak pose="thinking" expression="worried" flip />
        </At>
        <Speech x={170} y={1180} text="Mbak, cepetan ya…" from={92} to={132} tail={70} />

        {/* tumpukan dus SP (3) + selipan (2) */}
        <Box x={STACK_X} y={FLOOR} w={150} h={BOX_H} />
        <Box x={STACK_X} y={FLOOR - BOX_H} w={150} h={BOX_H} />
        <Box x={STACK_X} y={FLOOR - 2 * BOX_H} w={150} h={BOX_H} />
        {frame >= 164 && <Box x={interpolate(slip1, [0, 1], [880, STACK_X])} y={interpolate(slip1, [0, 1], [top0 - 30, top0])} w={150} h={BOX_H} rot={-3 + 3 * slip1} />}
        {frame >= 180 && (
          <Box x={interpolate(slip2, [0, 1], [880, STACK_X + 4])} y={interpolate(slip2, [0, 1], [top0 - BOX_H - 40, top0 - BOX_H])} w={150} h={BOX_H} rot={4 - 2 * slip2} />
        )}
        <CircleAnnotation cx={STACK_X} cy={top0 - BOX_H + 10} rx={130} ry={140} progress={ring} />

        <At x={480} s={0.8}>
          <Karyawan
            pose={kPose}
            holding="clipboard"
            expression={frame < 88 ? 'neutral' : frame < 160 ? 'worried' : 'neutral'}
          />
        </At>
        <At x={900} s={0.8}>
          <Sales
            pose={frame < 150 ? 'point' : 'idle'}
            flip
            expression="smile"
            talking={frame > 6 && frame < 78}
            rightProp={frame < 138 ? <PaperProp x={0} y={-10} rot={90} /> : undefined}
          />
        </At>
      </Stage>
      <Vignette z={cam.z} base={0.06 + 0.25 * slow} />
      <Flash at={136} max={0.3} />
      <HeadScrim />
      <Headline lines={HEAD.s3.lines} size={100} />
      <Chip text={CHIPS.s3a} variant="yellow" x={1000} y={720} anchor="right" delay={12} style={{opacity: frame > 86 ? 0 : 1}} />
      <Chip text={CHIPS.s3b} variant="red" x={540} y={780} delay={212} />
      <Subs subs={SUBS.s3} />
    </AbsoluteFill>
  );
};
