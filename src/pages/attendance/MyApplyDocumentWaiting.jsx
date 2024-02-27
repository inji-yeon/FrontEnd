import myWaiting from './attendancePage/MyApplyWaiting.module.css'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callMyWaitingAPI } from '../../apis/AttendanceAPI';
import { useEffect, useState } from 'react';


function MyApplyDocumentWaiting () {


    const navigate = useNavigate();


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
    
        const pageInfo = myWaitingdoc?.data?.pageInfo;
    
        console.log('pageInfo', pageInfo);
    
        const myWaitingdocuts = myWaitingdoc?.data?.data?.content; 
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
            dispatch(callMyWaitingAPI({ currentPage: currentPage }));
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
                                <td className={myWaiting.list_my_waiting}>문서번호</td>
                                <td className={myWaiting.list_my_waiting}>기안일자</td>
                                <td className={myWaiting.list_my_waiting}>종류</td>
                                <td className={myWaiting.list_my_waiting}></td>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {Array.isArray(myWaitingdocuts) && myWaitingdocuts.length > 0?
                                myWaitingdocuts.map((AttmyWait) => (
                                    <tr className={myWaiting.list_my_waiting} key={AttmyWait.approvalLineCode}>
                                        <td className={myWaiting.list_my_waiting}>{AttmyWait.approvalLineDocumentCode?.approvalDocumentCode}</td>
                                        <td className={myWaiting.list_my_waiting}>{formatDateTime(AttmyWait.approvalLineDocumentCode?.approvalRequestDate)}</td>
                                        <td className={myWaiting.list_my_waiting}>{AttmyWait.approvalLineDocumentCode?.approvalForm}</td>
                                        <td className={myWaiting.list_my_waiting}>
                                        <button onClick={() => { handleDetailView(); navigate(`/attendance/attendancePop/${AttmyWait?.approvalLineDocumentCode?.approvalDocumentCode}`); }}>상세보기</button>
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