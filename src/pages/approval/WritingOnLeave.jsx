import React, { useEffect, useRef, useState } from 'react';
import './WritingOnLeave.css';
import CurrentTime from './Time';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callLoggedinUserAPI } from '../../apis/ApprovalAPICalls';

function WritingOnLeave(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentTimeString = CurrentTime();
    const [clikType, setClickType] = useState("");
    const [image, SetImage] = useState(null);
    const imangeInput = useRef();

    function getDaysDifference(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const difference = end - start; // 밀리초 단위의 차이
        const days = difference / (1000 * 60 * 60 * 24); // 일수로 변환
        return Math.round(days); // 소수점 아래를 반올림하여 반환
      }

    const [form, setForm] = useState({
        OLTitle: '',
        OLStart: '',
        OLEnd: '',
        OLReason: '',
        file: '',
    });

        // 로그인한 정보 불러옴
        useEffect(() => {
            dispatch(callLoggedinUserAPI());
          }, [dispatch]);

    return(
        <>
            <div className="writing_button_and_content">
                <div className="writing_section">
                    <div className="aproval_save_button">
                        <span className="saving_text">임시 저장</span>
                    </div>
                    <div className="approval_submit_button">
                        <span className="submitting_text">결재 상신</span>
                    </div>
            </div>

            <div className="form_writing_section">
            <div className="form_body">
            <div className="form_title_section">
                <div className="form_title">휴가 신청서</div>
            </div>
            <div className="form_table" style={{ display: 'table' }}>
                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>제목</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input className="input_box" type="text"/>
                    </div>
                </div>
                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>잔여 휴가</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input className="input_box" type="text"/>
                    </div>
                </div>
                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>휴가 종류</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <select id="type">
                            <option value="">선택</option>
                            <option value="annual_leave">연차</option>
                            <option value="half_leave">반차</option>
                            <option value="given_leave">포상 휴가</option>
                            <option value="celebration_leave">경조 휴가</option>
                            <option value="ect_leave">기타 휴가</option>
                        </select>
        
                    </div>
                </div>
                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>휴가 기간</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input type="date" id="start_date"  class="inputbox"/>
                        <span className="datelength">~</span>
                        <input type="date" id="end_date"  class="inputbox"/>
                        <span className="dateTotal">, 총</span>
                        <input className="total_day" type="text"/>
                        <span className="date_unit">일</span>
                    </div>
                </div>
                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>휴가 사유</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input class="input_box" type="text"/>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </div>
        </>
    );
}

export default WritingOnLeave;