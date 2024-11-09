<script setup lang="ts">
type Props = {
  modelValue: string;
  textarea?: boolean;
};

defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :is="textarea ? 'textarea' : 'input'"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    type="text"
    class="p-2 disabled:outline-none outline-dashed dark:text-white bg-transparent w-full outline-1 focus-visible:outline-primary-200"
  />
</template>
