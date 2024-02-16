import { useEffect, useState } from "react";
import PostHeader from "./components/PostHeader";
import PostList from "./components/PostList";
import { callGetPostsAPI, callSearchPostAPI } from "../../apis/BoardAPICalls";
import { useParams, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import queryString from 'query-string';


const PostListOfBoard = () => {

   const {boardCode} = useParams(); //이름 파라미터

   const board = useSelector(state => state.board); // 상태를 가져올 reducer 이름?
   const dispatch = useDispatch();
   console.log("======================>", board.postList);
   
    useEffect(() => {
        dispatch(callGetPostsAPI({
            boardCode : boardCode,
        }));
        
    }, []);


    return <>
        <PostHeader />

        <PostList data={board.postList}/>
    
    </>
}

export default PostListOfBoard;