import { useEffect, useState } from 'react';
import styles from './chatroom.module.css';

function Chatroom({ setIsChatroomOpen }) {
    const [isInviteWindow, setIsInviteWindow] = useState(false);
    const [isSearchInput, setIsSearchInput] = useState(false);
    const searchButtonHandler = () => {
        setIsSearchInput(!isSearchInput)
        setIsInviteWindow(false);
    }
    useEffect(() => {
        isInviteWindow && console.log(isInviteWindow, 'isInviteWindow');
    }, [isInviteWindow])
    const inviteHandler = () => {
        setIsInviteWindow(!isInviteWindow);
        setIsSearchInput(false);
    }
    const exitHandler = () => {
        setIsChatroomOpen(false);
    }
    return (
        <>
            <div className={styles.chatroom_main}>
                <div className={styles.chatroom_header}>
                    <img src="/messenger/temp_messenger_img.png" alt="채팅방프로필" className={styles.chatroom_header_1} />
                    <div className={styles.chatroom_header_2}>
                        <div className={styles.chatroom_title}>Witty Wave 공지방</div>
                        <div className={styles.chatroom_member_count}>
                            <img src="/messenger/member_count.png" alt="인원" />
                            <span>134</span>
                        </div>
                    </div>
                    <div className={styles.chatroom_additional}>
                        <img src="/messenger/member_invite.png" alt="초대"
                            onClick={inviteHandler} />
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
                    <div className={styles.chat_body_text}>
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
                    <div className={styles.chatroom_body_write_wrap}>
                        <textarea className={styles.chatroom_body_write} />
                        <div className={styles.chatroom_body_write_button_wrap}>
                            <img src="/messenger/temp_photo.png" alt="" className={styles.photo} />
                            <input type="button" value="사진전송" className={styles.hidden_photo_button} />
                            <input type="button" value="전송" className={styles.submit} />
                        </div>
                    </div>
                </div>
            </div>
            {isInviteWindow
                && <div className={styles.chatroom_invite_wrap}>
                    <img
                        src="/messenger/x_dark.png"
                        alt="닫기"
                        className={styles.invite_exit}
                        onClick={inviteHandler}
                    />
                    <div className={styles.chatroom_invite}>
                        <div className={styles.messenger_member_checked_list}>
                            <div>
                                <img
                                    src='/messenger/temp_messenger_img.png'
                                    alt='프로필사진'
                                    className={styles.member_img}
                                />
                                <div className={styles.member_name}>OOO</div>
                                <div className={styles.member_cancel}>x</div>
                            </div>
                            <div>
                                <img
                                    src='/messenger/temp_messenger_img.png'
                                    alt='프로필사진'
                                    className={styles.member_img}
                                />
                                <div className={styles.member_name}>OOO</div>
                                <div className={styles.member_cancel}>x</div>
                            </div>
                        </div>
                        <div className={styles.messenger_member_search}>
                            <label>검색</label>
                            <input type='button' value='x' />
                            <input type='text' />
                        </div>
                        <div className={styles.messenger_member_list}>
                            <table>
                                <tr>
                                    <td>
                                        <div className={styles.member_list_img_and_name}>
                                            <img
                                                src='/messenger/temp_messenger_img.png'
                                                alt='멤버사진'
                                            />
                                            <span>OOO</span>
                                        </div>
                                        <div className={styles.member_list_dept_and_position}>
                                            <span>개발본부</span>
                                            <span>팀장</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={styles.member_list_img_and_name}>
                                            <img
                                                src='/messenger/temp_messenger_img.png'
                                                alt='멤버사진'
                                            />
                                            <span>OOO</span>
                                        </div>
                                        <div className={styles.member_list_dept_and_position}>
                                            <span>개발본부</span>
                                            <span>팀장</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>}
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