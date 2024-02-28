import{
    GET_COMMUTE_LIST,
    GET_DO_PAYMENT,
    GET_DO_REJECT,
    GET_DO_WAITING,
    GET_MY_APPROVAL,
    GET_MY_COMPANION,
    GET_MY_WAITING,
    GET_COMMUTE_MAIN,
    POST_COMMUTE_INSERT,
    PUT_COMMUTE_UPDATE,
    GET_ADMIN_VACATION,
    GET_ADMIN_NO_VACATION,
    GET_DETAIL_MY,
    PUT_DETAIL_DOC,
    POST_MAIN_COMMUTE,
    PUT_MAIN_DEPART
} from '../modules/AttendanceModule'



export const callCommuteMainAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/main`;

    console.log('[AttendanceAPI] requestURL :', requestURL);


    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        console.log(result)
        
        
        if (result.status === 200) {
            
            console.log('[AttendanceAPI] callCommuteMainAPI RESULT : ', result);
            dispatch({ type: GET_COMMUTE_MAIN, payload: result });

        } else {
            console.log('dkdk');
        }
    };

};



export const callCommutInsertAPI = ({ arrivalTime, late }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/main`;

    console.log('[AttendanceAPI] requestURL :', requestURL);


    return async (dispatch, getState) => {
        const requestBody = {
            arrivalTime,
            late // late가 true면 '지각', 아니면 '정상'으로 설정
        };

        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(requestBody),
        });

        console.log(result);

        if (result.status === 200) {
            console.log('[AttendanceAPI] callCommutInsertAPI RESULT : ', result);
            dispatch({ type: POST_COMMUTE_INSERT, payload: result });
        } else {
            console.log('insertFail');
        }
    };
};



export const callCommuteUpdateAPI = ({ departureTime, early }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/main`;

    console.log('[AttendanceAPI] requestURL :', requestURL);


    return async (dispatch, getState) => {
        const requestBody = {
            departureTime,
            early, // late가 true면 '조퇴', 아니면 '정상'으로 설정
            
        };

        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(requestBody),
        });

        console.log(result);

        if (result.status === 200) {
            console.log('[AttendanceAPI] callCommuteUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_COMMUTE_UPDATE, payload: result });
        } else {
            console.log('updateFail');
        }
    };
};











export const callCommutesListAPI = ({ currentPage, now }) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/lists?yearMonth=${now}&offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/lists?yearMonth=${now}`;
    }


    console.log('[AttendanceAPI] requestURL :', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        console.log(result)
        
        
        if (result.status === 200) {
            
            console.log('[AttendanceAPI] callCommutesListAPI RESULT : ', result);
            dispatch({ type: GET_COMMUTE_LIST, payload: result });

        } else {
            console.log('dkdk');
        }
    };
};



export const callDoPaymentAPI = ({ currentPage }) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/payment/completed?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/payment/completed`;
    }


    console.log('[AttendanceAPI] requestURL :', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        console.log(result)
        
        
        if (result.status === 200) {
            
            console.log('[AttendanceAPI] callDoPaymentAPI RESULT : ', result);
            dispatch({ type: GET_DO_PAYMENT, payload: result.data });

        } else {
            console.log('dkdk');
        }
    };
};



export const callDoRejectAPI = ({ currentPage }) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/payment/rejection?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/payment/rejection`;
    }


    console.log('[AttendanceAPI] requestURL :', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        console.log(result)
        
        
        if (result.status === 200) {
            
            console.log('[AttendanceAPI] callDoRejectAPI RESULT : ', result);
            dispatch({ type: GET_DO_REJECT, payload: result.data });

        } else {
            console.log('dkdk');
        }
    };
};



export const callDoWaitingAPI = ({ currentPage }) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/payment/waiting?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/payment/waiting`;
    }

    console.log('[AttendanceAPI] requestURL :', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        console.log(result)
        
        
        if (result.status === 200) {
            
            console.log('[AttendanceAPI] callDoWaitingAPI RESULT : ', result);
            dispatch({ type: GET_DO_WAITING, payload: result.data });

        } else {
            console.log('dkdk');
        }
    };
};




export const callMyApprovalAPI = ({ currentPage }) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/my/documents-payment?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/my/documents-payment`;
    }

    console.log('[AttendanceAPI] requestURL :', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        console.log(result)
        
        
        if (result.status === 200) {
            
            console.log('[AttendanceAPI] callMyApprovalAPI RESULT : ', result);
            dispatch({ type: GET_MY_APPROVAL, payload: result.data });

        } else {
            console.log('dkdk');
        }
    };
};




