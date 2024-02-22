import { GET_GROUPCHART } from "../modules/GroupchartModule"; 


export const callGroupChartAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/group/chartdata`;
    console.log('조직 데이터 엔드포인트 갔다 오는지======================')

    return async (dispatch, getState) => {
   const result = await fetch(requestURL,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
    }
   }).then((response) => response.json());
   console.log('[GroupAPI 조직도]============ RESULT : ', JSON.stringify(result));
   dispatch({type: GET_GROUPCHART, payload: result});
   console.log('[GroupAPI 조직도]222222222============ RESULT : ', JSON.stringify(result));
}
};
