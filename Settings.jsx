import React, { useEffect } from 'react'
import supabase from '../Supabase'
import axios from 'axios'

function Settings() {
    const [email, setEmail] = React.useState(
    )
    const [password, setpassword] = React.useState('')
    const [updateTxt, setUpdateTxt] = React.useState('Update')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlepassword = (e) => {
        setpassword(e.target.value)
    }

    const updateRecord = async () => {
        setUpdateTxt('Updating...')
        const { data, error } = await supabase
            .from('users')
            .update({ email: email, password: password })
            .eq('email', localStorage.getItem('email'))
        alert('Updated!')
        setUpdateTxt('Update')
    }

    const getDashboard = async () => {
        let bearerKey = 'Bearer '
        const user = await supabase.auth.getSession()
        console.log(user.data.session.access_token)
        bearerKey = bearerKey + user.data.session.access_token
        const devUrl = 'https://AI marketing tools-production.up.railway.app/stripe/getDashboard'
        const response = await axios.get(devUrl, {
            headers: {
                'Authorization': bearerKey
            }
        })
        window.location.href = response.data
    }

    useEffect(() => {
        const email_ = localStorage.getItem('email')
        const password_ = localStorage.getItem('password')
        setEmail(email_)
        setpassword(password_)
    }, [])

    return (
        <div className='flex flex-col w-full lg:w-2/3 h-full lg:ml-12'>
            <h2 className='text-2xl font-bold text-gray-800'>Settings</h2>
            <div className='flex flex-col w-full mt-3'>
                <label className='text-md font-medium text-gray-900'>Email Address</label>
                <input onChange={handleEmail} defaultValue={email} type='email' required={true} className='w-full h-12 mt-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-brand' />
            </div>
            <div className='flex flex-col w-full mt-3'>
                <label className='text-md font-medium text-gray-900'>Password</label>
                <input onChange={handlepassword} defaultValue={password} type='password' required={true} className='w-full h-12 mt-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-brand' />
            </div>
            <button onClick={updateRecord} className='w-full h-12 mt-3 bg-brand text-white rounded-lg font-medium'>{updateTxt}</button>
            <button onClick={getDashboard} className='w-full h-12 mt-3 mb-3 bg-brand text-white rounded-lg font-medium'>Payment Dashboard</button>
        </div>
    )
}

export default Settings