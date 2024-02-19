import {
    GET_OUTBOX_ONPROCESS,
} from '../modules/ApprovalModule';

// export const callApprovalDocListAPI = () => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/approval/outbox-approval`;
//     console.log('[ApprovalAPICalls] requestURL : ', requestURL);

//     return async (dispatch, getState) => {
//         const result = await fetch(requestURL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: '*/*',
//                 Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
//             }
//         }).then((response) => response.json());
//         console.log(result);
//         if (result.status === 200) {
//             console.log('[ApprovalAPICalls] callApprovalDocListAPI RESULT : ', result);
//             dispatch({ type: GET_OUTBOX_ONPROCESS, payload: result.data.content });
//         }
//     }
// }

// export const callApprovalDocListAPI = () => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/approval/outbox-approval`;
//     console.log('api 들옴?');

//     return async (dispatch, getState) => {
//         try {
//             const response = await fetch(requestURL, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accept: '*/*',
//                     Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
//                 }
//             });
            
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const result = await response.json();

//             console.log('[ApprovalAPICalls] callApprovalDocListAPI RESULT : ', result);

//             if (result.status === 200) {
//                 dispatch({ type: 'approval/GET_OUTBOX_ONPROCESS', payload: result.data });
//             } else {
//                 // Handle other status codes or error cases
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             // Handle error, such as displaying a message to the user
//         }
//     }
// }

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
