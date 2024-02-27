import React, { useEffect, useState } from 'react';
import MypagePassUpdate from './Mypagepassword.module.css';
import { callMypageUpdatePwdAPI } from '../../apis/MypagepwdupdateAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { decodeJwt } from '../../utils/tokenUtils';
import { PUT_MYPAGEPASSWORD_UPDATE } from '../../modules/MypagepwdupdateModule';
import { POST_LOGOUT } from '../../modules/EmployeeModules';

function MyPagePassword() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem('accessToken');
  const decodeToken = decodeJwt(accessToken);
  const empCode = decodeToken?.empCode;

    // state 설정
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const pwdUpdate = useSelector((state)=>state.mypagepwdupdatereducer);
  
// 비밀번호 변경 함수
const handlePasswordChange =  () => {
  if (newPassword === confirmNewPassword) { // 새 비밀번호와 새 비밀번호 확인이 일치하는지 확인
      dispatch(callMypageUpdatePwdAPI({currentPassword,newPassword,empCode}))
  } else {
      alert('새 비밀번호가 일치하지 않습니다.');
  }
};

console.log('pwdUpdate뜨느지 확인=================== ',pwdUpdate)
  useEffect(()=>{
    if(pwdUpdate?.message){
      switch(pwdUpdate?.message){
        case '비밀번호 변경 성공':
          console.log('비번성공')
          alert('비밀번호 변경이 완료되었습니다.')
          // localStorage.removeItem("accessToken");
          localStorage.clear();
          dispatch({ type: POST_LOGOUT, payload: {} });
          alert('로그인페이지로 넘어갑니다!')
          navigate('/login')
          break;
          
          case '비밀번호 변경 실패':
            console.log('비번실패')
            alert('비밀번호 변경을 실패하였습니다.')
            break;

            case '현재 비밀번호가 잘못되었습니다':
              console.log('비번 잘못됨')
              alert('현재 비밀번호를 잘못입력하셨습니다.')
              break;
        default:
          alert('실패!');
          console.log('비번 변경 실패 ')
          break;
      }
      dispatch({type:PUT_MYPAGEPASSWORD_UPDATE,payload:''})
    }
  },[pwdUpdate?.message])


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