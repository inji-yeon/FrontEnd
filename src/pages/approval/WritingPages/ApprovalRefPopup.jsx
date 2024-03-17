import '../WritingPages/ApprovalRefPopup.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useSelector 추가
import 'jstree/dist/themes/default/style.min.css';
import $ from 'jquery';
import 'jstree'
import { callGroupChartAPI } from '../../../apis/GroupchartAPI';
import { callLoggedinUserAPI } from '../../../apis/ApprovalAPICalls';


function ApprovalRefPopup({ onConfirm, onClose }) {

    const orgData = useSelector(state => state.groupchartreducer);
    const dispatch = useDispatch();

    const [selectedViewers, setSelectedViewers] = useState([]);
    const [assignedViewers, setAssignedViewers] = useState([]);

    useEffect(() => {
        dispatch(callLoggedinUserAPI());
    }, []);

    const loggedInUser = useSelector(state => state.approvalReducer);
    console.log("loggedInUser", loggedInUser);

    useEffect(() => {
        if (orgData.length > 0) {
            const formattedData = convertDataForJSTree(orgData);
            initializeTree(formattedData);
        }
    }, [orgData]);

    const convertDataForJSTree = (data) => {
        return data.map(item => ({
            id: item.id,
            parent: item.parent,
            text: item.text,
            state: {
                opened: item.state ? item.state.opened : false
            },
            type: item.type,
            employeeCode: item.id
        }));
    };

    useEffect(() => {
        console.log('api를 그룹 사이드바에서 불러오는지 ')
        dispatch(callGroupChartAPI({ form: null }));
    }, [dispatch]);

    function initializeTree(data) {
        console.log('그룹 사이드바에서 데이터 그리기',data)
        $('#orgchartgroup').jstree({
            'core': {
                'data': data,
                'check_callback': true,
            },
            'plugins': ['types'],
            'types': {
                'default': {
                    'icon': '/group/employee.png' // 사람 아이콘 지정
                },
                'dept': {
                    'icon': '/group/dept.png' // 부서 아이콘 지정
                }
            }
            
        });   
        $('#orgchartgroup').on('click', '.jstree-anchor', function () {
            var nodeId = $(this).parent().attr('id');
            var nodeData = $('#orgchartgroup').jstree(true).get_node(nodeId); // 선택된 노드의 데이터 가져오기
            
            // 본부 이름을 매핑하는 객체
                const departmentNames = {
                'dept_1': '관리본부',
                'dept_2': '영업본부',
                'dept_3': '개발본부',
                'dept_4': '마케팅본부'
                };  

            if (nodeData && nodeData.original && nodeData.original.type === 'employee') { // 사원인 경우에만 실행
                var employeeCode = nodeData.original.employeeCode; // 사원 번호 가져오기
                // "emp_" 부분을 제거하고 숫자 부분만 추출하여 사원 번호 설정
                var employeeNumber = employeeCode.split('_')[1]; // "emp_" 부분을 기준으로 문자열 나누기
                console.log('선택된 사원 번호:', employeeNumber);

                 var employeeInfo = nodeData.original;
                 var employeeName = employeeInfo.text;
                 var employeeDepartment = $('#orgchartgroup').jstree(true).get_node(employeeInfo.parent).text;
                 var parentInfo = $('#orgchartgroup').jstree(true).get_node(employeeInfo.parent).parent;
                 var parentDepartment = parentInfo && departmentNames[parentInfo] ? departmentNames[parentInfo] : ''; // 부서의 부모 노드가 본부일 때 해당 본부 이름을 가져오는 매핑

                 console.log('선택된 사원 이름:', employeeName);
                 console.log('선택된 사원 부서:', employeeDepartment);      
                 console.log('본부:', parentDepartment);

                 setSelectedViewers([...selectedViewers, { employeeNumber, employeeName, employeeDepartment, parentDepartment }]);
                
            }
            $('#orgchartgroup').jstree('toggle_node', nodeId);
        });
    }

    const handleAssignViewer = () => {
        // 중복된 사원을 체크하기 위한 set 생성
        const viewerSet = new Set(assignedViewers.map(viewer => viewer.employeeNumber));
    
        // 선택된 사원 목록을 배열에 추가할 때 중복 여부 확인하여 처리
        const updatedViewers = [...assignedViewers];

        selectedViewers.forEach(viewer => {
            if (parseInt(loggedInUser) === parseInt(viewer.employeeNumber)) {
                alert(`기안자는 열람자로 추가할 수 없습니다.`);
            } else {
                if (!viewerSet.has(viewer.employeeNumber)) {
                    updatedViewers.push(viewer);
                    viewerSet.add(viewer.employeeNumber); // set에 추가
                } else {
                    alert(`이미 추가된 열람자입니다.`);
                }
            }
        });
    
        // 변경된 사원 목록 설정
        setAssignedViewers(updatedViewers);
    
        // 선택된 사원 초기화
        setSelectedViewers([]);
    };
    

    const handleConfirm = () => {
        // 선택된 사원 목록을 부모 컴포넌트로 전달합니다.
        onConfirm(assignedViewers);
        // 여기서 팝업을 닫거나 다른 로직을 수행할 수 있습니다.
        onClose(); 
    };

    const handleClosePopup = () => {
        onClose();
    }

    const handleViewerClick = (viewer) => {
        // 이미 선택되어 있는지 확인
        const isSelected = selectedViewers.some(selectedViewer => selectedViewer.employeeNumber === viewer.employeeNumber);
    
        if (isSelected) {
            // 이미 선택되어 있으면 선택 해제
            const updatedSelectedViewers = selectedViewers.filter(selectedViewer => selectedViewer.employeeNumber !== viewer.employeeNumber);
            setSelectedViewers(updatedSelectedViewers);
    
            // 선택 해제된 사원의 정보를 표시하는 요소의 클래스 제거
            const selectedElement = document.querySelector(`.added_name_info[data-employee-number="${viewer.employeeNumber}"]`);
            if (selectedElement) {
                selectedElement.classList.remove('popup_selected');
            }
        } else {
            // 선택되어 있지 않으면 선택 상태로 추가
            setSelectedViewers([...selectedViewers, viewer]);
    
            // 선택된 사원의 정보를 표시하는 요소에 클래스 추가
            const selectedElement = document.querySelector(`.added_name_info[data-employee-number="${viewer.employeeNumber}"]`);
            if (selectedElement) {
                selectedElement.classList.add('popup_selected');
            }
        }
    };
    

    const handleUnassignViewer = () => {
        // 선택된 사원들을 assignedEmployees 배열에서 제거
        const updatedViewers = assignedViewers.filter(viewer => !selectedViewers.includes(viewer));
        setAssignedViewers(updatedViewers);
        // 선택된 사원 초기화
        setSelectedViewers([]);
    };
    
return (
        <>
<div className="approval_ref_popup">
<div className="approval_ref_popup_title">
    <span className="approval_ref_popup_title_text">열람자 지정</span>
    <span className="approval_ref_popup_doc_title">[개발 1팀] 연차 신청서</span>
    <div className="ref_cancel_button">
        <span className="ref_cancel_text" onClick={handleClosePopup}>취소</span>
    </div>
    <div className="ref_check_button" onClick={handleConfirm}>
        <span className="ref_check_text">확인</span>
    </div>
</div>
<div className="approval_ref_content">
    <div className="groupchart">
        <div className="search-container">
          <input type="text" id="searchInput" placeholder="부서명 or 부서원을 입력하세요" />
          <button id="searchButton">검색</button>
        </div>
    <section className="ref_name_section">
        <div id="orgchartgroup">
        </div>
    
        <div className='ref_line_assign_button'>
            <img src="/Approval/approval_undo.png" className='ref_undo_button' onClick={handleAssignViewer}/>
            <img src="/Approval/approval_assign.png" className='ref_assign_button' onClick={handleUnassignViewer}/>

        </div>
        <div className="ref_added_name">
            {/* 추가된 사원 목록 출력 */}
            <table className="ref_added_name_list">
        <tbody>
            {assignedViewers.map((viewer, index) => (
                <tr key={index}
                onClick={() => handleViewerClick(viewer)}
                className={selectedViewers.includes(viewer) ? 'ref_popup_selected' : ''}>                    
                <td className='ref_added_name_index'>
                        <div className="ref_list_index_circle">{index + 1}</div>
                    </td>
                    <td className='ref_added_name_info'>
                        <span className='ref_employee_name'>{viewer.employeeName}</span><br/>
                    <span className='ref_parent_department'>{viewer.parentDepartment}&nbsp;/&nbsp; 
                    {viewer.employeeDepartment}</span>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
        </div>
    </section>
    </div>
</div>
</div>
        </>
    );
}

export default ApprovalRefPopup;