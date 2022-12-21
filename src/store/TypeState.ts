import { Rooms } from "@/store/typeStateRooms"
import { Auth } from "./typeStateUser"

export type State = {
  auth?: Auth
  meta?: Meta
  rooms?: Rooms
}

export type Meta = {
  pageCurrent: string
}
