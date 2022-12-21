import { PiniaPluginContext } from "pinia"
import PocketBase from "pocketbase"

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE)

export function storePocketbasePlugin(context: PiniaPluginContext) {
  context.store.pb = pb
}
