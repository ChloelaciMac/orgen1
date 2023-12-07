import React from 'react'

function Success() {
    React.useEffect(() => {
        setTimeout(() => {
            window.location.href = '/'
        }, 3000)
    }, [])
    
    return (
        <div className='flex flex-row h-screen w-screen justify-center items-center'>
            Success ! Redirecting you back to the home page...
        </div>
    )
}

export default Success