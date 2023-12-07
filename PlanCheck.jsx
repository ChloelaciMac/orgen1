import React from 'react'
import { checkUserPlan, initialCheck } from './functions'

function PlanCheck() {
    const checkActivePlan = async () => {
        window.location.href = '/dashboard'
    }

    React.useEffect(() => {
        checkActivePlan()
    }, [])

    return (
        <div className='flex flex-row items-center justify-center h-screen w-full'>
            Logging you in...
        </div>
    )
}

export default PlanCheck