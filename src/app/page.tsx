import Link from "next/link"

export default function HomePage(): React.JSX.Element {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/dashboard"> Go to Dashboard </Link>
    </div>
  )
}
