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

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPageNumber, setTotalPageNumber] = useState(0);
    const [posts, setPosts] = useState([]);
    

   const handlePageClick = (data) => {
       let selectedPage = data.selected;
       setCurrentPage(selectedPage);

       if(currentPage){
        dispatch(callGetPostsAPI({
            boardCode : boardCode,
            offset : selectedPage,
        })); 
    }else {
        console.log('페이지 버튼을 눌렀지만 currentPage가 존재하지 않음');
    }
   };


   useEffect(()=>{
    if(currentPage){
        dispatch(callGetPostsAPI({
            boardCode : boardCode,
            offset : currentPage,
        }));  // 현재 페이지 번호 들고가기
    }else {
    }
   },[boardCode, currentPage])


   const board = useSelector(state => {
    if(state.board){
        return state.board.postList;
    }
}); // 상태를 가져올 reducer 이름?
   const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(callGetPostsAPI({
            boardCode : boardCode,
        }));
        
    }, [boardCode]);


    useEffect(() => {
        console.log('셀릭터로 가져온거 :',board);
                if(board){
                    setTotalPageNumber(board.totalPages);
                    if(board.content){
                        setPosts(board.content);
                    }
        }
    }, [board])



    return <>
        <PostHeader boardCode={boardCode}/>

        <PostList data={board}/>


        {totalPageNumber >= 0 ?
                    <div>
                        <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
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
                    : <>
                    <div style={{marginTop: 50,textAlign: 'center',}}>게시글이 없습니다.</div>
                    
                    </>
        }   
    
    </>
}

export default PostListOfBoard;