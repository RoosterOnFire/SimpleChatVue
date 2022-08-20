<template>
  <div class="flex flex-1 flex-col items-stretch">
    <ChatMessages :messages="messages" />
    <form
      class="flex justify-around gap-4 bg-primary p-4"
      @submit.prevent="sendMessage"
      @keypress.enter.prevent="sendMessage"
    >
      <AppInput v-model="newMessage" />
      <AppButton title="Chat" type="submit">
        <MailIcon class="h-6 w-6" />
      </AppButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import ChatMessages from "@/components/ChatMessages.vue"
  import AppButton from "@/components/AppButton.vue"
  import AppInput from "@/components/AppInput.vue"
  import { useRoomsStore } from "@/store/StoreRooms"
  import { MailIcon } from "@heroicons/vue/outline"
  import { computed, ref } from "vue"
  import { Message } from "@/store/TypeStateRooms"

  const rooms = useRoomsStore()

  const newMessage = ref("")
  const messages = computed<Message[]>(() => rooms.messages)

  function sendMessage() {
    if (!newMessage.value) {
      return
    }

    rooms.addMessage(newMessage.value)
    newMessage.value = ""
  }
</script>
