//이 곳은 초기값, 액션, 리듀서로 액션을 정의하고, 액션에 의해 상태가 어떻게 변경되는지
//를 정의하는 곳 입니다. 정의해두면 dispatch로 액션을 정의할 수 있습니다.
import { combineReducers } from 'redux';
import mailReducer from './MailModule';
import sidebarReducer from './SidebarModule';
import employeeReducer from './EmployeeModules'

const rootReducer = combineReducers({
    mail: mailReducer,
    sidebar: sidebarReducer,
    employeeReducer
})

export default rootReducer; 
