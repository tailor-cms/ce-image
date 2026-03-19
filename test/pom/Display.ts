import type { Locator } from '@playwright/test';
import type { Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

export class Display extends pom.DisplayPanel {
  readonly placeholder: Locator;
  readonly image: Locator;
  readonly zoomOverlay: Locator;
  readonly zoomedImage: Locator;
  readonly closeBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.placeholder = this.editor.getByText('Image placeholder');
    this.image = this.editor.locator('.image-preview');
    this.zoomOverlay = this.el.locator('.v-overlay');
    this.zoomedImage = this.zoomOverlay.locator('img');
    this.closeBtn = this.zoomOverlay.locator('button');
  }
}
