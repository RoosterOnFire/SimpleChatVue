import { PiniaPluginContext } from "pinia"
import PocketBase, { Record, RecordSubscription } from "pocketbase"

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
            return err
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
            return err
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
      pb.collection("message").subscribe("*", callback)
    },

    sendMessage(room: Record, message: string) {
      const user_id = pb.authStore.model?.id
      if (user_id == undefined) {
        return Promise.reject("Missing user")
      }

      return pb.collection("message").create({
        room_id: room.id,
        user_id: user_id,
        message: message,
      })
    },
  }
}
