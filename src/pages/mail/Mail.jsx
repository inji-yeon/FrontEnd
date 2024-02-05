import { useDispatch, useSelector } from "react-redux";
import { getMail } from "../../apis/MailAPI";
import './mail.css';


function Mail(){
    // const dispatch = useDispatch();
    // const count = useSelector(state => state.mail.count);
    // const infor = useSelector(state => {
    //     console.log('state :',state);
    //     console.log('state.mail :',state.mail);
    //     console.log('state.mail.emails :',state.mail.userName);
    //     return state.mail.userName
    // });
    // console.log(infor);
    // function increment(){
    //     return {type:"mail/INCREASE"};
    // }


    // const onClickHandler = function(){
    //     dispatch(increment());
    // }
    // const onClickHandler2 = function(){
    //     alert('온클릭핸들러');
    //     dispatch(getMail());
    // }
    return(
        <>
        {/* 이 곳은 /mail엔드포인트 입니다. */}
        <div className="main">

    </div>


    <section className="project_section">
        <div className="project_header">
            <div className="project_header_title">메일함</div>
            <div className="project_input_wrap">
                <select id="search-options">
                    <option value="what-is-value">제목으로 검색하기</option>
                    <option value="what-is-value">보낸 사람 검색하기</option>
                </select>
                <input className="project_search_input" name="searchText" type="text" placeholder="메일 검색"/>
                <input className="project_search_button" type="button" value="검색"/>
                <input className="project_create_button" type="button" value="예약 전송"/>
            </div>
        </div>
        <div className="project_body">
            <table style={{textAlign: "left"}} className="boardList">
                <thead>
                <tr>
                    <th><input id="selectAll" className="test" type="checkbox"/></th>
                    <th className="important-icon"><img alt="별" src="/images/mail/star.png" style={{ width: '25px', height: '25px' }}/></th>
                    <th>보낸 사람</th>
                    <th>제목</th>
                    <th>보낸 날짜</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input type="checkbox"/></td>
                    <td><img alt="별" src="/images/mail/star_empty.png" style={{width: '20px', height: '20px'}}/></td>
                    <td>차윤하 본부장</td>
                    <td>[인사팀] 안녕하세요</td>
                    <td>2024-01-09</td>
                </tr>

                <tr>
                    <td><input type="checkbox"/></td>
                    <td><img alt="별" src="/images/mail/star_empty.png" style={{width: '20px', height: '20px'}}/></td>
                    <td>차윤하 본부장</td>
                    <td>[인사팀] 안녕하세요 랄라</td>
                    <td>2024-01-09</td>
                </tr>

                <tr className="read">
                    <td><input type="checkbox"/></td>
                    <td><img alt="별" src="/images/mail/star_empty.png" style={{width: '20px', height: '20px'}}/></td>
                    <td>차윤하 본부장</td>
                    <td>[인사팀] 안녕하세요 룰루랄라</td>
                    <td>2024-01-10</td>
                </tr>
                <tr className="read">
                    <td><input type="checkbox"/></td>
                    <td><img alt="별" src="/images/mail/star_empty.png" style={{width: '20px', height: '20px'}}/></td>
                    <td>차윤하 본부장</td>
                    <td>[인사팀] 안녕하세요 룰루랄라</td>
                    <td>2024-01-10</td>
                </tr>
                <tr className="read">
                    <td><input type="checkbox"/></td>
                    <td><img alt="별" src="/images/mail/star_empty.png" style={{width: '20px', height: '20px'}}/></td>
                    <td>차윤하 본부장</td>
                    <td>[인사팀] 안녕하세요 룰루랄라</td>
                    <td>2024-01-10</td>
                </tr>
                </tbody>
            </table>

        </div>
        <div className="project_footer">

        </div>
    </section>
        </>
    )
}

export default Mail;