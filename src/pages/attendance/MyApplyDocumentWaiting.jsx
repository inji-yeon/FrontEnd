import myWaiting from './attendancePage/MyApplyWaiting.module.css'
import { useNavigate  } from 'react-router-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callMyWaitingAPI } from '../../apis/AttendanceAPI';
import { useEffect, useState } from 'react';



function MyApplyDocumentWaiting () {


    const navigate = useNavigate();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    
    const openPopup = () => {
        setIsPopupOpen(true);
        };
    
    const closePopup = () => {
        setIsPopupOpen(false);
        };


        const myApplyWaitingClick = () => {
            // 기안 페이지로 이동
            navigate('/attendance/myApplyDocumentWaiting')
        };

        const attenanceApprovalClick = () => {
            // 승인 페이지로 이동
            navigate('/attendance/myApplyDocumentApproval');  
        };
      
        const attenanceRejectClick = () => {
            // 반려 페이지로 이동
            navigate('/attendance/myApplyDocumentRejction');  
        };


        const dispatch = useDispatch();
        const myWaitingdoc = useSelector((state => state.attendance))
    
        const pageInfo = myWaitingdoc?.pageInfo;
    
        console.log('pageInfo', pageInfo);
    
        const myWaitingdocuts = myWaitingdoc?.data?.content; 
    
        console.log('myWaitingdocuts =====>', myWaitingdocuts);
    
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
                callMyWaitingAPI({
                    currentPage: currentPage,
                })
            );
        }, [currentPage]);






    return(

        <>
        <div className={myWaiting.main}>

            <div className={myWaiting.main2}>
                <span className={myWaiting.main_title}>내 신청 문서</span>
                <div className={myWaiting.bar}></div>
                <div className={myWaiting.filter_area}>
                    <div className={myWaiting.box_area}>
                        <div className={myWaiting.apply_waiting_box} onClick={myApplyWaitingClick}>기안</div>
                        <div className={myWaiting.approval_box} onClick={attenanceApprovalClick}>승인</div>
                        <div className={myWaiting.reject_box} onClick={attenanceRejectClick}>반려</div>
                    </div>

                    <div className={myWaiting.bar2}></div>
                </div>
                <div className={myWaiting.list_commute_area}>
                    <table className= {myWaiting.list_my_waiting}  style={{ borderCollapse: 'collapse', fontSize: '16px', width: '1200px' }}>
                        <thead>    
                            <tr className={myWaiting.list_my_waiting} style={{ backgroundColor: '#F5F5F5' }}>
                                <td className={myWaiting.list_my_waiting}>기안일자</td>
                                <td className={myWaiting.list_my_waiting}>종류</td>
                                <td className={myWaiting.list_my_waiting}>상태</td>
                                <td className={myWaiting.list_my_waiting}>관리</td>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {Array.isArray(myWaitingdocuts) && myWaitingdocuts.length > 0?
                                myWaitingdocuts.map((AttmyWait) => (
                                    <tr className={myWaiting.list_my_waiting} key={AttmyWait.approvalLineCode}>
                                        <td className={myWaiting.list_my_waiting}>{AttmyWait.approvalLineDocumentCode?.approvalRequestDate}</td>
                                        <td className={myWaiting.list_my_waiting}>{AttmyWait.approvalLineDocumentCode?.approvalForm}</td>
                                        <td className={myWaiting.list_my_waiting}>{AttmyWait.approvalProcessStatus}</td>
                                        <td className={myWaiting.list_my_waiting}>
                                            <button id="withdrawal">철회</button>
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

                    {isPopupOpen && (
                        <div id="overlay" onClick={closePopup}>
                            <div id="popup">
                        <div id="close-btn" onClick={closePopup}>닫기</div>
                            {/* 팝업 내용을 여기에 추가하세요 */}
                            000
                            </div>
                        </div>
                    )}

                </div> 

                <div className="paging_po" style={{  position: 'relative', top: '450px', listStyleType: 'none', display: 'flex', justifyContent: 'center' }}> 
                        {Array.isArray(myWaitingdocuts) && (
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={myWaiting.pagingBtn}> &lt;
                            </button>
                        )}
                        {pageNumber.map((num) => (
                            <li key={num} onClick={() => setCurrentPage(num)}  style={{ margin: '0 9px' }} >
                                <button
                                    style={currentPage === num ? { backgroundColor: '#FA9A85' } : null}
                                    className={myWaiting.pagingBtn}>{num}
                                </button>
                            </li>
                        ))}
                        {Array.isArray(myWaitingdocuts) && (
                            <button
                                className={myWaiting.pagingBtn}
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

export default MyApplyDocumentWaiting