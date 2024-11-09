<script setup lang="ts">
import { format } from "date-fns";

type Props = {
  modelValue: Date | string | null;
};

const { modelValue } = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const changeTime = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const [hours, minutes] = target.value.split(":").map(Number);

  emit(
    "update:modelValue",
    new Date(
      new Date(modelValue || Date.now()).setHours(
        hours || 0,
        minutes || 0,
        0,
        0
      )
    )
  );
};
</script>

<template>
  <input
    :value="modelValue ? format(modelValue, 'HH:mm') : ''"
    @focusin="
      ($event) => {
        changeTime($event);
      }
    "
    @change="
      ($event) => {
        changeTime($event);
      }
    "
    type="time"
  />
</template>
