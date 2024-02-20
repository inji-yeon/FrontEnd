import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useSelector 추가
import { callGroupChartAPI } from '../../../apis/GroupchartAPI'; 
import GroupSide from './GroupSideBar.module.css';
import 'jstree/dist/themes/default/style.min.css';
import $ from 'jquery';
import 'jstree'
import { Outlet } from 'react-router-dom';
import Group from '../Group';
import { decodeJwt } from '../../../utils/tokenUtils';
import { GET_GROUPCHART } from '../../../modules/GroupchartModule';

const GroupChart = () => {
    const orgData = useSelector(state => state.groupchartreducer);
    console.log('orgdata 나오는지 한 번 보자 --------',orgData)
// Redux 상태에서 orgData 가져오기
    const dispatch = useDispatch();

    

    useEffect(() => {
        console.log('api를 그룹 사이드바에서 불러오는지 ')
        dispatch(callGroupChartAPI({ form: null }));
    }, [dispatch]);

    

    useEffect(() => {
        console.log('api를 그룹 사이드바에서 데이터 변환')
        console.log('org데이터 출력',orgData)
        if (orgData.length > 0) {
            const formattedData = convertDataForJSTree(orgData); // 데이터 변환
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
        <div className={GroupSide.GroupSideBar}>

            <div>
                <div className={GroupSide.groupname}>
                    <div className={GroupSide.groupname2}>&lt;조직&gt;</div>
                </div>
                <div className={GroupSide.groupcontent}>
                    <div className={GroupSide.groupchart}>
                        <h1 className={GroupSide.groupchartname}>witty wave</h1>
                        <div id={GroupSide.orgchartbox}>
                            <div id={GroupSide.orgchart}>
                            <div id="orgchartgroup">
                                {/* 조직도 트리뷰 들어갈 자리 */}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <Group />
        </div>
        </>
    );
}

export default GroupChart;
