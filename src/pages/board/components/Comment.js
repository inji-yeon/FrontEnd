import styles from './Comment.module.css';

const Comment = ({comments}) => {


    return <>
    
        <div style={{ display: "flex", marginTop: 70, marginBottom: 70 }}>
            <textarea className={styles.inputComment} placeholder='댓글' />
            <button className={styles.addCommentBtn}>등록</button>
        </div>


        {/* 댓글 */}

        {comments?.map((comment, idx) => (
              <div className={styles.comment}>
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
  
                  <div style={{ display: "flex" }}>
                      <div onClick="">수정</div>
                      &nbsp;&nbsp;|&nbsp;&nbsp;
                      <div onClick="">삭제</div>
                  </div>
              </div>
  
              <div style={{ paddingLeft: 50 }}>
                  {comment.postCommentContext}
              </div>
              </div>


        ))}
      
    
    </>

}

export default Comment;