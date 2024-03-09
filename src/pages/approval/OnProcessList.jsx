import './OnProcessList.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callOutboxListAPI } from '../../apis/ApprovalAPICalls';


function OnProcessList(){
    const dispatch = useDispatch();
    const documentList = useSelector((state) => state.approvalReducer);
    const navigate = useNavigate();
    
    console.log('documentList Redux State======', documentList);

    useEffect(() => {
        dispatch(callOutboxListAPI());
    }, []);
    
    return(
        <>
        <section className="project_section">
    <div className="op_title_section">
        <span className="op_title">결재 진행함</span>
        <select className="doc_search-options">
            <option value="search_by_title">제목</option>
            <option value="search_by_name">이름</option>
        </select>
        <div className="doc_search_section">
            <input type="text" className="doc_search" placeholder="검색어를 입력해주세요."/>
            <img alt="" className="search_icon" src="/Approval/search.png"/>
        </div>
    </div>

    <div className="op_list_content">
        <table style={{textAlign: "left"}} className="op_list">
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
            {documentList && documentList.map((document) => (
            <tr key = {document.approvalDocCode}>
                <td>{document.approvalForm}</td>
                <td>{document.approvalTitle}</td>
                <td>{document.employeeCode?.employeeName}</td>
                <td>{document.approvalRequestDate}</td>
                <td>
                    <div className="process_check_button">
                        <span className="process_check_text">결재 현황 확인</span>
                    </div>
                </td>
            </tr>
                ))}
            </tbody>
        </table>

    </div>
    </section>
        </>
    );
}

export default OnProcessList;