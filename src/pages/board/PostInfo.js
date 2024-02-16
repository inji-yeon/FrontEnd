import { useParams } from "react-router";
import Comment from "./components/Comment";
import PostHeader from "./components/PostHeader";
import styles from './PostInfo.module.css'
import { useEffect, useState } from "react";
import { callGetPostInfoAPI, callRegistLikeAPI } from "../../apis/BoardAPICalls";
import { useDispatch, useSelector } from "react-redux";
import Heart from "./images/heart.png";
import HeartEmpty from "./images/heart_empty.png";

const PostInfo = () => {

   const {postCode} = useParams(); //이름 파라미터

   const [like, setLike] = useState(false);

   const post = useSelector(state => state.board?.post);
   console.log('----------', post);
   const dispatch = useDispatch();



   useEffect(() => {
    dispatch(callGetPostInfoAPI({
        postCode : postCode
    }));

   }, [])

   console.log('post : ' ,post);

   const toggleLike = () => {

    setLike(!like);

    // post api 호출
    dispatch(callRegistLikeAPI({
        postCode
    }));

   }


    return <>
        <PostHeader />


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
                <td style={{ paddingTop: 10, color: "#606060" }}>{post?.employee.employeeName}</td>
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
            <div style={{ marginRight: 25 }}>댓글 {post?.postCommentList.length}</div>
            <div style={{ marginRight: 25 }}>좋아요 4</div>
            <div style={{ marginRight: 25 }}>조회 {post?.postViews}</div>

            </div>

        </div>


        <Comment comments = {post?.postCommentList} postCode={postCode}/>

        
    
    
    </>
}

export default PostInfo;