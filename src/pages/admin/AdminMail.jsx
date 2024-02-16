import { useState } from 'react';

function AdminMail(){
    window.jQuery = require('jquery');
    const RichTextEditor = require('../../component/common/SummerNote').default;
    const [content, setContent] = useState('');
    const handleContent = (e) => {  //섬머노트에 쓴거
        setContent(e);
    }

    const [message, setMessage] = useState('');
    return(
        <>  
            <div>
                <div>{message}</div>
                <RichTextEditor content={content} onContentChange={(e)=>{handleContent(e)}} />
            </div>
        </>
    )
}

export default AdminMail;