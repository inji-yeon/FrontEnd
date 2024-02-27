import { useEffect, useState } from 'react';
import styles from './CreatePost.module.css';
import { callGetPostInfoAPI, callModifyPostAPI, callRegistPostAPI } from '../../apis/BoardAPICalls';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

const UpdatePost = () => {

    const navigate = useNavigate();
    const {postCode} = useParams();
    const dispatch = useDispatch();
    
    const post = useSelector(state => state?.board);
    const boardList = useSelector(state => state.boardReducer?.boardList); // 게시판 카테고리

    const [editpost, setEditPost] = useState(false);

    const [editorText, setEditorText] = useState('')
    const [editorElement, setEditorElement] = useState(null);
    // const [files, setFiles] = useState(post?.post?.postAttachmentList);
    const [files, setFiles] = useState([]);

    const [updateform, setUpdateForm] = useState({})

    useEffect(() => {

        dispatch(callGetPostInfoAPI({
            postCode
        }))

    }, [])

    console.log("update post :", post);


    useEffect(() => {
        setUpdateForm({
            boardGroupCode: post?.post.boardGroupCode,
            boardCode: post?.post.boardCode,
            postTitle: post?.post.postTitle,
            postContext: post?.post.postContext,
            deptAlert: post?.post.deptAlert,
            employeeAlert: post?.post.employeeAlert,
            postNoticeStatus: post?.post.postNoticeStatus,
            // addNoticeDate: post?.post.addNoticeDate,
        })

        
    }, [post])

    console.log('post : ',post);
    console.log('files : ', files);

    const onChangeFileHandler = (e) => {

        const targetFiles = e.target.files;
        console.log("e.target.files: ", e.target.files);
        setFiles(Array.from(targetFiles).map((file, idx) => file));
        // files name

    }


    const onChangeHandler = (e) => {
        
        console.log('체크상태 ', e.target.checked);
        const { name, value, type, checked } = e.target;
        setUpdateForm(prevForm => ({
            ...prevForm,
            [name]: type === 'checkbox' ? ( checked ? "Y" : "N" ) : value
        }));

        console.log('updateForm : ', updateform);

    }

    const updatePostHandler = async() => {

        console.log('click form : ', updateform);

        // const postAttachmentList = Array.from(files).map((file, idx) => file);

        const formData = new FormData();

        formData.append("boardGroupCode", updateform.boardGroupCode);
        formData.append("boardCode", updateform.boardCode);
        formData.append("postTitle", updateform.postTitle);
        formData.append("postContext", updateform.postContext);
        formData.append("deptAlert", updateform.deptAlert);
        formData.append("employeeAlert", updateform.employeeAlert);
        formData.append("postNoticeStatus", updateform.postNoticeStatus);    
        // formData.append("addNoticeDate", updateform.addNoticeDate);

        if(files){
            console.log("파일이 있니?");

            files.forEach((file) => {
                formData.append("multipartFile", file)
            });
            
        }

        await dispatch(callModifyPostAPI({
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
                    <select name="boardGroupCode" onChange={onChangeHandler} value={updateform.boardGroupCode}>
                        <option value={1}>사내게시판</option>
                        <option value={2}>부서게시판</option>
                        {/* <option value={3}>익명게시판</option> */}
                    </select>

                    <select name="boardCode" onChange={onChangeHandler} value={updateform.boardCode}>
                        {updateform.boardGroupCode === '1' ? (
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

                    <div className="fileTxt">파일을 첨부하세요. 여러 개 첨부 가능
                        <span id="total_size" className="size"> ( 0 MB )</span>
                    </div>
                </td>
            </tr>

        </tbody>

    </table>


    <textarea className="summernote" name="postContext" onChange={onChangeHandler}
                value={updateform.postContext}
    ></textarea>

    <br /><br />
    <table>
        <tbody>

            <tr>
                <th>직원 알림 설정</th>
                <td>
                    
                    <input type="checkbox" id="myDept" name="deptAlert" 
                    onChange={onChangeHandler}/>
                    <label htmlFor="myDept">부서 알림</label>


                    <span><input type="checkbox" id="isEmployee" name="employeeAlert" 
                    onChange={onChangeHandler}/>
                    <label htmlFor="isEmployee">직원 추가</label></span>
                    
                    
                    {updateform.employeeAlert && (
                        <div id="employeeAlertList">
                            <div style={{backgroundColor: '#F5F5F5', padding: '6px 13px'}}>
                                <span style={{paddingRight: '15px'}}>차윤하 팀장</span>
                                <span>차윤하 팀장</span>
                            </div>
                            <div>특정 직원에게 알림을 설정할 수 있습니다.</div>
                        </div>)
                    }
                   
                </td>
            </tr>

            <tr>
                <th>공지글 설정</th>
                <td>
                    <span>  
                        <input type="checkbox" id="addNotice" name="postNoticeStatus" onChange={onChangeHandler}
                            checked={updateform.postNoticeStatus === "Y" } 
                        />
                    </span>
                    
                    {/* {updateform.addNoticeStatus && (
                        <div id="dateNotice">
                            <input type="date" name="addNoticeDate" onChange={onChangeHandler}/>
                        </div>
                    )} */}
                </td>
            
            </tr>

        </tbody>

    </table>

    <div style={{textAlign: 'right'}}>
        <button type="submit" className={styles.btn} onClick={() => navigate(-1)}>취소</button>
        <button type="submit" className={styles.btn} style={{letterSpacing: 1 +'px'}} onClick={updatePostHandler}>저장</button>
    </div>

</div>

    
</>
}

export default UpdatePost;