import React from 'react'
import Signout from './Signout'

const Navbar = () => {

    return (
        <div className='flex justify-between py-3 px-4 bg-slate-700'>
            <div>
                <h1 className='font-bold text-3xl text-purple-600'>Todo Office</h1>
            </div>
            <div>
                <Signout />
            </div>
        </div>
    )
}

export default Navbar