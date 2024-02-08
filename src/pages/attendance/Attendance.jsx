
import './attendancePage/CmmuteMain.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


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




    return(
        
        <div className="main">
            <div className="main2">
                <span className="main-title">내 근태 현황</span>
                <div className="bar"></div>
                <div className="box">
                    <div className="vacation-box">
                        <span className="vacation-leave">남은 연차</span>
                        <span className="vacation-image"></span>
                        <div className="vacation2">3</div>
                        <span className="vacation-day">일</span>
                        <button onClick={vacationApplyClick}  style={{ backgroundColor: '#FFBE98', border: 'none' }} className="vacation-apply">휴가 신청하기</button>
                    </div>
                    <div className="payment-box">
                        <span className="payment-leave">결재 대기</span>
                        <span className="payment-image"></span>
                        <div className="payment" >3</div>
                        <span className="payment-count">건</span>
                        <button onClick={myPaymentClick}  style={{ backgroundColor: '#FFBE98', border: 'none' }} className="payment-check">결제 확인하기</button>
                    </div>
                    <div className="work-box">
                        <span className="work-title">근태 신청</span>
                        <span className="work-image"></span>
                        <button onClick={workApplyClick}  style={{ backgroundColor: '#FFBE98', border: 'none' }} className="work-apply">근태 신청하기</button>
                    </div>
                </div>
                <div className="today-Info-box">
                    <div className="today-Info">
                        <span className="today">오늘</span>
                        <span className="today-time">{currentDateTime}</span>
                        <hr />
                        <div className="current-info">
                            <span className="userN" >ooo님, 안녕하세요.</span><br/>
                            <span className="current">{current}</span>
                        </div>
                        <div className="time-info">
                        <span className="workTime">출근: {workTime}</span><br />
                        <span className="leaveTime">퇴근: {leaveTime}</span>
                        </div>
                        <button id="workCheckButton" className="work-check" onClick={arrivalTime}>출근</button>
                        <button id="leaveCheckButton" className="leave-check" onClick={updateTime}>퇴근</button>
                        <span className="worked">{worked}</span><br/>
                        <span className="workedHour">{workedHour}</span>
                    </div>
                </div>
                <div className="calender-area">
                    <div className="calender-info">
                        <button className="pre" > + </button>
                        <span className="now"></span>
                        <button className="nex"> - </button>
                    </div>
                    <div className="calenderOption" id="calenderOption">
                        <div className="options-container">
                            <label><input type="checkbox" value="vacation" /> 휴가</label>
                            <label><input type="checkbox" value="outside" /> 외근</label>
                            <label><input type="checkbox" value="extension" /> 연장근로</label>
                            <label><input type="checkbox" value="business" /> 출장</label>
                            <label><input type="checkbox" value="home" /> 재택근무</label>
                        </div>
                    </div>
                    <div className="calender"></div>
                </div>
            </div>
        </div>
    );

}

export default Attendance;