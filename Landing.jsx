import React, { useMemo } from 'react'
import HeaderLanding from '../components/HeaderLanding'
import laptop from '../assets/Laptop.png'
import Footer from '../components/Footer'
import Pricing from './Pricing'

function Landing() {
    return (
        <div className='flex flex-col justify-between max-w-screen min-h-screen bg-brand'>
            <HeaderLanding />
            <div className='flex flex-col w-full h-full px-4 py-5'>
                <div className='container mx-auto h-full'>
                    <div className='flex flex-col md:flex-row w-full h-full items-center space-y-10 md:space-y-0'>
                        <div className='flex flex-col items-center md:items-start justify-center space-y-10 w-full'>
                            <div className='flex flex-col space-y-3 w-full lg:w-3/4'>
                                <p className='md:text-6xl text-4xl font-bold text-center md:text-left text-white break-keep'>
                                    Generate better content using our finetuned AI tool
                                </p>
                            </div>
                            <p className='text-white text-center md:text-left text-lg w-2/3 mt-4 md:mt-12'>
                                Our goal is to simplify content creation for you. We use the latest AI technology to help you generate better content for your audience.
                            </p>
                            <div className='flex flex-row w-full items-center justify-center md:justify-start space-x-2'>
                                {/* solid signup button */}
                                <a href='/signup' className="transition-all ease-linear px-4 py-2 md:px-12 md:py-3 bg-white hover:bg-green-800/90 md:inline-flex items-center rounded-lg font-bold text-sm md:text-lg text-brand hover:text-white">
                                    Get Started
                                </a>
                                <a href='/' className="transition-all ease-linear px-4 py-2 md:px-12 md:py-3 bg-transparent hover:bg-white/10 md:inline-flex items-center rounded-lg font-bold text-sm md:text-lg text-white border border-white">
                                    Login
                                </a>
                            </div>
                        </div>
                        <div className='flex flex-col w-full space-y-3'>
                            <img src={laptop} className='w-full object-contain' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center w-full h-full space-y-10 py-10 mt-24  '>
                    <h1 className='text-4xl font-bold text-center text-white'>Our Pricing</h1>
                    <Pricing />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Landing