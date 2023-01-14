<template>
  <router-view v-slot="{ Component }">
    <TheLoading v-if="auth.isLoading" />
    <component v-else :is="Component" :key="route.path" />
  </router-view>
</template>

<script lang="ts" setup>
  import { watch } from "vue"
  import { useRoute } from "vue-router"

  import TheLoading from "@/components/TheLoading.vue"
  import { useAuth } from "@/store/storeAuth"
  import { useRooms } from "./store/storeRooms"

  const route = useRoute()
  const auth = useAuth()
  const rooms = useRooms()

  auth.sessionRestore()

  watch([() => route.name, () => route.params], async (newValues) => {
    if (newValues[0] == "dashboard/chat") {
      rooms.joinRoom(route.params.id as string)
    }
  })
</script>
