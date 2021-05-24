import Link from 'next/link'

export default function Home() {
  return (
    <ul className="bg-gray-600">
      <li className="bg-gray-600">
        <Link href="/b" as="/a">
          <a>a</a>
        </Link>
      </li>
      <li>
        <Link href="/a" as="/b">
          <a>b</a>
        </Link>
      </li>
    </ul>
  )
}
