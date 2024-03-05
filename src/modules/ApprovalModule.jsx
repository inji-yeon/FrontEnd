import { createActions, handleActions } from "redux-actions";

const initialState = [];
export const GET_OUTBOX_ONPROCESS = 'approval/GET_OUTBOX_ONPROCESS';
export const POST_APPROVAL_DOC = 'approval/POST_APPROVAL_DOC';

const actions = createActions({
    [GET_OUTBOX_ONPROCESS]: (payload) => payload,
    [POST_APPROVAL_DOC]: (payload) => payload,
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
    },
    initialState
);


export default approvalReducer;
