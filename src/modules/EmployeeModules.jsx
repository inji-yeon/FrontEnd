import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_EMPLOYEE     = 'employee/GET_EMPLOYEE';
export const POST_LOGIN     = 'employee/POST_LOGIN';
export const POST_REGISTER  = 'employee/POST_REGISTER';
export const POST_LOGOUT = 'employee/POST_LOGOUT';
export const FORGOT_PASSWORD_REQUEST = 'employee/FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'employee/FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'employee/FORGOT_PASSWORD_FAILURE';


const actions = createActions({
    [GET_EMPLOYEE]: () => {},
    [POST_LOGIN]: () => {},
    [POST_REGISTER]: () => {},
    [POST_LOGOUT]: () => {},
    [FORGOT_PASSWORD_REQUEST]: () => {},
    [FORGOT_PASSWORD_SUCCESS]: (data) => ({ data }),
    [FORGOT_PASSWORD_FAILURE]: (error) => ({ error }),
});

/* 리듀서 */
const employeeReducer = handleActions(
    {
        [GET_EMPLOYEE]: (state, { payload }) => {
            
            return payload;
        },
        [POST_LOGIN]: (state, { payload }) => {
            
            return payload;
        },
        [POST_REGISTER]: (state, { payload }) => {
            
            return payload;
        },
        [POST_LOGOUT]: (state, { payload }) => {
            
            return payload;
        },
        
        [FORGOT_PASSWORD_REQUEST]: (state, action) => ({
            ...state,
            loading: true,
            message: ''
        }),
        [FORGOT_PASSWORD_SUCCESS]: (state, { payload }) => ({
            ...state,
            loading: false,
            message: payload.message
        }),
        [FORGOT_PASSWORD_FAILURE]: (state, { payload }) => ({
            ...state,
            loading: false,
            message: payload.message
        }),
        
        

    },
    initialState
);

export default employeeReducer;