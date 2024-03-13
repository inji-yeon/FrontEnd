import React, { useEffect, useRef, useState } from 'react';
import './OverworkDetailsOnProcess.css';
import { useSelector, useDispatch } from 'react-redux';
import { callOverworkDetailsAPI } from '../../../apis/ApprovalAPICalls';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function OverworkDetailsOnProcess(){

    const dispatch = useDispatch();
    const { approvalDocCode } = useParams(); // approvalDocCode 가져옴
    const [selectedViewers, setSelectedViewers] = useState([]);
    const [selectedSection, setSelectedSection] = useState("approval");
    const imageInput = useRef(); 
    const [images, setImages] = useState([]);
    const overworkDetails = useSelector((state) => state.approvalReducer);

    console.log("overworkDetails: ", overworkDetails);
    console.log("overworkDetails.employeeDTOs: ", overworkDetails.employeeDTOs);
    console.log("overworkDetails.referenceEmployeeDTOs: ", overworkDetails.referenceEmployeeDTOs);
    
    const handleOpenSection = (section) => { 
        setSelectedSection(section);
    }
    
    const isSelected = (section) => {
        return selectedSection === section;
    }

    const [form, setForm] = useState({
        overworkTitle: '',
        kindOfOverwork: '',
        overworkDate: '',
        overworkStartTime: '',
        overworkEndTime: '',
        overworkReason: '',
        files: '',
    });


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

    useEffect(() => {
        console.log("approvalDocCode:", approvalDocCode);
        dispatch(callOverworkDetailsAPI({ approvalDocCode }));
    }, [dispatch, approvalDocCode]); 

    // 부서 코드에 따라 부서 이름 반환
    const getDepartmentName = (departmentCode) => {
        switch (departmentCode) {
            case 1:
                return "관리본부";
            case 2:
                return "영업본부";
            case 3:
                return "개발본부";
            case 4:
                return "마케팅본부";
            default:
                return "기타";
        }
    }
    return(
        <>
            <div className="ow_detail_button_and_content">
                <div className="ow_detail_section">
                    <div className="ow_detail_tolist_button">
                        <span className="ow_detail_tolist_text">목록으로</span>
                    </div>
                    <div className="ow_detail_retrieve_button">
                        <span className="ow_detail_retrieve_text">회수</span>
                    </div>
                </div>
            <div className='ow_detail_content'>
                <section className="ow_detail_form_section">
            <div className="form_body">
                <div className="form_title_section">
                    <div className="form_title">연장근로 신청서</div>
                </div>
                <div className="form_table" style={{ display: 'table' }}>
                <div style={{ display: 'table-row' }}>
                        <div className ="A" style={{ display: 'table-cell' }}>제목</div>
                        <div className ="B" style={{ display: 'table-cell' }}>
                        <input
                            className="input_box"
                            type="text"
                            name="overworkTitle"
                            value={overworkDetails?.overwork?.overworkTitle}
                        />                        
                        </div>
                    </div>

                    <div style={{ display: 'table-row' }}>
                        <div className ="A" style={{ display: 'table-cell' }}>구분</div>
                        <div className ="B" style={{ display: 'table-cell' }}>
                            <select id="type" name="kindOfOverwork" value={overworkDetails?.overwork?.kindOfOverwork}>
                                <option value="">선택</option>
                                <option value="overtime_day">연장근로</option>
                                <option value="overtime_holiday">휴일근로</option>
                            </select>
        
                        </div>
                    </div>

                    <div style={{ display: 'table-row' }}>
                        <div className ="A" style={{ display: 'table-cell' }}>근무 일자</div>
                        <div className ="B" style={{ display: 'table-cell' }}>
                            <input type="date" id="ov_working_date"  className="inputbox" name="overworkDate" value={overworkDetails?.overwork?.overworkDate}/>
                        </div>
                    </div>

                    <div style={{ display: 'table-row' }}>
                        <div className ="A" style={{ display: 'table-cell' }}>근무 시간</div>
                        <div className ="B" style={{ display: 'table-cell' }}>
                            <input type="time" id="ov_start_time"  className="inputbox" name="overworkStartTime" value={overworkDetails?.overwork?.overworkStartTime}/>
                            <span className="datelength">~</span>
                            <input type="time" id="ov_end_time"  className="inputbox" name="overworkEndTime" value={overworkDetails?.overwork?.overworkEndTime}/>
                        </div>
                    </div>

                    <div style={{ display: 'table-row' }}>
                        <div className ="A" style={{ display: 'table-cell' }}>업무 내용</div>
                        <div className ="B" style={{ display: 'table-cell' }}>
                            <input className="input_box" type="text" name="overworkReason" value={overworkDetails?.overwork?.overworkReason}/>
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
                    <div className='selected_lines_for_on_leave'>
                            <table className='selected_list_ol'>
                            <tbody>
                                {overworkDetails.employeeDTOs && overworkDetails.employeeDTOs.map((employee, index) => (
                                    <tr key={index}>
                                        <td className={`selected_index_ol ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                            <div className="list_index_circle_ol">{index + 1}</div>
                                        </td>
                                        <td className={`selected_info_ol ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                            <span className='employee_name_ol'>{employee.employeeName}</span><br/>
                                            <span className='employee_department_ol'>{getDepartmentName(employee.department.parentDepartmentCode)}&nbsp;/&nbsp;{employee.department.departmentName}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                    </div>
                </div>
            )}

            {selectedSection === "view" && (
                <div className='selected_as_view_line'>
                    <div className='selected_ref_for_on_leave'>
                        <table className='selected_ref_list_ol'>
                            <tbody>
                            {overworkDetails.referenceEmployeeDTOs && overworkDetails.referenceEmployeeDTOs.map((referenceEmployee, index) => (
                                <tr key={index}>
                                    <td className={`selected_ref_index_ol ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                        <div className="list_ref_index_circle_ol">{index + 1}</div>
                                    </td>
                                    <td className={`selected_ref_info_ol ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                        <span className='ref_name_ol'>{referenceEmployee.employeeName}</span><br/>
                                        <span className='ref_department_ol'>{getDepartmentName(referenceEmployee.department.parentDepartmentCode)}&nbsp;/&nbsp;{referenceEmployee.department.departmentName}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {selectedSection === "attached" && (
                <div className='selected_as_attached_file'>
                <div className="attached_file_for_ol">
                    <table className='attached_file_list_ol'>
                        <tbody>
                        {overworkDetails.approvalAttachedFiles.map((file, index) => (
                            <tr key={index}>
                                <td className="attached_file_item_ol">
                                    <span className='file_name_ol'>{file.approvalChangedFile}</span>
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

export default OverworkDetailsOnProcess;