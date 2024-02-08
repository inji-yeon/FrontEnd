import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/main/Main";
import Mail from "./pages/mail/Mail";
import Write from "./pages/mail/Write";
import Group from "./pages/group/Group";
import Board from "./pages/board/Board";
import Calendar from "./pages/calendar/Calendar";
import Project from "./pages/project/Project";
import Approval from "./pages/approval/Approval";
import MyPage from "./pages/mypage/Mypage";
import Admin from "./pages/admin/Admin";
import Attendance from "./pages/attendance/Attendance";
import MailSidebar from "./pages/mail/common/MailSidebar";
import MailView from "./pages/mail/MailView";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Main/>}/>


            <Route path="mail" element={<MailSidebar />}>
              <Route path="check" element={<Mail />} />
              <Route path="write" element={<Write />} />
              
            </Route>
            <Route path="mail/view/:emailCode" element={<MailView/>}/>

            <Route path="group" element={<Group/>}/>

            <Route path="board" element={<Board/>}/>

            <Route path="calendar" element={<Calendar/>}/>

            <Route path="project" element={<Project/>}/>

            <Route path="approval" element={<Approval/>}/>

            <Route path="mypage" element={<MyPage/>}/>

            <Route path="attendance" element={<Attendance/>}/>

          </Route>

          <Route path="/admin" element={<Admin/>}/>

      </Routes>
    </BrowserRouter>
 
  );
}
//이 곳은 주소(앤트포인트)를 통해 어떤 컴포넌트를 출력할 지를 정하는 곳 입니다.
//각 컴포넌트는 ../FrontEnd/src/pages/.. 에 위치해 있습니다.
export default App;
