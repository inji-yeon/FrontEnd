import { createActions, handleActions } from "redux-actions";

/* 상태 초기값 initialState */
const initialState = {

    postComment:null,
    loading: false,
    error: null,

}


/* 액션 타입 정의 */

export const POST_COMMENT= 'board/POST_COMMENT';
export const PUT_COMMENT = 'board/PUT_COMMENT';
export const DELETE_COMMENT = 'board/DELETE_COMMENT';


/* 액션 생성자 */
const action = createActions({
 
    [POST_COMMENT]: () => {},
    [PUT_COMMENT]: () => {},
    [DELETE_COMMENT]: () => {},

});



/* 리듀서 */
const postCommentReducer = handleActions({

        [POST_COMMENT]: () => (state, {payload}) => {

            return {
                ...state,
                postComment : payload,
            }

        },


        [PUT_COMMENT]: () => (state, {payload}) => {

            return {
                ...state,
                postComment : payload,
            }

        },

        [DELETE_COMMENT]: () => (state, {payload}) => {

            return {
                ...state,
                postComment : payload,
            }

        },

    },
    initialState
);

export default postCommentReducer;
