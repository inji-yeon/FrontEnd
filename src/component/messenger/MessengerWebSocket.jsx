import { useEffect, useState } from "react";
import { userEmployeeCode } from "../../utils/tokenUtils";
import { useWebSocket } from "../WebSocketContext";
import { useDispatch } from "react-redux";
import { callGetMessengerMainAPI, callReceiveChatAPI } from "../../apis/MessengerAPICalls";
import { GET_MESSENGER_MAIN, GET_MESSENGER_MAIN_BY_INVITE } from "../../modules/MessengerModule";

function MessengerWebSocket({ isChatroomOpen, chatroomList }) {
    const websocket = useWebSocket();
    const dispatch = useDispatch();

    // const [userEmployeeCode, setUserEmployeeCode] = useState(null);
    // useEffect(() => {
    //     setUserEmployeeCode(userEmployeeCode());
    // }, [])

    // useEffect(() => {
    //     chatroomList && console.log('웹소켓 페이지에서 chatroomList', chatroomList);
    // }, [chatroomList])

    useEffect(() => {
        if (websocket) {
            const url = `/topic/messenger/${userEmployeeCode()}`
            console.log('websocket 연결 잘 되는중!(messenger 요청용)', url);
            websocket.subscribe(url, (message) => {
                const form = JSON.parse(message.body);
                console.log('form>>>>', form);
                dispatch({ type: GET_MESSENGER_MAIN_BY_INVITE, payload: form }); // 새로운 초대를 받았을 경우. 다시 로딩함
            })
        }
        if (websocket) {
            for (let i = 0; i < chatroomList.length; i++) {
                const url = `/topic/messenger/chatrooms/${chatroomList[i].chatroomCode}`
                console.log('websocket 연결 잘 되는중!(채팅방목록)', url);
                websocket.subscribe(url, (message) => {
                    console.log('채팅 메시지 받음', message);
                    console.log('객체값>>>!', JSON.parse(message.body));
                    const form = JSON.parse(message.body);
                    dispatch(callReceiveChatAPI({ isChatroomOpen, form }))
                })
            }
        }
    }, [websocket])
    useEffect(() => {
        console.log('websocket>>isChatroomOpen>>', isChatroomOpen);
    }, [isChatroomOpen])
    return (
        <>
        </>)
}
export default MessengerWebSocket;