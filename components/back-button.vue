<template>
  <button
    @click="$router.back()"
    class="border dark:border-gray-400 rounded p-2 flex justify-center items-center dark:text-gray-400 dark:hover:border-primary-400 dark:hover:text-primary-400"
  >
    <Icon name="iconoir:nav-arrow-left" />
  </button>
</template>
