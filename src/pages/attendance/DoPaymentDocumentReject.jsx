import doRej from './attendancePage/RejectPayment.module.css'
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callDoRejectAPI } from '../../apis/AttendanceAPI';
import { useEffect, useState } from 'react';
import React from 'react';



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

    const dispatch = useDispatch();
    const doReject = useSelector((state => state.attendance))

    const pageInfo = doReject?.pageInfo;

    console.log('pageInfo', pageInfo);

    const doRejects = doReject?.data?.content; 

    console.log('doRejects =====>', doRejects);

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
            callDoRejectAPI({
                currentPage: currentPage,
            })
        );
    }, [currentPage]);


    return (
        <>
    <div className={doRej.main}>
        <div className={doRej.main2}>
            <span className={doRej.main-title}>내 결재 문서</span>
            <div className={doRej.bar}></div>
            <div className={doRej.filter-area}>
                <div className={doRej.box-area}>
                <div className={doRej.waiting-box} onClick={doApplyWaitingClick}>대기</div>
                    <div className={doRej.approval-box} onClick={doApplyApprovalClick}>결재</div>
                    <div className={doRej.my-document-reject-box} onClick={doApplyRejectClick}>반려</div>
                </div>

                <div className={doRej.bar2}></div>
            </div>

            <div className={doRej.list-commute-area}>
                <table style={{ borderCollapse: 'collapse', fontSize: '16px', width: '1200px' }}>
                    <tr className={doRej.list-commute-detail} style={{ backgroundColor: '#F5F5F5' }} >
                        <td className={doRej.list-commute-detail}>문서번호</td>
                        <td className={doRej.list-commute-detail}>신청기간</td>
                        <td className={doRej.list-commute-detail}>종류</td>
                        <td className={doRej.list-commute-detail}>신청자</td>
                        <td className={doRej.list-commute-detail}>소속</td>
                        <td className={doRej.list-commute-detail}>결재일시</td>
                    </tr>
                    <tr className={doRej.list-commute-detail}>
                        <td className={doRej.list-commute-detail}>휴가-202301-00002</td>
                        <td className={doRej.list-commute-detail}>2023-01-05(금)~2023-01-05(금)</td>
                        <td className={doRej.list-commute-detail}>연차-오후 반차</td>
                        <td className={doRej.list-commute-detail}>홍길동사원</td>
                        <td className={doRej.list-commute-detail}>마케팅팀</td>
                        <td className={doRej.list-commute-detail}>01-02 10:12</td>
                    </tr>
                </table>
            </div>

                <div className="paging-po" style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center' }}> 
                    {Array.isArray(doRejects) && (
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={doRej.pagingBtn}> &lt;
                        </button>
                    )}
                    {pageNumber.map((num) => (
                        <li key={num} onClick={() => setCurrentPage(num)}  style={{ margin: '0 9px' }} >
                            <button
                                style={currentPage === num ? { backgroundColor: '#FA9A85' } : null}
                                className={doRej.pagingBtn}>{num}
                            </button>
                        </li>
                    ))}
                    {Array.isArray(doReject) && (
                        <button
                            className={doRej.pagingBtn}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}>&gt;
                        </button>
                    )}
                </div>
        </div>
    </div>

        
        </>
    )
}
export default DoPaymentDocumentReject