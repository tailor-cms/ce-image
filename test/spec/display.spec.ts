import { expect, test } from '@playwright/test';
import { elementClient } from '@tailor-cms/cek-e2e';

import { Display } from '../pom';

const ELEMENT_ID = 'test-image-display';

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID);
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('When image is not set', () => {
  test('Shows placeholder', async ({ page }) => {
    const display = new Display(page);
    await expect(display.placeholder).toBeVisible();
  });
});

test.describe('When image is set', () => {
  const IMAGE_URL = 'https://picsum.photos/200';
  const ALT_TEXT = 'A sunset over the ocean';

  test.beforeEach(async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      url: IMAGE_URL,
      alt: ALT_TEXT,
      assets: {},
    });
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('Shows image with alt text', async ({ page }) => {
    const display = new Display(page);
    await expect(display.image).toBeVisible();
    await expect(display.image.locator('img')).toHaveAttribute('alt', ALT_TEXT);
  });

  test('Opens image viewer on click', async ({ page }) => {
    const display = new Display(page);
    await display.image.hover();
    await display.viewerBtn.click();
    await expect(display.viewerImage).toBeVisible();
    await expect(display.viewerImage).toHaveAttribute('alt', ALT_TEXT);
  });

  test('Closes image viewer via close button', async ({ page }) => {
    const display = new Display(page);
    await display.image.hover();
    await display.viewerBtn.click();
    await expect(display.viewerImage).toBeVisible();
    await display.closeBtn.click();
    await expect(display.viewerImage).not.toBeVisible();
  });
});

test.afterAll(async () => {
  await elementClient.reset(ELEMENT_ID);
});
