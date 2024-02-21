import { useEffect, useState } from 'react';
import styles from './PostList.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const PostList = ({data}) => {


    console.log('+++postList 컴포넌트에서 받은 ++++++>>> : ', data);
   
        // optional chaining
    // console.log('postList 컴포넌트 : ', data?.data?.content);

    useEffect(() => {


    }, [data]);

    
    
    const navigate = useNavigate();



    return <>
         <table className={styles.PostList}>
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

                
             {data.data?.content.map((post, idx) => (

                    <tr key={post.postCode} onClick={() => navigate(`/board/posts/${post.postCode}`)}>
                        <td>{post.postCode}</td>
                        <td>{post.postTitle}</td>
                        <td>{post.employee.employeeName}</td>
                        <td>{post.postDate}</td>
                        <td>{post.postViews}</td>
                        <td>3</td>
                    </tr>

                ))
                
            }


            </tbody>
        </table>

    
    </>
}

export default PostList;