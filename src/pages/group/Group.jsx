import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GroupStyle from './Group.module.css';
import { GET_GROUPLIST, GET_GROUPSEARCH } from '../../modules/GroupModule';
import { callGroupListAPI, callSearchEmpAPI } from '../../apis/GroupAPI';



function Group() {

    const dispatch = useDispatch();
    const groups = useSelector((state) => state.groupreducer);
    console.log('groups나오는지 한 번 보자 --------',groups)

    const groupList = groups.data?.content;
    console.log('groupList나오는지 한 번 보자 --------',groupList)
    const pageInfo = groups.pageInfo;

    const [searchValue, setSearchValue] = useState('');
    const searchResults = useSelector((state) => state.groupreducer);
    


    console.log('검색결과 나온냐=========',searchResults)
 
    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);

    const pageNumber = [];
    if (pageInfo) {
        console.log("플러스에서 페이지 넘버가 뭐냐",pageInfo)
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }


    useEffect(() => {
        console.log("마이너스에서 페이지 넘버가 뭐냐",pageInfo)
        setStart((currentPage - 1) * 5); 
        dispatch(
            callGroupListAPI({
                currentPage: currentPage,
            })
        );
    }, [dispatch,currentPage]);

    useEffect(() => {
        // groupList가 변경될 때마다 로그를 출력합니다.
        console.log('데이터 나오는지================34343434343= ', groupList);
    }, [groupList]);

     const handleSearch = () => {
        // 검색 버튼이 클릭되면 검색 API를 호출합니다.
        dispatch(callSearchEmpAPI({ search: searchValue }));
    };

    const handleKeyPress = (e) => {//엔터키 가능하게 하기
        if (e.key === 'Enter') {
            handleSearch();
        }
    };






  return (
    <>
      {/* 이 곳은 그룹 페이지입니다. */}
      <div className={GroupStyle.groupsection}>
            <div className={GroupStyle.maincontent}>
                <div className={GroupStyle.grouptable}>
                    <div className={GroupStyle.contentbox}>
                        {/* 여기는 테이블 내리는 용 div */}
                    </div>
              
              <div className={GroupStyle.searchcontainer}>
                            <input
                             type="text" 
                             value={searchValue}
                             onChange={(e) => setSearchValue(e.target.value)}
                             id={GroupStyle.searchInput} 
                             onKeyPress={handleKeyPress} 
                             placeholder="부서명 or 부서원을 입력하세요" 
                             />
                            <button onClick={handleSearch} id={GroupStyle.searchButton}>검색</button>
                        </div>
                        {searchResults && searchResults.length > 0 && (
                <>
                    <table  className={GroupStyle.grouptable2}>
                        <thead>
                            <tr>
                                <th>사원번호</th>
                                <th>이름</th>
                                <th>부서</th>
                                <th>이메일</th>
                                <th>전화번호</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {searchResults.map((employee) => (
                                <tr key={employee.empCode}>
                                    <td>{employee.empCode}</td>
                                    <td>{employee.empName}</td>
                                    <td>{employee.department.departmentName}</td>
                                    <td>{employee.empEmail}</td>
                                    <td>{employee.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

{(!searchResults || searchResults.length === undefined || searchResults.length === 0) && (

    <>
                    <table className={GroupStyle.grouptable2}>
                        <thead>
                            <tr>
                                <th>사원번호</th>
                                <th>이름</th>
                                <th>부서</th>
                                <th>이메일</th>
                                <th>전화번호</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                        {groupList && groupList.map((employee) => (
                            <tr key={employee.empCode}>
                                    <td>{employee.empCode}</td>
                                    <td>{employee.empName}</td>
                                    <td>{employee.department.departmentName}</td>
                                    <td>{employee.empEmail}</td>
                                    <td>{employee.phone}</td>
                                </tr>
                            ))}
                        {(!groupList || groupList.length === 0) && (
                            <tr>
                                    <td colSpan="5">조회된 사원이 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
            </>
                    )}




                    

                            {/* 실제 데이터는 서버에서 가져와서 반복적으로 표시해야 함 */}
                    
                <br/>
                <br/>
              <div className={GroupStyle.pageingmain}>
              <div style={{ listStyleType: 'none', display: 'flex' }}>
                {Array.isArray(groupList) && (
                    <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={GroupStyle.pagingBtn}
                    >
                        &lt;
                    </button>
                )}
                {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button
                            style={currentPage === num ? { backgroundColor: '#FFBE98' } : null}
                            className={GroupStyle.pagingBtn}
                            >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(groupList) && (
                    
                    <button
                    className={GroupStyle.pagingBtn}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}
                    >
                        &gt;
                    </button>
                )}
                </div>{/* 이게테이블 div */}
              </div>
            </div>
            </div>
        </div>

    </>
  );
}

export default Group;
