import './ApprovalFormList.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ApprovalFormList(){
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setActive(true);
    }, []);
    
    return(
        <>
        <div>
        <section className="project_section">
        <div className="new_form_title_section">
            <div className="new_form_title_box"></div>
            <span className="new_form_title">기안서 작성</span>
        </div>
    <div className="form_content">
        <div className="form_search_and_list">
            <div className="form_search_section">
                <input type="text" className="form_search" placeholder="양식명을 검색해주세요."/>
                {/* <img className="search_icon" src="/search.png"/> */}
            </div>

            <div className="form_list_section">
                <div className="form_list">
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">휴가 신청서</span>
                </div>
                <div className="form_list">
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">연장근로 신청서</span>
                </div>
                <div className="form_list">
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">외근 신청서</span>
                </div>
                <div className="form_list">
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">출장 신청서</span>
                </div>
                <div className="form_list">
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">재택근무 신청서</span>
                </div>
                <div className="form_list">
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">SW 사용 신청서</span>
                </div>
                <div className="form_list">
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">예산 신청서</span>
                </div>
            </div>
        </div>

        <div className="form_preview_section">
            <div className="writing_section">
                <div className="writing_button">
                    <span className="writing_text">작성하기</span>
                </div>
            </div>

            <div className="preview_section">

            </div>
        </div>
    </div>
    </section>
    </div>
        </>
    );
}

export default ApprovalFormList;