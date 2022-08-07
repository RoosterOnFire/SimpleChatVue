<template>
  <div class="flex flex-1">
    <DashboardSidebar class="w-52" />
    <router-view />
  </div>
</template>

<script lang="ts" setup>
  import DashboardSidebar from "@/components/DashboardSidebar.vue";
</script>
