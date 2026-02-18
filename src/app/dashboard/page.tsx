import React from "react"
import UsersClient from "@/app/pages/Users"
import { getUsers } from "@/lib/actions/users"
import FoodsClient from "../pages/Foods"
import { getAllFoods } from "@/lib/actions/foods"

export default async function Dashboard(): Promise<React.JSX.Element> {
  const allUsers = await getUsers()
  const allFoods = await getAllFoods()
  return (
    <div>
      <UsersClient initialUsers={allUsers}></UsersClient>
      <FoodsClient initialFoods={allFoods} />
    </div>
  )
}
