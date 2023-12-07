import React from 'react'
import { Link } from 'react-router-dom'
import supabase from '../Supabase'
import { useTrackingCode } from 'react-hubspot-tracking-code-hook';

function Cards() {

    const [cards, setCards] = React.useState([
        {
            name: 'Marketing Plans',
            desc: 'Create effective marketing plans and promotions quickly.',
            link: '/marketing'
        },
        {
            name: 'Social Media Content',
            desc: 'Generate months of engaging, niche social content within minutes.',
            link: '/social-media'
        },
        {
            name: 'Blog Posts',
            desc: 'Generate engaging blog posts. Unleash your creativity. Edit to put your touch on it',
            link: '/blog'
        },
        {
            name: 'SEO Keyword Research',
            desc: 'Find "low hanging fruit" keywords. Build out your SEO Strategy',
            link: '/seo'
        },
        {
            name: 'Brand Diety',
            desc: 'Uncover what makes vour brand unique.',
            link: '/brand'
        },
        {
            name: 'Email Marketing',
            desc: 'Using the PAS framework to generate high-converting marketing emails.',
            link: '/email'
        },
        {
            name: 'Marketing Funnels',
            desc: 'Build better marketing funnels and customer journeys using the AIDA framework',
            link: '/funnels'
        },
        {
            name: 'Product Descriptions',
            desc: 'Write category-leading product descriptions quickly',
            link: '/product'
        },
        {
            name: 'Custom Prompt',
            desc: 'Create your own custom prompt',
            link: '/custom'
        }
    ])
    const { setPathPageView, setIdentity, setTrackPageView } = useTrackingCode();


    const [userName, setUserName] = React.useState()

    const getUserName = async () => {
        const user = await supabase.auth.getUser()

        if (user.data.user.app_metadata.provider === 'google') {
            const name = await user.data.user.user_metadata.full_name
            return name
        } else if (user.data.user.app_metadata.provider === 'email') {
            const name = await user.data.user.user_metadata.firstName
            return name
        }
    }

    React.useEffect(() => {
        // const temp = getUserName()
        // setUserName(temp)
        getUserName().then((name) => {
            setUserName(name)
            setTrackPageView()
            setPathPageView('/dashboard')
        })
    }, [userName])

    return (
        <div className='flex flex-col w-full h-full mt-5'>
            <div className='flex flex-row w-full justify-between'>
                <h1 className='text-2xl text-center lg:text-left lg:text-3xl font-medium text-gray-900 px-4'>👋🏻 Hi {userName} — Greatness awaits you! What task would you like to complete today ?</h1>
            </div>
            <div className='flex flex-row justify-center lg:justify-start w-full mt-8 gap-y-4 flex-wrap p-2'>
                {cards.map((card, index) => (
                    <Link to={card.link} key={index} className={`flex flex-col w-full lg:w-72 bg-white px-8 py-7 rounded-lg cursor-pointer hover:scale-105 transition-all ease-linear drop-shadow-[0_35px_35px_rgba(25,25,25,0.1)] mr-6 space-y-2`}>
                        <h1 className='text-2xl font-medium text-gray-900'>{card.name}</h1>
                        <p className='text-gray-600'>{card.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Cards