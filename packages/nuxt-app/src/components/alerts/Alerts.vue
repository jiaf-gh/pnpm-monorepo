<script setup lang="ts">
const alertsStore = useAlertsStore()
const { alerts } = storeToRefs(alertsStore)
</script>

<template>
  <ClientOnly>
    <Teleport to="#teleports">
      <TransitionGroup name="list" tag="div" class="fixed top-0 right-0 flex flex-col items-end gap-2 p-4">
        <AlertsItem
          v-for="alert in alerts"
          :key="alert.id"
          :alert="alert"
        />
      </TransitionGroup>
    </Teleport>
  </ClientOnly>
</template>
