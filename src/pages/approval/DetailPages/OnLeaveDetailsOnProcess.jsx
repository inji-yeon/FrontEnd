import React, { useEffect, useRef, useState } from 'react';
import './OnLeaveDetailsOnProcess.css';
import { useSelector, useDispatch } from 'react-redux';
import { callOnLeaveDetailsOPAPI } from '../../../apis/ApprovalAPICalls';
import { useNavigate, useParams } from 'react-router-dom';
import { callRetrievalAPI } from '../../../apis/ApprovalAPICalls';

function OnLeaveDetailsOnProcess(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { approvalDocCode } = useParams(); // approvalDocCode 가져옴
    const [selectedSection, setSelectedSection] = useState("approval");
    const onLeaveDetails = useSelector((state) => state.approvalReducer);

    console.log("onLeaveDetails: ", onLeaveDetails);
    console.log("onLeaveDetails.employeeDTOs: ", onLeaveDetails.employeeDTOs);
    console.log("onLeaveDetails.referenceEmployeeDTOs: ", onLeaveDetails.referenceEmployeeDTOs);

    const handleOpenSection = (section) => { 
        setSelectedSection(section);
    }
    
    const isSelected = (section) => {
        return selectedSection === section;
    }

    useEffect(() => {
        console.log("approvalDocCode:", approvalDocCode);
        dispatch(callOnLeaveDetailsOPAPI({ approvalDocCode }));
    }, [dispatch, approvalDocCode]); 

    const onClickRetrievalHandler = async () => {
        const confirmed = window.confirm("문서를 회수하시겠습니까?");
        if (confirmed) {
            try {
                const result = await dispatch(callRetrievalAPI({ approvalDocCode }));
                console.log("Retrieval result:", result); 
                console.log("Retrieval success:", result.success); 
                console.log("Retrieval message:", result.message);
                if(result.success === true) {
                    alert(result.message)
                    navigate('/approval/retrieved'); 
                } else {
                    alert(result.message)
                }
            } catch (error) {
                console.error('Error in onClickRetrievalHandler:', error);
                // Handle error
            }
        }
    }
    

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

    // 파일 다운로드
    const handleFileDownload = (fileName) => {
        // 파일 다운로드 API 호출
        fetch(`http://localhost:1208/web-images/${fileName}`)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(error => console.error('File download error:', error));
    }
    
    const toTheListHandler = () => {
        navigate('/approval/onProcessList');
    }

    function getClassByStatus(status) {
        switch (status) {
            case "기안":
                return "draft";
            case "대기":
                return "pending";
            case "결재":
                return "approval";
            case "반려":
                return "rejected";
            default:
                return "";
        }
    }

    function getStatusString(status) {
        switch (status) {
            case 'Y':
                return '열람';
            case 'N':
                return '미열람';
            default:
                return '';
        }
    }

    const calculateDateDifference = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);
        return diffDays;
    };

    return(
        <>
            <div className="ow_detail_button_and_content">
                <div className="ow_detail_section">
                    <div className="ow_detail_tolist_button">
                        <span className="ow_detail_tolist_text" onClick={toTheListHandler}>목록으로</span>
                    </div>
                    <div className={`ow_detail_retrieve_button ${onLeaveDetails.availability ? 'active' : ''}`} onClick={onClickRetrievalHandler}>
                        <span className="ow_detail_retrieve_text">회수</span>
                    </div>
                </div>

        <div className='ow_detail_content'>
            <div className="form_writing_section">
            <div className="form_body">
            <div className="form_title_section">
                <div className="form_title">휴가 신청서</div>
            </div>
            <div className="form_table" style={{ display: 'table' }}>
                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>제목</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input 
                        className="input_box" 
                        type="text" 
                        name="onLeaveTitle" 
                        value={onLeaveDetails?.onLeave?.onLeaveTitle}
                        />
                    </div>
                </div>
                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>잔여 휴가</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input className="input_box" type="text" value={onLeaveDetails?.approvalDoc?.employeeCode?.employeeOnLeaveCount}/>
                    </div>
                </div>
                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>휴가 종류</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <select id="type" name="kindOfOnLeave" value={onLeaveDetails?.onLeave?.kindOfOnLeave}>
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
                        <input type="date" id="start_date"  class="inputbox" value={onLeaveDetails?.onLeave?.onLeaveStartDate}/>
                        <span className="datelength">~</span>
                        <input type="date" id="end_date"  class="inputbox" value={onLeaveDetails?.onLeave?.onLeaveEndDate}/>
                        <span className="dateTotal">, &nbsp;&nbsp;총</span>
                        <input className="total_day" type="text" value={calculateDateDifference(onLeaveDetails?.onLeave?.onLeaveStartDate, onLeaveDetails?.onLeave?.onLeaveEndDate)}/>
                        <span className="date_unit">일</span>
                    </div>
                </div>
                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>휴가 사유</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input class="input_box" type="text" name="onLeaveReason" value={onLeaveDetails?.onLeave?.onLeaveReason}/>
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
                    <div className='selected_lines_for_on_leave'>
                            <table className='selected_list_ol'>
                            <tbody>
                                {onLeaveDetails.employeeDTOs && onLeaveDetails.employeeDTOs.map((employee, index) => (
                                    <tr key={index}>
                                        <td className={`selected_index_op ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                            <div className="list_index_circle_op">{index + 1}</div>
                                        </td>
                                        <td className={`selected_info_op ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                            <span className='employee_name_op'>{employee.employeeName}</span><br/>
                                            <span className='employee_department_op'>{getDepartmentName(employee.department.parentDepartmentCode)}&nbsp;/&nbsp;{employee.department.departmentName}</span>
                                        </td>
                                        <td className={`selected_status_op ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                            {/* approvalLines에서 해당 employeeCode에 해당하는 approvalProcessStatus 가져오기 */}
                                            {onLeaveDetails.additionalApprovalLines && onLeaveDetails.additionalApprovalLines.map((approvalLine) => {
                                                if (approvalLine.employeeCode === employee.employeeCode) {
                                                    return (
                                                        <div className={`approval_line_status_op ${getClassByStatus(approvalLine.approvalProcessStatus)}`}>
                                                        <span className="approval_line_status_text_op">{approvalLine.approvalProcessStatus}</span>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
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
                            {onLeaveDetails.referenceEmployeeDTOs && onLeaveDetails.referenceEmployeeDTOs.map((referenceEmployee, index) => (
                                <tr key={index}>
                                    <td className={`selected_ref_index_ol ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                        <div className="list_ref_index_circle_ol">{index + 1}</div>
                                    </td>
                                    <td className={`selected_ref_info_ol ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                        <span className='ref_name_ol'>{referenceEmployee.employeeName}</span><br/>
                                        <span className='ref_department_ol'>{getDepartmentName(referenceEmployee.department.parentDepartmentCode)}&nbsp;/&nbsp;{referenceEmployee.department.departmentName}
                                        </span>
                                    </td>
                                    <td className={`selected_ref_status_op ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                        {/* approvalLines에서 해당 employeeCode에 해당하는 approvalProcessStatus 가져오기 */}
                                        {onLeaveDetails.approvalReferences && onLeaveDetails.approvalReferences.map((approvalRef) => {
                                            if (approvalRef.employeeCode === referenceEmployee.employeeCode) {
                                                return (
                                                    <div className="approval_ref_status_op">
                                                    <span className="approval_ref_status_text_op">{getStatusString(approvalRef.whetherCheckedApproval)}</span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
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
                        {onLeaveDetails && onLeaveDetails.approvalAttachedFiles && onLeaveDetails.approvalAttachedFiles.map((file, index) => (
                        <tr key={index} onClick={() => handleFileDownload(file.approvalChangedFile)}> {/* 파일 다운로드 이벤트 핸들러 */}
                            <td className="attached_file_item_ol">
                                <span className='file_name_ol'>{file.approvalOgFile}</span>
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

export default OnLeaveDetailsOnProcess;