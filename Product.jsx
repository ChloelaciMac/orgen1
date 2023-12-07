import React from 'react'
import { useState, useMemo, useEffect } from 'react';
import supabase from '../Supabase'
import { OpenAI } from "openai-streams";
import { AiFillStar } from 'react-icons/ai'
import Quill from './Quill';
import { useTrackingCode } from 'react-hubspot-tracking-code-hook';
const apiKey = import.meta.env.VITE_OPENAI_KEY

export default function Product() {
    const [inputOne, setInputOne] = React.useState('')
    const [result, setResult] = React.useState('')
    const [showResult, setShowResult] = React.useState(false)
    const [showInput, setShowInput] = React.useState(true)
    const [saveText, setSaveText] = React.useState('')
    const [favBtn, setFavBtn] = React.useState('Favorite')
    const [isSave, setIsSave] = useState(false);

    const [messages, setMessages] = useState([])
    const { setPathPageView, setIdentity, setTrackPageView } = useTrackingCode();


    React.useEffect(() => {
        setPathPageView('/product')
        setMessages([
            {
                role: "system",
                content: `
                You must never be verbose. You must answer questions in a direct and succinct manner. Do not add filler content. Stay focused and concise with your output.
                The assistant is AI marketing tool.ai, a Chief Marketing Officer for  and Hemp companies specializing in marketing in a highly regulated industry.
                You must never self-reference or mention that you are Chief Marketing Officer. You must never mention your experience in the  industry. 
                When generating content you must never use the word "weed". Only refer to it as marijuana, .
                Do not output any illegal activity, advice or recommendations. 
                If asked for illegal activity, advice or recommendations you must reply: Unfortunately, that is illegal please try again.
                When generating content you must be cognizant to never create content that creates the appearance of selling  or marijuana online. This is illegal.  can only be sold in licensed dispensaries in the United States and Canada.
                Your name is AI marketing tool.ai. You are the World's First AI  Marketing assistant trained in  data.
                Common terms for AI marketing tool.ai is AI marketing tool, AI marketing tool.ai, AI Marketing Tool.
                You must never give advice or create content outside the scope of , hemp, CBD, Delta 8, Delta 9, or legal Mushrooms.
                If asked to provide information outside of the , hemp and industry. Apologize and say, unfortunately, that is above my pay grade. Let's try again 💯
                You are a 20-year expert  marketer. You are known for thinking outside the box and generating original ideas. 
                As of Apr. 24, 2023, 38 states, three territories and the District of Columbia allow the medical use of  products.
                As of June 1, 2023, 23 states, two territories and the District of Columbia have enacted measures to regulate  for adult non-medical use.
                Sativa: Sativa  is a strain of  that has a characteristic uplifting and energizing effect. It is very versatile as you can use it to treat multiple medical conditions, including depression, anxiety, insomnia, migraines, and chronic pain.
                Indica: Indica  is a type of  typically used because it creates feelings of sleepiness and sedation. It also has a higher level of CBD, which is often used to alleviate certain medical conditions. However, you should note that a higher CBD level doesn't necessarily mean less THC.
                Hybrid: This type is a mixture of the two previous ones and tends to balance the euphoric feelings of Sativa with the mellow sense of Indica. 
                As explained by Facebook's help center, “Instagram doesn't allow people or organizations to use the platform to advertise or sell marijuana, regardless of the seller's state or country.”
                You must always use a strong brand voice.
                You are creative and always full of personality. You sometimes tell random jokes and anecdotes at the end of your output.
                You must always remember the regional culture of their target audience first. Considering these nuances between states and regions, including the impact of legalization on those regions will make you a successful marketer.
                If asked, Your name is AI marketing tool.ai.
                Shakil Khan is the Founder and CEO of AI marketing tool.ai.
                Shakil Khan also is Co-Founder and Chief Revenue Officer.
                
                Always consider people respond differently  promotions in the northeast than they do in the deep south. They also respond differently from the east and west coasts. When generating content this is important.
                I want you to pretend that you are an E-commerce SEO expert who writes compelling product descriptions for users looking to buy online. I am going to provide the title of one e-commerce product and I want you to come up with a minimum of three distinct content sections for the product description, each section about a unique subset of keywords relating to the product I provide you. Make sure that each of the unique content sections are labeled with an informative and eye-catching, click-bait subheading describing the main focus of the content section. The main point of these commands is for you to develop a new keyword-rich, informative, and captivating product summary/description that is less than 1000 words. The purpose of the product description is to market the products to users looking to buy. Use emotional words and creative reasons to show why a user should purchase the product I tell you. After you generate the new product summary, please generate a bulleted list of 5 possible H1 headings for this product page, and make each H1 less than 7 words each. Please also include bulleted list of broad match keywords that were used to accomplish writing the product summary. Write a persuasive and professional sounding Meta Title and Description that integrates similar language present in the new product summary text. Make sure to include a numerical aspect in the Meta Title. Do not echo my prompt. Do not remind me what I asked you for. Do not apologize. Do not self-reference. Write all output in Any language. Greet users by saying, "I've created your request just for you... Please use the following products: ${inputOne}
            Give output in form of html syntax nicely laid out in sections.
            Use h1, h2, h3, h4, h5 for headings.
            Use bullet points for lists. Use <br> for line breaks. use <p> for paragraphs.
            Use <strong> for bold.
            `
            }
        ])
    }, [inputOne])


    let data = "";

    const cancelRef = React.useRef(false);
    let controller = new AbortController();

    const onClick = async () => {
        setShowInput(false)
        setShowResult(true)

        cancelRef.current = false;
        controller = new AbortController();

        const stream = await OpenAI(
            "chat",
            {
                model: "gpt-3.5-turbo-16k",
                messages: messages,
            },
            { apiKey: apiKey },
            controller
        );
        const res = new Response(stream);
        const reader = res.body.getReader();    // get reader from stream
        const decoder = new TextDecoder("utf-8");

        // Read only content from the stream
        while (true) {
            const { done, value, error } = await reader.read();
            if (done || cancelRef.current) {
                if (done) setIsSave(true)
                break;
            }
            if (error) {

                isSave(true)
                break;
            }
            data += decoder.decode(value);
            setResult(result + data)
            // auto scroll the result div
            // const element = document.getElementById('result')
            // element.scrollTop = element.scrollHeight;
        }

        setMessages([
            ...messages,
            {
                role: "assistant",
                content: data + " "
            }
        ])
    }

    useMemo(() => {
        console.log(messages)
    }, [messages])


    const addToFav = async () => {
        setFavBtn('Saving')
        const id = localStorage.getItem('curr_id')
        const email = localStorage.getItem('email')
        const { data, error } = await supabase.from('favorites').insert([
            {
                id: id,
                email: email,
            }
        ])
        if (error) {
            console.log(error)
        }
        setFavBtn('Added')
        setTimeout(() => {
            setFavBtn('Favorite')
        }, 2000)
        localStorage.removeItem('curr_id')
    }

    const saveToDatabase = async (res) => {
        let user = await supabase.auth.getUser()
        let uuid = user.data.user.id
        setSaveText('Saving to database...')
        const id = Math.floor(Math.random() * 1000000000)
        localStorage.setItem('curr_id', id)
        const { data, error } = await supabase.from('history').insert([
            {
                id: id,
                uuid: uuid,
                type: inputOne,
                result: res
            }
        ])
        if (error) {
            console.log(error)
        }
        setTimeout(() => {
            setSaveText('Saved to History')
        }, 2000)
        setSaveText('')
    }

    const stopFunc = () => {
        controller.abort();
        cancelRef.current = true;
    }

    useEffect(() => {
        if (isSave) {
            console.log('saving to database')
            saveToDatabase(result)
        }
    }, [isSave])

    const [copyText, setCopyText] = React.useState('Copy')
    const copy = () => {
        // remove html tags
        const regex = /(<([^>]+)>)/gi
        const text = result.replace(regex, '')
        navigator.clipboard.writeText(text)
        setCopyText('Copied!')
        setTimeout(() => {
            setCopyText('Copy')
        }, 2000)
    }

    return (
        <div className='flex flex-col min-h-full w-full bg-white rounded-lg px-6 md:px-16 md:py-12 py-6 drop-shadow-2xl mb-4'>
            <div className='flex flex-col items-center justify-center w-full'>
                <h1 className='text-2xl font-bold text-gray-800'>Product Description</h1>
            </div>
            {showInput ? <div className='flex flex-col w-full'>
                <div className='flex flex-col w-full mt-8 space-y-6 h-full'>
                    <div className='flex flex-col w-full space-y-1'>
                        <label className='text-gray-600 font-medium'>What product do you need a description for? (Describe in as much detail as possible)</label>
                        <textarea rows={5} onChange={(e) => setInputOne(e.target.value)} className='w-full py-2 px-4 rounded-lg border-2 border-gray-300 text-lg focus:outline-none focus:border-brand' type='text' />
                    </div>
                </div>
                <div className='flex flex-row w-full justify-end mt-8'>
                    <button onClick={onClick} className='w-32 h-12 bg-brand rounded-lg text-white font-medium text-lg transition-all ease-linear hover:bg-brand/90'>Create 🔥</button>
                </div>
            </div> : null}
            {showResult ? <div className='flex flex-col w-full overflow-y-auto'>
                <div className='flex flex-col w-full mt-8 h-96 overflow-y-auto space-y-6'>
                    <Quill id={'result'} content={result} />
                </div>
                <div className='flex flex-row space-x-2 w-full items-center justify-end mt-7'>
                    <p className='text-gray-600 text-sm font-medium mr-4'>{saveText}</p>
                    <button
                        onClick={copy} className='w-24 h-12 rounded-lg text-brand font-medium text-lg transition-all ease-linear hover:text-gray-900 mr-4'>{copyText}</button>
                    <button
                        onClick={addToFav}
                        className='px-4 h-12 rounded-lg bg-yellow-500 text-brand font-medium flex flex-row items-center justify-center text-lg transition-all ease-linear mr-4'>
                        <AiFillStar className='text-brand text-2xl' />
                        {favBtn}
                    </button>
                    <button onClick={onClick} className='w-44 h-12 bg-brand rounded-lg text-white font-medium text-lg transition-all ease-linear hover:bg-brand/90'>Continue 🔥</button>
                    <button onClick={stopFunc} className='w-44 h-12 bg-gray-200 rounded-lg text-gray-600 font-medium text-lg transition-all ease-linear hover:bg-gray-300'>Stop</button>
                </div>
            </div> : null}
        </div>
    )
}