import React, { useMemo } from 'react'
import logo from '../assets/logo.png'
import { IoIosShareAlt } from 'react-icons/io'
import { useLocation, useHistory } from 'react-router-dom'
import { FacebookShareButton, FacebookIcon } from 'react-share'

function Header() {
    let title = 'AI marketing tool.ai'
    let url = 'https://stoned.AI marketing tool.ai'
    const logout = () => {
        //clear local storage
        localStorage.clear();
        window.location.href = '/'
    }

    return (
        <div className='flex flex-row w-full py-4 md:py-0 px-3 md:h-24 bg-white items-center justify-between'>
            <div className='container mx-auto'>
                <div className="flex flex-col md:flex-row w-full h-full items-center justify-between">
                    <a href='/' className='flex flex-row items-center w-auto space-x-3'>
                        <img src={logo} alt="logo" className="h-12 ml-4" />
                        <h1 className="text-3xl font-medium text-brand">AI marketing tool.ai</h1>
                    </a>
                    <div className="flex flex-row space-x-3 md:space-x-5 items-center">
                        <button onClick={logout} className="transition-all ease-linear px-4 py-2 md:px-7 md:py-3 bg-white hidden md:inline-flex items-center rounded-xl font-bold text-sm md:text-lg text-brand border border-brand">
                            Logout
                        </button>
                        <FacebookShareButton url={url} quote={title}>
                            <a className="transition-all ease-linear px-4 py-2 md:px-7 md:py-3 bg-brand hover:bg-brand/90 hidden md:inline-flex items-center rounded-xl font-bold text-sm md:text-lg text-white">
                                <IoIosShareAlt className="mr-2" />
                                Share
                            </a>
                        </FacebookShareButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header