import './ApprovalFormList.css';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import AwayForm from './AwayForm';
import BusinessTripForm from './BusinessTripForm';
import OnLeaveForm from './OnLeaveForm';
import OvertimeForm from './OvertimeForm';
import WFHForm from './WFHForm';
import SWForm from './SWForm';

function ApprovalFormList(){
    const navigate = useNavigate();
    const [selectedForm, setSelectedForm] = useState(null);

    const formRoutes = {
        '휴가신청서': '/approval/WritingOnLeave',
        '연장근로신청서': '/approval/WritingOverwork',
        '외근신청서': '/approval/WritingBusinessTrip',
        '출장신청서': '/approval/WritingBusinessTrip',
        '재택근무신청서': '/approval/WritingWFH',
        'SW사용신청서': '/approval/WritingSW'
    };

    const selectForm = (formTitle) => {
        // 선택한 양식을 상태에 저장
        setSelectedForm(formTitle);
    }

    const navigateToForm = () => {
        // 선택한 양식에 해당하는 페이지 경로를 가져옴
        const route = formRoutes[selectedForm];

        // 해당 페이지로 이동
        if (route) {
            navigate(route);
        }
    };

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
                <div className={`form_list ${selectedForm === '휴가신청서' ? 'selected' : ''}`} onClick={() => selectForm('휴가신청서')}>
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">휴가 신청서</span>
                </div>
                <div className={`form_list ${selectedForm === '연장근로신청서' ? 'selected' : ''}`} onClick={() => selectForm('연장근로신청서')}>
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">연장근로 신청서</span>
                </div>
                <div className={`form_list ${selectedForm === '외근신청서' ? 'selected' : ''}`} onClick={() => selectForm('외근신청서')}>
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">외근 신청서</span>
                </div>
                <div className={`form_list ${selectedForm === '출장신청서' ? 'selected' : ''}`} onClick={() => selectForm('출장신청서')}>
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">출장 신청서</span>
                </div>
                <div className={`form_list ${selectedForm === '재택근무신청서' ? 'selected' : ''}`} onClick={() => selectForm('재택근무신청서')}>
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">재택근무 신청서</span>
                </div>
                <div className={`form_list ${selectedForm === 'SW사용신청서' ? 'selected' : ''}`} onClick={() => selectForm('SW사용신청서')}>
                    <div className="selection_indicator"></div>
                    <span className="form_list_title">SW 사용 신청서</span>
                </div>
            </div>
        </div>

        <div className="form_preview_section">
            <div className="writing_section">
            <div className="list_writing_button" onClick={navigateToForm}>
                    <span className="list_writing_text">작성하기</span>
                </div>
            </div>

            <div className="preview_section">
                {selectedForm === '외근신청서' && <AwayForm />}
                {selectedForm === '출장신청서' && <BusinessTripForm />}
                {selectedForm === '휴가신청서' && <OnLeaveForm />}
                {selectedForm === '연장근로신청서' && <OvertimeForm />}
                {selectedForm === '재택근무신청서' && <WFHForm />}
                {selectedForm === 'SW사용신청서' && <SWForm />}
            </div>
        </div>
    </div>
    </section>
        </>
    );
}

export default ApprovalFormList;