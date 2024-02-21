import adminVa from './attendancePage/MyApplyWaiting.module.css'
import { useNavigate  } from 'react-router-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callAdminVacationAPI } from '../../apis/AttendanceAPI';
import { useEffect, useState } from 'react';



function AdminVacationList () {


    const navigate = useNavigate();


        const complteClick = () => {
            // 연차 할당 완료
            navigate('/attendance/adminVacationList')
        };

        const noClick = () => {
            // 미할당
            navigate('/attendance/adminNoVacationList');  
        };
    



        const dispatch = useDispatch();
        const adminVacation = useSelector((state => state.attendance))
    
        const pageInfo = adminVacation?.pageInfo;
    
        console.log('pageInfo', pageInfo);
    
        const adminVacations = adminVacation?.data?.content; 
    
        console.log('adminVacations =====>', adminVacations);
    
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
                callAdminVacationAPI({
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



    return(

        <>
        <div className={adminVa.main}>

            <div className={adminVa.main2}>
                <span className={adminVa.main_title}>관리자 페이지</span>
                <div className={adminVa.bar}></div>
                <div className={adminVa.filter_area}>
                    <div className={adminVa.box_area}>
                        <button className={adminVa.apply_vacation_box} onClick={complteClick}>연차 할당 완료 목록</button>
                        <button className={adminVa.apply_vacationing_box} onClick={noClick}>연차 할당 목록 </button>
                    </div>

                    <div className={adminVa.bar2}></div>
                </div>
                <div className={adminVa.list_commute_area}>
                    <table className= {adminVa.list_my_waiting}  style={{ borderCollapse: 'collapse', fontSize: '16px', width: '1200px' }}>
                        <thead>    
                            <tr className={adminVa.list_my_waiting} style={{ backgroundColor: '#F5F5F5' }}>
                                <td className={adminVa.list_my_waiting}>직원이름</td>
                                <td className={adminVa.list_my_waiting}>부서</td>
                                <td className={adminVa.list_my_waiting}>입사일</td>
                                <td className={adminVa.list_my_waiting}>생성사유</td>
                                <td className={adminVa.list_my_waiting}>생성일</td>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {Array.isArray(adminVacations) && adminVacations.length > 0?
                                adminVacations.map((AdminVaca) => (
                                    <tr className={adminVa.list_my_waiting} key={AdminVaca.adminEmployeeCode}>
                                        <td className={adminVa.list_my_waiting}>{AdminVaca.employeeNameAdmin}</td>
                                        <td className={adminVa.list_my_waiting}>{AdminVaca.employeeAdminDepartmentCode?.departmentName}</td>
                                        <td className={adminVa.list_my_waiting}>{formatDateTime(AdminVaca.employeeJoinDateAdmin)}</td>
                                        <td className={adminVa.list_my_waiting}>{AdminVaca.vacationCreationReason}</td>
                                        <td className={adminVa.list_my_waiting}>{formatDateTime(AdminVaca.vacationCreationDate)}</td>
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
                        {Array.isArray(adminVacations) && (
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={adminVa.pagingBtn}> &lt;
                            </button>
                        )}
                        {pageNumber.map((num) => (
                            <li key={num} onClick={() => setCurrentPage(num)}  style={{ margin: '0 9px' }} >
                                <button
                                    style={currentPage === num ? { backgroundColor: '#FA9A85' } : null}
                                    className={adminVa.pagingBtn}>{num}
                                </button>
                            </li>
                        ))}
                        {Array.isArray(adminVacations) && (
                            <button
                                className={adminVa.pagingBtn}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === pageInfo?.pageEnd || pageInfo?.total === 0}>&gt;
                            </button>
                        )}
                    </div>

            </div>
        </div>

        
        
        </>

    );
}

export default AdminVacationList