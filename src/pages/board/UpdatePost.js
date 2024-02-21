import { useEffect, useState } from 'react';
import styles from './CreatePost.module.css';
import { callGetPostInfoAPI, callModifyPostAPI, callRegistPostAPI } from '../../apis/BoardAPICalls';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

const UpdatePost = () => {

    const navigate = useNavigate();
    const {postCode} = useParams();
    const dispatch = useDispatch();
    
    const post = useSelector(state => state?.board)
    const [editpost, setEditPost] = useState(false);

    const [updateform, setUpdateForm] = useState({
        boardCode: '',
        // boardCode: 0,
        postTitle: '',
        postContext: '',
        deptAlert: false,
        employeeAlert: false,
        addNoticeStatus: 'N',
        // addNoticeDate: new Date(),

    })

    useEffect(() => {

        dispatch(callGetPostInfoAPI({
            postCode
        }))

    }, [])


    useEffect(() => {
        setUpdateForm({
            // boardGroupCode: post.boardGroupCode,
            boardCode: post?.post.boardCode,
            postTitle: post?.post.postTitle,
            postContext: post?.post.postContext,
            deptAlert: post?.post.deptAlert,
            employeeAlert: post?.post.employeeAlert,
            addNoticeStatus: post?.post.addNoticeStatus,
            addNoticeDate: post?.post.addNoticeDate,
        })
        
    }, [post])

    console.log('post : ',post);
    console.log('updateform : ', updateform);

    const onChangeHandler = (e) => {
        
        const { name, value, type, checked } = e.target;
        setUpdateForm(prevForm => ({
            ...prevForm,
            [name]: type === 'checkbox' ? ( checked ? 'Y' : 'N' ) : value
        }));

    }

    const updatePostHandler = () => {

        console.log('form : ', updateform);

        const formData = new FormData();

        // formData.append("boardGroupCode", updateform.boardGroupCode);
        formData.append("boardCode", updateform.boardCode);
        formData.append("postTitle", updateform.postTitle);
        formData.append("postContext", updateform.postContext);
        formData.append("deptAlert", updateform.deptAlert);
        formData.append("employeeAlert", updateform.employeeAlert);
        formData.append("postNoticeStatus", updateform.addNoticeStatus);    
        formData.append("addNoticeDate", updateform.addNoticeDate);
        dispatch(callModifyPostAPI({
            postCode,
            form: formData
        }));

        alert('게시글이 수정되었습니다.');
        navigate(`/board/${post?.post.boardCode}`);
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
                    <select name="boardGroupCode" onChange={onChangeHandler}>
                        <option value={1}>사내게시판</option>
                        <option value={2}>부서게시판</option>
                        <option value={3}>익명게시판</option>
                    </select>

                    <select name="boardCode" onChange={onChangeHandler}>
                        <option value={1}>하위게시판</option>
                        <option value={2}>과 관련된</option>
                        <option value={3}>게시판들</option>
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
                    <div className="input_area" style={{backgroundColor: '#F5F5F5'}}>
                        <input type="file" name="postFile" title="파일 선택" multiple="" accept="" 
                        style={{width: '100%', minHeight: '200px'}} 
                        onChange={onChangeHandler}/>	
                    </div>

                    <div className="fileTxt">이 곳에 파일을 드래그 하세요. 또는
                        <span className="txt">파일선택</span><br />
                        <span id="total_size" className="size">( 0MB )</span>
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
                    <span><input type="checkbox" id="addNotice" name="addNoticeStatus"
                    checked={updateform.addNoticeStatus === 'Y'}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       a
                    onChange={onChangeHandler}
                            
                    
                    /></span>
                    
                    {updateform.addNoticeStatus && (
                        <div id="dateNotice">
                            <input type="date" name="addNoticeDate" onChange={onChangeHandler}/>
                        </div>
                    )}
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