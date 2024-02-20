import { createActions, handleActions } from 'redux-actions';
/* 초기값 */
const initialState = {

    groupchart:[],
}
export const GET_GROUPCHART = 'group/GET_GROUPCHART';

const actions = createActions({
    [GET_GROUPCHART]: () => {},

});

const groupchartreducer = handleActions(
    {
        [GET_GROUPCHART]: (state, { payload }) => {
            console.log('그룹 모듀 조직도데이터 가져오는 모듈----------------')
            console.log('리듀서에서 액션 처리 전 상태: ');
            console.log('리듀서에서 액션 데이터: ', payload);
            return payload;
        },
        
    },
    initialState
    );


    export default groupchartreducer;


