import React from 'react'
import Link from 'next/link'
import { LoginForm } from '../components/auth/LoginForm'
import AuthLayout from 'components/auth/AuthLayout'

export default function Home() {
    return (
        <AuthLayout>
            <div className="mt-10 lg:-ml-10">
                <h2 className="font-bold text-2xl">Login</h2>
                <h4 className="text-gray-400 font-medium">
                    New Here? &nbsp;
                    <Link href="/">
                        <a className="text-blue-500 font-bold">Create an Account</a>
                    </Link>
                </h4>
            </div>
            <LoginForm />
        </AuthLayout>
    )
}
