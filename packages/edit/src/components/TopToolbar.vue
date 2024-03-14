<template>
  <div>Hello from TopToolbar!</div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

defineProps<{ element: Element }>();
defineEmits(['save']);
</script>

<style scoped></style>
