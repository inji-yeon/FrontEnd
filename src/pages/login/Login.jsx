import Loginstyles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "../../modules/EmployeeModules";

import { callLoginAPI } from "../../apis/EmployeeAPICalls";
import { callForgotPasswordAPI } from "../../apis/EmployeeAPICalls";
import { POST_LOGIN } from "../../modules/EmployeeModules";
import { useWebSocket } from "../../component/WebSocketContext";
import { useAlert } from "../../component/common/AlertContext";
import { decodeJwt } from '../../utils/tokenUtils';


const accessToken = localStorage.getItem('accessToken');
const decodeToken = decodeJwt(accessToken);
const empCode = decodeToken?.empCode;

function Login() {
  const navigate = useNavigate();

  // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
  const dispatch = useDispatch();
  const loginEmployee = useSelector((state) => state.employeeReducer); // API 요청하여 가져온 loginMember 정보
  const forgotPasswordError = useSelector(
    (state) => state.employeeReducer.message
  );

  // //비밀번호 찾기
  const onClickForgotPasswordHandler = () => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    dispatch(callForgotPasswordAPI({ form: forgotPasswordForm })).catch(
      (error) => {
        // 오류가 발생한 경우
        console.error("Error in forgot password request:", error);
        dispatch({
          type: FORGOT_PASSWORD_FAILURE,
          payload: "비밀번호 재설정 요청 중 오류가 발생했습니다.",
        });
        alert("비밀번호 재설정 요청 중 오류가 발생했습니다.");
      }
    );
  };

  // 폼 데이터 한번에 변경 및 State에 저장
  const [form, setForm] = useState({
    employeeId: "",
    employeePassword: "",
  });
  // 비밀번호 찾기 시작
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    employeeId: "",
    employeeEmail: "",
  });

 
  const wc = useWebSocket();
  const { showAlert } = useAlert();
  useEffect(() => {
    console.log(loginEmployee);
    if (loginEmployee.status === 200) {
      console.log("[Login] Login SUCCESS {}", loginEmployee);
      if (wc) {
        wc.subscribe(`/topic/mail/alert/${loginEmployee.userInfo.employeeCode}`, (message) => {
          console.log('메세지 받음 :', message.body);
          showAlert('날짜를 선택하세요.')
        });
        console.log('구독함 :', `/topic/mail/alert/${loginEmployee.userInfo.employeeCode}`);
      } else {
        console.log('웹소켓이 없음');
      }
      navigate("/main", { replace: true });

    }
  }, [loginEmployee]);


  // // 로그인 상태일 시 로그인페이지로 접근 방지
  // if (loginEmployee.length > 0) {
  //   console.log("[Login] Login is already authenticated by the server");
  //   return <Navigate to="/main" />;
  // }

  const onChangeHandler = (e, type) => {
    if (type === "login") {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    } else if (type === "forgotPassword") {
      setForgotPasswordForm({
        ...forgotPasswordForm,
        [e.target.name]: e.target.value,
      });
    }
  };


  

  // const onChangeHandler = (e, type) => {
  //     setForm({
  //         ...form,
  //         [e.target.name]: e.target.value
  //     });
  // };

  // //이건 회원가입을 위한 핸들러
  // const onClickRegisterHandler = () => {
  //     navigate("/register", { replace: true })
  // }

  // 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동
  const onClickLoginHandler = () => {
    dispatch(
      callLoginAPI({
        // 로그인
        form: form,
      })
    );
  };

  // if (empCode !== null && empCode !== undefined) {
  //   console.log("[Login] 로그인 상태일 시 로그인페이지로 못감");
  //   alert('현재 로그인 상태입니다. 로그아웃을 해주세요')
  //   return <Navigate to="/" />;
  // }



  return (
    <div className={Loginstyles.loginbody}>
      {/* 이 곳은 로그인 페이지입니다. */}

      <div className={Loginstyles.login_box}>
        <h1>Witty Wave</h1>
        <h3>Login</h3>

        <input
          type="text"
          name="employeeId"
          placeholder="아이디를 입력하세요"
          autoComplete="on" //이거 자동완성 기능임
          onChange={(e) => onChangeHandler(e, "login")}
        />

        <input
          type="password"
          name="employeePassword"
          placeholder="비밀번호를 입력하세요"
          autoComplete="off"
          onChange={(e) => onChangeHandler(e, "login")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClickLoginHandler();
            }
          }}
        />

        <button onClick={onClickLoginHandler}>로그인</button>

        {!showForgotPasswordForm && (
          <>
            <button onClick={() => setShowForgotPasswordForm(true)}>
              비밀번호 찾기
            </button>
          </>
        )}
        {showForgotPasswordForm && (
          <>
            <input
              type="text"
              name="employeeId"
              placeholder="아이디를 입력하세요"
              autoComplete="on"
              onChange={(e) => onChangeHandler(e, "forgotPassword")}
            />
            <input
              type="email"
              name="employeeEmail"
              placeholder="이메일을 입력하세요"
              autoComplete="on"
              onChange={(e) => onChangeHandler(e, "forgotPassword")}
            />
            <button onClick={onClickForgotPasswordHandler}>
              비밀번호 찾기
            </button>
            <button onClick={() => setShowForgotPasswordForm(false)}>
              취소
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
