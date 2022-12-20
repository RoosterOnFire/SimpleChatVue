import { StatusUser } from "@/types/typeEnums"
import { Errors, Roles } from "@/types/typeShared"

export type User = {
  status: StatusUser
  data: UserData
  errors: {
    [key in Errors]?: boolean
  }
}

export type UserData = {
  role: Roles
  token: string
  userId: string
  username: string
}

export type Users = User[]
