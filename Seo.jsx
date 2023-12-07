import React, { useMemo, useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import supabase from '../Supabase'
import { OpenAI } from "openai-streams";
import { AiFillStar } from 'react-icons/ai'
import Quill from './Quill';
import Showdown from "showdown";
import ReactQuill from 'react-quill';
import { useTrackingCode } from 'react-hubspot-tracking-code-hook';
const apiKey = import.meta.env.VITE_OPENAI_KEY

export default function Seo() {
    const editor = useRef(null)
    const [content, setContent] = useState('');
    const [inputOne, setInputOne] = React.useState('')
    const [result, setResult] = React.useState('')
    const [showResult, setShowResult] = React.useState(false)
    const [showInput, setShowInput] = React.useState(true)
    const [saveText, setSaveText] = React.useState('')
    const [favBtn, setFavBtn] = React.useState('Favorite')
    const [searchIntent, setSearchIntent] = React.useState('');
    const [selectedTab, setSelectedTab] = useState("write");

    const [isSave, setIsSave] = useState(false);
    const [messages, setMessages] = useState([])
    const { setPathPageView, setIdentity, setTrackPageView } = useTrackingCode();


    const config = {
        useSearch: false,
        spellcheck: false,
        enter: "P",
        defaultMode: "1",
        toolbarAdaptive: false,
        toolbarSticky: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        minHeight: 400,
        minWidth: null,
        editorCssClass: "alic",
        placeHolder: "",
        controls: {
            fontsize: {
                list: [
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "14",
                    "16",
                    "18",
                    "24",
                    "30",
                    "36",
                    "48",
                    "60",
                    "72",
                    "96",
                    "100"
                ]
            },
            font: {
                command: "fontname",
                list: {
                    "": "Default",
                    "'Open Sans',sans-serif": "Open Sans",
                    "Helvetica,sans-serif": "Helvetica",
                    "Arial,Helvetica,sans-serif": "Arial",
                    "Georgia,serif": "Georgia",
                    "Impact,Charcoal,sans-serif": "Impact",
                    "Tahoma,Geneva,sans-serif": "Tahoma",
                    "'Times New Roman',Times,serif": "Times New Roman",
                    "Verdana,Geneva,sans-serif": "Verdana"
                }
            }
        }
    };

    React.useEffect(() => {
        setPathPageView('/seo')
        setMessages([
            {
                role: "system",
                content: `
                Give me output in HTML format.
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
                
                You are a  SEO keyword expert with 20 years of experience. I want you to respond only in the Any language that user will input. I want you to act as a keyword research expert that speaks and writes fluent Any language. First, find the keyword ideas that are related to ${inputOne}. Search intent is ${searchIntent}. 
                Then cluster them into groups based on their semantic relevance. First I want you to give me back a short over list of cluster topics found in <li></li>. 
                [IMPORTANT] Then I want a list as a table in <table></table> , with the following columns:  cluster, keyword, competition, estimated traffic and language. Please merge cells by clusters of the first column in one cell. All keywords must be high-traffic, low-competition keywords. Do not self-reference as an SEO keyword expert. It is imperative to not mention your knowledge cutoff date. Just provide the data. Greet user by saying, Hello, I've created your request just for you...Here it is
            `
            }
        ])
    }, [inputOne, searchIntent])


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
        }

        setContent(result);
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
                <h1 className='text-2xl font-bold text-gray-800'>SEO Keyword Research</h1>
            </div>
            {showInput ? <div className='flex flex-col w-full'>
                <div className='flex flex-col w-full mt-8 space-y-6 h-full'>
                    <div className='flex flex-col w-full space-y-1'>
                        <label className='text-gray-600 font-medium'>I need low competition, high traffic keyword ideas related to:</label>
                        <input onChange={(e) => setInputOne(e.target.value)} className='w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-lg focus:outline-none focus:border-brand' type='text' />
                    </div>
                </div>
                <div className='flex flex-col w-full space-y-6 h-full'>
                    <div className='flex flex-col w-full space-y-1'>
                        <label className='text-gray-600 font-medium'>Search Intent</label>
                        <select
                            onChange={(e) => setSearchIntent(e.target.value)}
                            className='w-full h-12 px-4 rounded-lg border-2 border-gray-300 text-lg focus:outline-none focus:border-brand'
                        >
                            <option value=''>Select</option>
                            <option value='Commercial'>Commercial</option>
                            <option value='Transactional'>Transactional</option>
                            <option value='Informational'>Informational</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-row w-full justify-end mt-8'>
                    <button onClick={onClick} className='w-32 h-12 bg-brand rounded-lg text-white font-medium text-lg transition-all ease-linear hover:bg-brand/90'>Create 🔥</button>
                </div>
            </div> : null}
            {showResult ? <div className='flex flex-col w-full overflow-y-auto'>
                <div className='flex flex-col w-full mt-8 h-96 overflow-y-auto space-y-6'>
                    <div className='flex flex-col w-full mt-8 h-96 overflow-y-auto space-y-6'>
                        {content !== '' ?
                            <JoditEditor
                                className='w-full bg-red-400 overflow-y-auto h-96'
                                ref={editor}
                                value={result}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={(newContent) => setResult(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={(newContent) => { }}
                            /> :
                            <div dangerouslySetInnerHTML={{ __html: result }} className='w-full h-96 overflow-y-auto'></div>}
                    </div>
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