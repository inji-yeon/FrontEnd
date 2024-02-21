import axios from 'axios'
import {
    GET_PROJECTS
} from '../modules/ProjectModule'

export const callGetProjectsAPI = ({ projectType, searchValue, offset }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/projects`
        + (`?offset=${offset ?? 1}`)
        + (projectType && `&type=${projectType}`)
        + (searchValue && `&search=${encodeURIComponent(searchValue.trim())}`)
    console.log('requestURL',requestURL);
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

        console.log('[ProjectAPICalls] callGetProjectsAPI RESULT : ', result)

        dispatch({ type: GET_PROJECTS, payload: result?.data })
}
}
