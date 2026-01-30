import pool from "@/lib/db"
import { getAllUsers } from "../../lib/queries"
import { toUserDTO } from "../../lib/mapper"
import { UserDTOSchema } from "../../lib/dtos"

export async function GET(): Promise<Response> {
  try {
    const rows = await getAllUsers(pool)
    const users = rows.map(toUserDTO)
    UserDTOSchema.array().parse(users)
    return Response.json(users)
  } catch (err) {
    console.error(err)
    return new Response("Internal Server Error", { status: 500 })
  }
}
