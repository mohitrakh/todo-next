
"use client"
import { addToken, addUser } from '@/Redux/Slices/todoSlice'
import { useAppDispatch } from '@/Redux/hooks'
import { addTokenToLS, addUserToLS } from '@/utils/localStorage'
import axios from 'axios'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        termsAndConditions: false
    });

    const [errroMsg, setErrroMsg] = useState("");
    const [showPass, setShowPass] = useState(false);
    const dispatch = useAppDispatch();

    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setErrroMsg("")
            const res = await axios.post('/api/auth/login', {
                email: formData.email,
                password: formData.email,
                termsAndConditions: formData.termsAndConditions,
            });
            console.log(typeof res?.data?.token);
            dispatch(addUser(res?.data?.data));
            addUserToLS({ username: res?.data?.data?.username, email: res?.data?.data?.email })
            addTokenToLS(res?.data?.token);
            dispatch(addToken(res?.data?.token))
            router.push('/')
        } catch (error) {
            console.log(error);
            setErrroMsg(error?.response?.data?.message)

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
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" name="password" id="password" placeholder="example@xyz.com" className="bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 px-4 outline-none block w-full p-2.5" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <div className=' border px-2 border-gray-300 w-full bg-[#E8F0FE] flex items-center rounded-lg'>
                                    <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} type={showPass ? "text" : "password"} name="password" id="password" placeholder="••••••••" className=" text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 outline-none " required />
                                    <button type='button' onClick={() => setShowPass(!showPass)} >
                                        <Eye />
                                    </button>
                                </div>
                            </div>

                            <p className="text-red-700">{errroMsg}</p>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input onChange={(e) => setFormData({ ...formData, termsAndConditions: e.target.checked })} id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500">I accept the <a className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                            <p className="text-sm font-light text-gray-500">
                                Already have an account?
                                <Link href='/register'>Register Here!</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage