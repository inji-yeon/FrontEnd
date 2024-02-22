import { Outlet } from "react-router-dom";
import MyPageSideBar from "./sidebar/MyPageSideBar";

function MypageLayout() {
const mypagestyle = {
    position: 'absolute',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    // top: '5px',
    left: '360px',
}
    return(
        <>
            <div style={mypagestyle}>
            <MyPageSideBar />
            <Outlet />
            </div>
        </>
    )
}

export default MypageLayout
