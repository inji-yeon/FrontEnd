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
        fet(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/main-board`)
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
        fetObj(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/attendances/main`,'POST',requestBody)
        .then(res => res.json())
        .then(data => {
            if(data.status === 200){
            }
        })
    } 
}