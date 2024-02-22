import { createActions, handleActions } from 'redux-actions'

/* 초기값 */
const initialState = {
    errorPage: '',
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

export const RESET_GET_PROJECTS = 'project/RESET_GET_PROJECTS'
export const RESET_POST_PROJECT = 'project/RESET_POST_PROJECT'
export const RESET_GET_PROJECT = 'project/RESET_GET_PROJECT'
export const ERROR = 'project/ERROR';
export const RESET_ERROR = 'project/RESET_ERROR'
export const RESET = 'project/RESET';


const action = createActions({
    [GET_PROJECTS]: () => { },
    [POST_PROJECT]: () => { },
    [GET_PROJECT]: () => { },
    [GET_PROJECT_POST_LIST]: () => { },
    [PUT_PROJECT]: () => { },
    [UPLOAD_IMAGE]: () => { },
    [CREATE_PROJECT_POST]: () => { },
    [ERROR]: () => { },

    [RESET]: () => { },
    [RESET_GET_PROJECTS]: () => { },
    [RESET_POST_PROJECT]: () => { },
    [RESET_GET_PROJECT]: () => { },
    [RESET_ERROR]: () => { }
})

const projectReducer = handleActions(
    {
        [GET_PROJECTS]: (state, { payload }) => {
            return {
                ...state,
                projectListWithPaging: payload?.data
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
                returnData: payload
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
    },
    initialState
)

export default projectReducer
