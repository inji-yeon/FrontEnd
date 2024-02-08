import './attendancePage/rejectPayment.css'
import { useNavigate  } from 'react-router-dom';


function DoPaymentDocumentReject() {

    const navigate = useNavigate();

    const doApplyWaitingClick = () => {
        // 대기 페이지로 이동
        navigate('/attendance/doPaymentDocumentWaiting')
    };
    
    const doApplyApprovalClick = () => {
        // 결재 완료 페이지로 이동
        navigate('/attendance/doPaymentDocumentApproval')
    };


    const doApplyRejectClick = () => {
        // 반려한 페이지로 이동
        navigate('/attendance/doPaymentDocumentReject')
    };

    return (
        <>
    <div className="main">
        <div className="main2">
            <span className="main-title">내 결재 문서</span>
            <div className="bar"></div>
            <div className="filter-area">
                <div className="box-area">
                <div className="my-apply-waiting-box" onClick={doApplyWaitingClick}>대기</div>
                    <div className="approval-box" onClick={doApplyApprovalClick}>결재</div>
                    <div className="reject-box" onClick={doApplyRejectClick}>반려</div>
                </div>

                <div className="bar2"></div>
            </div>

            <div className="list-commute-area">
                <table style={{ borderCollapse: 'collapse', fontSize: '16px', width: '1200px' }}>
                    <tr className="list-commute-detail" style={{ backgroundColor: '#F5F5F5' }} >
                        <td className="list-commute-detail">문서번호</td>
                        <td className="list-commute-detail">신청기간</td>
                        <td className="list-commute-detail">종류</td>
                        <td className="list-commute-detail">신청자</td>
                        <td className="list-commute-detail">소속</td>
                        <td className="list-commute-detail">결재일시</td>
                    </tr>
                    <tr className="list-commute-detail">
                        <td className="list-commute-detail">휴가-202301-00002</td>
                        <td className="list-commute-detail">2023-01-05(금)~2023-01-05(금)</td>
                        <td className="list-commute-detail">연차-오후 반차</td>
                        <td className="list-commute-detail">홍길동사원</td>
                        <td className="list-commute-detail">마케팅팀</td>
                        <td className="list-commute-detail">01-02 10:12</td>
                    </tr>
                </table>
            </div>

            {/* <div class="paging-po"> << < 1  2  3  4  5 > >></div> */}

        </div>
    </div>

        
        </>
    )
}
export default DoPaymentDocumentReject