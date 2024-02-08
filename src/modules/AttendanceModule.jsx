import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_COMMUTE_LIST = 'attendance/GET_COMMUTE_LIST';
export const GET_DO_PAYMENT = 'attendance/GET_DO_PAYMENT';


const actions = createActions({
    [GET_COMMUTE_LIST]: () => {},
    [GET_DO_PAYMENT]: () => {}
});



/* 리듀서 */
const attendanceReducer = handleActions(
    {
        [GET_COMMUTE_LIST]: (state, { payload }) => {
            return payload;
        },
        [GET_DO_PAYMENT]: (state, { payload }) => {
            return payload;
        }

    },
    initialState
);

export default attendanceReducer;