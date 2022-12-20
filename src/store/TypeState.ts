import { Rooms } from "@/store/typeStateRooms"
import { User } from "./typeStateUser"

export type State = {
  user?: User
  meta?: Meta
  rooms?: Rooms
}

export type Meta = {
  pageCurrent: string
}
