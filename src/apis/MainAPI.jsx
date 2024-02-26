import { success } from "../modules/MainModule";

export function fet(url,meth){
    return fetch(url,
    {   
        method: meth ? meth : 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        }
    }
)
}
export function fetObj(url,meth,obj){
    return fetch(url,
    {   
        method: meth ? meth : 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(obj)
    }
)
}

export const getMailToMain = () => {
    return dispatch => {
        fet(`http://localhost:1208/board/main-board`)
        .then(res => res.json())
        .then(data => {
            if(data.status === 200){
                dispatch(success(data.data));
            }
        })
    } 
}

export const commuteInput = () => {
    const getCurrentDateTime = () => {
        const now = new Date();
        return `${now.getFullYear()}-${padZero(now.getMonth() + 1)}-${padZero(now.getDate())} ${padZero(now.getHours())}:${padZero(now.getMinutes())}:${padZero(now.getSeconds())}`;
    };
    const padZero = (num) => num.toString().padStart(2, '0');
    const currentTime = getCurrentDateTime();
    const [hours, minutes, seconds] = currentTime.split(' ')[1].split(':').map(Number);
    const requestBody = {
        arrivalTime: currentTime.replace(' ', 'T'),
        late: hours >= 9 && minutes >= 1 && seconds >= 0 
    };
    return dispatch => {
        fetObj(`http://localhost:1208/api/v1/attendances/main`,'POST',requestBody)
        .then(res => res.json())
        .then(data => {
            if(data.status === 200){
            }
        })
    } 
}
export const callAttendenceAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/main`;

    console.log('[AttendanceAPI] requestURL :', requestURL);
    fet(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/main`)
    .then(res => res.text())
    .then(data => {
        console.log('근태 관련 데이터 :',data);
    })
}
const 원본 = () => {
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
            // dispatch({ type: GET_COMMUTE_MAIN, payload: result });/

        } else {
            console.log('dkdk');
        }
    };

};