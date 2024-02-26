
import attendSide from './attendancePage/AttendSidemenu2.module.css';
import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';

function AttendanceSide() {
    const [active, setActive] = useState(false);
    let navigate = useNavigate();


    useEffect(() => {
        setActive(true);
    }, []); // 두 번째 매개변수로 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 함


    

    const attendanceSidebarSelectHandler = (value) => {

        // const box = document.querySelector('.attendance_selected_box');
        // box.style.opacity = '1';
        
       
        switch (value) {
            case 'attendance':
                // box.style.top = '105px'; 
                navigate('attendance');
                break;

            case 'commuteList':
                // box.style.top = '105px'; 
                navigate('commuteList');
                break;

            case 'doPaymentDocumentWaiting':
                // box.style.top = '105px'; 
                navigate('doPaymentDocumentWaiting');
                break;

            case 'myApplyDocumentWaiting':
                // box.style.top = '105px'; 
                navigate('myApplyDocumentWaiting');
                break;

            default:
            
            
        }

    }


    return (

        <>
        
            <div className={`fade-in ${active ? 'active' : ''}`}>
                <div className={attendSide.sidemenu2}>
                    <div className={attendSide.sidemenu_back}>
                    {/* <div className="attendance_selected_box"></div> */}
                        <div className={attendSide.sidemenu2_area}>
                            <div className={attendSide.sidemenu2_title}>근태 관리</div>
                            <ul>
                            <li onClick={() => { attendanceSidebarSelectHandler('attendance') }}>내 근태 현황</li>
                                <li onClick={() => { attendanceSidebarSelectHandler('commuteList') }}>내 출퇴근 내역</li>
                                <ul>
                                    <li onClick={() => { attendanceSidebarSelectHandler('doPaymentDocumentWaiting') }}>내 결재 문서</li>
                                    <li onClick={() => { attendanceSidebarSelectHandler('myApplyDocumentWaiting') }}>내 신청 문서</li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

    </>
    );
    
        
    }


export default AttendanceSide