import { UserRow } from "./types"
import { UserDTO } from "./dtos"

export function toUserDTO(row: UserRow): UserDTO {
  return {
    id: row.id,
    email: row.email,
  }
}
