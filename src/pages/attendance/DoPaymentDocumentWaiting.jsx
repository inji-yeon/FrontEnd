import './attendancePage/myApplyWaiting.css'
import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';


function DoPaymentDocumentWaiting () {

    const navigate = useNavigate();

    const doApplyWaitingClick = () => {
        // 대기 페이지로 이동
        navigate('/attendance/doPaymentDocumentWaiting')
    };
    
    const doApplyApprovalClick = () => {
        // 대기 페이지로 이동
        navigate('/attendance/doPaymentDocumentApproval')
    };


    const doApplyRejectClick = () => {
        // 대기 페이지로 이동
        navigate('/attendance/doPaymentDocumentReject')
    };

    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckboxes = () => {
      setIsChecked(!isChecked); // isChecked 상태를 반전시킵니다.
      // 여기서 다른 체크박스들의 상태를 변경할 수 있습니다.
    };
  
    const openPopup = () => {
      // 팝업 열기 동작
    };


    return(

        <>

            <div className="main">
                <div className="main2">
                    <span className="main-title">내 결재 문서</span>
                    <div clclassNameass="bar"></div>
                    <div className="filter-area">
                        <div className="box-area">
                        <div className="my-apply-waiting-box" onClick={doApplyWaitingClick}>대기</div>
                        <div className="approval-box" onClick={doApplyApprovalClick}>결재</div>
                        <div className="reject-box" onClick={doApplyRejectClick}>반려</div>
                        </div>
                        <div className="bar2"></div>
                    </div>
                    <button className="approval">승인</button>
                    <div className="list-commute-area">
                        <table style={{ borderCollapse: 'collapse', fontSize: '16px', width: '1200px' }}>
                            <tr className="list-commute-detail" style={{ backgroundColor: '#F5F5F5' }} >
                                <td className="list-commute-detail">
                                    <input 
                                        type="checkbox" 
                                        id="selectAll" 
                                        checked={isChecked} 
                                        onChange={toggleCheckboxes} // onClick 대신에 onChange를 사용합니다.
                                    />
                                </td>
                                <td className="list-commute-detail">신청기간</td>
                                <td className="list-commute-detail">종류</td>
                                <td className="list-commute-detail">신청자</td>
                                <td className="list-commute-detail">소속</td>
                                <td className="list-commute-detail">관리</td>
                            </tr>
                            <tr className="list-commute-detail">
                                <td className="list-commute-detail">
                                    <input type="checkbox" />
                                </td>
                                <td className="list-commute-detail">2023-01-05(금)~2023-01-05(금)</td>
                                <td className="list-commute-detail">연차-오후 반차</td>
                                <td className="list-commute-detail">홍길동사원</td>
                                <td className="list-commute-detail">마케팅팀</td>
                                <td className="list-commute-detail">
                                    <button>승인</button>
                                    <button onClick={openPopup}>반려</button>
                                    <button onClick={openPopup}>상세보기</button>
                                </td>
                            </tr>

                            <tr className="list-commute-detail">
                                <td className="list-commute-detail">
                                    <input type="checkbox" />
                                </td>
                                <td className="list-commute-detail">2023-01-05(금)~2023-01-05(금)</td>
                                <td className="list-commute-detail">연차-오후 반차</td>
                                <td className="list-commute-detail">홍길동사원</td>
                                <td className="list-commute-detail">마케팅팀</td>
                                <td className="list-commute-detail">
                                    <button>승인</button>
                                    <button onClick={openPopup}>반려</button>
                                    <button onClick={openPopup}>상세보기</button>
                                </td>
                            </tr>
                        </table>
                    </div>

                    {/* <div class="paging-po"> << < 1  2  3  4  5 > >></div> */}

                </div>
            </div>
        
        </>
    );
}

export default DoPaymentDocumentWaiting
