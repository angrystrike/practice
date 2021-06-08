import Image from 'next/image';
import Link from 'next/link';
import { SearchForm } from 'components/SearchForm'

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
                                    <a className="hover:text-gray-200">Home</a>
                                </Link>

                                <Link href="/">
                                    <a className="ml-5 sm:ml-10 hover:text-gray-200">Categories</a>
                                </Link>

                                <Link href="/">
                                    <a className="ml-5 sm:ml-10 hidden sm:inline hover:text-gray-200">Product</a>
                                </Link>
                            </nav>
                            <Link href="/login">
                                <a className="sm:ml-5 px-7 font-medium py-1 text-white bg-pink-600 focus:outline-none focus:bg-pink-800 rounded-md focus:rounded-xl shadow-lg">Login</a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto pt-3">
                    <h1 className="mt-14 text-center text-4xl text-white">Find your dream car!</h1>
                    
                    <SearchForm />                  
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