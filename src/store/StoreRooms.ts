import { defineStore } from "pinia"
import { ClientResponseError, Record, RecordSubscription } from "pocketbase"

import { Rooms } from "@/store/typeStateRooms"
import { RouteNames } from "@/types/typeEnums"

export const useRoomsStore = defineStore("rooms", {
  state: (): Rooms => {
    return {
      selectedRoom: undefined,
      rooms: [],
      roomMessages: [],
    }
  },

  getters: {
    joinedRooms: (state) => {
      return state.rooms.map((room) => ({
        id: room.id,
        room_name: room.room_name,
      }))
    },
    messages: (state) => {
      return state.roomMessages
    },
    isSelectedRoom: (state) => {
      return (id: string) => state.selectedRoom == id
    },
  },

  actions: {
    async joinRoom(
      roomName: string
    ): Promise<
      { status: "OK" } | { status: "ERROR"; error: ClientResponseError }
    > {
      try {
        const connectedRoom = this.joinedRooms.find((row) => row.id == roomName)

        if (connectedRoom != undefined) {
          this.selectedRoom = connectedRoom.id
          this.roomMessages = []
          return { status: "OK" }
        }

        const res = await this.pbActions.findRoom(roomName)

        if (this.joinedRooms.findIndex((row) => row.id == res.id) == -1) {
          this.rooms.push(res)
        }
        this.selectedRoom = res.id

        const self = this
        this.pbActions.subscribeToRoom(function (
          e: RecordSubscription<Record>
        ) {
          self.roomMessages.push({
            username: e.record.username,
            message: e.record.message,
            created: e.record.created,
          })
        })

        this.router.push({ name: RouteNames.dashboard_chat })

        return { status: "OK" }
      } catch (err) {
        try {
          const res = await this.pbActions.createRoom(roomName)

          this.selectedRoom = res.id
          this.rooms.push(res)
          this.roomMessages = []

          const self = this
          this.pbActions.subscribeToRoom(function (
            e: RecordSubscription<Record>
          ) {
            self.roomMessages.push({
              username: e.record.username,
              message: e.record.message,
              created: e.record.created,
            })
          })

          this.router.push({ name: RouteNames.dashboard_chat })
          return { status: "OK" }
        } catch (error) {
          if (error instanceof ClientResponseError) {
            return { status: "ERROR", error: error }
          } else {
            throw error
          }
        }
      }
    },

    selectRoom(id: string) {
      this.selectedRoom = id
      this.roomMessages = []
      this.router.push({ name: RouteNames.dashboard_chat })
    },

    addMessage(message: string) {
      const room = this.rooms.find((room) => room.id == this.selectedRoom)

      if (room != undefined) {
        this.pbActions.sendMessage(room, message).then(() => {}, console.error)
      }
    },
  },
})
