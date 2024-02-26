import {GET_MYPAGE_EMP,GET_MYPAGE_PROFILE,PUT_MYPAGE_PROFILE_UPDATE} from '../modules/MypageModule';
import { decodeJwt } from '../utils/tokenUtils';


const accessToken = localStorage.getItem('accessToken');
const decodeToken = decodeJwt(accessToken);
const empCode = decodeToken?.empCode;
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


export const callMypageGetProfileAPI = ({ form }) => {
    console.log('[callMypageGetProfileAPI] callMypageGetProfileAPI Call');

    console.log('프로필사진 폼 정보 나오는지 확인',form)

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/mypage/find/profile`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('마이페이지 사원 프로필 가져오기 ===== [callMypageGetProfileAPI] callMypageGetProfileAPI RESULT : ', result);

        dispatch({ type: GET_MYPAGE_PROFILE, payload: result });
        console.log('디스패치 되고 사원정보 출력 ===== [callMypageGetProfileAPI] callMypageGetProfileAPI RESULT : ', result);
    };
};


export const callProfileUpdateAPI = ({ form }) => {
    console.log('[callProfileUpdateAPI] callProfileUpdateAPI Call');
    console.log('업데이트할 formData 값 나오냐--',form)

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/mypage/updateprofile`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: 'PUT',
                headers: {
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
                body: form,
            });

            // 서버 응답의 status가 200이면 프로필 사진 변경에 성공한 것으로 간주
            if (response.status === 200) {
                console.log('데이터베이스에서 프로필 이미지 업데이트 완료했습니다!');
                const result = await response.json();
                console.log('[callProfileUpdateAPI] 서버로부터 받은 응답 호출 ', result);
                
                dispatch({ type: PUT_MYPAGE_PROFILE_UPDATE, payload: result });
                console.log('프로필 이미지 업데이트 완료했습니다!');
                alert('프로필 이미지 업데이트 완료했습니다!');
            } else {
                console.error('프로필 이미지 업데이트에 실패했습니다.');
                alert('프로필 이미지 업데이트에 실패했습니다.');
            }

        } catch (error) {
            console.error('프로필 이미지 업데이트 도중 오류가 발생했습니다.', error);
            alert('프로필 이미지 업데이트 도중 오류가 발생했습니다.');
        }
    };
};
