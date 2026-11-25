import React from 'react';
import {AbsoluteFill, Audio, Sequence, getStaticFiles, interpolate, staticFile} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {ORDER, START, TRANSITION, seqDur} from './timing';
import {AT} from './voTiming';
import {VoSubtitle} from './components/VoSubtitle';
import {Scene1Hook, IMPACT} from './scenes/Scene1Hook';
export {START};
import {Scene2Setup} from './scenes/Scene2Setup';
import {Scene3BuruBuru} from './scenes/Scene3BuruBuru';
import {Scene4Terbongkar, X_AT} from './scenes/Scene4Terbongkar';
import {Scene5Twist, SILENCE, STRIKE, IRIS} from './scenes/Scene5Twist';
import {Scene6Solusi} from './scenes/Scene6Solusi';
import {Scene7CTA} from './scenes/Scene7CTA';

const has = (name: string) => getStaticFiles().some((f) => f.name === name);

/** SFX (sintesis di public/sfx, buat ulang: python3 scripts/make_sfx.py): [file, frame global, volume] */
const SFX: [string, number, number][] = [
  // transisi antar-scene
  ...ORDER.slice(1).map((k): [string, number, number] => ['sfx/whoosh.wav', START[k] - 6, 0.28]),
  // S1 gudang: dus jatuh slow-mo + benturan
  ['sfx/slowmo.wav', START.s1Hook + 12, 0.35],
  ['sfx/thud.wav', START.s1Hook + IMPACT, 0.85],
  ['sfx/whoosh.wav', START.s1Hook + IMPACT + 2, 0.3],
  ['sfx/pop.wav', AT.rugi1 + 20, 0.4],
  // S2 antrean
  ['sfx/pop.wav', AT['21'], 0.4],
  ['sfx/ding.wav', AT.ada1 - 10, 0.22],
  // S3 buru-buru
  ['sfx/pop.wav', AT.minta1, 0.35],
  ['sfx/whoosh.wav', AT.antrian1 - 6, 0.35],
  ['sfx/whoosh.wav', AT.dicek1 - 8, 0.4],
  ['sfx/scribble.wav', AT.dicek1, 0.5],
  ['sfx/slowmo.wav', AT.seadanya1 - 4, 0.45],
  ['sfx/error.wav', AT.langsung1, 0.35],
  // S4 terbongkar
  ['sfx/pop.wav', AT.ketahuan1, 0.4],
  ['sfx/error.wav', AT.nggak1, 0.45],
  ['sfx/error.wav', AT.ednya1, 0.45],
  // S5 twist
  ['sfx/pop.wav', AT.retur1 - 3, 0.45],
  ['sfx/error.wav', AT.ditolak1, 0.5],
  ['sfx/pop.wav', AT.karena2, 0.3],
  ['sfx/boom.wav', START.s5Twist + IRIS, 0.6],
  // S6 solusi
  ['sfx/whoosh.wav', AT.produk2 - 12, 0.3],
  ['sfx/ding.wav', AT.luar1, 0.45],
  ['sfx/ding.wav', AT.berubah1, 0.45],
  ['sfx/ding.wav', AT.kurang1, 0.45],
  ['sfx/pop.wav', AT.cek1, 0.35],
  ['sfx/sparkle.wav', AT.cepat2, 0.4],
  // S7 CTA
  ['sfx/sparkle.wav', START.s7Cta + 18, 0.35],
  ['sfx/pop.wav', AT.tulis1, 0.35],
  ['sfx/whoosh.wav', AT.coba1 - 6, 0.3],
  ['sfx/pop.wav', AT.gratis1, 0.5],
];

const silenceFrom = START.s5Twist + SILENCE[0];
const silenceTo = START.s5Twist + SILENCE[1];

export const SalesNyelip: React.FC = () => {
  const t = linearTiming({durationInFrames: TRANSITION});
  return (
    <AbsoluteFill style={{background: '#E6EEFA'}}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={seqDur('s1Hook')}>
          <Scene1Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={seqDur('s2Setup')}>
          <Scene2Setup />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={seqDur('s3BuruBuru')}>
          <Scene3BuruBuru />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={seqDur('s4Terbongkar')}>
          <Scene4Terbongkar />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={seqDur('s5Twist')}>
          <Scene5Twist />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: TRANSITION})} />
        <TransitionSeries.Sequence durationInFrames={seqDur('s6Solusi')}>
          <Scene6Solusi />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={seqDur('s7Cta')}>
          <Scene7CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <VoSubtitle />

      {/* Audio: hanya dipasang bila file ada di public/ */}
      {has('vo.mp3') && <Audio src={staticFile('vo.mp3')} />}
      {/* VO per scene: public/vo-s1.mp3 … vo-s7.mp3, mulai tepat di awal scene-nya */}
      {ORDER.map((k, i) => {
        const name = `vo-s${i + 1}.mp3`;
        return has(name) ? (
          <Sequence key={name} from={START[k]} layout="none">
            <Audio src={staticFile(name)} />
          </Sequence>
        ) : null;
      })}
      {has('bgm.mp3') && (
        <Audio
          src={staticFile('bgm.mp3')}
          loop
          volume={(f) => {
            // BGM 20% saat VO ada, hening total saat jeda twist
            if (f >= silenceFrom && f < silenceTo) return 0;
            const anyVo = has('vo.mp3') || ORDER.some((_, i) => has(`vo-s${i + 1}.mp3`));
            const base = anyVo ? 0.2 : 0.5;
            return base * interpolate(f, [0, 30], [0, 1], {extrapolateRight: 'clamp'});
          }}
        />
      )}
      {SFX.filter(([n]) => has(n)).map(([n, at, v], i) => (
        <Sequence key={i} from={at} durationInFrames={60} layout="none">
          <Audio src={staticFile(n)} volume={v} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
