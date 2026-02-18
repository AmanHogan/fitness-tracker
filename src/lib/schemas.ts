import { z } from "zod"

export const UserDTOSchema = z.object({
  id: z.number(),
  email: z.string(),
})

export const CreateUserSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
})

export const FoodSchema = z.object({
  id: z.number(),
  name: z.string(),

  // Required macros
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number(),

  // Optional fats
  saturated_fat: z.number().optional(),
  polyunsaturated_fat: z.number().optional(),
  monounsaturated_fat: z.number().optional(),
  trans_fat: z.number().optional(),

  // Optional other macros
  fiber: z.number().optional(),
  sugar: z.number().optional(),
  sodium: z.number().optional(),
  cholesterol: z.number().optional(),
  caffeine: z.number().optional(),

  // Vitamins
  vitamin_a_iu: z.number().optional(),
  vitamin_c_mg: z.number().optional(),
  vitamin_d_iu: z.number().optional(),
  vitamin_e_mg: z.number().optional(),
  vitamin_k_mcg: z.number().optional(),
  thiamin_mg: z.number().optional(),
  riboflavin_mg: z.number().optional(),
  niacin_mg: z.number().optional(),
  vitamin_b6_mg: z.number().optional(),
  folate_mcg: z.number().optional(),
  vitamin_b12_mcg: z.number().optional(),
  biotin_mg: z.number().optional(),
  pantothenic_acid_mg: z.number().optional(),

  // Minerals
  calcium_mg: z.number().optional(),
  iron_mg: z.number().optional(),
  magnesium_mg: z.number().optional(),
  phosphorus_mg: z.number().optional(),
  potassium_mg: z.number().optional(),
  zinc_mg: z.number().optional(),
  copper_mg: z.number().optional(),
  manganese_mg: z.number().optional(),
  selenium_mcg: z.number().optional(),

  created_at: z.string(),
})
