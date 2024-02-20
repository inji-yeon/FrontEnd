import {PUT_MYPAGEPASSWORD_UPDATE} from '../modules/MypagepwdupdateModule';
import jwtDecode from 'jwt-decode';


const accessToken = localStorage.getItem('accessToken');
const decodeToken = jwtDecode(accessToken);
const employeeCode = decodeToken.empCode;



// export const callMypageUpdatePwdAPI = ({ form }) => {
//     console.log('[callMypageUpdatePwdAPI] callMypageUpdatePwdAPI Call');

//     // const empCode = form.empCode;
//     const { empCode, currentPassword, newPassword } = form; // form 객체로부터 empCode, currentPassword, newPassword 추출

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/mypage/modifypwd/${empCode}`;

//     return async (dispatch, getState) => {
//         const result = await fetch(requestURL, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: '*/*',
//                 body: JSON.stringify({
//                     empPwd: currentPassword,
//                     newEmpPwd: newPassword
//                 }),
//                 Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
//             },
//         }).then((response) => response.json());

//         // console.log('마이페이지 사원정보 업데이트하기 ===== [callMypageUpdatePwdAPI] callMypageUpdatePwdAPI RESULT : ', result);

//         // dispatch({ type: PUT_MYPAGEPASSWORD_UPDATE, payload: result.data });
//         // console.log('디스패치 되고 사원정보 업데이트하기 api ===== [callMypageUpdatePwdAPI] callMypageUpdatePwdAPI RESULT : ', result);
        
//     };
// };


// export const callMypageUpdatePwdAPI = ({ currentPassword, newPassword }) => {
//     console.log('[callMypageUpdatePwdAPI] callMypageUpdatePwdAPI Call');
//     console.log('사용자가 입력한 현재 비밀번호 ', currentPassword)
//     console.log('사용자가 입력한 변경할 비밀번호 ', newPassword)
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/mypage/modifypwd/${employeeCode}`;
//     console.log('요청 URL:', requestURL);

//     return async (dispatch, getState) => {
//         try {
//             // 현재 비밀번호 확인을 포함한 PUT 요청
//             const response = await fetch(requestURL, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accept: '*/*',
//                     Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
//                 },
//                 body: JSON.stringify({
//                     empPwd: currentPassword,
//                     newEmpPwd: newPassword
//                 })
                
//             });
            
//             console.log('respose확인하기' , response)
//             // 응답 확인
//             if (response.status === 200) {
//                 const result = await response.json();
//                 console.log('마이페이지 사원정보 업데이트하기 ===== [callMypageUpdatePwdAPI] callMypageUpdatePwdAPI RESULT : ', result);
//                 dispatch({ type: PUT_MYPAGEPASSWORD_UPDATE, payload: result.data });
//                 console.log('디스패치 되고 사원정보 업데이트하기 api ===== [callMypageUpdatePwdAPI] callMypageUpdatePwdAPI RESULT : ', result);
//             } else {
//                 throw new Error('비밀번호 변경에 실패했습니다.');
//             }
//         } catch (error) {
//             console.error('비밀번호 변경에 실패했습니다:', error);
//             alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
//         }
//     };
// };
export const callMypageUpdatePwdAPI = async ({ currentPassword, newPassword }) => {
    console.log('[callMypageUpdatePwdAPI] callMypageUpdatePwdAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/mypage/modifypwd/${employeeCode}`;

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
