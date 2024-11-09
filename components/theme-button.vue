<script setup lang="ts">
type Props = {
  variant?: "primary" | "neutral";
};

const anchor = useTemplateRef("anchor");

defineOptions({ inheritAttrs: false });

const slots = useSlots();
const { isVisible, toggle } = usePopover();

const { variant } = defineProps<Props>();
const emit = defineEmits(["click"]);

const classes = computed(() => {
  const variants = {
    primary:
      "dark:bg-primary-600 bg-primary-200 dark:hover:bg-primary-700 hover:bg-primary-300 dark:text-white whitespace-nowrap",
    neutral:
      "dark:bg-gray-600 bg-gray-50 dark:hover:bg-gray-700 hover:bg-gray-200 dark:text-white whitespace-nowrap",
  } as Record<typeof variant & string, string>;

  return variants[variant || "neutral"];
});
</script>

<template>
  <div class="rounded-lg h-10 flex overflow-hidden">
    <button
      class="py-2 px-3 flex gap-2 items-center"
      :class="classes"
      @click="$emit('click')"
    >
      <slot />
    </button>
    <button
      ref="anchor"
      v-if="slots.menu"
      :aria-expanded="isVisible"
      class="h-full flex items-center justify-center px-2 border-l dark:border-neutral-800/15"
      :class="classes"
      @click.prevent="toggle"
    >
      <Icon
        :name="isVisible ? 'iconoir:nav-arrow-up' : 'iconoir:nav-arrow-down'"
        size="24"
      />
    </button>
  </div>
  <popover :isVisible="isVisible" :anchor="$refs.anchor"
    ><slot name="menu"
  /></popover>
</template>
