<script setup lang="ts">
import type { Timetable } from "@prisma/client";
import { formatDistance } from "date-fns";
import { nl } from "date-fns/locale";

type Props = {
  timetable: Timetable;
};

const { timetable } = defineProps<Props>();

const { name, sharedBy, updatedAt, id, sharedWithEmails } = timetable;

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
  <tr class="dark:text-white dark:hover:bg-gray-700">
    <th scope="row" :class="cellClass" class="text-start">
      <nuxt-link :to="`/plannings/${id}`">
        {{ name }}
      </nuxt-link>
    </th>
    <td :class="cellClass">{{ sharedBy }}</td>
    <td :class="cellClass">
      <div class="flex gap-1 items-center">
        <span
          class="rounded bg-gray-50 dark:bg-gray-700 py-0.5 px-1 text-sm"
          v-for="email in sharedWithEmails"
          >{{ email }}</span
        >
      </div>
    </td>
    <td :class="cellClass">{{ formattedUpdatedAt }}</td>
  </tr>
</template>
