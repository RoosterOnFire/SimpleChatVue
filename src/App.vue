<template>
  <router-view v-slot="{ Component }">
    <div
      v-if="user.isLoading"
      class="flex min-h-full items-center justify-center"
    >
      <SvgLoading />
    </div>
    <component v-else :is="Component" :key="route.path" />
  </router-view>
</template>

<script lang="ts" setup>
  import { useRoute } from "vue-router"

  import SvgLoading from "@/components/SvgLoading.vue"
  import { useAuthStore } from "@/store/storeAuth"

  const route = useRoute()
  const user = useAuthStore()

  user.sessionRestore()
</script>
