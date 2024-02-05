import {
    GET_USER_INFORMATION,
} from '../modules/SidebarModule';
import datas  from '../testdata/userInfor'

export const getUserInformation = () => (dispatch) => {
    dispatch({type: GET_USER_INFORMATION, payload: datas});
}