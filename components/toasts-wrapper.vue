<script setup lang="ts">
const { addToast, removeToast, toasts } = useToasts();
</script>

<template>
  <Teleport to="body">
    <div class="fixed right-6 bottom-6 flex flex-col">
      <transition-group name="list">
        <toast v-for="toast in toasts" :key="toast.id" :toast="toast">
          {{ toast.message }}
        </toast>
      </transition-group>
    </div>
  </Teleport>
</template>
