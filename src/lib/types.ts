"user server"

import z from "zod"
import { CreateUserSchema, FoodSchema, UserDTOSchema } from "./schemas"

export interface APIError {
  message: string
  err: unknown
}

export interface UserRow {
  id: number
  email: string
}

export interface UserForm {
  email: string
  password: string
}

export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type Food = z.infer<typeof FoodSchema>
export type UserDTO = z.infer<typeof UserDTOSchema>
