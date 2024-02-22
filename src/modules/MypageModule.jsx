import { createActions, handleActions } from 'redux-actions';
/* 초기값 */
const initialState = {
    mypageemp:null,
    mypageprofile:null,
    mypageprofileupdate:null,
    
}

export const GET_MYPAGE_EMP = 'mypage/GET_MYPAGE_EMP';
export const GET_MYPAGE_PROFILE = 'mypage/GET_MYPAGE_PROFILE';
export const PUT_MYPAGE_PROFILE_UPDATE = 'mypage/PUT_MYPAGE_PROFILE_UPDATE';




const actions = createActions({
    [GET_MYPAGE_EMP]: () => {},
    [GET_MYPAGE_PROFILE]: () => {},
    [PUT_MYPAGE_PROFILE_UPDATE]: () => {},

});

// 리듀서
// const mypagereducer = handleActions(
//     {
//         [GET_MYPAGE_EMP]: (state, { payload }) => {
//             console.log('마이페이지 사이드바에서 가져오는 모듈---------------')
//             console.log('payload',payload);
//             // return {
                
//             //     mypageemp:payload?.data
//             // };
//             return payload;
        
//         },
//         [GET_MYPAGE_PROFILE]: (state, { payload }) => {
//             console.log('마이페이지 사이드바에서 프로필 가져오는 모듈---------------')
//             console.log('프로필payload',payload?.data);
            
//             // return {
//             //     ...state
//             // };
//             return payload?.data;
        
//         },
        
//     },
//     initialState
//     );

const mypagereducer = handleActions(
    {
      [GET_MYPAGE_EMP]: (state, { payload }) => ({
        ...state,
        empInfo: payload,
      }),
      [GET_MYPAGE_PROFILE]: (state, { payload }) => ({
        ...state,
        profileImage: payload,
      }),
      [PUT_MYPAGE_PROFILE_UPDATE]: (state, { payload }) => ({
        ...state,
        profileImage: payload,
      }),
    },
    initialState
  );
  

    export default mypagereducer;
