<template>
  <div class="tce-image">
    <ElementPlaceholder
      v-if="!element.data.url"
      :is-disabled="isDisabled"
      :is-focused="isFocused"
      :name="`${manifest.name} component`"
      active-icon="mdi-arrow-up"
      active-placeholder="Use toolbar to upload the image"
      icon="mdi-image-plus"
    />
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
import type { Element } from '@tailor-cms/ce-image-manifest';
import { ElementPlaceholder } from '@tailor-cms/core-components';
import manifest from '@tailor-cms/ce-image-manifest';

defineEmits(['save']);
defineProps<{
  element: Element;
  isFocused: boolean;
  isDisabled: boolean;
}>();
</script>

<style lang="scss" scoped>
.tce-image {
  text-align: left;
}
</style>
