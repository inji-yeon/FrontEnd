import axios from 'axios'
import {
    GET_LOGIN_SETTINGS,
    GET_MESSENGER_MAIN,
    GET_MESSENGER_OPTIONS,
    MODIFY_MESSENGER_OPTIONS,
    PUT_PINNED_CHATROOM,
    POST_CHATROOM,
    GET_CHATROOM,
    GET_EMPLOYEES,
    POST_CHATROOM_MEMBER,
    GET_PREV_CHATS,
    PUT_CHATROOM_PROFILE,
    RECEIVE_CHAT_IS_OPEN_CHATROOM,
    RECEIVE_CHAT_IS_NOT_OPEN_CHATROOM,
    PUT_CHAT_READ_STATUS,
    SCROLLING_TO_CHATCODE,
    RESET_SCROLLING_TO_CHATCODE,
    SHOW_RECEIVED_CHAT,
    RESET_SHOW_RECEIVED_CHAT,
    LEAVE_CHATROOM
} from '../modules/MessengerModule'
import { userEmployeeCode } from '../utils/tokenUtils';

export const callGetLoginSettingsAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/messenger/login-settings`;
    return async (dispatch, getState) => {
        const result = await axios
            .get(requestURL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[MessengerAPICalls] callGetLoginSettingsAPI RESULT : ', result)

        dispatch({ type: GET_LOGIN_SETTINGS, payload: result?.data })
    }
}

export const callGetMessengerMainAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/messenger/chatrooms`;
    return async (dispatch, getState) => {
        const result = await axios
            .get(requestURL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[MessengerAPICalls] callGetMessengerMainAPI RESULT : ', result)

        dispatch({ type: GET_MESSENGER_MAIN, payload: result?.data })
    }
}

// export const callGetMessengerOptionsAPI = () => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/messenger/options`;
//     return async (dispatch, getState) => {
//         const result = await axios
//             .get(requestURL, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accept: '*/*',
//                     Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
//                 }
//             })
//             .then(response => {
//                 return response
//             }).catch(error => console.error(error))
//         // 에러 처리 해야 된다.

//         console.log('[MessengerAPICalls] callGetMessengerMainAPI RESULT : ', result)

//         dispatch({ type: GET_MESSENGER_OPTIONS, payload: result?.data })
//     }
// }

