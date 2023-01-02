<template>
  <div class="flex flex-1 flex-col items-stretch">
    <ChatMessages :messages="messages" />
    <ChatMessage @send-message="sendMessage" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from "vue"

  import ChatMessage from "@/components/ChatMessage.vue"
  import ChatMessages from "@/components/ChatMessages.vue"
  import { useRoomsStore } from "@/store/storeRooms"
  import { RoomMessage } from "@/store/typeStateRooms"

  const rooms = useRoomsStore()
  const messages = computed<RoomMessage[]>(() => rooms.messages)

  function sendMessage(value: string | undefined) {
    if (value == null) {
      return
    }

    rooms.addMessage(value)
  }
</script>
