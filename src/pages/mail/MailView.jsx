import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams  } from "react-router-dom";
import { fetchMail, updateEmailStatus, setRead, changeReadStatus } from "../../apis/MailAPI";
import './MailView.css';

function MailView(){
    const dispatch = useDispatch();
    const { emailCode } = useParams();
    const navigate = useNavigate();
    const email = useSelector(state => state.mail);

    console.log('url의 key는 : '+emailCode);

    useEffect(()=>{
        dispatch(fetchMail(emailCode));
        setRead(emailCode);
        console.log('메일을 읽었다.');
    },[dispatch,emailCode]);

    function RawHtml({ htmlContent }) {
        return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    }
    const goBackMailRoom = () => {
        navigate('/mail/check');
    }
    const removeEmail = () => {
        dispatch(updateEmailStatus(emailCode,'trash'));
        navigate('/mail/check');
    }
    const updateReadStatus = () => {
        changeReadStatus(emailCode);
        console.log('안읽은 것으로 만들었다.');
    }
    const receiveMail = () => {
        navigate('/mail/write',{
            state:{
                emailCode: emailCode,
            }
        })
    }
    return(
    <>  
        {email && email.data && email.data.data && email.data.data.emailTitle ? 
            (
            <div>
                <div className="contents_header">
                    <div className="title_area type_read">
                        <h2 className="mailbox_title">
                            <div>
                                <span className="arrow">{"<"}</span>
                                <button onClick={goBackMailRoom} className="reveive_mail">받은메일함</button>
                            </div>
                            </h2>
                            <div className="button_wrap">
                                <button onClick={()=>{updateReadStatus()}} type="button" className="non_read_change">안읽음 으로 바꾸기</button>
                                <button onClick={()=>{receiveMail()}} type="button" className="receive_button">답장하기</button>
                                <button onClick={()=>{removeEmail()}} type="button" className="remove_button">삭제하기</button>
                            </div>
                        </div>
                    </div>
                <div className="title_container"><div className="email-title">{email.data.data.emailTitle}</div></div>
                <span className="send_time_text">보낸시간 : </span><div className="email-send-time">{email.data.data.emailSendTime}</div>
                <div className="email-sender">{email.data.data.emailSender.employeeId}@witty.com 님이 발송했습니다.</div>
                <div className="content-container"><RawHtml className="email-content" htmlContent={email.data.data.emailContent} /></div>
            </div>
            ) 
            : (<div>로딩중...</div>)}

    </>
    )
}

export default MailView;