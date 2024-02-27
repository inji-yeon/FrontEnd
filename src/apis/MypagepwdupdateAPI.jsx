import { PUT_MYPAGEPASSWORD_UPDATE } from "../modules/MypagepwdupdateModule";
import axios from "axios";

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
            alert('현재 비밀번호가 맞지 않습니다');
        }

    }
}
