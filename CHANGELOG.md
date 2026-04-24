# Changelog

### v2.0.0 2026-04-25

Part of the [Tailor CEK v2 release line][xt-v2]. The four subpackages
(`@tailor-cms/ce-image-display`, `-edit`, `-manifest`, `-server`) now
release in lockstep.

[xt-v2]: https://github.com/tailor-cms/xt/blob/main/CHANGELOG.md#v200-2026-04-25

#### Breaking changes
- Requires **Vuetify 4** and **Node `>=24`**
- Consumes `@tailor-cms/cek-common@^2.0.0`
- `AssetInput` / `ElementPlaceholder` from `@tailor-cms/core-components`
  replaced by globally-registered `TailorFileInput` /
  `TailorElementPlaceholder`; `@tailor-cms/core-components` is no longer
  a dependency
- Upload API: `storageService.upload(file)` takes a native `File`
  (was `FormData`); `createUploadForm` / `UploadFormData` removed

#### Features
- Fullscreen viewer dialog on image click

See the [xt v2.0.0 release notes][xt-v2] for the CEK v2 platform migration
guide.

