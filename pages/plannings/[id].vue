<script setup lang="ts">
import type { Timeslot, Timetable, Prisma } from "@prisma/client";
import { useEditMode } from "~/composables/useEditMode";

const { user } = useAuth();

if (!user) {
  setPageLayout("guest");
}
const { addToast } = useToasts();
const { isVisible, close, toggle } = usePopover();
const targetEmail = ref("");
const dirtyRows = ref<Map<string, Prisma.TimeslotUpdateInput>>(new Map());

const id = useRoute().params.id;

const { data: timetable } = await useAsyncData("timetable", async () =>
  $api<Timetable>(`/api/timetables/${id}`)
);

const title = ref(timetable.value?.name || "");
const description = ref(timetable.value?.description || "");

watch(title, (newValue) => {
  useHead({
    title: `Planning check! - ${newValue}`,
  });
});

const { data: timeslots, refresh } = await useAsyncData("timeslots", async () =>
  $api<Timeslot[]>(`/api/timetables/${id}/rows`)
);

const { isEditable } = useEditMode();

const save = async (blockNotification?: boolean) => {
  await $api<Timeslot[]>(`/api/timetables/${id}/rows`, {
    method: "PUT",
    body: Array.from(dirtyRows.value.values()),
  });

  await $api<Timetable>(`/api/timetables/${id}`, {
    method: "PUT",
    body: { name: title.value, description: description.value },
  });

  if (!blockNotification) {
    $api("/api/timetables/:tableId/notifyParticipants", {
      method: "POST",
    });
  }

  addToast({ message: `${title.value} opgeslagen` });

  dirtyRows.value.clear();
  refresh();
  clearNuxtData("tables");
};

const sharePlanning = async () => {
  await $api(`/api/timetables/${id}/share`, {
    method: "POST",
    body: { targetEmail: targetEmail.value },
  });
  close();
};

const enableEditMode = () => {
  isEditable.value = true;
};

const disableEditMode = async (blockNotification?: boolean) => {
  isEditable.value = false;
  save(blockNotification);
};

const toggleEditMode = () => {
  if (isEditable.value) {
    disableEditMode();
  } else {
    enableEditMode();
  }
};

const addTimeslot = async () => {
  await $api(`/api/timetables/${id}/rows`, {
    method: "POST",
  });
  refresh();
};

const cacheDirtyRow = (rowData: Prisma.TimeslotUpdateInput) => {
  if (!rowData.id || !isEditable.value) {
    return;
  }

  dirtyRows.value.set(rowData.id as string, rowData);
};

const allowEditing = computed(
  () => user.value?.id === timetable.value?.ownerId
);

onUnmounted(() => {
  dirtyRows.value.clear();
  timetable.value = null;
  timeslots.value = [];
});
</script>

<template>
  <popover :isVisible="isVisible">
    <form
      @submit.prevent="sharePlanning"
      class="dark:bg-gray-900 p-4 rounded flex flex-col gap-3"
    >
      <label class="flex flex-col gap-2">
        <span class="font-semibold dark:text-white">Delen met</span>
        <input v-model="targetEmail" autofocus class="p-1 rounded" required />
      </label>
      <div class="flex gap-2">
        <theme-button variant="primary">Delen</theme-button>
        <theme-button type="button" @click="close">Sluiten</theme-button>
      </div>
    </form>
  </popover>

  <page-header>
    <template #left>
      <back-button />
    </template>
    <page-title>
      <editable-field
        v-model="title"
        :disabled="!isEditable"
        class="text-center"
      />
    </page-title>
    <template v-if="allowEditing" #right>
      <theme-button @click="toggleEditMode">
        <template #menu v-if="isEditable">
          <theme-menu>
            <menu-item @click="() => disableEditMode(true)">
              <Icon name="iconoir:chat-bubble-xmark" size="24" />
              Opslaan zonder update aan deelnemers
            </menu-item>
          </theme-menu>
        </template>
        <Icon
          :name="isEditable ? 'iconoir:floppy-disk' : 'iconoir:edit-pencil'"
          size="24"
        />
        {{ isEditable ? "Opslaan" : "Bewerken" }}
      </theme-button>
      <theme-button @click="toggle" variant="primary" ref="share-toggle">
        <Icon name="iconoir:send-diagonal" size="24" />
        Delen
      </theme-button>
    </template>
  </page-header>
  <div class="flex flex-col container mx-auto gap-4 p-6">
    <editable-field v-model="description" :disabled="!isEditable" />
    <timeslot-overview v-if="timeslots">
      <timeslot-item
        @change="cacheDirtyRow"
        v-for="timeslot in timeslots"
        :timeslot="timeslot"
        :key="timeslot.id"
      />
      <tr v-if="isEditable">
        <td>
          <theme-button @click="addTimeslot">
            <Icon name="iconoir:plus" size="24" />
            Nieuw tijdsblok
          </theme-button>
        </td>
      </tr>
    </timeslot-overview>
  </div>
</template>
