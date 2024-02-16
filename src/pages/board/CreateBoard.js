import styles from "./CreateBoard.module.css";


const CreateBoard = () => {


    return <>
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#606060",
              marginLeft: 30
            }}
          >
            게시판을 제출하시겠습니까?
          </span>
        </div>
        <div className="selectGroup">
          <div style={{ marginRight: 30 }}>
            관리자의 승인을 받아야 게시판이 생성됩니다.
          </div>
          <div style={{ color: "#FA9A85", marginTop: 30, fontWeight: 700 }}>
            제출 &gt; 관리자 승인 &gt; 게시판 생성
          </div>
        </div>
        <div className="buttonGroup">
          <button id="cancelButton">취소</button>
          <button id="confirmButton">확인</button>
        </div>
      </div>
    </div>



    <h2>게시판 추가</h2>
    <br />
    {/* <form method="post" class="CreateBoard"> */}
    <table style={{ textAlign: "left" }} className={styles.CreateBoard}>
      <tbody>
        <tr>
          <th>게시판 분류</th>
          <td style={{ paddingRight: "-30px" }}>
            <select>
              <option>사내게시판</option>
              <option>부서게시판</option>
              <option>익명게시판</option>
            </select>
            <select>
              <option>하위게시판</option>
              <option>과 관련된</option>
              <option>게시판들</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>게시판 이름</th>
          <td>
            <input type="text" textarea="제목" style={{ width: "100%" }} />
          </td>
        </tr>
        <tr>
          <th>설명</th>
          <td>
            <textarea
              placeholder="어떤 게시판인지 설명해주세요."
              defaultValue={""}
            />
          </td>
        </tr>
      </tbody>
    </table>
    {/* 공유 부서 설정 */}
    <hr />
    <br />
    <br />
    <span>
      <label style={{ marginRight: 40 }}>공유 부서 설정</label>
      <input type="checkbox" id="checkDept" />
    </span>
    <span style={{ marginLeft: 40 }}>+ 공유 부서 추가</span>
    <br />
    <br />
    <div style={{ fontSize: 14, color: "#858585" }}>
      * 설정하지 않으면 같은 부서만 게시판을 볼 수 있습니다.
      <br />* 다른 부서도 열람 및 작성을 하도록 설정할 수 있습니다.
    </div>
    <br />
    <table className={styles.addDeptList} style={{ display: "none" }}>
      <tbody>
        <tr style={{ backgroundColor: "#F5F5F5" }}>
          <th style={{ paddingRight: 200 }}>부서명</th>
          <th style={{ paddingRight: 450 }}>작성 가능</th>
        </tr>
        {/* 공유 부서 추가 */}
        <tr>
          <td>개발부서</td>
          <td>
            <input type="checkbox" id="myDept" />
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    {/* 운영자 설정 */}
    <span>
      <label style={{ marginRight: 60 }}>운영자 설정</label>
      <input type="checkbox" id="checkManager" />
    </span>
    <span style={{ marginLeft: 40 }}>+ 운영자 추가</span>
    <br />
    <br />
    <div style={{ fontSize: 14, color: "#858585" }}>
      * 운영자는 게시판 설정을 변경하거나 게시글을 관리할 수 있습니다.
      <br />* 삭제는 게시판을 만든 사람만 가능합니다.
    </div>
    <br />
    <table className={styles.addManagerList} style={{ display: "none" }}>
      <tbody>
        <tr style={{ backgroundColor: "#F5F5F5" }}>
          <td style={{ paddingRight: 30 }}>차윤하 팀장</td>
          <td style={{ paddingRight: 30 }}>차윤하 팀장</td>
          <td style={{ paddingRight: 30 }}>차윤하 팀장</td>
        </tr>
      </tbody>
    </table>
    <br />
    {/* 댓글 작성 허가 여부 */}
    {/* 공지 게시판은 무조건 댓글 허용하지 않음으로 고정하고,
    다른 게시판은 선택 가능 */}
    <span>
      <span style={{ marginRight: 75 }}>댓글 작성</span>
      <input type="radio" name="isComment" id="yesComment" />
      <label htmlFor="yesComment">허용</label>
      <input type="radio" name="isComment" id="noComment" />
      <label htmlFor="noComment">허용하지 않음</label>
    </span>
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <button className={styles.submitBtn} style={{ letterSpacing: 1 }}>
        제출
      </button>
    </div>
  </>
  


}

export default CreateBoard;