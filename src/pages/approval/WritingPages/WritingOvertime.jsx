import React, { useEffect, useRef, useState } from 'react';
import './WritingOvertime.css';
import { useSelector, useDispatch } from 'react-redux';
import { callLoggedinUserAPI, callSubmitOverworkAPI } from '../../../apis/ApprovalAPICalls';
import { useNavigate, useLocation } from 'react-router-dom';

function WritingOvertime(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [clickType, setClickType] = useState("") 

    const [form, setForm] = useState({
        overworkTitle: '',
        kindOfOverwork: '',
        overworkDate: '',
        overworkStartTime: '',
        overworkEndTime: '',
        overworkReason: '',
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    useEffect(()=>{
        console.log('실제로 값이 변하는지', form);
    },[form]);

    const onClickSubmitHandler = () => {
        console.log('[Approval] onClickSubmitHandler');

        const formData = new FormData();

        formData.append("overworkTitle", form.overworkTitle);
        formData.append("kindOfOverwork", form.kindOfOverwork);
        formData.append("overworkDate", form.overworkDate);
        formData.append("overworkStartTime", form.overworkStartTime);
        formData.append("overworkEndTime",form.overworkEndTime);
        formData.append("overworkReason", form.overworkReason);

        dispatch(callSubmitOverworkAPI({
            form: formData
        }));

        console.log(form, '기안 올린 내용');
        
        alert('결재 기안이 완료되었습니다.');
    }


    return(
        <>
            <div className="writing_button_and_content">
                <div className="writing_section">
                    <div className="aproval_save_button">
                        <span className="saving_text">임시 저장</span>
                    </div>
                    <div className="approval_submit_button" onClick={onClickSubmitHandler}>
                        <span className="submitting_text">결재 상신</span>
                    </div>
            </div>
            <section className="form_writing_section">
        <div className="form_body">
            <div className="form_title_section">
                <div className="form_title">연장근로 신청서</div>
            </div>
            <div className="form_table" style={{ display: 'table' }}>
            <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>제목</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input className="input_box" type="text" name="overworkTitle" value={form.overworkTitle} onChange={onChangeHandler}/>
                    </div>
                </div>

                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>구분</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <select id="type" name="kindOfOverwork" value={form.kindOfOverwork} onChange={onChangeHandler}>
                            <option value="">선택</option>
                            <option value="overtime_day">연장근로</option>
                            <option value="overtime_holiday">휴일근로</option>
                          </select>
      
                    </div>
                </div>

                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>근무 일자</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input type="date" id="ov_working_date"  className="inputbox" name="overworkDate" value={form.overworkDate} onChange={onChangeHandler}/>
                    </div>
                </div>

                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>근무 시간</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input type="time" id="ov_start_time"  className="inputbox" name="overworkStartTime" value={form.overworkStartTime} onChange={onChangeHandler}/>
                        <span className="datelength">~</span>
                        <input type="time" id="ov_end_time"  className="inputbox" name="overworkEndTime" value={form.overworkEndTime} onChange={onChangeHandler}/>
                        <span className="ov_dateTotal">, 총</span>
                        <input className="total_overtime" type="text"/>
                        <span className="date_unit">일</span>
                    </div>
                </div>

                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>업무 내용</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input className="input_box" type="text" name="overworkReason" value={form.overworkReason} onChange={onChangeHandler}/>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </div>
        </>
    );
}

export default WritingOvertime;