import { useEffect, useState } from "react";
import { userEmployeeCode } from "../../utils/tokenUtils";
import { useWebSocket } from "../WebSocketContext";
import { useDispatch } from "react-redux";
import { callReceiveChatAPI } from "../../apis/MessengerAPICalls";

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
            for (let i = 0; i < chatroomList.length; i++) {
                const url = `/topic/messenger/chatrooms/${chatroomList[i].chatroomCode}`
                console.log('websocket 연결 잘 되는중!', url);
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