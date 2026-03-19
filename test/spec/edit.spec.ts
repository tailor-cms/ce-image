import { expect, test } from '@playwright/test';
import { elementClient } from '@tailor-cms/cek-e2e';

import { Edit } from '../pom';

const ELEMENT_ID = 'test-image-edit';
const IMAGE_URL = 'https://picsum.photos/200';

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID);
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('When image is not set', () => {
  test('Shows placeholder', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.placeholder).toBeVisible();
  });
});

test.describe('When image is set', () => {
  test.beforeEach(async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      url: IMAGE_URL,
      alt: '',
      assets: {},
    });
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('Shows image', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.imageWrapper).toBeVisible();
  });

  test('Can enter and save alt text', async ({ page }) => {
    const edit = new Edit(page);
    await edit.persistFocus();
    await edit.fillAltText('A beautiful sunset');
    await expect(edit.editor.getByAltText('A beautiful sunset')).toBeVisible();
    await page.reload({ waitUntil: 'networkidle' });
    await edit.persistFocus();
    await expect(edit.altTextInput).toHaveValue('A beautiful sunset');
  });
});

test.afterAll(async () => {
  await elementClient.reset(ELEMENT_ID);
});
