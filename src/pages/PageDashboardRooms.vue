<template>
  <form class="flex max-w-lg flex-col justify-center gap-3" @submit="onSubmit">
    <AppInputError v-if="errors.room">{{ errors.room }}</AppInputError>
    <AppInput v-model="room" placeholder="Room" />
    <AppButton title="Join" type="submit" />
  </form>
</template>

<script lang="ts" setup>
  import { useField, useForm } from "vee-validate"
  import { useRouter } from "vue-router"

  import AppButton from "@/components/AppButton.vue"
  import AppInput from "@/components/AppInput.vue"
  import AppInputError from "@/components/AppInputError.vue"
  import { useRooms } from "@/store/storeRooms"
  import { RouteNames } from "@/types/typeEnums"

  const router = useRouter()
  const rooms = useRooms()

  const { errors, handleSubmit } = useForm<{ room: string }>()
  const { value: room } = useField<string>("room")

  const onSubmit = handleSubmit((payload, { resetForm, setFieldError }) => {
    rooms.joinRoom(payload.room).then(
      (res) => {
        if (res.status == "ERROR") {
          setFieldError("room", res.error.data.data?.room_name?.message)
        }

        if (res.status == "OK") {
          resetForm()

          router.push({
            name: RouteNames.dashboard_chat,
            params: { id: res.roomId },
          })
        }
      },
      (err) => {
        console.error(err)
      }
    )
  })
</script>
