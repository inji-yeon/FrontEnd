import '../WritingPages/ApprovalLinePopup.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useSelector 추가
import 'jstree/dist/themes/default/style.min.css';
import $ from 'jquery';
import 'jstree'

function ApprovalLinePopup() {

    const orgData = useSelector(state => state.groupchartreducer);
    const dispatch = useDispatch();

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
        console.log('그룹 사이드바에서 데이터 그리기')
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
            console.log('그룹 사이드바에')
            var nodeId = $(this).parent().attr('id');
            var nodeData = $('#orgchartgroup').jstree(true).get_node(nodeId); // 선택된 노드의 데이터 가져오기
            if (nodeData && nodeData.original && nodeData.original.type === 'employee') { // 사원인 경우에만 실행
                var employeeCode = nodeData.original.employeeCode; // 사원 번호 가져오기
                // "emp_" 부분을 제거하고 숫자 부분만 추출하여 사원 번호 설정
                var employeeNumber = employeeCode.split('_')[1]; // "emp_" 부분을 기준으로 문자열 나누기
                console.log('선택된 사원 번호:', employeeNumber);
            }
            $('#orgchartgroup').jstree('toggle_node', nodeId);
        });
    }

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
    
        <div id="orgchartgroup">
            {/* 조직도 트리뷰 들어갈 자리 */}
        </div>
    
    <div className="added_name">
        
    </div>
    </div>
</div>
</div>
        </>
    );
}

export default ApprovalLinePopup;