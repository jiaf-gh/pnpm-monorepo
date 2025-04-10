<script setup lang="ts">
const { message, action } = defineProps<{
  message: string
  action: () => void
}>()
</script>

<template>
  <button class="px-4 py-3 rounded-md border border-primary shadow-sm text-primary leading-none" @click="action">
    {{ message }}
  </button>
</template>
