import axios from 'axios'
import {
    GET_CALENDAR,
    GET_EVENTS,
    GET_EVENT,
    GET_EMPLOYEES,
    POST_EVENT,
    PUT_EVENT,
    DELETE_EVENT,
    GET_TEMP_DELETED_EVENTS,
    PUT_TEMP_DELETED_EVENT,
    PUT_EVENT_ABOUT_TIME,
    CALENDAR_ERROR
} from '../modules/CalendarModule'

export const callGetCalendarAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/calendar`

    return async (dispatch, getState) => {
        const result = await axios
            .get(requestURL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => {
                dispatch({ type: CALENDAR_ERROR, payload: error })
            })

        dispatch({ type: GET_CALENDAR, payload: result?.data })

        dispatch(callGetEventListAPI());
    }
}

export const callGetEventListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/calendar/events`

    return async (dispatch, getState) => {
        const result = await axios
            .get(requestURL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => {
                dispatch({ type: CALENDAR_ERROR, payload: error })
            })

        dispatch({ type: GET_EVENTS, payload: result?.data })
    }
}

export const callGetEventAPI = ({ eventCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/calendar/events/${eventCode}`

    return async (dispatch, getState) => {
        const result = await axios
            .get(requestURL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => {
                dispatch({ type: CALENDAR_ERROR, payload: error })
            })

        dispatch({ type: GET_EVENT, payload: result?.data })
    }
}

export const callGetEmployeeListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/calendar/employees`

    return async (dispatch, getState) => {
        const result = await axios
            .get(requestURL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => {
                dispatch({ type: CALENDAR_ERROR, payload: error })
            })

        dispatch({ type: GET_EMPLOYEES, payload: result?.data })
    }
}

export const callCreateEventAPI = ({ eventOptions }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/calendar/events`

    return async (dispatch, getState) => {
        const result = await axios
            .post(requestURL, eventOptions, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => {
                dispatch({ type: CALENDAR_ERROR, payload: error })
            })

        dispatch({ type: POST_EVENT, payload: result?.data })
    }
}

export const callModifyEventAPI = ({ eventOptions }) => {
    const eventCode = eventOptions.event.eventCode
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/calendar/events/${eventCode}`

    return async (dispatch, getState) => {
        const result = await axios
            .put(requestURL, eventOptions, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => {
                dispatch({ type: CALENDAR_ERROR, payload: error })
            })

        dispatch({ type: PUT_EVENT, payload: result?.data })
    }
}

export const callModifyEventAboutDateAPI = ({ eventOptionsAboutDate }) => {
    const eventCode = eventOptionsAboutDate.eventCode
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/calendar/events/${eventCode}/date`

    return async (dispatch, getState) => {
        const result = await axios
            .put(requestURL, eventOptionsAboutDate, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => {
                dispatch({ type: CALENDAR_ERROR, payload: error })
            })

        dispatch({ type: PUT_EVENT_ABOUT_TIME, payload: result?.data })
    }
}

export const callDeleteEventAPI = ({ eventCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/calendar/events/${eventCode}`

    return async (dispatch, getState) => {
        const result = await axios
            .delete(requestURL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => {
                dispatch({ type: CALENDAR_ERROR, payload: error })
            })

        dispatch({ type: DELETE_EVENT, payload: result?.data })
    }
}

export const callGetTempDeletedEventListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/calendar/events/deleted-temporary`

    return async (dispatch, getState) => {
        const result = await axios
            .get(requestURL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => {
                dispatch({ type: CALENDAR_ERROR, payload: error })
            })

        dispatch({ type: GET_TEMP_DELETED_EVENTS, payload: result?.data })
    }
}

export const callRollbackTempDeletedEventListAPI = ({ eventCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/calendar/events/${eventCode}/deleted-rollback`

    return async (dispatch, getState) => {
        const result = await axios
            .put(requestURL, null, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => {
                dispatch({ type: CALENDAR_ERROR, payload: error })
            })

        dispatch({ type: PUT_TEMP_DELETED_EVENT, payload: result?.data })
    }
}
