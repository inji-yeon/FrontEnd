import { createActions, handleActions } from 'redux-actions';
/* 초기값 */
const initialState = [];

export const GET_GROUPCHART     = 'group/GET_GROUPCHART';



const actions = createActions({
    [GET_GROUPCHART]: () => {}

});


// 리듀서
const groupreducer = handleActions(
    {
        [GET_GROUPCHART]: (state, { payload }) => {
            console.log('그룹 모듀 조직도데이터 가져오는 모듈')
            
            return payload;
        },
    },
    initialState
    );



export default groupreducer;