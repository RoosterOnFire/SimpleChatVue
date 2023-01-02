<template>
  <form
    class="flex justify-around gap-4 bg-primary p-4"
    @submit.prevent="handleNewMessage"
    @keypress.enter.prevent="handleNewMessage"
  >
    <AppInput v-model="newMessage" />
    <AppButton title="Chat" type="submit"></AppButton>
  </form>
</template>

<script lang="ts" setup>
  import { ref } from "vue"

  import AppButton from "@/components/AppButton.vue"
  import AppInput from "@/components/AppInput.vue"

  const newMessage = ref("")
  const emits = defineEmits(["sendMessage"])

  function handleNewMessage() {
    emits("sendMessage", newMessage.value)
    newMessage.value = ""
  }
</script>
