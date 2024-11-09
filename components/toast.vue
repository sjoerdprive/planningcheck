<script setup lang="ts">
import type { Toast } from "~/composables/useToasts";

const { removeToast } = useToasts();

defineProps<{
  toast: Toast;
}>();
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg dark:bg-gray-900 dark:text-white">
    <div class="flex justify-between p-3 items-center gap-3">
      <Icon
        :name="
          toast.type === 'error'
            ? 'iconoir:xmark-circle'
            : 'iconoir:check-circle'
        "
        size="24"
      />
      <slot />
      <button
        @click="removeToast(toast.id)"
        class="ml-auto flex justify-center items-center"
      >
        <Icon name="iconoir:xmark" size="24" />
      </button>
    </div>
  </div>
</template>
