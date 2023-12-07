import React, { useMemo } from 'react'
import supabase from './Supabase'

function Admin() {
    const [user, setUser] = React.useState([])
    const [search, setSearch] = React.useState('')
    let count = 0

    const handleSearch = (e) => {
        setSearch(e.target.value)
        searchUser()
    }

    const handleDelete = async (email) => {
        const { data, error } = await supabase
            .from('users')
            .delete()
            .eq('email', email)
        getUsers()
    }

    const searchUser = async () => {
        // search keyword in email
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .ilike('email', `%${search}%`)

        if (data.length === 0) {

            setUser([])
        }
        else {
            setUser(data)
        }
        if (search === '') {
            getUsers()
        }
    }

    const getUsers = async () => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
        setUser(data)
    }

    // clear session storage on browser close
    window.onbeforeunload = function () {
        sessionStorage.clear()
    }

    useMemo(() => {
        const isAdmin = sessionStorage.getItem('admin')
        if (isAdmin !== 'true') {
            window.location.href = '/admin'
        }
        getUsers()
    }, [])

    useMemo(() => {
        searchUser()
    }, [search])

    return (
        <div className='flex flex-col min-h-screen w-full bg-gray-200'>
            {/* title */}
            <div className='flex flex-col w-full h-20 bg-white drop-shadow-[0_15px_15px_rgba(50,50,40,0.03)]'>
                <div className='flex flex-row w-full h-full items-center justify-between px-4'>
                    <div className="container mx-auto">
                        <h1 className='text-4xl font-bold text-gray-800'>Admin</h1>
                    </div>
                </div>
            </div>
            {/* search box */}
            <div className='flex flex-col w-full'>
                <div className="container mx-auto mt-4">
                    <div className='flex flex-row w-full h-full items-center justify-center space-x-3'>
                        <input onChange={handleSearch} type="text" className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" placeholder="Search User by email" />
                    </div>
                </div>
            </div>
            {/* refresh button */}
            <div className='flex flex-col w-full'>
                <div className='flex flex-row w-full h-full items-center justify-center'>
                    <div className="container mx-auto mt-4">
                        <button onClick={getUsers} className='w-full h-12 bg-brand text-white rounded-lg font-medium'>Refresh</button>
                    </div>
                </div>
            </div>
            {/* Table */}
            <div className='flex flex-col w-full h-full'>
                <div className='flex flex-row w-full h-full items-center justify-center'>
                    <div className="container mx-auto mt-4">
                        <table className="w-full text-left rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-800 text-gray-300 text-sm uppercase text-left">
                                    <th className="py-4 px-6">Name</th>
                                    <th className="py-4 px-6">Email</th>
                                    <th className="py-4 px-6">Phone Number</th>
                                    <th className="py-4 px-6">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {user?.map((user_) => (
                                    <tr key={user_.phoneNumber} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-4 px-6">{user_.firstname}</td>
                                        <td className="py-4 px-6">{user_.email}</td>
                                        <td className="py-4 px-6">{user_.phoneNumber}</td>
                                        <td className="py-4 px-6">
                                            <button onClick={() => handleDelete(user_.email)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin