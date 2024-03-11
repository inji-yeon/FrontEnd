import {
    GET_OUTBOX_ONPROCESS,
    POST_APPROVAL_DOC,
    GET_OUTBOX_FINISHED,
    GET_OUTBOX_REJECTED,
    GET_OVERWORK_DETAILS,
} from '../modules/ApprovalModule';
import axios from 'axios';
import { userEmployeeCode } from '../utils/tokenUtils';


export const callOutboxListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/approval/outbox-approval`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callSelectUserDetailAPI RESULT: ', result);

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

export const callSubmitOverworkAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/approval/submit-overwork`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: form,
        }).then((response) => response.json());

            dispatch({ type: POST_APPROVAL_DOC, payload: result });
    };
}
export const callOutboxFinishedListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/approval/outbox-finished`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callOutboxFinishedListAPI RESULT: ', result);

        dispatch({ type:  'approval/GET_OUTBOX_FINISHED',  payload: result.data });
        
    };
}
export const callOutboxRejectedListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/approval/outbox-rejected`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callOutboxRejectedListAPI RESULT: ', result);

        dispatch({ type:  'approval/GET_OUTBOX_REJECTED',  payload: result.data });
        
    };
}
export const callOverworkDetailsAPI = ({ approvalDocCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/approval/overwork/${approvalDocCode}`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('approvalDocCode 잘 전달되는지: ', approvalDocCode);
        console.log('[ApprovalAPICalls] callOverworkDetailsAPI RESULT: ', result);

        dispatch({ type:  'approval/GET_OVERWORK_DETAILS',  payload: result.data });
        
    };
}