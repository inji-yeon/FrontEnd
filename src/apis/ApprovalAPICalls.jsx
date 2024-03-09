import {
    GET_OUTBOX_ONPROCESS,
    POST_APPROVAL_DOC,
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

        dispatch({ type: 'approval/GET_APPROVAL_FINDUSERDETAIL',  payload: result });
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
