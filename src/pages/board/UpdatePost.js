import { useEffect, useRef, useState } from 'react';
import styles from './CreatePost.module.css';
import { callGetPostInfoAPI, callModifyPostAPI, callRegistPostAPI, modifyPostAPI } from '../../apis/BoardAPICalls';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import fontSize from "tui-editor-plugin-font-size";
import "tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css";

const UpdatePost = () => {

    const navigate = useNavigate();
    const {postCode} = useParams();
    const dispatch = useDispatch();
    
    const post = useSelector(state => state?.board);
    const boardList = useSelector(state => state.boardReducer?.boardList); // 게시판 카테고리
    
    const [editorText, setEditorText] = useState(post?.post.postContext)
    const editorRef = useRef();

    const [files, setFiles] = useState([]);
    const [updateform, setUpdateForm] = useState({})

    useEffect(() => {

        dispatch(callGetPostInfoAPI({
            postCode
        }))

        console.log("== editorText ==", editorText);

    }, [])

    console.log("update post :", post);


    useEffect(() => {
        setUpdateForm({
            boardGroupCode: post?.post.boardGroupCode,
            boardCode: post?.post.boardCode,
            postTitle: post?.post.postTitle,
            // postContext: post?.post.postContext,
            deptAlert: post?.post.deptAlert,
            employeeAlert: post?.post.employeeAlert,
            postNoticeStatus: post?.post.postNoticeStatus,
        })

        editorRef.current?.getInstance().setHTML(editorText);
        // setEditorText(post?.post.postContext);
        
    }, [post])

    console.log('post : ',post);

    const onChangeFileHandler = (e) => {

        const targetFiles = e.target.files;
        console.log("e.target.files: ", e.target.files);
        setFiles(Array.from(targetFiles).map((file, idx) => file));
        // files name

    }
    console.log('files : ', files);


    const onChangeHandler = (e) => {
        
        const { name, value, type, checked } = e.target;
        setUpdateForm(prevForm => ({
            ...prevForm,
            [name]: type === 'checkbox' ? ( checked ? "Y" : "N" ) : value
        }));

        console.log('updateForm : ', updateform);

    }


    const onChangeEditorHandler = (e) => {

        setEditorText(editorRef.current?.getInstance().getHTML());

    }


    const updatePostHandler = async() => {

        console.log('click form : ', updateform);

        const formData = new FormData();

        formData.append("boardGroupCode", updateform.boardGroupCode);
        formData.append("boardCode", updateform.boardCode);
        formData.append("postTitle", updateform.postTitle);
        // formData.append("postContext", updateform.postContext);
        formData.append("deptAlert", updateform.deptAlert);
        formData.append("employeeAlert", updateform.employeeAlert);
        formData.append("postNoticeStatus", updateform.postNoticeStatus);    
        // formData.append("addNoticeDate", updateform.addNoticeDate);

        if(editorRef){

            formData.append("postContext", editorText);
        }


        if(files){
            files.forEach((file) => {
                formData.append("multipartFile", file)
            });
        }
        

        await dispatch(modifyPostAPI({
            postCode,
            form: formData
        }));

        console.log('formData : ');
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        alert('게시글이 수정되었습니다.');
        navigate(`/board/${post?.post.boardCode}/posts`);
        // window.location.reload(); 

    }
    

    return <>

        <div className={styles.CreatePost}>
    <h2>글쓰기</h2>

    <br />

    <table style={{textAlign: 'left', width:"100%"}}>

        <tbody>
            <tr>
                <th>게시판 분류</th>
                <td style={{paddingRight: '-30px'}}>

                    <select name="boardCode" onChange={onChangeHandler} value={updateform.boardCode}>
                        {
                            boardList?.boardList1?.map((option) => (
                                <option key={option.boardCode} value={option.boardCode}>{option.boardTitle}</option>
                            ))
                        }
                        
                            {boardList?.boardList2?.map((option) => (
                                <option key={option.boardCode} value={option.boardCode}>{option.boardTitle}</option>
                            ))}
                    </select>
                </td>
            </tr>

            <tr>
                <th>제목</th>
                <td>
                    <input type="text" name="postTitle" 
                    style={{width: '100%'}}
                    value={updateform.postTitle}
                    onChange={onChangeHandler}/>
                </td>
            </tr>

            <tr>
                <th>파일 첨부</th>
                 <td>
                    <div className="inputFiles">
                        <input type="file" name="postFiles" title="파일 선택" multiple 
                        onChange={onChangeFileHandler}/>

                        <ul className="fileNames" style={{width: '100%', minHeight: '170px', backgroundColor: '#F5F5F5', listStyleType: 'none', 
                                    paddingLeft: 30, paddingRight:30, paddingTop:20, paddingBottom: 20,}}>

                            {files.length === 0 ? (
                                post?.post?.postAttachmentList && post?.post?.postAttachmentList.map((file, idx) => 
                                <li key={idx} style={{lineHeight: '30px',}}>{file.postAttachmentOgFile}</li>
                            
                            )):(

                                files.map((file, idx) => 
                                <li key={idx} style={{lineHeight: '30px',}}>{file.name}</li>
                                )

                            )}
                            

                           

                        </ul>
                    </div>

                    <div className="fileTxt">파일을 여러 개 첨부 가능합니다.
                        {/* <span id="total_size" className="size"> ( 0 MB )</span> */}
                    </div>
                </td>
            </tr>

        </tbody>

    </table>


    {/* <textarea className="summernote" name="postContext" onChange={onChangeHandler}
                value={updateform.postContext}
    ></textarea> */}

    <Editor
        ref={editorRef}
        placeholder="게시글을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="400px" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock']
        ]}
        onChange={onChangeEditorHandler}
        plugins={[fontSize]}
      ></Editor>


    <br /><br />

    <div style={{textAlign: 'right'}}>
        <button type="submit" className={styles.btn} onClick={() => navigate(-1)}>취소</button>
        <button type="submit" className={styles.btn} style={{letterSpacing: 1 +'px'}} onClick={updatePostHandler}>저장</button>
    </div>

</div>

    
</>
}

export default UpdatePost;