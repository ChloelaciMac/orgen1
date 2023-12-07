import React, { useEffect } from 'react'
import Footer from '../components/Footer';
import HeaderLogin from '../components/HeaderLogin'
import supabase from '../Supabase'
import Swal from 'sweetalert2'
import { useTrackingCode } from 'react-hubspot-tracking-code-hook';

function Signup() {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [signBtnText, setSignBtnText] = React.useState('Sign Up');
    const { setIdentity } = useTrackingCode();


    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }
    const handleLastName = (e) => {
        setLastName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const createAccount = async () => {
        const { user, session, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            redirectTo: 'https://localhost:5173/',
            options: {
                data: {
                    firstName: firstName,
                    lastName: lastName,
                }
            }
        }).then(() => {
            setIdentity(user?.email);
        })
        if (error) {
            console.log(error)
            return -1
        }
        return 1
    }

    const signUp = async () => {
        if (firstName == '' || lastName == '' || email == '' || password == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields',
            })
            return
        }
        setSignBtnText('Signing Up...')
        const serverResponse = await createAccount()
        if (serverResponse == -1) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error creating account',
            })
            setSignBtnText('Sign Up')
            return
        }
        setSignBtnText('Check your mail')
    }

    const loginWithGoogle = async () => {
        const { user, session, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'https://localhost:5173/dashboard'
            }
        }).then(() => {
            setIdentity(user.email)
        })
        if (error) {
            console.log(error)
            return
        }
    }

    return (
        <div className='flex flex-col justify-between w-full min-h-screen bg-[#F3F3F3]'>
            <HeaderLogin />
            <div className='container mx-auto w-9/12 md:w-3/6 mb-8'>
                <div className='flex flex-col w-full h-full'>
                    <div className='flex flex-row justify-center items-center mt-5'>
                        <h1 className='text-3xl font-medium text-gray-900'>Create your AI marketing tool.ai account</h1>
                    </div>
                    <div className='flex flex-col md:flex-row w-full md:space-x-3 mt-3'>
                        <div className='flex flex-col md:w-1/2 mt-5'>
                            <label className='text-md font-medium text-gray-900'>First Name</label>
                            <input onChange={handleFirstName} type='text' className='w-full h-12 mt-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-brand' placeholder='First Name' />
                        </div>
                        <div className='flex flex-col md:w-1/2 mt-5'>
                            <label className='text-md font-medium text-gray-900'>Last Name</label>
                            <input onChange={handleLastName} type='text' className='w-full h-12 mt-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-brand' placeholder='Last Name' />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full md:space-x-3 mt-3'>
                        <div className='flex flex-col w-full mt-5'>
                            <label className='text-md font-medium text-gray-900'>Email Address</label>
                            <input onChange={handleEmail} type='email' required={true} className='w-full h-12 mt-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-brand' placeholder='example@abc.com' />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full md:space-x-3 mt-3'>
                        <div className='flex flex-col w-full mt-5'>
                            <label className='text-md font-medium text-gray-900'>Password</label>
                            <input onChange={handlePassword} type='password' className='w-full h-12 mt-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-brand' placeholder='Enter password' />
                        </div>
                    </div>
                    <div className='flex flex-col w-full mt-5'>
                        <button onClick={signUp} className='w-full h-12 bg-brand text-white rounded-lg font-medium text-lg'>{signBtnText}
                        </button>
                    </div>
                    <div className='flex flex-row justify-center items-center mt-5'>
                        <hr className='w-full border-gray-300' />
                        <p className='text-md font-medium text-gray-900 mx-2'>or</p>
                        <hr className='w-full border-gray-300' />
                    </div>
                    <div className='flex flex-col w-full mt-5'>
                        <button
                            onClick={loginWithGoogle}
                            className='transition-all ease-in w-full h-12 bg-white text-brand border border-brand rounded-lg font-medium text-lg'>Signup with Google
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Signup