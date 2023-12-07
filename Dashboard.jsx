import React, { useEffect, useMemo } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Temp from './Temp'
import supabase from '../Supabase'
import logo from '../assets/logo.png'
import { useTrackingCode } from 'react-hubspot-tracking-code-hook'

function Dashboard(props) {
    const [show, setShow] = React.useState(false);
    const { setPathPageView, setTrackPageView, setIdentity } = useTrackingCode();

    function wait(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    const getUserSession = async () => {
        const user = await supabase.auth.getSession()
        console.log(user)
        console.log(user?.data?.session?.user?.email)
        setIdentity(user?.data?.session?.user?.email)
        setPathPageView('/dashboard')
        setTrackPageView()
        s
        if (user.data.session !== null) {
            return true
        } else {
            return false
        }
    }

    useMemo(() => {
        setShow(false)
        if (getUserSession()) {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [])

    return (
        <>
            {show ?
                <div className='flex flex-col justify-between max-w-screen min-h-screen bg-[#F3F3F3] overflow-x-hidden'>
                    <div className='flex flex-col w-full'>
                        <Header />
                        <div className='flex flex-row w-full h-full space-x-4 items-start justify-start mt-12'>
                            <Sidebar children={props.children} />
                        </div>
                    </div>
                    <Footer />
                </div>
                : <div className='flex flex-col justify-center items-center w-screen min-h-screen bg-[#F3F3F3]'>
                    <img src={logo} alt='logo' className='w-56 animate-bounce' />
                </div>}
        </>
    )
}

export default Dashboard