<template>
  <table class="w-full table-fixed border-separate">
    <thead>
      <tr>
        <table-header> Titel </table-header>
        <table-header> <Icon name="iconoir:clock" /> Van</table-header>
        <table-header> <Icon name="iconoir:clock" /> Tot</table-header>
      </tr>
    </thead>
    <tbody>
      <TransitionGroup name="list">
        <slot />
      </TransitionGroup>
    </tbody>
  </table>
</template>
