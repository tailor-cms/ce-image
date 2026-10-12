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
  test('Shows dropzone as empty state', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.fileInput.dropzone).toBeVisible();
    await expect(edit.placeholder).not.toBeVisible();
    await expect(edit.image).not.toBeVisible();
  });

  test('Can import image via URL', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.openUrlFromDropzone();
    await edit.fileInput.importUrl(IMAGE_URL);
    await expect(edit.image).toBeVisible();
    await expect(edit.image.locator('img')).toHaveAttribute('src', IMAGE_URL);
  });

  test('Can upload image file via dropzone', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.dropzoneUpload(IMAGE);
    await expect(edit.image).toBeVisible();
    await expect(edit.fileInput.dropzone).not.toBeVisible();
    // File row only renders when file-key (assets.url) is set —
    // proves onUpload mapped the storage key, not just publicUrl.
    await edit.fileInput.expectFile('test-image.jpg');
  });

  test('Rejects non-image file', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.dropzoneUpload(DOCUMENT);
    await expect(edit.fileInput.dropzone).toBeVisible();
    await expect(edit.image).not.toBeVisible();
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
    await expect(edit.image).toBeVisible();
    await expect(edit.image.locator('img')).toHaveAttribute('src', IMAGE_URL);
  });

  test('Can remove image', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.removeFromRow();
    await expect(edit.image).not.toBeVisible();
    await expect(edit.fileInput.dropzone).toBeVisible();
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
    await edit.fileInput.replace();
    await edit.fileInput.upload(IMAGE);
    await edit.fileInput.expectFile('test-image.jpg');
    await expect(edit.altTextInput).toHaveValue('Existing alt text');
    await expect(edit.editor.getByAltText('Existing alt text')).toBeVisible();
  });
});

test.describe('Readonly mode', () => {
  test('Shows placeholder instead of dropzone when empty', async ({ page }) => {
    const edit = new Edit(page);
    await edit.setReadonly();
    await expect(edit.placeholder).toBeVisible();
    await expect(edit.fileInput.dropzone).not.toBeVisible();
  });

  test('Keeps image visible and hides file actions when set', async ({
    page,
  }) => {
    await elementClient.update(ELEMENT_ID, {
      url: IMAGE_URL,
      alt: 'Sunset',
      assets: {},
    });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await edit.setReadonly();
    await edit.focus();
    await expect(edit.image).toBeVisible();
    await expect(edit.fileInput.replaceBtn).not.toBeVisible();
  });
});
