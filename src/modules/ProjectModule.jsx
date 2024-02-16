import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    projectListWithPaging: { data: [], pageInfo: null },
};

/* 액션 */
export const GET_PROJECTS = 'project/GET_PROJECTS';

const action = createActions({
    [GET_PROJECTS]: () => { },
});

const projectReducer = handleActions(
    {
        [GET_PROJECTS]: (state, { payload }) => {
            return {
                ...state,
                projectListWithPaging: payload?.data
            };
        },
    },
    initialState
);

export default projectReducer;