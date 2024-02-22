import './AwayForm.css';

function AwayForm(){

    return(
        <>
            <section className="form_section">
        <div className="form_body">
            <div className="form_title_section">
                <div className="form_title">외근 신청서</div>
            </div>
            <div className="form_table" style={{ display: 'table' }}>
                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>제목</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input className="input_box" type="text"/>
                    </div>
                </div>

                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>신청 날짜</div>
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
                    <div className ="A" style={{ display: 'table-cell' }}>장소</div>
                    <div className ="B" style={{ display: 'table-cell' }}>
                        <input class="input_box" type="text"/>
                    </div>
                </div>

                <div style={{ display: 'table-row' }}>
                    <div className ="A" style={{ display: 'table-cell' }}>신청 사유</div>
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

export default AwayForm;