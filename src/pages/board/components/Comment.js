import './Comment.css';

const Comment = () => {


    return <>
    
        <div style={{ display: "flex", marginLeft: 60,
            marginRight: 60, marginTop: 70 }}>
            <textarea className="inputComment" defaultValue={"댓글"} />
            <button className="addCommentBtn">등록</button>
        </div>

          {/* 댓글 */}
        <div className="comment">

            <div className="commentInfo">
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
                    <div className="writer">작성자</div>
                    <div style={{ color: "#A3A2A2" }}>&nbsp;· 24.01.16 15:20</div>
                </div>

                <div style={{ display: "flex" }}>
                    <div>수정</div>
                    &nbsp;|&nbsp;
                    <div>삭제</div>
                </div>
            </div>

            <div style={{ paddingLeft: 50 }}>
                면담일 확인하여 참석 바랍니다 댓글 내용
            </div>
        </div>
    
    </>



}

export default Comment;