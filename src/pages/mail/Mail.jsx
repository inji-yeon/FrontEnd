import { useDispatch, useSelector } from "react-redux";
import { fetchMailByStatus, fetchMailSearch, toggleImportant } from "../../apis/MailAPI";
import './mail.css';
import '../../component/mail/errorMessage.css'
import { useContext, useEffect, useState } from "react";
import { fetchMail } from "../../modules/MailModule";
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import MailContext from "./common/MailContext";


function Mail({ itemsPerPage }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [word, setWord] = useState("");
    const [condition, setCondition] = useState('value1');
    const [message, setMessage] = useState({ show: false, message: null });
    const getMailToMe = useContext(MailContext);


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
            dispatch(fetchMailSearch(word, option,currentPage))
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
        navigate(`/mail/view/${key}`)
    }



    const [totalPageNumber, setTotalPageNumber] = useState(0);

    const [emails, setEmails] = useState([]);

    const [realMails, setRealMails] = useState([]);
    useEffect(()=> {
            if(emails){
                setTotalPageNumber(emails.totalPages);
                setRealMails(emails.content);
            }
    },[emails])
    useEffect(() => {
        if (mails.data) {   //mail.data가 있으면
          setEmails(mails.data.data);   //state를 만든다.
        }
      }, [mails]);  //mails가 변경될 때 마다 실행한다.

    const changeImportant = (emailCode) => {    //이메일 코드를 들고 와서
            const updatedEmails = realMails.map(mail => {  //state로 갖고 있는 emails를 mail이란 이름으로 펼친다
              if (mail.emailCode === emailCode) {   //만약 가져온 이메일 코드와 같다면?
                const result = { ...mail, emailStatus: mail.emailStatus === 'important' ? 'send' : 'important' };   //emailStatus가 important면 send로 바꾸고, 아니면 impotant로 바꾼다.

                dispatch(toggleImportant(mail.emailCode,result.emailStatus));
                return result;
              }
              return mail;  //updataEmails에 mail을 대입한다.
            });
            setRealMails(updatedEmails);   //state에 반환받은 업데이트 된 emails를 set한다.
    }
    const handlePageClick = (data) => {
        let selectedPage = data.selected;
        setCurrentPage(selectedPage);
        // getMailToMe(selectedPage);
        dispatch(fetchMailByStatus(realMails[0].emailStatus,selectedPage));   //와 무슨 메일의 데이터를 요청할 지 내가 어케 알음?

        //근데 이게 페이지가 있다는 거는 메일이 많단 소리임 
    };
    const [currentPage, setCurrentPage] = useState(0);
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
                                <input onClick={()=>{navigate('/mail/write')}} className="project_create_button" type="button" value="예약 전송" />
                            </div>
                        </div>
                        <div className="project_body">
                            <table style={{ textAlign: "center", width: "100%" }} className="boardList">
                                <thead>
                                    <tr>
                                        {/* <th><input id="selectAll" className="test" type="checkbox" /></th> */}
                                        <th className="important-icon"><img alt="별" src="/mail/star.png" style={{marginLeft:'25px', width: '25px', height: '25px' }} /></th>
                                        <th style={{ paddingLeft:'65px'}}>보낸 사람</th>
                                        <th style={{ paddingLeft:'60px'}}>제목</th>
                                        <th style={{ paddingLeft:'135px'}}>보낸 날짜</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {realMails?
                                        (
                                            realMails?.map((mail) => (
                                                <tr key={mail.emailCode} className={`fadea-in ${active ? 'active' : ''}`}>

                                                    <td>{mail.emailStatus === 'important' ? (
                                                        <img onClick={()=>{changeImportant(mail.emailCode)}} alt="별" src="/mail/star.png" style={{ width: '20px', height: '20px' }} />
                                                    ):(
                                                        <img onClick={()=>{changeImportant(mail.emailCode)}} alt="별" src="/mail/star_empty.png" style={{ width: '20px', height: '20px' }} />)}</td>
                                                    <td onClick={() => { showMail(mail.emailCode) }} style={{ color: mail.emailReadStatus === "Y" ? 'grey' : 'black' }} className="receiver">{mail.emailSender.employeeId}@witty.com</td>
                                                    <td onClick={() => { showMail(mail.emailCode) }} style={{ color: mail.emailReadStatus === "Y" ? 'grey' : 'black' }}>{mail.emailTitle.length < 28 ? mail.emailTitle : mail.emailTitle.substring(0,28) + "..."}</td>
                                                    <td onClick={() => { showMail(mail.emailCode) }} style={{ color: mail.emailReadStatus === "Y" ? 'grey' : 'black' }} className="send_time">{mail.emailSendTime}</td>
                                                </tr>
                                            )
                                            )
                                        ) : (<tr className='non-email'><td colSpan="4">이메일이 없습니다.</td></tr>)
                                    }
                                </tbody>
                            </table>
                            {totalPageNumber > 0 ?
                            <div>
                                <ReactPaginate
                                previousLabel={'이전'}
                                nextLabel={'다음'}
                                breakLabel={'...'}
                                initialPage={currentPage}
                                disableInitialCallback={true}
                                pageCount={totalPageNumber - 1}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                onPageChange={handlePageClick}
                                containerClassName={'paging'}   
                                activeClassName={'paging-active'}
                                />
                                
                            </div>
                            : <></>}       
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