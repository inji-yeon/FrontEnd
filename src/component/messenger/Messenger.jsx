import { useEffect, useState } from 'react'
import styles from './messenger.module.css'
import ChatroomCreateWindow from './ChatroomCreateWindow'
import Chatroom from './Chatroom'

function Messenger() {
    const [searchText, setSearchText] = useState('')
    const [isMessengerOpen, setIsMessengerOpen] = useState(false)
    const [isChatroomCreateWindow, setIsChatroomCreateWindow] = useState(false); // 채팅방 생성 창
    const [isChatroomOpen, setIsChatroomOpen] = useState(false);
    // const [isMessengerOpen, setIsMessengerOpen] = useState(true)
    // const [isChatroomCreateWindow, setIsChatroomCreateWindow] = useState(true) // 채팅방 생성 창
    // const [isChatroomOpen, setIsChatroomOpen] = useState(true)

    const chatroomClickHandler = () => {
        setIsChatroomOpen(true);
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

    useEffect(() => {
        console.log(isChatroomOpen);
    }, [isChatroomOpen])

    return (
        <>
            <div className={styles.messenger_wrap}>
                {!isMessengerOpen ? (
                    <img
                        src='/messenger/temp_messenger_img.png'
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
                                <ChatroomCreateWindow />
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
                                        {/* 여기서 매핑 */}
                                        <div className={styles.chatroom_info}
                                            onClick={chatroomClickHandler}>
                                            <div className={styles.chatroom_info_1}>
                                                <img
                                                    src='/messenger/chatroom_profile.png'
                                                    alt='채팅방프로필'
                                                    className={styles.chatroom_img}
                                                />
                                                <div className={styles.chatroom_unread_count}>1</div>
                                            </div>
                                            <div className={styles.chatroom_info_2}>
                                                <span>마케팅팀</span>
                                                <img src='/messenger/tack.png' alt='고정' />
                                                <span className={styles.chatroom_info_people}>5</span>
                                            </div>
                                            <div className={styles.chatroom_info_3}>오후 2:25</div>
                                            <div className={styles.chatroom_info_4}>
                                                <img src='/messenger/temp_photo.png' alt='사진' />
                                                <span>사진을 보냈습니다.</span>
                                            </div>
                                        </div>
                                        <div className={styles.chatroom_info}>
                                            <div className={styles.chatroom_info_1}>
                                                <img
                                                    src='/messenger/chatroom_profile.png'
                                                    alt='채팅방프로필'
                                                    className={styles.chatroom_img}
                                                />
                                                <div className={styles.chatroom_unread_count}>1</div>
                                            </div>
                                            <div className={styles.chatroom_info_2}>
                                                <span>마케팅팀</span>
                                                <img src='/messenger/tack.png' alt='고정' />
                                                <span className={styles.chatroom_info_people}>5</span>
                                            </div>
                                            <div className={styles.chatroom_info_3}>오후 2:25</div>
                                            <div className={styles.chatroom_info_4}>
                                                <img src='/messenger/temp_photo.png' alt='사진' />
                                                <span>사진을 보냈습니다.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <Chatroom setIsChatroomOpen={setIsChatroomOpen} />
                ))}
            </div>
        </>
    )
}

export default Messenger
