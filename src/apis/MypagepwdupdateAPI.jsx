// import {PUT_MYPAGEPASSWORD_UPDATE} from '../modules/MypagepwdupdateModule';
import { decodeJwt } from '../utils/tokenUtils';


const accessToken = localStorage.getItem('accessToken');
const decodeToken = decodeJwt(accessToken);
console.log(decodeToken);
const empCode = decodeToken?.empCode;
console.log('empcode나오나 한 번 보자',empCode);



export const callMypageUpdatePwdAPI = async ({ currentPassword, newPassword }) => {
    console.log('[callMypageUpdatePwdAPI] callMypageUpdatePwdAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/mypage/modifypwd/${empCode}`;

    try {
        // 현재 비밀번호 확인을 포함한 PUT 요청
        const response = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify({
                empPwd: currentPassword,
                newEmpPwd: newPassword
            })
        });

        return response; // 응답 반환
    } catch (error) {
        throw new Error('비밀번호 변경에 실패했습니다.');
    }
};
