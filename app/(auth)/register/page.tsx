"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        termsAndConditions: false
    })

    const [errorMsg, setErrorMsg] = useState("")

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setErrorMsg("")
            const res = await axios.post('/api/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.email,
                termsAndConditions: formData.termsAndConditions,
            });
            console.log(res.data);
            router.push('/login')
        } catch (error) {
            console.log(error)
            setErrorMsg(error?.response?.data?.message);
        }

    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create and account
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">User Name</label>
                                <input onChange={(e) => setFormData({ ...formData, username: e.target.value })} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="John Doe" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" name="password" id="password" placeholder="example@xyz.com" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input onChange={(e) => setFormData({ ...formData, termsAndConditions: e.target.checked })} id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500">I accept the <a className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <p className='text-red-700 text-[16px]'>{errorMsg}</p>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                            <p className="text-sm font-light text-gray-500">
                                Don't have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline">Register here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>


    )
}

export default RegisterPage