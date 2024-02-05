import {
    GET_MAIL,
} from '../modules/MailModule';
import datas  from '../testdata/userInfor'

export const getMail = () => (dispatch) => {
    alert("MailAPI옴");
    console.log(datas);
    dispatch({type: GET_MAIL, payload: datas});
}