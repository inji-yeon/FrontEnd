import { useDispatch, useSelector } from "react-redux";
import { getMail } from "../../apis/MailAPI";


function Mail(){
    const dispatch = useDispatch();
    const count = useSelector(state => state.mail.count);
    const infor = useSelector(state => {
        console.log('state :',state);
        console.log('state.mail :',state.mail);
        console.log('state.mail.emails :',state.mail.userName);
        return state.mail.userName
    });
    console.log(infor);
    function increment(){
        return {type:"mail/INCREASE"};
    }


    const onClickHandler = function(){
        dispatch(increment());
    }
    const onClickHandler2 = function(){
        alert('온클릭핸들러');
        dispatch(getMail());
    }
    return(
        <>
        {/* 이 곳은 /mail엔드포인트 입니다. */}
            <div>메일</div>
            <div>{infor}</div>
            <div>{count}</div>
            <button onClick={onClickHandler}>리듀서 테스트</button>
            <button onClick={onClickHandler2}>리듀서 테스트2</button>
        </>
    )
}

export default Mail;