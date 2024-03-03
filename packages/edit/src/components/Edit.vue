<template>
  <div class="tce-image">
    <ElementPlaceholder
      v-if="!element.data.url"
      :dense="false"
      :is-disabled="isDisabled"
      :is-focused="isFocused"
      active-icon="mdi-arrow-up"
      active-placeholder="Use toolbar to upload the image"
      icon="mdi-image-plus"
      name="Image component"
    />
    <div v-else class="image-wrapper">
      <VImg :src="element.data.url" class="mx-auto">
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
import { Element } from 'tce-manifest';

import ElementPlaceholder from './EditPlaceholder.vue';

defineEmits(['save']);
defineProps<{
  element: Element;
  isFocused: boolean;
  isDisabled: boolean;
}>();
</script>
