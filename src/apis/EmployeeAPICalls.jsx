import { GET_EMPLOYEE, POST_LOGIN, POST_REGISTER, POST_LOGOUT, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE } from '../modules/EmployeeModules';

export const callGetEmployeeAPI = ({ employeeId }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/employee/employeeinfo${employeeId}`;

    return async (dispatch, getState) => {
        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[EmployeeAPICalls] callGetEmployeeAPI RESULT : ', result);

        dispatch({ type: GET_EMPLOYEE, payload: result });
    };
};

export const callLoginAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/auth/login`;
    console.log('requestURL--------', requestURL);
    console.log('------', form)
    return async (dispatch, getState) => {
        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 보안상의 이유로 브라우저는 스크립트에서 시작한 교차 출처 HTTP요청을 제한한다.
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': '*', // 모든 도메인에서 접근할 수 있음을 의미 (특정도메인을 넣고싶으면 * 대신 http://test.com)
            },
            body: JSON.stringify({
                employeeId: form.employeeId,
                employeePassword: form.employeePassword,
            }),
        }).then((response) => response.json());

        console.log('[EmployeeAPICalls] callLoginAPI RESULT : ', result);
        if (result.status === 200) {
            window.localStorage.setItem('accessToken', result.userInfo.accessToken);
        }
        else{
            alert("로그인에 실패하였습니다. 아이디 비밀번호를 확인해주세요.")
        }
        dispatch({ type: POST_LOGIN, payload: result });
    };
};

//비밀번호 찾기 api
export const callForgotPasswordAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/employee/searchpwd`;

    return async (dispatch, getState) => {
        // 요청이 시작되었음을 알리는 액션 디스패치
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        console.log('비밀번호찾기 api시작');

        try {
            const response = await fetch(requestURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                },
                body: JSON.stringify({
                    employeeId: form.employeeId,
                    employeeEmail: form.employeeEmail,
                }),
            });
            console.log('비밀번호찾기 api 중간');

            if (!response.ok) {
                // 요청이 실패했을 때 오류 처리
                const errorMessage = await response.text();
                console.error('비밀번호 찾기 요청 실패:', errorMessage);
                dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: errorMessage });
                alert('사용자 정보를 찾을 수 없습니다'); // 사용자에게 알림창 등을 표시할 수 있습니다.
                return; // 오류 처리 후 함수 종료
            }

            // 응답이 성공적인 경우
            const result = await response.json();
            console.log('비밀번호 찾기 요청 성공:', result);
            dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: result });
            alert('이메일로 임시 비밀번호를 보내드렸습니다')
            // 성공적인 응답 데이터를 처리할 수 있습니다.
        } catch (error) {
            // 요청 중 오류가 발생한 경우
            console.error('callForgotPasswordAPI error:', error);
            dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: '비밀번호 재설정 요청 중 오류가 발생했습니다.' });
            alert('비밀번호 재설정 요청 중 오류가 발생했습니다.'); // 사용자에게 알림창 등을 표시할 수 있습니다.
        }
    };
};



//로그아웃 api
export const callLogoutAPI = () => {
    return async (dispatch, getState) => {
        try {
            // 여기에 로그아웃 작업을 추가합니다. (예: 로컬 스토리지에서 토큰 제거 등)
            localStorage.removeItem('accessToken');
            
            // 로그아웃 작업이 성공적으로 완료되면 로그를 출력합니다.
            console.log('[EmployeeAPICalls] callLogoutAPI RESULT : SUCCESS');

            // 성공적으로 로그아웃되었음을 리덕스 스토어에도 알립니다. (필요한 경우)
            dispatch({ type: POST_LOGOUT });
        } catch (error) {
            // 오류가 발생한 경우 오류를 콘솔에 출력합니다.
            console.error('[EmployeeAPICalls] callLogoutAPI ERROR:', error);
            
            // 오류가 발생했음을 리덕스 스토어에도 알립니다. (필요한 경우)
            dispatch({ type: POST_LOGOUT, payload: error });
        }
    };
};


//회원가입 api

export const callRegisterAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/auth/signup`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                employeeId: form.employeeId,
                employeePassword: form.employeePassword,
                employeeName: form.employeeName,
                employeeEmail: form.employeeEmail,
            }),
        }).then((response) => response.json());

        console.log('[EmployeeAPICalls] callRegisterAPI RESULT : ', result);

        if (result.status === 201) {
            dispatch({ type: POST_REGISTER, payload: result });
        }
    };
};

