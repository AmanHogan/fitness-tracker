"user server"

export interface APIError {
  message: string
  err: unknown
}

export interface UserRow {
  id: number
  email: string
  password: string
}
