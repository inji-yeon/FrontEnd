import { useDispatch, useSelector } from 'react-redux';
import styles from './Comment.module.css';
import { callModifyCommentAPI, callRegistCommentAPI, callRemoveCommentAPI } from '../../../apis/BoardAPICalls';
import { useState } from 'react';
import { useParams } from 'react-router';

const Comment = ({comments, postCode}) => {

    const dispatch = useDispatch();

    const comment = useSelector(state => state.postCommentReducer?.postComment);
    const [content, setContent] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [editContent, setEditContent] = useState(content);
    // const [editContent, setEditContent] = useState('');

    const toggleIsEdit = () => setIsEdit(!isEdit);

    const notEditHandler = () => {
        setIsEdit(false);
        setEditContent(content);
    }


    /* 댓글 등록 */
    const commentRegistHandler = () => {

        dispatch(callRegistCommentAPI({
            postCode,
            postCommentContext: content

        }));

        setContent('');
        alert('댓글을 등록하였습니다.');
        window.location.reload();
    }



    /* 댓글 수정 */
    const commentModifyHandler = (commentCode) => {

        if (window.confirm(`${commentCode}번 째 일기를 수정하시겠습니까?`)) {
            dispatch(callModifyCommentAPI({
                commentCode,
                postCommentContext: editContent,
            }));
            toggleIsEdit();
            window.location.reload();
          }

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
    console.log('comments: ', comments);
    console.log('commentReducer : ', comment);

    console.log('수정 상태 : ',isEdit);


    return <>
    
        <div style={{ display: "flex", marginTop: 70, marginBottom: 70 }}>
            <textarea className={styles.inputComment} placeholder='댓글' value={content} onChange={(e) => setContent(e.target.value)}/>
            <button className={styles.addCommentBtn} onClick={commentRegistHandler}>등록</button>
        </div>


        {/* 댓글 */}

        {comments?.map((comment, idx) => (

            <div className={styles.comment} key={comment.postCommentCode}>
            
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
                      <div style={{ color: "#A3A2A2" }}>&nbsp;· {comment.postCommentDate}</div>
                  </div>
  
                {isEdit ? (
                    <div style={{ display: "flex" }}>
                        <div style={{ cursor: 'pointer' }} onClick={() => commentModifyHandler(comment.postCommentCode)}>수정 완료</div>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <div style={{ cursor: 'pointer' }} onClick={notEditHandler}>취소</div>
                    </div>

                ) : (
                    <div style={{ display: "flex" }}>
                    <div style={{ cursor: 'pointer' }} onClick={toggleIsEdit}>수정</div>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <div style={{ cursor: 'pointer' }} onClick={() => commentRemoveHandler(comment.postCommentCode)}>삭제</div>
                </div>
                )}
                
              </div>
  
            {isEdit ? (
                <textarea
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