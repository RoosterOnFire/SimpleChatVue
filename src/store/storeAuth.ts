import { defineStore } from "pinia"
import { ClientResponseError } from "pocketbase"

import { Auth } from "@/store/typeStateUser"
import { RouteNames, StatusUser, storageKeys } from "@/types/typeEnums"
import { useRoomsStore } from "./storeRooms"

export const useAuthStore = defineStore("authStore", {
  state: (): Auth => {
    return {
      status: StatusUser.init,
    }
  },

  getters: {
    isCurrentUser: (state) => {
      return false
    },
    hasAccess: (state) => {
      return false
    },
    hasNickname: (state) => {
      return false
    },
    isLoading: (state) => {
      return [StatusUser.init, StatusUser.pending].includes(state.status)
    },
  },

  actions: {
    async loginWithUsernamePassword(username: string, password: string) {
      try {
        const authData = await this.pb
          .collection("users")
          .authWithPassword(username, password)

        this.token = authData.token

        const storageCurrentpage = sessionStorage.getItem(
          storageKeys.current_page
        )

        const roomsStore = useRoomsStore()

        let goToRoute
        if (
          storageCurrentpage === null ||
          storageCurrentpage.startsWith("home") ||
          roomsStore.selectedRoom === undefined
        ) {
          goToRoute = RouteNames.dashboard_rooms
        } else {
          goToRoute = storageCurrentpage
        }

        this.router
          .push({
            name: goToRoute,
          })
          .then(() => {
            this.status = StatusUser.fulfilled
          })

        return true
      } catch (error) {
        if (error instanceof ClientResponseError) {
          return Promise.reject(error.message)
        } else {
          return Promise.reject("Something went wrong")
        }
      }
    },

    sessionRestore() {
      this.pb
        .collection("users")
        .authRefresh()
        .then(
          (res) => {
            this.status = StatusUser.fulfilled
            this.token = res.token

            const storageCurrentpage = this.storageCurrentpage

            const roomsStore = useRoomsStore()

            let goToRoute
            if (
              storageCurrentpage == null ||
              storageCurrentpage.startsWith("home") ||
              roomsStore.selectedRoom === undefined
            ) {
              goToRoute = RouteNames.dashboard_rooms
            } else {
              goToRoute = storageCurrentpage
            }

            this.router
              .push({
                name: goToRoute,
              })
              .then(() => {
                this.status = StatusUser.fulfilled
              })
          },
          (err) => {
            this.status = StatusUser.start
            this.router.push({ name: RouteNames.home })
          }
        )
    },

    userLogout() {
      this.status = StatusUser.start
      this.token = undefined
      this.pb.authStore.clear()
      this.router.push({ name: RouteNames.home })
    },

    register(payload: { username: string; password: string }): void {
      console.log("WIP", payload)
    },
  },
})