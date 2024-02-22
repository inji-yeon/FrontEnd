import axios from 'axios'
import {
    GET_PROJECTS,
    POST_PROJECT,
    GET_PROJECT,
    GET_PROJECT_LIST,
    ERROR,

    RESET,
    RESET_POST_PROJECT,
    RESET_GET_PROJECTS,
    RESET_GET_PROJECT,
    RESET_ERROR,
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

export const callCreateProjectAPI = ({ createForm }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/projects`;
    return async (dispatch, getState) => {
        const result = await axios
            .post(requestURL, createForm, {
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

        console.log('[ProjectAPICalls] callCreateProjectAPI RESULT : ', result)

        dispatch({ type: POST_PROJECT, payload: result?.data })
    }
}

export const callGetProjectAPI = ({ projectCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/projects/${projectCode}`;
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
                if (error?.response?.data?.code === 'ERROR_CODE_6001') {
                    alert('허가되지 않은 접근입니다. 프로젝트 메뉴로 돌아갑니다.');
                    dispatch({ type: ERROR, payload: '/projects' });
                }
            })
        // 에러 처리 해야 된다.

        console.log('[ProjectAPICalls] callGetProjectAPI RESULT : ', result)

        dispatch({ type: GET_PROJECT, payload: result?.data })
        // dispatch(callGetProjectPostListAPI({ projectCode }))
    }
}

// export const callGetProjectPostListAPI = ({ projectCode, searchValue, offset }) => {
//     console.log(projectCode);
//     console.log(offset);
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/projects/${projectCode}/paging`
//         + (`?offset=${offset ?? 1}`)
//         + (searchValue ? `&search=${encodeURIComponent(searchValue.trim())}` : '')
//     console.log(requestURL);
//     return async (dispatch, getState) => {
//         const result = await axios
//             .get(requestURL, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accept: '*/*',
//                     Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
//                 }
//             })
//             .then(response => {
//                 return response
//             }).catch(error => console.error(error))
//         // 에러 처리 해야 된다.

//         console.log('[ProjectAPICalls] callGetProjectPostListAPI RESULT : ', result)

//         dispatch({ type: GET_PROJECT_LIST, payload: result?.data })
//     }
// }

// PUT_PROJECT

export const callModifyProjectAPI = ({ form }) => {
    const projectCode = form?.projectCode;
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/projects/${projectCode}`
    console.log(requestURL);
    return async (dispatch, getState) => {
        const result = await axios
            .put(requestURL, form, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => {
                alert('프로젝트 수정에 실패했습니다.');
                dispatch({ type: ERROR, payload: `/projects/${projectCode}` });
            })
        // 에러 처리 해야 된다.

        console.log('[ProjectAPICalls] callModifyProjectAPI RESULT : ', result)

        dispatch({ type: GET_PROJECT_LIST, payload: result?.data })
    }
}
export const callReset = () => {
    return async (dispatch, getState) => {

        console.log('[ProjectAPICalls] callReset')

        dispatch({ type: RESET })
    }
}

export const callResetGetProjects = () => {
    return async (dispatch, getState) => {

        console.log('[ProjectAPICalls] callResetGetProjects')

        dispatch({ type: RESET_POST_PROJECT })
    }
}

export const callResetCreateProjectCode = () => {
    return async (dispatch, getState) => {

        console.log('[ProjectAPICalls] callResetCreateProjectCode')

        dispatch({ type: RESET_GET_PROJECTS })
    }
}

export const callResetGetProject = () => {
    return async (dispatch, getState) => {

        console.log('[ProjectAPICalls] callResetGetProject')

        dispatch({ type: RESET_GET_PROJECT })
    }
}

export const callResetError = () => {
    return async (dispatch, getState) => {

        console.log('[ProjectAPICalls] callResetError')

        dispatch({ type: RESET_ERROR })
    }
}