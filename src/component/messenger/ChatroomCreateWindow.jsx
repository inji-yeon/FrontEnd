import { useState } from 'react';
import styles from './chatroomCreateWindow.module.css'

function ChatroomCreateWindow() {
    const [title, setTitle] = useState('');
    return (
        <>
            <div className={styles.messenger_body}>
                <div className={styles.messenger_body_1}>
                    <label>제목</label>
                    <input
                        type='text'
                        value={title}

                    />
                </div>
                <div className={styles.messenger_body_2}>
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
                <input type='button' value='만들기' className={styles.create} />
            </div>
        </>
    )
}
export default ChatroomCreateWindow
