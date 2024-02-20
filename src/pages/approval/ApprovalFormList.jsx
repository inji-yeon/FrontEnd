import './ApprovalFormList.css';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import AwayForm from './AwayForm';
import BusinessTripForm from './BusinessTripForm';
import OnLeaveForm from './OnLeaveForm';
import OvertimeForm from './OvertimeForm';
import WFHForm from './WFHForm';

function ApprovalFormList(){
    const navigate = useNavigate();
    const [selectedForm, setSelectedForm] = useState(null);

    const selectForm = (formTitle) => {
        // 선택한 양식을 상태에 저장
        setSelectedForm(formTitle);
    }

    return(
        <>
        <section className="approval_form_list_wrapper">
        <div className="new_form_title_section">
            <div className="new_form_title_box"></div>
            <span className="new_form_title">기안서 작성</span>
        </div>
    <div className="form_content">
        <div className="form_search_and_list">


            <div className="form_list_section">
                <div className="form_list" onClick={() => selectForm('휴가신청서')}>
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">휴가 신청서</span>
                </div>
                <div className="form_list" onClick={() => selectForm('연장근로신청서')}>
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">연장근로 신청서</span>
                </div>
                <div className="form_list" onClick={() => selectForm('외근신청서')}>
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">외근 신청서</span>
                </div>
                <div className="form_list" onClick={() => selectForm('출장신청서')}>
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">출장 신청서</span>
                </div>
                <div className="form_list" onClick={() => selectForm('재택근무신청서')}>
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">재택근무 신청서</span>
                </div>
                <div className="form_list" onClick={() => selectForm('SW사용신청서')}>
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">SW 사용 신청서</span>
                </div>
            </div>
        </div>

        <div className="form_preview_section">
            <div className="writing_section">
                <div className="list_writing_button">
                    <span className="list_writing_text">작성하기</span>
                </div>
            </div>

            <div className="preview_section">
                {selectedForm === '외근신청서' && <AwayForm />}
                {selectedForm === '출장신청서' && <BusinessTripForm />}
                {selectedForm === '휴가신청서' && <OnLeaveForm />}
                {selectedForm === '연장근로신청서' && <OvertimeForm />}
                {selectedForm === '재택근무신청서' && <WFHForm />}
            </div>
        </div>
    </div>
    </section>
        </>
    );
}

export default ApprovalFormList;