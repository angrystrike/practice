import Image from 'next/image'
import dynamic from 'next/dynamic'
import React from 'react'
import Link from 'next/link'
import { LoginForm } from '../components/auth/LoginForm'

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
                    <div className="-ml-10">
                        <h2 className="font-bold lg:text-2xl">Login</h2>
                        <h4 className="text-gray-400 font-medium">
                            New Here? &nbsp;
                            <Link href="/">
                                <a className="text-blue-500 font-bold">Create an Account</a>
                            </Link>
                        </h4>
                    </div>
                    <LoginForm />           
                </div>
            </div>
        </div>
    )
}
