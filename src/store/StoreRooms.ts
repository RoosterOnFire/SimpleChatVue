import { defineStore } from "pinia"
import { ClientResponseError } from "pocketbase"

import { Rooms } from "@/store/typeStateRooms"

export const useRooms = defineStore("rooms", {
  state: (): Rooms => {
    return {
      rooms: [],
      selectedRoom: undefined,
    }
  },

  getters: {
    joinedRooms: (state) => {
      return state.rooms.map((room) => ({
        id: room.id,
        room_name: room.room_name,
      }))
    },
    isSelectedRoom: (state) => {
      return (id: string) => state.selectedRoom == id
    },
    isRoomInRooms: (state) => {
      return (id: string) => state.rooms.findIndex((row) => row.id == id) == -1
    },
  },

  actions: {
    async joinRoom(
      roomName: string
    ): Promise<
      | { status: "OK"; roomId: string }
      | { status: "ERROR"; error: ClientResponseError }
    > {
      try {
        const connectedRoom = this.joinedRooms.find((row) => row.id == roomName)
        if (connectedRoom != undefined) {
          this.selectedRoom = connectedRoom.id
          return { status: "OK", roomId: connectedRoom.id }
        }

        const findRoomResponse = await this.pbActions.findRoom(roomName)

        this.selectedRoom = findRoomResponse.id

        if (this.isRoomInRooms(findRoomResponse.id)) {
          this.rooms.push(findRoomResponse)
        }

        return { status: "OK", roomId: findRoomResponse.id }
      } catch (err) {
        try {
          const createRoomResponse = await this.pbActions.createRoom(roomName)

          this.selectedRoom = createRoomResponse.id
          this.rooms.push(createRoomResponse)

          return { status: "OK", roomId: createRoomResponse.id }
        } catch (error) {
          if (error instanceof ClientResponseError) {
            return { status: "ERROR", error: error }
          } else {
            throw error
          }
        }
      }
    },

    sendChatMessage(message: string) {
      if (this.selectedRoom == undefined) {
        throw Error("Selected room undefined")
      }

      this.pbActions
        .sendChatMessage(this.selectedRoom, message)
        .then(() => {}, console.error)
    },
  },
})
