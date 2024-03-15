import {
    GET_OUTBOX_ONPROCESS,
    POST_OVERWORK_DOC,
    GET_OUTBOX_FINISHED,
    GET_OUTBOX_REJECTED,
    GET_OVERWORK_DETAILS,
    PUT_RETRIEVAL,
    GET_RETRIEVAL_LIST,
    POST_SAVE_OVERWORK,
} from '../modules/ApprovalModule';

export const callOutboxOnProcessListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/approval/outbox-on-process`;

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

        console.log('[ApprovalAPICalls] callOutboxOnProcessListAPI RESULT: ', result);

        dispatch({ type:  'approval/GET_OUTBOX_ONPROCESS',  payload: result.data });
        
    };
}

export const callLoggedinUserAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/approval/loggedin-employee`;

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

            dispatch({ type: POST_OVERWORK_DOC, payload: result });
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

export const CallApprovalAttachedDownloadAPI = ({ fileName }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/approval/attachment/${fileName}`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            console.log('[ApprovalAPICalls] CallApprovalAttachedDownloadAPI RESULT: ', url);

            dispatch({ type: 'approval/GET_APPROVAL_ATTACHMENT', payload: { url, fileName } });
        } catch (error) {
            console.error('[ApprovalAPICalls] CallApprovalAttachedDownloadAPI ERROR: ', error);
            // Handle error
        }
    };
};

export const callRetrievalAPI = ({ approvalDocCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/approval/retrieval/${approvalDocCode}`;
    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('approvalDocCode 잘 전달되는지: ', approvalDocCode);
            console.log('[ApprovalAPICalls] callRetrievalAPI RESULT: ', result);

            dispatch({ type:  'approval/PUT_RETRIEVAL',  payload: result });

            // 비동기 작업 완료 후 결과를 반환합니다.
            return result;
        } catch (error) {
            console.error('[ApprovalAPICalls] callRetrievalAPI ERROR: ', error);
            // Handle error
            throw error; // 에러를 다시 throw하여 오류 처리를 호출하는 곳에서 처리할 수 있도록 합니다.
        }
    };
}

export const callOutboxRetrievedListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/approval/outbox-retrieved`;

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

        console.log('[ApprovalAPICalls] callOutboxRetrievedListAPI RESULT: ', result);

        dispatch({ type:  'approval/GET_RETRIEVAL_LIST',  payload: result.data });
        
    };
}
export const callSaveOverworkAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/approval/temp-save-overwork`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: form,
        }).then((response) => response.json());

            dispatch({ type: POST_SAVE_OVERWORK, payload: result });
    };
}