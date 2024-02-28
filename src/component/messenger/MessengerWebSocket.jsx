import { useEffect, useState } from "react";
import { userEmployeeCode } from "../../utils/tokenUtils";
import { useWebSocket } from "../WebSocketContext";
import { useDispatch } from "react-redux";
import { callGetMessengerMainAPI, callReceiveChatAPI } from "../../apis/MessengerAPICalls";
import { GET_MESSENGER_MAIN, GET_MESSENGER_MAIN_BY_INVITE } from "../../modules/MessengerModule";

function MessengerWebSocket({ isChatroomOpen, chatroomList, messengerSubscription, setMessengerSubscription }) {
    const websocket = useWebSocket();
    const dispatch = useDispatch();

    useEffect(() => {
        if (websocket) {
            const url = `/topic/messenger/${userEmployeeCode()}`
            setMessengerSubscription(
                [...messengerSubscription,
                {
                    type: 'messenger'
                    , subscribe: websocket.subscribe(url, (message) => {
                        const form = JSON.parse(message.body);
                        dispatch({ type: GET_MESSENGER_MAIN_BY_INVITE, payload: form }); // 새로운 초대를 받았을 경우. 다시 로딩함
                    })
                }]
            )
        }
        if (websocket) {
            for (let i = 0; i < chatroomList.length; i++) {
                const url = `/topic/messenger/chatrooms/${chatroomList[i].chatroomCode}`
                setMessengerSubscription(
                    [...messengerSubscription,
                    {
                        type: 'chatroom' + i
                        , subscribe: websocket.subscribe(url, (message) => {
                            const form = JSON.parse(message.body);
                            dispatch(callReceiveChatAPI({ isChatroomOpen, form }))
                        })
                    }]
                )
            }
        }
    }, [websocket, chatroomList?.length])

    return (
        <>
        </>)
}
export default MessengerWebSocket;