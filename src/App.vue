<template>
  <router-view v-slot="{ Component }">
    <div
      v-if="user.isLoading"
      class="flex min-h-full items-center justify-center"
    >
      <SvgLoading />
    </div>
    <div
      v-else
      class="flex min-h-full flex-1"
      :class="[
        isHome
          ? 'items-center justify-center py-12 px-4 sm:px-6 lg:px-8'
          : 'flex-col',
      ]"
    >
      <component :is="Component" :key="route.path" />
    </div>
  </router-view>
</template>

<script lang="ts" setup>
  import SvgLoading from "@/components/SvgLoading.vue"
  import { useAuthStore } from "@/store/storeAuth"
  import { computed } from "vue"
  import { useRoute } from "vue-router"

  const user = useAuthStore()
  const route = useRoute()

  user.sessionRestore()

  const isHome = computed(() => route.name?.toString().startsWith("home"))
</script>
