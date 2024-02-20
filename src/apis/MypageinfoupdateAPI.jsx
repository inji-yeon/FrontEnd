import { PUT_MYPAGEINFO_UPDATE, GET_MYPAGE_SPREAD} from '../modules/MypageinfoupdateModule';
import { decodeJwt } from '../utils/tokenUtils';


const accessToken = localStorage.getItem('accessToken');
const decodeToken = decodeJwt(accessToken);
console.log(decodeToken);
const empCode = decodeToken?.empCode;
console.log('empcode나오나 한 번 보자',empCode);



export const callMypageGetSpreadAPI = ({ form }) => {
    console.log('[callMypageGetSpreadAPI] callMypageGetSpreadAPI Call');
    
    console.log('api안에서 empcode나오나 한 번 보자',empCode);
   
    console.log('폼 정보 나오는지 확인',form)

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/mypage/emplist?c=${empCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('마이페이지 사원정보 가져오기 ===== [callMypageGetSpreadAPI] callMypageGetSpreadAPI RESULT : ', result);

        dispatch({ type: GET_MYPAGE_SPREAD, payload: result });
        console.log('디스패치 되고 사원정보 출력 ===== [callMypageGetSpreadAPI] callMypageGetSpreadAPI RESULT : ', result);
    };
};


export const callMypageUpdateInfoAPI = ({ form }) => {
    console.log('[callMypageUpdateInfoAPI] callMypageUpdateInfoAPI Call');

    // const empCode = form.empCode;
    console.log('비밀번호 변경에서 출력하기 ', empCode)
    console.log('비밀번호 변경에서 출력하기 ', form)

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/mypage/modifyinfo/${empCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                // body: JSON.stringify({
                //     phone: form.phone,
                //     empEmail: form.empEmail,
                //     address: form.address

                // }),
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(form),
        }).then((response) => response.json());

        console.log('마이페이지 사원정보 업데이트하기 ===== [callMypageUpdateInfoAPI] callMypageUpdateInfoAPI RESULT : ', JSON.stringify(result));

        dispatch({ type: PUT_MYPAGEINFO_UPDATE, payload: result.data });
        console.log('디스패치 되고 사원정보 업데이트하기 api ===== [callMypageUpdateInfoAPI] callMypageUpdateInfoAPI RESULT : ', result);
    };
};
