import type {
  DataInitializer,
  ElementData,
  ElementManifest,
} from './interfaces';

export const type = 'IMAGE';
export const name = 'Image';

export const initState: DataInitializer = (): ElementData => ({
  url: null,
  alt: '',
  assets: {},
});

export const version = '1.0';

const ui = {
  icon: 'mdi-image',
  forceFullWidth: false,
};

export const isEmpty = (data: ElementData): boolean => !data.url;

const manifest: ElementManifest = {
  type,
  version,
  name,
  ssr: false,
  initState,
  isEmpty,
  ui,
};

export default manifest;
export * from './interfaces';
