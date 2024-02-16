import './attendancePage/approvalPayment.css'
import { useNavigate  } from 'react-router-dom';


function MyApplyDocumentApproval () {

    const navigate = useNavigate();



    const myApplyWaitingClick = () => {
        // 기안 페이지로 이동
        navigate('/attendance/myApplyDocumentWaiting');  
    };

    const attenanceApprovalClick = () => {
        // 승인 페이지로 이동
        navigate('/attendance/myApplyDocumentApproval'); 
    };
  
    const attenanceRejectClick = () => {
        // 반려 페이지로 이동
        navigate('/attendance/myApplyDocumentRejction');  
    };

    return(
        <>
            <div className="main">

                <div className="main2">
                    <span className="main-title">내 신청 문서</span>
                    <div className="bar"></div>
                    <div className="filter-area">
                        <div className="box-area">
                            <div className="waiting-box" onClick={myApplyWaitingClick}>기안</div>
                            <div className="document-approval-box" onClick={attenanceApprovalClick}>승인</div>
                            <div className="reject-box" onClick={attenanceRejectClick}>반려</div>
                        </div>
            
                        <div className="bar2"></div>
                    </div>
                    <div className="list-commute-area">
                        <table className="list-commute-detail" style={{ borderCollapse: 'collapse', fontSize: '16px', width: '1200px' }}>
                            <tr className="list-commute-detail" style={{ backgroundColor: '#F5F5F5' }}>
                                <td className="list-commute-detail">문서번호</td>
                                <td className="list-commute-detail">신청기간</td>
                                <td className="list-commute-detail">종류</td>
                                <td className="list-commute-detail">소속</td>
                                <td className="list-commute-detail">결재일시</td>
                                <td className="list-commute-detail"></td>
                            </tr>
                            <tr className="list-commute-detail">
                                <td className="list-commute-detail">휴가-202301-00002</td>
                                <td className="list-commute-detail">2023-01-05(금)~2023-01-05(금)</td>
                                <td className="list-commute-detail">연차-오후 반차</td>
                                <td className="list-commute-detail">마케팅팀</td>
                                <td className="list-commute-detail"> 01-02 10:12 </td>
                                <td><button onclick="openPopup()">상세보기</button></td>
                                
                            </tr>
                        </table>
                    </div>

                            {/* <div class="paging-po"> << < 1  2  3  4  5 > >></div> */}
            
                </div>
            </div>

    
    
    <div id="popup">
        <div id="close-btn" onclick="closePopup()">닫기</div>
    
    </div>

        
        </>
    );
}

export default MyApplyDocumentApproval