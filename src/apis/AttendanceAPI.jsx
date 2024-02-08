import{
    GET_COMMUTE_LIST,
    GET_DO_PAYMENT
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
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/lists?offset=${currentPage}`;
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
            dispatch({ type: GET_DO_PAYMENT, payload: result.data });

        } else {
            console.log('dkdk');
        }
    };
};

