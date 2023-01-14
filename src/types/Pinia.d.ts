import "pinia"
import PocketBase, { Record, RecordSubscription } from "pocketbase"
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
      subscribeToRoom(callback: (e: RecordSubscription<Record>) => void): void
      getMessages(
        id: string
      ): Promise<{ username: string; message: string; created: string }[]>
      sendChatMessage(id: string, message: string): Promise<void>
    }
  }
}
