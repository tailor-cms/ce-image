<template>
  <VSheet
    :class="dense ? 'pt-3' : 'pa-12'"
    class="d-flex flex-column align-center transparent text-grey-darken-4"
  >
    <VAvatar
      :color="isDisabled ? 'grey-darken-3' : 'teal-accent-4'"
      :icon="icon"
      :size="dense ? 40 : 60"
      variant="tonal"
    />
    <div
      :class="[
        isDisabled ? 'text-grey-darken-3' : 'text-grey-darken-4',
        dense ? 'my-2 text-subtitle-2' : 'my-4 text-h6',
      ]"
    >
      {{ name }}
    </div>
    <div v-if="!dense && !isDisabled" class="text-subtitle-1">
      <template v-if="!isFocused">{{ placeholder }}</template>
      <template v-else>
        <span class="pr-2">{{ activePlaceholder }}</span>
        <VIcon v-if="activeIcon" color="primary-darken-4" size="20">
          {{ activeIcon }}
        </VIcon>
      </template>
    </div>
  </VSheet>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  placeholder: { type: String, default: 'Select to edit' },
  activePlaceholder: { type: String, default: 'Use toolbar to edit' },
  activeIcon: { type: String, default: null },
  activeColor: { type: String, default: '#fff' },
  isDisabled: { type: Boolean, default: false },
  isFocused: { type: Boolean, default: false },
  dense: { type: Boolean, default: false },
});
</script>
