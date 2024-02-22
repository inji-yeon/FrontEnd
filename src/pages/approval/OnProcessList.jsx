import './OnProcessList.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callApprovalDocListAPI } from '../../apis/ApprovalAPICalls';


function OnProcessList(){
    const dispatch = useDispatch();
    const document = useSelector((state) => state.approvalReducer);
    const documentList = document?.data;
    const navigate = useNavigate();
    // const documentList = useSelector(state => {
    //     console.log('Redux State:', state); // 전체 상태를 확인
    //     return state.approvalReducer; // 원하는 상태만 선택
    // });
    
    console.log('document Redux State======', document);
    console.log('documentList Redux State======', documentList);

    useEffect(() => {
        dispatch(callApprovalDocListAPI());
    }, []);

    // const pageInfo = documentList.pageInfo;

    // const [start, setStart] = useState(0);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [pageEnd, setPageEnd] = useState(1);

    // const pageNumber = [];
    // if (pageInfo) {
    //     for (let i = 1; i <= pageInfo.pageEnd; i++) {
    //         pageNumber.push(i);
    //     }
    // }



    // useEffect(() => {
    //     setStart((currentPage - 1) * 5);
    //     dispatch(
    //         callApprovalDocListAPI({
    //             currentPage: currentPage,
    //         })
    //     );
    // }, [currentPage]);
    
    return(
        <>
        <section className="project_section">
    <div className="awaiting_title_section">
        <span className="awaiting_title">결재 진행함</span>
        <select className="doc_search-options">
            <option value="search_by_title">제목</option>
            <option value="search_by_name">이름</option>
        </select>
        <div className="doc_search_section">
            <input type="text" className="doc_search" placeholder="검색어를 입력해주세요."/>
            <img alt="" className="search_icon" src="/Approval/search.png"/>
        </div>
    </div>

    <div className="awaiting_list_content">
        <table style={{textAlign: "left"}} className="awaiting_list">
            <thead>
            <tr>
                <th>분류</th>
                <th>제목</th>
                <th>기안자</th>
                <th>기안 일자</th>
                <th>상태</th>
            </tr>
            </thead>
            {/* <ul>
                    {calendarList && calendarList.map((calendar) => (
                    calendar.calType === "개인 캘린더" && // calType이 개인 캘린더인 경우에만 해당
                    <li key={calendar.calNo}>
                        <input type="checkbox" id={`cal_checkbox_${calendar.calNo}`} />
                        <label htmlFor={`cal_checkbox_${calendar.calNo}`}>
                            {calendar.calName}
                            <span className="dot" style={{ backgroundColor: calendar.calColor }} />
                        </label>
                    </li>
                        ))}
     
                    </ul> */}
            <tbody>
            {documentList && documentList.map((documents) => (
            <tr key = {documents.approvalDocCode}>
                <td>{documents.approvalForm}</td>
                <td>{documents.approvalTitle}</td>
                <td>{documents.employeeCode?.employeeName}</td>
                <td>{documents.approvalRequestDate}</td>
                <td>
                    <div className="process_check_button">
                        <span className="process_check_text">결재 현황 확인</span>
                    </div>
                </td>
            </tr>
                ))}
            </tbody>
        </table>
        {/* {documentList && (
        <button className="awaiting_list_footer"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            >
                &lt;
        </button>
        )}
            {pageNumber.map((num) => (
        <li key={num} onClick={() => setCurrentPage(num)}>
            <button
                className="awaiting_list_footer"
                style={currentPage === num ? { backgroundColor: 'orange' } : null}
            >
                {num}
            </button>
        </li>
    ))}
    {Array.isArray(documentList) && (
        <button
            className="awaiting_list_footer"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}
        >
            &gt;
        </button>
    )} */}
    </div>
    </section>
        </>
    );
}

export default OnProcessList;