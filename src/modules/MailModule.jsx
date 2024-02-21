import { createAction, handleActions } from "redux-actions";

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAIL = 'FAIL';

export const request = createAction(REQUEST);
export const success = createAction(SUCCESS);
export const fail = createAction(FAIL);

const initial = {
    data: null,
    loading: false,
    error: null
};

export const mailReducer = handleActions({
    [REQUEST]: (state,action) => ({
        ...state,
        loading: true,
        error: null,
    }),
    [SUCCESS]: (state,action)=> ({
        ...state,
        loading: false,
        data: action.payload,
        error: 0,
    }),
    [FAIL]: (state,action)=>({
        ...state,
        loading: false,
        error: 1000,
    }),
},initial)

export default mailReducer;

/*초기값*/
//리듀서가 관리하는 상태의 형태와 기본 값이다. 어떤 데이터 타입이든 가능
// const initialState = {};
// //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
// /*액션*/
// //이 문자열들의 액션을 감지하겠다.
// const INCREASE = "mail/INCREASE";
// //cost DECREASE = "mail/DECREASE";

// const GET_MAIL = "mail/GET_MAIL";
// const GET_MAIL_BY_STATUS = "mail/GET_MAIL_BY_STATUS";

// export const fetchMail = (url,token) => {
//     return async (dispatch) => {
//         try {
//             const response = await fetch(url,{
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accept: '*/*',
//                     Authorization : `Bearer ${token}`
//                 }
//             });
//             const mailData = await response.json(); 

//             console.log('데이터 가져오기 성공 : ',mailData);
//             dispatch({type: GET_MAIL,payload: mailData});
//         } catch(error){
//             console.log('데이터 가져오기 실패 : ',error);
//         }
//     }
// }
// export const fetchMail = (url,action,token) => {
//     return async (dispatch) => {
//         try {
//             const response = await fetch('http://localhost:1208/mail/find-receive-mail?condition=send',{
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accept: '*/*',
//                     Authorization : `Bearer ${token}`
//                 }
//             });
//             const mailData = await response.json();

//             console.log('데이터 가져오기 성공 : ',mailData);
//             dispatch({type: GET_MAIL,payload: mailData});
//         } catch(error){
//             console.log('데이터 가져오기 실패 : ',error);
//         }
//     }
// }

// export const fetchMailByStatus = () => {
//     return async
// }



//mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
/*리듀서*/
//handleActions() 함수로 위에 정의한 각 액션에 의해 상태가 어떻게 변경되는지를 정의한다.
// const mailReducer = handleActions(
//     {
//         [INCREASE] : (state,action) => ({count: state.count + 1}),
//         [GET_MAIL] : (state, {payload}) => {
//             console.log("state : ",state);
//             console.log("payload : " ,payload);
//             return payload
//         },
//     }
//     ,initialState
// );


//액션은 어떻게 생겼는가?
/*
    액션이라는 객체 안에는
    key: value 형식인

    type: 값 으로 구성되어 있고,
    payload{} 라는 객체로 이루어져 있다.

    예를 들어
    action{
        type: "SEND_MAIL",

        payload{    //payload도 객체이기 때문에(action객체 안에 payload객체) 키: 값 으로 구성된다. 
            넣고싶은키 : 넣고싶은벨류,
            넣고싶은키2 : 넣고싶은벨류2,
            넣고싶은키3 : 넣고싶은벨류3,
            .
            .
            .
        }
    }
    로 구성 되어있다. 

    그 다음은 아 모르겠다
*/


