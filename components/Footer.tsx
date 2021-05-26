import Link from "next/link";

export default function Footer() {
    return (
        <footer className="my-3 mx-2 py-3 flex justify-center bg-white rounded-lg shadow-lg">
            <nav className="text-gray-600">
                <Link href="/">
                    <a>Home</a>
                </Link>
                <span className="ml-10">|</span>
                <Link href="/">
                    <a className="ml-10">Categories</a>
                </Link>
                <span className="ml-10">|</span>
                <Link href="/">
                    <a className="ml-10">Product</a>
                </Link>
            </nav>
        </footer>
    )
}