<template>
  <div class="background-input-container d-flex align-center justify-center">
    <VBtn
      v-if="element.data.url"
      color="blue-grey-darken-3"
      variant="tonal"
      @click="replace"
    >
      <VIcon class="mr-2">mdi-image-remove-outline</VIcon>
      Replace image
    </VBtn>
    <UploadBtn v-else @upload="upload" />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import type { Element } from '@tailor-cms/ce-image-manifest';

import UploadBtn from './UploadBtn.vue';

const props = defineProps<{ element: Element }>();
const emit = defineEmits(['save', 'replace']);

const upload = ({ url }: { key: string; url: string }) => {
  emit('save', {
    ...props.element.data,
    assets: {
      url,
    },
  });
};

const replace = () => {
  emit('save', {
    assets: {},
  });
};
</script>
