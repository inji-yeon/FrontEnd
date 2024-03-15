import './CompletedList.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callOutboxFinishedListAPI } from '../../apis/ApprovalAPICalls';

function formatDate(dateArray) {
    const year = dateArray[0];
    const month = String(dateArray[1]).padStart(2, '0');
    const day = String(dateArray[2]).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function CompletedList(){
    const dispatch = useDispatch();
    const documentList = useSelector((state) => Array.isArray(state.approvalReducer) ? state.approvalReducer : []);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedPage, setSelectedPage] = useState(1); // 선택된 페이지 추적

    console.log('documentList Redux State======', documentList);

    useEffect(() => {
        dispatch(callOutboxFinishedListAPI());
    }, []);
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = documentList.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setSelectedPage(pageNumber); // 페이지 번호를 클릭할 때 선택된 페이지 상태 업데이트
    };

    const goToFirstPage = () => {
        setCurrentPage(1);
        setSelectedPage(1); // 맨 처음 페이지로 이동할 때 선택된 페이지 상태 업데이트
    };

    const goToLastPage = () => {
        setCurrentPage(Math.ceil(documentList.length / itemsPerPage));
        setSelectedPage(Math.ceil(documentList.length / itemsPerPage));
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
        if (currentPage > 1) setSelectedPage(currentPage - 1);
    };
    const goToNextPage = () => {
        if (currentPage < Math.ceil(documentList.length / itemsPerPage)) setCurrentPage(currentPage + 1);
        if (currentPage < Math.ceil(documentList.length / itemsPerPage)) setSelectedPage(currentPage + 1);
    };

    
    return(
        <>
        <section className="project_section">
    <div className="cp_title_section">
        <span className="cp_title">결재 완료함</span>
        <select className="cp_doc_search_options">
            <option value="search_by_title">제목</option>
            <option value="search_by_name">이름</option>
        </select>
        <div className="cp_doc_search_section">
            <input type="text" className="cp_doc_search" placeholder="검색어를 입력해주세요."/>
            <img alt="" className="search_icon" src="/Approval/search.png"/>
        </div>
    </div>

    <div className="cp_list_content">
        <table style={{textAlign: "left"}} className="cp_list">
            <thead>
            <tr>
                <th>분류</th>
                <th>제목</th>
                <th>기안자</th>
                <th>기안 일자</th>
                <th>상태</th>
            </tr>
            </thead>

            <tbody>
            {documentList && currentItems.map((document) => (
            <tr key = {document.approvalDocCode}>
                <td>{document.approvalForm}</td>
                <td>{document.approvalTitle}</td>
                <td>{document.employeeCode?.employeeName}</td>
                <td>{formatDate(document.approvalRequestDate)}</td>
                <td>
                    <div className="cp_process_check_button">
                        <span className="cp_process_check_text">결재 완료</span>
                    </div>
                </td>
            </tr>
                ))}
            </tbody>
        </table>
        <ul className="pagination">
            <li className="page-item">
                <button onClick={goToFirstPage}>{"<<"}</button>
            </li>
            <li className="page-item">
                <button onClick={goToPreviousPage}>{"<"}</button>
            </li>
            {[...Array(Math.ceil(documentList.length / itemsPerPage))].map((_, index) => (
                <li key={index} className={`page-item ${selectedPage === index + 1 ? 'active' : ''}`}> {/* 변경: 선택된 페이지에 'active' 클래스 추가 */}
                    <button onClick={() => paginate(index + 1)} className="page-link">
                        {index + 1}
                    </button>
                </li>
            ))}
            <li className="page-item">
                <button onClick={goToNextPage}>{">"}</button>
            </li>
            <li className="page-item">
                <button onClick={goToLastPage}>{">>"}</button>
            </li>
        </ul>
    </div>
    </section>
        </>
    );
}

export default CompletedList;