<template>
  <div class="flex">
    <header class="dark:bg-gray-900 h-dvh bg-gray-200">
      <main-nav />
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
