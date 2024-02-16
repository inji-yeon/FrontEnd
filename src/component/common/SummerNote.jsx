import React, { useState } from 'react';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles

// Import bootstrap(v3 or v4) dependencies
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';

function RichTextEditor({ content, onContentChange }) {

    const onChangeHandler = (e) => {
        onContentChange(e);
    };
    return (
        <ReactSummernote
            options={{
                disableDragAndDrop: true,
                height: 600,
                width: 1000,
                toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['fontname', ['fontname']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'picture', 'video']],
                    ['view', ['fullscreen', 'codeview']],
                ],
            }}
            onChange={onChangeHandler}
        />
    );
}

export default RichTextEditor;