import React from 'react'
import logo from '../assets/logo.png'

function HeaderLogin() {
    return (
        <div className='flex bg-white flex-row w-full py-4 md:py-0 px-3 md:h-24 mt-2 items-center justify-between'>
            <div className='container mx-auto'>
                <div className="flex flex-col md:flex-row w-full h-full items-center justify-center">
                    <a href='/' className='flex flex-row w-auto space-x-3'>
                        <img src={logo} alt="logo" className="h-12" />
                        <h1 className="text-3xl font-medium text-brand">AI marketing tool.ai</h1>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default HeaderLogin