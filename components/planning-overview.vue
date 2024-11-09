<template>
  <table class="w-full table-fixed border-separate border-spacing-y-4">
    <thead>
      <tr class="dark:text-white">
        <table-header class="text-start">
          <Icon name="iconoir:table-2-columns" />
          Planning
        </table-header>
        <table-header class="text-start">
          <Icon name="iconoir:user" />
          Gemaakt door
        </table-header>
        <table-header class="text-start">
          <Icon name="iconoir:group" />
          Gedeeld met
        </table-header>
        <table-header class="text-start">
          <Icon name="iconoir:clock" />
          Laatst bijgewerkt
        </table-header>
      </tr>
    </thead>
    <tbody>
      <transition-group name="list">
        <slot />
      </transition-group>
    </tbody>
  </table>
</template>
