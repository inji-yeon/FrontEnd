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
    employees: [],
    scrollingToChatCode: null,
    receivedChat: false,
}

// export const GET_PROJECTS = 'project/GET_PROJECTS'
export const GET_LOGIN_SETTINGS = 'messenger/GET_LOGIN_SETTINGS'
export const GET_MESSENGER_MAIN = 'messenger/GET_MESSENGER'
export const GET_MESSENGER_MAIN_BY_INVITE = 'messenger/GET_MESSENGER_MAIN_BY_INVITE'
// export const GET_MESSENGER_OPTIONS = 'messenger/GET_MESSENGER_OPTIONS'
export const PUT_MESSENGER_OPTIONS = 'messenger/MODIFY_MESSENGER_OPTIONS'
export const PUT_PINNED_CHATROOM = 'messenger/PUT_PINNED_CHATROOM'
export const POST_CHATROOM = 'messenger/POST_CHATROOM'
export const GET_CHATROOM = 'messenger/GET_CHATROOM'
export const GET_PREV_CHATS = 'messenger/GET_PREV_CHATS'
export const GET_EMPLOYEES = 'messenger/GET_EMPLOYEES'
export const POST_CHATROOM_MEMBER = 'messenger/POST_CHATROOM_MEMBER'
export const PUT_CHATROOM_PROFILE = 'messenger/PUT_CHATROOM_PROFILE'
export const RECEIVE_CHAT_IS_OPEN_CHATROOM = 'messenger/RECEIVE_CHAT_IS_OPEN_CHATROOM';
export const RECEIVE_CHAT_IS_NOT_OPEN_CHATROOM = 'messenger/RECEIVE_CHAT_IS_NOT_OPEN_CHATROOM';
export const PUT_CHAT_READ_STATUS = 'messenger/PUT_CHAT_READ_STATUS'
export const SCROLLING_TO_CHATCODE = 'messenger/SCROLLING_TO_CHATCODE'
export const RESET_SCROLLING_TO_CHATCODE = 'messenger/RESET_SCROLLING_TO_CHATCODE'
export const SHOW_RECEIVED_CHAT = 'messenger/SHOW_RECEIVED_CHAT'
export const RESET_SHOW_RECEIVED_CHAT = 'messenger/RESET_SHOW_RECEIVED_CHAT'
export const LEAVE_CHATROOM = 'messenger/LEAVE_CHATROOM'

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
    [PUT_CHATROOM_PROFILE]: () => { },
    [RECEIVE_CHAT_IS_OPEN_CHATROOM]: () => { },
    [RECEIVE_CHAT_IS_NOT_OPEN_CHATROOM]: () => { },
    [PUT_CHAT_READ_STATUS]: () => { },
    [SCROLLING_TO_CHATCODE]: () => { },
    [RESET_SCROLLING_TO_CHATCODE]: () => { },
    [SHOW_RECEIVED_CHAT]: () => { },
    [RESET_SHOW_RECEIVED_CHAT]: () => { },
    [LEAVE_CHATROOM]: () => { },
    [GET_MESSENGER_MAIN_BY_INVITE]: () => { }
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
        [GET_MESSENGER_MAIN_BY_INVITE]: (state, { payload }) => {
            return {
                ...state,
                messengerMain: {
                    ...state.messengerMain,
                    chatroomList: [
                        ...state.messengerMain.chatroomList,
                        {
                            ...payload,
                            chatroomMemberCount: payload.chatroomMemberCount + 1
                        }
                    ]
                }
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
                .map(chatroom => ({ ...chatroom, chatroomFixedStatus: chatroom.chatroomFixedStatus === 'Y' ? 'N' : 'Y' }))
            console.log('notChangedChatroomList', notChangedChatroomList);
            console.log('changedChatroomList', changedChatroomList);
            const newChatroomList = [...notChangedChatroomList, ...changedChatroomList]
                ?.sort((chatroom1, chatroom2) => {
                    if (chatroom1.chatroomFixedStatus === 'N' && chatroom2.chatroomFixedStatus === 'Y') {
                        return 1;
                    }
                    if (chatroom1.chatroomFixedStatus === 'Y' && chatroom2.chatroomFixedStatus === 'N') {
                        return -1;
                    }
                    if (chatroom1.chatroomChatDate === null && chatroom2.chatroomChatDate !== null) {
                        return 1;
                    }
                    if (chatroom1.chatroomChatDate !== null && chatroom2.chatroomChatDate === null) {
                        return -1;
                    }
                    return new Date(chatroom2.chatroomChatDate) - new Date(chatroom1.chatroomChatDate);
                })
            return {
                ...state,
                messengerMain: {
                    ...state.messengerMain,
                    chatroomList: newChatroomList
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
            const oldChatCodes = new Set(oldChatList.map(chat => chat.chatCode));
            const newChatList = [...payload?.data?.filter(chat => !oldChatCodes?.has(chat?.chatCode)), ...oldChatList];
            console.log('GET_PREV_CHATS>>>oldChatList>>>', oldChatList);
            console.log('GET_PREV_CHATS>>>newChatList>>>', newChatList);
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
            const chatroomList = payload?.data;
            const chatroomCode = payload?.chatroomCode;
            return {
                ...state,
                messengerMain: {
                    ...state.messengerMain,
                    chatroomList: [...state.messengerMain.chatroomList]
                        ?.map(chatroom => {
                            if (chatroom.chatroomCode === chatroomCode) {
                                return { ...chatroom, chatroomMemberCount: chatroom.chatroomMemberCount + 1 }
                            } else {
                                return chatroom;
                            }
                        })
                },
                chatroomData: {
                    ...state.chatroomData,
                    chatroomMemberList: chatroomList,
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
        },
        [RECEIVE_CHAT_IS_OPEN_CHATROOM]: (state, { payload }) => {
            console.log('받은 데이터>>>', payload);
            const chat = payload;
            const chatroomList = state?.messengerMain?.chatroomList;
            const oldChatroomList = chatroomList
                ?.filter(chatroom => chatroom?.chatroomCode !== chat.chatroomCode)
            const newChatroomList = chatroomList
                ?.filter(chatroom => chatroom?.chatroomCode === chat.chatroomCode)
            console.log('oldChatroomList', oldChatroomList);
            console.log('newChatroomList', newChatroomList);
            return {
                ...state,
                messengerMain: {
                    ...state.messengerMain,
                    chatroomList: [...oldChatroomList, {
                        ...newChatroomList[0],
                        chatroomChatDate: new Date(chat?.chatWriteDate).getTime(),
                        chatroomContent: chat?.chatContent,
                    }]
                },
                chatroomData: {
                    ...state.chatroomData,
                    chatList: [...state.chatroomData.chatList, chat]
                }
            }
        },
        [RECEIVE_CHAT_IS_NOT_OPEN_CHATROOM]: (state, { payload }) => {
            console.log('받은 데이터>>>', payload);
            const chat = payload;
            const chatroomList = state?.messengerMain?.chatroomList;
            const newChatroomList = chatroomList
                ?.filter(chatroom => chatroom?.chatroomCode === chat.chatroomCode)
                ?.map(chatroom => {
                    console.log('chatroom', chatroom);
                    console.log('chatroom.notReadChatCount', chatroom.notReadChatCount);
                    return {
                        ...chatroom,
                        chatroomChatDate: new Date(chat.chatWriteDate).getTime(),
                        chatroomContent: chat.chatContent,
                        notReadChatCount: chatroom.notReadChatCount + 1
                    }
                })
            const oldChatroomList = chatroomList
                ?.filter(chatroom => chatroom?.chatroomCode !== chat.chatroomCode);
            console.log('chat', chat);
            console.log('chatroomList', chatroomList);
            console.log('newChatroomList', newChatroomList);
            console.log('oldChatroomList', oldChatroomList);
            return {
                ...state,
                messengerMain: {
                    ...state?.messengerMain,
                    chatroomList: [...oldChatroomList, ...newChatroomList]
                }
            }
        },
        [PUT_CHAT_READ_STATUS]: (state, { payload }) => {
            console.log('PUT_CHAT_READ_STATUS>>state>>', state);
            console.log('PUT_CHAT_READ_STATUS>>payload>>', payload);
            const newChatroom = payload?.data;
            const chatroomList = state?.messengerMain?.chatroomList;
            console.log('PUT_CHAT_READ_STATUS>>>chatroomList>>>', chatroomList);
            const oldChatroomList = chatroomList?.filter(chatroom => chatroom?.chatroomCode !== newChatroom?.chatroomCode);
            console.log('sum', [...oldChatroomList, newChatroom]);
            return {
                ...state,
                messengerMain: {
                    ...state.messengerMain,
                    chatroomList: [newChatroom, ...oldChatroomList]
                }
            };
        },
        [SCROLLING_TO_CHATCODE]: (state, { payload }) => {
            return {
                ...state,
                scrollingToChatCode: payload,
            };
        },
        [RESET_SCROLLING_TO_CHATCODE]: (state, { payload }) => {
            return {
                ...state,
                receivedChat: false,
                scrollingToChatCode: null,
            };
        },
        [SHOW_RECEIVED_CHAT]: (state, { payload }) => {
            return {
                ...state,
                receivedChat: true,
            };
        },
        [RESET_SHOW_RECEIVED_CHAT]: (state, { payload }) => {
            return {
                ...state,
                receivedChat: false,
                scrollingToChatCode: null,
            };
        },
        [LEAVE_CHATROOM]: (state, { payload }) => {
            console.log(payload);
            const newChatroomList = state?.messengerMain?.chatroomList
                ?.filter(chatroom => chatroom?.chatroomCode !== payload?.data);
            console.log('newChatroomList', newChatroomList);
            return {
                ...state,
                messengerMain: {
                    ...state.messengerMain,
                    chatroomList: newChatroomList
                }
            }
        }
    },
    initialState
)

export default messengerReducer
