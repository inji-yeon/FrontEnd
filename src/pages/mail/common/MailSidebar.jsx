import { Outlet } from "react-router-dom";
import './mailSidebar.css';
import { useEffect, useState } from "react";

function MailSidebar(){
    const [active, setActive] = useState(false);
    useEffect(()=>{
        setActive(true);
    },[])

    return (
        <>
        <div className={`fade-in ${active ? 'active' : ''}`}>
            <div className="sidemenu2">
            <div className="sidemenu2_title">이메일</div>
            <div id="mail-sidebar-header">
                <button id="mail-write-button">메일 쓰기</button>
                <button id="mail-write-button-to-me">내게 쓰기</button>
                <div id="information">

                    <div id="noread">
                        <div id="noread-count">24</div>
                        <div>안읽음</div>
                    </div>

                    <div id="important">
                            <img alt="중요" id="inportant-icon" src="/mail/" width="20px" height="20px"/>
                            <div>중요</div>
                        </div>

                    <div id="trash">
                            <img alt="휴지통" id="trash-icon" src="../../../../public/mail/trash.png" width="20px" height="20px"/>
                            <div>휴지통</div>
                        </div>
                </div>
            </div>
            <ul>
                <li>
                    <div>임시 보관</div>
                </li>
                <li>
                    <div>휴지통</div>
                </li>
                <li>
                    <div>안읽은 메일</div>
                </li>
                <li>
                    <div>예약한 메일</div>
                </li>
                <li>
                    <div>중요한 메일</div>
                </li>
            </ul>
            </div>
            </div>
            <Outlet/>
        </>
    )
}


export default MailSidebar;