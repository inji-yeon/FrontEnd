import './attendancePage/CommuteList.css';
import { useEffect, useState } from 'react';

function CommuteList() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [now, setNow] = useState('')


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
    // Format the current date to display in the 'now' state
    const formattedDate = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;
    setNow(formattedDate);
  }, [currentDate]);


    return(
        <>
            <div className="main">
                <div className="main2">
                    <span className="main-title">내 출퇴근 내역</span>
                    <div className="bar"></div>
                    <div className="month-filter-area">
                        <div className="monthFilter">
                            <div className="calender-title">
                                <button className="pre" onClick={handlePrevClick}> + </button>
                                <span className="now">{now}</span>
                                <button className="nex" onClick={handleNextClick}> - </button>
                            </div>
                            <div className="count-box">
                                <div className="box">
                                    <div className="vacation">
                                        <span className="vacation-image"></span>
                                        <span className="vacation-tile">휴가</span>
                                        <div className="vacationCount" >3</div>
                                    </div>
                                    <div className="outside">
                                        <span className="outside-image"></span>
                                        <span className="outside-tile">외근</span>
                                        <div className="outsideCount" >3</div>
                                    </div>
                                    <div className="extension">
                                        <span className="extension-image"></span>
                                        <span className="extension-tile">연장근무</span>
                                        <div className="extensionCount" >3</div>
                                    </div>
                                    <div className="business">
                                        <span className="business-image"></span>
                                        <span className="business-tile">출장</span>
                                        <div className="businessCount">3</div>
                                    </div>
                                    <div className="home">
                                        <span className="home-image"></span>
                                        <span className="home-tile">재택근무</span>
                                        <div className="homeCount" >3</div>
                                    </div>
                                </div>
                            </div>

                            <div className="list-commute-area">
                                <table style={{ borderCollapse: 'collapse', fontSize: '16px', width: '1200px' }}>
                                    <tr className="list-commute-detail" style={{ backgroundColor: '#F5F5F5' }}>
                                        <td className="list-commute-detail">날짜</td>
                                        <td className="list-commute-detail">출근시간</td>
                                        <td className="list-commute-detail">퇴근시간</td>
                                        <td className="list-commute-detail">총 근로시간</td>
                                        <td className="list-commute-detail">출퇴근 상태</td>
                                        <td className="list-commute-detail">근무 상태</td>
                                    </tr>
                                    <tr className="list-commute-detail">
                                        <td className="list-commute-detail">12 - 24 (목)</td>
                                        <td className="list-commute-detail">09 : 00 : 02</td>
                                        <td className="list-commute-detail">18 : 22 : 10</td>
                                        <td className="list-commute-detail">08h 00m</td>
                                        <td className="list-commute-detail">조기퇴근</td>
                                        <td className="list-commute-detail">연장근로</td>
                                    </tr>
                                </table>
                            </div>
                       
                            {/* <div className="paging-po"> << < 1  2  3  4  5 > >></div> */}

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
    
}

export default CommuteList