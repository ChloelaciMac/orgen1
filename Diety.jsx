import React from 'react'
import { useState, useMemo, useEffect } from 'react';
import supabase from '../Supabase'
import { OpenAI } from "openai-streams";
import { AiFillStar } from 'react-icons/ai'
import Quill from './Quill';
import { useTrackingCode } from 'react-hubspot-tracking-code-hook';
const apiKey = import.meta.env.VITE_OPENAI_KEY

export default function Diety() {
    const [inputOne, setInputOne] = React.useState('')
    const [result, setResult] = React.useState('')
    const [showResult, setShowResult] = React.useState(false)
    const [showInput, setShowInput] = React.useState(true)
    const [saveText, setSaveText] = React.useState('')
    const [favBtn, setFavBtn] = React.useState('Favorite')
    const [sampleURL, setSampleURL] = React.useState('');

    const [isSave, setIsSave] = useState(false);
    const [messages, setMessages] = useState([])
    const { setPathPageView, setIdentity, setTrackPageView } = useTrackingCode();


    React.useEffect(() => {
        setPathPageView('/brand')
        setMessages([
            {
                role: "system",
                content: `
            [INSTRUCTIONS]:
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

                Greet user by saying, Hello, I've created your request just for you...Here it is
            •Read through all the bullet points and make sure you understand all the bullet points, before you start working.
            •title "Positioning for ${inputOne}.
            [SEPARATOR]
            • Act as a  subject matter expert, Long-Content Positioning Generator, high-end business writer with fluent Any language* and a  marketing business executive with 20 years of experience.
            • An effective positioning statement should articulate what differentiates a brand from its competition.
            • Create an effective positioning statement for ${inputOne}, that will get the imagination flowing.
            [SEPARATOR]
            • Bold the positioning statement and make it an h2.
            • Highlight unique qualities and how they help serve customers based on " Dispensary". List as bullet points.
            • Consider a niche marketing strategy and write it down.
            • List 3 cause-related campaign ideas relating to ${inputOne}.
            • Always List 3  quips and call the heading "Hooks".
            • 3 FAQs that need to be completed and included.
            •Thought provoking statements are encouraged.
            [SEPARATOR]
            [INSTRUCTIONS]:
            •In order to rate content, two factors must always be taken into account: perplexity and burstiness.
            • Perplexity measures the complexity of text.
            • Burstiness assesses variations between sentences.
            • Combine some longer or more complex sentences alongside shorter, quick witty ones, with lots of variation.
            • Human writing tends to have more variation in perplexity and burstiness; thus when creating content, it is important that both perplexity and burstiness are present in high amounts without losing any context or specificity.
            [SEPARATOR]
            •Respond only in Any language.
            • Title and Headings always need to be bolded.
            • Write content that will always outrank other websites.
            • Do not lecture; focus on writing quality content that the reader wants to engage with.
            • If, given a URL, write to help outrank in Google using formal 'we form'. The URL is ${sampleURL}.
            • Content will be fully markdown formatted.
            • Content will contain rich & comprehensive paragraphs with contextual details.
            • Use SEO optimized keywords in the content; content should get straight into point precisely without over explaining what or why; no filler phrases allowed either.
            • Use keyword-rich H1 titles and useful subheadings; get to the point precisely & accurately without over explaining what or why.
            • The final paragraph should be a completed thought.
            • Content must be written in the writer's own words and double checked for plagiarism.
            •Content needs to have conversational style as if it were written by a friendly Subject Matter Expert, who is a happy human.
            • Include rich and comprehensive paragraphs with lots of contextual details, but no self-references or generic filler phrases are allowed.
            • Research thoroughly
            • Craft an impactful title
            • Hook readers with the start
            • Simplify your language
            • Utilize transition words
            • Provide valuable information
            • Proofread carefully

            Taking all of that into consideration, write about ${inputOne}, in an amazing and unique way.
            Greet users by saying, "I've created your request just for you...Here it is"
            Give ouput in well-structured html format. 
            Must : Use <h1>, <h2>, <h3>, <h4>, <h5> for headings.
            Use <table> for tables. Use <tr> for rows. Use <td> for cells.
            Use bullet points for lists. Use <br> for line breaks. use <p> for paragraphs.
            Use <strong> for bold. `
            }
        ])
    }, [inputOne, sampleURL])


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

    const stopFunc = () => {
        controller.abort();
        cancelRef.current = true;
    }

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
                <h1 className='text-2xl font-bold text-gray-800'>Brand Diety</h1>
            </div>
            {showInput ? <div className='flex flex-col w-full space-y-6'>
                <div className='flex flex-col w-full mt-8 space-y-6 h-full'>
                    <div className='flex flex-col w-full space-y-1'>
                        <label className='text-gray-600 font-medium'>I need brand positioning for</label>
                        <input onChange={(e) => setInputOne(e.target.value)} className='w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-lg focus:outline-none focus:border-brand' type='text' />
                    </div>
                </div>
                <div className='flex flex-col w-full space-y-6 h-full'>
                    <div className='flex flex-col w-full space-y-1'>
                        <label className='text-gray-600 font-medium'>Add a sample URL for better context (Optional)</label>
                        <input
                            onChange={(e) => setSampleURL(e.target.value)}
                            className='w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-lg focus:outline-none focus:border-brand'
                            type='text'
                        />
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