import Loginstyles from './Login.module.css'; 
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";

import {
    callLoginAPI
} from '../../apis/EmployeeAPICalls'
import { POST_LOGIN } from '../../modules/EmployeeModules';


function Login(){

    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const loginEmployee = useSelector(state => state.employeeReducer);  // API 요청하여 가져온 loginMember 정보

      // 폼 데이터 한번에 변경 및 State에 저장    
      const [form, setForm] = useState({
        employeeId: '',
        employeePassword: ''
    });

    useEffect(() => {
        
        if(loginEmployee.status === 200){
            console.log("[Login] Login SUCCESS {}", loginEmployee);
            navigate("/", { replace: true });
        }
    }
    ,[loginEmployee]);
    
    // 로그인 상태일 시 로그인페이지로 접근 방지
    if(loginEmployee.length > 0) {
        console.log("[Login] Login is already authenticated by the server");        
        return <Navigate to="/"/>
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // //이건 회원가입을 위한 핸들러 
    // const onClickRegisterHandler = () => { 
    //     navigate("/register", { replace: true })
    // }  

    // 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동
    const onClickLoginHandler = () => { 
        dispatch(callLoginAPI({	// 로그인
            form: form
        }));
    }

    



    return(
        <div className={Loginstyles.loginbody}>
        {/* 이 곳은 로그인 페이지입니다. */}
    
    <div className={Loginstyles.login_box}>
        <h1>Witty Wave</h1>
        <h3>Login</h3>
    
        <input 
        type="text"
        name='employeeId'
         placeholder="아이디를 입력하세요"
         autoComplete='on'//이거 자동완성 기능임
         onChange={ onChangeHandler }
         />
    
        <input 
        type="password"
         name='employeePassword'
         placeholder="비밀번호를 입력하세요"
         autoComplete='off'
         onChange={ onChangeHandler }
         />
    
                <button onClick={ onClickLoginHandler } >로그인</button>
                <button>비밀번호 찾기</button>
    </div>
        </div>
        )
    }
    
    export default Login;