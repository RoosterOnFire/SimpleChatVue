import { StatusUser } from "@/types/typeEnums"

export type Auth = {
  status: StatusUser
  user?: {
    name: string
  }
}
