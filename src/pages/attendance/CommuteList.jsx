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
    

    const pageInfo = commutes?.data?.pageInfo;

    console.log('pageInfo', pageInfo);


    const commuteLists = commutes?.data?.data?.content; 

    console.log('commuteLists888888', commuteLists);

    const attendanceCount = commutes?.data2;
    console.log('attendanceCount', attendanceCount);



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



    const formatCommuteTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
        
    };

    console.log('formatCommuteTime=========>',formatCommuteTime)



    
    function calculateTimeDifference(arrivalTime, departureTime) {
        const arrivalDate = new Date(arrivalTime);
        const departureDate = new Date(departureTime);
    
        const differenceMs = departureDate - arrivalDate;
        const hours = Math.floor(differenceMs / (1000 * 60 * 60));
        const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
    
        return `${hours}h ${minutes}m`;
    }
    
    
    





    return(
        <>
            <div className={commuteList.main}>
                <div className={commuteList.main2}>
                    <span className={commuteList.main_title}>내 출퇴근 내역</span>
                    <div className={commuteList.bar}></div>
                    <div className={commuteList.month_filter_area}>
                        <div className={commuteList.monthFilter}>
                            <div className={commuteList.calender_title}>
                                <button className={commuteList.pre} onClick={handlePrevClick}>
                                    <img src='/AttendanceManagement/prev.png' alt='pre'/>
                                </button>
                                <span className={commuteList.now}>{now}</span>
                                <button className={commuteList.nex} onClick={handleNextClick}> 
                                    <img src='/AttendanceManagement/next.png' alt='nex'/>
                                </button>
                            </div>
                            <div className={commuteList.count_box}>
                                <div className={commuteList.box}>
                                    <div className={commuteList.vacation}>
                                        {/* <span className={commuteList.vacation_image}><img src='/AttendanceManagement/vacation.png' alt="Vacation" /></span> */}
                                        <span className={commuteList.vacation_tile}>정상</span>
                                        <div className={commuteList.vacationCount}>{attendanceCount?.normal}</div>
                                    </div>
                                    <div className={commuteList.outside}>
                                        {/* <span className={commuteList.outside_image}> <img src='/AttendanceManagement/outside.png' alt="Outside" /> </span> */}
                                        <span className={commuteList.outside_tile}>지각</span>
                                        <div className={commuteList.outsideCount}>{attendanceCount?.late}</div>
                                    </div>
                                    <div className={commuteList.extension}>
                                        {/* <span className={commuteList.extension_image}><img src='/AttendanceManagement/extension.png' alt='Extention' /></span> */}
                                        <span className={commuteList.extension_tile}>조퇴</span>
                                        <div className={commuteList.extensionCount}>{attendanceCount?.early}</div>
                                    </div>

                                    {/* <div className={commuteList.business}>
                                        <span className={commuteList.business_image}> <img src='/AttendanceManagement/business.png' alt='Business'/> </span>
                                        <span className={commuteList.business_tile}>출장</span>
                                        <div className={commuteList.businessCount}>3</div>
                                    </div>
                                    <div className={commuteList.home}>
                                        <span className={commuteList.home_image}> <img src='/AttendanceManagement/home.png' alt='Home' /> </span>
                                        <span className={commuteList.home_tile}>재택근무</span>
                                        <div className={commuteList.homeCount} >3</div>
                                    </div> */}
                                </div>
                            </div>

                            <div className={commuteList.list_commute_area}>
                                <table style={{ borderCollapse: 'collapse', fontSize: '16px', width: '1200px' }}>

                                    <thead>
                                        <tr className={commuteList.list_commute_detail} style={{ backgroundColor: '#F5F5F5' }}>
                                            <td className={commuteList.list_commute_detail}>날짜</td>
                                            <td className={commuteList.list_commute_detail}>출근시간</td>
                                            <td className={commuteList.list_commute_detail}>퇴근시간</td>
                                            <td className={commuteList.list_commute_detail}>총 근로시간</td>
                                            <td className={commuteList.list_commute_detail}>출퇴근 상태</td>
                                            <td className={commuteList.list_commute_detail}>근무 상태</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {Array.isArray(commuteLists) && commuteLists.length > 0?
                                            commuteLists.map((commute) => (
                                            <tr className={commuteList.list_commute_detail} key={commute.attendanceManagementCode}>
                                                <td className={commuteList.list_commute_detail}>{commute?.attendanceManagementWorkDay}</td>
                                                <td className={commuteList.list_commute_detail}>{commute?.attendanceManagementArrivalTime}</td>
                                                <td className={commuteList.list_commute_detail}>{commute?.attendanceManagementDepartureTime}</td>
                                                <td className={commuteList.list_commute_detail}>{commute ? calculateTimeDifference(commute.attendanceManagementArrivalTime, commute.attendanceManagementDepartureTime) : ''}</td>
                                                <td className={commuteList.list_commute_detail}>{commute?.attendanceManagementState}</td>
                                                <td className={commuteList.list_commute_detail}>{commute?.attendanceWorkTypeStatus}</td>
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
                       
                            <div className={commuteList.paging_po}  style={{  position: 'relative', top: '300px', listStyleType: 'none', display: 'flex' , left: '500px'}}> 
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