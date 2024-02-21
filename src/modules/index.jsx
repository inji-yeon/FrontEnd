//이 곳은 초기값, 액션, 리듀서로 액션을 정의하고, 액션에 의해 상태가 어떻게 변경되는지
//를 정의하는 곳 입니다. 정의해두면 dispatch로 액션을 정의할 수 있습니다.
import { combineReducers } from 'redux';
import mailReducer from './MailModule';
import sidebarReducer from './SidebarModule';
import attendanceReducer from './AttendanceModule';
import employeeReducer from './EmployeeModules'
import calendarReducer from './CalendarModule';
import groupreducer from './GroupModule';
import projectReducer from './ProjectModule';
import postReducer from './PostModule';
import postCommentReducer from './PostCommentModule';
import boardReducer from './BoardModule';
import mypagereducer from './MypageModule';
import groupchartreducer from './GroupchartModule';
import mypagepwdupdatereducer from './MypagepwdupdateModule';
import mypageinfoupdatereducer from './MypageinfoupdateModule';
import { adminReducer } from './AdminModule';
import { mainReducer } from './MainModule';

import approvalReducer from './ApprovalModule';

const rootReducer = combineReducers({
    mainPost: mainReducer,
    admin: adminReducer,
    mail: mailReducer,
    sidebar: sidebarReducer,
    attendance: attendanceReducer,
    employeeReducer,
    calendar: calendarReducer,
    groupreducer,
    project: projectReducer,
    board: postReducer,
    mypagereducer,
    groupchartreducer,
    mypagepwdupdatereducer,
    mypageinfoupdatereducer,

    postCommentReducer,
    boardReducer,
    approvalReducer,


});

export default rootReducer;
