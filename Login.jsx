import React, { useEffect, useMemo } from 'react'
import Footer from '../components/Footer';
import HeaderLogin from '../components/HeaderLogin'
import supabase from '../Supabase'
import { useHistory } from 'react-router-dom'
import { checkUserPlan } from './functions'
import Swal from 'sweetalert2'
import { useTrackingCode } from 'react-hubspot-tracking-code-hook';

function Login() {
    const history = useHistory()
    const [email, setEmail] = React.useState('');
    const [password, setpassword] = React.useState('');
    const [loginText, setLoginText] = React.useState('Login')
    const [userAuth, setUserAuth] = React.useState(false)
    const { setIdentity } = useTrackingCode();

    useMemo(() => {
        if (localStorage.getItem('auth')) {
            window.location.href = '/dashboard'
        }
    }, [])

    const login = async () => {
        setLoginText('Logging in...')
        const { user, session, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        const isUser = await supabase.auth.getUser()
        if (isUser?.data?.identities?.id === null) {
            localStorage.clear()
            setLoginText('Login')
            return
        }
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
            setLoginText('Login')
            return
        } else {
            setLoginText('Login')
            window.location.href = '/auth'
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlepassword = (e) => {
        setpassword(e.target.value);
    }

    const loginWithGoogle = async () => {
        const { user, session, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${process.env.END_POINT_URL}/auth`,
            }

        }).then(() => {
            setIdentity(user?.email);

        })

        if (error) {
            console.log(error)
            localStorage.clear()
            return
        }
    }

    return (
        <div className='flex flex-col justify-between w-screen min-h-screen bg-[#F3F3F3]'>
            <HeaderLogin />
            <div className='container mx-auto w-9/12 md:w-3/6 mb-8'>
                <div className='flex flex-col w-full h-full'>
                    <div className='flex flex-row justify-center items-center mt-5'>
                        <h1 className='text-3xl font-medium text-gray-900'>Login to your AI marketing tool.ai account</h1>
                    </div>
                    <div className='flex flex-col w-full mt-3'>
                        <div className='flex flex-col mt-5'>
                            <label className='text-md font-medium text-gray-900'>Email Address</label>
                            <input onChange={handleEmail} type='email' required={true} className='w-full h-12 mt-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-brand' placeholder='example@abc.com' />
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
                    {/* hr divider */}
                    <div className='flex flex-row justify-center items-center mt-5'>
                        <hr className='w-full border-gray-300' />
                        <p className='text-md font-medium text-gray-900 mx-2'>or</p>
                        <hr className='w-full border-gray-300' />
                    </div>
                    <div className='flex flex-col w-full mt-5'>
                        <button
                            onClick={loginWithGoogle}
                            className='transition-all ease-in w-full h-12 bg-white text-brand border border-brand rounded-lg font-medium text-lg'>Login with Google
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login