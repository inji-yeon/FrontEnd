import { useNavigate, useParams } from "react-router";
import Comment from "./components/Comment";
import PostHeader from "./components/PostHeader";
import styles from './PostInfo.module.css'
import { useEffect, useState } from "react";
import { callGetPostInfoAPI, callRegistLikeAPI, callRemovePostAPI } from "../../apis/BoardAPICalls";
import { useDispatch, useSelector } from "react-redux";
import Heart from "./images/heart.png";
import HeartEmpty from "./images/heart_empty.png";
import { sort } from "semver";
import { decodeJwt } from "../../utils/tokenUtils";

const PostInfo = () => {

    const navigate = useNavigate();

   const {postCode} = useParams(); //이름 파라미터

   const [like, setLike] = useState(false);

   // reducer
    const post = useSelector(state => state.board?.post);
    const dispatch = useDispatch();

    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    console.log('token : ',token);

    const [userCode, setUserCode] = useState(0);
    
    useEffect(() => {

        if(post?.employee?.employeeCode){
            setUserCode(post.employee.employeeCode)
        }
        

    }, [post])
    

   console.log('----------', post);


   useEffect(() => {
    
    postCode && dispatch(callGetPostInfoAPI({
        postCode
    }))
    
   }, [])

   console.log('post : ' ,post);





   const toggleLike = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/board/posts/${postCode}/like`;

    fetch(requestURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // handle success response here
        setLike(!like);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}


    /* 게시글 삭제 */
    const removePostHandler = () => {

        dispatch(callRemovePostAPI({
            postCode
        }));

        alert('게시글을 삭제하였습니다.');
        navigate(-1);

    }


    const modifyPostHandler = () => {

       
    }

    



    return <>
        <PostHeader />

        
        {/* 수정, 삭제, 이동 메뉴 */}
        {userCode === token.empCode && (

            <div className={styles.posting}>
                <span id="updatePost" onClick={() => navigate("update")}>수정</span>
                <span id="deletePost" onClick={removePostHandler}>삭제</span>
                <span id="movePost" onClick="">이동</span>
            </div>
        ) }

        



        {/* hr 안먹혀서 깨짐 */}
        <hr style={{ marginTop:70, marginBottom: 15 }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={styles.postTitle}>{post?.postTitle}</div>
            <div className="heartBtn">
                <img src={like? Heart: HeartEmpty} 
                     onClick={toggleLike} />
            </div>
        </div>
        
        
        <div>
             <table>
            <tbody>
                <tr>
                <td rowSpan={2}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={35}
                    height={35}
                    viewBox="0 0 35 35"
                    fill="none"
                    >
                    <circle cx="17.5" cy="17.5" r="17.5" fill="#D9D9D9" />
                    </svg>
                </td>
                <td style={{ paddingTop: 10, color: "#606060" }}>{post?.employee?.employeeName}</td>
                </tr>
                <tr>
                <td style={{ fontSize: 15, padding: 0, margin: 0, color: "#A3A2A2" }}>
                    {post?.postDate}
                </td>
                </tr>
            </tbody>
            </table>

            <br /><br />
            <div className={styles.context}>
                {post?.postContext}
            </div>
            

            <div style={{ display: "flex", fontSize: 14, color: "#606060" }}>
            <div style={{ marginRight: 25 }}>댓글 {post?.postCommentList?.length}</div>
            <div style={{ marginRight: 25 }}>좋아요 4</div>
            <div style={{ marginRight: 25 }}>조회 {post?.postViews}</div>

            </div>

        </div>


        <Comment comments = {post?.postCommentList} postCode={postCode}/>

    
    </>
}

export default PostInfo;