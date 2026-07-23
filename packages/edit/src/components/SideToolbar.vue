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
import type { Element, ElementData } from '@tailor-cms/ce-image-manifest';
import { ref, watch } from 'vue';

const props = defineProps<{ element: Element }>();
const emit = defineEmits<{ save: [data: ElementData] }>();

const altText = ref(props.element.data.alt || '');

watch(
  () => props.element.data.alt,
  (value = '') => {
    if (value === altText.value) return;
    altText.value = value;
  },
);

const onFocusChange = (focused: boolean) => {
  if (focused) return;
  emit('save', {
    ...props.element.data,
    alt: altText.value,
  });
};
</script>

<style scoped></style>
