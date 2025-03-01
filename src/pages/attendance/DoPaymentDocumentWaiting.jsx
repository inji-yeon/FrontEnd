import React from 'react';
import doWaiting from './attendancePage/MyApplyWaiting.module.css'
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callDoWaitingAPI } from '../../apis/AttendanceAPI';
import { useEffect, useState } from 'react';


function DoPaymentDocumentWaiting () {

    const navigate = useNavigate();

    const doApplyWaitingClick = () => {
        // 대기 페이지로 이동
        navigate('/attendance/doPaymentDocumentWaiting')
    };
    
    const doApplyApprovalClick = () => {
        // 결재 페이지로 이동
        navigate('/attendance/doPaymentDocumentApproval')
    };


    const doApplyRejectClick = () => {
        // 반려 페이지로 이동
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

    const dispatch = useDispatch();
    const doWaitingDocu = useSelector((state => state.attendance))

    const pageInfo = doWaitingDocu?.pageInfo;

    console.log('pageInfo', pageInfo);

    const doWaitingDocuts = doWaitingDocu?.data?.content; 

    console.log('doWaitingDocuts =====>', doWaitingDocuts);

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
            callDoWaitingAPI({
                currentPage: currentPage,
            })
        );
    }, [currentPage]);


    


    return(

        <>

            <div className={doWaiting.main}>
                <div className={doWaiting.main2}>
                    <span className={doWaiting.main_title}>내 결재 문서</span>
                    <div className={doWaiting.bar}></div>
                    <div className={doWaiting.filter_area}>
                        <div className={doWaiting.box_area}>
                        <div className={doWaiting.apply_waiting_box} onClick={doApplyWaitingClick}>대기</div>
                        <div className={doWaiting.approval_box} onClick={doApplyApprovalClick}>결재</div>
                        <div className={doWaiting.reject_box} onClick={doApplyRejectClick}>반려</div>
                        </div>
                        <div className={doWaiting.bar2}></div>
                    </div>
                    <button className={doWaiting.approval}>승인</button>
                    <div className={doWaiting.list_commute_area}>
                        <table style={{ borderCollapse: 'collapse', fontSize: '16px', width: '1200px'}}>
                            <thead>
                                <tr className={doWaiting.list_my_waiting} style={{ backgroundColor: '#F5F5F5' }} >
                                    <td className={doWaiting.list_my_waiting}>
                                        <input 
                                            type="checkbox" 
                                            id="selectAll" 
                                            checked={isChecked} 
                                            onChange={toggleCheckboxes} // onClick 대신에 onChange를 사용합니다.
                                        />
                                    </td>
                                    <td className={doWaiting.list_my_waiting}>기안일자</td>
                                    <td className={doWaiting.list_my_waiting}>종류</td>
                                    <td className={doWaiting.list_my_waiting}>기안자</td>
                                    <td className={doWaiting.list_my_waiting}>소속</td>
                                    <td className={doWaiting.list_my_waiting}>관리</td>
                                </tr>
                            </thead>    

                            <tbody>
                                {Array.isArray(doWaitingDocuts) && doWaitingDocuts.length > 0?
                                    doWaitingDocuts.map((AttWaiting) => (
                                    <tr className={doWaiting.list_my_waiting} key={AttWaiting?.approvalLineCode}>
                                        <td className={doWaiting.list_my_waiting}>{AttWaiting.approvalLineDocumentCode?.approvalDocumentCode}</td>
                                        <td className={doWaiting.list_my_waiting}>{AttWaiting.approvalLineDocumentCode?.approvalRequestDate}</td>
                                        <td className={doWaiting.list_my_waiting}>{AttWaiting.approvalLineDocumentCode?.approvalForm}</td>
                                        <td className={doWaiting.list_my_waiting}>{AttWaiting.approvalLineDocumentCode?.documentEmployeeCode?.employeeName}</td>
                                        <td className={doWaiting.list_my_waiting}>{AttWaiting.approvalLineDocumentCode?.documentEmployeeCode?.employeeDepartmentCode?.departmentName}</td>
                                        <td className={doWaiting.list_my_waiting}>
                                            <button id="approval">승안</button>
                                            <button id="detailDcoument" onClick={openPopup}>상세보기</button>
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

                    <div className={doWaiting.paging_po}  style={{  position: 'relative', top: '600px', listStyleType: 'none', display: 'flex', justifyContent: 'center' }}> 
                        {Array.isArray(doWaitingDocuts) && (
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={doWaiting.pagingBtn}> &lt;
                            </button>
                        )}
                        {pageNumber.map((num) => (
                            <li key={num} onClick={() => setCurrentPage(num)}  style={{ margin: '0 9px' }} >
                                <button
                                    style={currentPage === num ? { backgroundColor: '#FA9A85' } : null}
                                    className={doWaiting.pagingBtn}>{num}
                                </button>
                            </li>
                        ))}
                        {Array.isArray(doWaitingDocuts) && (
                            <button
                                className={doWaiting.pagingBtn}
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

export default DoPaymentDocumentWaiting
