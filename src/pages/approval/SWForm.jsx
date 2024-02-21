import './SWForm.css';

function SWForm(){

    return(
        <>
            <section className="sw_form_section">
        <div className="sw_form_body">
            <div className="sw_form_title_section">
                <div className="sw_form_title">소프트웨어 사용 신청서</div>
            </div>
            <div className="sw_form_table" style={{ display: 'table' }}>
                <div className="tableRow">
                    <div className ="swA" style={{ display: 'table-cell' }}>제목</div>
                    <div className ="swB" style={{ display: 'table-cell' }}>
                        <input className="sw_input_box" type="text"/>
                    </div>
                </div>

                <div className="tableRow">
                    <div className ="swA" style={{ display: 'table-cell' }}>프로그램 종류</div>
                    <div className ="swB" style={{ display: 'table-cell' }}>
                        <input className="sw_input_box" type="text"/>
                    </div>
                </div>

                <div className="tableRow">
                    <div className ="swA" style={{ display: 'table-cell' }}>용도</div>
                    <div className ="swB" style={{ display: 'table-cell' }}>
                        <input className="sw_input_box" type="text"/>
                    </div>
                </div>

                <div className="tableRow">
                    <div className ="swA" style={{ display: 'table-cell' }}>시행 일자</div>
                    <div className ="swB" style={{ display: 'table-cell' }}>
                        <input type="date" id="sw_start_date"  className="inputbox"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    );
}

export default SWForm;