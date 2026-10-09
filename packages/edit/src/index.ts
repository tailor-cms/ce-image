import baseManifest from '@tailor-cms/ce-image-manifest';
import type { ElementManifest } from '@tailor-cms/ce-image-manifest';

import Edit from './components/Edit.vue';
import SideToolbar from './components/SideToolbar.vue';

const manifest: ElementManifest = {
  ...baseManifest,
  Edit,
  SideToolbar,
};

export default manifest;
export { Edit, SideToolbar };
