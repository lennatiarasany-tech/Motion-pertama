import React from 'react';
import {Composition} from 'remotion';
import {H, W} from './theme';
import * as SF from './stylesheets/StyleFrames';
import {Scene2Setup} from './scenes/Scene2Setup';
import {Scene6Solusi} from './scenes/Scene6Solusi';
import {Scene1Hook} from './scenes/Scene1Hook';
import {Scene3BuruBuru} from './scenes/Scene3BuruBuru';
import {Scene4Terbongkar} from './scenes/Scene4Terbongkar';
import {Scene5Twist} from './scenes/Scene5Twist';
import {Scene7CTA} from './scenes/Scene7CTA';
import {SalesNyelip} from './SalesNyelip';
import {SCENES, TOTAL} from './timing';

const frames: [string, React.FC][] = [
  ['SF0-Cast', SF.SFCast],
  ['SF1-Hook', SF.SFHook],
  ['SF2-Setup', Scene2Setup],
  ['SF3-BuruBuru', SF.SFRush],
  ['SF4-Terbongkar', SF.SFReveal],
  ['SF5a-Telepon', SF.SFPhone],
  ['SF5b-Twist', SF.SFTwist],
  ['SF6-Solusi', Scene6Solusi],
  ['SF7-CTA', SF.SFCta],
];

export const RemotionRoot: React.FC = () => (
  <>
    {frames.map(([id, C]) => (
      <Composition key={id} id={id} component={C} durationInFrames={90} fps={30} width={W} height={H} />
    ))}
    <Composition id="SalesNyelip" component={SalesNyelip} durationInFrames={TOTAL} fps={30} width={W} height={H} />
    <Composition id="Scene1Hook" component={Scene1Hook} durationInFrames={SCENES.s1Hook} fps={30} width={W} height={H} />
    <Composition id="Scene2Setup" component={Scene2Setup} durationInFrames={SCENES.s2Setup} fps={30} width={W} height={H} />
    <Composition id="Scene3BuruBuru" component={Scene3BuruBuru} durationInFrames={SCENES.s3BuruBuru} fps={30} width={W} height={H} />
    <Composition id="Scene4Terbongkar" component={Scene4Terbongkar} durationInFrames={SCENES.s4Terbongkar} fps={30} width={W} height={H} />
    <Composition id="Scene5Twist" component={Scene5Twist} durationInFrames={SCENES.s5Twist} fps={30} width={W} height={H} />
    <Composition id="Scene6Solusi" component={Scene6Solusi} durationInFrames={SCENES.s6Solusi} fps={30} width={W} height={H} />
    <Composition id="Scene7CTA" component={Scene7CTA} durationInFrames={SCENES.s7Cta} fps={30} width={W} height={H} />
  </>
);
