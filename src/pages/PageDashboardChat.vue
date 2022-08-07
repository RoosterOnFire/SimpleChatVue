<template>
  <div class="flex flex-1 flex-col items-stretch overflow-hidden">
    <ChatMessages />
    <ChatForm />
  </div>
</template>

<script lang="ts" setup>
  import ChatForm from "@/components/ChatForm.vue"
  import ChatMessages from "@/components/ChatMessages.vue"

  import { useRoomsStore } from "@/store/StoreRooms"
  import { computed } from "vue"

  const rooms = useRoomsStore()

  const isChatSelected = computed(() => rooms.selectedRoom)
</script>
