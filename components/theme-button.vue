<script setup lang="ts">
type Props = {
  variant?: "primary";
};

const { variant = "primary" } = defineProps<Props>();

const classes = computed(() => {
  return {
    "dark:bg-primary-700 bg-primary-200 dark:hover:bg-primary-600 hover:bg-primary-300":
      variant === "primary",
  };
});
</script>

<template>
  <button class="py-2 px-3 rounded-lg flex gap-2 items-center" :class="classes">
    <slot />
  </button>
</template>
