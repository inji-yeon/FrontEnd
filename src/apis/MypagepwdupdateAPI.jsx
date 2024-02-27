import { PUT_MYPAGEPASSWORD_UPDATE } from "../modules/MypagepwdupdateModule";
import axios from "axios";

// export const callMypageUpdatePwdAPI = async ({ currentPassword, newPassword,empCode }) => {
//     console.log('[callMypageUpdatePwdAPI] callMypageUpdatePwdAPI Call');

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/mypage/modifypwd/${empCode}`;

//     try {
//         // 현재 비밀번호 확인을 포함한 PUT 요청
//         const response = await fetch(requestURL, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: '*/*',
//                 Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
//             },
//             body: JSON.stringify({
//                 empPwd: currentPassword,
//                 newEmpPwd: newPassword
//             })
//         });

//         return response; // 응답 반환
//     } catch (error) {
//         throw new Error('비밀번호 변경에 실패했습니다.');
//     }
// };



// // import {PUT_MYPAGEPASSWORD_UPDATE} from '../modules/MypagepwdupdateModule';

// // import axios from "axios";
// import { PUT_MYPAGEPASSWORD_UPDATE } from "../modules/MypagepwdupdateModule";


// export const callMypageUpdatePwdAPI = ({ currentPassword, newPassword, empCode }) => {
//     console.log('현재 비밀번호 나오는지', currentPassword);
//     console.log('새로운 비밀번호 나오는지', newPassword);
//     console.log('현재 사원번호 나오는지', empCode);

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/mypage/modifypwd/${empCode}`;

//     return async (dispatch, getState) => {
//         try {
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
//                 }),
//             });

//             if (response.status === 200) {
//                 // 성공적으로 업데이트된 경우
//                 const result = await response.json();
//                 console.log('비밀번호 업데이트 성공:', result.data);
//                 dispatch({ type: PUT_MYPAGEPASSWORD_UPDATE, payload: result.data });
//                 alert('비밀번호가 성공적으로 업데이트되었습니다.');
//             } else {
//                 console.error('비밀번호 업데이트 실패');
//                 alert('비밀번호 업데이트에 실패했습니다.');
//             }

//             return response;

//         } catch (error) {
//             console.error('비밀번호 업데이트 중 오류 발생:', error);
//             alert('비밀번호 업데이트 중 오류 발생했습니다.');
//         }
//     }
// }





export const callMypageUpdatePwdAPI =  ({ currentPassword, newPassword,empCode }) => {
    console.log('[callMypageUpdatePwdAPI] callMypageUpdatePwdAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/mypage/modifypwd/${empCode}`;

    const form = {empPwd:currentPassword,newEmpPwd:newPassword}
    return async (dispatch, getState) => {
        try {

            const result = await axios
            .put(requestURL,form ,{
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                },
            })
            .then(response => {
                return response
            })
            
            
            dispatch({type:PUT_MYPAGEPASSWORD_UPDATE,payload:result?.data});
        }catch(error) { 
            console.error('비밀번호 변경 중 오류 발생:', error);
            alert('비밀번호 변경 중 오류 발생');
        }

    }
}






// export const callMypageUpdatePwdAPI =  async ({ currentPassword, newPassword, empCode }) => {
//     console.log('[callMypageUpdatePwdAPI] callMypageUpdatePwdAPI Call');
//     console.log('현재 비밀번호 나오는지', currentPassword);
//     console.log('새로운 비밀번호 나오는지', newPassword);
//     console.log('현재 사원번호 나오는지', empCode);

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/mypage/modifypwd/${empCode}`;

//     return async (dispatch, getState) => {
//         try {
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
//                 }),
//             });

//             // 서버 응답의 status가 200이면 비밀번호 변경에 성공한 것으로 간주
//             if (response.status === 200) {
//                 console.log('비번 변경 성공!');
//                 const result = await response.json();
//                 console.log('[callProfileUpdateAPI] 서버로부터 받은 응답 호출 ', result);
                
//                 dispatch({ type: PUT_MYPAGEPASSWORD_UPDATE, payload: result });
//                 console.log('비번 변경 완료했습니다!');
//                 alert('비번 변경 완료했습니다!');
//             } else {
//                 console.error('비번 변경 실패했습니다.');
//                 alert('비번 변경 실패했습니다.');
//             }

//         } catch (error) {
//             console.error('비번 변경 도중 오류가 발생했습니다.', error);
//             alert('비번 변경 도중 오류가 발생했습니다.');
//         }
//     };
// };

