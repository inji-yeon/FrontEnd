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
    PUT_CHATROOM_PROFILE
} from '../modules/MessengerModule'

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

        console.log('[MessengerAPICalls] callGetProjectsAPI RESULT : ', result)

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

        console.log('[MessengerAPICalls] callPinnedChatroomAPI RESULT : ', result)

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

export const callInviteChatroomMemberAPI = ({ chatroomCode, employeeCode }) => {
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

        dispatch({ type: POST_CHATROOM_MEMBER, payload: result?.data })
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