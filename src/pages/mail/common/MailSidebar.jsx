import { Outlet, useNavigate } from "react-router-dom";
import './mailSidebar.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../../../modules/MailModule";
import { fetchMailByStatus, fetchMailByReadStatus, getUnreadMail } from "../../../apis/MailAPI";

function MailSidebar() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const [unreadCount, setUnreadCount] = useState(100);

    useEffect(() => {
        setActive(true);
        getUnreadMail().then(text => setUnreadCount(text));
    }, [])
    const mailWriteButton = (condition) => {
        if (condition === 'to') {
            navigate('/mail/write');
        } else {
            navigate('/mail/write');
        }
    }
    const getMailByStatus = (condition) => {
        if (condition === 'unread') {
            navigate('/mail/check');
            dispatch(fetchMailByReadStatus());
        } else {
            navigate('/mail/check');
            dispatch(fetchMailByStatus(condition));
        }
    }
    return (
        <>
            <div className={`fade-in mail_wrapper ${active ? 'active' : ''}`}>
                <div className="sidemenu2">
                    <div className="sidemenu2_title">이메일</div>
                    <div id="mail-sidebar-header">
                        <button id="mail-write-button" onClick={() => { mailWriteButton('to') }}>메일 쓰기</button>
                        <button id="mail-write-button-to-me" onClick={() => { mailWriteButton('toMe') }}>내게 쓰기</button>
                        <div id="information">

                            <div id="noread" onClick={() => { getMailByStatus('unread') }}>
                                {<div id="noread-count">{unreadCount}</div>}
                                <div>안읽음</div>
                            </div>

                            <div id="important" onClick={() => { getMailByStatus('important') }}>
                                <img alt="중요" id="inportant-icon" src="/mail/star.png" width="20px" height="20px" />
                                <div>중요</div>
                            </div>

                            <div id="trash" onClick={() => { getMailByStatus('trash') }}>
                                <img alt="휴지통" id="trash-icon" src="/mail/trash.png" width="20px" height="20px" />
                                <div>휴지통</div>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li onClick={() => { getMailByStatus('send') }}>
                            <div>내 메일함</div>
                        </li>
                        <li onClick={() => { getMailByStatus('temporary') }}>
                            <div>임시 보관</div>
                        </li>
                        <li onClick={() => { getMailByStatus('reserve') }}>
                            <div>예약한 메일</div>
                        </li>
                        <li>
                            <div>뭐 넣지?</div>
                        </li>
                        <li>
                            <div>뭐 넣지?2</div>
                        </li>
                    </ul>
                </div>

                <Outlet />
            </div>

        </>
    )
}


export default MailSidebar;