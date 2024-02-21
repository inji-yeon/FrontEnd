function OvertimeForm(){

    return(
        <>
            <section className="form_section">
        <div className="form_body">
            <div className="form_title_section">
                <div className="form_title">연장근로 신청서</div>
            </div>
            <div className="form_table" style={{ display: 'table' }}>
            <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>제목</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input className="input_box" type="text"/>
                    </div>
                </div>

                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>구분</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <select id="type">
                            <option value="">선택</option>
                            <option value="overtime_day">연장근로</option>
                            <option value="overtime_holiday">휴일근로</option>
                          </select>
      
                    </div>
                </div>

                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>근무 일자</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input type="date" id="working_date"  className="inputbox"/>
                    </div>
                </div>

                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>근무 시간</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input type="time" id="start_time"  className="inputbox"/>
                        <span className="datelength">~</span>
                        <input type="time" id="end_time"  className="inputbox"/>
                        <span className="dateTotal">, 총</span>
                        <input className="total_overtime" type="text"/>
                        <span className="date_unit">일</span>
                    </div>
                </div>

                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>업무 내용</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input className="input_box" type="text"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    );
}

export default OvertimeForm;