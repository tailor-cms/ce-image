<template>
  <div class="tce-image-root">
    <VOverlay
      v-if="element.data.url"
      v-model="isZoomed"
      :class="{ expanded: isZoomed }"
      content-class="d-flex align-center justify-center h-100 w-100"
      close-on-content-click
    >
      <template #activator="{ props: overlayProps }">
        <VImg
          v-bind="overlayProps"
          :alt="element.data.alt"
          :src="element.data.url"
          class="image-preview mx-auto"
        >
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <VProgressCircular color="blue-grey-darken-3" indeterminate />
            </div>
          </template>
        </VImg>
      </template>
      <VBtn
        class="position-absolute top-0 right-0 ma-4"
        color="white"
        icon="mdi-close"
        variant="tonal"
        @click="isZoomed = false"
      />
      <img
        :alt="element.data.alt"
        :src="element.data.url"
        style="max-width: 100vh; max-height: 100vh"
      />
    </VOverlay>
    <VSheet
      v-else
      class="d-flex justify-center align-center my-2 text-title-large"
      height="15.5rem"
    >
      <VIcon class="mr-2">mdi-image-outline</VIcon>
      Image placeholder
    </VSheet>
  </div>
</template>

<script setup lang="ts">
import { type Element } from '@tailor-cms/ce-image-manifest';
import { ref } from 'vue';

defineProps<{ element: Element }>();

const isZoomed = ref(false);
</script>

<style scoped>
.image-preview {
  cursor: zoom-in;
}

.v-overlay {
  transition: all 0.3s ease;

  &.expanded {
    backdrop-filter: blur(18px);
  }
}
</style>
