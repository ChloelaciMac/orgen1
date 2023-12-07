import React, { useRef } from 'react';
import { useState, useMemo, useEffect } from 'react';
import supabase from '../Supabase'
import { OpenAI } from "openai-streams";
import { AiFillStar } from 'react-icons/ai'
import Quill from './Quill'; import { useTrackingCode } from 'react-hubspot-tracking-code-hook';
;
const apiKey = import.meta.env.VITE_OPENAI_KEY

export default function BlogPost() {
    const [inputOne, setInputOne] = React.useState('')
    const [inputTwo, setInputTwo] = React.useState('')
    const [inputThree, setInputThree] = React.useState('')
    const [result, setResult] = React.useState('')
    const [showResult, setShowResult] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [showInput, setShowInput] = React.useState(true)
    const [saveText, setSaveText] = React.useState('')
    const [favBtn, setFavBtn] = React.useState('Favorite')
    const [targetKeyword, setTargetKeyword] = React.useState('');
    const [includeTableOfContents, setIncludeTableOfContents] = React.useState(false);
    const { setPathPageView, setIdentity, setTrackPageView } = useTrackingCode();


    const [isSave, setIsSave] = useState(false);
    const [messages, setMessages] = useState([])

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {

        }
    };

    React.useEffect(() => {
        setPathPageView('/blog');
        setMessages([
            {
                role: "system",
                content: `
                You must never be verbose. You must answer questions in a direct and succinct manner. Do not add filler content. Stay focused and concise with your output.
                The assistant is AiMarketingTool.ai, a Chief Marketing Officer for  and Hemp companies specializing in marketing in a highly regulated industry.
                You must never self-reference or mention that you are Chief Marketing Officer. You must never mention your experience in the  industry. 
                When generating content you must never use the word "weed". Only refer to it as marijuana, .
                Do not output any illegal activity, advice or recommendations. 
                If asked for illegal activity, advice or recommendations you must reply: Unfortunately, that is illegal please try again.
                When generating content you must be cognizant to never create content that creates the appearance of selling  or marijuana online. This is illegal.  can only be sold in licensed dispensaries in the United States and Canada.
                Your name is AiMarketingTool.ai. You are the World's First AI  Marketing assistant trained in  data.
                Common terms for AiMarketingTool.ai is AiMarketingTool, AiMarketingTool.ai, AI Marketing Tool.
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
                If asked, Your name is AiMarketingTool.ai.
                Shakil Khan is the Founder and CEO of AiMarketingTool.ai.
                Shakil Khan also is Co-Founder and Chief Revenue Officer.
                

                Please act as a highly proficient, award-winning SEO  content writer with over 20 years of experience. Prompt Burstiness should be at a maximum. The articles should have the highest degree of perplexity. The paragraphs should have short and long sentences. Try to sound unique and write in a way that a human would. Content should pass AI CONTENT detection tools.  Your tone should be in the first person and should be creative. Please include 5 high-traffic, low competition keywords in the article. These keywords should be bolded. It is imperative to include related keyword-rich contextual anchor text for backlinks to high domain authority sites within the body of the article-these links should be highlighted. Please also include links to 3 royalty-free related images at the end of the article. Please include at least 15 headings and subheadings (including H1, H2, H3, and H4 headings) Write a 2000+word, 100% Unique, SEO-optimized article. End with a conclusion paragraph without using the words "In Conclusion" and 7 unique FAQs after the conclusion. It is imperative to Bold the Title and all headings of the article and use appropriate headings for H tags. Now please write an article on: ${inputOne} Tone is ${inputTwo}. Target keyword is${inputThree}. You must not self reference ever or mention your years of experience. Include Table of Contents ${includeTableOfContents}. 
            Target Keyword: ${targetKeyword}
            Hello, I've created your request just for you...Here it is
            Give output in form of html syntax nicely laid out in sections.
            Use h1, h2, h3, h4, h5 for headings.
            Use bullet points for lists. Use <br> for line breaks. use <p> for paragraphs.
            Use <strong> for bold.`
            }
        ])
    }, [inputOne, inputTwo, inputThree, targetKeyword, includeTableOfContents])


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

        }
        setTimeout(() => {
            setSaveText('Saved to History')
        }, 2000)
        setSaveText('')
    }

    useEffect(() => {
        if (isSave) {
            saveToDatabase(result)
        }
    }, [isSave])

    const stopFunc = () => {
        controller.abort();
        cancelRef.current = true;
    }

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
                <h1 className='text-2xl font-bold text-gray-800'>Create a SEO Optimized Blog</h1>
            </div>
            {showInput ? <div className='flex flex-col w-full'>
                <div className='flex flex-col w-full mt-8 space-y-6 h-full'>
                    <div className='flex flex-col w-full space-y-1'>
                        <label className='text-gray-600 font-medium'>What is the name of your article</label>
                        <input onChange={(e) => setInputOne(e.target.value)} className='w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-lg focus:outline-none focus:border-brand' type='text' />
                    </div>
                    <div className='flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-5'>
                        <div className='flex flex-col w-full space-y-1'>
                            <label className='text-gray-600 font-medium'>Tone</label>
                            <select onChange={(e) => setInputTwo(e.target.value)} className='w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-lg focus:outline-none focus:border-brand'>
                                <option value=''>Select</option>
                                <option value='Creative'>Creative</option>
                                <option value='Inspirational'>Inspirational</option>
                                <option value='Sarcastic'>Sarcastic</option>
                                <option value='Informative'>Informative</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-full space-y-1'>
                            <label className='text-gray-600 font-medium'>Article is</label>
                            <select onChange={(e) => setInputThree(e.target.value)} className='w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-lg focus:outline-none focus:border-brand'>
                                <option value=''>Select</option>
                                <option value='More than 1000 words'>Long (1000+ words & SEO Optimized)</option>
                                <option value='Less than 800 words'>Short (upto 800 words & SEO Optimized)</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col w-full space-y-6 h-full'>
                        <div className='flex flex-col w-full space-y-1'>
                            <label className='text-gray-600 font-medium'>Target Keyword (Optional)</label>
                            <input
                                onChange={(e) => setTargetKeyword(e.target.value)}
                                className='w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-lg focus:outline-none focus:border-brand'
                                type='text'
                            />
                        </div>
                        <div className='flex flex-col w-full space-y-1'>
                            <label className='text-gray-600 font-medium'>Include Table of Contents</label>
                            <select
                                onChange={(e) => setIncludeTableOfContents(e.target.value === 'Yes')}
                                className='w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-lg focus:outline-none focus:border-brand'
                            >
                                <option value='No'>No</option>
                                <option value='Yes'>Yes</option>
                            </select>
                        </div>
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
            </div> : null
            }
        </div >
    )
}