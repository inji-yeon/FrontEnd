

export function getData(url,action,token){
    return async (dispatch) => {
        try {
            const response = await fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization : `Bearer ${token}`
                }
            });
            const mailData = await response.json();

            console.log('데이터 가져오기 성공 : ',mailData);
            dispatch({type: action,payload: mailData});
        } catch(error){
            console.log('데이터 가져오기 실패 : ',error);
        }
    }
}
