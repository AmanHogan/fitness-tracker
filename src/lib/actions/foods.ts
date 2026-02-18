"use server"

import { Food } from "@/lib/types"
import { addFoodToDB, getAllFoodsFromDB } from "../db/foods"
import { revalidatePath } from "next/cache"

export async function addFood(foodInput: Food): Promise<Food> {
  const food = await addFoodToDB(foodInput)
  revalidatePath("/dashboard")
  return food
}
export async function getAllFoods(): Promise<Food[]> {
  const foods = await getAllFoodsFromDB()
  return foods
}
