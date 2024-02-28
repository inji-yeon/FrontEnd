//공통으로 사용하는 사이드바 부분입니다. 

import { useDispatch, useSelector } from 'react-redux';
import './sidemenu.css';
import { useEffect, useRef, useState } from 'react';

import { getUserInformation } from '../../apis/SidebarAPI';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';


function SideBar() {
    const selectedListWrap = useRef();
    const selectedBoxRef = useRef();
    let navigate = useNavigate();
    const [token, setToken] = useState('');
    const [userDept, setUserDept] = useState('');
    const [userGroup, setUserGroup] = useState('');
    useEffect(() => {
        setToken(decodeJwt(window.localStorage.getItem("accessToken")));
    }, [])
    useEffect(() => {
        if (token) {
            setUserDept(token.empDeptName);
            switch (token.empGroupCode) {
                case 1: setUserGroup('관리본부'); break;
                case 2: setUserGroup('영업본부'); break;
                case 3: setUserGroup('개발본부'); break;
                case 4: setUserGroup('마케팅본부'); break;
                default: setUserGroup('Error');
            }
        }

    }, [token])

    const user = useSelector(state => state.sidebar);
    const { userProfileImg } = user;


    const [statusImg, setStatusImg] = useState("../../../../sidebar/sidebar_user_status_img/office.png");

    //유저 근무 상태 이미지 넣기

    const changeStatusImg = (e) => {
        const status = e.target.value;  //이벤트 가져와서 status에 넣기
        switch (status) {
            case 'office':  //오피스 근무 중 상태로 사진 변경
                setStatusImg('../../../../sidebar/sidebar_user_status_img/office.png'); break;
            case 'remote':  //재택 근무 중 으로 변경
                setStatusImg('../../../../sidebar/sidebar_user_status_img/remote.png'); break;
            case 'vacation':    //휴거
                setStatusImg('../../../../sidebar/sidebar_user_status_img/vacation.png'); break;
            case 'meeting': //미팅
                setStatusImg('../../../../sidebar/sidebar_user_status_img/meeting.png'); break;
            case 'away':    //자리비움
                setStatusImg('../../../../sidebar/sidebar_user_status_img/away.png'); break;
            default:    //기본(에러)는 오피스 근무로
                setStatusImg('../../../../sidebar/sidebar_user_status_img/office.png');
        }
    }
    const sidebarMenuSelectHandler = (value) => {
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
                console.log('[onClickPurchaseHandler] token : ', token);
                if(token === undefined || token === null) {
                    alert('로그인을 먼저해주세요');

                    
                    return navigate('/login'); ;
                }
        const box = document.querySelector('.selected_box');
        const texts = ['mail', 'attendance', 'calendar', 'project', 'approval', 'board', 'group'];
        for (let i = 0; i < texts.length; i++) {
            document.getElementById(texts[i]).style.color = '#606060';
            if (value === texts[i]) {
                document.getElementById(texts[i]).style.color = 'white';
            }
        }
        box.style.opacity = '1';

        switch (value) {
            case 'main':
                navigate('/main');
                break;
            case 'mail':
                navigate('/mail/check');
                break;
            case 'attendance':
                navigate('attendance/attendance');
                break; ///////
            case 'calendar':
                navigate('/calendar');
                break;
            case 'project':
                navigate('/projects');
                break;
            case 'approval':
                navigate('/approval');
                break;
            case 'board':
                navigate('/board/1/posts');
                break;
            case 'group':
                navigate('/group');
                break;
            case 'admin':
                navigate('/admin');
                break;
            default:
        }
    }
    useEffect(() => {
        const list = selectedListWrap.current;
        const box = selectedBoxRef.current;
        const texts = ['mail', 'attendance', 'calendar', 'project', 'approval', 'board', 'group'];
        for (let i = 0; i < texts.length; i++) {
            list.querySelector(`#${texts[i]}`).style.color = '#606060';
            if (window.location.pathname.startsWith("/" + texts[i]) && window.location.pathname !== '/') {
                list.querySelector(`#${texts[i]}`).style.color = 'white';
                box.style.backgroundColor = '#fa9a85';
                box.style.display = ''
            }
        }
        box.style.opacity = '1';
        switch (true) {
            // case window.location.pathname.startsWith('/main'):
            //     box.style.opacity = '0';
            //     break;
            case window.location.pathname.startsWith('/mail'):
                box.style.top = '125px';
                break;
            case window.location.pathname.startsWith('/attendance'):
                box.style.top = '210px';
                break;
            case window.location.pathname.startsWith('/calendar'):
                box.style.top = '293px';
                break;
            case window.location.pathname.startsWith('/project'):
                box.style.top = '376px';
                break;
            case window.location.pathname.startsWith('/approval'):
                box.style.top = '462px';
                break;
            case window.location.pathname.startsWith('/board'):
                box.style.top = '546px';
                break;
            case window.location.pathname.startsWith('/group'):
                box.style.top = '630px';
                break;
            case window.location.pathname.startsWith('/admin'):
                box.style.top = '714px';
                break;
            default:
                box.style.display = 'none';
        }
    }, [window.location.pathname])
    return (
        <>
            <div className="sidemenu">
                <div onClick={() => { sidebarMenuSelectHandler('main') }} className="company_name">Witty Wave</div>
                <div className="sidemenu_list" ref={selectedListWrap}>
                    <ul >
                        <div className="selected_box" ref={selectedBoxRef}></div>
                        <li onClick={() => { sidebarMenuSelectHandler('mail') }}>
                            <div id="mail">메일</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('attendance') }}>
                            <div id="attendance">근태 관리</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('calendar') }}>
                            <div id="calendar">캘린더</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('project') }}>
                            <div id="project">프로젝트</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('approval') }}>
                            <div id="approval">전자 결재</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('board') }}>
                            <div id="board">게시판</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('group') }}>
                            <div id="group">조직</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('admin') }}>
                            <div>관리자</div>
                        </li>
                    </ul>
                </div>
                <div className="working_status_wrap">
                    <table className="working_status">
                        <thead>
                        <tr className="working_status_row1">
                            <td className="status_title" colSpan="2">
                                <div>
                                    <span>나의 상태</span>
                                </div>
                            </td>
                        </tr>
                        <tr className="working_status_row2">
                            <td className="status_profile">
                                <div>
                                    <img src={userProfileImg} alt="프로필 이미지" />
                                </div>
                            </td>
                            <td className="status_name_and_team">
                                <div>
                                    {token? (<span className="status_name_text">{token.employeeName}</span>) 
                                    : (<span className="status_name_text">비회원</span>)}
                                    <img id="status_img" src={statusImg} alt="상태이미지" />
                                </div>
                                <br />
                                <span className="status_team_text">{userGroup} / {userDept}</span>
                            </td>
                        </tr>
                        <tr className="working_status_row3">
                            <td className="select_status" colSpan="2">
                                <select id="status_dropdown" onChange={changeStatusImg}>
                                    <option value="none" hidden>근무 상태를 선택하세요.</option>
                                    <option value="office">오피스 근무</option>
                                    <option value="remote">재택 근무</option>
                                    <option value="vacation">휴가 중</option>
                                    <option value="meeting">미팅 중</option>
                                    <option value="away">자리 비움</option>
                                </select>
                            </td>
                        </tr>
                        </thead>
                    </table>
                </div>

            </div>
        </>
    )
}

export default SideBar;