<template>
  <div ref="container" class="flex-1 space-y-4 overflow-y-auto p-4">
    <p
      v-for="(message, index) of messages"
      :key="index"
      class="w-max cursor-default select-all rounded-full border-2 bg-white px-4 py-2 text-black"
      :class="{ 'text-blue-600': message.user === 'App' }"
    >
      {{ message.user }}: {{ message.value }}
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { Message } from "@/store/typeStateRooms"
  import { onUpdated, PropType, ref } from "vue"

  const props = defineProps({
    messages: {
      type: Array as PropType<Message[]>,
    },
  })

  const container = ref<HTMLElement | null>(null)
  onUpdated(() => {
    container.value?.lastElementChild?.scrollIntoView()
  })
</script>
