import React from 'react'
import axios from 'axios'
import supabase from '../Supabase'

function Temp() {
    let bearerKey = 'Bearer '

    const checkActivePlan = async () => {
        const user = await supabase.auth.getSession()
        console.log(user.data.session.access_token)
        bearerKey = bearerKey + user.data.session.access_token
        const devURL = 'https://AI marketing tools-production.up.railway.app/stripe/getCurrentPlan'
        const response = await axios.get(devURL, {
            headers: {
                'Authorization': bearerKey
            }
        })
        console.log(response)
    }

    const buyPlan = async () => {
        const devUrl = 'https://AI marketing tools-production.up.railway.app/stripe/pay'
        const response = await axios.post(devUrl,
            {
                price: 'price_1NI5WF2tbJF1RhFu66jStxfr',
                success_url: 'http://localhost:5173/dashboard',
                cancel_url: 'http://localhost:5173/'
            },
            {
                headers: {
                    'Authorization': bearerKey
                },
            })
        console.log(response)
    }

    const getInvoice = async () => {
        const devUrl = 'https://AI marketing tools-production.up.railway.app/stripe/getInvoice'
        const response = await axios.get(devUrl, {
            headers: {
                'Authorization': bearerKey
            }
        })
        console.log(response)
    }

    const getDashboard = async () => {
        const devUrl = 'https://AI marketing tools-production.up.railway.app/stripe/getDashboard'
        const response = await axios.get(devUrl, {
            headers: {
                'Authorization': bearerKey
            }
        })
        console.log(response)
    }

    React.useEffect(() => {
        //checkActivePlan()
        //buyPlan()
        //getInvoice()
        //getDashboard()
    }, [])

    return (
        <div>Payment Page</div>
    )
}

export default Temp