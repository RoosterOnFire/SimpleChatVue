import { PiniaPluginContext } from "pinia"
import PocketBase, { Record } from "pocketbase"

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE)

export function storePocketbasePlugin(context: PiniaPluginContext) {
  context.store.pb = pb

  context.store.pbActions = {
    createRoom(roomName: string) {
      return context.store.pb
        .collection("rooms")
        .create({ room_name: roomName })
        .then(
          (res) => {
            this.updateUserRooms(res).then(
              (res) => {},
              (err) => {}
            )

            return res
          },
          (err) => {
            throw err
          }
        )
    },

    findRoom(roomName: string) {
      return context.store.pb
        .collection("rooms")
        .getFirstListItem(`room_name="${roomName}"`)
        .then(
          (res) => {
            this.updateUserRooms(res).then(
              (res) => {},
              (err) => {}
            )

            return res
          },
          (err) => {
            throw err
          }
        )
    },

    updateUserRooms(room: Record) {
      if (pb.authStore.model?.id != undefined) {
        return pb.collection("users").update(pb.authStore.model.id, {
          rooms: [...pb.authStore.model.rooms, room.id],
        })
      }

      return Promise.reject("Missing user")
    },

    subscribeToRoom(callback) {
      pb.collection("message")
        .unsubscribe("*")
        .then(() => {
          return pb.collection("message").subscribe("*", callback)
        })
    },

    sendChatMessage(id: string, message: string) {
      const username = pb.authStore.model?.username

      if (username == undefined) {
        return Promise.reject("Missing user")
      }

      return pb.collection("message").create({
        room_id: id,
        username: username,
        message: message,
      })
    },
  }
}
