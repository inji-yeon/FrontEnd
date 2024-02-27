import { useDispatch, useSelector } from 'react-redux';
import styles from './Comment.module.css';
import { callModifyCommentAPI, callRegistCommentAPI, callRemoveCommentAPI } from '../../../apis/BoardAPICalls';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { decodeJwt } from '../../../utils/tokenUtils';
import { useAlert } from '../../../component/common/AlertContext';

const Comment = ({comments, postCode, empCode}) => {

    const dispatch = useDispatch();

    const {showAlert} = useAlert();

    const comment = useSelector(state => state.postCommentReducer?.postComment);
    
    const [isEdit, setIsEdit] = useState(false);

    const [content, setContent] = useState('');
    const [editContent, setEditContent] = useState(comment);
    const [editCode, setEditCode] = useState(null);

    console.log(comment, "== comment");

    const contentInput = useRef();
    

    const token = decodeJwt(window.localStorage.getItem('accessToken'));

    const toggleIsEdit = () => setIsEdit(!isEdit);
 
    const notEditHandler = () => {
        setIsEdit(false);
        // setEditContent(content);
    }




    /* 댓글 등록 */
    const commentRegistHandler = () => {

        dispatch(callRegistCommentAPI({
            postCode,
            postCommentContext: content

        }));


        setContent('');
        window.location.reload();

        showAlert('댓글을 등록하였습니다.');
    }

    console.log('comment  ', comment);
    console.log('token ==', token);
    console.log('empCode', empCode);



    /* 댓글 수정완료 */
    const commentModifyHandler = (commentCode) => {


        if (window.confirm(`댓글를 수정하시겠습니까?`)) {
            dispatch(callModifyCommentAPI({
                commentCode,
                postCommentContext: editContent,
            }));
            toggleIsEdit();
            window.location.reload();
        }

        setEditCode(null);
        setEditContent('');

    }


    /* 댓글 삭제 */
    const commentRemoveHandler = (commentCode) => {

        console.log('commentCode :',commentCode);
        dispatch(callRemoveCommentAPI({
            commentCode,
        }));

        alert('댓글을 삭제하였습니다.');
        window.location.reload();
    }


    // 댓글 조회 프롭스, 리듀서 호출 
    
    console.log('수정 상태 : ',isEdit);

    console.log('editconent : ', editContent);


    return <>
    
        <div style={{ display: "flex", marginTop: 70, marginBottom: 70 }}>
            <textarea className={styles.inputComment} placeholder='댓글' ref={contentInput} value={content} onChange={(e) => setContent(e.target.value)}/>
            <button className={styles.addCommentBtn} onClick={commentRegistHandler}>등록</button>
        </div>


        {/* 댓글 */}

        {comments?.map((comment, idx) => (

            <div className={styles.comment} key={comment.commentCode}>
            
              <div className={styles.commentInfo}>
                  <div style={{ display: "flex", fontSize: 16 }}>
                      <svg
                      style={{ marginTop: "-5px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width={35}
                      height={35}
                      viewBox="0 0 35 35"
                      fill="none"
                      >
                      <circle cx="17.5" cy="17.5" r="17.5" fill="#D9D9D9" />
                      </svg>
                      <div className={styles.writer}>{comment.boardMember.employee.employeeName}</div>
                      <div style={{ color: "#A3A2A2", fontSize: 14 }}>&nbsp; · {`${comment.postCommentDate[0]}.${comment.postCommentDate[1]}.${comment.postCommentDate[2]} ${comment.postCommentDate[3]}:${comment.postCommentDate[4]}`}</div>
                  </div>
  
                
                {/* 수정/삭제 버튼 */}
                {comment?.boardMember?.employee.employeeCode === empCode && (
                    <div>
                         {isEdit ? (
                        <div style={{ display: "flex" }}>
                            <div style={{ cursor: 'pointer' }} onClick={() => commentModifyHandler(comment.postCommentCode)}>수정 완료</div>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <div style={{ cursor: 'pointer' }} onClick={notEditHandler}>취소</div>
                        </div>

                    ) : (
                        <div style={{ display: "flex" }}>
                        <div style={{ cursor: 'pointer' }} onClick={() => {
                            setEditCode(comment.postCommentCode);
                            setEditContent(comment.postCommentContext);
                            toggleIsEdit(!isEdit);
                        }}>수정</div>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <div style={{ cursor: 'pointer' }} onClick={() => commentRemoveHandler(comment.postCommentCode)}>삭제</div>
                    </div>
                    )}

                    </div>
                )}

                
              </div>
  
            {isEdit && (editCode === comment.postCommentCode)? (
                <textarea
                ref={contentInput}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                />  
            ) : (
                <div style={{ paddingLeft: 50 }}>
                  {comment.postCommentContext}
                </div>
            )}
            

            </div>
        ))}
      
    
    </>

}

export default Comment;