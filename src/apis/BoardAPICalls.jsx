import axios from 'axios'

import {
    GET_POSTS,
    GET_POST,
    POST_POST,
    PUT_POST,
    DELETE_POST,
    PUT_MOVE_POST,
    GET_POSTS_SEARCH,
    POST_LIKE
} from '../modules/BoardModule.jsx'


/* 리덕스 적용 전  */
// export const callGetPostsAPI = ({boardCode}) => {

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/${boardCode}`
//     // const requestURL = `http://localhost:1208/board/${boardCode}`;

//     return axios.get(requestURL, {
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*",
//                 "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
//             }
//         })
//         .then( res => res.data)
//         .catch(error => console.error(error))

//     }



/* 게시글 조회 */
export const callGetPostsAPI = ({boardCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/${boardCode}`
    // const requestURL = `http://localhost:1208/board/${boardCode}`;

    return async(dispatch, getState) => {

        const result = await axios
            .get(requestURL, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then( res => res.data)
        .catch(error => console.error(error))

        console.log("result: ", result.data);

        dispatch({type: GET_POSTS, payload: result.data})

    }

}



/* 게시글 검색 */
export const callSearchPostAPI = (boardCode, search) => {
    console.log(boardCode,search);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/${boardCode}/posts/search?q=${search}`
    return async(dispatch, getState) => {

        const result = await axios
            .get(requestURL, {

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            }
            ).then(res => res.data)
             .catch(err => console.log(err));

            console.log('api : ', result);

            dispatch({type: GET_POSTS, payload: result.data});

    }

}




/* 게시글 등록 */
export const callRegistPostAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/posts/regist`;


    return async(dispatch, getState) => {

        const result = await axios
            .post(requestURL, form, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                },
                
            }
            ).then(res => res.data)
             .catch(err => console.log(err))

            
            console.log(result);

            dispatch({type: POST_POST, payload: result});

    }

}




/* 게시글 하나 상세정보 조회 */
export const callGetPostInfoAPI = ({postCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/posts/${postCode}`;

    return async(dispatch, getState) => {

        const result = await axios.get(requestURL, {

            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(res => res.data)
        .catch(err => console.log(err))
    
        console.log(`result : `, result);

        dispatch({type: GET_POST, payload: result?.data});

    }

}


/* 게시글 좋아요 */
export const callRegistLikeAPI = ({postCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/posts/${postCode}/like`;


    return async(dispatch, getState) => {

        const result = await axios
            .post(requestURL, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                },
                
            }
            ).then(res => res.data)
             .catch(err => console.log(err))

            
            console.log(result);

            dispatch({type: POST_LIKE, payload: result});

    }

}


