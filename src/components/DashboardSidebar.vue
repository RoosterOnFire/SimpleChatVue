<template>
  <div class="flex flex-col border-r-2 bg-primary">
    <div class="flex flex-1 flex-col items-stretch border-b-2">
      <SidebarLink
        to="/dashboard/rooms"
        :class="{ 'bg-primary-dark': isCurrentRoute('/dashboard/rooms') }"
      >
        {{ "Join room" }}
        <!-- <ChatAlt2Icon class="h-6 w-6" /> -->
      </SidebarLink>
      <SidebarButton
        v-for="name of rooms.roomNames"
        @click="rooms.joinRoom(name)"
      >
        {{ name }}
      </SidebarButton>
    </div>
    <div class="flex flex-col items-stretch">
      <SidebarButton type="button" @click="logout">
        {{ "Logout" }}
        <!-- <LogoutIcon class="h-6 w-6" /> -->
      </SidebarButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoomsStore } from "@/store/storeRooms"
  import { useAuthStore } from "@/store/storeAuth"
  // import { ChatAlt2Icon, LogoutIcon } from "@heroicons/vue/solid"
  import { useRoute } from "vue-router"
  import SidebarButton from "./SidebarButton.vue"
  import SidebarLink from "./SidebarLink.vue"

  const user = useAuthStore()
  const rooms = useRoomsStore()

  const logout = user.userLogout

  const route = useRoute()
  function isCurrentRoute(link: string) {
    return route.fullPath === link
  }
</script>
