import Image from 'next/image'
import dynamic from 'next/dynamic'
import React from 'react'
import Link from 'next/link'
import { RegisterForm } from 'components/auth/RegisterForm'

export default function Home() {
    return (
        <div className="overflow-y-hidden flex flex-col lg:flex-row">
            <div className="flex flex-col justify-center lg:justify-start bg-login lg:w-5/12 lg:h-screen px-20">
                <div className="my-10 lg:mt-40">
                    <img className="mx-auto" width="100" height="70" src="/images/logo-login.png" />
                </div>
                <div className="mx-16 text-center">
                    <h2 className="text-darkYellow text-2xl font-semibold">Discover best offers here</h2>
                </div>
                
                <div className="sm:mt-10 lg:-mt-20 bg-login-svg bg-no-repeat min-h-19 bg-contain lg:min-h-full lg:bg-auto bg-center"></div>            
            </div>

            <div className="flex lg:w-7/12">
                <div className="lg:flex lg:flex-col lg:w-full lg:max-w-6xl items-center lg:justify-center mx-auto">
                    <div className="mt-10 lg:-ml-20">
                        <h2 className="font-bold text-2xl">Register</h2>
                        <h4 className="text-gray-400 font-medium">
                            Already registered? &nbsp;
                            <Link href="/">
                                <a className="text-blue-500 font-bold">Login</a>
                            </Link>
                        </h4>
                    </div>
                    <RegisterForm />          
                </div>
            </div>
        </div>
    )
}
