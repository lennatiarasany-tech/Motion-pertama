import React from 'react';
import {AbsoluteFill, Audio, Sequence, getStaticFiles, interpolate, staticFile} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {SCENES, TRANSITION, seqDur} from './timing';
import {Scene1Hook, IMPACT} from './scenes/Scene1Hook';
import {Scene2Setup} from './scenes/Scene2Setup';
import {Scene3BuruBuru} from './scenes/Scene3BuruBuru';
import {Scene4Terbongkar, X_AT} from './scenes/Scene4Terbongkar';
import {Scene5Twist, SILENCE, STRIKE, IRIS} from './scenes/Scene5Twist';
import {Scene6Solusi} from './scenes/Scene6Solusi';
import {Scene7CTA} from './scenes/Scene7CTA';

/** Awal tiap scene di timeline global (frame). */
const ORDER = ['s1Hook', 's2Setup', 's3BuruBuru', 's4Terbongkar', 's5Twist', 's6Solusi', 's7Cta'] as const;
export const START: Record<(typeof ORDER)[number], number> = (() => {
  const o = {} as Record<(typeof ORDER)[number], number>;
  let t = 0;
  for (const k of ORDER) {
    o[k] = t;
    t += SCENES[k];
  }
  return o;
})();

const has = (name: string) => getStaticFiles().some((f) => f.name === name);

/** SFX: [nama file, frame global, volume] */
const SFX: [string, number, number][] = [
  ['sfx/whoosh.mp3', START.s1Hook + 14, 0.4],
  ['sfx/pop.mp3', START.s1Hook + IMPACT, 0.6],
  ['sfx/whoosh.mp3', START.s1Hook + 48, 0.35],
  ['sfx/whoosh.mp3', START.s3BuruBuru + 88, 0.35],
  ['sfx/whoosh.mp3', START.s3BuruBuru + 136, 0.45],
  ['sfx/pop.mp3', START.s3BuruBuru + 212, 0.5],
  ...X_AT.map((x): [string, number, number] => ['sfx/error.mp3', START.s4Terbongkar + x, 0.45]),
  ['sfx/error.mp3', START.s5Twist + STRIKE, 0.5],
  ['sfx/whoosh.mp3', START.s5Twist + IRIS, 0.4],
  ['sfx/ding.mp3', START.s6Solusi + 170, 0.5],
  ['sfx/ding.mp3', START.s6Solusi + 218, 0.5],
  ['sfx/ding.mp3', START.s6Solusi + 265, 0.5],
  ['sfx/pop.mp3', START.s7Cta + 130, 0.5],
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
