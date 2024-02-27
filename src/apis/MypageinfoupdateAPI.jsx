import { PUT_MYPAGEINFO_UPDATE, GET_MYPAGE_SPREAD} from '../modules/MypageinfoupdateModule';
// import { decodeJwt } from '../utils/tokenUtils';


// const accessToken = localStorage.getItem('accessToken');
// const decodeToken = decodeJwt(accessToken);
// const empCode = decodeToken?.empCode;



export const callMypageGetSpreadAPI = ({ empCode }) => {
    console.log('[callMypageGetSpreadAPI] callMypageGetSpreadAPI Call');
    
    console.log('api안에서 empcode나오나 한 번 보자',empCode);
   

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


export const callMypageUpdateInfoAPI = ({ phone,empEmail,address,empCode }) => {
    console.log('[callMypageUpdateInfoAPI] callMypageUpdateInfoAPI Call');
    console.log('phone',phone);
    console.log('empEmail',empEmail);
    console.log('address',address);

    // const empCode = form.empCode;
    console.log('사원코드출력하기 ', empCode)

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/mypage/modifyinfo/${empCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify({
                    phone: phone,
                    empEmail: empEmail,
                    address: address

                }),
        }).then((response) => response.json());

        console.log('마이페이지 사원정보 업데이트하기 ===== [callMypageUpdateInfoAPI] callMypageUpdateInfoAPI RESULT : ', JSON.stringify(result));

        dispatch({ type: PUT_MYPAGEINFO_UPDATE, payload: result.data });
        console.log('디스패치 되고 사원정보 업데이트하기 api ===== [callMypageUpdateInfoAPI] callMypageUpdateInfoAPI RESULT : ', result);
    };
};
