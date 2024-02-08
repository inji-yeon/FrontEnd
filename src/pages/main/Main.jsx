import { useNavigate } from "react-router-dom";

function Main(){
    const navigate = useNavigate();
    const showLoginPage = () => {
        navigate('/login');
    }
    return(
        <>
        {/* 이 곳은 메인 화면입니다. */}
            <button onClick={showLoginPage}>로그인 하기</button>
        </>
    )
}

export default Main;