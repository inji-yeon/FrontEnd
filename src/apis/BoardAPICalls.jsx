import axios from 'axios'

import {
    GET_POSTS,
    GET_POST,
    POST_POST,
    PUT_POST,
    DELETE_POST,
    POST_LIKE,
} from '../modules/PostModule.jsx'

import { 
    POST_COMMENT,
    PUT_COMMENT,
    DELETE_COMMENT, 
} from '../modules/PostCommentModule.jsx'

import { GET_BOARD, GET_BOARDS } from '../modules/BoardModule.jsx'



/* 게시글 조회 */
export const callGetPostsAPI = ({boardCode, offset}) => {

    console.log('게시글 조회 api offset', offset)

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/${boardCode}/posts?offset=${offset ? offset : 0}`

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

        dispatch({type: GET_POSTS, payload: result?.data})

    }

}



/* 게시판 조회 */
export const callGetBoardCategoryAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board`
    return async(dispatch, getState) => {

        const result = await axios
            .get(requestURL, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            }).then(res => res.data)
            .catch(err => console.log(err));

            dispatch({type: GET_BOARDS, payload: result?.data});

    }
}



/* 특정 게시판 조회 */
export const callGetBoardAPI = ({boardCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/${boardCode}`
    return async(dispatch, getState) => {

        const result = await axios
            .get(requestURL, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            }).then(res => res.data)
            .catch(err => console.log(err));

            dispatch({type: GET_BOARD, payload: result?.data});

    }
}



/* 게시글 검색 */
export const callSearchPostAPI = (boardCode, search) => {

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

            dispatch({type: GET_POSTS, payload: result?.data});

    }

}


export function fetForm(url,meth,form){
    return fetch(url,
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

export const insertPostAPI = ({formData}) => {
    return dispatch => {
        fetForm(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/posts/regist`,'POST',formData);
    }
}


export const modifyPostAPI = ({postCode, form}) => {
    return dispatch => {
        fetForm(`http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/posts/${postCode}/update`,'PUT',form);
    }
}


/* 게시글 등록 */
export const callRegistPostAPI = ({formData}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/posts/regist`;

    return async(dispatch, getState) => {

        const result = await axios
            .post(requestURL, formData, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                },
                
            }
            ).then(res => res.data)
             .catch(err => console.log(err))

            dispatch({type: POST_POST, payload: result});

    }

}


export async function downloadFileAPI(attachmentCode) {

    const result = await axios.get(`http://localhost:1208/board/file-download/${attachmentCode}`, {
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




/* 게시글 수정 */
export const callModifyPostAPI = ({postCode, form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/posts/${postCode}/update`;

    return async(dispatch, getState) => {

        const result = await axios
            .put(requestURL, form
                ,{
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                    },
                }
            ).then(res => res.data)
             .catch(err => console.log(err))


            dispatch({type: PUT_POST, payload: result});

    }
}


/* 게시글 삭제 */
export const callRemovePostAPI = ({postCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/posts/${postCode}`;

    return async(dispatch, getState) => {

        const result = await axios
            .delete(requestURL
                ,{
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                    },
                
                }
            ).then(res => res.data)
             .catch(err => console.log(err))

            dispatch({type: DELETE_POST, payload: result});

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

        dispatch({type: GET_POST, payload: result?.data});

    }

}


/* 게시글 좋아요 */
export const callRegistLikeAPI = ({postCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/posts/${postCode}/like`;

    console.log('postCode: ',postCode);

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

            dispatch({type: POST_LIKE, payload: result});

    }

}



/* 댓글 등록 */
export const callRegistCommentAPI = ({postCode, postCommentContext}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/posts/${postCode}/comment/regist`;


    return async(dispatch, getState) => {

        const result = await axios
            .post(requestURL
                ,{ postCommentContext }
                ,{
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                    },
                
                }
            ).then(res => res.data)
             .catch(err => console.log(err))

            dispatch({type: POST_COMMENT, payload: result});

    }
}


/* 댓글 수정 */
export const callModifyCommentAPI = ({commentCode, postCommentContext}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/posts/comment/${commentCode}`;

    return async(dispatch, getState) => {

        const result = await axios
            .put(requestURL
                ,{ postCommentContext }
                ,{
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                    },
                
                }
            ).then(res => res.data)
             .catch(err => console.log(err))

            dispatch({type: PUT_COMMENT, payload: result});

    }
}



/* 댓글 삭제 */
export const callRemoveCommentAPI = ({commentCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/posts/comment/${commentCode}`;

    return async(dispatch, getState) => {

        const result = await axios
            .delete(requestURL
                ,{
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                    },
                
                }
            ).then(res => res.data)
             .catch(err => console.log(err))

            dispatch({type: DELETE_COMMENT, payload: result});

    }
}