export const callPinnedChatroomAPI = ({ chatroomCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/messenger/chatrooms/${chatroomCode}`;
    return async (dispatch, getState) => {
        const result = await axios
            .put(requestURL, null, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[MessengerAPICalls] callPinnedChatroomAPI RESULT : ', result)

        dispatch({ type: PUT_PINNED_CHATROOM, payload: result?.data })
    }
}

export const callCreateChatroomAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/messenger/chatrooms`;
    return async (dispatch, getState) => {
        const result = await axios
            .post(requestURL, form, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[MessengerAPICalls] callCreateChatroomAPI RESULT : ', result)

        dispatch({ type: POST_CHATROOM, payload: result?.data })

        dispatch(callGetMessengerMainAPI()); // 채팅방 목록을 갱신해줘야 하므로.
    }
}

export const callGetChatroomAPI = ({ chatroomCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/messenger/chatrooms/${chatroomCode}`;
    return async (dispatch, getState) => {
        const result = await axios
            .get(requestURL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[MessengerAPICalls] callGetChatroomAPI RESULT : ', result)

        dispatch({ type: GET_CHATROOM, payload: result?.data })
    }
}

export const callUpdateChatReadStatus = ({ chatroomCode, maxChatCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/messenger/chatrooms/${chatroomCode}/read-status-update?chat=${maxChatCode}`;
    return async (dispatch, getState) => {
        const result = await axios
            .put(requestURL, null, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[MessengerAPICalls] callUpdateChatReadStatus RESULT : ', result)

        dispatch({ type: PUT_CHAT_READ_STATUS, payload: result?.data })
        // dispatch(callGetMessengerMainAPI())
    }
}

export const callGetEmployeesAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/messenger/employees`;
    return async (dispatch, getState) => {
        const result = await axios
            .get(requestURL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[MessengerAPICalls] callGetChatroomAPI RESULT : ', result)

        dispatch({ type: GET_EMPLOYEES, payload: result?.data })
    }
}

export const callInviteChatroomMemberAPI = ({ chatroomCode, employeeCode, websocket }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/messenger/chatrooms/${chatroomCode}/invite/${employeeCode}`;
    return async (dispatch, getState) => {
        const result = await axios
            .put(requestURL, null, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[MessengerAPICalls] callInviteChatroomMemberAPI RESULT : ', result)

        dispatch({ type: POST_CHATROOM_MEMBER, payload: { ...result?.data, chatroomCode } })
    }
}

export const callGetPrevChats = ({ chatroomCode, minChatCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/messenger/chatrooms/${chatroomCode}/paging/${minChatCode}`;
    return async (dispatch, getState) => {
        const result = await axios
            .get(requestURL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[MessengerAPICalls] callGetPrevChats RESULT : ', result)

        dispatch({ type: GET_PREV_CHATS, payload: result?.data })
    }
}

export const callChangeChatroomProfileAPI = ({ chatroomCode, file }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/messenger/chatrooms/${chatroomCode}/profile`;

    const formData = new FormData();
    formData.append('file', file);
    console.log('file', file);
    console.log('formData.get("file").name()', formData.get("file").name);
    return async (dispatch, getState) => {
        const result = await axios
            .put(requestURL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[MessengerAPICalls] callChangeChatroomProfileAPI RESULT : ', result)

        dispatch({ type: PUT_CHATROOM_PROFILE, payload: result?.data })
    }
}

export const callReceiveChatAPI = ({ isChatroomOpen, form }) => {
    console.log('callReceiveChatAPI>>isChatroomOpen>>', isChatroomOpen);
    return async (dispatch, getState) => {
        const chat = form;
        const messengerData = getState()?.messenger;
        console.log('chat>><<', chat);
        console.log('messengerData>><<', messengerData);
        console.log('isChatroomOpen', !isChatroomOpen);
        if (!isChatroomOpen && messengerData?.chatroomData?.chatroomCode === form.chatroomCode) {
            console.log('RECEIVE_CHAT_IS_OPEN_CHATROOM');
            dispatch({ type: RECEIVE_CHAT_IS_OPEN_CHATROOM, payload: form });
            const chatroomCode = form.chatroomCode;
            const maxChatCode = form.chatCode;
            dispatch(callUpdateChatReadStatus({ chatroomCode, maxChatCode }))
            if (chat?.chatroomMember?.employee?.employeeCode === userEmployeeCode()) {
                // 만약에 내가 보낸 채팅이고 이를 받은거라면 스크롤 하고 바로 reset 한다.
                console.log('채팅받았는지, ', chat.chatCode);
                dispatch({ type: SCROLLING_TO_CHATCODE, payload: chat.chatCode })
            } else {
                // 내가 보낸 채팅이 아니지만 받은경우. 일단 아래에 무언가 있다고 표시하고. 바로 reset 한다. 
                dispatch({ type: SHOW_RECEIVED_CHAT })
            }
        }
        else {
            /* 채팅방을 보고 있지 않은 경우 */
            console.log('RECEIVE_CHAT_IS_NOT_OPEN_CHATROOM');
            dispatch({ type: RECEIVE_CHAT_IS_NOT_OPEN_CHATROOM, payload: form });
        }
    }
}

export const callLeaveChatroomAPI = ({ chatroomCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/messenger/chatrooms/${chatroomCode}/leave`;
    return async (dispatch, getState) => {
        const result = await axios
            .delete(requestURL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[MessengerAPICalls] callLeaveChatroomAPI RESULT : ', result)

        dispatch({ type: LEAVE_CHATROOM, payload: result?.data })
    }
}