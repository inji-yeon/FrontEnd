import { useEffect, useState } from 'react';
import styles from './chatroomCreateWindow.module.css'
import { callCreateChatroomAPI, callGetMessengerMainAPI } from '../../apis/MessengerAPICalls';
import { useDispatch } from 'react-redux';

function ChatroomCreateWindow({ setIsChatroomCreateWindow }) {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        chatroomTitle: '',
        chatroomFixedStatus: 'N',
    })
    const createHandler = (e) => {
        dispatch(callCreateChatroomAPI({ form }));
        setIsChatroomCreateWindow(false);
    }
    const gobackHandler = (e) => {
        setIsChatroomCreateWindow(false);
    }
    // callCreateChatroomAPI
    const formHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }
    useEffect(() => {
        form && console.log(form);
    }, [form])
    return (
        <>
            <div className={styles.messenger_body}>
                <div className={styles.messenger_body_1}>
                    <span>제목</span>
                    <input
                        type='text'
                        value={form.chatroomTitle}
                        onChange={formHandler}
                        name='chatroomTitle' />
                </div>
                <div className={styles.messenger_body_1}>
                    <span>고정여부</span>
                    <select
                        value={form.chatroomFixedStatus}
                        onChange={formHandler}
                        name='chatroomFixedStatus'>
                        <option value='Y'>O</option>
                        <option value='N'>X</option>
                    </select>
                </div>

                <div className={styles.button_wrap}>
                    <input type='button'
                        value='뒤로가기'
                        className={styles.goback}
                        onClick={gobackHandler} />
                    <input type='button'
                        value='만들기'
                        className={styles.create}
                        onClick={createHandler} />
                </div>
            </div>
        </>
    )
}
export default ChatroomCreateWindow
