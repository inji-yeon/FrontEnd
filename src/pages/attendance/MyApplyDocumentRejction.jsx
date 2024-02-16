import myRejec from './attendancePage/RejectPayment.module.css'
import { useNavigate  } from 'react-router-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callMyRejectAPI } from '../../apis/AttendanceAPI';
import { useEffect, useState } from 'react';


function MyApplyDocumentRejction() {

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

    

    const openPopup = () => {
        // 팝업 열기 동작
    }


    const dispatch = useDispatch();
    const myRejectDoc = useSelector((state => state.attendance))

    const pageInfo = myRejectDoc?.pageInfo;

    console.log('pageInfo', pageInfo);

    const myRejectDocuts = myRejectDoc?.data?.content; 

    console.log('myRejectDocuts =====>', myRejectDocuts);

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
            callMyRejectAPI({
                currentPage: currentPage,
            })
        );
    }, [currentPage]);




    return (

        <>

            <div className={myRejec.main}>

                <div className={myRejec.main2}>
                    <span className={myRejec.main_title}>내 신청 문서</span>
                    <div className={myRejec.bar}></div>
                    <div className={myRejec.filter_area}>
                        <div className={myRejec.box_area}>
                            <div className={myRejec.waiting_box} onClick={myApplyWaitingClick}>기안</div>
                            <div className={myRejec.approval_box} onClick={attenanceApprovalClick}>승인</div>
                            <div className={myRejec.document_reject_box} onClick={attenanceRejectClick}>반려</div>
                        </div>

                        <div className={myRejec.bar2}></div>
                    </div>

                    <div className={myRejec.list_commute_area}>
                    <table className={myRejec.list_commute_detail} style={{ borderCollapse: 'collapse', fontSize: '16px', width: '1200px' }}>
                        <thead>
                            <tr className={myRejec.list_commute_detail} style={{ backgroundColor: '#F5F5F5' }}>
                                <td className={myRejec.list_commute_detail}>문서번호</td>
                                <td className={myRejec.list_commute_detail}>기안일자</td>
                                <td className={myRejec.list_commute_detail}>종류</td>
                                <td className={myRejec.list_commute_detail}>반려일자</td>
                                <td className={myRejec.list_commute_detail}></td>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(myRejectDocuts) && myRejectDocuts.length > 0?
                                myRejectDocuts.map((AttmyRej) => (
                                    <tr className={myRejec.list_commute_detail} key={AttmyRej.approvalLineCode}>
                                        <td className={myRejec.list_commute_detail}>{AttmyRej.approvalLineCode}</td>
                                        <td className={myRejec.list_commute_detail}>{AttmyRej.approvalLineDocumentCode?.approvalRequestDate}</td>
                                        <td className={myRejec.list_commute_detail}>{AttmyRej.approvalLineDocumentCode?.approvalForm}</td>
                                        <td className={myRejec.list_commute_detail}>{AttmyRej.approvalProcessDate}</td>
                                        <td><button onclick="openPopup()">상세보기</button></td>
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


                    <div className="paging_po" style={{  position: 'relative', top: '450px', listStyleType: 'none', display: 'flex', justifyContent: 'center' }}> 
                        {Array.isArray(myRejectDocuts) && (
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={myRejec.pagingBtn}> &lt;
                            </button>
                        )}
                        {pageNumber.map((num) => (
                            <li key={num} onClick={() => setCurrentPage(num)}  style={{ margin: '0 9px' }} >
                                <button
                                    style={currentPage === num ? { backgroundColor: '#FA9A85' } : null}
                                    className={myRejec.pagingBtn}>{num}
                                </button>
                            </li>
                        ))}
                        {Array.isArray(myRejectDocuts) && (
                            <button
                                className={myRejec.pagingBtn}
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

export default MyApplyDocumentRejction
