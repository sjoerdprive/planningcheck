<script setup lang="ts">
import type { Timeslot, Timetable } from "@prisma/client";
import { format } from "date-fns";

const targetEmail = ref("");

const id = useRoute().params.id;

const { data: timetable } = await useApi<Timetable>(`/api/timetables/${id}`);
const { data: timeslots } = await useApi<Timeslot[]>(
  `/api/timetables/${id}/rows`
);

const sharePlanning = async () => {
  await useApi(`/api/timetables/${id}/share`, {
    method: "POST",
    body: { targetEmail: targetEmail.value },
  });
};
</script>

<template>
  <page-header>
    <template #left>
      <back-button />
    </template>
    <page-title>
      {{ timetable?.name }}
    </page-title>
  </page-header>
  <div class="flex flex-col max-w-[900px] mx-auto gap-4">
    <div
      class="dark:bg-gray-700 p-2 dark:text-white rounded-lg flex gap-4 items-center"
    >
      <input v-model="targetEmail" class="text-black" />
      <theme-button @click="sharePlanning">
        <Icon name="iconoir:send" size="24" />
        Deel planning
      </theme-button>
    </div>
    <table class="w-[900px]">
      <thead>
        <tr class="text-white">
          <th class="text-start">Titel</th>
          <th class="text-start">
            <Icon name="iconoir:clock" />
            Van - tot
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="timeslot in timeslots" class="text-white">
          <th scope="row" class="text-start">{{ timeslot.title }}</th>
          <td>
            {{ format(timeslot.startTime, "HH:mm") }} -
            {{ timeslot.endTime && format(timeslot?.endTime, "HH:mm") }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
