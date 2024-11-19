<template>
  <div class="tce-root">
    <VImg v-if="data.url" :alt="data.alt" :src="data.url" class="mx-auto">
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
import { ElementData } from '@tailor-cms/ce-image-manifest';

defineProps<{ id: number; data: ElementData; userState: any }>();
</script>

<style scoped>
.tce-root {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}
</style>
