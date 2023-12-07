import '../App.css';
import axios from 'axios';
import supabase from '../Supabase';

function Pricing() {
    const plans = [
        {
            id: 'price_1NI5WF2tbJF1RhFuANMYUsGg',
            name: 'Starter Joint',
            price: 0,
            description: 'Test drive AI marketing tool',
            features: [
                'Create basic marketing plans',
                'Generate up to 7 Days of Social Content',
                'Limited Keyword Research'
            ],
            trial: [
                '1st week: 1500 Words',
                'From 2nd week: 500 Words',
            ]
        },
        {
            id: 'price_1NTNEX2tbJF1RhFuo2AYv0XM',
            name: 'The Chronic',
            price: 49,
            description: 'Start Baking',
            features: [
                'Marketing Plans & Promotions',
                'Social media content',
                'SEO Optimization',
                'Brand Positioning',
                'Emails Marketing & Marketing Funnels',
                'Pricing Table list item',
                'Product Description'
            ],
            trial: []
        },
        {
            id: 'price_1NI5WF2tbJF1RhFuANMYUsGg',
            name: 'The Hybrid',
            price: 'Agency',
            description: 'Drive Revenue Growth',
            features: [
                'Brand Developement and Stratergy',
                'Content Marketing and local SEO',
                'Social Media Management & Stratergy',
                'Email Marketing',
                'Marketing Automation',
                'Sales Enablement',
                'Pricing Table list item',
                'Product Description'
            ],
            trial: []
        }
    ]

    const selectPlan = async (index) => {
        let bearerKey = 'Bearer '
        const user = await supabase.auth.getSession()
        console.log(user.data.session.access_token)
        bearerKey = bearerKey + user.data.session.access_token
        const devUrl = 'https://AI marketing tools-production.up.railway.app/stripe/pay'
        const response = await axios.post(devUrl,
            {
                price: plans[index].id,
                success_url: 'https://stoned.AI marketing tool.ai/dashboard',
                cancel_url: 'https://stoned.AI marketing tool.ai/dashboard'
            },
            {
                headers: {
                    'Authorization': bearerKey
                },
            })
        window.location.href = response.data
    }

    return (
        <div className='flex items-center justify-center flex-col bg-brand min-h-screen py-8'>
            <div className='flex lg:flex-row'>
                <div className='flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:space-x-6'>
                    {plans.map((plan, index) => (
                        <div key={index} className='flex flex-col justify-between lg:w-1/3 p-6 rounded-lg bg-black/75 border border-white/20'>
                            <div className='flex flex-col space-y-6 justify-between h-full'>
                                <div className='flex flex-col items-center'>
                                    <h1 className='text-3xl font-medium text-green-700'>{plan.name}</h1>
                                    {plan.price !== 'Agency' ? (
                                        <h2 className='text-2xl font-medium text-gray-300'>${plan.price}
                                            < span className='text-gray-500 text-base'>/mo</span></h2>
                                    ) : (
                                        <h2 className='text-2xl font-medium text-gray-300'>Contact Us</h2>
                                    )}
                                    <p className='text-gray-500'>{plan.description}</p>
                                </div>
                                <div key={index} className='flex flex-col space-y-2 items-start h-full'>
                                    {plan.features.map((feature, index) => (
                                        <p key={index} className='text-gray-500'>{feature}</p>

                                    ))}
                                </div>
                                <div key={index} className='flex flex-col space-y-2 items-start h-full'>
                                    {plan.trial.map((trial, index) => (
                                        <p key={index} className='text-green-300 font-semibold'>{trial}</p>
                                    ))}
                                </div>
                                <button
                                    onClick={() => selectPlan(index)}
                                    className='transition-all ease-in w-full py-4 hover:bg-green-800 bg-brand text-white rounded-lg font-medium text-lg'>Get Started
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </div>
    );
}

export default Pricing;
