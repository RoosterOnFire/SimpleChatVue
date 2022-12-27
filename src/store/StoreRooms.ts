import { defineStore } from "pinia"

import { RoomMessage, Rooms } from "@/store/typeStateRooms"
import { RouteNames } from "@/types/typeEnums"
import { Record, RecordSubscription } from "pocketbase"

export const useRoomsStore = defineStore("roomsStore", {
  state: (): Rooms => {
    return {
      rooms: [],
      roomMessages: [],
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
          this.rooms.push(res)
          this.selectedRoom = res.id

          this.pbActions.subscribeToRoom(this.pushMessage)

          this.router.push({ name: RouteNames.dashboard_chat })
        },
        () => {
          this.pbActions.createRoom(roomName).then((res) => {
            this.rooms.push(res)
            this.selectedRoom = res.id

            this.router.push({ name: RouteNames.dashboard_chat })
          }, console.error)
        }
      )
    },

    addMessage(message: string) {
      const room = this.rooms.find((room) => room.id == this.selectedRoom)

      if (room != undefined) {
        this.pbActions.sendMessage(room, message).then(() => {}, console.error)
      }
    },

    pushMessage(e: RecordSubscription<Record>) {
      this.roomMessages.push(e.record.message)
    },

    makeChatMessage(payload: RoomMessage) {},
  },
})
