<template>
  <div class="flex flex-col border-r-2 bg-primary">
    <div class="flex flex-1 flex-col items-stretch border-b-2">
      <SidebarLink
        to="/dashboard/rooms"
        :class="{ 'bg-primary-dark': isCurrentRoute('/dashboard/rooms') }"
      >
        {{ "Join room" }}
      </SidebarLink>
      <SidebarButton
        v-for="joinedRoom of rooms.joinedRooms"
        @click="rooms.selectRoom(joinedRoom.id)"
        :is-selected="rooms.isSelectedRoom(joinedRoom.id)"
      >
        {{ joinedRoom.room_name }}
      </SidebarButton>
    </div>
    <div class="flex flex-col items-stretch">
      <SidebarButton type="button" @click="logout">
        {{ "Logout" }}
      </SidebarButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from "vue-router"

  import { useAuthStore } from "@/store/storeAuth"
  import { useRoomsStore } from "@/store/storeRooms"
  import SidebarButton from "./SidebarButton.vue"
  import SidebarLink from "./SidebarLink.vue"

  const user = useAuthStore()
  const rooms = useRoomsStore()
  const route = useRoute()

  const logout = user.userLogout

  function isCurrentRoute(link: string) {
    return route.fullPath === link
  }
</script>
