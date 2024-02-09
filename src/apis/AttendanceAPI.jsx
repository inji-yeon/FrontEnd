import{
    GET_COMMUTE_LIST,
    GET_DO_PAYMENT,
    GET_DO_REJECT,
    GET_DO_WAITING,
    GET_MY_APPROVAL,
    GET_MY_COMPANION,
    GET_MY_WAITING
} from '../modules/AttendanceModule'


export const callCommutesListAPI = ({ currentPage, now }) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/lists?yearMonth=${now}&offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/lists`;
    }


    console.log('[AttendanceAPI] requestURL :', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: `Bearer ${process.env.REACT_APP_KEY}`,//window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        console.log(result)
        
        
        if (result.status === 200) {
            
            console.log('[AttendanceAPI] callCommutesListAPI RESULT : ', result);
            dispatch({ type: GET_COMMUTE_LIST, payload: result.data });

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
                Authorization: `Bearer ${process.env.REACT_APP_KEY}`,//window.localStorage.getItem('accessToken'),
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
                Authorization: `Bearer ${process.env.REACT_APP_KEY}`,//window.localStorage.getItem('accessToken'),
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
                Authorization: `Bearer ${process.env.REACT_APP_KEY}`,//window.localStorage.getItem('accessToken'),
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
                Authorization: `Bearer ${process.env.REACT_APP_KEY}`,//window.localStorage.getItem('accessToken'),
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
                Authorization: `Bearer ${process.env.REACT_APP_KEY}`,//window.localStorage.getItem('accessToken'),
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
                Authorization: `Bearer ${process.env.REACT_APP_KEY}`,//window.localStorage.getItem('accessToken'),
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
