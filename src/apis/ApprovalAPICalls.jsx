import {
    GET_OUTBOX_ONPROCESS,
} from '../modules/ApprovalModule';
import { userEmployeeCode } from '../utils/tokenUtils';


export const callApprovalDocListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/approval/outbox-on-process`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callSelectUserDetailAPI RESULT 111: ', result);

        dispatch({ type:  'approval/GET_OUTBOX_ONPROCESS',  payload: result.data });
        
    };
}

export const callLoggedinUserAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/approval/loggedin-employee`;

    return async (dispatch, getState) => {
        console.log('정보 들어옴');

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
            
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callLoggedinUserAPI RESULT : ', result);

        dispatch({ type: 'approval/GET_APPROVAL_FINDUSERDETAIL',  payload: result.data });
    };
}

export const callApprovalLineUserAPI = (employeeCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/approval-employee/${employeeCode}`;

    return async (dispatch, getState) => {
        console.log('결재선 정보');
        
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callApprovalLineUserAPI RESULT : ', result);

        dispatch({ type: GET_GROUP_User,  payload: result.data });
        
    };
}

