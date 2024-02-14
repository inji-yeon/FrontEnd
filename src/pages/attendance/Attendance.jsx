
import commuteMa from './attendancePage/CmmuteMain.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callCommuteMainAPI } from '../../apis/AttendanceAPI';
import { callCommutInsertAPI } from '../../apis/AttendanceAPI';

const getCurrentDateTime = () => {
    const now = new Date();
    return `${now.getFullYear()}-${padZero(now.getMonth() + 1)}-${padZero(now.getDate())} ${padZero(now.getHours())}:${padZero(now.getMinutes())}:${padZero(now.getSeconds())}`;
};

const padZero = (num) => num.toString().padStart(2, '0');

function Attendance() {

    const navigate = useNavigate();
    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
    const [workTime, setWorkTime] = useState('');
    const [leaveTime, setLeaveTime] = useState('');
    const [isWorking, setIsWorking] = useState(false);
    const [current, setCurrent] = useState('출근전 입니다');
    const [workedHour, setWorkedHour] = useState('');
    const [worked, setWorked] = useState('');


    const vacationApplyClick = () => {
      // 휴가 신청 페이지로 이동
      navigate('/');  //결재 휴가 페이지 넣기
    };

    const myPaymentClick = () => {
        // 결재 페이지로 이동
        navigate('/attendance/doPaymentDocumentWaiting')
    };

    const workApplyClick = () => {
        // 근태 신청 페이지로 이동
        navigate('/');  //근태 신청 페이지 널기
    };


      const arrivalTime = () => {
        if (isWorking) {
          alert('이미 출근했습니다.');
          return;
        }
    
        setIsWorking(true);
        setWorkTime(getCurrentDateTime());
        setCurrent('출근 했습니다');
      };
    
      const updateTime = () => {
        if (!isWorking) {
          alert('출근 먼저 해주세요.');
          return;
        }

        if (leaveTime) {
            alert('이미 퇴근했습니다.');
            return;
          }
    
        setLeaveTime(getCurrentDateTime());
        setCurrent('퇴근 했습니다');

        setWorked('근무시간');

        // 날짜 및 시간 간의 차이 계산
        const arrivalDateTime = new Date(workTime);
        const leaveDateTime = new Date(getCurrentDateTime());
        const timeDifference = leaveDateTime - arrivalDateTime;

        // 차이를 시간, 분, 초로 변환
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // 시간 정보를 문자열로 표시
        const workedHourString = `${hours}h ${minutes}m ${seconds}s`;

        setWorkedHour(workedHourString);
   
      };
    
      useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentDateTime(getCurrentDateTime());
        }, 5000);
    
        return () => clearInterval(intervalId);
      }, []);




    const dispatch = useDispatch();
    const attendanceMain = useSelector((state => state.attendance));


    const commuteMain = attendanceMain?.data;
    console.log('commuteMain =====>', commuteMain);

    const commuteVacation =attendanceMain?.data2;
    console.log('commuteVacation =====>', commuteVacation);

    const commuteWaiting = attendanceMain?.data3;
    console.log('commuteWaiting ========>',commuteWaiting );

    

    useEffect(() => {
        dispatch(
            callCommuteMainAPI({})
        );
    }, []);


    const [form, setForm] = useState({
        attendanceManagementCode: '',
        attendanceEmployeeCode: '',
        attendanceManagementArrivalTime: '',
        attendanceManagementDepartureTime: '00:00:00',
        attendanceManagementState: '', 
        attendanceManagementWorkDay: {currentDay},

    });


        // form 데이터 세팅    
        const onChangeHandler = (e) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            });
        };


        dispatch(callCommutInsertAPI({	
            form: form
        }));  





    return(
        
        <div className={commuteMa.main}>
            <div className={commuteMa.main2}>
                <span className={commuteMa.mainTitle}>내 근태 현황</span>
                <div className={commuteMa.bar}></div>
                <div className={commuteMa.box}>
                    <div className={commuteMa.vacation_box}>
                        <span className={commuteMa.vacation_leave}>남은 연차</span>
                        <span className={commuteMa.vacation_image}></span>
                        <div className={commuteMa.vacation2}>{commuteVacation?.resultVacation}</div>
                        <span className={commuteMa.vacation_day}>일</span>
                        <button onClick={vacationApplyClick}  style={{ backgroundColor: '#FFBE98', border: 'none' }} className={commuteMa.vacation_apply}>휴가 신청하기</button>
                    </div>
                    <div className={commuteMa.payment_box}>
                        <span className={commuteMa.payment_leave}>결재 대기</span>
                        <span className={commuteMa.payment_image}></span>
                        <div className={commuteMa.payment}>{commuteWaiting?.countWaiting}</div>
                        <span className={commuteMa.payment_count}>건</span>
                        <button onClick={myPaymentClick}  style={{ backgroundColor: '#FFBE98', border: 'none' }} className={commuteMa.payment_check}>결제 확인하기</button>
                    </div>
                    <div className={commuteMa.work_box}>
                        <span className={commuteMa.work_title}>근태 신청</span>
                        <span className={commuteMa.work_image}></span>
                        <button onClick={workApplyClick}  style={{ backgroundColor: '#FFBE98', border: 'none' }} className={commuteMa.vacation_apply}>근태 신청하기</button>
                    </div>
                </div>
                <div className={commuteMa.today_Info_box}>
                    <div className={commuteMa.today_Info}>
                        <span className={commuteMa.today}>오늘</span>
                        <span className={commuteMa.today_time}>{currentDateTime}</span>
                        <hr />
                        <div className={commuteMa.current_info}>
                            <span className="userN" >ooo님, 안녕하세요.</span><br/>
                            <span className={commuteMa.current}>{current}</span>
                        </div>
                        <div className={commuteMa.time_info}>
                        <span className="workTime">출근: {commuteMain?.attendanceManagementArrivalTime} </span>
                        <input type="hidden" value={workTime} />
                        <br />
                        <span className="leaveTime">퇴근: {commuteMain?.attendanceManagementDepartureTime}</span>
                        <input type="hidden" value={leaveTime} />
                        </div>
                        <button id="workCheckButton" className={commuteMa.work_check} onClick={arrivalTime}>출근</button>
                        <button id="leaveCheckButton" className={commuteMa.leave_check} onClick={updateTime}>퇴근</button>
                        <span className={commuteMa.worked}>{worked}</span><br/>
                        <span className={commuteMa.workedHour}>{workedHour}</span>
                    </div>
                </div>
                <div className={commuteMa.calender_area}>
                    <div className={commuteMa.calender_info}>
                        <button className={commuteMa.pre} > + </button>
                        <span className={commuteMa.now}></span>
                        <button className={commuteMa.nex}> - </button>
                    </div>
                    <div className={commuteMa.calenderOption} id="calenderOption">
                        <div className="options-container">
                            <label><input type="checkbox" value="vacation" /> 휴가</label>
                            <label><input type="checkbox" value="outside" /> 외근</label>
                            <label><input type="checkbox" value="extension" /> 연장근로</label>
                            <label><input type="checkbox" value="business" /> 출장</label>
                            <label><input type="checkbox" value="home" /> 재택근무</label>
                        </div>
                    </div>
                    <div className={commuteMa.calender}></div>
                </div>
            </div>
        </div>
    );

}

export default Attendance;