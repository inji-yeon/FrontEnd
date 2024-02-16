import React from 'react';
import MyPageSideBarstyle from './MyPageSideBar.module.css';

const MyPageSideBar = () => {

    return (
        <div className={MyPageSideBarstyle.sidemenu2}>
            <div className={MyPageSideBarstyle.mypage_name}>
                <div className={MyPageSideBarstyle.mypage_name2}>&lt;마이페이지&gt;</div>
                <ul>
                    <li>
                        <div>내 정보</div>
                    </li>
                    <li>
                        <a href="/mypagepassword">
                            <div>비밀번호 변경</div>
                        </a>
                    </li>
                    <li>
                        <div>휴가정보</div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default MyPageSideBar;
