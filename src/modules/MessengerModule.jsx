import { createActions, handleActions } from 'redux-actions'

/* 초기값 */
const initialState = {
    messengerLoginSettings: {
        chatroomCodeList: [],
        isRemainingChat: '',
    },
    messengerMain: {
        messengerCode: null,
        messengerPositionOption: '',
        messengerMiniAlarmOption: '',
        messengerTheme: '',
        chatroomList: []
        /* 
            {
                chatroomCode: null,
                chatroomTitle: '',
                chatroomFixedStatus: '',
                chatroomContent: '',
                chatroomChatDate: null,
                chatroomProfileFileURL: null,
                notReadChatCount: null
            }
         */
    },
    chatroomCode: null,
    chatroomData: {
        chatroomCode: null,
        chatroomTitle: '',
        chatroomProfileFileURL: '',
        lastReadChatCode: null,
        pinnedStatus: '',
        chatroomMemberList: [],
        chatList: [],
        recentPageNum: null,
        recentChatCode: null,
        recentPageChatCount: null,
    },
    employees: []
}

// export const GET_PROJECTS = 'project/GET_PROJECTS'
export const GET_LOGIN_SETTINGS = 'messenger/GET_LOGIN_SETTINGS'
export const GET_MESSENGER_MAIN = 'messenger/GET_MESSENGER'
// export const GET_MESSENGER_OPTIONS = 'messenger/GET_MESSENGER_OPTIONS'
export const PUT_MESSENGER_OPTIONS = 'messenger/MODIFY_MESSENGER_OPTIONS'
export const PUT_PINNED_CHATROOM = 'messenger/PUT_PINNED_CHATROOM'
export const POST_CHATROOM = 'messenger/POST_CHATROOM'
export const GET_CHATROOM = 'messenger/GET_CHATROOM'
export const GET_PREV_CHATS = 'messenger/GET_PREV_CHATS'
export const GET_EMPLOYEES = 'messenger/GET_EMPLOYEES'
export const POST_CHATROOM_MEMBER = 'messenger/POST_CHATROOM_MEMBER'
export const PUT_CHATROOM_PROFILE = 'messenger/PUT_CHATROOM_PROFILE'

const action = createActions({
    // [GET_PROJECTS]: () => { },
    [GET_LOGIN_SETTINGS]: () => { },
    [GET_MESSENGER_MAIN]: () => { },
    // [GET_MESSENGER_OPTIONS]: () => { },
    [PUT_MESSENGER_OPTIONS]: () => { },
    [PUT_PINNED_CHATROOM]: () => { },
    [POST_CHATROOM]: () => { },
    [GET_CHATROOM]: () => { },
    [GET_PREV_CHATS]: () => { },
    [GET_EMPLOYEES]: () => { },
    [POST_CHATROOM_MEMBER]: () => { },
    [PUT_CHATROOM_PROFILE]: () => { }
})

const messengerReducer = handleActions(
    {
        // [GET_PROJECTS]: (state, { payload }) => {
        //     return {
        //         ...state,
        //         projectListWithPaging: payload?.data
        //     }
        // },
        [GET_LOGIN_SETTINGS]: (state, { payload }) => {
            return {
                ...state,
                messengerLoginSettings: payload?.data
            }
        },
        [GET_MESSENGER_MAIN]: (state, { payload }) => {
            return {
                ...state,
                messengerMain: payload?.data
            }
        },
        // [GET_MESSENGER_OPTIONS]: (state, { payload }) => {
        //     return {
        //         ...state,
        //         messengerMain: {
        //             messengerPositionOption: payload?.data?.messengerPositionOption,
        //             messengerMiniAlarmOption: payload?.data?.messengerMiniAlarmOption,
        //             messengerTheme: payload?.data?.messengerTheme
        //         }
        //     }
        // },
        [PUT_MESSENGER_OPTIONS]: (state, { payload }) => {
            return {
                ...state,
                messengerMain: {
                    ...state.messengerMain,
                    messengerPositionOption: payload?.data?.messengerPositionOption,
                    messengerMiniAlarmOption: payload?.data?.messengerMiniAlarmOption,
                    messengerTheme: payload?.data?.messengerTheme
                }
            }
        },
        [PUT_PINNED_CHATROOM]: (state, { payload }) => {
            // payload?.data 는 chatroomCode 라는 Long 타입이다.
            const chatroomCode = payload?.data;
            const chatroomList = state.messengerMain.chatroomList;
            const notChangedChatroomList = chatroomList.filter(chatroom => chatroom.chatroomCode !== chatroomCode);
            const changedChatroomList = chatroomList.filter(chatroom => chatroom.chatroomCode === chatroomCode)
                .map(chatroom => ({ ...chatroom, chatroomFixedStatus: !chatroom.chatroomFixedStatus }))
            return {
                ...state,
                messengerMain: {
                    ...state.messengerMain,
                    chatroomList: [...notChangedChatroomList, ...changedChatroomList]
                }
            }
        },
        [POST_CHATROOM]: (state, { payload }) => {
            // payload?.data 는 chatroomCode 라는 Long 타입이다. 생성한 다음에 code를 반환받고 이를 한번더 요청한다.
            return {
                ...state,
                chatroomCode: payload?.data,
            }
        },
        [GET_CHATROOM]: (state, { payload }) => {
            return {
                ...state,
                chatroomData: payload?.data,
            }
        },
        [GET_PREV_CHATS]: (state, { payload }) => {
            const oldChatList = state.chatroomData.chatList;
            const newChatList = [...new Set([...payload?.data, ...oldChatList])];
            return {
                ...state,
                chatroomData: {
                    ...state.chatroomData,
                    chatList: newChatList
                }
            }
        },
        [GET_EMPLOYEES]: (state, { payload }) => {
            return {
                ...state,
                employees: payload?.data,
            }
        },
        [POST_CHATROOM_MEMBER]: (state, { payload }) => {
            return {
                ...state,
                chatroomData: {
                    ...state.chatroomData,
                    chatroomMemberList: payload?.data,
                },
            }
        },
        [PUT_CHATROOM_PROFILE]: (state, { payload }) => {
            console.log('사진 url', payload?.data);
            return {
                ...state,
                chatroomData: {
                    ...state.chatroomData,
                    chatroomProfileFileURL: payload?.data,
                },
            }
        }
    },
    initialState
)

export default messengerReducer
