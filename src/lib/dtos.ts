import { z } from "zod"

export const UserDTOSchema = z.object({
  id: z.number(),
  email: z.string().email(),
})

export type UserDTO = z.infer<typeof UserDTOSchema>
