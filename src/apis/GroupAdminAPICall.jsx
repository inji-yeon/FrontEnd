import { POST_GROUPADMIN_ADD_EMP } from "../modules/GroupAdminModule";

export const callGroupDeptAddAPI = ({ deptName,parentDeptCode }) => {
    console.log('[callMypageUpdateInfoAPI] callMypageUpdateInfoAPI Call');
    console.log('deptName',deptName);
    console.log('parentDeptCode',parentDeptCode);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:1208/api/v1/group/adddept`;

        return async (dispatch, getState) => {
            try {
                const response = await fetch(requestURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                    },
                    body: JSON.stringify({
                        deptName: deptName,
                        parentDeptCode: parentDeptCode,
                    }),
                });
    
                const result = await response.json();
                console.log('관리자 그룹 ===== [callGroupDeptAddAPI] callGroupDeptAddAPI RESULT : ', JSON.stringify(result));
    
                if (response.status === 200) {
                    dispatch({ type: POST_GROUPADMIN_ADD_EMP, payload: result.data });
                    console.log('디스패치 되고 그룹어드민에서 부서 추가 api ===== [callGroupDeptAddAPI] callGroupDeptAddAPI RESULT : ', result);
                    // 성공 알림 띄우기
                    alert('부서 추가가 성공적으로 완료되었습니다.');
                } else {
                    // 실패 알림 띄우기
                    alert('부서 추가에 실패했습니다. 다시 시도해 주세요.');
                }
            } catch (error) {
                console.error('부서 추가 API 호출 중 오류 발생:', error);
                // 실패 알림 띄우기
                alert('부서 추가에 실패했습니다. 다시 시도해 주세요.');
            }
    };
};