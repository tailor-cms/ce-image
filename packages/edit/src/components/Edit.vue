<template>
  <div class="tce-image text-left">
    <TailorElementPlaceholder
      v-if="!element.data.url && isReadonly"
      :name="`${manifest.name} component`"
      icon="mdi-image-plus"
      is-readonly
    />
    <TailorFileInput
      v-else
      :allowed-extensions="EXTENSIONS"
      :file-key="element.data.assets?.url || element.data.url"
      :public-url="element.data.url"
      :readonly="isReadonly"
      :show-actions="isFocused"
      mode="dropzone"
      allow-url-source
      @delete="onDelete"
      @input="save"
      @upload="save"
    >
      <VImg
        :alt="element.data.alt"
        :src="element.data.url ?? ''"
        class="mx-auto"
        width="auto"
      >
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <VProgressCircular color="blue-grey-darken-3" indeterminate />
          </div>
        </template>
      </VImg>
    </TailorFileInput>
  </div>
</template>

<script lang="ts" setup>
import type { Element, ElementData } from '@tailor-cms/ce-image-manifest';
import manifest from '@tailor-cms/ce-image-manifest';

const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];

const props = defineProps<{
  element: Element;
  isDragged: boolean;
  isFocused: boolean;
  isReadonly: boolean;
}>();
const emit = defineEmits<{ save: [data: ElementData] }>();

const save = (payload: Record<string, any> | null) => {
  if (!payload) return;
  const { url, publicUrl } = payload;
  const assets = { url };
  emit('save', { ...props.element.data, url: publicUrl ?? url, assets });
};

const onDelete = () => {
  emit('save', { ...props.element.data, url: null, assets: {} });
};
</script>
