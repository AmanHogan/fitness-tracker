import { Pool } from "pg"
import { UserRow } from "./types"

export async function getAllUsers(pool: Pool): Promise<UserRow[]> {
  const result = await pool.query<UserRow>(
    "SELECT id, email, password FROM users",
  )
  console.log(`[getAllUsers] ${JSON.stringify(result.rows, null, 2)}`)
  return result.rows
}
