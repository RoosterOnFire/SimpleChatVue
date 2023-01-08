<template>
  <form class="flex flex-col justify-center gap-3" @submit="onSubmit">
    <AppInputError v-if="errors.room">{{ errors.room }}</AppInputError>
    <AppInput v-model="room" placeholder="Room" />
    <AppButton title="Join room" type="submit" />
  </form>
</template>

<script lang="ts" setup>
  import { useField, useForm } from "vee-validate"

  import AppButton from "@/components/AppButton.vue"
  import AppInput from "@/components/AppInput.vue"
  import AppInputError from "@/components/AppInputError.vue"
  import { useRoomsStore } from "@/store/storeRooms"

  const rooms = useRoomsStore()

  const { errors, handleSubmit } = useForm<{ room: string }>()

  const { value: room } = useField<string>("room")

  const onSubmit = handleSubmit((payload, { resetForm, setFieldError }) => {
    if (payload.room) {
      rooms.joinRoom(payload.room).then(
        (res) => {
          if (res.status == "OK") {
            resetForm()
          } else if (res.status == "ERROR") {
            setFieldError("room", res.error.data.data?.room_name?.message)
          }
        },
        (err) => {
          console.error(err)
        }
      )
    }
  })
</script>
