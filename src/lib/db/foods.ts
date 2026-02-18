import { Food } from "@/lib/types"
import pool from "@/lib/db"

export async function getAllFoodsFromDB(): Promise<Food[]> {
  const result = await pool.query<Food>("SELECT * FROM foods")
  console.log(`[getAllFoodsFromDB] ${JSON.stringify(result.rows, null, 2)}`)
  return result.rows
}

export async function addFoodToDB(food: Food): Promise<Food> {
  const {
    name,
    calories,
    protein,
    carbs,
    fat,
    saturated_fat,
    polyunsaturated_fat,
    monounsaturated_fat,
    trans_fat,
    fiber,
    sugar,
    sodium,
    cholesterol,
    caffeine,
    vitamin_a_iu,
    vitamin_c_mg,
    vitamin_d_iu,
    vitamin_e_mg,
    vitamin_k_mcg,
    thiamin_mg,
    riboflavin_mg,
    niacin_mg,
    vitamin_b6_mg,
    folate_mcg,
    vitamin_b12_mcg,
    biotin_mg,
    pantothenic_acid_mg,
    calcium_mg,
    iron_mg,
    magnesium_mg,
    phosphorus_mg,
    potassium_mg,
    zinc_mg,
    copper_mg,
    manganese_mg,
    selenium_mcg,
  } = food
  const { rows } = await pool.query(
    `
    INSERT INTO foods (
      name, calories, protein, carbs, fat,
      saturated_fat, polyunsaturated_fat, monounsaturated_fat, trans_fat,
      fiber, sugar, sodium, cholesterol, caffeine,
      vitamin_a_iu, vitamin_c_mg, vitamin_d_iu, vitamin_e_mg, vitamin_k_mcg,
      thiamin_mg, riboflavin_mg, niacin_mg, vitamin_b6_mg, folate_mcg,
      vitamin_b12_mcg, biotin_mg, pantothenic_acid_mg,
      calcium_mg, iron_mg, magnesium_mg, phosphorus_mg, potassium_mg,
      zinc_mg, copper_mg, manganese_mg, selenium_mcg
    ) VALUES (
      $1,$2,$3,$4,$5,
      $6,$7,$8,$9,
      $10,$11,$12,$13,$14,
      $15,$16,$17,$18,$19,
      $20,$21,$22,$23,$24,
      $25,$26,$27,
      $28,$29,$30,$31,$32,
      $33,$34,$35,$36
    )
    RETURNING *
    `,
    [
      name,
      calories,
      protein,
      carbs,
      fat,
      saturated_fat ?? null,
      polyunsaturated_fat ?? null,
      monounsaturated_fat ?? null,
      trans_fat ?? null,
      fiber ?? null,
      sugar ?? null,
      sodium ?? null,
      cholesterol ?? null,
      caffeine ?? null,
      vitamin_a_iu ?? null,
      vitamin_c_mg ?? null,
      vitamin_d_iu ?? null,
      vitamin_e_mg ?? null,
      vitamin_k_mcg ?? null,
      thiamin_mg ?? null,
      riboflavin_mg ?? null,
      niacin_mg ?? null,
      vitamin_b6_mg ?? null,
      folate_mcg ?? null,
      vitamin_b12_mcg ?? null,
      biotin_mg ?? null,
      pantothenic_acid_mg ?? null,
      calcium_mg ?? null,
      iron_mg ?? null,
      magnesium_mg ?? null,
      phosphorus_mg ?? null,
      potassium_mg ?? null,
      zinc_mg ?? null,
      copper_mg ?? null,
      manganese_mg ?? null,
      selenium_mcg ?? null,
    ],
  )
  return rows[0]
}
