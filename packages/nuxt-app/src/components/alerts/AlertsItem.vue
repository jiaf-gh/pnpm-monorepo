<script setup lang="ts">
const { alert } = defineProps<{ alert: Alert }>()

const alertsStore = useAlertsStore()

function getTheme() {
  switch (alert.type) {
    case 'success':
      return {
        icon: 'carbon:checkmark-filled',
        bgColor: 'bg-green-300',
        iconColor: 'text-green-900',
      }
    case 'warning':
      return {
        icon: 'carbon:warning-hex-filled',
        bgColor: 'bg-yellow-300',
        iconColor: 'text-yellow-900',
      }
    case 'error':
      return {
        icon: 'carbon:error-filled',
        bgColor: 'bg-red-300',
        iconColor: 'text-red-900',
      }
    default:
      return {
        icon: 'carbon:query',
        bgColor: 'bg-black-300',
        iconColor: 'text-black-900',
      }
  }
}

const theme = getTheme()
</script>

<template>
  <button
    class="flex items-center gap-2 px-4 py-3 rounded-md shadow-sm opacity-80"
    :class="theme.bgColor"
    @click="alertsStore.removeAlert(alert.id)"
  >
    <Icon :name="theme.icon" class="flex shrink-0" :class="theme.iconColor" />
    <span class="text-sm/none">{{ alert.message }}</span>
  </button>
</template>