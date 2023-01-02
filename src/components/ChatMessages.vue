<template>
  <div ref="container" class="flex-1 space-y-4 overflow-y-auto p-4">
    <p
      v-for="(message, index) of messages"
      :key="index"
      class="w-max cursor-default select-all rounded-full border-2 bg-white px-4 py-2 text-black"
    >
      {{ message.username }}: {{ message.message }}
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { onUpdated, PropType, ref } from "vue"

  import { RoomMessage } from "@/store/typeStateRooms"

  const props = defineProps({
    messages: {
      type: Array as PropType<RoomMessage[]>,
    },
  })

  const container = ref<HTMLElement | null>(null)
  onUpdated(() => {
    container.value?.lastElementChild?.scrollIntoView()
  })
</script>
