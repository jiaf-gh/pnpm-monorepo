<script setup lang="ts">
const { setLocale } = useI18n()
const alertsStore = useAlertsStore()

const { x, y } = useMouse()
</script>

<template>
  <div class="flex flex-col items-start gap-4 p-4">
    <div class="flex flex-col items-start gap-2">
      <p class="uppercase font-medium text-2xl">
        {{ $t('pages.home.title') }}
      </p>
      <BaseButton
        message="Language: en" :action="() => setLocale('en')"
      />
      <BaseButton
        message="Language: pt" :action="() => setLocale('pt')"
      />
    </div>
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
    <div class="flex flex-col items-start gap-2">
      <p>Mouse Position</p>
      <span>X - {{ x }}</span>
      <span>Y - {{ y }}</span>
    </div>
  </div>
</template>

<style scoped></style>