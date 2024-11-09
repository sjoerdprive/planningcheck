<script setup lang="ts">
import type { User } from "@prisma/client";

const { login, user } = useAuth();

const { data: testUsers, refresh } = useAsyncData("testUsers", async () => {
  return await $api<User[]>("/api/auth/users");
});

const handleUserChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const userId = target.value;

  const testUser = testUsers.value?.find((user) => user.id === userId);

  const credentials = {
    email: testUser?.email || "",
    password: testUser?.password || "",
  };

  login(credentials);
};

const addUser = async () => {
  await $api("/api/auth/users", {
    method: "POST",
  });
  refresh();
};
</script>

<template>
  <page-header>
    <page-title> Login </page-title>
  </page-header>
  <div class="dark:text-white">
    <div v-if="user">
      <p>Logged in as {{ user.name }}</p>
      <dl>
        <dt>Email</dt>
        <dd>{{ user.email }}</dd>
      </dl>
    </div>
    <div v-else>
      <p>Not logged in</p>
    </div>
  </div>
  <button @click="addUser" class="text-white p-2 dark:bg-gray-700 rounded-lg">
    add user
  </button>
  <select @change="handleUserChange">
    <option :value="null">Select a user</option>
    <option v-for="user in testUsers" :key="user.id" :value="user.id">
      {{ user.name || user.email }}
    </option>
  </select>
</template>
