import { useDispatch, useSelector } from "react-redux";
import { fetchMailByStatus, fetchMailSearch, getMail } from "../../apis/MailAPI";
import './mail.css';
import '../../component/mail/errorMessage.css'
import { useEffect, useState } from "react";
import { fetchMail } from "../../modules/MailModule";
import { useNavigate } from "react-router-dom";


function Mail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [word, setWord] = useState("");
    const [condition, setCondition] = useState('value1');
    const [message, setMessage] = useState({ show: false, message: null });
    useEffect(() => {
        dispatch(fetchMailByStatus('send'));
        setActive(true);
    }, [dispatch]);

    const mails = useSelector(state => state.mail); //state가 바뀌면 리렌더링

    useEffect(() => {
        setLoading(mails.loading);
        if (mails.error === 1000) {
            setMessage({ show: true, message: "검색된 메일이 없습니다." });
            setTimeout(() => {
                setMessage({ show: false, message: null });
            }, 1500); // 3000ms = 3초
        }
    }, [mails]);
    const searchBoxKeyHandler = (e) => {
        if (e.key === 'Enter') {
            searchMail();
        }
    }
    const searchBoxHandler = (e) => {
        setWord(e.target.value);
    };
    const selectBoxHandler = (e) => {
        setCondition(e.target.value);
    };
    const searchMail = () => {
        if (condition !== undefined && word !== "") {
            let option;
            if (condition === 'value1') {
                option = 'title';
            } else if ('value2') {
                option = 'receiver';
            }
            dispatch(fetchMailSearch(word, option))
        } else {
            setMessage({ show: true, message: "검색어를 입력해주세요." });
            setTimeout(() => {
                setMessage({ show: false, message: null });
            }, 1500); // 3000ms = 3초

        }
    }
    const closeError = (e) => {

        setMessage({ show: false, message: null });
    }
    const showMail = (key) => {
        console.log(key);
        navigate(`/mail/view/${key}`)
    }
    return (
        !loading && (
            <>
                {message.show ?
                    <div className="error-message">
                        <div>{message.message}</div>
                        <div className="msg">1.5초 후에 자동으로 닫힙니다..</div>
                        <button onClick={closeError} className="error-message-button">X</button>
                    </div> : <></>}

                <div className={`fade-in ${active ? 'active' : ''}`}>
                    <section className="project_section">
                        <div className="project_header">
                            <div className="project_header_title">메일함</div>
                            <div className="project_input_wrap">
                                <select id="search-options" value={condition} onChange={selectBoxHandler}>
                                    <option value="value1">제목</option>
                                    <option value="value2">발송자</option>
                                </select>
                                <input onKeyDown={searchBoxKeyHandler} onChange={searchBoxHandler} className="project_search_input" name="searchText" type="text" placeholder="메일 검색" value={word} />
                                <input className="project_search_button" onClick={searchMail} type="button" value="검색" />
                                <input className="project_create_button" type="button" value="예약 전송" />
                            </div>
                        </div>
                        <div className="project_body">
                            <table style={{ textAlign: "left" }} className="boardList">
                                <thead>
                                    <tr>
                                        <th><input id="selectAll" className="test" type="checkbox" /></th>
                                        <th className="important-icon"><img alt="별" src="/mail/star.png" style={{ width: '25px', height: '25px' }} /></th>
                                        <th>보낸 사람</th>
                                        <th>제목</th>
                                        <th>보낸 날짜</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mails.data ?
                                        (
                                            mails.data?.data?.map((mail) => (
                                                <tr onClick={() => { showMail(mail.emailCode) }} key={mail.emailCode} className={`fade-in ${active ? 'active' : ''}`}>
                                                    <td><input type="checkbox" /></td>
                                                    <td><img onClick={() => { alert("중요 표시") }} alt="별" src="/mail/star_empty.png" style={{ width: '20px', height: '20px' }} /></td>
                                                    <td style={{ color: mail.emailReadStatus === "Y" ? 'grey' : 'black' }} className="receiver">{mail.emailReceiver.employeeId}@witty.com</td>
                                                    <td style={{ color: mail.emailReadStatus === "Y" ? 'grey' : 'black' }}>{mail.emailTitle}</td>
                                                    <td style={{ color: mail.emailReadStatus === "Y" ? 'grey' : 'black' }} className="send_time">{mail.emailSendTime}</td>
                                                </tr>
                                            )
                                            )
                                        ) : (<tr><td><p>로딩 중...</p></td></tr>)
                                    }
                                </tbody>
                            </table>

                        </div>
                        <div className="project_footer">

                        </div>
                    </section>
                </div>
            </>
        )
    )
}

export default Mail;