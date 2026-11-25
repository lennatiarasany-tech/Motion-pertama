import React from 'react';
import {at} from '../vo';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Karyawan, Kasir, PasienBapak, PasienIbu, Sales} from '../characters';
import {At, Flash, HeadScrim, Stage, Vignette, useDolly} from '../components/Camera';
import {Chip} from '../components/Chip';
import {Headline} from '../components/Headline';
import {PharmacyRoom} from '../components/PharmacyRoom';
import {Box, CashierDesk, CircleAnnotation, PaperProp} from '../components/Props';
import {Speech} from '../components/Speech';
import {CHIPS, HEAD} from '../script';
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
    {at: at('s3BuruBuru', 'antrian1', -4), dur: 16, fx: 250, z: 1.42},
    {at: at('s3BuruBuru', 'dicek1', -6), dur: 14, fx: 480, z: 1.85},
    {at: at('s3BuruBuru', 'seadanya1', 4), dur: 64, fx: 690, z: 1.5},
    {at: 226, dur: 30, fx: 600, z: 1.2},
  ]);

  // slow-motion: saturasi turun 40% + vinyet
  const slow = interpolate(frame, [at('s3BuruBuru', 'seadanya1', -5), at('s3BuruBuru', 'seadanya1', 5), 226, 236], [0, 1, 1, 0.6], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sat = `saturate(${1 - 0.4 * slow})`;

  // dus selipan (gerak lambat)
  const slip1 = spring({frame: frame - at('s3BuruBuru', 'seadanya1', 5), fps, durationInFrames: 30, config: {damping: 200}});
  const slip2 = spring({frame: frame - at('s3BuruBuru', 'seadanya1', 19), fps, durationInFrames: 30, config: {damping: 200}});
  const ring = interpolate(frame, [at('s3BuruBuru', 'dan2'), at('s3BuruBuru', 'dan2', 12)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const top0 = FLOOR - 3 * BOX_H;

  const signing = frame >= at('s3BuruBuru', 'dicek1', -4);
  const kPose = signing ? 'sign' : 'holdPaper';

  return (
    <AbsoluteFill>
      <Stage cam={cam} room={<PharmacyRoom frame={frame} />} worldFilter={sat} roomFilter={sat}>
        {/* kasir & antrean di kiri */}
        <At x={60} y={FLOOR - 60} s={0.68}>
          <Kasir expression="neutral" talking={frame > at('s3BuruBuru', 'karena1') && frame < at('s3BuruBuru', 'dicek1')} />
        </At>
        <g transform={`translate(60 ${FLOOR}) scale(0.82)`}>
          <CashierDesk x={0} y={0} />
        </g>
        <At x={250} s={0.7}>
          <PasienIbu expression="worried" flip talking={frame > at('s3BuruBuru', 'antrian1') && frame < at('s3BuruBuru', 'dicek1')} />
        </At>
        <At x={-120} s={0.7}>
          <PasienBapak pose="thinking" expression="worried" flip />
        </At>
        <Speech x={170} y={1180} text="Mbak, cepetan ya…" from={at('s3BuruBuru', 'antrian1', 2)} to={at('s3BuruBuru', 'dicek1')} tail={70} />

        {/* tumpukan dus SP (3) + selipan (2) */}
        <Box x={STACK_X} y={FLOOR} w={150} h={BOX_H} />
        <Box x={STACK_X} y={FLOOR - BOX_H} w={150} h={BOX_H} />
        <Box x={STACK_X} y={FLOOR - 2 * BOX_H} w={150} h={BOX_H} />
        {frame >= at('s3BuruBuru', 'seadanya1', 3) && <Box x={interpolate(slip1, [0, 1], [880, STACK_X])} y={interpolate(slip1, [0, 1], [top0 - 30, top0])} w={150} h={BOX_H} rot={-3 + 3 * slip1} />}
        {frame >= at('s3BuruBuru', 'seadanya1', 17) && (
          <Box x={interpolate(slip2, [0, 1], [880, STACK_X + 4])} y={interpolate(slip2, [0, 1], [top0 - BOX_H - 40, top0 - BOX_H])} w={150} h={BOX_H} rot={4 - 2 * slip2} />
        )}
        <CircleAnnotation cx={STACK_X} cy={top0 - BOX_H + 10} rx={130} ry={140} progress={ring} />

        <At x={480} s={0.8}>
          <Karyawan
            pose={kPose}
            holding="clipboard"
            expression={frame < at('s3BuruBuru', 'antrian1') ? 'neutral' : frame < at('s3BuruBuru', 'seadanya1') ? 'worried' : 'neutral'}
          />
        </At>
        <At x={900} s={0.8}>
          <Sales
            pose={frame < at('s3BuruBuru', 'seadanya1') ? 'point' : 'idle'}
            flip
            expression="smile"
            talking={frame > at('s3BuruBuru', 'sales1', -2) && frame < at('s3BuruBuru', 'karena1', -6)}
            rightProp={frame < at('s3BuruBuru', 'dicek1', -4) ? <PaperProp x={0} y={-10} rot={90} /> : undefined}
          />
        </At>
      </Stage>
      <Vignette z={cam.z} base={0.06 + 0.25 * slow} />
      <Flash at={at('s3BuruBuru', 'dicek1', -6)} max={0.3} />
      <HeadScrim />
      <Headline lines={HEAD.s3.lines} size={100} times={[at('s3BuruBuru', 'dicek1'), at('s3BuruBuru', 'seadanya1'), at('s3BuruBuru', 'langsung1'), at('s3BuruBuru', 'ditandatangan1'), at('s3BuruBuru', 'ditandatangan1', 6)]} />
      <Chip text={CHIPS.s3a} variant="yellow" x={1000} y={720} anchor="right" delay={at('s3BuruBuru', 'minta1')} style={{opacity: frame > at('s3BuruBuru', 'antrian1', -4) ? 0 : 1}} />
      <Chip text={CHIPS.s3b} variant="red" x={540} y={780} delay={at('s3BuruBuru', 'langsung1')} />
    </AbsoluteFill>
  );
};
