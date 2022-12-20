import { defineStore } from "pinia"

import { useAuthStore } from "@/store/storeAuth"
import { RoomMessage, Rooms } from "@/store/typeStateRooms"
import { RouteNames } from "@/types/typeEnums"
import { createUserMessage } from "@/util/createMessages"

export const useRoomsStore = defineStore("roomsStore", {
  state: (): Rooms => {
    return {
      selectedRoom: undefined,
      rooms: [],
    }
  },

  getters: {
    roomNames: (state) => {
      return state.rooms.map((room) => room.name)
    },
    messages: (state) => {
      const room = state.rooms.find((room) => room.name === state.selectedRoom)
      return room?.messages || []
    },
  },

  actions: {
    joinRoom(payload: string) {
      this.selectedRoom = payload
      this.plugins.router?.push({ name: RouteNames.dashboard_chat })
    },
    joinRoomFulfilled(payload: { name: string }) {
      const room = this.rooms.find((room) => room.name === payload.name)
      if (room === undefined) {
        this.rooms.push({ name: payload.name, users: [], messages: [] })
      }
    },

    addMessage(payload: string) {
      const user = useAuthStore()
      if (!user) {
        return
      }

      this.makeChatMessage({
        room: this.selectedRoom as string,
        message: createUserMessage(user.data.username, payload),
      })
    },
    pushMessage(payload: RoomMessage) {
      const room = this.rooms.find((room) => room.name === payload.room)
      room?.messages.push(payload.message)
    },

    makeChatMessage(payload: RoomMessage) {
      const room = this.rooms.find((room) => room.name === this.selectedRoom)
      room?.messages.push(payload.message)
    },
  },
})
