// import {GET_MAIL} from '../modules/MailModule';
// import datas  from '../testdata/userInfor'

// export const getMail = () => (dispatch) => {
//     alert("MailAPI옴");
//     console.log(datas);
//     dispatch({type: GET_MAIL, payload: datas});
// }

import { fail, request, success } from "../modules/MailModule";
import axios from 'axios';

export async function downloadFileAPI(attachmentCode) {

    const result = await axios.get(`http://localhost:1208/mail/download-attachment/${attachmentCode}`, {
        responseType: 'blob', // 응답을 Blob 형태로 받아옴
      })
          .then(response => {
            const contentDisposition = response.headers.get('expires');
            console.log('Content-Disposition:', contentDisposition);


            console.log('==========>', response)
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = contentDisposition; // 다운로드될 파일 이름 설정
            a.click();
            window.URL.revokeObjectURL(url);
          })
          .catch(error => {
            console.error('Error while downloading file:', error);
          })
          .catch(err => console.log(err));
  
   console.log(result)
}
    
  
      // 서버의 파일 다운로드 엔드포인트로 요청을 보냄
//   const result = await fetch(`http://localhost:1208/mail/download-attachment/${attachmentCode}`,
//     {
//         method: 'GET',
//         headers:{
//             Accept: '*/*',
//             Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
//         }
//   })
//   .then(res => res.json())
//   .then(response => {
//     console.log(response.data);
//     // const result =

//     // return response.blob().then(blob => {
//     //   const url = window.URL.createObjectURL(blob);
//     //   const link = document.createElement('a');
//     //   link.href = url;
//     //   link.setAttribute('download', 'download');
//     //   document.body.appendChild(link);
//     //   link.click();
//     //   link.parentNode.removeChild(link);
//     //   window.URL.revokeObjectURL(url);
//     // });
    
//     // const url = window.URL.createObjectURL(response);
//     const link = document.createElement('a');
//     link.href = '/static/web-files/d5abf3614f2547ca8d43a6e078c0b2cb.jpg';
//     link.setAttribute('download', '이름');
//     // document.body.appendChild(link);
//     link.click();
//     console.log(link);
//     // link.parentNode.removeChild(link);
//     // window.URL.revokeObjectURL(url);
//     //return response.data;
//   })
//   .catch(error => console.error('Download error:', error));
//   console.log(result);





export const fetchMailByStatus = (status,selectedPage) =>{
    return dispatch => {
        //const token = 'eyJkYXRlIjoxNzA3MjY3MTk2NDIxLCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJlbXBsb3llZU5hbWUiOiLsoJXsp4DshK0iLCJzdWIiOiJyb290IiwiZW1wbG95ZWVFbWFpbCI6IndqZHdsdGpxODQ4MkBnbWFpbC5jb20iLCJleHAiOjE3MDczMDMxOTYsImVtcGxveWVlUm9sZSI6W3siZW1wbG95ZWVObyI6MCwiYXV0aG9yaXR5Q29kZSI6MiwiYXV0aG9yaXR5Ijp7ImF1dGhvcml0eUNvZGUiOjIsImF1dGhvcml0eU5hbWUiOiJST0xFX0FETUlOIiwiYXV0aG9yaXR5RGVzYyI6Iuq0gOumrOyekCJ9fV19.HgsJESI1u7CQo7kHmnGEPJt7cw80-2eNcxdnWewzvhU';
        //console.log(status);
        dispatch(request());
        fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/mail/find-receive-mail?condition=${status}&page=${selectedPage? selectedPage : 0}`,
            {   
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                }
            }
        )
            .then(res => res.json())
            .then(data => {
                dispatch(success(data));
            })
            .catch(error => dispatch(fail(error)))
    }
}
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
export async function fetForm(url,meth,form){
    return await fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/${url}`,
    {   
        method: meth ? meth : 'GET',
        headers: {
            Accept: '*/*',
            Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: form
    }
)
}
export const sendMails = (form) => {
    return dispatch => {
        fetForm(`http://localhost:1208/mail/send-mail`,'POST',form)
    }
}
export const fetchMailToMe = (page) => {
    return dispatch => {
        fet(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/mail/to-me?page=${page ? page : 0}`)
        .then(res => res.json())
        .then(data => {
            if(data.status === 200){
                dispatch(success(data));
            } else {
                dispatch(fail(data));
            }
        })
        .catch(error => {
            console.log('내게 쓴 메일 Fetch중 에러 발생 :',error);
        })
    }
}

export function changeReadStatus(emailCode){
    fet(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/mail/read-stats-n?emailCode=${emailCode}`,'PUT');
}
export function setRead(emailCode){
    fet(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/mail/read-stats-y?emailCode=${emailCode}`,'PUT');
}
export const updateEmailStatus = (emailCode, emailStatus) => {
    console.log('여기는 ');
    return dispatch => {
        fet(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/mail/update-status?emailCode=${emailCode}&status=${emailStatus}`,'PUT')
        .then(res => res.json())
        .then(data => {
            if(data.status === 200){
                console.log('이메일 상태로 조회 성공');
            }
        })
    } 
}

export const getUnreadMail = async () => {
    const res = await fet(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/mail/unread-email-count`);
    const textData = await res.text(); // 텍스트 데이터 기다림
    return textData; // 텍스트 데이터 반환
}
export const sendMail = (email) => {
    console.log('이메일 보내기');

    return dispatch => {
        fetObj(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/mail/mail/alert/send?email=${email}`)
        .then(res => res.json())    //응답 온 것을 json으로 바꾸기
    }
}
export const fetchMail = (emailCode) =>{
    console.log("뭐하냐");
    return dispatch => {
        fet(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/mail/find-a-mail?emailCode=${emailCode}`).then(res => res.json())
            .then(data => {
                if(data.status === 200){
                    dispatch(success(data));
                    console.log('fetch한 결과 : ',data);
                }
            })
            .catch(error => {
                dispatch(fail(error))
            })
    }
}

export const toggleImportant = (emailCode,emailStatus) =>{
    console.log("상태 바꾸기");
    return dispatch => {
        fet(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/mail/toggle-important?emailCode=${emailCode}&emailStatus=${emailStatus}`,'PUT').then(res => res.json())
            .then(data => {
                if(data.status === 200){
                    console.log('성공 ',data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const fetchMailByReadStatus = (page) =>{
    return dispatch => {
        dispatch(request());
        fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/mail/non-read-email?page=${page ? page : 0}`,
            {   
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                }
            }
        )
            .then(res => res.json())
            .then(data => {
                dispatch(success(data));
            })
            .catch(error => dispatch(fail(error)))
    }
}
export const fetchMailSearch = (word, option, page) =>{
    return dispatch => {
        console.log('메일 검색 디스패치 중');
        console.log('메일 검색 디스패치 중 :',option,'으로',word,'를 검색합니다.');

        //dispatch(request());

        return fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/mail/find-email?word=${word}&option=${option}&page=${page}`,
            {   
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization : 'Bearer ' + window.localStorage.getItem('accessToken'),
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 1100){
                    dispatch(fail());
                } else if(data.status === 401){
                    console.log('또 401 뜸');
                } 
                else {
                    console.log('fetch에서 막 가져온 따끈따끈한 데이터는? : ',data);
                    if(data.data.length === 0){
                        dispatch(fail());
                    } else {
                        dispatch(success(data));
                    }
                }
                
            })
            .catch(error => {
                console.log("fetch 중 오류가 발생했습니다. 기본페이지로 돌아갑니다.",error);
                
                dispatch(fail(error))
            })
    }
}
