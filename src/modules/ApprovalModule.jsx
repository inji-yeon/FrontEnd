import { createActions, handleActions } from "redux-actions";

const initialState = [];
export const GET_OUTBOX_ONPROCESS = 'approval/GET_OUTBOX_ONPROCESS';
export const GET_APPROVAL_LINE = 'approval/GET_APPROVAL_LINE';

const actions = createActions({
    [GET_OUTBOX_ONPROCESS]: (payload) => payload,
    [GET_APPROVAL_LINE]: (payload) => payload,
});


const approvalReducer = handleActions(
    {
        [GET_OUTBOX_ONPROCESS]: (state, { payload }) => {
            console.log('GET_OUTBOX_ONPROCESS action dispatched. Payload:', payload);
            return {
                ...state,
                data: payload
            };
        },
        [GET_APPROVAL_LINE]: (state, { payload }) => {
            console.log('GET_APPROVAL_LINE action dispatched. Payload:', payload);
            return {
                ...state,
                data: payload
            };
        }
    },
    initialState
);


export default approvalReducer;
