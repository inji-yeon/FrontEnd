import './PostHeader.css';

function PostHeader() {


    return (
        <header style={{paddingTop: 1.2 + 'em'}}>

            <span className="category">회사 소식</span> <span className="postCnt">[ 34 ]</span>

            <div className="boardContext">
                <div>운영자 : 차윤하 팀장  가윤하 본부장  나윤하 팀원</div>
                <br /><br />
                <div>사내 공지 게시판 입니다. 게시판 내용입니다.</div>
            </div>

            <br />
            <div style = {{float: 'right', display: 'flex'}}>
                <input type="text" className="search" placeholder="게시글 검색"/>
                <a href="./CreatePost.html" className="createPostBtn"><span>글쓰기</span></a>
            </div>

        </header>
    );

}

export default PostHeader;
