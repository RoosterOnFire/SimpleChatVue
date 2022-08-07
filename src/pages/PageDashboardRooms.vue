<template></template>

<script lang="ts" setup>
  import { useRoomsStore } from "@/store/StoreRooms"

  const rooms = useRoomsStore()

  const joinRoom = rooms.roomsJoin
</script>
