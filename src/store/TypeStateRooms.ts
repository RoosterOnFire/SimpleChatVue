import { Record } from "pocketbase"

export type Room = {
  name: string
  users: string[]
  messages: Message[]
}

export type Rooms = {
  selectedRoom?: string
  rooms: Record[]
  roomMessages: string[]
}

export type RoomMessage = {
  room: string
  message: Message
}

export type Message = {
  id: number
  user: string
  value: string
}
