import React from 'react'
import supabase from '../Supabase'

function Drafts() {
    const [loading, setLoading] = React.useState(true)
    const [drafts, setDrafts] = React.useState([
    ])
    const fetchDrafts = async () => {
        let temp = []
        let user = await supabase.auth.getUser()
        let uuid = user.data.user.id
        console.log(uuid)
        const { data, error } = await supabase.from('history').select('*').eq('uuid', uuid)
        if (data) {
            data.map((draft) => {
                temp.push({
                    id: draft.id,
                    title: draft.type,
                    history: draft.result
                })
            })
        }
        setDrafts(temp)
        setLoading(false)
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
        let user = await supabase.auth.getUser()
        let uuid = user.data.user.id
        const { data, error } = await supabase.from('history').delete().eq('id', id).eq('uuid', uuid)
        alert('Deleted!')
        window.location.reload()
    }

    const addToFav = async (id) => {
        const user = await supabase.auth.getUser()
        const email = user.data.user.email
        console.log(email)
        const { data, error } = await supabase.from('favorites').insert([
            { email: email, id: id }
        ])
        alert('Added to favorites!')
    }

    React.useEffect(() => {
        console.log(drafts)
    }, [drafts])


    React.useEffect(() => {
        fetchDrafts()
    }, [])

    return (
        <div className='flex flex-col w-full h-full space-y-3'>
            <h2 className='text-2xl font-bold text-gray-800'>Latest History</h2>
            {drafts.length > 0 ?
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
                        {drafts.map((draft_) => (
                            <tr key={draft_.id}>
                                <td className='border px-4 py-2'>{draft_.title}</td>
                                <td className='border px-4 py-2 line-clamp-6'>
                                    <div dangerouslySetInnerHTML={{ __html: draft_.history }} />
                                </td>
                                <td className='border px-4 w-2/12 py-2'>
                                    <button 
                                        onClick={() => viewHistory(draft_.id, draft_.title, draft_.history)}
                                    className='w-full h-12 bg-brand text-white rounded-lg font-medium mb-3'>View</button>
                                    <button
                                        onClick={() => addToFav(draft_.id)}
                                    className='w-full bg-yellow-500 text-white rounded-lg font-medium mb-3 px-2 py-2'>Add to Favorites</button>
                                    <button
                                        onClick={() => deleteDrafts(draft_.id)}
                                    className='w-full h-12 bg-red-700 text-white rounded-lg font-medium'>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            :
            <div className='flex flex-col w-full h-full justify-center items-center'>
                <h2 className='text-2xl font-bold text-gray-800'>No History</h2>
            </div>
            }
        </div>
    )
}

export default Drafts