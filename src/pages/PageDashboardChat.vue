<template>
  <div class="flex h-full flex-1 flex-col items-stretch">
    <ChatMessages :messages="messages" />
    <ChatMessage @send-message="sendMessage" />
  </div>
</template>

<script lang="ts" setup>
  import { Record, RecordSubscription } from "pocketbase"
  import { reactive } from "vue"

  import ChatMessage from "@/components/ChatMessage.vue"
  import ChatMessages from "@/components/ChatMessages.vue"
  import { useRooms } from "@/store/storeRooms"

  const rooms = useRooms()

  const messages = reactive<
    { username: string; message: string; created: string }[]
  >([])

  function sendMessage(message: string | undefined) {
    if (message == undefined) {
      return
    }

    rooms.sendChatMessage(message)
  }

  if (rooms.selectedRoom) {
    rooms.pbActions.getMessages(rooms.selectedRoom).then(
      (res) => {
        res.forEach((row) => {
          messages.push(row)
        })
      },
      (err) => {
        console.error(err)
      }
    )
  }

  rooms.pbActions.subscribeToRoom(function (e: RecordSubscription<Record>) {
    messages.push({
      username: e.record.username,
      message: e.record.message,
      created: e.record.created,
    })
  })
</script>
