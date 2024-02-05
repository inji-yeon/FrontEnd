import { handleActions } from "redux-actions";


const initialState = {};

export const GET_USER_INFORMATION = "sidebar/GET_USER_INFORMATION";

const sidebarReducer = handleActions(
    {
        [GET_USER_INFORMATION] : (state, {payload}) => {return payload;},
    },
    initialState
)

export default sidebarReducer;