import pop from './attendancePage/PopForm.module.css'
import { callDetailMylAPI } from '../../apis/AttendanceAPI';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function PopDocument () {

    const dispatch = useDispatch();
    const params = useParams(); // URL 파라미터 가져오기
    const docDetail = useSelector((state) => state.attendance);
    const navigate = useNavigate(); 

    const detail = docDetail?.data;

    const stateOrder = docDetail?.data2;

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


    function formatTime(dateTimeArray) {
        if (!dateTimeArray || !Array.isArray(dateTimeArray)) return ""; // 배열이 아니거나 값이 없으면 빈 문자열 반환
    
        // 배열의 길이가 충분하지 않으면 나머지 시간 정보를 0으로 설정하여 Date 객체 생성
        const year = dateTimeArray[0] || 0;
        const month = (dateTimeArray[1] || 0) - 1;
        const day = dateTimeArray[2] || 0;
        const hours = dateTimeArray[3] || 0; // 시간
        const minutes = dateTimeArray[4] || 0; // 분
    
        // Date 객체 생성
        const dateTime = new Date(year, month, day, hours, minutes);
    
        // 시간과 분 추출
        const formattedHours = dateTime.getHours().toString().padStart(2, '0');
        const formattedMinutes = dateTime.getMinutes().toString().padStart(2, '0');
    
        // "HH:mm" 형식의 문자열로 반환
        return `${formattedHours}:${formattedMinutes}`;
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
                            <div className ={pop.B} style={{ display: 'table-cell' }}> {formatDateTime(detail?.onLeaveStartDate)} {formatTime(detail?.overworkStartTime)} {formatDateTime(detail?.softwareStartDate)} {formatDateTime(detail?.workTypeStartDate)} {formatDateTime(detail?.onLeaveEndDate)} {formatTime(detail?.overworkEndTime)}  {formatDateTime(detail?.workTypeEndDate)}</div>
                        </div>
                        <br/>
                        <div style={{ display: 'table-row' }}>
                            <div className ={pop.A} style={{ display: 'table-cell' }}>사유 :</div>
                            <div className ={pop.B} style={{ display: 'table-cell' }}> {detail?.onLeaveReason} {detail?.overworkReason} {detail?.softwareReason} {detail?.workTypeReason} </div>
                        </div>
                        <br/>
                    </div>
                </div>

                <div className={pop.area}>
                    <table style={{ borderCollapse: 'collapse', fontSize: '16px', width: '100%'}}>        
                    <colgroup>
                        {Array.isArray(stateOrder) && stateOrder.map((state, index) => (
                            <col key={index} style={{ width: `${100 / stateOrder.length}%` }} />
                        ))}
                    </colgroup>
                        <thead>
                            <tr className={pop.list_commute_detail} style={{ backgroundColor: '#F5F5F5' }}>
                                {Array.isArray(stateOrder) && stateOrder.length > 0 ?
                                    stateOrder.map((state) => (
                                        <th key={state?.approvalLineDocumentCode?.approvalDocumentCode}>{state.approvalProcessOrder}
                                        </th>
                                    ))
                                    :
                                    <th>조회된 내용이 없습니다.</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={pop.list_commute_detail}>
                                {Array.isArray(stateOrder) && stateOrder.length > 0 ?
                                    stateOrder.map((state) => (
                                        <td key={state?.approvalLineDocumentCode?.approvalDocumentCode}>
                                            <div className={pop.list_commute_detail}>{state.approvalProcessStatus}</div>
                                            <div className={pop.list_commute_detail}>{formatDateTime(state.approvalProcessDate)}</div>
                                            <div className={pop.list_commute_detail}>{state.approvalRejectedReason}</div>
                                        </td>
                                    ))
                                    :
                                    <td>조회된 내용이 없습니다.</td>
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
    </>


    )
}

export default PopDocument
    

