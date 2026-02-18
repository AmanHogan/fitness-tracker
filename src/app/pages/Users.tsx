"use client"

import { UserRow } from "@/lib/types"
import { addUser } from "@/lib/actions/users"
import { useRouter } from "next/navigation"
import React, { useState, useTransition } from "react"
import { UserForm } from "@/lib/types"

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

export default function UsersClient({
  initialUsers,
}: {
  initialUsers: UserRow[]
}): React.JSX.Element {
  const router = useRouter()
  const [users, setUsers] = useState<UserRow[]>(initialUsers)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<UserForm>({
    email: "",
    password: "",
  })

  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.SubmitEvent): void {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      try {
        const newUser = await addUser(form)
        setUsers((prev) => [...prev, newUser])
        setForm({
          email: "",
          password: "",
        })
      } catch (err) {
        setError("Failed to add user")
        console.error(err)
      }
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Add User</CardTitle>
          <CardDescription>
            Create a new user and add them to the list.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Adding..." : "Add User"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.refresh()}
            >
              Refresh Users
            </Button>
          </CardFooter>
        </form>
      </Card>

      {error && (
        <div className="w-full max-w-sm text-sm text-red-600">{error}</div>
      )}

      <div className="w-full max-w-sm">
        <h3 className="font-semibold mt-4">Users</h3>
        <ul className="list-disc pl-5 mt-2">
          {users.map((u) => (
            <li key={u.id} className="text-sm">
              {u.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
