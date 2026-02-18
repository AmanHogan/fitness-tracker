"use server"

import { UserRow } from "@/lib/types"
import { getAllUsers, addUserToPostgres } from "../db/users"
import { revalidatePath } from "next/cache"

export async function addUser(userCredentials: {
  email: string
  password: string
}): Promise<UserRow> {
  const user = await addUserToPostgres(userCredentials)
  revalidatePath("/dashboard")
  return user
}
export async function getUsers(): Promise<UserRow[]> {
  const users = await getAllUsers()
  return users
}
