<script setup lang="ts">
import type { Timetable } from "@prisma/client";

const { data: tables, refresh } = await useApi<Timetable[]>("/api/timetables");

const addPlanning = async () => {
  await useApi("/api/timetables", {
    method: "POST",
  });
  refresh();
};
</script>

<template>
  <page-header>
    <page-title>Plannings</page-title>
  </page-header>
  <div class="p-4 gap-4 flex justify-center flex-col max-w-[900px] mx-auto">
    <div
      class="dark:bg-gray-700 p-2 dark:text-white rounded-lg flex gap-4 items-center"
    >
      <theme-button @click="addPlanning">
        <Icon name="iconoir:plus" size="24" />
        Planning toevoegen
      </theme-button>
    </div>
    <planning-overview v-if="tables" :tables="tables" />
  </div>
</template>
