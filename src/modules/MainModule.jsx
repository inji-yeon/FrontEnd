import { createAction, handleActions } from "redux-actions";

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAIL = 'FAIL';

export const request = createAction(REQUEST);
export const success = createAction(SUCCESS);
export const fail = createAction(FAIL);

const initial = {
    data: null,
    loading: false,
    error: null
};

export const mainReducer = handleActions({
    [REQUEST]: (state,action) => ({
        ...state,
        loading: true,
        error: null,
    }),
    [SUCCESS]: (state,action)=> ({
        ...state,
        loading: false,
        data: action.payload,
        error: 0,
    }),
    [FAIL]: (state,action)=>({
        ...state,
        loading: false,
        error: 1000,
    }),
},initial)

export default mainReducer;