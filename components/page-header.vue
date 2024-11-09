<template>
  <div class="p-6 items-center gap-4 grid grid-cols-4">
    <div class="flex gap-2 col-span-1">
      <slot name="left" />
    </div>
    <div class="col-span-2 flex justify-center">
      <slot />
    </div>
    <div class="flex gap-2 col-span-1 justify-end">
      <slot name="right" />
    </div>
  </div>
</template>
