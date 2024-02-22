import { request, success,fail } from "../modules/AdminModule";

function fet(url,meth){
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

export const getDepartment = () => {
    return dispatch => {
        dispatch(request())
        fet(`http://localhost:1208/admin/get-department`)
        .then(res => res.json())
        .then(data => {
            dispatch(success(data));
            console.log('조직 조회 성공');
        })
        .catch(error => console.log('조직 조회 실패 :',error))
    }
}



export const fetchMailByStatus = (status,selectedPage) =>{
    return dispatch => {
        //const token = 'eyJkYXRlIjoxNzA3MjY3MTk2NDIxLCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJlbXBsb3llZU5hbWUiOiLsoJXsp4DshK0iLCJzdWIiOiJyb290IiwiZW1wbG95ZWVFbWFpbCI6IndqZHdsdGpxODQ4MkBnbWFpbC5jb20iLCJleHAiOjE3MDczMDMxOTYsImVtcGxveWVlUm9sZSI6W3siZW1wbG95ZWVObyI6MCwiYXV0aG9yaXR5Q29kZSI6MiwiYXV0aG9yaXR5Ijp7ImF1dGhvcml0eUNvZGUiOjIsImF1dGhvcml0eU5hbWUiOiJST0xFX0FETUlOIiwiYXV0aG9yaXR5RGVzYyI6Iuq0gOumrOyekCJ9fV19.HgsJESI1u7CQo7kHmnGEPJt7cw80-2eNcxdnWewzvhU';
        //console.log(status);
        dispatch(request());
        fetch(`http://localhost:1208/mail/find-receive-mail?condition=${status}&page=${selectedPage? selectedPage : 0}`,
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
                console.log(data);
            })
            .catch(error => dispatch(fail(error)))
    }
}