import baseManifest from '@tailor-cms/ce-image-manifest';
import type { ElementManifest } from '@tailor-cms/ce-image-manifest';

import Display from './components/Display.vue';

const manifest: ElementManifest = {
  ...baseManifest,
  Display,
};

export default manifest;
export { Display };
