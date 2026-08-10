<template>
  <div class="tce-image-root">
    <VDialog
      aria-label="Image viewer"
      content-class="d-flex align-center justify-center h-100 w-100"
      transition="fade-transition"
      @after-enter="closeBtn?.$el?.focus()"
    >
      <template #activator="{ props: overlayProps }">
        <button
          v-bind="overlayProps"
          :aria-label="`Open image viewer: ${element.data.alt || 'image'}`"
          class="image-viewer-activator"
        >
          <VImg
            :alt="element.data.alt"
            :src="url"
            class="mx-auto"
            rounded="lg"
            width="auto"
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <VProgressCircular
                  aria-label="Loading image"
                  color="blue-grey-darken-3"
                  indeterminate
                />
              </div>
            </template>
          </VImg>
        </button>
      </template>
      <template #default="{ isActive }">
        <VBtn
          ref="closeBtn"
          aria-label="Close image viewer"
          class="position-absolute top-0 right-0"
          color="white"
          icon="mdi-close"
          variant="tonal"
          @click="isActive.value = false"
        />
        <img :alt="element.data.alt" :src="url" class="viewer-image" />
      </template>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import type { Element } from '@tailor-cms/ce-image-manifest';
import type { VBtn } from 'vuetify/components';

const props = defineProps<{ element: Element }>();

const closeBtn = useTemplateRef<InstanceType<typeof VBtn>>('closeBtn');

const url = computed(() => props.element.data.url!);
</script>

<style scoped>
.image-viewer-activator {
  display: block;
  width: 100%;
  border: none;
  padding: 0;
  background: transparent;
  border-radius: 8px;

  &:focus-visible {
    outline: 3px solid highlight;
    outline-offset: 2px;
  }
}

.viewer-image {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 8px;
}

.v-overlay--active {
  backdrop-filter: blur(18px);
}
</style>
