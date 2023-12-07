import React from 'react'
import supabase from '../Supabase'

function Favourites() {
    const [fav, setFav] = React.useState([])

    const getFavorite = async () => {
        const user = await supabase.auth.getUser()
        const email = user.data.user.email
        let { data, error } = await supabase
            .rpc('get_favorite_history', {
                email
            })

        if (error) console.error(error)
        else {
            setFav(
                data.map((fav) => ({
                    id: fav.id,
                    title: fav.type,
                    history: fav.result
                }))
            )
        }
    }

    const viewHistory = (id, title, histroy) => {
        const data = {
            id: id,
            title: title,
            history: histroy
        }
        localStorage.setItem('history', JSON.stringify(data))
        window.location.href = '/view_history'
    }

    const deleteDrafts = async (id) => {
        const email = localStorage.getItem('email')
        const { data, error } = await supabase.from('favorites').delete().eq('id', id).eq('email', email)
        alert('Removed From Favorites!')
        window.location.reload()
    }

    React.useEffect(() => {
        getFavorite()
    }, [])

    return (
        <div className='flex flex-col w-full h-full space-y-3'>
            <h2 className='text-2xl font-bold text-gray-800'>Favorites</h2>
            {fav.length > 0 ?
                <div className='flex flex-col w-full overflow-x-auto'>
                    <table className='w-full overflow-x-auto'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2'>Title</th>
                                <th className='px-4 py-2'>History</th>
                                <th className='px-4 py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='overflow-x-auto'>
                            {fav.map((fav) => (
                                <tr key={fav.id}>
                                    <td className='border px-4 py-2'>{fav.title}</td>
                                    <td className='border px-4 py-2 line-clamp-3'>
                                        <div dangerouslySetInnerHTML={{ __html: fav.history }} />
                                    </td>
                                    <td className='border px-4 w-2/12 py-2'>
                                        <button
                                            onClick={() => viewHistory(fav.id, fav.title, fav.history)}
                                            className='w-full h-12 bg-brand text-white rounded-lg font-medium mb-3'>View</button>
                                        <button
                                            onClick={() => deleteDrafts(fav.id)}
                                            className='w-full h-12 bg-red-700 text-white rounded-lg font-medium'>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                :
                <div className='flex flex-col w-full h-full justify-center items-center'>
                    <h2 className='text-2xl font-bold text-gray-800'>No Favorites</h2>
                </div>
            }
        </div>
    )
}

export default Favourites