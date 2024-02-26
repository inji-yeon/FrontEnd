import { useEffect, useState } from 'react';
import style from './mailWrite.module.css';
import { fet, fetObj } from '../../apis/MailAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWebSocket } from '../../component/WebSocketContext';
import { useAlert } from '../../component/common/AlertContext';

function MailWrite() {
    window.jQuery = require('jquery');
    const { showAlert } = useAlert();

    const wc = useWebSocket();
    const navigate = useNavigate();
    const RichTextEditor = require('../../component/common/SummerNote').default;
    const [reserveDate, setReserveDate] = useState('');  //선택한 예약 날짜
    const [receiver, setReceiver] = useState('');
    const [title, setTitle] = useState('');
    const [isSendMe, setIsSendMe] = useState(false);
    const [content, setContent] = useState('');
    const [emailCode, setEmailCode] = useState('');
    const location = useLocation();
    useEffect(() => {
        if (location.state) {
            setEmailCode(location.state.emailCode);
            fet(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/mail/find-email-by-code?emailCode=${emailCode}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        console.log(data);
                        setReceiver(data.data.emailSender.employeeId);
                        setTitle(`re : ${data.data.emailTitle} `);
                    }
                })
        }
    }, [location, emailCode])

    useEffect(() => {


    }, [])

    function showErrorMsg(msg) {     //메세지 출력하기
        console.log('showError :', msg);
    }

    const sendEmail = (status) => {   //이메일 보내기 버튼 눌럿을 때
        if (title && receiver) {          //insert작업인데 @MessageMapping으로 보내야한다.
            switch (status) {
                case 'send':
                    if (wc) {
                        wc.publish({
                            destination: '/app/mail/alert/send',    //엔드포인트
                            headers: { Authorization: 'Bearer ' + window.localStorage.getItem('accessToken') },
                            body: JSON.stringify({
                                emailTitle: title,
                                emailContent: content,
                                emailReceiver: {
                                    employeeId: receiver + '@witty.com'
                                }
                            })
                        });
                        console.log(`클라에서 정상적으로 보냈습니다.\n보낸 내용 : \n emailTitle : ${title}\nemailContent : ${content}\nemailReceiver : ${receiver}`);
                        navigate('/mail/check');
                    } else {
                        showAlert('웹소켓과 연결되지 않은 상태입니다.');
                    }
                    break;
                case 'reserve':
                    if (reserveDate === '') {
                        showAlert('날짜를 선택하세요.')
                    } else {
                        console.log('선택한 날짜는 : ', reserveDate);    //날짜를 선택함
                        console.log('제목은 : ', title);
                        console.log('내용은 : ', content);
                        console.log('받는 사람은 : ', receiver);
                        const emailDTO = {
                            emailTitle: title,
                            emailContent: content,
                            emailReservationTime: reserveDate,
                            emailReceiver: {
                                employeeId: receiver + '@witty.com'
                            }
                        }
                        fetObj(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/mail/send-reserve-mail`, 'POST', emailDTO)
                            .then(res => res.json())
                    }
                    break;
                case 'temporary':
                    console.log('임시 저장 입니다.');
                    break;
                default: break;
            }
        } else {
            showAlert('받는 이 또는 제목이 비어있습니다.');
        }

    }
    const dateChangeHandler = (e) => {  //예약 전송 날짜 바꿔주기
        setReserveDate(e.target.value);
    }
    const receiverChangeHandler = (e) => {  //누구한테 보낼 건지 바꿔주기
        setReceiver(e.target.value);
    }
    const titleChangeHandler = (e) => { //제목 바꿔주기
        setTitle(e.target.value);
    }
    const sendMeChangeHandler = (e) => {    //내게 쓰기로 바꿔주기
        setIsSendMe(e.target.checked ? true : false);
        setReceiver(e.target.checked ? '나에게 발송합니다.' : '');
    }
    const handleContent = (e) => {  //섬머노트에 쓴거
        setContent(e);
    }

    useEffect(() => {

    }, [content])

    return (
        <>
            <div className={style.container}>
                <div className={style.title}>메일 쓰기</div>
                <hr className={style.customHr} />
                <button onClick={() => { sendEmail('send') }} className={style.sendButton}>보내기</button>
                <button onClick={() => { sendEmail('reserve') }} className={style.reserveSend}>예약 전송</button>
                <input onChange={(e) => { dateChangeHandler(e) }} type="datetime-local" className={style.inputDate} value={reserveDate} />
                <button onClick={() => { sendEmail('temporary') }} className={style.temporarySave}>임시저장</button>
                <hr />
                <span className={style.receiverText}>받는 사람</span>
                <input disabled={isSendMe} onChange={(e) => { receiverChangeHandler(e) }} className={style.receiverInput} type="text" placeholder='누구에게 보내시나요?' value={receiver} />{!isSendMe ? <span style={{ marginLeft: '10px' }}>@witty.com</span> : <></>}
                <span className={style.sendMeText}>내게쓰기</span><input className={style.sendMeCheckBox} onChange={(e) => { sendMeChangeHandler(e) }} type="checkbox" />
                <br />
                <span className={style.titleText}>제 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 목</span>
                <input onChange={(e) => { titleChangeHandler(e) }} value={title} className={style.titleInput} type="text" checked={isSendMe} placeholder='제목을 입력하세요.' /><br />
                <input className={style.fileInput} type="file" /><hr />
                <RichTextEditor content={content} onContentChange={(e) => { handleContent(e) }} />
            </div>
        </>
    )
}

export default MailWrite;