import commuteList from './attendancePage/CommuteList.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callCommutesListAPI } from '../../apis/AttendanceAPI';




function CommuteList() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [now, setNow] = useState('')
    const dispatch = useDispatch();
    const commutes = useSelector((state => state.attendance));


    const handlePrevClick = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };
    
    const handleNextClick = () => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };
    
    useEffect(() => {
        // 화면에 보이는 형식
        const formattedDate2 = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;
        setNow(formattedDate2);
        }, [currentDate]);
    

    const pageInfo = commutes?.pageInfo;

    console.log('pageInfo', pageInfo);

    console.log('now ========',now)

    const commuteLists = commutes?.data?.content; 

    console.log('commuteLists888888', commuteLists);
    


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
        //날짜 데이터 보내는 형식 2024-02
        setStart((currentPage - 1) * 5);
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;        

        dispatch(
            callCommutesListAPI({
                currentPage: currentPage,
                now: formattedDate, // 현재 날짜 정보를 API 호출 시 전달
            })
        );
    }, [currentPage, currentDate]);

    //표데이터 형식 수정 

    const formatWorkDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}년 ${month}월 ${day}일`;
    };



    const formatArrivalTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
        
    };

    console.log('formatArrivalTime=========>',formatArrivalTime)

    





    return(
        <>
            <div className={commuteList.main}>
                <div className={commuteList.main2}>
                    <span className={commuteList.main-title}>내 출퇴근 내역</span>
                    <div className={commuteList.bar}></div>
                    <div className={commuteList.month-filter-area}>
                        <div className={commuteList.monthFilter}>
                            <div className={commuteList.calender-title}>
                                <button className={commuteList.pre} onClick={handlePrevClick}>
                                    <img src='/AttendanceManagement/prev.png' alt='pre'/>
                                </button>
                                <span className={commuteList.now}>{now}</span>
                                <button className={commuteList.nex} onClick={handleNextClick}> 
                                    <img src='/AttendanceManagement/next.png' alt='nex'/>
                                </button>
                            </div>
                            <div className={commuteList.count-box}>
                                <div className={commuteList.box}>
                                    <div className={commuteList.vacation}>
                                        <span className={commuteList.vacation-image}><img src='/AttendanceManagement/vacation.png' alt="Vacation" /></span>
                                        <span className={commuteList.vacation-tile}>휴가</span>
                                        <div className={commuteList.vacationCount}>3</div>
                                    </div>
                                    <div className={commuteList.outside}>
                                        <span className={commuteList.outside-image}> <img src='/AttendanceManagement/outside.png' alt="Outside" /> </span>
                                        <span className={commuteList.outside-tile}>외근</span>
                                        <div className={commuteList.outsideCount}>3</div>
                                    </div>
                                    <div className={commuteList.extension}>
                                        <span className={commuteList.extension-image}><img src='/AttendanceManagement/extension.png' alt='Extention' /></span>
                                        <span className={commuteList.extension-tile}>연장근무</span>
                                        <div className={commuteList.extensionCount}>3</div>
                                    </div>
                                    <div className={commuteList.business}>
                                        <span className={commuteList.business-image}> <img src='/AttendanceManagement/business.png' alt='Business'/> </span>
                                        <span className={commuteList.business-tile}>출장</span>
                                        <div className={commuteList.businessCount}>3</div>
                                    </div>
                                    <div className={commuteList.home}>
                                        <span className={commuteList.home-image}> <img src='/AttendanceManagement/home.png' alt='Home' /> </span>
                                        <span className={commuteList.home-tile}>재택근무</span>
                                        <div className={commuteList.homeCount} >3</div>
                                    </div>
                                </div>
                            </div>

                            <div className={commuteList.list-commute-area}>
                                <table style={{ borderCollapse: 'collapse', fontSize: '16px', width: '1200px' }}>

                                    <thead>
                                        <tr className={commuteList.list-commute-detail} style={{ backgroundColor: '#F5F5F5' }}>
                                            <td className={commuteList.list-commute-detail}>날짜</td>
                                            <td className={commuteList.list-commute-detail}>출근시간</td>
                                            <td className={commuteList.list-commute-detail}>퇴근시간</td>
                                            <td className={commuteList.list-commute-detail}>총 근로시간</td>
                                            <td className={commuteList.list-commute-detail}>출퇴근 상태</td>
                                            <td className={commuteList.list-commute-detail}>근무 상태</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {Array.isArray(commuteLists) && commuteLists.length > 0?
                                            commuteLists.map((commute) => (
                                            <tr className={commuteList.list-commute-detail} key={commute.attendanceWorkTypeCode}>
                                                <td className={commuteList.list-commute-detail}>{formatWorkDate(commute.attendanceManagementCode.attendanceManagementWorkDay)}</td>
                                                <td className={commuteList.list-commute-detail}>{commute.attendanceManagementCode.attendanceManagementArrivalTime}</td>
                                                <td className={commuteList.list-commute-detail}>{commute.attendanceManagementCode.attendanceManagementDepartureTime}</td>
                                                <td className={commuteList.list-commute-detail}>08h 00m</td>
                                                <td className={commuteList.list-commute-detail}>{commute.attendanceManagementCode.attendanceManagementState}</td>
                                                <td className={commuteList.list-commute-detail}>{commute.attendanceWorkTypeStatus}</td>
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
                       
                            <div className="paging-po" style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center' }}> 
                                {Array.isArray(commuteLists) && (
                                    <button
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={commuteList.pagingBtn}> &lt;
                                    </button>
                                )}

                                {pageNumber.map((num) => (
                                    <li key={num} onClick={() => setCurrentPage(num)}  style={{ margin: '0 9px' }} >
                                        <button
                                            style={currentPage === num ? { backgroundColor: '#FA9A85' } : null}
                                            className={commuteList.pagingBtn}>{num}
                                        </button>
                                    </li>
                                ))}

                                {Array.isArray(commuteLists) && (
                                    <button
                                        className={commuteList.pagingBtn}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}>&gt;
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
    
}

export default CommuteList