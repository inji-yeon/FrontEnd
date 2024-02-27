import axios from 'axios'
import {
    GET_PROJECTS,
    POST_PROJECT,
    GET_PROJECT,
    GET_PROJECT_POST_LIST,
    PUT_PROJECT,
    PROJECT_ERROR,

    RESET,
    RESET_POST_PROJECT,
    RESET_GET_PROJECTS,
    RESET_GET_PROJECT,
    RESET_ERROR,
    UPLOAD_IMAGE,
    CREATE_PROJECT_POST,
    GET_EMPLOYEES,
    KICKED_PROJECT_MEMBER,
    LEAVE_PROJECT,
    INVITE_PROJECT_MEMBER,
    DELETEGATE_ADMIN,
} from '../modules/ProjectModule'

export const callGetProjectsAPI = ({ projectType, searchValue, offset }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/projects`
        + (`?offset=${offset ?? 1}`)
        + (projectType && `&type=${projectType}`)
        + (searchValue && `&search=${encodeURIComponent(searchValue.trim())}`)

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
            }).catch(error => dispatch({ type: PROJECT_ERROR, payload: error }))

        dispatch({ type: GET_PROJECTS, payload: result?.data })
    }
}

export const callCreateProjectAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/projects`;
    return async (dispatch, getState) => {
        const result = await axios
            .post(requestURL, form, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => dispatch({ type: PROJECT_ERROR, payload: error }))

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
            }).catch(error => dispatch({ type: PROJECT_ERROR, payload: error }))

        dispatch({ type: GET_PROJECT, payload: result?.data })
    }
}

export const callGetProjectPostListAPI = ({ projectCode, searchValue, offset }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/projects/${projectCode}/paging`
        + (`?offset=${offset ?? 1}`)
        + (searchValue ? `&search=${encodeURIComponent(searchValue.trim())}` : '')
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
            }).catch(error => dispatch({ type: PROJECT_ERROR, payload: error }))

        dispatch({ type: GET_PROJECT_POST_LIST, payload: result?.data })

    }
}

export const callModifyProjectAPI = ({ form }) => {
    const projectCode = form?.projectCode;
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/projects/${projectCode}`
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
            }).catch(error => dispatch({ type: PROJECT_ERROR, payload: error }))


        dispatch({ type: PUT_PROJECT, payload: result?.data })
    }
}

export const callGetEmployees = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/employees`;
    return async (dispatch, getState) => {
        const result = await axios
            .get(requestURL, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => dispatch({ type: PROJECT_ERROR, payload: error }))

        dispatch({ type: GET_EMPLOYEES, payload: result?.data })
    }
}

export const callUploadImage = ({ file, callback, editor }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/projects/upload-image`
    return async (dispatch, getState) => {
        const result = await axios
            .post(requestURL, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => dispatch({ type: PROJECT_ERROR, payload: error }))


        if (callback && typeof callback === 'function') {
            callback(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/web-images/${result?.data?.data?.projectPostFileChangedFile}`);
        }

        dispatch({ type: UPLOAD_IMAGE, payload: result?.data })
    }
}

export const callCreateProjectPostAPI = ({ projectCode, projectPost }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/projects/${projectCode}`
    return async (dispatch, getState) => {
        const result = await axios
            .post(requestURL, projectPost, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => dispatch({ type: PROJECT_ERROR, payload: error }))

        dispatch({ type: CREATE_PROJECT_POST, payload: result?.data })
    }
}

export const callKickedProjectMember = ({ projectCode, employeeCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/projects/${projectCode}/kick/${employeeCode}`
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
            }).catch(error => dispatch({ type: PROJECT_ERROR, payload: error }))

        dispatch({ type: KICKED_PROJECT_MEMBER, payload: result?.data })
    }
}

export const callLeaveProject = ({ projectCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/projects/${projectCode}/leave`
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
            }).catch(error => dispatch({ type: PROJECT_ERROR, payload: error }))

        dispatch({ type: LEAVE_PROJECT, payload: result?.data })
    }
}

export const callInviteProjectMemberAPI = ({ projectCode, employeeCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/projects/${projectCode}/invite`
    return async (dispatch, getState) => {
        const result = await axios
            .post(requestURL, employeeCode, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => dispatch({ type: PROJECT_ERROR, payload: error }))

        dispatch({ type: INVITE_PROJECT_MEMBER, payload: result?.data })
    }
}

export const callDelegateAdmin = ({ projectCode, employeeCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/project/projects/${projectCode}/delegate-admin`
    return async (dispatch, getState) => {
        const result = await axios
            .put(requestURL, employeeCode, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            })
            .then(response => {
                return response
            }).catch(error => dispatch({ type: PROJECT_ERROR, payload: error }))

        dispatch({ type: DELETEGATE_ADMIN, payload: result?.data })
    }
}


export const callReset = () => {
    return async (dispatch, getState) => {
        dispatch({ type: RESET })
    }
}

export const callResetGetProjects = () => {
    return async (dispatch, getState) => {
        dispatch({ type: RESET_POST_PROJECT })
    }
}

export const callResetCreateProjectCode = () => {
    return async (dispatch, getState) => {

        dispatch({ type: RESET_GET_PROJECTS })
    }
}

export const callResetGetProject = () => {
    return async (dispatch, getState) => {

        dispatch({ type: RESET_GET_PROJECT })
    }
}

export const callResetError = () => {
    return async (dispatch, getState) => {

        dispatch({ type: RESET_ERROR })
    }
}