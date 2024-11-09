<script setup lang="ts">
import type { Timetable } from "@prisma/client";
const { user } = useAuth();

if (!user) {
  setPageLayout("guest");
}

useHead({
  title: "Planning check! - Overzicht",
});

const { data: tables, refresh } = useAsyncData("tables", async () => {
  return await $api<Timetable[]>("/api/timetables");
});

const addPlanning = async () => {
  await $api("/api/timetables", {
    method: "POST",
  });
  refresh();
};

const deletePlanning = async (id: string) => {
  await $api(`/api/timetables/${id}`, {
    method: "DELETE",
  });
  refresh();
};
</script>

<template>
  <page-header>
    <page-title>Plannings</page-title>
    <template #right>
      <theme-button @click="addPlanning" variant="primary">
        <Icon name="iconoir:plus" size="24" />
        Nieuwe planning
      </theme-button>
    </template>
  </page-header>
  <div class="gap-4 flex justify-center flex-col container mx-auto p-6">
    <planning-overview v-if="tables" :tables="tables">
      <planning-item
        v-for="planning in tables"
        :timetable="planning"
        :key="planning.id"
        @delete="deletePlanning"
      />
    </planning-overview>
  </div>
</template>
