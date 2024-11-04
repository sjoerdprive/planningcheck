<script setup lang="ts">
import type { Timetable } from "@prisma/client";
const { token } = useAuth();

type Props = { tables: Timetable[] };

const { tables }: Props = defineProps<Props>();

const headerClass = "p-2 inline-flex items-center gap-2 text-start";
</script>

<template>
  <table class="w-full">
    <thead>
      <tr class="dark:text-white">
        <th class="text-start">
          <div :class="headerClass">
            <Icon name="iconoir:table-2-columns" />
            Planning
          </div>
        </th>
        <th class="text-start">
          <Icon name="iconoir:user" />
          <div :class="headerClass">Gedeeld door</div>
        </th>
        <th class="text-start">
          <Icon name="iconoir:user" />
          <div :class="headerClass">Gedeeld met</div>
        </th>
        <th class="text-start">
          <Icon name="iconoir:clock" />
          <div :class="headerClass">Laatst bijgewerkt</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <planning-item v-for="planning in tables" :timetable="planning" />
    </tbody>
  </table>
</template>
