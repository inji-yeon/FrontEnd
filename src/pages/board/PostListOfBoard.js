import { useEffect, useState } from "react";
import PostHeader from "./components/PostHeader";
import PostList from "./components/PostList";
import { callGetPostsAPI, callSearchPostAPI } from "../../apis/BoardAPICalls";
import { useParams, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
import './PostListOfBoard.css'


const PostListOfBoard = () => {

    const {boardCode} = useParams(); //이름 파라미터

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageNumber, setTotalPageNumber] = useState(0);
    const [posts, setPosts] = useState([]);
    
   const handlePageClick = (data) => {
       let selectedPage = data.selected;
       setCurrentPage(selectedPage);
   };
   useEffect(()=>{
    if(currentPage){
        dispatch(callGetPostsAPI({
            boardCode : boardCode,
            offset : currentPage,
        }));  // 현재 페이지 번호 들고가기
    }
   },[currentPage])

   const board = useSelector(state => state.board); // 상태를 가져올 reducer 이름?
   const dispatch = useDispatch();
//    console.log("======================>", board.postList);
   
    useEffect(() => {

        dispatch(callGetPostsAPI({
            boardCode : boardCode,
        }));
        
    }, []);


    useEffect(() => {
        console.log(board);
        if(board){
            if(board.postList){
                if(board.postList.data){
                    setTotalPageNumber(board.postList.data.totalPages);
                    if(board.postList.data.content){
                        setPosts(board.postList.data.content);
                    }
                }
            }
        }
    }, [board])
    useEffect(()=>{
        console.log(totalPageNumber);
    },[totalPageNumber])


    console.log('board?.postList.data.totalPages', totalPageNumber);



    return <>
        <PostHeader />

        <PostList data={board.postList}/>


        {totalPageNumber > 0 ?
                    <div>
                        <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        initialPage={currentPage}
                        disableInitialCallback={true}
                        pageCount={totalPageNumber}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName={'paging'}   
                        activeClassName={'paging-active'}
                        />
                    </div>
                    : <></>
        }   
    
    </>
}

export default PostListOfBoard;