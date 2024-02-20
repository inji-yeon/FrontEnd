import { createActions, handleActions } from 'redux-actions';
/* 초기값 */
const initialState = {
    mypageemp:[],
    
}

export const GET_MYPAGE_EMP = 'mypage/GET_MYPAGE_EMP';



const actions = createActions({
    [GET_MYPAGE_EMP]: () => {},

});

// 리듀서
const mypagereducer = handleActions(
    {
        [GET_MYPAGE_EMP]: (state, { payload }) => {
            console.log('그룹에서 조직리스트 가져오는 모듈---------------')
            
            return payload;
           
        
        },
        
    },
    initialState
    );

    export default mypagereducer;
