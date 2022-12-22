import "pinia"
import PocketBase, { Record } from "pocketbase"
import { Router } from "vue-router"

declare module "pinia" {
  export interface PiniaCustomProperties {
    router: Router
    storageCurrentpage: string | null
    pb: PocketBase
    pbActions: {
      createRoom(roomName: string): Promise<Record>
      findRoom(roomName: string): Promise<Record>
      updateUserRooms(room: Record): Promise<void>
    }
  }
}
