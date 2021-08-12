import React from 'react'
import Link from 'next/link'
import RegisterForm from 'components/auth/RegisterForm'
import AuthLayout from 'components/auth/AuthLayout'

export default function Home() {
    return (
        <AuthLayout>
            <div className="mt-10 lg:-ml-20">
                <h2 className="font-bold text-2xl">Register</h2>
                <h4 className="text-gray-400 font-medium">
                    Already registered? &nbsp;
                    <Link href="/login">
                        <a className="text-blue-500 font-bold">Login</a>
                    </Link>
                </h4>
            </div>
            <RegisterForm />
        </AuthLayout>
    )
}
