import doPay from './attendancePage/ApprovalPayment.module.css'
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callDoPaymentAPI } from '../../apis/AttendanceAPI';
import { useEffect, useState } from 'react';
import React from 'react';


function DoPaymentDocumentApproval () {

    const navigate = useNavigate();

    const doApplyWaitingClick = () => {
        // 대기 페이지로 이동
        navigate('/attendance/doPaymentDocumentWaiting')
    };
    
    const doApplyApprovalClick = () => {
        // 승인된 페이지로 이동
        navigate('/attendance/doPaymentDocumentApproval')
    };


    const doApplyRejectClick = () => {
        // 반려된 페이지로 이동
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


    function formatDateTime(dateTimeArray) {
        if (!dateTimeArray || !Array.isArray(dateTimeArray)) return ""; // 배열이 아니거나 값이 없으면 빈 문자열 반환
    
        // 배열의 길이가 충분하지 않으면 나머지 시간 정보를 0으로 설정하여 Date 객체 생성
        const year = dateTimeArray[0] || 0;
        const month = (dateTimeArray[1] || 0) - 1;
        const day = dateTimeArray[2] || 0;
    
        // Date 객체 생성
        const dateTime = new Date(year, month, day);
    
        // 년, 월, 일 추출
        const formattedYear = dateTime.getFullYear();
        const formattedMonth = (dateTime.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 해주고, 2자리로 만들기 위해 padStart 사용
        const formattedDay = dateTime.getDate().toString().padStart(2, '0');
    
        // "yyyy-MM-dd" 형식의 문자열로 반환
        return `${formattedYear}-${formattedMonth}-${formattedDay}`;
    }


    const handleDetailView = () => {
        const currentPath = window.location.pathname;
        localStorage.setItem('previousPageUrl', currentPath);
    };


    return (
        <>

    <div className={doPay.main}>
        <div className={doPay.main2}>
            <span className={doPay.main_title}>내 결재 문서</span>
            <div className={doPay.bar}></div>
            <div className={doPay.filter_area}>
                <div className={doPay.box_area}>
                    <div className={doPay.waiting_box} onClick={doApplyWaitingClick}>대기</div>
                    <div className={doPay.document_approval_box} onClick={doApplyApprovalClick}>결재</div>
                    <div className={doPay.reject_box} onClick={doApplyRejectClick}>반려</div>
                </div>

                <div className={doPay.bar2}></div>
            </div>
            <div className={doPay.list_commute_area}>
                <table style={{ borderCollapse: 'collapse', fontSize: '16px', width: '1200px' }}>
                    <thead>
                        <tr className={doPay.list_commute_detail} style={{ backgroundColor: '#F5F5F5' }} >
                            <td className={doPay.list_commute_detail}>문서번호</td>
                            <td className={doPay.list_commute_detail}>기안일자</td>
                            <td className={doPay.list_commute_detail}>종류</td>
                            <td className={doPay.list_commute_detail}>기안자</td>
                            <td className={doPay.list_commute_detail}>소속</td>
                            <td className={doPay.list_commute_detail}>결재일시</td>
                            <td className={doPay.list_commute_detail}></td>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.isArray(doPaymentLists) && doPaymentLists.length > 0?
                            doPaymentLists.map((AttPayment) => (
                                <tr className={doPay.list_commute_detail} key={AttPayment.approvalLineCode}>
                                    <td className={doPay.list_commute_detail}>{AttPayment.approvalLineDocumentCode?.approvalDocumentCode}</td>
                                    <td className={doPay.list_commute_detail}>{formatDateTime(AttPayment.approvalLineDocumentCode?.approvalRequestDate)}</td>
                                    <td className={doPay.list_commute_detail}>{AttPayment.approvalLineDocumentCode?.approvalForm}</td>
                                    <td className={doPay.list_commute_detail}>{AttPayment.approvalLineDocumentCode?.documentEmployeeCode?.employeeName}</td>
                                    <td className={doPay.list_commute_detail}>{AttPayment.approvalLineDocumentCode?.documentEmployeeCode?.departmentCode?.departmentName}</td>
                                    <td className={doPay.list_commute_detail}>{formatDateTime(AttPayment.approvalProcessDate)}</td>
                                    <td className={doPay.list_my_waiting}>
                                    <button onClick={() => { handleDetailView(); navigate(`/attendance/attendancePop/${AttPayment?.approvalLineDocumentCode?.approvalDocumentCode}`); }}>상세보기</button>
                                    </td>
                                </tr>
                            ))
                            :
                            (
                                <tr>
                                    <td colSpan='4'>조회된 내용이 없습니다.</td>
                                </tr>
                            )                            
                        }

                    </tbody>
                </table>
            </div>

            <div className="paging_po" style={{  position: 'relative', top: '300px', listStyleType: 'none', display: 'flex' , left: '500px'}}> 
                {Array.isArray(doPaymentLists) && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={doPay.pagingBtn}> &lt;
                    </button>
                )}
                {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}  style={{ margin: '0 9px' }} >
                        <button
                            style={currentPage === num ? { backgroundColor: '#FA9A85' } : null}
                            className={doPay.pagingBtn}>{num}
                        </button>
                    </li>
                ))}
                {Array.isArray(doPaymentLists) && (
                    <button
                        className={doPay.pagingBtn}
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