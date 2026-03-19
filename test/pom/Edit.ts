import type { Locator } from '@playwright/test';
import type { Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

export class Edit extends pom.EditPanel {
  readonly imageWrapper: Locator;
  readonly placeholder: Locator;
  readonly uploadInput: Locator;
  readonly altTextInput: Locator;

  constructor(page: Page) {
    super(page);
    this.imageWrapper = this.editor.locator('.image-wrapper');
    this.placeholder = this.editor.getByText('Image component');
    this.uploadInput = this.topToolbar.getByText('Upload image');
    this.altTextInput = this.sideToolbar.getByRole('textbox', {
      name: 'Image alt text',
    });
  }

  async fillAltText(text: string) {
    await this.altTextInput.fill(text);
    // Press Tab to blur the textarea and trigger Vuetify's @update:focused
    await this.altTextInput.press('Tab');
  }
}
