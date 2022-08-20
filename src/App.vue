<template>
  <router-view v-slot="{ Component }">
    <div v-if="user.isLoading" class="mx-auto flex content-center items-center">
      <SvgLoading />
    </div>
    <div
      v-else
      class="flex-1"
      :class="[
        isHome
          ? 'flex flex-col items-center justify-center gap-8'
          : 'flex max-h-full flex-col',
      ]"
    >
      <component :is="Component" :key="route.path" />
    </div>
  </router-view>
</template>

<script lang="ts" setup>
  import { computed } from "vue"
  import { useRoute } from "vue-router"
  import { useUserStore } from "@/store/StoreUser"
  import SvgLoading from "@/components/SvgLoading.vue"

  const user = useUserStore()
  const route = useRoute()

  user.sessionRestore()

  const isHome = computed(() => route.name?.toString().startsWith("home"))
</script>
