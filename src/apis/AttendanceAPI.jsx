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
    PUT_COMMUTE_UPDATE
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

    if(currentPage !== undefined || currentPage !== null) {
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
            dispatch({ type: GET_MY_WAITING, payload: result.data });

        } else {
            console.log('dkdk');
        }
    };
};
