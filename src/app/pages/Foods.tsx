"use client"

import React, { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Food } from "@/lib/types"
import { addFood } from "@/lib/actions/foods"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface FoodsClientProps {
  initialFoods: Food[]
}

export default function FoodsClient({
  initialFoods,
}: FoodsClientProps): React.JSX.Element {
  const router = useRouter()
  const [foods, setFoods] = useState<Food[]>(initialFoods)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [foodForm, setFoodForm] = useState<Partial<Food>>({
    name: "",
    calories: undefined,
    protein: undefined,
    carbs: undefined,
    fat: undefined,
    fiber: undefined,
    sugar: undefined,
    sodium: undefined,
    cholesterol: undefined,
    caffeine: undefined,
  })

  function updateField<K extends keyof Food>(key: K, value: string): void {
    setFoodForm((prev) => ({
      ...prev,
      [key]: value === "" ? undefined : parseFloat(value),
    }))
  }

  function updateStringField<K extends keyof Food>(
    key: K,
    value: string,
  ): void {
    setFoodForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  async function handleAddFood(): Promise<void> {
    setError(null)

    startTransition(async () => {
      try {
        // Required check
        if (
          !foodForm.name ||
          foodForm.calories == null ||
          foodForm.protein == null ||
          foodForm.carbs == null ||
          foodForm.fat == null
        ) {
          setError("Please fill in all required fields")
          return
        }

        const newFood = await addFood(foodForm as Food)

        setFoods((prev) => [...prev, newFood])

        // Reset form
        setFoodForm({
          name: "",
          calories: undefined,
          protein: undefined,
          carbs: undefined,
          fat: undefined,
          fiber: undefined,
          sugar: undefined,
          sodium: undefined,
          cholesterol: undefined,
          caffeine: undefined,
        })
      } catch (err) {
        console.error(err)
        setError("Failed to add food")
      }
    })
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add a New Food</CardTitle>
          <CardDescription>
            Required and optional nutrition information
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Required fields */}
          <div className="grid gap-2">
            <Label htmlFor="food-name">Name</Label>
            <Input
              id="food-name"
              value={foodForm.name || ""}
              onChange={(e) => updateStringField("name", e.target.value)}
              required
            />

            <Label htmlFor="calories">Calories</Label>
            <Input
              id="calories"
              type="number"
              value={foodForm.calories ?? ""}
              onChange={(e) => updateField("calories", e.target.value)}
              required
            />

            <Label htmlFor="protein">Protein (g)</Label>
            <Input
              id="protein"
              type="number"
              value={foodForm.protein ?? ""}
              onChange={(e) => updateField("protein", e.target.value)}
              required
            />

            <Label htmlFor="carbs">Carbs (g)</Label>
            <Input
              id="carbs"
              type="number"
              value={foodForm.carbs ?? ""}
              onChange={(e) => updateField("carbs", e.target.value)}
              required
            />

            <Label htmlFor="fat">Fat (g)</Label>
            <Input
              id="fat"
              type="number"
              value={foodForm.fat ?? ""}
              onChange={(e) => updateField("fat", e.target.value)}
              required
            />
          </div>

          {/* Optional fields */}
          <Collapsible>
            <CollapsibleTrigger className="mt-2">
              Advanced Nutrition (optional)
            </CollapsibleTrigger>
            <CollapsibleContent className="grid gap-2 mt-2">
              <Label htmlFor="fiber">Fiber (g)</Label>
              <Input
                id="fiber"
                type="number"
                value={foodForm.fiber ?? ""}
                onChange={(e) => updateField("fiber", e.target.value)}
              />

              <Label htmlFor="sugar">Sugar (g)</Label>
              <Input
                id="sugar"
                type="number"
                value={foodForm.sugar ?? ""}
                onChange={(e) => updateField("sugar", e.target.value)}
              />

              <Label htmlFor="sodium">Sodium (mg)</Label>
              <Input
                id="sodium"
                type="number"
                value={foodForm.sodium ?? ""}
                onChange={(e) => updateField("sodium", e.target.value)}
              />

              <Label htmlFor="cholesterol">Cholesterol (mg)</Label>
              <Input
                id="cholesterol"
                type="number"
                value={foodForm.cholesterol ?? ""}
                onChange={(e) => updateField("cholesterol", e.target.value)}
              />

              <Label htmlFor="caffeine">Caffeine (mg)</Label>
              <Input
                id="caffeine"
                type="number"
                value={foodForm.caffeine ?? ""}
                onChange={(e) => updateField("caffeine", e.target.value)}
              />
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleAddFood} disabled={isPending}>
            {isPending ? "Adding..." : "Add Food"}
          </Button>
          <Button onClick={() => router.refresh()}>Refresh Foods</Button>
        </CardFooter>
      </Card>

      {error && <div className="text-red-600">{error}</div>}

      {foods.length > 0 && (
        <div className="w-full max-w-md">
          <h3 className="font-semibold mt-4">Foods</h3>
          <ul className="list-disc pl-5 mt-2">
            {foods.map((f) => (
              <li key={f.id} className="text-sm">
                {f.name} - {f.calories} cal
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
