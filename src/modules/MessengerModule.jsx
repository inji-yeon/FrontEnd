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
    findChatList: null,
    employees: [],
    scrollingToChatCode: null,
    receivedChat: false,
    error: '',
}

export const GET_LOGIN_SETTINGS = 'messenger/GET_LOGIN_SETTINGS'
export const GET_MESSENGER_MAIN = 'messenger/GET_MESSENGER'
export const GET_MESSENGER_MAIN_BY_INVITE = 'messenger/GET_MESSENGER_MAIN_BY_INVITE'
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
export const MESSENGER_ERROR = 'messenger/ERROR'
export const GET_CHATS = 'messenger/GET_CHATS'

const action = createActions({
    [GET_LOGIN_SETTINGS]: () => { },
    [GET_MESSENGER_MAIN]: () => { },
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
    [GET_MESSENGER_MAIN_BY_INVITE]: () => { },
    [MESSENGER_ERROR]: () => { },
    [GET_CHATS]: () => { }
})

const messengerReducer = handleActions(
    {
        [GET_LOGIN_SETTINGS]: (state, { payload }) => {
            return {
                ...state,
                messengerLoginSettings: payload?.data
            }
        },
        [GET_MESSENGER_MAIN]: (state, { payload }) => {
            const chatroomList = payload?.data?.chatroomList;
            const groupedByChatroomCode = chatroomList.reduce((acc, obj) => {
                const key = obj.chatroomCode;
                if (!acc[key]) {
                    acc[key] = obj;
                }
                return acc;
            }, {});
            const uniqueChatrooms = Object.values(groupedByChatroomCode);

            return {
                ...state,
                messengerMain: {
                    ...payload?.data,
                    chatroomList: uniqueChatrooms
                }
            }
        },
        [GET_MESSENGER_MAIN_BY_INVITE]: (state, { payload }) => {
            return {
                ...state,
                messengerMain: {
                    ...state.messengerMain,
                    chatroomList: [...[...state.messengerMain.chatroomList]
                        ?.filter(chatroom => chatroom.chatroomCode !== payload.chatroomCode)
                        , {
                        ...payload,
                        chatroomMemberCount: payload.chatroomMemberCount + 1
                    }]
                }
            }
        },
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
            const chatroomCode = payload?.data;
            const chatroomList = state.messengerMain.chatroomList;
            const notChangedChatroomList = chatroomList.filter(chatroom => chatroom.chatroomCode !== chatroomCode);
            const changedChatroomList = chatroomList.filter(chatroom => chatroom.chatroomCode === chatroomCode)
                .map(chatroom => ({ ...chatroom, chatroomFixedStatus: chatroom.chatroomFixedStatus === 'Y' ? 'N' : 'Y' }))
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
            return {
                ...state,
                chatroomData: {
                    ...state.chatroomData,
                    chatroomProfileFileURL: payload?.data,
                },
            }
        },
        [RECEIVE_CHAT_IS_OPEN_CHATROOM]: (state, { payload }) => {
            const chat = payload;
            const chatroomList = state?.messengerMain?.chatroomList;
            const oldChatroomList = chatroomList
                ?.filter(chatroom => chatroom?.chatroomCode !== chat.chatroomCode)
            const newChatroomList = chatroomList
                ?.filter(chatroom => chatroom?.chatroomCode === chat.chatroomCode)
            const newChatList = [...state.chatroomData.chatList].filter(oldChat => oldChat?.chatCode !== chat?.chatCode)
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
                    chatList: [...newChatList, chat]
                }
            }
        },
        [RECEIVE_CHAT_IS_NOT_OPEN_CHATROOM]: (state, { payload }) => {
            const chat = payload;
            const chatroomList = state?.messengerMain?.chatroomList;
            const newChatroomList = chatroomList
                ?.filter(chatroom => chatroom?.chatroomCode === chat.chatroomCode)
                ?.map(chatroom => {
                    return {
                        ...chatroom,
                        chatroomChatDate: new Date(chat.chatWriteDate).getTime(),
                        chatroomContent: chat.chatContent,
                        notReadChatCount: chatroom.notReadChatCount + 1
                    }
                })
            const oldChatroomList = chatroomList
                ?.filter(chatroom => chatroom?.chatroomCode !== chat.chatroomCode);
            return {
                ...state,
                messengerMain: {
                    ...state?.messengerMain,
                    chatroomList: [...oldChatroomList, ...newChatroomList]
                }
            }
        },
        [PUT_CHAT_READ_STATUS]: (state, { payload }) => {
            const newChatroom = payload?.data;
            const chatroomList = state?.messengerMain?.chatroomList;
            const oldChatroomList = chatroomList?.filter(chatroom => chatroom?.chatroomCode !== newChatroom?.chatroomCode);
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
            const newChatroomList = state?.messengerMain?.chatroomList
                ?.filter(chatroom => chatroom?.chatroomCode !== payload?.data);
            return {
                ...state,
                messengerMain: {
                    ...state.messengerMain,
                    chatroomList: newChatroomList
                }
            }
        },
        [MESSENGER_ERROR]: (state, { payload }) => {
            return {
                ...state,
                error: payload,
            }
        },
        [GET_CHATS]: (state, { payload }) => {
            return {
                ...state,
                findChatList: payload?.data
            }
        }
    },
    initialState
)

export default messengerReducer
