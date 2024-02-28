import { useEffect, useState } from 'react'
import styles from './messenger.module.css'
import ChatroomCreateWindow from './ChatroomCreateWindow'
import Chatroom from './Chatroom'
import { useDispatch, useSelector } from 'react-redux'
import { callGetLoginSettingsAPI, callGetMessengerMainAPI, callGetMessengerOptionsAPI, callPinnedChatroomAPI, callSubscribeChatrooms } from '../../apis/MessengerAPICalls'
import { format, isToday } from 'date-fns'
import MessengerWebSocket from './MessengerWebSocket'
import { MESSENGER_ERROR } from '../../modules/MessengerModule'
import { useNavigate } from 'react-router-dom'

function Messenger() {
    const navigate = useNavigate()
    const [messengerSubscription, setMessengerSubscription] = useState([]); // 구독 정보를 저장하고 있기 위함.
    const [searchText, setSearchText] = useState('')
    const [isMessengerOpen, setIsMessengerOpen] = useState(false)
    const [isChatroomCreateWindow, setIsChatroomCreateWindow] = useState(false); // 채팅방 생성 창
    const [isChatroomOpen, setIsChatroomOpen] = useState(false);
    const dispatch = useDispatch();
    const messengerData = useSelector(state => state.messenger);
    const [chatroomList, setChatroomList] = useState([]);
    const [chatroomCode, setChatroomCode] = useState(null);

    useEffect(() => {
        if (messengerData?.error) {
            alert('오류가 발생했습니다. 로그인 페이지로 돌아갑니다.');
            navigate('/login');
            dispatch({ type: MESSENGER_ERROR, payload: '' });
        }
    }, [messengerData?.error])
    useEffect(() => {
        dispatch(callGetMessengerMainAPI());
    }, [])
    
    useEffect(() => {
        messengerData?.messengerMain?.chatroomList &&
            setChatroomList(messengerData?.messengerMain?.chatroomList);
    }, [messengerData?.messengerMain?.chatroomList])

    const chatroomClickHandler = (chatroomCode) => {
        setIsChatroomOpen(true);
        setChatroomCode(chatroomCode)
    }
    const chatroomCreateWindowHandler = () => {
        setIsChatroomCreateWindow(true)
    }
    const searchTextHandler = e => {
        setSearchText(e.target.value)
    }
    const searchTextResetHandler = () => {
        setSearchText('')
    }
    const exitHandler = () => {
        setIsMessengerOpen(false)
    }
    const chatroomCreateExitHandler = () => {
        setIsChatroomCreateWindow(false)
    }
    const messengerImgHandler = () => {
        setIsMessengerOpen(true)
    }

    const chatroomFixedHandler = (chatroomCode, e) => {
        e.stopPropagation();
        const result = window.confirm("해당 채팅방을 고정/고정해제 하시겠습니까?");
        result && dispatch(callPinnedChatroomAPI({ chatroomCode }))
    }
    return (
        <>
            {chatroomList && <MessengerWebSocket
                isChatroomOpen={isChatroomOpen}
                chatroomList={chatroomList}
                messengerSubscription={messengerSubscription}
                setMessengerSubscription={setMessengerSubscription} />}
            <div className={styles.messenger_wrap}>
                {!isMessengerOpen ? (
                    <img
                        src='/messenger/messenger_icon.png'
                        alt='메신저'
                        className={styles.messenger_logo}
                        onClick={messengerImgHandler}
                    />
                ) : (!isChatroomOpen ? (
                    <div className={styles.messenger_main}>
                        {isChatroomCreateWindow ? (
                            <>
                                <div className={styles.messenger_header}>
                                    <div className={styles.messenger_controls_section}>
                                        <img
                                            src='/messenger/x.png'
                                            alt='닫기'
                                            onClick={chatroomCreateExitHandler}
                                        />
                                    </div>
                                    <div className={styles.messenger_chatroom_create_header}>
                                        채팅방 만들기
                                    </div>
                                </div>
                                <ChatroomCreateWindow setIsChatroomCreateWindow={setIsChatroomCreateWindow} />
                            </>
                        ) : (
                            <>
                                <div className={styles.messenger_header}>
                                    <div className={styles.messenger_controls_section}>
                                        <img
                                            src='/messenger/x.png'
                                            alt='닫기'
                                            onClick={exitHandler}
                                        />
                                    </div>
                                    <div className={styles.messenger_sub_header}>
                                        <div className={styles.messenger_main_search}>
                                            <input
                                                type='text'
                                                className={styles.search_text}
                                                placeholder='Search'
                                                value={searchText}
                                                onChange={searchTextHandler}
                                            />
                                            <img
                                                src='/messenger/x_dark.png'
                                                alt='x'
                                                className={styles.search_img}
                                                onClick={searchTextResetHandler}
                                            />
                                        </div>
                                        <img
                                            src='/messenger/chatroom_create.png'
                                            alt='채팅방만들기'
                                            onClick={chatroomCreateWindowHandler}
                                        />
                                    </div>
                                </div>
                                <div className={styles.messenger_body}>
                                    <div className={styles.chatroom_list}>
                                        {chatroomList
                                            ?.sort((chatroom1, chatroom2) => {
                                                if (chatroom1.chatroomFixedStatus === 'N' && chatroom2.chatroomFixedStatus === 'Y') {
                                                    return 1;
                                                }
                                                if (chatroom1.chatroomFixedStatus === 'Y' && chatroom2.chatroomFixedStatus === 'N') {
                                                    return -1;
                                                }
                                                if (chatroom1.chatroomChatDate === null && chatroom2.chatroomChatDate !== null) {
                                                    return 1;
                                                }
                                                if (chatroom1.chatroomChatDate !== null && chatroom2.chatroomChatDate === null) {
                                                    return -1;
                                                }
                                                return new Date(chatroom2.chatroomChatDate) - new Date(chatroom1.chatroomChatDate);
                                            })
                                            ?.map(chatroom => {
                                                return (
                                                    <div className={styles.chatroom_info}
                                                        key={chatroom.chatroomCode}
                                                        onClick={() => chatroomClickHandler(chatroom.chatroomCode)}>
                                                        <div className={styles.chatroom_info_1}>
                                                            <img
                                                                src={`${chatroom.chatroomProfileFileURL ? `http://${process.env.REACT_APP_RESTAPI_IP}:1208/web-images/${chatroom.chatroomProfileFileURL}` : '/messenger/chatroom_profile.png'}`}
                                                                alt='채팅방프로필'
                                                                className={styles.chatroom_img}
                                                            />
                                                            {chatroom.notReadChatCount !== 0 && <div className={styles.chatroom_unread_count}>{chatroom.notReadChatCount}</div>}
                                                        </div>
                                                        <div className={styles.chatroom_info_2}>
                                                            <span>{chatroom.chatroomTitle}</span>
                                                            <img
                                                                src={`${chatroom.chatroomFixedStatus === 'Y' ? '/messenger/pinned.png' : '/messenger/not_pinned.png'}`}
                                                                alt={`${chatroom.chatroomFixedStatus === 'Y' ? '고정' : '고정해제'}`}
                                                                onClick={(e) => chatroomFixedHandler(chatroom.chatroomCode, e)} />
                                                            <span className={styles.chatroom_info_people}>{chatroom.chatroomMemberCount}</span>
                                                        </div>
                                                        <div className={styles.chatroom_info_3}>{
                                                            chatroom.chatroomChatDate
                                                                ? (format(chatroom.chatroomChatDate, isToday(chatroom.chatroomDate) ? '오늘 h:mm a' : 'yyyy-MM-dd', { timeZone: 'Asia/Seoul' }))
                                                                : ''
                                                        }</div>
                                                        <div className={styles.chatroom_info_4}>
                                                            {chatroom.chatroomChatDate
                                                                &&
                                                                (
                                                                    chatroom.chatroomContent
                                                                        ? <span>{chatroom.chatroomContent.length <= 10 ? chatroom.chatroomContent : chatroom.chatroomContent.slice(0,20) + "..."}</span>
                                                                        : (<>
                                                                            <img src='/messenger/temp_photo.png' alt='사진' />
                                                                            <span>사진을 보냈습니다.</span>
                                                                        </>))}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <Chatroom chatroomList={chatroomList} setIsChatroomOpen={setIsChatroomOpen} chatroomCode={chatroomCode} setChatroomCode={setChatroomCode} />
                ))}
            </div>
        </>
    )
}

export default Messenger