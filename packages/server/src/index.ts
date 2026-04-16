import type { HookMap, ServerModule } from '@tailor-cms/cek-common';
import { initState, mocks, type } from '@tailor-cms/ce-image-manifest';
import type { Element } from '@tailor-cms/ce-image-manifest';

export const hookMap: HookMap<Element> = new Map();

const serverModule: ServerModule<Element> = {
  type,
  initState,
  hookMap,
  mocks,
};

export default serverModule;
export { type, initState, mocks };
