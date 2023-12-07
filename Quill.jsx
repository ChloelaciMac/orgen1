import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../App.css'

function Quill({content, id}) {
    var size = ReactQuill.Quill.import('attributors/style/size');
    size.whitelist = ['14px', '20px', '32px'];
    ReactQuill.Quill.register(size, true);


    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // for heading options
            [{ 'size': ['14px', '20px', '32px'] }],
            ['bold', 'italic', 'underline', 'strike'], // for bold, italic, underline, and strikethrough
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // for ordered and bullet lists
            [{ 'font': [] }], // for font changing options
            ['table'] // for tables
        ]
    }

    return (
        <ReactQuill id={id} value={content} className='editor' modules={modules} theme="snow" />
    )
}

export default Quill