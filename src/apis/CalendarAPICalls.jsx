import axios from 'axios'
import {
    GET_CALENDAR,
    GET_EVENTS,
    GET_EVENTS_SEARCH,
    GET_EVENT,
    GET_EMPLOYEES,
    POST_EVENT,
    PUT_EVENT,
    DELETE_EVENT,
    GET_TEMP_DELETED_EVENTS,
    PUT_TEMP_DELETED_EVENT,
    PUT_EVENT_ABOUT_TIME
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
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[CalendarAPICalls] callGetCalendarAPI RESULT : ', result)

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
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.
        console.log('[CalendarAPICalls] callGetEventListAPI RESULT : ', result)

        dispatch({ type: GET_EVENTS, payload: result?.data })
    }
}

export const callSearchEventListAPI = ({ searchValue, offset }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/calendar/events/search?search=${searchValue}&offset=${offset}`
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
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[CalendarAPICalls] callSearchEventListAPI RESULT : ', result)

        dispatch({ type: GET_EVENTS_SEARCH, payload: result?.data })
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
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[CalendarAPICalls] callGetEventAPI RESULT : ', result)

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
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[CalendarAPICalls] callGetEmployeeListAPI RESULT : ', result)

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
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[CalendarAPICalls] callCreateEventAPI RESULT : ', result)

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
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[CalendarAPICalls] callModifyEventAPI RESULT : ', result)

        dispatch({ type: PUT_EVENT, payload: result?.data })
    }
}

export const callModifyEventAboutDateAPI = ({ eventOptionsAboutDate }) => {
    console.log(eventOptionsAboutDate);
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
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[CalendarAPICalls] callModifyEventAboutDateAPI RESULT : ', result)

        dispatch({ type: PUT_EVENT_ABOUT_TIME, payload: result?.data })
    }
}

export const callDeleteEventAPI = ({ eventCode }) => {
    console.log(eventCode);
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
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[CalendarAPICalls] callDeleteEventAPI RESULT : ', result)

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
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[CalendarAPICalls] callGetTempDeletedEventListAPI RESULT : ', result)

        dispatch({ type: GET_TEMP_DELETED_EVENTS, payload: result?.data })
    }
}

export const callRollbackTempDeletedEventListAPI = ({ eventCode }) => {
    console.log(eventCode);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/calendar/events/${eventCode}/deleted-rollback`
    console.log(requestURL);
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
            }).catch(error => console.error(error))
        // 에러 처리 해야 된다.

        console.log('[CalendarAPICalls] callRollbackTempDeletedEventListAPI RESULT : ', result)

        dispatch({ type: PUT_TEMP_DELETED_EVENT, payload: result?.data })
    }
}
