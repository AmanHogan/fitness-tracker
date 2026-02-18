import { UserRow } from "@/lib/types"
import pool from "@/lib/db"

export async function getAllUsers(): Promise<UserRow[]> {
  const result = await pool.query<UserRow>("SELECT id, email FROM users")
  console.log(`[getAllUsers] ${JSON.stringify(result.rows, null, 2)}`)
  return result.rows
}

export async function addUserToPostgres(userCredentials: {
  email: string
  password: string
}): Promise<UserRow> {
  const { rows } = await pool.query(
    `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id, email
    `,
    [userCredentials.email, userCredentials.password],
  )

  return rows[0]
}
