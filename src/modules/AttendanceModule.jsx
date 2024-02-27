import { createActions, handleActions } from 'redux-actions';

/* 초기값/ */
const initialState = [];

/* 액션 */
export const GET_COMMUTE_LIST = 'attendance/GET_COMMUTE_LIST';
export const GET_DO_PAYMENT = 'attendance/GET_DO_PAYMENT';
export const GET_DO_REJECT = 'attendance/GET_DO_REJECT';
export const GET_DO_WAITING = 'attendance/GET_DO_WAITING';
export const GET_MY_APPROVAL = 'attendance/GET_MY_APPROVAL';
export const GET_MY_COMPANION = 'attendance/GET_MY_COMPANION';
export const GET_MY_WAITING = 'attendance/GET_MY_WAITING';
export const GET_COMMUTE_MAIN = 'attendance/GET_COMMUTE_MAIN';
export const POST_COMMUTE_INSERT = 'attendance/POST_COMMUTE_INSERT';
export const PUT_COMMUTE_UPDATE = 'attendance/PUT_COMMUTE_UPDATE';
export const GET_ADMIN_VACATION = 'attendance/GET_ADMIN_VACATION';
export const GET_ADMIN_NO_VACATION = 'attendance/GET_ADMIN_NO_VACATION';
export const GET_DETAIL_MY = 'attendance/GET_DETAIL_MY';
export const PUT_DETAIL_DOC = 'attendance/PUT_DETAIL_DOC';


const actions = createActions({
    [GET_COMMUTE_LIST]: () => {},
    [GET_DO_PAYMENT]: () => {},
    [GET_DO_REJECT]: () => {},
    [GET_DO_WAITING]: () => {},
    [GET_MY_APPROVAL]: () => {},
    [GET_MY_COMPANION]: () => {},
    [GET_MY_WAITING]: () => {},
    [GET_COMMUTE_MAIN]: () => {},
    [POST_COMMUTE_INSERT]: () => {},
    [PUT_COMMUTE_UPDATE]: () => {},
    [GET_ADMIN_VACATION]: () => {},
    [GET_ADMIN_NO_VACATION]: () => {},
    [GET_DETAIL_MY]: () => {},
    [PUT_DETAIL_DOC]: () => {}
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
        },
        [GET_COMMUTE_MAIN]: (state, { payload }) => {
            return payload;
        },
        [POST_COMMUTE_INSERT]: (state, { payload }) => {
            return payload;
        },
        [PUT_COMMUTE_UPDATE]: (state, { payload }) => {
            return payload;
        },
        [GET_ADMIN_VACATION]: (state, { payload }) => {
            return payload;
        },
        [GET_ADMIN_NO_VACATION]: (state, { payload }) => {
            return payload;
        },
        [GET_DETAIL_MY]: (state, { payload }) => {
            return payload;
        },
        [PUT_DETAIL_DOC]: (state, { payload }) => {
            return payload;
        }


    },
    initialState
);

export default attendanceReducer;