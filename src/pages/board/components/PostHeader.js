import { useEffect, useState } from 'react';
import styles from './PostHeader.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { callSearchPostAPI } from '../../../apis/BoardAPICalls';
import { useDispatch, useSelector } from 'react-redux';

function PostHeader() {

    const {boardCode} = useParams(); //이름 파라미터
    const [keyword, setKeyword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchInputHandler = (e) => {
        setKeyword(e.target.value);
    }


    const searchHandler = (e) => {

        if(e.key === 'Enter'){
            dispatch(callSearchPostAPI(
                boardCode,
                keyword,
            ))
        }
        

    }


    return (
        <header style={{paddingTop: 1.2 + 'em'}}>

            <span className={styles.category}>회사 소식</span> <span className={styles.postCnt}>[ 34 ]</span>

            <div className={styles.boardContext}>
                <div>운영자 : 차윤하 팀장  가윤하 본부장  나윤하 팀원</div>
                <br /><br />
                <div>사내 공지 게시판 입니다. 게시판 내용입니다.</div>
            </div>

            <br />
            <div style = {{float: 'right', display: 'flex'}}>
                <input value={keyword} type="text" className={styles.search} placeholder="게시글 검색" onKeyDown={searchHandler} onChange={searchInputHandler} />
                <div className={styles.createPostBtn} onClick={() => navigate('/board/posts/regist')}><span>글쓰기</span></div>
            </div>

        </header>
    );

}

export default PostHeader;
