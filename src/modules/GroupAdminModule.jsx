import { createActions, handleActions } from 'redux-actions';
/* 초기값 */
const initialState = {
    groupemployeeadd:null,
    
}

export const POST_GROUPADMIN_ADD_EMP = 'mypage/PUT_MYPAGEPASSWORD_UPDATE';



const actions = createActions({
    [POST_GROUPADMIN_ADD_EMP]: () => {}
});

// 리듀서
const groupadmin = handleActions(
    {
        [POST_GROUPADMIN_ADD_EMP]: (state, { payload }) => {
            console.log('그룹에서 관리자가 사원 등록하기 가져오는 모듈---------------')
            
            return payload;
        
        },
        
    },
    initialState
    );


    export default groupadmin;
