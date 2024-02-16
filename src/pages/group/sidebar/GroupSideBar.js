import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useSelector 추가
import { callGroupChartAPI } from '../../../apis/GroupAPI'; 
import GroupSide from './GroupSideBar.module.css';
import 'jstree/dist/themes/default/style.min.css';
import $ from 'jquery';
import 'jstree'
// import { GET_GROUPCHART } from '../../../modules/GroupModule'; // import 추가

const convertDataForJSTree = (data) => {
    return data.map(item => ({
        id: item.id,
        parent: item.parent,
        text: item.text,
        state: {
            opened: item.state ? item.state.opened : false
        },
        type: item.type,
        // children: item.children ? convertDataForJSTree(item.children, `${item.type}_${item.id}`) : []
    }));
};


const GroupChart = () => {
    const orgData = useSelector(state => state.groupreducer); // Redux 상태에서 orgData 가져오기
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

    function initializeTree(data) {
        console.log('그룹 사이드바에서 데이터 그리기')
        console.log('그룹 사이드바에서 데이터 그리기',data)
        $('#orgchartgroup').jstree({
            'core': {
                'data': data,
                'check_callback': true,
            },
            'plugins': ['types']
            
        });   
        $('#orgchartgroup').on('click', '.jstree-anchor', function () {
            console.log('그룹 사이드바에')
            var nodeId = $(this).parent().attr('id');
            $('#orgchartgroup').jstree('toggle_node', nodeId);
        });
    }


    
    return (
    
        <div className={GroupSide.GroupSideBar}>

            <div>
                <div className={GroupSide.groupname}>
                    <div className={GroupSide.groupname2}>&lt;조직&gt;</div>
                </div>
                <div className={GroupSide.groupcontent}>
                    <div className={GroupSide.groupchart}>
                        <div className={GroupSide.searchcontainer}>
                            <input type="text" id={GroupSide.searchInput} placeholder="부서명 or 부서원을 입력하세요" />
                            <button id={GroupSide.searchButton}>검색</button>
                        </div>
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
        </div>
    
    );
}

export default GroupChart;
