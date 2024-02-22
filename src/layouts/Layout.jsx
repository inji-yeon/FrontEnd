import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../component/common/Sidebar";   //사이드바를 import
import styles from './layout.module.css';
import Messenger from "../component/messenger/Messenger";

//이 곳은 기본 홈페이지 엔드포인트 부분입니다.
function Layout() {
    const navigate = useNavigate();
    
    const tokenExpireHandler = () =>{
        console.log('토큰이 만료되었습니다.');
        navigate('/login');
    }
    return (
        <div className={styles.root}>
            <SideBar />
            <Outlet />
            <Messenger />
        </div>
    )
}

export default Layout;
//이 곳은 웹사이트 모든 주소에 적용될 하나의 레이아웃을 정의하는 곳 입니다.
//컴포넌트는 common에서 가져옵니다.
