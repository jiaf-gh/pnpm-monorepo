<script setup lang="ts">
const alertsStore = useAlertsStore()
const { alerts } = storeToRefs(alertsStore)
</script>

<template>
  <ClientOnly>
    <Teleport to="#teleports">
      <div class="fixed flex flex-col items-end gap-2 top-4 right-4">
        <AlertsItem
          v-for="alert in alerts"
          :key="alert.id"
          :alert="alert"
        />
      </div>
    </Teleport>
  </ClientOnly>
</template>
