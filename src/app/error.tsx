"use client"

export default function ErrorBoundary(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-2xl font-bold">An error occurred</h1>
      <p className="text-gray-600">Sorry, something went wrong.</p>
    </div>
  )
}
