import type { Locator } from '@playwright/test';
import type { Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

export class Display extends pom.DisplayPanel {
  readonly placeholder: Locator;
  readonly image: Locator;
  readonly viewerBtn: Locator;
  readonly imageViewer: Locator;
  readonly viewerImage: Locator;
  readonly closeBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.placeholder = this.editor.getByText('Image placeholder');
    this.viewerBtn = this.editor.locator('.image-viewer-activator');
    this.image = this.viewerBtn;
    this.imageViewer = this.el.locator('.v-overlay');
    this.viewerImage = this.imageViewer.locator('img');
    this.closeBtn = this.imageViewer.getByLabel('Close image viewer');
  }
}
