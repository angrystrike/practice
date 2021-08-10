import Link from "next/link";

export default function Footer() {
    return (
        <footer className="max-w-5xl flex justify-center items-center py-3 mx-auto mb-5 bg-white rounded-lg shadow-lg">
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