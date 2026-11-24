import React from 'react';
import {Composition} from 'remotion';
import {H, W} from './theme';
import * as SF from './stylesheets/StyleFrames';

const frames: [string, React.FC][] = [
  ['SF0-Cast', SF.SFCast],
  ['SF1-Hook', SF.SFHook],
  ['SF2-Setup', SF.SFSetup],
  ['SF3-BuruBuru', SF.SFRush],
  ['SF4-Terbongkar', SF.SFReveal],
  ['SF5a-Telepon', SF.SFPhone],
  ['SF5b-Twist', SF.SFTwist],
  ['SF6-Solusi', SF.SFSolution],
  ['SF7-CTA', SF.SFCta],
];

export const RemotionRoot: React.FC = () => (
  <>
    {frames.map(([id, C]) => (
      <Composition key={id} id={id} component={C} durationInFrames={90} fps={30} width={W} height={H} />
    ))}
  </>
);
