<template>
  <div class="flex flex-col h-dvh">
    <header class="dark:bg-gray-900 bg-gray-200 dark:text-white">
      <div class="p-6">Visiting as guest</div>
    </header>
    <main class="dark:bg-gray-800 grow">
      <suspense>
        <slot />
        <template #fallback>
          <div
            aria-live="assertive"
            class="flex items-center justify-center p-16"
          >
            <Icon
              name="iconoir:one-point-circle"
              size="48"
              class="animate-spin"
            />
          </div>
        </template>
      </suspense>
    </main>
  </div>
</template>
