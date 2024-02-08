import style from './attendancePage/ApprovalPayment.module.css'
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callDoPaymentAPI } from '../../apis/AttendanceAPI';
import { useEffect, useState } from 'react';


function DoPaymentDocumentApproval () {

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


    const dispatch = useDispatch();
    const doPayment = useSelector((state => state.attendance));


    const pageInfo = doPayment?.pageInfo;

    console.log('pageInfo', pageInfo);


    const doPaymentLists = doPayment?.data?.content; 

    console.log('doPaymentLists888888', doPaymentLists);

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
        setStart((currentPage - 1) * 5);
        
        dispatch(
            callDoPaymentAPI({
                currentPage: currentPage,
            })
        );
    }, [currentPage]);



    return (
        <>

    <div className={style.main}>
        <div className={style.main2}>
            <span className={style.main_title}>내 결재 문서</span>
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

            <div className="paging-po" style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center' }}> 
                {Array.isArray(doPaymentLists) && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={style.pagingBtn}> &lt;
                    </button>
                )}
                {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}  style={{ margin: '0 9px' }} >
                        <button
                            style={currentPage === num ? { backgroundColor: '#FA9A85' } : null}
                            className={style.pagingBtn}>{num}
                        </button>
                    </li>
                ))}
                {Array.isArray(doPaymentLists) && (
                    <button
                        className={style.pagingBtn}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}>&gt;
                    </button>
                )}
            </div>
        </div>
    </div>
        
        </>
    );
}

export default DoPaymentDocumentApproval