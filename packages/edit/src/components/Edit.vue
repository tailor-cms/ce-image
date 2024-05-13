<template>
  <div class="tce-image">
    <VSheet
      v-if="!element.data.url"
      class="d-flex justify-center align-center my-2 text-h6"
      height="15.5rem"
    >
      <VIcon class="mr-2">mdi-image-outline</VIcon>
      Image placeholder
    </VSheet>
    <div v-else class="image-wrapper">
      <VImg :alt="element.data.alt" :src="element.data.url" class="mx-auto">
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <VProgressCircular color="blue-grey-darken-3" indeterminate />
          </div>
        </template>
      </VImg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import { Element } from '@tailor-cms/ce-image-manifest';

defineEmits(['save']);
defineProps<{
  element: Element;
  isFocused: boolean;
  isDisabled: boolean;
}>();
</script>
