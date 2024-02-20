import { useEffect } from 'react';
import MyPageSideBarstyle from './MyPageSideBar.module.css';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callMypageGetInfoAPI } from '../../../apis/MypageAPI';
import jwtDecode from 'jwt-decode';
// import MyPage from '../Mypage';
// import { Outlet } from "react-router-dom";

const MyPageSideBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goToMypageinfo = () => {
        navigate('/mypage/mypageinfo');
    };

    const goToMypagepwd = () => {
        navigate('/mypage/mypagepassword');
    };

    const accessToken = localStorage.getItem('accessToken');//로그인한 사용자 정보에서 사원코드값 뽑아오기 
const decodeToken = jwtDecode(accessToken);
const employeeCode = decodeToken.empCode;
console.log('사이드바 employeeCode나오나 한 번 보자',employeeCode);


    const mypageemps = useSelector((state) => state.mypagereducer);
    console.log('사이드바 mypageemps나오는지 한 번 보자 --------',mypageemps)

    useEffect(() => {
        dispatch(callMypageGetInfoAPI({ form: null}));
    }, [dispatch]);
 
    const timestamp = mypageemps.data?.empJoinDate; // 예시로 제공한 타임스탬프 값

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString(); // 날짜를 현지 시간대에 맞는 문자열로 반환
    
    console.log(formattedDate); 

    return (
        <>
       <div className={MyPageSideBarstyle.mainsection}>
       <div className={MyPageSideBarstyle.sidemenu2}>
            <div className={MyPageSideBarstyle.mypage_name}>
                <div className={MyPageSideBarstyle.mypage_name2}>&lt;마이페이지&gt;</div>
                <ul>
                    <li>
                        <div onClick={goToMypageinfo}>내 정보</div>
                    </li>
                    <li>
                            <div onClick={goToMypagepwd}>비밀번호 변경</div>
                    </li>
                </ul>
            </div>
        </div>
        {/* {mypageemps.data.empName} */}
        {/* {mypageemp.data.department.departmentName} */}
        <div className={MyPageSideBarstyle.mypage_section}>
            <div className={MyPageSideBarstyle.maincontent}>
                <div className={MyPageSideBarstyle.mypage_info}>
                    <img src="/images/profile_example/ellipse_2.png" height="200px" width="200px" alt="프로필 이미지" />
                    
                    <p style={{ fontSize: '30px' }}>{mypageemps.data?.empName}</p>
                    <div className={MyPageSideBarstyle.mypage_info2}>
                        <div>
                            <h3 className={MyPageSideBarstyle.mypagetitle}>&lt;부서&gt;</h3>
                            <div id={MyPageSideBarstyle.dept_name}>{mypageemps.data?.department?.departmentName}</div>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <h3 className={MyPageSideBarstyle.mypagetitle}>&lt;입사일&gt;</h3>
                            <div id={MyPageSideBarstyle.joinDate}>{formattedDate}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <MyPage/> */}
       </div>
        </>
    );
}

export default MyPageSideBar;
