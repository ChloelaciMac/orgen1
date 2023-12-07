import React, { useEffect } from 'react'
import '../App.css'
import { checkTableForDoc } from './functions'
import axios from 'axios'
import supabase from '../Supabase'

const prodUrl = 'https://AI marketing tool-langchain-production.up.railway.app/training-status'
const devUrl = 'http://localhost:3000/training-status'

const prodUploadUrl = 'https://AI marketing tool-langchain-production.up.railway.app/upload'
const devUploadUrl = 'http://localhost:3000/upload'

function DocChat() {
    const fileInput = React.useRef(null);
    const [status, setStatus] = React.useState([]);
    const [showUpload, setShowUpload] = React.useState(true)
    const [showChat, setShowChat] = React.useState(false)
    const [input, setInput] = React.useState('')
    const [response, setResponse] = React.useState('')
    const [sendBtn, setSendBtn] = React.useState('Send')

    const [dragging, setDragging] = React.useState(false);
    const [file, setFile] = React.useState(null);
    let fileInputRef = React.useRef(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        //console.log(droppedFile);
        setFile(droppedFile);
        fileInput.current.files = e.dataTransfer.files; // Added this line
    };

    const handleFileInput = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    const handleClick = () => {
        fileInput.current.click();
    };

    const [btn, setBtn] = React.useState('Upload')
    let uuid = ''

    const onFileUpload = () => {
        status.forEach(item => {
            if (item.eventSource) {
                item.eventSource.close();
            }
        });
        setStatus([]); // Reset the status

        // Create new EventSource for each file
        Array.from(fileInput.current.files).forEach((file, index) => {
            const eventSource = new EventSource(prodUrl);
            eventSource.onmessage = function (event) {
                const data = JSON.parse(event.data);
                console.log(data);
                // Update the status immediately after it's updated by the server
                setStatus(prevState => prevState.map((item, idx) =>
                    idx === index ? { ...item, message: " " + data.message } : item
                ));
            };
            eventSource.onerror = function (event) {
                console.error("EventSource failed: ", event);
            };

            const formData = new FormData();
            formData.append('file', file);
            formData.append('uuid', uuid);

            setStatus(prevState => [...prevState, { fileName: file.name, message: "Training Started", eventSource }]);
            console.log("Uploading file: ", file.name);
            axios.post(prodUploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log("failed to upload file: ", error);
            });
        });
        setBtn('Upload')
    };

    const removeTable = async (uuid_) => {
        let { data, error } = await supabase
            .rpc('delete_all_data_from_table', {
                table_name: `${uuid_}`
            })
        if (error) console.error(error)
        else console.log(data)
    }

    const getUUID = async () => {
        setBtn('Uploading')
        checkTableForDoc().then(res => {
            uuid = res
            removeTable(uuid)
            onFileUpload()
        })
    }

    const showOutput = () => {
        setShowUpload(false)
        setShowChat(true)
    }

    const startChat = () => {
        setSendBtn('Generating')
        checkTableForDoc().then((res) => {
            uuid = res
            getResponse()
        })
    }

    const getResponse = () => {
        axios.post('https://AI marketing tool-langchain-production.up.railway.app/fetch_result', {
            uuid: uuid,
            query: input
        }).then(res => {
            setResponse(res.data.output.text)
            console.log(res.data.output.text)
            setSendBtn('Send')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='flex flex-col min-h-full w-full bg-white rounded-lg px-6 md:px-16 md:py-12 py-6 drop-shadow-2xl mb-4'>
            {
                showUpload &&
                <div className='flex flex-col space-y-3 w-full relative'>
                    {
                        <>
                            {/* <input
                                ref={fileInputRef}
                                accept='.pdf'
                                type='file'
                                multiple={true}
                                className='file' /> */}
                            <div
                                className={`border-2 p-12 rounded-lg ${dragging ? 'border-blue-500' : 'border-gray-300'}`}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={handleClick}
                            >
                                <input
                                    type="file"
                                    ref={fileInput}
                                    className="hidden"
                                    onChange={handleFileInput}
                                />
                                {file ? (
                                    <div>
                                        <p className="mb-2">File: {file.name}</p>
                                        <p>Size: {file.size} bytes</p>
                                    </div>
                                ) : (
                                    <p className="text-center">Drag and drop a file here or click to select a file</p>
                                )}
                            </div>
                            <button
                                onClick={getUUID}
                                className='bg-brand text-white rounded-lg p-3 mb-4'>
                                {btn}
                            </button>
                        </>
                    }
                    <button
                        onClick={showOutput}
                        className='border-brand border text-brand rounded-lg p-3 mb-4'>
                        Start Chat
                    </button>
                    <div className='flex flex-col items-start space-y-3'>
                        {status.map((item, index) => (
                            <div key={index} className='flex flex-row items-center space-x-2'>
                                <div className='w-3 h-3 rounded-full bg-brand'></div>
                                <p className='text-sm'>{item.fileName}</p>
                                <p className='text-sm text-brand bg-green-200 px-2 rounded-full border border-green-700'>{item.message}</p>
                            </div>
                        ))
                        }
                    </div>
                </div>
            }
            {
                showChat &&
                <div className='flex flex-col space-y-3 w-full'>
                    <h1 className='text-2xl font-bold'>Chat</h1>
                    <label className='text-lg'>Enter your query:</label>
                    <textarea
                        onChange={(e) => setInput(e.target.value)}
                        rows={3} type='text' className='border-brand border rounded-lg p-3 mb-4' />
                    <button
                        onClick={startChat}
                        className='bg-brand text-white rounded-lg p-3 mb-4'>
                        {sendBtn}
                    </button>
                    {response &&
                        <p className='border-brand whitespace-pre-line border rounded-lg p-3 mb-4'>
                            {response}
                        </p>}
                </div>
            }
        </div>
    )
}

export default DocChat