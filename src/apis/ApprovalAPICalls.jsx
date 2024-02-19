import {
    GET_OUTBOX_ONPROCESS,
} from '../modules/ApprovalModule';


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
