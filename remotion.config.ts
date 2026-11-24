import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
// Container cloud: pakai Chromium headless yang sudah terpasang.
if (process.env.REMOTION_CHROME) {
  Config.setBrowserExecutable(process.env.REMOTION_CHROME);
}
