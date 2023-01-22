<template>
  <div class="mx-auto flex h-full max-w-md flex-col justify-center">
    <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
      SimpleChat
    </h2>

    <form class="mt-8 space-y-6" @submit="onSubmit">
      <div v-if="errors">
        <p v-if="errors.username" class="text-error">
          Username: {{ errors.username }}
        </p>
        <p v-if="errors.password" class="text-error">
          Password: {{ errors.password }}
        </p>
        <p v-if="errors.passwordConfirm" class="text-error">
          Password confirm: {{ errors.passwordConfirm }}
        </p>
      </div>

      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            placeholder="Username"
            type="text"
            class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            v-model="username"
          />
        </div>

        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            placeholder="Password"
            v-model="password"
          />
        </div>

        <div>
          <label for="passwordConfirm" class="sr-only">Password confirm</label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            autocomplete="current-password"
            class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            placeholder="Password confirm"
            v-model="passwordConfirm"
          />
        </div>
      </div>

      <div>
        <button
          :disabled="isSubmitting"
          type="submit"
          class="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon
              class="h-5 w-5 text-primary-500 group-hover:text-primary-400"
              aria-hidden="true"
            />
          </span>
          Sign up
        </button>
      </div>
    </form>

    <div class="mt-4 text-sm">
      <RouterLink
        to="/"
        class="font-medium text-primary-600 hover:text-primary-500"
      >
        {{ "Or login" }}
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAuth } from "@/store/storeAuth"
  import { LockClosedIcon } from "@heroicons/vue/20/solid"
  import { useField, useForm } from "vee-validate"
  import { object, string } from "yup"

  const { isSubmitting, errors, handleSubmit } = useForm({
    validationSchema: object({
      username: string(),
      password: string(),
      passwordConfirm: string(),
    }),
  })

  const { value: username } = useField<string>("username")
  const { value: password } = useField<string>("password")
  const { value: passwordConfirm } = useField<string>("passwordConfirm")

  const auth = useAuth()
  const onSubmit = handleSubmit(
    ({ username, password, passwordConfirm }, submitProps) => {
      auth.register(username!, password!, passwordConfirm!).then(
        (res) => {
          submitProps.resetForm()
        },
        (err) => {
          if (err.data.data.username) {
            submitProps.setFieldError(
              "username",
              err.data.data.username.message
            )
          }

          if (err.data.data.password) {
            submitProps.setFieldError(
              "password",
              err.data.data.password.message
            )
          }

          if (err.data.data.passwordConfirm) {
            submitProps.setFieldError(
              "passwordConfirm",
              err.data.data.passwordConfirm.message
            )
          }
        }
      )
    }
  )
</script>
