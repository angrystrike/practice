import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-header">
            <div className="pb-6">
                <div className="header-bg-color border-b border-white border-opacity-20">
                    <div className="px-6 pt-4 pb-2 max-w-5xl mx-auto">
                        <div>
                            <img className="hidden sm:block" width="50" height="50" src="/images/logo.png" />
                        </div>

                        <div className="sm:-mt-8 pb-3 flex justify-between sm:justify-end sm:flex-row items-center">
                            <nav className="text-white font-semibold">
                                <Link href="/">
                                    <a>Home</a>
                                </Link>

                                <Link href="/">
                                    <a className="ml-5 sm:ml-10">Categories</a>
                                </Link>

                                <Link href="/">
                                    <a className="ml-5 sm:ml-10 hidden sm:inline">Product</a>
                                </Link>
                            </nav>
                            <button type="button" className="sm:ml-5 px-7 font-medium py-1 text-white bg-pink-600 rounded-md shadow-lg">Login</button>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto pt-3">
                    <h1 className="mt-14 text-center text-4xl text-white">Find your dream car!</h1>

                    <div className="mt-6 px-6 flex items-center justify-center">
                        <svg className="relative left-9 sm:left-12 h-6 w-9 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" /></svg>
                        <input className="block w-full sm:w-1/2 mr-4 focus:outline-none focus:white text-white rounded-lg pl-10 pr-3 py-2 shadow-lg" placeholder="Search by model" />
                        <button className="px-4 py-2 block text-white bg-pink-600 font-semibold rounded-lg shadow-lg">Find</button>
                    </div>
                </div>
            </div>
            <div className="border-solid border-gray-200 fill-current text-gray-200" >
                <svg width="100%" height="56px" viewBox="0 0 100 100" version="1.1" preserveAspectRatio="none">
                    <path d="M0,0 C16.6666667,66 33.3333333,99 50,99 C66.6666667,99 83.3333333,66 100,0 L100,100 L0,100 L0,0 Z" fill="#00000"></path>
                </svg>
            </div>
        </header>
    )
}