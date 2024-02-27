import { createActions, handleActions } from 'redux-actions';

const initialState = {
    calendar: null,
    eventList: [],
    searchEventList: [],
    event: null,
    employeeList: [],
    returnData: null,
    tempDeletedEventList: [],
    error: ''
};

export const GET_CALENDAR = 'calendar/GET_CALENDAR';
export const GET_EVENTS = 'calendar/GET_EVENTS';
export const GET_EVENT = 'calendar/GET_EVENT';
export const GET_EMPLOYEES = 'calendar/GET_EMPLOYEES';
export const POST_EVENT = 'calendar/POST_EVENT';
export const PUT_EVENT = 'calendar/PUT_EVENT';
export const PUT_EVENT_ABOUT_TIME = 'calendar/PUT_EVENT_ABOUT_TIME'
export const DELETE_EVENT = 'calendar/DELETE_EVENT';
export const GET_TEMP_DELETED_EVENTS = 'calendar/GET_TEMP_DELETED_EVENTS';
export const PUT_TEMP_DELETED_EVENT = 'calendar/PUT_TEMP_DELETED_EVENT';
export const RESET_MESSAGE = 'calendar/RESET_MESSAGE'
export const CALENDAR_ERROR = 'calendar/ERROR'

const action = createActions({
    [GET_CALENDAR]: () => { },
    [GET_EVENTS]: () => { },
    [GET_EVENT]: () => { },
    [GET_EMPLOYEES]: () => { },
    [POST_EVENT]: () => { },
    [PUT_EVENT]: () => { },
    [PUT_EVENT_ABOUT_TIME]: () => { },
    [DELETE_EVENT]: () => { },
    [GET_TEMP_DELETED_EVENTS]: () => { },
    [PUT_TEMP_DELETED_EVENT]: () => { },
    [RESET_MESSAGE]: () => { },
    [CALENDAR_ERROR]: () => { }
});

const calendarReducer = handleActions(
    {
        [GET_CALENDAR]: (state, { payload }) => {
            return {
                ...state,
                calendar: payload?.data,
            };
        },
        [GET_EVENTS]: (state, { payload }) => {
            return {
                ...state,
                eventList: payload?.data,
                message: ''
            };
        },
        [GET_EVENT]: (state, { payload }) => {
            return {
                ...state,
                event: payload?.data,
            };
        },
        [GET_EMPLOYEES]: (state, { payload }) => {
            return {
                ...state,
                employeeList: payload?.data,
            };
        },
        [POST_EVENT]: (state, { payload }) => {
            return {
                ...state,
                returnData: payload?.data,
                message: POST_EVENT
            };
        },
        [PUT_EVENT]: (state, { payload }) => {
            return {
                ...state,
                returnData: payload?.data,
                message: PUT_EVENT
            };
        },
        [PUT_EVENT_ABOUT_TIME]: (state, { payload }) => {
            return {
                ...state,
                returnData: payload?.data,
                message: PUT_EVENT_ABOUT_TIME
            };
        },
        [DELETE_EVENT]: (state, { payload }) => {
            return {
                ...state,
                returnData: payload?.data,
                message: DELETE_EVENT
            };
        },
        [GET_TEMP_DELETED_EVENTS]: (state, { payload }) => {
            return {
                ...state,
                tempDeletedEventList: payload?.data
            };
        },
        [PUT_TEMP_DELETED_EVENT]: (state, { payload }) => {
            return {
                ...state,
                returnData: payload?.data,
                message: PUT_TEMP_DELETED_EVENT
            };
        },
        [RESET_MESSAGE]: (state, { payload }) => {
            return {
                ...state,
                returnData: null,
                message: ''
            }
        },
        [CALENDAR_ERROR]: (state, { payload }) => {
            return {
                ...state,
                error: payload
            }
        }
    },
    initialState
);

export default calendarReducer;
