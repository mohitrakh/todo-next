"use client"
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React from 'react'

const Signout = () => {
    const router = useRouter()
    const clearCookie = () => {
        document.cookie = "access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/login")
    }
    return (
        <button onClick={clearCookie} className='py-3 px-5 rounded-lg bg-purple-700 text-white'>Signout</button>
    )
}

export default Signout