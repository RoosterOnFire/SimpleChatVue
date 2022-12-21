<template>
  <h2 class="text-5xl font-bold text-primary">{{ "Simple Chat" }}</h2>

  <HomeForm @submit="onSubmit">
    <AppInputError v-if="errors.form">
      {{ "Login error" }}
    </AppInputError>

    <AppInput v-model="username" placeholder="Username" />

    <AppInput v-model="password" placeholder="Password" type="password" />

    <AppButton title="Sign in" type="submit" :disabled="isSubmitting">
      <!-- <LoginIcon class="h-6 w-6" /> -->
    </AppButton>
  </HomeForm>
</template>

<script lang="ts" setup>
  import { useRouter } from "vue-router"
  // import { LoginIcon } from "@heroicons/vue/outline"
  import { useField, useForm } from "vee-validate"
  import { object, string } from "yup"

  import AppButton from "@/components/AppButton.vue"
  import AppInput from "@/components/AppInput.vue"
  import AppInputError from "@/components/AppInputError.vue"
  import HomeForm from "@/components/HomeForm.vue"
  import { useAuthStore } from "@/store/storeAuth"
  import { ref } from "vue"

  const auth = useAuthStore()
  const router = useRouter()

  const { errors, isSubmitting, handleSubmit } = useForm({
    validationSchema: object({
      form: string().nullable(),
      username: string().required("Username is required"),
      password: string().required("Password is required"),
    }),
  })

  const { value: username } = useField<string>("username")
  const { value: password } = useField<string>("password")

  const onSubmit = handleSubmit((payload, { setErrors, resetForm }) => {
    if (payload.username != undefined && payload.password != undefined) {
      auth.loginWithUsernamePassword(payload.username, payload.password).then(
        (res) => {
          resetForm()
        },
        (err) => {
          setErrors({ form: err })
        }
      )
    }
  })
</script>
