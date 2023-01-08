<template>
  <input
    class="mx-auto block w-full appearance-none rounded-md border-2 px-3 py-2 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-900 sm:text-sm"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
  const props = defineProps({
    modelValue: {
      type: String,
      default: "",
    },
  })

  const emits = defineEmits(["update:modelValue"])

  function handleInput($event: Event) {
    if ($event.target instanceof HTMLInputElement) {
      emits("update:modelValue", $event.target.value)
    }
  }
</script>
