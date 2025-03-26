<script setup>
const head = useLocaleHead()
</script>

<template>
  <div class="flex flex-col">
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir" />
    <slot />
  </div>
</template>
