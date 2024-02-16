import { useNavigate } from "react-router-dom";
import { POST_LOGOUT } from "../../modules/EmployeeModules";
import { useDispatch } from "react-redux";
import { callLogoutAPI } from "../../apis/EmployeeAPICalls"; // 로그아웃 API 함수를 불러옵니다.

function Main() {
  const navigate = useNavigate();
  const showLoginPage = () => {
    navigate("/login");
  };
  // const handleLogout = () => {
  //     // 사용자의 인증 정보를 삭제하는 작업을 수행 (예: 로컬 스토리지에서 토큰 삭제)
  //     localStorage.removeItem('accessToken');

  //     // 로그아웃 후 로그인 페이지로 이동
  //     navigate('/login');
  // }
  const dispatch = useDispatch();
  //   // 로그아웃 버튼 클릭 시 처리하는 함수
  const handleLogout = async () => {
    try {
      // callLogoutAPI 함수를 호출하여 로그아웃을 처리합니다.
      await callLogoutAPI();

      localStorage.removeItem("accessToken");
      dispatch({ type: POST_LOGOUT, payload: {} });
      alert("로그아웃되었습니다.");
      // 로그아웃 처리가 완료되면 로그인 페이지로 이동합니다.
      console.log("로그아웃하고 로그인창 넘어가기 전");
      navigate("/login");
      console.log("로그아웃하고 로그인창 넘어가고 난 후");
    } catch (error) {
      // 오류 발생 시 오류 메시지를 표시합니다.
      console.error("로그아웃 오류:", error);
    }
  };

  return (
    <>
      {/* 이 곳은 메인 화면입니다. */}
      <button onClick={showLoginPage}>로그인 하기</button>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
}

export default Main;
