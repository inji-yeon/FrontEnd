import React, { useEffect, useRef, useState } from 'react';
import './WritingOvertime.css';
import { useSelector, useDispatch } from 'react-redux';
import { callLoggedinUserAPI, callSubmitOverworkAPI } from '../../../apis/ApprovalAPICalls';
import { useNavigate, useLocation } from 'react-router-dom';
import ApprovalLinePopup from './ApprovalLinePopup';
import ApprovalRefPopup from './ApprovalRefPopup';

function WritingOvertime(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const popupRef = useRef();
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedViewers, setSelectedViewers] = useState([]);
    const [selectedSection, setSelectedSection] = useState("approval");
    const [image, setImage] = useState(null);
    const imageInput = useRef(); 
    const [images, setImages] = useState([]);

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

    const handleSelectedViewers = (selectedViewers) => {
        setSelectedViewers(selectedViewers);
        // 선택된 사원 목록을 받아 처리하는 로직
        console.log("선택된 열람자 목록:", selectedViewers);
    };
    
    const isSelected = (section) => {
        return selectedSection === section;
    }
    
    const [clickType, setClickType] = useState("") 

    const [form, setForm] = useState({
        overworkTitle: '',
        kindOfOverwork: '',
        overworkDate: '',
        overworkStartTime: '',
        overworkEndTime: '',
        overworkReason: '',
        files: '',
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

    // 이미지 업로드 세팅
    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    // 파일 업로드 핸들러
    const onFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const fileList = Array.from(files); // FileList를 배열로 변환
            setImages(prevImages => [...prevImages, ...fileList]); // 이미지 배열 상태에 새로운 파일 추가
            setForm(prevForm => ({
                ...prevForm,
                files: [...prevForm.files, ...fileList], // 기존 파일과 새로운 파일을 함께 저장
            }));
        }
    };

    const handleRemoveFile = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1); // 해당 인덱스의 파일 삭제
        setImages(newImages); // 이미지 배열 상태 업데이트
    
        const newFiles = [...form.files];
        newFiles.splice(index, 1); // 해당 인덱스의 파일 삭제
        setForm(prevForm => ({
            ...prevForm,
            files: newFiles, // 파일 배열 상태 업데이트
        }));
    };

    const onClickSubmitHandler = () => {
        console.log('[Approval] onClickSubmitHandler');

        // 추가 결재자가 있는지 확인
        if (selectedEmployees.length === 0) {
            alert('결재자를 추가해주세요.');
            return; // 추가 결재자가 없으므로 함수 종료
        }

        const formData = new FormData();

        formData.append("overworkTitle", form.overworkTitle);
        formData.append("kindOfOverwork", form.kindOfOverwork);
        formData.append("overworkDate", form.overworkDate);
        formData.append("overworkStartTime", form.overworkStartTime);
        formData.append("overworkEndTime",form.overworkEndTime);
        formData.append("overworkReason", form.overworkReason);

        // 파일 정보 추가
        form.files.forEach(file => {
            formData.append("file", file); // 여러 개의 파일이 있을 수 있으므로 append 사용
        });

        selectedEmployees.forEach(employee => {
            formData.append("additionalApprovers", employee.employeeNumber);
        });

        // selectedViewers 배열이 비어있지 않은 경우에만 추가
        if (selectedViewers.length > 0) {
            selectedViewers.forEach(viewer => {
                formData.append("refViewers", viewer.employeeNumber);
            });
        }

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

            {selectedSection === "view" && selectedViewers &&(
                <div className='selected_as_view_line'>
                    <div className="set_ref_line">
                        <div className="set_approval_ref_button" onClick={handleOpenPopup}>
                            <span className="set_approval_line_text">열람자 지정</span>
                        </div>
                    </div>
                    <div className='selected_ref_for_on_leave'>
                        <table className='selected_ref_list_ol'>
                            <tbody>
                            {selectedViewers.map((viewer, index) => (
                                <tr key={index}>
                                    <td className={`selected_ref_index_ol ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                        <div className="list_ref_index_circle_ol">{index + 1}</div>
                                    </td>
                                    <td className={`selected_ref_info_ol ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                        <span className='ref_name_ol'>{viewer.employeeName}</span><br/>
                                        <span className='ref_department_ol'>{viewer.parentDepartment}&nbsp;/&nbsp;
                                        {viewer.employeeDepartment}</span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="approval_ref_list" ref={popupRef}>
                        {isPopupOpen && <ApprovalRefPopup onConfirm={handleSelectedViewers} onClose={() => setIsPopupOpen(false)}/>}
                    </div>
                </div>
            )}

            {selectedSection === "attached" && (
                <div className='selected_as_attached_file'>
                <input
                type="file"
                ref={imageInput}
                onChange={onFileChange}
                style={{ display: 'none' }}
                multiple 
                />

                <div className='set_file_section'>
                    <div className="file_attaching_button" onClick={ onClickImageUpload }>
                        <span className='file_attaching_text'>첨부파일</span>
                    </div>
                </div>

                <div className="attached_file_for_ol">
                    <table className='attached_file_list_ol'>
                        <tbody>
                        {/* <tr className='file_list_title_ol'>
                            <span className='file_name_title_ol'>파일명</span>
                            <span className='file_delete_title_ol'>삭제</span>
                        </tr> */}
                        {images.map((file, index) => (
                            <tr key={index}>
                                <td className="attached_file_item_ol">
                                    <span className='file_name_ol'>{file.name}</span>
                                    <span className='delete_file_button' onClick={() => handleRemoveFile(index)}>x</span>
                                </td>
                    </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                </div>
            )}

            </div>
            </div>
            </div>
        </>
    );
}

export default WritingOvertime;