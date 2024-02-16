import { BrowserRouter, Outlet, Routes, Route, Router } from "react-router-dom";
import BoardSideBar from "./sidebar/BoardSideBar";

function BoardLayout(){
    return(

        <div style={{display: "flex", maxWidth: 1500, width: 100 + '%', minWidth: 1100}}>

            {/* navbar */}
            <BoardSideBar />

            {/* 게시판에 따른 경로 매핑 */}
            <div style={{
                marginLeft: '50px', marginRight: '30px', 
                paddingTop: 1.7 + 'em', paddingBottom: 1.3 + 'em', flex: 1, flexShrink: 0,
                width: 100
                }}>
                <Outlet />
            </div>
                

        </div>
    )
}

export default BoardLayout;