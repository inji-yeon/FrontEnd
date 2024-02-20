import React, { useState, useEffect } from 'react';
import MypageInfoStyle from './Mypage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callMypageGetSpreadAPI } from '../../apis/MypageinfoupdateAPI';
import { callMypageUpdateInfoAPI } from '../../apis/MypageinfoupdateAPI';


function MyPage() {
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken');
    console.log('-----[MyPage] accessToken : ', accessToken);


    const mypageemps = useSelector((state) => state.mypagereducer);

    useEffect(() => {
        dispatch(callMypageGetSpreadAPI({ form: null }));
    }, [dispatch]);

    const timestamp = mypageemps.data?.empBirth;
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();

    // 초기 상태 설정
    const [userInfo, setUserInfo] = useState({
        phone: '',
        empEmail: '',
        address: '',
    });

    useEffect(() => {
        setUserInfo({
            phone: mypageemps.data?.phone || '',
            empEmail: mypageemps.data?.empEmail || '',
            address: mypageemps.data?.empAddress || '',
        });
    }, [mypageemps.data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };
console.log('수정한 사용자 정보 나오는지 ',JSON.stringify(userInfo) )

    const handleUpdate = () => {
        dispatch(callMypageUpdateInfoAPI({ form: JSON.stringify(userInfo) })).then(() => {
            console.log('수정한 사용자 정보 여기 안에서도 나오는지 ',userInfo)
            alert('수정되었습니다.');
        }).catch((error) => {
            alert('수정 실패했습니다.');
            console.error('수정 중 오류가 발생했습니다:', error);
        });
    };


    return (
        <>
            <div className={MypageInfoStyle.myinfo_update}>
                <div className={MypageInfoStyle.myinfo_chart}>
                    <div className={MypageInfoStyle.myinfotext}>&lt;내 정보&gt;</div>
                    <h2>이름</h2>
                    <input type="text" value={mypageemps.data?.empName || ''} readOnly />
                    <h2>부서</h2>
                    <input type="text" value={mypageemps.data?.department?.departmentName || ''} readOnly />
                    <h2>생년월일</h2>
                    <input type="text" value={formattedDate} readOnly />
                    <h2>전화번호</h2>
                    <input
                        type="text"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleInputChange}
                    />
                    <h2>이메일</h2>
                    <input
                        type="text"
                        name="empEmail"
                        value={userInfo.empEmail}
                        onChange={handleInputChange}
                    />
                    <h2>주소</h2>
                    <input
                        type="text"
                        name="address"
                        value={userInfo.address}
                        onChange={handleInputChange}
                    />
                    <br />
                    <div className={MypageInfoStyle.update_btn}>
                        <button className={MypageInfoStyle.update_btn2} onClick={() => handleUpdate()} >수정하기</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyPage;

