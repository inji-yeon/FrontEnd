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
        <div className="main">

            <div className="main2">
                <span className="main-title">내 신청 문서</span>
                <div className="bar"></div>
                <div className="filter-area">
                    <div className="box-area">
                        <div className="my-apply-waiting-box" onClick={myApplyWaitingClick}>기안</div>
                        <div className="approval-box" onClick={attenanceApprovalClick}>승인</div>
                        <div className="reject-box" onClick={attenanceRejectClick}>반려</div>
                    </div>

                    <div className="bar2"></div>
                </div>
                <div className="list-my-waiting">
                    <table className={{ borderCollapse: 'collapse', fontSize: '16px', width: '1200px' }}>
                        <tr className="list-my-waiting" style={{ backgroundColor: '#F5F5F5' }}>
                            <td className="list-my-waiting">신청기간</td>
                            <td className="list-my-waiting">종류</td>
                            <td className="list-my-waiting">상태</td>
                            <td className="list-my-waiting">소속</td>
                            <td className="list-my-waiting">관리</td>
                        </tr>
                        <tr className="list-my-waiting">
                            <td className="list-my-waiting">2023-01-05(금)~2023-01-05(금)</td>
                            <td className="list-my-waiting">연차-오후 반차</td>
                            <td className="list-my-waiting">홍길동사원</td>
                            <td className="list-my-waiting">마케팅팀</td>
                            <td className="list-my-waiting">
                                <button id="withdrawal">철회</button>
                                <button id="detailDcoument" onClick={openPopup}>상세보기</button>
   
                            </td>
                        </tr>
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

                <div className="paging-po" style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center' }}> 
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