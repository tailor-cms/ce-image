import { initState, type } from '@tailor-cms/ce-image-manifest';

export const hookMap = new Map();

export default {
  type,
  hookMap,
  initState,
};

export { type, initState };
