import React from 'react'
import logo from '../assets/logo.png'
import { HiOutlinePlusCircle } from 'react-icons/hi'

function HeaderLanding() {
    return (
        <div className='flex flex-row w-full py-4 md:py-0 px-3 md:h-24 mt-2 items-center justify-between border-b border-white/10'>
            <div className='container mx-auto'>
                <div className="flex flex-col md:flex-row w-full h-full items-center justify-between">
                    <a href='/' className='flex flex-row items-center w-auto space-x-3'>
                        <img src={logo} alt="logo" className="h-16" />
                        <h1 className="text-3xl font-medium text-white">AI marketing tool.ai</h1>
                    </a>
                    {/* outlined login button */}
                    <div className='flex flex-row space-x-3'>
                        <a href='/' className="transition-all ease-linear px-4 py-2 md:px-12 md:py-3 bg-transparent hover:bg-white/10 hidden md:inline-flex items-center rounded-lg font-bold text-sm md:text-lg text-white border border-white">
                            Login
                        </a>
                        {/* solid signup button */}
                        <a href='/signup' className="transition-all ease-linear px-4 py-2 md:px-12 md:py-3 bg-white hover:bg-green-800 hover:text-white hidden md:inline-flex items-center rounded-lg font-bold text-sm md:text-lg text-brand">
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderLanding