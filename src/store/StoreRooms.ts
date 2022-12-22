import { defineStore } from "pinia"

import { RoomMessage, Rooms } from "@/store/typeStateRooms"
import { RouteNames } from "@/types/typeEnums"

export const useRoomsStore = defineStore("roomsStore", {
  state: (): Rooms => {
    return {
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
    joinRoom(roomName: string) {
      this.pbActions.findRoom(roomName).then(
        (res) => {
          this.selectedRoom = roomName
          this.router.push({ name: RouteNames.dashboard_chat })
        },
        () => {
          this.pbActions.createRoom(roomName).then(() => {
            this.selectedRoom = roomName
            this.router.push({ name: RouteNames.dashboard_chat })
          }, console.error)
        }
      )
    },

    addMessage(payload: string) {},
    pushMessage(payload: RoomMessage) {},
    makeChatMessage(payload: RoomMessage) {},
  },
})
