//공통으로 사용하는 사이드바 부분입니다. 

import {useDispatch, useSelector } from 'react-redux';
import './sidemenu.css';
import {useEffect, useState} from 'react';
import { getUserInformation } from '../../apis/SidebarAPI';
import { useNavigate  } from 'react-router-dom';


function SideBar() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getUserInformation());
    })

    // const userName = useSelector(state => state.sidebar.userName);
    // const userGroup = useSelector(state => state.sidebar.userGroup);
    // const userDept = useSelector(state => state.sidebar.userDept);
    // const userProfileImg = useSelector(state => state.sidebar.userProfileImg);

    const user = useSelector(state => state.sidebar);
    const {userName, userGroup, userDept, userProfileImg} = user;


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
        const box = document.querySelector('.selected_box');
        box.style.opacity = '1';

        switch (value) {
            case 'main':
                box.style.opacity = '0';
                navigate('/');
                break;
            case 'mail': 
                box.style.top = '125px'; 
                navigate('/mail/check');
                break;
            case 'attendance': 
                box.style.top = '210px'; 
                navigate('/attendance');
                break;
            case 'calendar': 
                box.style.top = '293px'; 
                navigate('/calendar');
                break;
            case 'project': 
                box.style.top = '376px'; 
                navigate('/project');
                break;
            case 'approval': 
                box.style.top = '462px'; 
                navigate('/approval');
                break;
            case 'board': 
                box.style.top = '546px';
                navigate('/board');
                break;
            case 'group': 
                box.style.top = '630px'; 
                navigate('/group');
                break;
            case 'admin': 
                box.style.top = '714px';
                navigate('/admin');
                break;
            default:
                box.style.display = 'none';
            
        }

    }

    return (
        <>
            <div className="sidemenu">
                <div onClick={()=>{sidebarMenuSelectHandler('main')}} className="company_name">Witty Wave</div>
                <div className="sidemenu_list">
                    <ul>
                        <div className="selected_box"></div>
                        <li onClick={() => { sidebarMenuSelectHandler('mail') }}>
                            <div>메일</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('attendance') }}>
                            <div>근태 관리</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('calendar') }}>
                            <div>캘린더</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('project') }}>
                            <div>프로젝트</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('approval') }}>
                            <div>전자 결재</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('board') }}>
                            <div>게시판</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('group') }}>
                            <div>조직</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('admin') }}>
                            <div>(임시)관리자</div>
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
                                    <span className="status_name_text">{userName}</span>
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