<template>
  <button class="auth__button" :class="mode">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  mode: string;
}>();
</script>

<style lang="scss" scoped>
.dark {
  background: black;
}
</style>