export const callMyRejectAPI = ({ currentPage }) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/my/documents-companion?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/my/documents-companion`;
    }

    console.log('[AttendanceAPI] requestURL :', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        console.log(result)
        
        
        if (result.status === 200) {
            
            console.log('[AttendanceAPI] callMyRejectAPI RESULT : ', result);
            dispatch({ type: GET_MY_COMPANION, payload: result.data });

        } else {
            console.log('dkdk');
        }
    };
};



export const callMyWaitingAPI = ({ currentPage }) => {
    let requestURL;

     if (currentPage !== undefined && currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/my/documents-waiting?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/my/documents-waiting`;
    }

    console.log('[AttendanceAPI] requestURL :', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        console.log(result)
        
        if (result.status === 200) {
            console.log('[AttendanceAPI] callMyWaitingAPI RESULT : ', result);
            dispatch({ type: GET_MY_WAITING, payload: result });
        } else {
            console.log('dkdk');
        }
    };
};




export const callAdminVacationAPI = ({ currentPage }) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/admin/vacation?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/admin/vacation`;
    }

    console.log('[AttendanceAPI] requestURL :', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        console.log(result)
        
        
        if (result.status === 200) {
            
            console.log('[AttendanceAPI] callAdminVacationAPI RESULT : ', result);
            dispatch({ type: GET_ADMIN_VACATION, payload: result.data });

        } else {
            console.log('dkdk');
        }
    };
};



export const callNoAdminVacationAPI = ({ currentPage }) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/admin/no/vacation?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/admin/no/vacation`;
    }

    console.log('[AttendanceAPI] requestURL :', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        console.log(result)
        
        
        if (result.status === 200) {
            
            console.log('[AttendanceAPI] callNoAdminVacationAPI RESULT : ', result);
            dispatch({ type: GET_ADMIN_NO_VACATION, payload: result.data });

        } else {
            console.log('dkdk');
        }
    };
};






export const callDetailMylAPI = ({ approvalDocumentCode }) => {
    let requestURL;

    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/document/${approvalDocumentCode}`;


    console.log('[AttendanceAPI] requestURL :', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        console.log(result)
        
        
        if (result.status === 200) {
            
            console.log('[AttendanceAPI] callDetailMylAPI RESULT : ', result);
            dispatch({ type: GET_DETAIL_MY, payload: result });

        } else {
            console.log('dkdk');
        }
    };
};





export const callUpdateStateAPI = ({ approvalDocumentCode }) => {
    let requestURL;

    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/document/${approvalDocumentCode}`;

    console.log('[AttendanceAPI] requestURL :', requestURL);

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            });

            const result = await response.json();

            console.log(result);

            if (response.status === 200) {
                console.log('[AttendanceAPI] callDetailMylAPI RESULT : ', result);
                dispatch({ type: PUT_DETAIL_DOC, payload: result });
                return result; // 성공적인 결과를 반환합니다.
            } else {
                console.error('Error while updating state:', result);
                return null; // 실패 시 null을 반환합니다.
            }
        } catch (error) {
            console.error('Error while updating state:', error);
            throw error; // 오류를 다시 던집니다.
        }
    };
};





export const insertCommuteAPI = () => {
    let requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/mainpage/arrive`;

    console.log('[AttendanceAPI] requestURL :', requestURL);

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            });

            // fetch가 완료될 때까지 기다린 후에 아래 코드가 실행됨
            if (response.status === 200) {
                const result = await response.json(); // 응답을 JSON으로 파싱
                console.log('[AttendanceAPI] insertCommuteAPI RESULT : ', result);
                dispatch({ type: POST_MAIN_COMMUTE, payload: result });
            } else {
                console.log('Response status:', response.status);
                console.log('dkdk');
            }
        } catch (error) {
            console.error('Error during API call:', error.message); // 오류 메시지 출력 수정
        }
    };
};




export const updateCommuteAPI = () => {
    let requestURL;

    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/mainpage/arrive`;


    console.log('[AttendanceAPI] requestURL :', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        console.log(result)
        
        
        if (result.status === 200) {
            
            console.log('[AttendanceAPI] updateCommuteAPI RESULT : ', result);
            dispatch({ type: PUT_MAIN_DEPART, payload: result });

        } else {
            console.log('dkdk');
        }
    };
};
