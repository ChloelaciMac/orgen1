import React, { useEffect, useMemo } from 'react'
import Footer from '../components/Footer';
import HeaderLogin from '../components/HeaderLogin'
import supabase from '../Supabase'
import { useHistory } from 'react-router-dom'
import { useTrackingCode } from 'react-hubspot-tracking-code-hook';

export default function AdminLogin() {
    const history = useHistory()
    const [email, setEmail] = React.useState('');
    const [password, setpassword] = React.useState('');
    const [loginText, setLoginText] = React.useState('Login')
    const { setIdentity } = useTrackingCode();

    const login = async () => {
        setLoginText('Logging in...')
        const { data, error } = await supabase
            .from('admin')
            .select('username, password')
            .eq('username', email)
            .eq('password', password)
        if (data.length > 0) {
            sessionStorage.clear()
            sessionStorage.setItem('admin', 'true')
            // PUSH TO DASHBOARD WITH userAuth
            window.location.href = '/admin-xDw23dt42s'
        }
        else {
            alert('Email or Password incorrect')
        }
        setLoginText('Login')
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setIdentity(email);
    }
    const handlepassword = (e) => {
        setpassword(e.target.value);
    }


    return (
        <div className='flex flex-col justify-between w-screen min-h-screen bg-[#F3F3F3]'>
            <HeaderLogin />
            <div className='container mx-auto w-9/12 md:w-3/6 mb-8'>
                <div className='flex flex-col w-full h-full'>
                    <div className='flex flex-row justify-center items-center mt-5'>
                        <h1 className='text-3xl font-medium text-gray-900'>Login to your GreatGov Admin account</h1>
                    </div>
                    <div className='flex flex-col w-full mt-3'>
                        <div className='flex flex-col mt-5'>
                            <label className='text-md font-medium text-gray-900'>Username</label>
                            <input onChange={handleEmail} type='text' required={true} className='w-full h-12 mt-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-brand' placeholder='username' />
                        </div>
                        <div className='flex flex-col mt-5'>
                            <label className='text-md font-medium text-gray-900'>Password</label>
                            <input onChange={handlepassword} type='password' className='w-full h-12 mt-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-brand' placeholder='Enter password' />
                        </div>
                    </div>
                    <div className='flex flex-col w-full mt-5'>
                        <button onClick={login} className='transition-all ease-in w-full h-12 bg-brand text-white rounded-lg font-medium text-lg'>{loginText}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}