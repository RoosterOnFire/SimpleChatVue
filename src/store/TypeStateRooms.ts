import { Record } from "pocketbase"

export type Rooms = {
  rooms: Record[]
  selectedRoom?: string
}

export type RoomMessage = {
  username: string
  message: string
  created: string
}
