import pop from './attendancePage/PopForm.module.css'
import { callDetailMylAPI } from '../../apis/AttendanceAPI';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function PopDocument () {

    const dispatch = useDispatch();
    const params = useParams(); // URL 파라미터 가져오기
    const detail = useSelector((state) => state.attendance.data);
    const navigate = useNavigate(); 


    function formatDateTime(dateTimeArray) {
        if (!dateTimeArray || !Array.isArray(dateTimeArray)) return ""; // 배열이 아니거나 값이 없으면 빈 문자열 반환
    
        // 배열의 길이가 충분하지 않으면 나머지 시간 정보를 0으로 설정하여 Date 객체 생성
        const year = dateTimeArray[0] || 0;
        const month = (dateTimeArray[1] || 0) - 1;
        const day = dateTimeArray[2] || 0;
    
        // Date 객체 생성
        const dateTime = new Date(year, month, day);
    
        // 년, 월, 일 추출
        const formattedYear = dateTime.getFullYear();
        const formattedMonth = (dateTime.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 해주고, 2자리로 만들기 위해 padStart 사용
        const formattedDay = dateTime.getDate().toString().padStart(2, '0');
    
        // "yyyy-MM-dd" 형식의 문자열로 반환
        return `${formattedYear}-${formattedMonth}-${formattedDay}`;
    }


    const [previousPageUrl, setPreviousPageUrl] = useState('');

    const selectedDocumentCode = params.approvalDocumentCode;

    // 선택한 문서의 approvalDocumentCode 값이 변경될 때마다 API 호출합니다.
    useEffect(() => {
        if (selectedDocumentCode) {
            dispatch(callDetailMylAPI({ approvalDocumentCode: selectedDocumentCode }));
        }
    }, [selectedDocumentCode, dispatch]);


    useEffect(() => {
        const previousPageUrl = localStorage.getItem('previousPageUrl');
        setPreviousPageUrl(previousPageUrl);
    }, []);

    const handleGoBack = () => {
        navigate(previousPageUrl); // 이전 페이지로 이동합니다.
    };

    
    return(   
    <>
        <div className= {pop.main}>
            <div className= {pop.main2}>
                <button onClick={handleGoBack}>닫기</button>
                <div className={pop.form_body} key={detail?.approvalLineDocumentCode?.approvalDocumentCode}>
                    <div className={pop.form_title_section}>
                        <div className={pop.form_title}> {detail?.approvalLineDocumentCode?.approvalForm} </div>
                    </div>
                    <div className={pop.form_table} style={{ display: 'table' }}>
                        <div style={{ display: 'table-row' }}>
                            <div className ={pop.A} style={{ display: 'table-cell' }}>제목 :</div>
                            <div className ={pop.B} style={{ display: 'table-cell' }}> {detail?.onLeaveTitle} {detail?.overworkTitle} {detail?.softwareTitle} {detail?.workTypeTitle}</div>
                        </div> 
                        <br/>
                        <div style={{ display: 'table-row' }}>
                            <div className ={pop.A} style={{ display: 'table-cell' }}>종류 :</div>
                            <div className ={pop.B} style={{ display: 'table-cell' }}> {detail?.kindOfOnLeave} {detail?.kindOfOverwork} {detail?.kindOfSoftware} {detail?.workTypePlace} </div>
                        </div>
                        <br/>
                        <div style={{ display: 'table-row' }}>
                            <div className ={pop.A} style={{ display: 'table-cell' }}>기간 :</div>
                            <div className ={pop.B} style={{ display: 'table-cell' }}> {formatDateTime(detail?.onLeaveStartDate)} {formatDateTime(detail?.overworkStartTime)} {formatDateTime(detail?.softwareStartDate)} {formatDateTime(detail?.workTypeStartDate)} {formatDateTime(detail?.onLeaveEndDate)} {formatDateTime(detail?.overworkEndTime)}  {formatDateTime(detail?.workTypeEndDate)}</div>
                        </div>
                        <br/>
                        <div style={{ display: 'table-row' }}>
                            <div className ={pop.A} style={{ display: 'table-cell' }}>사유 :</div>
                            <div className ={pop.B} style={{ display: 'table-cell' }}> {detail?.onLeaveReason} {detail?.overworkReason} {detail?.softwareReason} {detail?.workTypeReason} </div>
                        </div>
                        <br/>
                        <div style={{ display: 'table-row' }}>
                            <div className ={pop.A} style={{ display: 'table-cell' }}>진행 :</div>
                            <div className ={pop.B} style={{ display: 'table-cell' }}>  {detail?.approvalProcessOrder} - {detail?.approvalProcessStatus}  {formatDateTime(detail?.approvalProcessDate)} </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    </>


    )
}

export default PopDocument
    

