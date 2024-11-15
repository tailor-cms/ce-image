<template>
  <div>
    <VTextarea
      v-model="altText"
      label="Image alt text"
      placeholder="Enter image alt text..."
      variant="outlined"
      clearable
      @update:focused="onFocusChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { Element } from '@tailor-cms/ce-image-manifest';
import { ref } from 'vue';

const props = defineProps<{ element: Element }>();
const emit = defineEmits(['save']);

const altText = ref(props.element.data.alt || '');

const onFocusChange = (focused: boolean) => {
  if (focused) return;
  emit('save', {
    ...props.element.data,
    alt: altText.value,
  });
};
</script>

<style scoped></style>
