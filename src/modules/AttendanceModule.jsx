import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_COMMUTE_LIST = 'attendance/GET_COMMUTE_LIST';


const actions = createActions({
    [GET_COMMUTE_LIST]: () => {}
});



/* 리듀서 */
const attendanceReducer = handleActions(
    {
        [GET_COMMUTE_LIST]: (state, { payload }) => {
            return payload;
        }

    },
    initialState
);

export default attendanceReducer;