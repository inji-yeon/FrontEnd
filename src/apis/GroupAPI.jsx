
import {GET_GROUPLIST, GET_GROUPSEARCH} from '../modules/GroupModule';


// export const callGroupChartAPI = ({form}) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/group/chartdata`;
//     console.log('조직 데이터 엔드포인트 갔다 오는지======================')

//     return async (dispatch, getState) => {
//    const result = await fetch(requestURL,{
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//                 Accept: '*/*',
//                 Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
//     }
//    }).then((response) => response.json());
//    console.log('[GroupAPI 조직도]============ RESULT : ', JSON.stringify(result));
//    dispatch({type: GET_GROUPCHART, payload: result});
//    console.log('[GroupAPI 조직도]============ RESULT : ', JSON.stringify(result));
// }
// };


export const callGroupListAPI = ({currentPage}) => {
    let requestURL;
    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/group/chartlist?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/group/chartlist`;
    }

    console.log('[callGroupListAPI] requestURL 사원리스트 뽑아오기 : ');

    console.log('조직 사원리스트 엔드포인트 갔다 오는지======================')
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        if (result.status === 200) {
            console.log('[callGroupListAPI] callProductListForAdminAPI RESULT : ', JSON.stringify(result));
            dispatch({ type: GET_GROUPLIST, payload: result.data  });
        }
        console.log('[callGroupListAPI] Redux 상태 업데이트 확인:', getState().groupreducer);
    };
}



export const callSearchEmpAPI = ({ search }) => {
    console.log('[callSearchEmpAPI] callSearchProductAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/group/chartlist/search?s=${search}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('사원검색하기 ===== [callSearchEmpAPI] callSearchEmpAPI RESULT : ', result);

        dispatch({ type: GET_GROUPSEARCH, payload: result.data });
        console.log('디스패치 되고 사원검색하기 ===== [callSearchEmpAPI] callSearchEmpAPI RESULT : ', result);
    };
};
