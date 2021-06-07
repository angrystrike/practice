import Image from 'next/image'
import dynamic from 'next/dynamic'
import React from 'react'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="overflow-y-hidden flex flex-col lg:flex-row">
            <div className="flex flex-col justify-center lg:justify-start bg-login lg:w-4/12 lg:h-screen px-20">
                <div className="my-10 lg:mt-40">
                    <img className="mx-auto" width="100" height="70" src="/images/logo-login.png" />
                </div>
                <div className="mx-16 text-center">
                    <h2 className="text-darkYellow text-2xl font-semibold">Discover best offers here</h2>
                </div>
                
                <div className="mt-10 lg:mt-40 bg-login-svg bg-no-repeat min-h-19 bg-25 lg:min-h-full lg:bg-auto"></div>
                
            </div>

            <div className="flex lg:w-8/12">
                <div className="lg:flex lg:flex-col lg:w-full lg:max-w-6xl lg:items-center lg:justify-center lg:mx-auto">
                    <div className="-ml-20">
                        <h2 className="font-bold lg:text-2xl">Register</h2>
                        <h4 className="text-gray-400 font-medium">
                            Already registered? &nbsp;
                            <Link href="/">
                                <a className="text-blue-500 font-bold">Login</a>
                            </Link>
                        </h4>
                    </div>
                    <form className="mt-6 flex flex-col font-lg">
                        <label className="text-left">First Name:</label>
                        <input className="py-3 focus:shadow-none bg-gray-100 border-none rounded-md focus:border-none focus:outline-none focus:bg-gray-200" type="text" />

                        <label className="mt-5 text-left">Last Name:</label>
                        <input className="py-3 focus:shadow-none bg-gray-100 border-none rounded-md focus:border-none focus:outline-none focus:bg-gray-200" type="text" />

                        <label className="mt-5 text-left">Email:</label>
                        <input className="py-3 focus:shadow-none bg-gray-100 border-none rounded-md focus:border-none focus:outline-none focus:bg-gray-200" type="text" />

                        <label className="mt-5 text-left">Password:</label>
                        <input className="py-3 focus:shadow-none bg-gray-100 border-none rounded-md focus:border-none focus:outline-none focus:bg-gray-200" type="text" />

                        <label className="mt-5 text-left">Repeat Password:</label>
                        <input className="py-3 focus:shadow-none bg-gray-100 border-none rounded-md focus:border-none focus:outline-none focus:bg-gray-200" type="text" />

                        <button className="mt-8 self-start bg-blue-500 text-white rounded-md py-2 md:w-24">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
