import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_COMMUTE_LIST = 'attendance/GET_COMMUTE_LIST';
export const GET_DO_PAYMENT = 'attendance/GET_DO_PAYMENT';
export const GET_DO_REJECT = 'attendance/GET_DO_REJECT';
export const GET_DO_WAITING = 'attendance/GET_DO_WAITING';
export const GET_MY_APPROVAL = 'attendance/GET_MY_APPROVAL';
export const GET_MY_COMPANION = 'attendance/GET_MY_COMPANION';
export const GET_MY_WAITING = 'attendance/GET_MY_WAITING';


const actions = createActions({
    [GET_COMMUTE_LIST]: () => {},
    [GET_DO_PAYMENT]: () => {},
    [GET_DO_REJECT]: () => {},
    [GET_DO_WAITING]: () => {},
    [GET_MY_APPROVAL]: () => {},
    [GET_MY_COMPANION]: () => {},
    [GET_MY_WAITING]: () => {}
});



/* 리듀서 */
const attendanceReducer = handleActions(
    {
        [GET_COMMUTE_LIST]: (state, { payload }) => {
            return payload;
        },
        [GET_DO_PAYMENT]: (state, { payload }) => {
            return payload;
        },
        [GET_DO_REJECT]: (state, { payload }) => {
            return payload;
        },
        [GET_DO_WAITING]: (state, { payload }) => {
            return payload;
        },
        [GET_MY_APPROVAL]: (state, { payload }) => {
            return payload;
        },
        [GET_MY_COMPANION]: (state, { payload }) => {
            return payload;
        },
        [GET_MY_WAITING]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default attendanceReducer;