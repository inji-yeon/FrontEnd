import '../WritingPages/ApprovalLinePopup.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useSelector 추가
import 'jstree/dist/themes/default/style.min.css';
import $ from 'jquery';
import 'jstree'

function ApprovalLinePopup() {

    const orgData = useSelector(state => state.groupchartreducer);
    const dispatch = useDispatch();

    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [assignedEmployees, setAssignedEmployees] = useState([]);

    const [draggedIndex, setDraggedIndex] = useState(null); // 드래그된 사원의 인덱스


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

                 setSelectedEmployees([...selectedEmployees, { employeeNumber, employeeName, employeeDepartment, parentDepartment }]);
                
            }
            $('#orgchartgroup').jstree('toggle_node', nodeId);
        });
    }

    const handleAssign = () => {
        // 선택된 사원 목록을 배열에 추가
        setAssignedEmployees([...assignedEmployees, ...selectedEmployees]);
        // 선택된 사원 초기화
        setSelectedEmployees([]);
    };


    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (index, e) => {
        e.preventDefault();
    };

    const handleDrop = (index) => {
        if (draggedIndex !== null && draggedIndex !== index) {
            const updatedEmployees = [...assignedEmployees];
            const draggedEmployee = updatedEmployees.splice(draggedIndex, 1)[0];
            updatedEmployees.splice(index, 0, draggedEmployee);
            setAssignedEmployees(updatedEmployees);
        }
    };

return (
        <>
<div className="approval_line_popup">
<div className="approval_line_popup_title">
    <span className="approval_line_popup_title_text">결재선 지정</span>
    <span className="approval_line_popup_doc_title">[개발 1팀] 연차 신청서</span>
    <div className="line_cancel_button">
        <span className="line_cancel_text">취소</span>
    </div>
    <div className="line_check_button">
        <span className="line_check_text">확인</span>
    </div>
</div>
<div className="approval_line_content">
    <div className="groupchart">
        <div className="search-container">
          <input type="text" id="searchInput" placeholder="부서명 or 부서원을 입력하세요" />
          <button id="searchButton">검색</button>
        </div>
    <section className="line_name_section">
        <div id="orgchartgroup">
            {/* 조직도 트리뷰 들어갈 자리 */}
        </div>
    
        <div className='line_assign_button'>
            <img src="/Approval/approval_undo.png" className='undo_button' onClick={handleAssign}/>
            <img src="/Approval/approval_assign.png" className='assign_button'/>

        </div>
        <div className="added_name">
            {/* 추가된 사원 목록 출력 */}
            <table className="added_name_list">
        <tbody>
            {assignedEmployees.map((employee, index) => (
                <tr key={index}
                draggable={true}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(index, e)}
                onDrop={() => handleDrop(index)}>                    <td className='added_name_index'>
                        <div className="list_index_circle">{index + 1}</div>
                    </td>
                    <td className='added_name_info'>
                        <span className='employee_name'>{employee.employeeName}</span><br/>
                    <span className='parent_department'>{employee.parentDepartment}&nbsp;/&nbsp; 
                    {employee.employeeDepartment}</span>
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

export default ApprovalLinePopup;