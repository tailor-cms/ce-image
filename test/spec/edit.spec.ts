import { expect, test } from '@playwright/test';
import { elementClient } from '@tailor-cms/cek-e2e';

import { DOCUMENT, IMAGE } from '../fixtures';
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

  test('Can import image via URL', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.open();
    await edit.fileInput.importUrl(IMAGE_URL);
    await edit.imageWrapper.scrollIntoViewIfNeeded();
    await expect(edit.imageWrapper).toBeVisible();
  });

  test('Can upload image file', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.open();
    await edit.fileInput.upload(IMAGE);
    await edit.imageWrapper.scrollIntoViewIfNeeded();
    await expect(edit.imageWrapper).toBeVisible();
    // Remove button only renders when file-key (assets.url) is set —
    // proves onUpload mapped the storage key, not just publicUrl.
    await expect(edit.fileInput.removeBtn).toBeVisible();
  });

  test('Rejects non-image file', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.open();
    await edit.fileInput.upload(DOCUMENT);
    await edit.fileInput.cancel();
    await expect(edit.placeholder).toBeVisible();
    await expect(edit.imageWrapper).not.toBeVisible();
  });

  test('Returns to empty state after upload and delete', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.open();
    await edit.fileInput.upload(IMAGE);
    await edit.imageWrapper.scrollIntoViewIfNeeded();
    await expect(edit.imageWrapper).toBeVisible();
    await edit.fileInput.remove();
    await expect(edit.imageWrapper).not.toBeVisible();
    await expect(edit.placeholder).toBeVisible();
  });
});

test.describe('When image is set', () => {
  test.beforeEach(async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      url: IMAGE_URL,
      alt: 'Existing alt text',
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
    await edit.focus();
    await edit.fillAltText('A beautiful sunset');
    await expect(edit.editor.getByAltText('A beautiful sunset')).toBeVisible();
    await page.reload({ waitUntil: 'networkidle' });
    await edit.focus();
    await expect(edit.altTextInput).toHaveValue('A beautiful sunset');
  });

  test('Preserves alt text when image is replaced', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.open();
    await edit.fileInput.upload(IMAGE);
    await expect(edit.imageWrapper).toBeVisible();
    await expect(edit.altTextInput).toHaveValue('Existing alt text');
  });
});

test.afterAll(async () => {
  await elementClient.reset(ELEMENT_ID);
});
