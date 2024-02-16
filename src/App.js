import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/main/Main';
import Mail from './pages/mail/Mail';
import Write from './pages/mail/MailWrite';
import Group from './pages/group/Group';
import Project from './pages/project/ProjectMain';
import Approval from './pages/approval/Approval';
import MyPage from './pages/mypage/Mypage';
import AdminMail from './pages/admin/AdminMail';
import Attendance from './pages/attendance/Attendance';
import Login from './pages/login/Login';
import MailSidebar from './pages/mail/common/MailSidebar';
import MailView from './pages/mail/MailView';
import Calendar from './pages/calendar/CaledarSidebar';

import CreatePost from './pages/board/CreatePost';
import PostInfo from './pages/board/PostInfo';
import PostListOfBoard from './pages/board/PostListOfBoard';
import AttendanceSide from './pages/attendance/AttendanceLayout';
import CommuteList from './pages/attendance/CommuteList';
import DoPaymentDocumentWaiting from './pages/attendance/DoPaymentDocumentWaiting';
import DoPaymentDocumentApproval from './pages/attendance/DoPaymentDocumentApproval';
import DoPaymentDocumentReject from './pages/attendance/DoPaymentDocumentReject';
import MyApplyDocumentWaiting from './pages/attendance/MyApplyDocumentWaiting';
import MyApplyDocumentApproval from './pages/attendance/MyApplyDocumentApproval';
import MyApplyDocumentRejction from './pages/attendance/MyApplyDocumentRejction';
import ProjectBoard from './pages/project/ProjectBoard';
import ProjectBoardDetail from './pages/project/ProjectBoardDetail';

import { WebSocketProvider } from './component/WebSocketContext';
import AdminSidebar from './pages/admin/common/Sidbar';
import CreateBoard from './pages/board/CreateBoard';
import BoardLayout from './pages/board/BoardLayout';

function App() {
    return (
        <WebSocketProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Main />} />

                        <Route path='mail' element={<MailSidebar />}>
                            <Route path='check' element={<Mail />} />
                            <Route path='write' element={<Write />} />
                        </Route>
                        <Route path='mail/view/:emailCode' element={<MailView />} />

                        <Route path='group' element={<Group />} />

                        <Route path='board' element={<BoardLayout />}>
                            <Route path=':boardCode' element={<PostListOfBoard />} />
                            <Route path='posts/regist' element={<CreatePost />} />
                            <Route path='boards/create' element={<CreateBoard />} />
                            <Route path='posts/:postCode' element={<PostInfo />} />
                        </Route>

                        <Route path='calendar' element={<Calendar />} />

                        <Route path='attendance' element={<AttendanceSide />}>
                            <Route path='attendance' element={<Attendance />} />
                            <Route path='commuteList' element={<CommuteList />} />
                            <Route path='doPaymentDocumentWaiting' element={<DoPaymentDocumentWaiting />} />
                            <Route path='doPaymentDocumentApproval' element={<DoPaymentDocumentApproval />} />
                            <Route path='doPaymentDocumentReject' element={<DoPaymentDocumentReject />} />
                            <Route path='myApplyDocumentWaiting' element={<MyApplyDocumentWaiting />} />
                            <Route path='myApplyDocumentApproval' element={<MyApplyDocumentApproval />} />
                            <Route path='myApplyDocumentRejction' element={<MyApplyDocumentRejction />} />
                        </Route>

                        <Route path='projects' element={<Project />} />
                        <Route path='projects/:projectCode' element={<ProjectBoard />} />
                        <Route path='projects/:projectCode/posts/:postCode' elemet={<ProjectBoardDetail />} />

                        <Route path='approval' element={<Approval />} />

                        <Route path='mypage' element={<MyPage />} />

                        <Route path='attendance' element={<Attendance />} />
                    </Route>

                    <Route path='login' element={<Login />} />

                    <Route path='admin' element={<AdminSidebar />}>
                        <Route path='mail' element={<AdminMail />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </WebSocketProvider>
    );
}
//이 곳은 주소(앤트포인트)를 통해 어떤 컴포넌트를 출력할 지를 정하는 곳 입니다.
//각 컴포넌트는 ../FrontEnd/src/pages/.. 에 위치해 있습니다.
export default App;
