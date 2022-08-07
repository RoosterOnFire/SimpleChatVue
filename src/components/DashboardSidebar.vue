<template>
  <div class="flex flex-col gap-2 bg-primary">
    <DashboardNavLink
      to="/dashboard/rooms"
      :class="{ 'bg-primary-dark': isCurrentRoute('/dashboard/rooms') }"
    >
      {{ "Rooms" }}
      <ChatAlt2Icon class="h-6 w-6" />
    </DashboardNavLink>
    <DashboardNavLink type="button" class="mt-auto" @click="logout()">
      {{ "Logout" }}
      <LogoutIcon class="h-6 w-6" />
    </DashboardNavLink>
  </div>
</template>

<script lang="ts" setup>
  import DashboardNavLink from "@/components/DashboardNavLink.vue"
  import { useUserStore } from "@/store/StoreUser"
  import { LogoutIcon } from "@heroicons/vue/solid"
  import { useRoute } from "vue-router"

  const user = useUserStore()

  const logout = user.userLogout

  const route = useRoute()
  function isCurrentRoute(link: string) {
    return route.fullPath === link
  }
</script>
