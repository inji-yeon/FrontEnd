import './RejectedList.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RejectedList(){
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setActive(true);
    }, []);
    
    return(
        <>
        <section className="project_section">
    <div className="awaiting_title_section">
        <span className="awaiting_title">반려 문서함</span>
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
            <tbody>
            <tr>
                <td>휴가 신청서</td>
                <td>[개발 1팀] 연차 사용 신청서</td>
                <td>연인지</td>
                <td>2024.01.05</td>
                <td>
                    <div className="process_check_button">
                        <span className="process_check_text">결재 현황 확인</span>
                    </div>
                </td>
            </tr>

            <tr>
                <td>재택근무 신청서</td>
                <td>[개발 1팀] 재택근무 신청서</td>
                <td>연인지</td>
                <td>2024.01.11</td>
                <td>
                    <div className="process_check_button">
                        <span className="process_check_text">결재 현황 확인</span>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <div className="awaiting_list_footer">
            <input type="button" value="<<"/>
            <input type="button" value="<"/>
            <input type="button" value="1"/>
            <input type="button" value="2"/>
            <input type="button" value="3"/>
            <input type="button" value="4"/>
            <input type="button" value="5"/>
            <input type="button" value="6"/>
            <input type="button" value="7"/>
            <input type="button" value="8"/>
            <input type="button" value="9"/>
            <input type="button" value="10"/>
            <input type="button" value=">"/>
            <input type="button" value=">>"/>
        </div>
    </div>
    </section>
        </>
    );
}

export default RejectedList;