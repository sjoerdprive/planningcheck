<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "nl",
  },
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <toasts-wrapper />
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(5px);
}
</style>
