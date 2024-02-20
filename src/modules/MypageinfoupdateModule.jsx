import { createActions, handleActions } from 'redux-actions';
/* 초기값 */
const initialState = {
    mypageinfo:null,
    mypagespread:[],
    
}

export const PUT_MYPAGEINFO_UPDATE = 'mypage/PUT_MYPAGEINFO_UPDATE';
export const GET_MYPAGE_SPREAD = 'mypage/GET_MYPAGE_SPREAD';

const actions = createActions({
    [PUT_MYPAGEINFO_UPDATE]: () => {},
    [GET_MYPAGE_SPREAD]: () => {},

});

// 리듀서
const mypageinfoupdatereducer = handleActions(
    {
        
        [PUT_MYPAGEINFO_UPDATE]: (state, { payload }) => {
            console.log('그룹에서 조직리스트 가져오는 업데이트하는 모듈-------------')
            
            return payload;

        },
        [GET_MYPAGE_SPREAD]: (state, { payload }) => {
            console.log('그룹에서 조직리스트 가져오는 모듈-------------')
            
            return payload;

        },
        
    },
    initialState
    );


    export default mypageinfoupdatereducer;
