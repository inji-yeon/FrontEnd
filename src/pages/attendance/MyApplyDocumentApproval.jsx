import React from 'react';
import myAppro from './attendancePage/ApprovalPayment.module.css'
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callMyApprovalAPI } from '../../apis/AttendanceAPI';
import { useEffect, useState } from 'react';



function MyApplyDocumentApproval () {

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


    const dispatch = useDispatch();
    const myApprovalDocu = useSelector((state => state.attendance))

    const pageInfo = myApprovalDocu?.pageInfo;

    console.log('pageInfo', pageInfo);

    const myApprovalDocuts = myApprovalDocu?.data?.content; 

    console.log('myApprovalDocuts =====>', myApprovalDocuts);

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
            callMyApprovalAPI({
                currentPage: currentPage,
            })
        );
    }, [currentPage]);





    return(
        <>
            <div className={myAppro.main}>

                <div className={myAppro.main2}>
                    <span className={myAppro.main_title}>내 신청 문서</span>
                    <div className={myAppro.bar}></div>
                    <div className={myAppro.filter_area}>
                        <div className={myAppro.box_area}>
                            <div className={myAppro.waiting_box} onClick={myApplyWaitingClick}>기안</div>
                            <div className={myAppro.document_approval_box} onClick={attenanceApprovalClick}>승인</div>
                            <div className={myAppro.reject_box} onClick={attenanceRejectClick}>반려</div>
                        </div>
            
                        <div className={myAppro.bar2}></div>
                    </div>
                    <div className={myAppro.list_commute_area}>
                        <table className={myAppro.list_commute_detail} style={{ borderCollapse: 'collapse', fontSize: '16px', width: '1200px' }}>
                            <tr className={myAppro.list_commute_detail} style={{ backgroundColor: '#F5F5F5' }}>
                                <td className={myAppro.list_commute_detail}>문서번호</td>
                                <td className={myAppro.list_commute_detail}>신청기간</td>
                                <td className={myAppro.list_commute_detail}>종류</td>
                                <td className={myAppro.list_commute_detail}>소속</td>
                                <td className={myAppro.list_commute_detail}>결재일시</td>
                                <td className={myAppro.list_commute_detail}></td>
                            </tr>
                            <tr className={myAppro.list_commute_detail}>
                                <td className={myAppro.list_commute_detail}>휴가-202301-00002</td>
                                <td className={myAppro.list_commute_detail}>2023-01-05(금)~2023-01-05(금)</td>
                                <td className={myAppro.list_commute_detail}>연차-오후 반차</td>
                                <td className={myAppro.list_commute_detail}>마케팅팀</td>
                                <td className={myAppro.list_commute_detail}> 01-02 10:12 </td>
                                <td><button onclick="openPopup()">상세보기</button></td>
                                
                            </tr>
                        </table>
                    </div>

                    <div className="paging_po" style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center' }}> 
                        {Array.isArray(myApprovalDocuts) && (
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={myAppro.pagingBtn}> &lt;
                            </button>
                        )}
                        {pageNumber.map((num) => (
                            <li key={num} onClick={() => setCurrentPage(num)}  style={{ margin: '0 9px' }} >
                                <button
                                    style={currentPage === num ? { backgroundColor: '#FA9A85' } : null}
                                    className={myAppro.pagingBtn}>{num}
                                </button>
                            </li>
                        ))}
                        {Array.isArray(myApprovalDocuts) && (
                            <button
                                className={myAppro.pagingBtn}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}>&gt;
                            </button>
                        )}
                    </div>

                </div>
            </div>

    
    
    <div id="popup">
        <div id="close-btn" onclick="closePopup()">닫기</div>
    
    </div>

        
        </>
    );
}

export default MyApplyDocumentApproval