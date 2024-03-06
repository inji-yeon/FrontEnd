import React, { useEffect, useRef, useState } from 'react';
import './WritingOvertime.css';
import { useSelector, useDispatch } from 'react-redux';
import { callLoggedinUserAPI, callSubmitOverworkAPI } from '../../../apis/ApprovalAPICalls';
import { useNavigate, useLocation } from 'react-router-dom';
import ApprovalLinePopup from './ApprovalLinePopup';

function WritingOvertime(){

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
    
    const [clickType, setClickType] = useState("") 

    const [form, setForm] = useState({
        overworkTitle: '',
        kindOfOverwork: '',
        overworkDate: '',
        overworkStartTime: '',
        overworkEndTime: '',
        overworkReason: '',
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    useEffect(()=>{
        console.log('실제로 값이 변하는지', form);
    },[form]);

    const onClickSubmitHandler = () => {
        console.log('[Approval] onClickSubmitHandler');

        const formData = new FormData();

        formData.append("overworkTitle", form.overworkTitle);
        formData.append("kindOfOverwork", form.kindOfOverwork);
        formData.append("overworkDate", form.overworkDate);
        formData.append("overworkStartTime", form.overworkStartTime);
        formData.append("overworkEndTime",form.overworkEndTime);
        formData.append("overworkReason", form.overworkReason);

        selectedEmployees.forEach(employee => {
            formData.append("additionalApprovers", employee.employeeNumber);
        });

        dispatch(callSubmitOverworkAPI({
            form: formData
        }));

        console.log(form, '기안 올린 내용');
        
        alert('결재 기안이 완료되었습니다.');
    }


    return(
        <>
            <div className="writing_button_and_content">
                <div className="writing_section">
                    <div className="aproval_save_button">
                        <span className="saving_text">임시 저장</span>
                    </div>
                    <div className="approval_submit_button" onClick={onClickSubmitHandler}>
                        <span className="submitting_text">결재 상신</span>
                    </div>
                </div>
            <div className='writing_content'>
                <section className="form_writing_section">
            <div className="form_body">
                <div className="form_title_section">
                    <div className="form_title">연장근로 신청서</div>
                </div>
                <div className="form_table" style={{ display: 'table' }}>
                <div style={{ display: 'table-row' }}>
                        <div className ="A" style={{ display: 'table-cell' }}>제목</div>
                        <div className ="B" style={{ display: 'table-cell' }}>
                            <input className="input_box" type="text" name="overworkTitle" value={form.overworkTitle} onChange={onChangeHandler}/>
                        </div>
                    </div>

                    <div style={{ display: 'table-row' }}>
                        <div className ="A" style={{ display: 'table-cell' }}>구분</div>
                        <div className ="B" style={{ display: 'table-cell' }}>
                            <select id="type" name="kindOfOverwork" value={form.kindOfOverwork} onChange={onChangeHandler}>
                                <option value="">선택</option>
                                <option value="overtime_day">연장근로</option>
                                <option value="overtime_holiday">휴일근로</option>
                            </select>
        
                        </div>
                    </div>

                    <div style={{ display: 'table-row' }}>
                        <div className ="A" style={{ display: 'table-cell' }}>근무 일자</div>
                        <div className ="B" style={{ display: 'table-cell' }}>
                            <input type="date" id="ov_working_date"  className="inputbox" name="overworkDate" value={form.overworkDate} onChange={onChangeHandler}/>
                        </div>
                    </div>

                    <div style={{ display: 'table-row' }}>
                        <div className ="A" style={{ display: 'table-cell' }}>근무 시간</div>
                        <div className ="B" style={{ display: 'table-cell' }}>
                            <input type="time" id="ov_start_time"  className="inputbox" name="overworkStartTime" value={form.overworkStartTime} onChange={onChangeHandler}/>
                            <span className="datelength">~</span>
                            <input type="time" id="ov_end_time"  className="inputbox" name="overworkEndTime" value={form.overworkEndTime} onChange={onChangeHandler}/>
                        </div>
                    </div>

                    <div style={{ display: 'table-row' }}>
                        <div className ="A" style={{ display: 'table-cell' }}>업무 내용</div>
                        <div className ="B" style={{ display: 'table-cell' }}>
                            <input className="input_box" type="text" name="overworkReason" value={form.overworkReason} onChange={onChangeHandler}/>
                        </div>
                    </div>
                </div>
            </div>
                </section>

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

export default WritingOvertime;