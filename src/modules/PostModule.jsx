import { createActions, handleActions } from "redux-actions";

/* 상태 초기값 initialState */
const initialState = {

    postList: [],
    post: null,
    postLike: null,
    loading: false,
    error: null,

}


/* 액션 타입 정의 */
export const GET_POSTS = 'board/GET_POSTS';
// export const GET_BOARDS = 'board/GET_BOARDS';

export const GET_POST = 'board/GET_POST';
export const POST_POST = 'board/POST_POST';
export const PUT_POST = 'board/PUT_POST';
export const DELETE_POST = 'board/DELETE_POST';
export const PUT_MOVE_POST = 'board/PUT_MOVE_POST';

export const GET_POSTS_SEARCH = 'board/GET_POSTS_SEARCH';
export const POST_LIKE = 'board/POST_LIKE';

// export const POST_BOARD = 'board/POST_BOARD';
// export const PUT_BOARD = 'board/PUT_BOARD';
// export const DELETE_BOARD = 'board/DELETE_BOARD';
// export const PUT_NOTICE_POSTS = 'board/PUT_NOTICE_POSTS';
// export const DELETE_MANY_POSTS = 'board/DELETE_MANY_POSTS';




/* 액션 생성자 */
const action = createActions({
    [GET_POSTS]: () => {},
    // [GET_BOARDS]: () => {},
    [GET_POST]: () => {},
    [POST_POST]: () => {},
    [PUT_POST]: () => {},
    [DELETE_POST]: () => {},
    [PUT_MOVE_POST]: () => {},
    [GET_POSTS_SEARCH]: () => {},
    [POST_LIKE]: () => {},

    // [POST_BOARD]: () => {},
    // [PUT_BOARD]: () => {},
    // [DELETE_BOARD]: () => {},
    // [PUT_NOTICE_POSTS]: () => {},
    // [DELETE_MANY_POSTS]: () => {},
});




/* 리듀서 */
const postReducer = handleActions({

        [GET_POSTS]: (state, {payload}) => {

            return {
                ...state,
                postList : payload,
            }
        },

        // [GET_BOARDS] : (state, {payload}) => {

        //     return {
        //         ...state,
        //         boardList : payload,
        //     }
        // },


        [GET_POST]: (state, {payload}) => {

            return {
                ...state,
                post : payload,
            }

        },

        [POST_POST]: (state, {payload}) => {

            return {
                ...state,
                post : payload,
            }

        },
        [PUT_POST]: (state, {payload}) => {

            return {
                ...state,
                post : payload,
            }

        },
        [DELETE_POST]: (state, {payload}) => {

            return {
                ...state,
                post : payload,
            }

        },
        [PUT_MOVE_POST]: (state, {payload}) => {

            return {
                ...state,
                post : payload,
            }

        },

        [GET_POSTS_SEARCH]: () =>  (state, {payload}) => {

            return {
                ...state,
                postList : payload,
            }

        },
        [POST_LIKE]: () => (state, {payload}) => {

            return {
                ...state,
                postLike : payload,
            }

        },


        // [POST_BOARD]: () => {},
        // [PUT_BOARD]: () => {},
        // [DELETE_BOARD]: () => {},
        // [PUT_NOTICE_POSTS]: () => {},
        // [DELETE_MANY_POSTS]: () => {},

    },
    initialState
);

export default postReducer;
