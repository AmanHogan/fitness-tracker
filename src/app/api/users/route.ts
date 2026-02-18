import pool from "@/lib/db"
import { getAllUsers, addUser } from "../../../lib/queries"
import { toUserDTO } from "../../../lib/mapper"
import { UserDTOSchema, CreateUserSchema } from "../../../lib/dtos"

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

export async function POST(req: Request): Promise<Response> {
  try {
    // 1. Parse JSON
    const json = await req.json()

    // 2. Validate input
    const parsed = CreateUserSchema.safeParse(json)
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
      })
    }

    const { email, password } = parsed.data

    // 3. Insert into DB
    const row = await addUser(pool, { email, password })

    // 4. Map to DTO
    const userDTO = toUserDTO(row)

    // 5. Validate output (optional but good)
    UserDTOSchema.parse(userDTO)

    // 6. Return DTO
    return Response.json(userDTO, { status: 201 })
  } catch (err) {
    console.error(err)
    return new Response("Internal Server Error", { status: 500 })
  }
}
