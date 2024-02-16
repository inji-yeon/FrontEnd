import './PostList.css';

const PostList = () => {


    return <>
         <table style={{textAlign: 'left', marginTop: 70}} className="PostList">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회</th>
                    <th>좋아요</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>21</td>
                    <td>자율시간제 공지</td>
                    <td>차윤하 본부장</td>
                    <td>2024-01-09</td>
                    <td>6</td>
                    <td>3</td>
                </tr>

                <tr>
                    <td>20</td>
                    <td>사내 결제 시스템 안내</td>
                    <td>차윤하 본부장</td>
                    <td>2024-01-09</td>
                    <td>5</td>
                    <td>39</td>
                </tr>

            </tbody>
        </table>
    
    </>
}

export default PostList;