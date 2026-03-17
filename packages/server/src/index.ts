import type {
  BeforeDisplayHook,
  ElementHook,
  OnUserInteractionHook,
} from '@tailor-cms/cek-common';
import { initState, type } from '@tailor-cms/ce-image-manifest';
import type { Element } from '@tailor-cms/ce-image-manifest';

// Detect if hooks are running in CEK (used for mocking end-system runtime)
const IS_CEK = process.env.CEK_RUNTIME;
// Don't use in production, use only when IS_CEK=true
const USER_STATE: any = {};

export const beforeSave: ElementHook<Element> = (element) => {
  return element;
};

export const afterSave: ElementHook<Element> = (element) => {
  return element;
};

export const afterLoaded: ElementHook<Element> = (element, _services, _runtime) => {
  return element;
};

export const afterRetrieve: ElementHook<Element> = (element, _services, _runtime) => {
  return element;
};

export const beforeDisplay: BeforeDisplayHook<Element> = (_element, context) => {
  return { ...context, ...USER_STATE };
};

export const onUserInteraction: OnUserInteractionHook<Element> = (
  _element,
  context,
  payload,
) => {
  // Simulate user state update within CEK
  if (IS_CEK) {
    // Only for showcase purposes
    USER_STATE.interactionTimestamp = new Date().getTime();
    // Can be reset to initial / mocked state via UI
    context.contextTimestamp = USER_STATE.interactionTimestamp;
    Object.assign(USER_STATE, payload);
  }
  // Can have arbitrary return value (interpreted by target system)
  // FE is updated if updateDisplayState is true
  return { updateDisplayState: true };
};

export const hookMap = new Map(
  Object.entries({
    beforeSave,
    afterSave,
    afterLoaded,
    afterRetrieve,
    onUserInteraction,
    beforeDisplay,
  }),
);

export default {
  type,
  hookMap,
  initState,
  beforeSave,
  afterSave,
  afterLoaded,
  afterRetrieve,
  onUserInteraction,
  beforeDisplay,
};

export { type, initState };
