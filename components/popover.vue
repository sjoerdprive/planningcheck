<script setup lang="ts">
export type PopoverProps = {
  isVisible: boolean;
  anchor?: HTMLElement | null;
};

const position = ref();

const props = defineProps<PopoverProps>();

watch(props, () => {
  let transformOrigin = "translate(-50%, -50%)";
  if (props.anchor) {
    let { left, top, height, width } = props.anchor.getBoundingClientRect();
    if (left > window.innerWidth / 2) {
      left = left + width;
      transformOrigin = "translateX(-100%)";
    }
    position.value = `left: ${left}px; top:${
      top + height + 4
    }px; transform: ${transformOrigin};`;
  } else {
    position.value = `left:50%; top:50%; transform: ${transformOrigin};`;
  }
});
</script>

<template>
  <Teleport to="body" v-if="isVisible">
    <div :style="position" class="fixed origin-center">
      <slot />
    </div>
  </Teleport>
</template>
