import { Record } from "pocketbase"

export type Rooms = {
  selectedRoom?: string
  rooms: Record[]
  roomMessages: RoomMessage[]
}

export type RoomMessage = {
  username: string
  message: string
  created: string
}
