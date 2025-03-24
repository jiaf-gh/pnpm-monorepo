<template>
  <div>
    <p>Hello Nuxt</p>
    <Icon name="carbon:assembly-cluster" />
    <Icon name="custom:cafe" />
    <NuxtPicture
      src="/images/pink-stealth.png"
      alt="Pink Stealth"
      width="320px"
      height="320px"
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
  </div>
</template>
