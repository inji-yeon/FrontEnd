import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/main/Main';
import Mail from './pages/mail/Mail';
import Write from './pages/mail/MailWrite';
import Project from './pages/project/ProjectMain';
import ApprovalSidebar from './pages/approval/ApprovalSidebar';
import MyPage from './pages/mypage/Mypage';  
import AdminMail from './pages/admin/AdminMail';
import Attendance from './pages/attendance/Attendance';
import Login from './pages/login/Login';
import MailSidebar from './pages/mail/common/MailSidebar';
import MailView from './pages/mail/MailView';
import Calendar from './pages/calendar/CaledarSidebar';

import CreatePost from './pages/board/CreatePost';
import UpdatePost from './pages/board/UpdatePost';
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
import ApprovalFormList from './pages/approval/ApprovalFormList';
import OnProcessList from './pages/approval/OnProcessList';
import CompletedList from './pages/approval/CompletedList';
import RejectedList from './pages/approval/RejectedList';
import SavedList from './pages/approval/SavedList';
import RetrievedList from './pages/approval/RetrievedList';
import AwayForm from './pages/approval/FormLists/AwayForm';
import BusinessTripForm from './pages/approval/FormLists/BusinessTripForm';
import OnLeaveForm from './pages/approval/FormLists/OnLeaveForm';
import OvertimeForm from './pages/approval/FormLists/OvertimeForm';
import SWForm from './pages/approval/FormLists/SWForm';
import WFHForm from './pages/approval/FormLists/WFHForm';
import WritingOnLeave from './pages/approval/WritingPages/WritingOnLeave';
import WritingOvertime from './pages/approval/WritingPages/WritingOvertime';
import WritingAway from './pages/approval/WritingPages/WritingAway';
import WritingBusinessTrip from './pages/approval/WritingPages/WritingBusinessTrip';
import WritingWFH from './pages/approval/WritingPages/WritingWFH';
import OverworkDetailsOnProcess from './pages/approval/DetailPages/OverworkDetailsOnProcess';
import OverworkDetailsFinished from './pages/approval/DetailPages/OverworkDetailsFinished';
import ResubmitOvertime from './pages/approval/WritingPages/ResubmitOvertime';
import InboxList from './pages/approval/InboxList/InboxList';
import OverworkDetailsInbox from './pages/approval/DetailPages/OverworkDetailsInbox';

import ProjectBoard from './pages/project/ProjectBoard';
import ProjectBoardDetail from './pages/project/ProjectBoardDetail';
import AdminVacationList from './pages/attendance/AdminVacationList';
import AdminNoVacationList from './pages/attendance/AdminNoVacationList';


import { WebSocketProvider } from './component/WebSocketContext';
import AdminSidebar from './pages/admin/common/Sidbar';
import CreateBoard from './pages/board/CreateBoard';
import BoardLayout from './pages/board/BoardLayout';
import GroupChart from './pages/group/sidebar/GroupSideBar';
import MyPageSideBar from './pages/mypage/MypageLayout';
import MyPagePassword from './pages/mypage/Mypagepassword';

import AdminGroup from './pages/admin/AdminGroup';
import AdminApproval from './pages/admin/AdminApproval';
import { AlertProvider } from './component/common/AlertContext';
import { Alert } from './component/common/Alert';
import Messenger from './component/messenger/Messenger';


function App() {
    return (
        <AlertProvider>
        <WebSocketProvider>
            
            <BrowserRouter>
                <Routes>
                            <Route path='login' element={<Login />} />
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Main />} />

                        <Route path='mail' element={<MailSidebar />}>
                            <Route path='check' element={<Mail />} />
                            <Route path='write' element={<Write />} />
                        </Route>
                        <Route path='mail/view/:emailCode' element={<MailView />} />

                        <Route path='group' element={<GroupChart />}></Route>

                        <Route path='board' element={<BoardLayout />}>
                            <Route path=':boardCode' element={<PostListOfBoard />} />
                            <Route path='posts/regist' element={<CreatePost />} />
                            <Route path='boards/create' element={<CreateBoard />} />
                            <Route path='posts/:postCode' element={<PostInfo />} />
                            <Route path="posts/:postCode/update" element={ <UpdatePost/> } />
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
                        <Route path='adminVacationList' element={<AdminVacationList />} />
                        <Route path='adminNoVacationList' element={<AdminNoVacationList />} />
                    </Route>

                        <Route path='projects' element={<Project />} />
                        <Route path='projects/:projectCode' element={<ProjectBoard />} />
                        <Route path='projects/:projectCode/posts/:postCode' elemet={<ProjectBoardDetail />} />

                    <Route path='approval' element={<ApprovalSidebar />}>
                        <Route path='writing' element={<ApprovalFormList />}>
                            <Route path='AwayForm' element={<AwayForm />} />
                            <Route path='BusinessTripForm' element={<BusinessTripForm />} />
                            <Route path='OnLeaveForm' element={<OnLeaveForm />} />
                            <Route path='OvertimeForm' element={<OvertimeForm />} />
                            <Route path='SWForm' element={<SWForm />} />
                            <Route path='WFHForm' element={<WFHForm />} />
                        </Route>
                        <Route path='WritingOnLeave' element={<WritingOnLeave />} />
                        <Route path='WritingOvertime' element={<WritingOvertime />} />
                        <Route path='WritingAway' element={<WritingAway />} />
                        <Route path='WritingBusinessTrip' element={<WritingBusinessTrip />} />
                        <Route path='WritingWFH' element={<WritingWFH />} />
                        <Route path='onProcessList' element={<OnProcessList />} />
                        <Route path='completed' element={<CompletedList />} />
                        <Route path='rejected' element={<RejectedList />} />
                        <Route path='retrieved' element={<RetrievedList />} />
                        <Route path='inbox' element={<InboxList />} />
                        <Route path='saved' element={<SavedList />} />
                        <Route path='OverworkDetailsOnProcess/:approvalDocCode' element={<OverworkDetailsOnProcess />} />
                        <Route path='OverworkDetailsFinished/:approvalDocCode' element={<OverworkDetailsFinished />} />
                        <Route path='ResubmitOvertime/:approvalDocCode' element={<ResubmitOvertime />} />
                        <Route path='OverworkDetailsInbox/:approvalDocCode' element={<OverworkDetailsInbox />} />
                    </Route>
                    
                    <Route path='mypage' element={<MyPageSideBar />} >
                    <Route path='mypageinfo' element={<MyPage/>} />
                    <Route path='mypagepassword' element={<MyPagePassword/>} />
                    </Route>

                        <Route path='attendance' element={<Attendance />} />
                    </Route>

                    {/* <Route path='login' element={<Login />} /> */}

                    <Route path='admin' element={<AdminSidebar />}>
                        <Route path='mail' element={<AdminMail />} />
                        <Route path='group' element={<AdminGroup/>}/>
                        <Route path='approval' element={<AdminApproval/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </WebSocketProvider>
        <Alert/>
        </AlertProvider>
    );
}
//이 곳은 주소(앤트포인트)를 통해 어떤 컴포넌트를 출력할 지를 정하는 곳 입니다.
//각 컴포넌트는 ../FrontEnd/src/pages/.. 에 위치해 있습니다.
export default App;
