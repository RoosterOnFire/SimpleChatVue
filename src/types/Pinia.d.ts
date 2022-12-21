import "pinia"
import { Router } from "vue-router"
import PocketBase from "pocketbase"

declare module "pinia" {
  export interface PiniaCustomProperties {
    router: Router
    pb: PocketBase
    storageCurrentpage: string | null
  }
}
