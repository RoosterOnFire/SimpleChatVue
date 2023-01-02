<template>
  <button
    class="flex justify-center gap-2 rounded-md border border-transparent bg-primary-light py-2 px-4 align-middle font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
    :type="type"
  >
    {{ title }}<slot></slot>
  </button>
</template>

<script lang="ts" setup>
  import { PropType } from "vue"

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<"button" | "submit" | "reset">,
      default: "button",
    },
  })
</script>
