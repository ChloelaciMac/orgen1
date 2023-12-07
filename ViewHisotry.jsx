import React from 'react'

function ViewHisotry () {
    const [history, setHistory] = React.useState({})

    React.useEffect(() => {
        // get id from localstorage
        const data = JSON.parse(localStorage.getItem('history'))
        setHistory({
            id: data.id,
            type: data.title,
            result: data.history
        })
    }, [])

    return (
        <div className='flex flex-col space-y-8 w-full h-full bg-white drop-shadow-2xl p-6 rounded-xl mb-6'>
            <h1 className='text-3xl uppercase font-bold text-gray-800 underline underline-offset-2'>{history.type}</h1>
            <div dangerouslySetInnerHTML={{ __html: history.result }} className='w-full h-full whitespace-pre-line' />
        </div>
    )
}

export default ViewHisotry