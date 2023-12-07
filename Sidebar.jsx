import React from 'react'
import { BiHomeAlt } from 'react-icons/bi'
import { RiDraftLine } from 'react-icons/ri'
import { RiSettings5Line } from 'react-icons/ri'
import { AiOutlineStar } from 'react-icons/ai'
import { FiTerminal } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { getWords } from '../pages/functions'

function Sidebar(props) {
    const [menuItems, setMenuItems] = React.useState([
        {
            name: 'Dashboard',
            icon: <BiHomeAlt className='inline-block mr-2' />,
            link: '/dashboard',
            active: true
        },
        {
            name: 'DocChat',
            icon: <BiHomeAlt className='inline-block mr-2' />,
            link: '/chat',
            active: false
        },
        {
            name: 'History',
            icon: <RiDraftLine className='inline-block mr-2' />,
            link: '/history',
            active: false
        },
        {
            name: 'Favorites',
            icon: <AiOutlineStar className='inline-block mr-2' />,
            link: '/favorite',
            active: false
        },
        {
            name: 'Settings',
            icon: <RiSettings5Line className='inline-block mr-2' />,
            link: '/settings',
            active: false
        },
        {
            name: 'Changelog',
            icon: <FiTerminal className='inline-block mr-2' />,
            link: '/changelog',
            active: false
        },
    ])
    const [wordsRemaining, setWordsRemaining] = React.useState(0)

    const onClick = (btn) => {
        setMenuItems(menuItems.map(item => {
            if (item.name === btn) {
                item.active = true
            } else {
                item.active = false
            }
            return item
        }))
    }

    React.useEffect(() => {
        getWords().then(res => {
            console.log(res)
            setWordsRemaining(res)
        })
    }, [])

return (
    <div className='container mx-auto h-full px-5 lg:px-0'>
        <div className='flex space-y-3 flex-col w-full h-full'>
            <div className='flex flex-col lg:flex-row space-x-2 items-center w-full rounded-lg px-3 py-4 md:py-1 justify-center bg-white drop-shadow-2xl'>
                {menuItems.map((item, index) => (
                    <Link to={item.link} key={index} onClick={() => onClick(item.name)} className={`flex items-center w-full text-left text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-4 py-2 ${item.active ? 'bg-gray-100 text-brand' : ''}`}>
                        {item.icon}
                        {item.name}
                    </Link>
                ))}
                <div className='flex flex-col items-start w-full rounded-lg px-6 py-4 justify-center space-y-2 font-bold'>
                    <p className='text-md'>Words: {wordsRemaining}</p>
                </div>
            </div>
            <div className='flex flex-col items-start w-full h-full mb-4'>
                {props.children}
            </div>
        </div>
    </div>
)
}

export default Sidebar