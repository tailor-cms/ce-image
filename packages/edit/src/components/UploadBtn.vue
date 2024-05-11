<template>
  <span>
    <VBtn
      :loading="isFileDialogVisible"
      color="blue-grey-darken-3"
      variant="tonal"
      @click="handleFileImport"
    >
      <VIcon class="mr-2">mdi-upload</VIcon>
      Upload image
    </VBtn>
    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <input
      ref="uploadInputRef"
      accept="image/png, image/jpeg"
      class="d-none"
      type="file"
      @change="upload"
    />
  </span>
</template>

<script setup lang="ts">
import { defineEmits, inject, ref } from 'vue';
import type { InputFileEvent, StorageApi } from '@tailor-cms/cek-common';
import { createUploadForm } from '@tailor-cms/cek-common';

const storageService = inject('$storageService') as StorageApi;

const emit = defineEmits(['upload']);

const uploadInputRef = ref<HTMLInputElement | null>(null);
const isFileDialogVisible = ref(false);

const handleFileImport = () => {
  isFileDialogVisible.value = true;
  // Upon closing the FilePicker return the button state to normal
  window.addEventListener(
    'focus',
    () => {
      isFileDialogVisible.value = false;
    },
    { once: true },
  );
  uploadInputRef.value?.click();
};

const upload = async (e: InputFileEvent | any) => {
  const form = createUploadForm(e);
  if (!form) return;
  const { key, url } = await storageService.upload(form);
  emit('upload', {
    key,
    url,
  });
};
</script>
