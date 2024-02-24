import pop from './attendancePage/PopForm.css'
import { callDetailMylAPI } from '../../apis/AttendanceAPI';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function PopDocument () {

    const dispatch = useDispatch();
    const params = useParams(); // URL 파라미터 가져오기
    const detail = useSelector((state) => state.attendance.data);

    const selectedDocumentCode = params.approvalDocumentCode;

    // 선택한 문서의 approvalDocumentCode 값이 변경될 때마다 API 호출합니다.
    useEffect(() => {
        if (selectedDocumentCode) {
            dispatch(callDetailMylAPI({ approvalDocumentCode: selectedDocumentCode }));
        }
    }, [selectedDocumentCode, dispatch]);

    return(   
    <>
    

                <section className= {pop.form_section}>

                    <div className={pop.form_body} key={detail?.approvalLineDocumentCode?.approvalDocumentCode}>
                        <div className={pop.form_title_section}>
                            <div className={pop.form_title}> {detail?.onLeaveTitle} {detail?.overworkTitle} {detail?.softwareTitle} {detail?.workTypeTitle} </div>
                        </div>
                        <div className={pop.form_table} style={{ display: 'table' }}>
                            <div style={{ display: 'table-row' }}>
                                <div className ={pop.A} style={{ display: 'table-cell' }}>제목</div>
                                <div className ={pop.B} style={{ display: 'table-cell' }}> </div>
                            </div>

                            <div style={{ display: 'table-row' }}>
                                <div className ={pop.A} style={{ display: 'table-cell' }}>휴가 종류</div>
                                <div className ={pop.B} style={{ display: 'table-cell' }}> </div>
                            </div>

                            <div style={{ display: 'table-row' }}>
                                <div className ={pop.A} style={{ display: 'table-cell' }}>휴가 기간</div>
                                <div className ={pop.B} style={{ display: 'table-cell' }}> </div>
                            </div>

                            <div style={{ display: 'table-row' }}>
                                <div className ={pop.A} style={{ display: 'table-cell' }}>휴가 사유</div>
                                <div className ={pop.B} style={{ display: 'table-cell' }}>  </div>
                            </div>
                        </div>
                    </div>

                </section>

    
    </>


    )
}

export default PopDocument
    

