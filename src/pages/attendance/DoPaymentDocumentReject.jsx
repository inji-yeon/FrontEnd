import doRej from './attendancePage/RejectPayment.module.css'
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callDoRejectAPI } from '../../apis/AttendanceAPI';
import { useEffect, useState } from 'react';



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
            <span className={doRej.main_title}>내 결재 문서</span>
            <div className={doRej.bar}></div>
            <div className={doRej.filter_area}>
                <div className={doRej.box_area}>
                <div className={doRej.waiting_box} onClick={doApplyWaitingClick}>대기</div>
                    <div className={doRej.approval_box} onClick={doApplyApprovalClick}>결재</div>
                    <div className={doRej.document_reject_box} onClick={doApplyRejectClick}>반려</div>
                </div>

                <div className={doRej.bar2}></div>
            </div>

            <div className={doRej.list_commute_area}>
                <table style={{ borderCollapse: 'collapse', fontSize: '16px', width: '1200px' }}>
                    <thead>
                        <tr className={doRej.list_commute_detail} style={{ backgroundColor: '#F5F5F5' }} >
                            <td className={doRej.list_commute_detail}>문서번호</td>
                            <td className={doRej.list_commute_detail}>기안일자</td>
                            <td className={doRej.list_commute_detail}>종류</td>
                            <td className={doRej.list_commute_detail}>기안자</td>
                            <td className={doRej.list_commute_detail}>소속</td>
                            <td className={doRej.list_commute_detail}>반려일시</td>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.isArray(doRejects) && doRejects.length > 0?
                            doRejects.map((AttReject) => (
                                <tr className={doRej.list_commute_detail} key={AttReject.approvalLineCode}>
                                    <td className={doRej.list_commute_detail}>{AttReject.approvalLineDocumentCode?.approvalDocumentCode}</td>
                                    <td className={doRej.list_commute_detail}>{AttReject.approvalLineDocumentCode?.approvalRequestDate}</td>
                                    <td className={doRej.list_commute_detail}>{AttReject.approvalLineDocumentCode?.approvalForm}</td>
                                    <td className={doRej.list_commute_detail}>{AttReject.approvalLineDocumentCode?.documentEmployeeCode?.employeeName}</td>
                                    <td className={doRej.list_commute_detail}>{AttReject.approvalLineDocumentCode?.documentEmployeeCode?.employeeDepartmentCode?.departmentName}</td>
                                    <td className={doRej.list_commute_detail}>{AttReject.approvalProcessDate}</td>
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

                <div className={doRej.paging_po} style={{  position: 'relative', top: '600px', listStyleType: 'none', display: 'flex', justifyContent: 'center' }}> 
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
                            disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}> &gt;
                        </button>
                    )}
                </div>
        </div>
    </div>

        
        </>
    )
}
export default DoPaymentDocumentReject