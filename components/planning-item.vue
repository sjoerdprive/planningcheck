<script setup lang="ts">
import type { Timetable } from "@prisma/client";
import { formatDistance } from "date-fns";
import { nl } from "date-fns/locale";

type Props = {
  timetable: Timetable;
};

const { timetable } = defineProps<Props>();
const emit = defineEmits(["delete"]);

const { user } = useAuth();
const { name, ownerName, updatedAt, id, sharedWithEmails } = timetable;

const showControls = computed(() => user?.value?.id === timetable.ownerId);

const cellClass = "p-2";

const formattedUpdatedAt = computed(() =>
  updatedAt
    ? formatDistance(updatedAt, new Date(), {
        locale: nl,
        addSuffix: true,
      })
    : "-"
);
</script>

<template>
  <tr class="dark:text-white dark:odd:bg-gray-700 group">
    <table-header scope="row">
      <div class="grid grid-cols-2 gap-1 items-center w-full">
        <nuxt-link :to="`/plannings/${id}`" class="truncate">
          {{ name }}
        </nuxt-link>
        <div class="flex gap-1 items-center" v-if="showControls">
          <button
            @click="$emit('delete', id)"
            class="text-red-400 dark:text-red-600 flex items-center p-1 group-hover:visible group-focus-within:visible invisible"
          >
            <Icon name="iconoir:trash-solid" />
          </button>
        </div>
      </div>
    </table-header>
    <td :class="cellClass">{{ ownerName }}</td>
    <td :class="cellClass">
      <div class="flex gap-1 items-center">
        <span
          class="rounded bg-gray-50 dark:bg-gray-600 py-0.5 px-1 text-sm max-w-28 truncate"
          :title="email"
          v-for="email in sharedWithEmails"
          >{{ email }}</span
        >
      </div>
    </td>
    <td :class="cellClass">{{ formattedUpdatedAt }}</td>
  </tr>
</template>
