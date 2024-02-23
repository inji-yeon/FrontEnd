import { createActions, handleActions } from 'redux-actions'

/* 초기값 */
const initialState = {
    errorPage: '',
    message: '',
    projectListWithPaging: {
        data: [],
        pageInfo: null
    },
    createProjectCode: null,
    projectInfo: {
        project: null,
        projectManager: null,
        projectMemberList: []
    }, // 프로젝트 자체 정보
    projectPostListWithPaging: {
        data: [],
        pageInfo: null
    }, // 프로젝트 게시글 목록
    returnData: null,
    uploadImageList: []
}

/* 액션 */
export const GET_PROJECTS = 'project/GET_PROJECTS'
export const POST_PROJECT = 'project/GET_PROJECT'
export const GET_PROJECT = 'project/GET_PROJECT'
export const GET_PROJECT_POST_LIST = 'project/GET_PROJECT_POST_LIST'
export const PUT_PROJECT = 'project/PUT_PROJECT'
export const UPLOAD_IMAGE = 'project/UPLOAD_IMAGE'
export const CREATE_PROJECT_POST = 'project/CREATE_PROJECT_POST'
export const KICKED_PROJECT_MEMBER = 'project/KICKED_PROJECT_MEMBER'
export const INVITE_PROJECT_MEMBER = 'project/INVITE_PROJECT_MEMBER'
export const LEAVE_PROJECT = 'project/LEAVE_PROJECT';
export const DELETEGATE_ADMIN = 'project/DELETEGATE_ADMIN'

export const RESET_GET_PROJECTS = 'project/RESET_GET_PROJECTS'
export const RESET_POST_PROJECT = 'project/RESET_POST_PROJECT'
export const RESET_GET_PROJECT = 'project/RESET_GET_PROJECT'
export const ERROR = 'project/ERROR';
export const RESET_ERROR = 'project/RESET_ERROR'
export const RESET = 'project/RESET';
export const RESET_MESSAGE = 'project/RESET_MESSAGE'
export const GET_EMPLOYEES = 'project/EMPLOYEES'

const action = createActions({
    [GET_PROJECTS]: () => { },
    [POST_PROJECT]: () => { },
    [GET_PROJECT]: () => { },
    [GET_PROJECT_POST_LIST]: () => { },
    [PUT_PROJECT]: () => { },
    [UPLOAD_IMAGE]: () => { },
    [CREATE_PROJECT_POST]: () => { },
    [ERROR]: () => { },
    [GET_EMPLOYEES]: () => { },
    [KICKED_PROJECT_MEMBER]: () => { },
    [INVITE_PROJECT_MEMBER]: () => { },
    [LEAVE_PROJECT]: () => { },
    [DELETEGATE_ADMIN]: () => { },

    [RESET]: () => { },
    [RESET_GET_PROJECTS]: () => { },
    [RESET_POST_PROJECT]: () => { },
    [RESET_GET_PROJECT]: () => { },
    [RESET_ERROR]: () => { },
    [RESET_MESSAGE]: () => { }
})

const projectReducer = handleActions(
    {
        [GET_PROJECTS]: (state, { payload }) => {
            return {
                ...state,
                projectListWithPaging: payload?.data,
                message: GET_PROJECTS,
            }
        },
        [POST_PROJECT]: (state, { payload }) => {
            return {
                ...state,
                createProjectCode: payload?.data
            }
        },
        [GET_PROJECT]: (state, { payload }) => {
            return {
                ...state,
                projectInfo: payload?.data
            }
        },
        [GET_PROJECT_POST_LIST]: (state, { payload }) => {
            console.log('GET_PROJECT_POST_LIST>>>payload>>>', payload);
            return {
                ...state,
                projectPostListWithPaging: payload?.data
            }
        },
        [PUT_PROJECT]: (state, { payload }) => {
            return {
                ...state,
                returnData: payload,
                message: PUT_PROJECT
            }
        },
        [UPLOAD_IMAGE]: (state, { payload }) => {
            return {
                ...state,
                uploadImageList: [
                    ...state.uploadImageList
                    , payload?.data
                ],
            }
        },
        [CREATE_PROJECT_POST]: (state, { payload }) => {
            return {
                ...state,
                uploadImageList: [],
                message: CREATE_PROJECT_POST
            }
        },
        [GET_EMPLOYEES]: (state, { payload }) => {
            return {
                ...state,
                employeeList: payload?.data,
                message: GET_EMPLOYEES
            }
        },
        [KICKED_PROJECT_MEMBER]: (state, { payload }) => {
            return {
                ...state,
                message: KICKED_PROJECT_MEMBER
            }
        },
        [INVITE_PROJECT_MEMBER]: (state, { payload }) => {
            return {
                ...state,
                message: INVITE_PROJECT_MEMBER
            }
        },
        [LEAVE_PROJECT]: (state, { payload }) => {
            return {
                ...state,
                message: LEAVE_PROJECT
            }
        },
        [DELETEGATE_ADMIN]: (state, { payload }) => {
            return {
                ...state,
                message: DELETEGATE_ADMIN
            }
        },

        [ERROR]: (state, { payload }) => {
            return {
                ...state,
                errorPage: payload
            }
        },

        [RESET]: (state, { payload }) => {
            return {
                ...initialState
            }
        },
        [RESET_GET_PROJECTS]: (state, { payload }) => {
            return {
                ...state,
                projectListWithPaging: { data: [], pageInfo: null }
            }
        },
        [RESET_POST_PROJECT]: (state, { payload }) => {
            return {
                ...state,
                createProjectCode: null
            }
        },
        [RESET_GET_PROJECT]: (state, { payload }) => {
            return {
                ...state,
                projectInfo: {
                    project: null,
                    projectManager: null,
                    projectMemberList: []
                }
            }
        },
        [RESET_ERROR]: (state, { payload }) => {
            return {
                ...state,
                errorPage: ''
            }
        },
        [RESET_MESSAGE]: (state, { payload }) => {
            return {
                ...state,
                message: ''
            }
        }
    },
    initialState
)

export default projectReducer
