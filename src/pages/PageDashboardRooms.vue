<template>
  <div
    class="mx-auto flex w-1/3 flex-1 flex-col items-center gap-8 overflow-hidden p-4"
  >
    <form
      class="flex w-1/3 flex-col justify-center gap-3 md:flex-1"
      @submit="onSubmit"
    >
      <AppInputError v-if="errors.room">{{ errors.room }}</AppInputError>
      <AppInput v-model="room" placeholder="Room" />
      <AppButton title="Join room" type="submit" />
    </form>
  </div>
</template>

<script lang="ts" setup>
  import AppButton from "@/components/AppButton.vue"
  import AppInput from "@/components/AppInput.vue"
  import { useRoomsStore } from "@/store/StoreRooms"
  import { useField, useForm } from "vee-validate"
  import { object, string } from "yup"
  import AppInputError from "@/components/AppInputError.vue"

  const rooms = useRoomsStore()

  const { errors, handleSubmit } = useForm({
    validationSchema: object({
      room: string()
        .min(4, "Room must be at least 4 characters")
        .required("Room name is required"),
    }),
  })

  const { value: room } = useField<string>("room")

  const onSubmit = handleSubmit((payload, { resetForm }) => {
    if (payload.room) {
      rooms.roomsJoin(payload.room)
      resetForm()
    }
  })
</script>
