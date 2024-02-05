
import './AttendSidemenu2.css';
import { useEffect, useState } from 'react';

function AttendanceSide() {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(true);
    }, []); // 두 번째 매개변수로 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 함


    return (

        <>
        
            <div className={`fade-in ${active ? 'active' : ''}`}>
        <div className="sidemenu2">
            <div className="sidemenu2_area">
                <div className="sidemenu2_title">근태 관리</div>
                <ul>
                    <li>내 근태 현황</li>
                    <li>내 출퇴근 내역</li>
                    <ul>
                        <div>근태 문서</div>
                        <li>내 결재 문서</li>
                        <li>내 신청 문서</li>
                    </ul>
                </ul>
            </div>
        </div>
        </div>

    </>
    );
    
        
    }


export default AttendanceSide;

