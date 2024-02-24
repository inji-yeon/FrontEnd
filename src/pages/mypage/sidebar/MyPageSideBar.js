import { useEffect,useState,useRef } from 'react';
import MyPageSideBarstyle from './MyPageSideBar.module.css';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callMypageGetInfoAPI,callMypageGetProfileAPI,callProfileUpdateAPI } from '../../../apis/MypageAPI';
import { decodeJwt } from '../../../utils/tokenUtils.jsx';

const MyPageSideBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태
    const imageInput = useRef();

    const goToMypageinfo = () => {
        navigate('/mypage/mypageinfo');
    };

    const goToMypagepwd = () => {
        navigate('/mypage/mypagepassword');
    };

const accessToken = localStorage.getItem('accessToken');//로그인한 사용자 정보에서 사원코드값 뽑아오기 
const decodeToken = decodeJwt(accessToken);
const employeeCode = decodeToken?.empCode;
console.log('사이드바 employeeCode나오나 한 번 보자',employeeCode);


    const mypageemps = useSelector(state => state.mypagereducer);
    console.log('프로필사이드바 mypageemps 프로필 나오는지 한 번 보자 --------',mypageemps?.profileImage?.data?.profileOgFile)
    console.log('프로필사이드에서 경로 나오는지 확인 ', mypageemps?.profileImage);
    console.log('프로필사이드에서 mypageemps데이터 전부 나오는지 확인 ', mypageemps);
    
       const timestamp = mypageemps.empInfo?.data?.empJoinDate; // 타임스탬프 값
   
       const date = new Date(timestamp);
       const formattedDate = date.toLocaleDateString(); // 날짜를 현지 시간대에 맞는 문자열로 반환
       
       console.log(formattedDate); 


       //======================================  여기부터 프로필에 관한 코드  ===========================================


      // 사용자정보 가져오기 
    useEffect(() => {
        dispatch(callMypageGetInfoAPI({ form: null}));
    }, [dispatch]);
    
    // 사용자 프로필사진 정보 가져오기
    useEffect(() => {
        dispatch(callMypageGetProfileAPI({ form: null })); // 프로필 코드를 전달하여 API 호출
    }, [dispatch]);
    
   // 프로필 이미지 경로 설정
    useEffect(() => { 
    // 사용자 프로필 정보에서 이미지 경로를 가져와서 설정
    console.log('프로필 경로 나오는지 확인999 ', mypageemps?.profileImage?.data?.profileChangedFile);
    if (mypageemps && mypageemps?.profileImage &&  mypageemps?.profileImage?.data) {
        setProfileImage(mypageemps.profileImage?.data?.profileChangedFile);
    } else {
        // 데이터가 없는 경우 기본값으로 설정하거나 다른 처리를 수행할 수 있습니다.
        setProfileImage(null); // 혹은 다른 값을 설정합니다.
    }
}, [mypageemps?.profileImage?.data?.profileChangedFile]);//이게 변경되면 ui를 업데이트 하기 위해서 써줌 



    useEffect(() => {
        // 이미지 업로드시 미리보기 세팅
        
        if(image){
            const fileReader = new FileReader();
            console.log('미리보기 선택한파일:', image?.name);
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setProfileImage(result);
                }
            }
            fileReader.readAsDataURL(image);
            console.log('미리보기 이미지 파일을 읽는 화인용',image)
        }
    },
    [image]);



    const onClickImageUpload = () => {
        imageInput.current.click();
    }


const onChangeImageUpload = (e) => {
    const imageFile = e.target.files[0];
    console.log('선택한 파일:', imageFile);

    // 선택한 이미지를 상태 변수에 저장
    setImage(imageFile);

    // FileReader를 사용하여 이미지를 읽음
    const reader = new FileReader();
    reader.onload = () => {
        // 읽은 이미지를 이미지 URL로 설정하여 미리보기에 사용
        setImageUrl(reader.result);
    };
    reader.readAsDataURL(imageFile); // 파일을 읽음
};

const onClickUpdateProfile = () => {
    console.log('프로필 이미지를 업데이트합니다.');
    console.log('image 나오냐 수정번튼에서', image);

    const formData = new FormData();
    formData.append('profileImage', image);
    console.log('업데이트할 프로필 데이터:', formData); // 확인용 로그 추가


    // 프로필 업데이트 API 호출
    dispatch(callProfileUpdateAPI({ form: formData }))
    .then(() => {dispatch(callMypageGetProfileAPI({ form: null }));});
    
    alert('프로필 이미지 업데이트를 요청했습니다. 수정이 완료되면 알림이 표시됩니다.');
};

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
        <div className={MyPageSideBarstyle.mypage_section}>
            <div className={MyPageSideBarstyle.maincontent}>
                <div className={MyPageSideBarstyle.mypage_info}>

{/* ========================================================= */}

<div className={MyPageSideBarstyle.profilebox}>
    {/* 프로필 이미지가 있으면 해당 이미지를 보여줌 */}
    {!image && !profileImage && (
    <img
        src={`http://${process.env.REACT_APP_RESTAPI_IP}:1208/web-images/profile2.png`}
        alt="디폴트 프로필 이미지"
        height="200px"
        width="200px"
    />
)}
    {!image && profileImage && (
        <img
            src={`http://${process.env.REACT_APP_RESTAPI_IP}:1208/web-images/${profileImage}`}
            alt="프로필 이미지"
            height="200px"
            width="200px"
        />
    )}

    {!image && (
        <input
            style={{ display: 'none' }}
            type="file"
            name="profileImage"
            accept="image/jpg,image/png,image/jpeg,image/gif"
            onChange={onChangeImageUpload}
            ref={imageInput}
        />
    )}


    {/* 선택한 이미지를 보여줌 */}
    {image && (
        <img
            src={imageUrl}
            alt="선택한 이미지"
            height="200px"
            width="200px"
        />
    )}
</div>

                    <input                
                            style={ { display: 'none' }}
                            type="file"
                            name='profileImage' 
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={ onChangeImageUpload }
                            ref={ imageInput }
                            />
                  <div className={MyPageSideBarstyle.profilebtnbox}>
                            {!image && (
        <button className={MyPageSideBarstyle.profilemodifybtn} onClick={onClickImageUpload}>
            파일 선택하기
        </button>
    )}

                    <button onClick={onClickUpdateProfile} className={MyPageSideBarstyle.profilemodifybtn} >수정하기</button>

                    
                  </div>
                    <br/>
                    <p style={{ fontSize: '30px' }}>{mypageemps.data?.empName}</p>
                    <div className={MyPageSideBarstyle.mypage_info2}>
                        <div>
                            <h3 className={MyPageSideBarstyle.mypagetitle}>&lt;부서&gt;</h3>
                            <div id={MyPageSideBarstyle.dept_name}>{mypageemps.empInfo?.data?.department?.departmentName}</div>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <h3 className={MyPageSideBarstyle.mypagetitle}>&lt;직급&gt;</h3>
                            <div id={MyPageSideBarstyle.dept_name}>{mypageemps.empInfo?.data?.job?.jobName}</div>
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
       </div>
        </>
    );
}

export default MyPageSideBar;
