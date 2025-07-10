<template>
  <div class="tce-image-root">
    <VImg
      v-if="element.data.url"
      :alt="element.data.alt"
      :src="element.data.url"
      class="mx-auto"
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <VProgressCircular color="blue-grey-darken-3" indeterminate />
        </div>
      </template>
    </VImg>
    <VSheet
      v-else
      class="d-flex justify-center align-center my-2 text-h6"
      height="15.5rem"
    >
      <VIcon class="mr-2">mdi-image-outline</VIcon>
      Image placeholder
    </VSheet>
  </div>
</template>

<script setup lang="ts">
import { Element } from '@tailor-cms/ce-image-manifest';

defineProps<{ element: Element; userState: any }>();
</script>

<style scoped>
.tce-image-root {
}
</style>
