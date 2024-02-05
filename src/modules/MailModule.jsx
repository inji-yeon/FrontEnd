import { createActions, handleActions } from "redux-actions";


/*초기값*/
//리듀서가 관리하는 상태의 형태와 기본 값이다. 어떤 데이터 타입이든 가능
const initialState = {};
//mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
/*액션*/
//이 문자열들의 액션을 감지하겠다.
const INCREASE = "mail/INCREASE";
//cost DECREASE = "mail/DECREASE";

export const GET_MAIL = "mail/GET_MAIL";

const actions = createActions({
    [GET_MAIL]: () => {},
})



//mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
/*리듀서*/
//handleActions() 함수로 위에 정의한 각 액션에 의해 상태가 어떻게 변경되는지를 정의한다.
const mailReducer = handleActions(
    {
        [INCREASE] : (state,action) => ({count: state.count + 1}),
        [GET_MAIL] : (state, {payload}) => {
            console.log("state : ",state);
            console.log("payload : " ,payload);
            return payload
        },
    }
    ,initialState
);

export default mailReducer;
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


