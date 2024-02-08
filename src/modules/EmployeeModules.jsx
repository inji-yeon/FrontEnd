import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_EMPLOYEE     = 'employee/GET_EMPLOYEE';
export const POST_LOGIN     = 'employee/POST_LOGIN';
export const POST_REGISTER  = 'employee/POST_REGISTER';

const actions = createActions({
    [GET_EMPLOYEE]: () => {},
    [POST_LOGIN]: () => {},
    [POST_REGISTER]: () => {}
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

    },
    initialState
);

export default employeeReducer;