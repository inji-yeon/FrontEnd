import { useEffect, useRef, useState } from 'react';
import styles from './chatroom.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callChangeChatroomProfileAPI, callGetChatroomAPI, callGetEmployeesAPI, callGetPrevChats, callInviteChatroomMemberAPI, callLeaveChatroomAPI, callUpdateChatReadStatus } from '../../apis/MessengerAPICalls';
import { userEmployeeCode } from '../../utils/tokenUtils';
import { format } from 'date-fns';
import { useWebSocket } from '../WebSocketContext';
import { RESET_SCROLLING_TO_CHATCODE, RESET_SHOW_RECEIVED_CHAT } from '../../modules/MessengerModule';

function Chatroom({ chatroomList, setIsChatroomOpen, chatroomCode, setChatroomCode }) {
    const websocket = useWebSocket();
    const messengerData = useSelector(state => state.messenger);
    const [isInviteWindow, setIsInviteWindow] = useState(false);
    const [isSearchInput, setIsSearchInput] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const dispatch = useDispatch();
    const isConnect = true;

    const [chatList, setChatList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [oldEmployeeList, setOldEmployeeList] = useState([]);
    const [oldEmployeeCodeList, setOldEmployeeCodeList] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [isMemberWindow, setIsMemberWindow] = useState(false);
    const profileInputRef = useRef(null);
    const [chatTextValue, setChatTextValue] = useState('');

    const [flag, setFlag] = useState(true);

    const chatContainerRef = useRef(null);


    useEffect(() => {
        console.log('messengerData?.scrollingToChatCode', messengerData?.scrollingToChatCode);
        if (messengerData?.scrollingToChatCode) {
            console.log('들어온 경우');
            scrollingToBottom();
        }
    }, [messengerData?.scrollingToChatCode])
    useEffect(() => {
        console.log('여기도 오는지 >>> messengerData?.messengerMain?.chatroomList >>>', messengerData?.messengerMain?.chatroomList);
        if (messengerData?.scrollingToChatCode) {
            scrollingToBottom();
            dispatch({ type: RESET_SCROLLING_TO_CHATCODE })
        }
    }, [chatroomList])
    const scrollingToBottom = () => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    const chatTextValueHandler = (e) => {
        setChatTextValue(e.target.value);
    }
    const sendChatHandler = () => {
        console.log('전송버튼 눌렀다!');
        const chatroomCode = messengerData?.chatroomData?.chatroomCode;

        websocket?.publish({
            destination: `/app/messenger/chatrooms/${chatroomCode}/send`,
            headers: { Authorization: 'Bearer ' + window.localStorage.getItem('accessToken') },
            body: JSON.stringify({
                chatContent: chatTextValue,
                chatFileName: '파일이름이다.', // 파일 이름이 있다면 여기에 설정
                chatFile: '사진데이터 예정', // 파일 데이터가 있다면 여기에 설정
                // chatFileURL: '', // 파일 URL이 있다면 여기에 설정
                isFileSend: 'N' // 파일을 전송했는지 여부에 대한 플래그
            })
        })

        setChatTextValue('');
    }

    const resetSearchNameHandler = (e) => {
        setSearchName('');
    }
    const searchNameHandler = (e) => {
        setSearchName(e.target.value);
    }
    const chatLoadingHandler = (e) => {
        const minChatCode = chatList?.reduce((min, chat) => Math.min(min, chat?.chatCode), Infinity);
        dispatch(callGetPrevChats({ chatroomCode, minChatCode }))
    }
    const scrollingToChat = (chatCode) => {
        const chatElement = chatContainerRef.current.querySelector(`#chat_${chatCode}`);
        if (chatElement) {
            chatElement.scrollIntoView({ block: 'start' });
        }
    };
    const searchButtonHandler = () => {
        setIsSearchInput(!isSearchInput)
        setIsInviteWindow(false);
        setIsMemberWindow(false);
    }
    const exitInviteHandler = () => {
        setIsInviteWindow(false);
        setIsMemberWindow(false);
    }

    const inviteHandler = (employeeCode) => {
        dispatch(callInviteChatroomMemberAPI({ chatroomCode, employeeCode, websocket }))

        websocket?.publish({
            destination: `/app/messenger/chatrooms/${chatroomCode}/invite`,
            headers: { Authorization: 'Bearer ' + window.localStorage.getItem('accessToken') },
            body: JSON.stringify({
                employeeCode
            })
        })
    }
    useEffect(() => {
        messengerData?.employees && setEmployeeList(messengerData?.employees);
    }, [messengerData?.employees])
    useEffect(() => {
        if (!flag2 && messengerData?.chatroomData?.lastReadChatCode) {
            console.log('실제로 이동하는가');
            scrollingToChat(messengerData?.chatroomData?.lastReadChatCode);
            setFlag2(true);
        }
    }, [chatroomList])
    useEffect(() => {
        isInviteWindow && dispatch(callGetEmployeesAPI());
    }, [isInviteWindow])
    useEffect(() => {
        chatContainerRef && console.log('chatConteinerRef.current', chatContainerRef.current);
    }, [chatContainerRef])
    useEffect(() => {
        oldEmployeeList
            && setOldEmployeeCodeList(oldEmployeeList?.map(oldEmployee => oldEmployee?.employeeCode));
    }, [oldEmployeeList]);
    useEffect(() => {
        oldEmployeeCodeList && console.log('oldEmployeeCodeList', oldEmployeeCodeList);
    }, [oldEmployeeCodeList])
    useEffect(() => {
        // 이곳이 생성되면 일단 chatroomCode를 통해 채팅 목록을 가지고 옴.(여기가 문제)
        chatroomCode
            && dispatch(callGetChatroomAPI({ chatroomCode }))
        // chatroomCode
        //     && dispatch(callUpdateChatReadStatus({ chatroomCode, chatCode }));
    }, [])

    useEffect(() => {
        messengerData?.chatroomData?.chatList && setChatList(messengerData?.chatroomData?.chatList)
    }, [messengerData?.chatroomData?.chatList])
    useEffect(() => {
        if (flag && chatList?.length) {
            console.log('chatList', chatList);
            const maxChatCode = Math.max(...chatList.map(chat => chat.chatCode));
            console.log('maxChatCode', maxChatCode);
            dispatch(callUpdateChatReadStatus({ chatroomCode, maxChatCode }));
            setFlag(false);
        }
    }, [chatList])
    useEffect(() => {
        const chatroomMemberList = messengerData?.chatroomData?.chatroomMemberList;
        setOldEmployeeList(chatroomMemberList?.map(chatroomMember => chatroomMember?.employee))
    }, [messengerData?.chatroomData?.chatroomMemberList])
    const inviteWindowHandler = () => {
        setIsInviteWindow(!isInviteWindow);
        setIsSearchInput(false);
    }
    const exitHandler = () => {
        setIsChatroomOpen(false);
        setChatroomCode(null);
    }
    const memberWindowHandler = () => {
        setIsMemberWindow(true);
        setIsInviteWindow(false);
    }
    const profileClickHandler = () => {
        profileInputRef.current.click();
    }
    const profileChangeHandler = (e) => {
        const file = e.target.files[0];
        dispatch(callChangeChatroomProfileAPI({ chatroomCode, file }))
    }
    const scrollingToBottomButtonHandler = () => {
        scrollingToBottom();
        dispatch({ type: RESET_SHOW_RECEIVED_CHAT })
        dispatch({ type: RESET_SCROLLING_TO_CHATCODE })
    }
    const leaveChatroomHandler = () => {
        const result = window.confirm('정말로 채팅방에 나가시겠습니까?');
        result && dispatch(callLeaveChatroomAPI({ chatroomCode }))
        result && setIsChatroomOpen(false);
    }
    return (
        <>
            <div className={styles.chatroom_main}>
                <div className={styles.chatroom_header}>
                    <img src={messengerData?.chatroomData?.chatroomProfileFileURL ? `http://${process.env.REACT_APP_RESTAPI_IP}:1208/web-images/${messengerData?.chatroomData?.chatroomProfileFileURL}` : "/messenger/temp_messenger_img.png"}
                        alt="채팅방프로필" className={styles.chatroom_header_1}
                        onClick={profileClickHandler} />
                    <input
                        type="file"
                        ref={profileInputRef}
                        style={{ display: 'none' }}
                        onChange={profileChangeHandler}
                    />
                    <div className={styles.chatroom_header_2}>
                        <div className={styles.chatroom_title}>{messengerData?.chatroomData?.chatroomTitle}</div>
                        <div className={styles.chatroom_member_count}>
                            <img src="/messenger/member_count.png" alt="인원"
                                onClick={memberWindowHandler} />
                            <span>{messengerData?.chatroomData?.chatroomMemberList?.length}</span>
                        </div>
                    </div>
                    <div className={styles.chatroom_additional}>
                        <img src="/messenger/member_invite.png" alt="초대"
                            onClick={inviteWindowHandler} />
                        <img src="/messenger/chat_search.png" alt="검색"
                            onClick={searchButtonHandler} />
                    </div>
                    <img
                        src="/messenger/x_dark.png"
                        alt="닫기"
                        className={styles.exit}
                        onClick={exitHandler} />
                </div>
                <div className={styles.chatroom_body}>
                    {/* 
                    chat_element -> 일반적인 채팅
                    chat_element_divide -> 채팅일자가 넘어가는 부분에서 발생
                    chat_element_me -> 현재 가지고 있는 토큰값을 이용해서 code값이 동일할 경우 생기는 스타일
                 */}
                    <div ref={chatContainerRef} className={styles.chat_body_text}>
                        <div className={styles.chat_elements_paging}>
                            <img src="/messenger/arrowToTop.png" alt="이전 채팅 불러오기" onClick={chatLoadingHandler} />
                        </div>
                        {chatList?.map(chat => {
                            console.log('불린', messengerData?.chatroomData?.lastReadChatCode === chat?.chatCode);
                            return (
                                <div className={`${chat?.chatroomMember?.employee?.employeeCode !== userEmployeeCode() ? styles.chat_element : styles.chat_element_me} ${messengerData?.chatroomData?.lastReadChatCode === chat?.chatCode ? styles.read_status : ''}`}
                                    key={chat?.chatCode}
                                    id={`chat_${chat?.chatCode}`}>
                                    <img src={chat?.chatroomMember?.employee?.profileList
                                        ? (chat?.chatroomMember?.employee?.profileList[0]?.profileChangedFile
                                            ? `http://${process.env.REACT_APP_RESTAPI_IP}:1208/web-images/${chat?.chatroomMember?.employee?.profileList[0]?.profileChangedFile}`
                                            : "/messenger/temp_messenger_img.png")
                                        : "/messenger/temp_messenger_img.png"}
                                        alt="프로필사진" className={styles.chat_element_row_1} />
                                    <div className={styles.chat_element_row_2}>
                                        <div className={styles.sender}>
                                            {chat?.chatroomMember?.employee?.employeeName}
                                        </div>
                                        <div className={styles.letter}>
                                            {chat?.chatContent}
                                        </div>
                                    </div>
                                    <div className={styles.chat_element_row_3}>
                                        {format(chat?.chatWriteDate, "yyyy-MM-dd HH:mm", { timeZone: 'Asia/Seoul' })}
                                        <br />
                                        {messengerData?.chatroomData?.lastReadChatCode === chat?.chatCode ? '[최근에 읽은 채팅]' : ''}
                                    </div>
                                </div>)
                        })}
                    </div>
                    {messengerData?.receivedChat
                        && <div className={styles.scroll_to_bottom} >
                            <img src="/messenger/arrowToTop.png" alt="맨 아래로 내려가기" onClick={scrollingToBottomButtonHandler} />
                        </div>}
                    <div className={styles.chatroom_body_write_wrap}>
                        <textarea className={styles.chatroom_body_write}
                            value={chatTextValue}
                            onChange={chatTextValueHandler} />
                        <div className={styles.chatroom_body_write_button_wrap}>
                            {/* <img src="/messenger/temp_photo.png" alt="" className={styles.photo} /> */}
                            {/* <input type="button" value="사진전송" className={styles.hidden_photo_button} /> */}
                            <input type="button" value="전송" className={styles.submit}
                                onClick={sendChatHandler} />
                        </div>
                    </div>
                </div>
            </div>
            {isMemberWindow && (<div className={styles.chatroom_invite_wrap}>
                <img
                    src="/messenger/x_dark.png"
                    alt="닫기"
                    className={styles.invite_exit}
                    onClick={exitInviteHandler}
                />
                <div className={styles.chatroom_invite}>
                    <div className={styles.messenger_member_search}>
                        <label>검색</label>
                        <input type='button' value='x'
                            onClick={resetSearchNameHandler} />
                        <input type='text'
                            value={searchName}
                            onChange={searchNameHandler} />
                    </div>
                    <div className={styles.messenger_member_list}>
                        <table>
                            <tbody>
                                {oldEmployeeList
                                    ?.filter(employee => {
                                        return (employee?.employeeName.includes(searchName));
                                    })?.map((employee) => {
                                        return (
                                            <tr key={employee?.employeeCode}>
                                                <td>
                                                    <div className={styles.member_buttons}>
                                                        {employee?.employeeCode === userEmployeeCode()
                                                            && <input type='button' value='나가기' onClick={leaveChatroomHandler} />}
                                                    </div>
                                                    <div className={styles.member_info}>
                                                        <div className={styles.member_list_img_and_name}>
                                                            <img
                                                                src={employee?.profileList ? (employee.profileList[0]?.profileChangedFile ?? "/messenger/temp_messenger_img.png") : "/messenger/temp_messenger_img.png"}
                                                                alt='멤버사진'
                                                            />
                                                            <span>{employee?.employeeName}</span>
                                                        </div>
                                                        <div className={styles.member_list_dept_and_position}>
                                                            <span>{employee?.department?.departmentName}</span>
                                                            <span>{employee?.job?.jobName}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>)
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            )}
            {isInviteWindow && (<div className={styles.chatroom_invite_wrap}>
                <img
                    src="/messenger/x_dark.png"
                    alt="닫기"
                    className={styles.invite_exit}
                    onClick={exitInviteHandler}
                />
                <div className={styles.chatroom_invite}>
                    <div className={styles.messenger_member_search}>
                        <label>검색</label>
                        <input type='button' value='x'
                            onClick={resetSearchNameHandler} />
                        <input type='text'
                            value={searchName}
                            onChange={searchNameHandler} />
                    </div>
                    <div className={styles.messenger_member_list}>
                        <table>
                            <tbody>
                                {employeeList
                                    ?.filter(employee => {
                                        return (employee?.employeeName.includes(searchName)
                                            && !oldEmployeeCodeList.includes(employee?.employeeCode));
                                    })?.map((employee) => {
                                        return (
                                            <tr key={employee?.employeeCode}>
                                                <td>
                                                    <div className={styles.member_buttons}>
                                                        {(userEmployeeCode() === employee?.employeeCode) && <input type='button' value='나가기' />}
                                                        {(!oldEmployeeCodeList.includes(employee?.employeeCode)) && <input
                                                            type='button'
                                                            value='초대하기'
                                                            onClick={() => inviteHandler(employee?.employeeCode)}
                                                        />}
                                                    </div>
                                                    <div className={styles.member_info}>
                                                        <div className={styles.member_list_img_and_name}>
                                                            <img
                                                                src={employee?.profileList ? (employee.profileList[0]?.profileChangedFile ?? "/messenger/temp_messenger_img.png") : "/messenger/temp_messenger_img.png"}
                                                                alt='멤버사진'
                                                            />
                                                            <span>{employee?.employeeName}</span>
                                                        </div>
                                                        <div className={styles.member_list_dept_and_position}>
                                                            <span>{employee?.department?.departmentName}</span>
                                                            <span>{employee?.job?.jobName}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>)
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            )}
            {isSearchInput
                && <div className={styles.chatroom_search}>
                    <div className={styles.search_wrap}>
                        <input type='button' value='검색' />
                        <input type='text' placeholder='내용 입력' />
                    </div>
                    <div className={styles.search_result_wrap}>
                        <div className={styles.chat_element}>
                            <img src="/messenger/temp_messenger_img.png" alt="프로필사진" className={styles.chat_element_row_1} />
                            <div className={styles.chat_element_row_2}>
                                <div className={styles.sender}>
                                    인사팀
                                </div>
                                <div className={styles.letter}>
                                    안녕하세요, 2024년 청룡의 해를 맞아 인사
                                    드립니다 :)<br />
                                    2024 All-Hands 관련 안내사항을 공지 게시
                                    판에 업로드 하였으며, 문의사항이 있으실 경
                                    우 해당 채널 혹은 개인 메신저로 질문 주시면 바로 답변 전달드리겠습니다.<br />
                                    더불어, Witty Wave 구성원분들의 새해 계
                                    획을 공유하는 세션이 마련되어 있으니 댓글
                                    로 많은 참여 부탁드립니다!
                                </div>
                            </div>
                            <div className={styles.chat_element_row_3}>
                                오전 9:00
                            </div>
                        </div>
                        <div className={styles.chat_element}>
                            <img src="/messenger/temp_messenger_img.png" alt="프로필사진" className={styles.chat_element_row_1} />
                            <div className={styles.chat_element_row_2}>
                                <div className={styles.sender}>
                                    인사팀
                                </div>
                                <div className={styles.letter}>
                                    안녕하세요, 2024년 청룡의 해를 맞아 인사
                                    드립니다 :)<br />
                                    2024 All-Hands 관련 안내사항을 공지 게시
                                    판에 업로드 하였으며, 문의사항이 있으실 경
                                    우 해당 채널 혹은 개인 메신저로 질문 주시면 바로 답변 전달드리겠습니다.<br />
                                    더불어, Witty Wave 구성원분들의 새해 계
                                    획을 공유하는 세션이 마련되어 있으니 댓글
                                    로 많은 참여 부탁드립니다!
                                </div>
                            </div>
                            <div className={styles.chat_element_row_3}>
                                오전 9:00
                            </div>
                        </div>
                        <div className={styles.chat_elements_divide}>
                            <div>2024년 1월 3일</div>
                        </div>
                        <div className={styles.chat_element}>
                            <img src="/messenger/temp_messenger_img.png" alt="프로필사진" className={styles.chat_element_row_1} />
                            <div className={styles.chat_element_row_2}>
                                <div className={styles.sender}>
                                    인사팀
                                </div>
                                <div className={styles.letter}>
                                    안녕하세요, 2024년 청룡의 해를 맞아 인사
                                    드립니다 :)<br />
                                    2024 All-Hands 관련 안내사항을 공지 게시
                                    판에 업로드 하였으며, 문의사항이 있으실 경
                                    우 해당 채널 혹은 개인 메신저로 질문 주시면 바로 답변 전달드리겠습니다.<br />
                                    더불어, Witty Wave 구성원분들의 새해 계
                                    획을 공유하는 세션이 마련되어 있으니 댓글
                                    로 많은 참여 부탁드립니다!
                                </div>
                            </div>
                            <div className={styles.chat_element_row_3}>
                                오전 9:00
                            </div>
                        </div>
                        <div className={styles.chat_element_me}>
                            <div className={styles.letter}>
                                안녕하세요, 2024년 청룡의 해를 맞아 인사
                                드립니다 :)<br />
                                2024 All-Hands 관련 안내사항을 공지 게시
                                판에 업로드 하였으며, 문의사항이 있으실 경
                                우 해당 채널 혹은 개인 메신저로 질문 주시면 바로 답변 전달드리겠습니다.<br />
                                더불어, Witty Wave 구성원분들의 새해 계
                                획을 공유하는 세션이 마련되어 있으니 댓글
                                로 많은 참여 부탁드립니다!
                            </div>
                            <div className={styles.chat_element_row_3}>
                                오전 9:00
                            </div>
                        </div>
                        <div className={styles.chat_element_me}>
                            <div className={styles.letter}>
                                안녕합니다
                            </div>
                            <div className={styles.chat_element_row_3}>
                                오전 9:00
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default Chatroom;