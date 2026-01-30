"use client"

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
import React, { useState } from "react"
import type { UserDTO } from "@/lib/dtos"
import { APIError } from "@/lib/types"
export default function Home(): React.JSX.Element {
  const [users, setUsers] = useState<UserDTO[] | null>(null)
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [usersError, setUsersError] = useState<string | null>(null)

  async function loadUsers(): Promise<void> {
    setLoadingUsers(true)
    setUsersError(null)
    try {
      const res = await fetch("/api")
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      const data = await res.json()
      setUsers(data)
    } catch (err: unknown) {
      const apiError = err as APIError
      setUsersError(String(apiError?.message ?? apiError))
    } finally {
      setLoadingUsers(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Page Home Card Content</CardTitle>
          <CardDescription>A Description of the Card Content</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="random-input">Random Input</Label>
                <Input
                  id="random-input"
                  type="text"
                  placeholder="Random Text"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            className="w-full"
            onClick={loadUsers}
            disabled={loadingUsers}
          >
            {loadingUsers ? "Loading users..." : "Load Users"}
          </Button>
        </CardFooter>
      </Card>
      {usersError && (
        <div className="w-full max-w-sm text-sm text-red-600">
          Error: {usersError}
        </div>
      )}
      {users && (
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
      )}
    </div>
  )
}
