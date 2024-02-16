import { Client } from "@stomp/stompjs";
import { createContext, useContext, useEffect, useState } from "react";
import { fet } from "../apis/MailAPI";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({children}) => {
    const [websocket, setWebsocket] = useState(null);   //웹소켓이다.
    const [me, setMe] = useState(null);                 //유저의 코드이다.
    useEffect(()=>{
        if(websocket){
            websocket.subscribe(`/topic/mail/alert/${me}`, (message) => {
                console.log('메세지 받음 :',message.body);
            });
        }
    },[me,websocket])
    useEffect(()=>{
        const client = new Client({
            brokerURL: 'ws://localhost:1208/websocket', //웹소켓 연결 엔드포인트
            reconnectDelay: 5000,   //자동으로 연결이 끊어진 경우 다시 연결하기까지 5초
            heartbeatIncoming: 4000,    //4초간 연결이 없으면 연결이 끊어졌다고 가정한다.
            heartbeatOutgoing: 4000,    //서버로 4초마다 하트비트 메세지를 보내며 연결상태를 유지한다.
          });
          
          client.activate();    //연결을 시도한다.
 
          //서버와 연결에 성공하면 이 함수가 호출된다.
          client.onConnect = () => {
            console.log('웹 소켓 서버와 연결 됨');
            // fet('http://localhost:1208/get-user-code')
            // .then(res => res.json())
            // .then(data => {
            //     if(data.data){
            //         setMe(data.data.employeeCode);
            //     }
            // })
            // setWebsocket(client);
          };
          /**
           * 연결에 실패하면 이 함수가 호출된다.
           * @param {*} frame 에러 내용을 담고 있는 메게변수다.
           */
          client.onStompError = (frame) => {
            console.log('에러 :', frame.headers['message']);
            console.log('추가적인 내용 :', frame.body);
          };
          //최대한 알아보기 쉽게 필요없는거 다 줄였음.
    },[])
    return (
        <WebSocketContext.Provider value={websocket}>
            {children}
        </WebSocketContext.Provider>
    )
}

export const useWebSocket = () => useContext(WebSocketContext);