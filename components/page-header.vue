<template>
  <div class="flex p-6 items-center justify-between gap-6">
    <div>
      <slot name="left" />
    </div>
    <slot />
    <div>
      <slot name="right" />
    </div>
  </div>
</template>
