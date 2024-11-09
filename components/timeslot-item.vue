<script setup lang="ts">
import type { Prisma, Timeslot } from "@prisma/client";

type Props = {
  timeslot: Timeslot;
};

const { timeslot } = defineProps<Props>();
const emit = defineEmits<{
  change: [data: Prisma.TimeslotUpdateInput];
}>();

const { isEditable } = useEditMode();

const values = reactive(timeslot);

watch(values, (newValues) => {
  emit("change", newValues);
});

const { title, startTime, endTime } = toRefs(values);

const inputClass = computed(
  () =>
    "p-2 disabled:outline-none outline-dashed dark:text-white bg-transparent w-full outline-1 focus-visible:outline-primary-200"
);
</script>

<template>
  <tr class="dark:text-white dark:odd:bg-gray-700">
    <th scope="row" class="text-start">
      <editable-field
        v-model="title"
        :disabled="!isEditable"
        :class="inputClass"
        class="outline-offset-1"
      />
    </th>
    <td>
      <time-input
        v-model="startTime"
        :disabled="!isEditable"
        :class="inputClass"
      />
    </td>
    <td>
      <time-input
        v-model="endTime"
        :disabled="!isEditable"
        :class="inputClass"
      />
    </td>
  </tr>
</template>
