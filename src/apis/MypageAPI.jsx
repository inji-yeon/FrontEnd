import {GET_MYPAGE_EMP} from '../modules/MypageModule';
import jwtDecode from 'jwt-decode';

const accessToken = localStorage.getItem('accessToken');
const decodeToken = jwtDecode(accessToken);
const empCode = decodeToken.empCode;
console.log('empcode나오나 한 번 보자',empCode);



export const callMypageGetInfoAPI = ({ form }) => {
    console.log('[callMypageGetInfoAPI] callMypageGetInfoAPI Call');
    
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

        console.log('마이페이지 사원정보 가져오기 ===== [callMypageGetInfoAPI] callMypageGetInfoAPI RESULT : ', result);

        dispatch({ type: GET_MYPAGE_EMP, payload: result });
        console.log('디스패치 되고 사원정보 출력 ===== [callMypageGetInfoAPI] callMypageGetInfoAPI RESULT : ', result);
    };
};
