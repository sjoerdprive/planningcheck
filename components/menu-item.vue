<script setup lang="ts">
type Props = {
  to?: string;
};

const { to } = defineProps<Props>();

defineOptions({ inheritAttrs: false });

const emit = defineEmits(["click"]);
</script>

<template>
  <li>
    <nuxt-link
      :to="to"
      :is="to ? 'vue:nuxt-link' : 'button'"
      @click="$emit('click')"
      active-class="bg-primary-50 dark:!bg-gray-700 dark:hover:!bg-gray-600"
      class="flex gap-3 items-center px-2 py-1 bg-gray-50 hover:bg-primary-50 rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white cursor-pointer"
    >
      <slot />
    </nuxt-link>
  </li>
</template>
