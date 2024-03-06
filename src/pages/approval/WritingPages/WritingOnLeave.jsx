import React, { useEffect, useRef, useState } from 'react';
import './WritingOnLeave.css';
import { useDispatch } from 'react-redux';
import ApprovalLinePopup from './ApprovalLinePopup';

function WritingOnLeave(){
    const dispatch = useDispatch();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const popupRef = useRef();
    const [selectedEmployees, setSelectedEmployees] = useState([]);


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

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    }

    const handleSelectedEmployees = (selectedEmployees) => {
        setSelectedEmployees(selectedEmployees);
        // 선택된 사원 목록을 받아 처리하는 로직
        console.log("선택된 사원 목록:", selectedEmployees);
    };
    

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
                        <input type="date" id="start_date"  class="inputbox"/>
                        <span className="datelength">~</span>
                        <input type="date" id="end_date"  class="inputbox"/>
                        <span className="dateTotal">, 총</span>
                        <input className="total_day" type="text"/>
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
                <div className="approval_line_list">
                    <span className="approval_line_list_text">결재선</span>
                    <div className="underline"></div>
                </div>
                <div className="view_line_list">
                    <span className="view_line_list_text">열람자</span>
                    <div className="underline"></div>
                </div>
                <div className="attached_file_list">
                    <span className="attached_file_list_text">첨부문서</span>
                    <div className="underline"></div>
                </div>
            </div>
            <div className="shaded_underline"></div>
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
        </div>
        </div>
        </>
    );
}

export default WritingOnLeave;