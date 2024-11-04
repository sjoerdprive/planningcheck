<script setup lang="ts">
const { to } = defineProps({
  to: String,
});
</script>

<template>
  <li>
    <nuxt-link
      :to="to"
      class="flex gap-3 items-center px-2 py-1 bg-gray-50 hover:bg-primary-50 rounded-lg dark:bg-gray-800 dark:hover:bg-primary-700 dark:text-white"
    >
      <slot />
    </nuxt-link>
  </li>
</template>
