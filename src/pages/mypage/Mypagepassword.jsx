import React, { useState } from 'react';
import MypagePassUpdate from './Mypagepassword.module.css';
import { callMypageUpdatePwdAPI } from '../../apis/MypagepwdupdateAPI';
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { decodeJwt } from '../../utils/tokenUtils';

function MyPagePassword() {

  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const decodeToken = jwt_decode(accessToken);
  const employeeCode = decodeToken?.empCode;

    // state 설정
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
// 비밀번호 변경 함수
const handlePasswordChange = async () => {
  if (newPassword === confirmNewPassword) { // 새 비밀번호와 새 비밀번호 확인이 일치하는지 확인
      try {
          // API 호출
          const response = await callMypageUpdatePwdAPI({ currentPassword, newPassword }); // 현재 비밀번호와 새 비밀번호를 함께 전달
          console.log("반응 나오는지 확인", response)
   
          if (response.status === 200) {
              alert('비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동합니다');
              window.localStorage.removeItem('accessToken');
              navigate("/login");
          } else {
              alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
          }
      } catch (error) {
          alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
      }
  } else {
      alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
  }
};



  return (
    <>
      {/* 이 곳은 마이 페이지 비밀번호변경 입니다. */}
      <div className={MypagePassUpdate.myinfo_update}>
        <div className={MypagePassUpdate.myinfo_chart}>
          <div className={MypagePassUpdate.myinfotext}>&lt;비밀번호 변경&gt;</div>
          <h2>현재 비밀번호</h2>
          <input type="password" placeholder="비밀번호를 입력하세요" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />

          <h2>새 비밀번호</h2>
          <input type="password" placeholder="새 비밀번호를 입력하세요" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

          <h2>새 비밀번호 확인</h2>
          <input type="password" placeholder="새 비밀번호를 한번 더 입력하세요" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />

          <br />
          <div className={MypagePassUpdate.update_btn}>
            <button className={MypagePassUpdate.update_btn2} onClick={handlePasswordChange}>수정하기</button>
          </div>
        </div>
      </div>
     
    </>
  );
}

export default MyPagePassword;