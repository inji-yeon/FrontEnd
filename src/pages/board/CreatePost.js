import { useEffect, useState, useRef } from 'react';
import styles from './CreatePost.module.css';
import { callRegistPostAPI, insertPostAPI } from '../../apis/BoardAPICalls';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

// Toast 에디터
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import fontSize from "tui-editor-plugin-font-size";
import "tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css";


const CreatePost = () => {


    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const boardList = useSelector(state => state.boardReducer?.boardList);

    const [editorText, setEditorText] = useState('')

    const editorRef = useRef();

    const [files, setFiles] = useState([]);
    const [filesSize, setFilesSize] = useState('');

    const [form, setForm] = useState({
        boardGroupCode: '1',
        boardCode: '1',
        postTitle: '',
        postContext: '',
        deptAlert: false,
        employeeAlert: false,
        postNoticeStatus: 'N',
        // addNoticeDate: new Date(),
    })

    console.log(boardList);


    useEffect(() => {
        console.log('files : ', files);

    },[files])


    console.log(files, "files")


    const onChangeFileHandler = (e) => {
        setFiles(e.target.files);


    }


    const handleFileChange = (e) => {
        setFiles(e.target.files);

        let size = 0;
        const postAttachmentList = Array.from(files).map((file, idx) => file);
        console.log("postAttachmentList ", postAttachmentList);
    }

    console.log('files : ', files);

    const onChangeEditorHandler = (e) => {

        const data = editorRef.current?.getInstance().getHTML();
        setEditorText(data);

        console.log(editorText);

    }


    const onChangeHandler = (e) => {

        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? ( checked ? "Y" : "N" ) : value
        });

    }

    console.log("create form : ", form)

    const registPostHandler = async() => {

        const postAttachmentList = Array.from(files).map((file, idx) => file);
        const formData = new FormData();
        formData.append("boardGroupCode", form.boardGroupCode);
        formData.append("boardCode", form.boardCode);
        formData.append("postTitle", form.postTitle);
        // formData.append("postContext", form.postContext);
        formData.append("deptAlert", form.deptAlert);
        formData.append("employeeAlert", form.employeeAlert);
        formData.append("postNoticeStatus", form.postNoticeStatus);
        // formData.append("addNoticeDate", form.addNoticeDate);

        if(editorRef){

            formData.append("postContext", editorText);
        }
        

        if(files){
            postAttachmentList.forEach((file) => {
                formData.append("multipartFile", file)
            });
        }
        

        console.log('formData : ');
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        await dispatch(insertPostAPI({
            formData: formData
        }));

        alert('게시글이 등록되었습니다.');
        navigate(`/board/${form.boardCode}/posts`); // form으로 boardCode를 접근하는게 맞는가?

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
                <select name="boardGroupCode" onChange={onChangeHandler}>
                        <option value={1}>사내게시판</option>
                        <option value={2}>부서게시판</option>
                        {/* <option value={3}>익명게시판</option> */}
                    </select>

                    <select name="boardCode" onChange={onChangeHandler}>
                        {form.boardGroupCode === '1' ? (
                            boardList?.boardList1?.map((option) => (
                                <option key={option.boardCode} value={option.boardCode}>{option.boardTitle}</option>
                            ))

                        ) : (
                            boardList?.boardList2?.map((option) => (
                                <option key={option.boardCode} value={option.boardCode}>{option.boardTitle}</option>
                            ))
                        )}

                    </select>
                </td>
            </tr>

            <tr>
                <th>제목</th>
                <td><input type="text" name="postTitle" style={{width: '100%'}} onChange={onChangeHandler}/></td>
            </tr>

            <tr>
                <th>파일 첨부</th>
                {/* 파일이름과 목록으로 보여져야 한다 */}
                <td>
                    <div className="inputFiles">
                        <input type="file" name="postFiles" title="파일 선택" multiple 
                        onChange={handleFileChange}/>

                        <ul className="fileNames" style={{width: '100%', minHeight: '170px', backgroundColor: '#F5F5F5', listStyleType: 'none', 
                                    paddingLeft: 30, paddingRight:30, paddingTop:20, paddingBottom: 20,}}>

                            { Array.from(files).map((file, idx) => 
                                <li key={idx} style={{lineHeight: '30px',}}>{file.name}</li>
                            )}

                        </ul>
                    </div>

                    <div className="fileTxt">파일을 첨부하세요. 여러 개 첨부 가능
                        <span id="total_size" className="size">{filesSize}</span>
                    </div>
                </td>
            </tr>

        </tbody>

    </table>


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
        plugins={[fontSize]}
        onChange={onChangeEditorHandler}
      ></Editor>


    <br /><br />


    <div style={{marginTop: 10, textAlign: 'center'}}>
        {/* <button type="submit" className={styles.btn}>임시 저장</button> */}
        <button type="submit" className={styles.btn} style={{letterSpacing: 1 +'px'}} onClick={registPostHandler}>등록</button>
    </div>

</div>

    </>
}

export default CreatePost;