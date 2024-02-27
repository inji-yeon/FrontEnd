import { createActions, handleActions } from 'redux-actions';
/* 초기값 */
const initialState = {
    message: ''
}

export const PUT_MYPAGEPASSWORD_UPDATE = 'mypage/PUT_MYPAGEPASSWORD_UPDATE';



const actions = createActions({
    [PUT_MYPAGEPASSWORD_UPDATE]: () => {}
});

// 리듀서
const mypagepwdupdatereducer = handleActions(
    {
        [PUT_MYPAGEPASSWORD_UPDATE]: (state, { payload }) => {
            // console.log('그룹에서 조직리스트 가져오는 모듈---------------')
            console.log(payload);
            console.log('payload>>>>>>><'+payload);
            return {
                ...state,
            message:payload?.message
        };
        
        },
        
    },
    initialState
    );


    export default mypagepwdupdatereducer;
