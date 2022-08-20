import { createUserMessage } from "@/helpers/createMessages"
import { useUserStore } from "@/store/StoreUser"
import { RouteNames } from "@/types/TypeEnums"
import { RoomMessage, Rooms } from "@/store/TypeStateRooms"
import { defineStore } from "pinia"

export const useRoomsStore = defineStore("roomsStore", {
  state: (): Rooms => {
    return {
      selectedRoom: undefined,
      rooms: [],
    }
  },

  getters: {
    messages: (state) => {
      const room = state.rooms.find((room) => room.name === state.selectedRoom)
      return room?.messages || []
    },
  },

  actions: {
    roomsJoin(payload: string) {
      this.roomsClearSelectedRoom()
      this.selectedRoom = payload
      this.plugins.router?.push({ name: RouteNames.dashboard_chat })
    },
    roomsJoinFulfilled(payload: { name: string }) {
      const room = this.rooms.find((room) => room.name === payload.name)
      if (room === undefined) {
        this.rooms.push({ name: payload.name, users: [], messages: [] })
      }
    },
    roomsClearSelectedRoom() {
      const selectedRoom = this.rooms.find(
        (room) => room.name === this.selectedRoom
      )
      if (selectedRoom?.messages && selectedRoom.users) {
        selectedRoom.messages = []
        selectedRoom.users = []
      }
    },

    addMessage(payload: string) {
      const user = useUserStore()
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
