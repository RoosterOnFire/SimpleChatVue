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
      return pb.collection("users").update(pb.authStore.model!.id, {
        rooms: [...pb.authStore.model!.rooms, room.id],
      })
    },

    subscribeToRoom(callback) {
      pb.collection("message")
        .unsubscribe("*")
        .then(() => {
          return pb.collection("message").subscribe("*", callback)
        })
    },

    getMessages(id: string, count = 10) {
      return pb
        .collection("message")
        .getList(1, count, { filter: `room_id="${id}"` })
        .then(
          (res) => {
            return res.items.map((item) => ({
              username: item.username,
              message: item.message,
              created: item.created,
            }))
          },
          (err) => {
            console.error(err)
            return Promise.reject("error")
          }
        )
    },

    sendChatMessage(id: string, message: string) {
      return pb.collection("message").create({
        room_id: id,
        username: pb.authStore.model!.username,
        message: message,
      })
    },
  }
}
