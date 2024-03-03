<template>
  <VImg :src="data.url" class="mx-auto">
    <template #placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <VProgressCircular color="blue-grey-darken-3" indeterminate />
      </div>
    </template>
  </VImg>
</template>

<script setup lang="ts">
import { ElementData } from 'tce-manifest';

defineProps<{ id: number; data: ElementData; userState: any }>();
</script>

<style scoped></style>
