// import { createActions, handleActions } from "redux-actions";

// const initialState = [];

// export const GET_OUTBOX_ONPROCESS = 'approval/GET_OUTBOX_ONPROCESS';

// const actions = createActions({
//     [GET_OUTBOX_ONPROCESS]: () => {},
// });

// const approvalReducer = handleActions(
//     {
//         [GET_OUTBOX_ONPROCESS]: (state, { payload }) => {
//             return payload;
//         }
//     },
//     initialState
// );

// export default approvalReducer;

// import { createActions, handleActions } from "redux-actions";

// const initialState = {
//     data: []
// };

// export const GET_OUTBOX_ONPROCESS = 'approval/GET_OUTBOX_ONPROCESS';

// const actions = createActions({
//     [GET_OUTBOX_ONPROCESS]: () => {},
// });

// const approvalReducer = handleActions(
//     {
//         [GET_OUTBOX_ONPROCESS]: (state, { payload }) => {
//             return {
//                 ...state,
//                 data: payload
//             };
//         }
//     },
//     initialState
// );

// export default approvalReducer;

import { createActions, handleActions } from "redux-actions";

const initialState = [];
export const GET_OUTBOX_ONPROCESS = 'approval/GET_OUTBOX_ONPROCESS';

const actions = createActions({
    [GET_OUTBOX_ONPROCESS]: (payload) => payload,
});


const approvalReducer = handleActions(
    {
        [GET_OUTBOX_ONPROCESS]: (state, { payload }) => {
            console.log('GET_OUTBOX_ONPROCESS action dispatched. Payload:', payload);
            return {
                ...state,
                data: payload
            };
        }
    },
    initialState
);

export default approvalReducer;
