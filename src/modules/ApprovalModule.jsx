import { createActions, handleActions } from "redux-actions";

const initialState = [];
export const GET_OUTBOX_ONPROCESS = 'approval/GET_OUTBOX_ONPROCESS';
export const POST_OVERWORK_DOC = 'approval/POST_APPROVAL_DOC';
export const GET_OUTBOX_FINISHED = 'approval/GET_OUTBOX_FINISHED';
export const GET_OUTBOX_REJECTED = 'approval/GET_OUTBOX_REJECTED';
export const GET_OVERWORK_DETAILS_OP = 'approval/GET_OVERWORK_DETAILS_OP';
export const GET_APPROVAL_ATTACHMENT = 'approval/GET_APPROVAL_ATTACHMENT';
export const PUT_RETRIEVAL = 'approval/PUT_RETRIEVAL';
export const GET_RETRIEVAL_LIST = 'approval/GET_RETRIEVAL_LIST';
export const GET_APPROVAL_FINDUSERDETAIL = 'approval/GET_APPROVAL_FINDUSERDETAIL';
export const POST_SAVE_OVERWORK = 'approval/POST_SAVE_OVERWORK';
export const GET_OUTBOX_SAVED = 'approval/GET_OUTBOX_SAVED';
export const GET_OVERWORK_DETAILS_FIN = 'approval/GET_OVERWORK_DETAILS_FIN';
export const GET_INBOX_APPROVAL = 'approval/GET_INBOX_APPROVAL';
export const GET_OVERWORK_DETAILS_INBOX = 'approval/GET_OVERWORK_DETAILS_INBOX';
export const PUT_INBOX_APPROVAL = 'approval/PUT_INBOX_APPROVAL';

const actions = createActions({
    [GET_OUTBOX_ONPROCESS]: (payload) => payload,
    [POST_OVERWORK_DOC]: (payload) => payload,
    [GET_OUTBOX_FINISHED]: (payload) => payload,
    [GET_OUTBOX_REJECTED]: (payload) => payload,
    [GET_OVERWORK_DETAILS_OP]: (payload) => payload,
    [GET_APPROVAL_ATTACHMENT]: (payload) => payload,
    [PUT_RETRIEVAL]: (payload) => payload,
    [GET_RETRIEVAL_LIST]: (payload) => payload,
    [GET_APPROVAL_FINDUSERDETAIL]: (payload) => payload,
    [POST_SAVE_OVERWORK]: (payload) => payload,
    [GET_OUTBOX_SAVED]: (payload) => payload,
    [GET_OVERWORK_DETAILS_FIN]: (payload) => payload,
    [GET_INBOX_APPROVAL]: (payload) => payload,
    [GET_OVERWORK_DETAILS_INBOX]: (payload) => payload,
    [PUT_INBOX_APPROVAL]: (payload) => payload,
});


const approvalReducer = handleActions(
    {
        [GET_OUTBOX_ONPROCESS]: (state, { payload }) => {
            console.log('GET_OUTBOX_ONPROCESS action dispatched. Payload:', payload);
            return payload;
        },
        [POST_OVERWORK_DOC]: (state, { payload }) => {
            console.log('POST_OVERWORK_DOC action dispatched. Payload:', payload);
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
        [GET_OVERWORK_DETAILS_OP]: (state, { payload }) => {
            console.log('GET_OVERWORK_DETAILS_OP action dispatched. Payload:', payload);
            return payload;
        },
        [GET_APPROVAL_ATTACHMENT]: (state, { payload }) => {
            console.log('GET_APPROVAL_ATTACHMENT action dispatched. Payload:', payload);
            return payload;
        },
        [PUT_RETRIEVAL]: (state, { payload }) => {
            console.log('PUT_RETRIEVAL action dispatched. Payload:', payload);
            return state;
        },
        [GET_RETRIEVAL_LIST]: (state, { payload }) => {
            console.log('GET_RETRIEVAL_LIST action dispatched. Payload:', payload);
            return payload;
        },
        [GET_APPROVAL_FINDUSERDETAIL]: (state, { payload }) => {
            console.log('GET_APPROVAL_FINDUSERDETAIL action dispatched. Payload:', payload);
            return payload;
        },
        [POST_SAVE_OVERWORK]: (state, { payload }) => {
            console.log('POST_SAVE_OVERWORK action dispatched. Payload:', payload);
            return payload;
        },
        [GET_OUTBOX_SAVED]: (state, { payload }) => {
            console.log('GET_OUTBOX_SAVED action dispatched. Payload:', payload);
            return payload;
        },
        [GET_OVERWORK_DETAILS_FIN]: (state, { payload }) => {
            console.log('GET_OVERWORK_DETAILS_FIN action dispatched. Payload:', payload);
            return payload ? payload : state;
        },
        [GET_INBOX_APPROVAL]: (state, { payload }) => {
            console.log('GET_INBOX_APPROVAL action dispatched. Payload:', payload);
            return payload;
        },
        [GET_OVERWORK_DETAILS_INBOX]: (state, { payload }) => {
            console.log('GET_OVERWORK_DETAILS_INBOX action dispatched. Payload:', payload);
            return payload;
        },
        [PUT_INBOX_APPROVAL]: (state, { payload }) => {
            console.log('PUT_INBOX_APPROVAL action dispatched. Payload:', payload);
            return state;
        },
    },
    initialState
);


export default approvalReducer;
