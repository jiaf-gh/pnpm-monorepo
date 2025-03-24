<script setup lang="ts">
const alertsStore = useAlertsStore()
</script>

<template>
  <div class="flex flex-col items-start gap-4 h-dvh p-4 overflow-auto text-primary font-poppins">
    <p class="uppercase font-medium text-2xl">
      Hello Nuxt
    </p>
    <div>
      <Icon name="carbon:assembly-cluster" />
      <Icon name="custom:cafe" />
    </div>
    <NuxtPicture
      src="/images/pink-stealth.png"
      alt="Pink Stealth"
      width="256px"
      height="256px"
      loading="lazy"
      placeholder
    />
    <NuxtPicture
      src="/images/pink-stealth.png"
      alt="Pink Stealth"
      width="64px"
      height="64px"
      preset="avatar"
      loading="lazy"
      placeholder
    />
    <div class="flex flex-col items-start gap-2">
      <BaseButton
        message="Create success Alert" :action="() => alertsStore.addAlert({
          type: 'success',
          message: 'Create success Alert',
        })"
      />
      <BaseButton
        message="Create warning Alert" :action="() => alertsStore.addAlert({
          type: 'warning',
          message: 'Warning alert from store.',
        })"
      />
      <BaseButton
        message="Create error Alert" :action="() => alertsStore.addAlert({
          type: 'error',
          message: 'Error alert from store.',
        })"
      />
    </div>
    <Alerts />
  </div>
</template>
