import { createActions, handleActions } from "redux-actions";

/* 상태 초기값 initialState */
const initialState = {

    board: null,
    boardList: [],
    loading: false,
    error: null,

}


/* 액션 타입 정의 */
export const GET_BOARDS = 'board/GET_BOARDS';

export const POST_BOARD = 'board/POST_BOARD';
export const PUT_BOARD = 'board/PUT_BOARD';
export const DELETE_BOARD = 'board/DELETE_BOARD';
// export const PUT_NOTICE_POSTS = 'board/PUT_NOTICE_POSTS';
// export const DELETE_MANY_POSTS = 'board/DELETE_MANY_POSTS';




/* 액션 생성자 */
const action = createActions({

    [GET_BOARDS] : () => {},
    [POST_BOARD]: () => {},
    [PUT_BOARD]: () => {},
    [DELETE_BOARD]: () => {},

    // [PUT_NOTICE_POSTS]: () => {},
    // [DELETE_MANY_POSTS]: () => {},
});




/* 리듀서 */
const boardReducer = handleActions({

    [GET_BOARDS] : (state, {payload}) => {

        return {
            ...state,
            boardList : payload,
        }
    },

    [POST_BOARD]: () => (state, {payload}) => {

        return {
            ...state,
            board : payload,
        }
    },

    [PUT_BOARD]: () => (state, {payload}) => {

        return {
            ...state,
            board : payload,
        }
    },
    [DELETE_BOARD]: () => (state, {payload}) => {

        return {
            ...state,
            board : payload,
        }
    },
        // [PUT_NOTICE_POSTS]: () => {},
        // [DELETE_MANY_POSTS]: () => {},

    },
    initialState
);

export default boardReducer;
