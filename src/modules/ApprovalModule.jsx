import { createActions, handleActions } from "redux-actions";

const initialState = [];
export const GET_OUTBOX_ONPROCESS = 'approval/GET_OUTBOX_ONPROCESS';
export const POST_APPROVAL_DOC = 'approval/POST_APPROVAL_DOC';
export const GET_OUTBOX_FINISHED = 'approval/GET_OUTBOX_FINISHED';
export const GET_OUTBOX_REJECTED = 'approval/GET_OUTBOX_REJECTED';
export const GET_OVERWORK_DETAILS = 'approval/GET_OVERWORK_DETAILS';

const actions = createActions({
    [GET_OUTBOX_ONPROCESS]: (payload) => payload,
    [POST_APPROVAL_DOC]: (payload) => payload,
    [GET_OUTBOX_FINISHED]: (payload) => payload,
    [GET_OUTBOX_REJECTED]: (payload) => payload,
    [GET_OVERWORK_DETAILS]: (payload) => payload,
});


const approvalReducer = handleActions(
    {
        [GET_OUTBOX_ONPROCESS]: (state, { payload }) => {
            console.log('GET_OUTBOX_ONPROCESS action dispatched. Payload:', payload);
            return payload;
        },
        [POST_APPROVAL_DOC]: (state, { payload }) => {
            console.log('POST APPROVAL action dispatched. Payload:', payload);
            return payload;
        },
        [GET_OUTBOX_FINISHED]: (state, { payload }) => {
            console.log('GET_OUTBOX_FINISHED action dispatched. Payload:', payload);
            return payload;
        },
        [GET_OUTBOX_REJECTED]: (state, { payload }) => {
            console.log('GET_OUTBOX_REJECTED action dispatched. Payload:', payload);
            return payload;
        },
        [GET_OVERWORK_DETAILS]: (state, { payload }) => {
            console.log('GET_OVERWORK_DETAILS action dispatched. Payload:', payload);
            return payload;
        },
    },
    initialState
);


export default approvalReducer;
