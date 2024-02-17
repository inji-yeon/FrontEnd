import { createActions, handleActions } from 'redux-actions'

/* 초기값 */
const initialState = {
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
    projectPostListWithPaging: null, // 프로젝트 게시글 목록
}

/* 액션 */
export const GET_PROJECTS = 'project/GET_PROJECTS'
export const POST_PROJECT = 'project/GET_PROJECT'
export const GET_PROJECT = 'project/GET_PROJECT'

export const RESET_GET_PROJECTS = 'project/RESET_GET_PROJECTS'
export const RESET_POST_PROJECT = 'project/RESET_POST_PROJECT'
export const RESET_GET_PROJECT = 'project/RESET_GET_PROJECT'


const action = createActions({
    [GET_PROJECTS]: () => { },
    [POST_PROJECT]: () => { },
    [GET_PROJECT]: () => { },

    [RESET_GET_PROJECTS]: () => { },
    [RESET_POST_PROJECT]: () => { },
    [RESET_GET_PROJECT]: () => { },
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
    },
    initialState
)

export default projectReducer
