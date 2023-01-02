<template>
  <button
    type="button"
    class="inline-flex justify-center gap-2 rounded-md px-4 py-2 text-center align-baseline font-medium text-white hover:bg-primary-dark focus:outline-none"
    :class="{ 'bg-primary-dark': isSelected }"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
  const props = defineProps({
    isSelected: { type: Boolean, default: false },
  })
</script>
