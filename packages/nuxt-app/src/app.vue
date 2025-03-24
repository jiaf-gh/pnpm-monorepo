<template>
  <div class="flex flex-col items-start gap-4 h-dvh p-4 overflow-auto">
    <p class="uppercase font-medium text-primary">
      Hello Nuxt
    </p>
    <Icon name="carbon:assembly-cluster" />
    <Icon name="custom:cafe" />
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
    <input type="text" class="mt-96 border border-cyan-500">
  </div>
</template>

<style>

</style>
