import React, { useEffect, useRef, useState } from 'react';
import './WritingOnLeave.css';
import { useDispatch } from 'react-redux';
import ApprovalLinePopup from './ApprovalLinePopup';

function WritingOnLeave(){
    const dispatch = useDispatch();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalDay, setTotalDay] = useState('');
    const popupRef = useRef();
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedSection, setSelectedSection] = useState("approval");

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
        calculateTotalDay(event.target.value, endDate);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
        calculateTotalDay(startDate, event.target.value);
    };

    const calculateTotalDay = (start, end) => {
        const startDatetime = new Date(start);
        const endDatetime = new Date(end);
        if (!isNaN(startDatetime) && !isNaN(endDatetime)) {
            const differenceInTime = endDatetime.getTime() - startDatetime.getTime();
            const differenceInDays = differenceInTime / (1000 * 3600 * 24);
            setTotalDay(differenceInDays);
        } else {
            setTotalDay('');
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsPopupOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOpenSection = (section) => { 
        setSelectedSection(section);
    }

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    }

    const handleSelectedEmployees = (selectedEmployees) => {
        setSelectedEmployees(selectedEmployees);
        // 선택된 사원 목록을 받아 처리하는 로직
        console.log("선택된 사원 목록:", selectedEmployees);
    };

    const isSelected = (section) => {
        return selectedSection === section;
    }
    

    return(
        <>
        <div className="writing_button_and_content">
            <div className="writing_section">
                    <div className="aproval_save_button">
                        <span className="saving_text">임시 저장</span>
                    </div>
                    <div className="approval_submit_button">
                        <span className="submitting_text">결재 상신</span>
                    </div>
            </div>

        <div className='writing_content'>
            <div className="form_writing_section">
            <div className="form_body">
            <div className="form_title_section">
                <div className="form_title">휴가 신청서</div>
            </div>
            <div className="form_table" style={{ display: 'table' }}>
                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>제목</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input className="input_box" type="text"/>
                    </div>
                </div>
                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>잔여 휴가</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input className="input_box" type="text"/>
                    </div>
                </div>
                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>휴가 종류</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <select id="type">
                            <option value="">선택</option>
                            <option value="annual_leave">연차</option>
                            <option value="half_leave">반차</option>
                            <option value="given_leave">포상 휴가</option>
                            <option value="celebration_leave">경조 휴가</option>
                            <option value="ect_leave">기타 휴가</option>
                        </select>
        
                    </div>
                </div>
                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>휴가 기간</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input type="date" id="start_date"  class="inputbox" value={startDate} onChange={handleStartDateChange}/>
                        <span className="datelength">~</span>
                        <input type="date" id="end_date"  class="inputbox" value={endDate} onChange={handleEndDateChange}/>
                        <span className="dateTotal">, &nbsp;&nbsp;총</span>
                        <input className="total_day" type="text" value={totalDay} readOnly/>
                        <span className="date_unit">일</span>
                    </div>
                </div>
                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>휴가 사유</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input class="input_box" type="text"/>
                    </div>
                </div>
            </div>
            </div>
            </div>
        
            <div className="approval_line_section">
            <div className="approval_line_title">
                <div className={`approval_line_list ${isSelected("approval") ? "selected" : ""}`} onClick={() => handleOpenSection("approval")}>
                   <span className={`approval_line_list_text ${isSelected("approval") ? "bold" : ""}`}>결재선</span>
                  <div className={`ol_underline ${isSelected("approval") ? "active" : ""}`}></div>
                </div>
                <div className={`view_line_list ${isSelected("view") ? "selected" : ""}`} onClick={() => handleOpenSection("view")}>
                    <span className={`view_line_list_text ${isSelected("view") ? "bold" : ""}`}>열람자</span>
                    <div className={`ol_underline ${isSelected("view") ? "active" : ""}`}></div>
                </div>
                <div className={`attached_file_list ${isSelected("attached") ? "selected" : ""}`} onClick={() => handleOpenSection("attached")}>
                    <span className={`attached_file_list_text ${isSelected("attached") ? "bold" : ""}`}>첨부문서</span>
                    <div className={`ol_underline ${isSelected("attached") ? "active" : ""}`}></div>
                </div>
            </div>
            <div className="shaded_underline"></div>

            {selectedSection === "approval" && ( // 조건부 렌더링
                <div className='selected_as_approval_line'>
                    <div className="set_approval_line">
                        <div className="set_approval_line_button" onClick={handleOpenPopup}>
                            <span className="set_approval_line_text">결재선 지정</span>
                        </div>
                    </div>
                    <div className='selected_lines_for_on_leave'>
                            <table className='selected_list_ol'>
                                <tbody>
                                {selectedEmployees.map((employee, index) => (
                                    <tr key={index}>
                                        <td className={`selected_index_ol ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                            <div className="list_index_circle_ol">{index + 1}</div>
                                        </td>
                                        <td className={`selected_info_ol ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                            <span className='employee_name_ol'>{employee.employeeName}</span><br/>
                                            <span className='employee_department_ol'>{employee.parentDepartment}&nbsp;/&nbsp;
                                            {employee.employeeDepartment}</span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                    </div>
                    <div className="approval_employee_list" ref={popupRef}>
                        {isPopupOpen && <ApprovalLinePopup onConfirm={handleSelectedEmployees} onClose={() => setIsPopupOpen(false)}/>}
                    </div>
                </div>
            )}

            {selectedSection === "view" && (
                <div className='selected_as_view_line'></div>
            )}

            {selectedSection === "attached" && (
                <div className='selected_as_attached_file'></div>
            )}

            </div>
        </div>
        </div>
        </>
    );
}

export default WritingOnLeave;