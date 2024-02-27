import React, { useState } from 'react';
import groupadminstyle from './GroupAdmin.module.css';

import { useDispatch } from 'react-redux';
import { callGroupDeptAddAPI } from '../../../apis/GroupAdminAPICall';


function GroupAdmin() {
    const dispatch = useDispatch();
    const [deptName, setDeptName] = useState('');
    const [parentDeptCode, setParentDeptCode] = useState('');

    const handleDeptNameChange = (event) => {
        setDeptName(event.target.value);
    };

    const handleParentDeptCodeChange = (event) => {
        setParentDeptCode(event.target.value);
    };

    const handleAddDepartment = () => {
        if (!deptName || !parentDeptCode) {
            alert('부서명과 부모 부서 코드를 모두 입력해주세요.');
            return;
        }
    
        dispatch(callGroupDeptAddAPI({ deptName, parentDeptCode }));
    };

    

    return (
        <>
         <div className={groupadminstyle.deptaddbox}>
        <div className={groupadminstyle.title} >
        <h3>부서 추가</h3>
        </div>
         <div  className={groupadminstyle.deptaddbtn} >
         <input type="text" value={deptName} onChange={handleDeptNameChange} placeholder="부서명" />
            <input type="text" value={parentDeptCode} onChange={handleParentDeptCodeChange} placeholder="부모 부서 코드" />
            <button onClick={handleAddDepartment}>부서 추가하기</button>
         </div>
           </div>
        </>
    );
}

export default GroupAdmin;
