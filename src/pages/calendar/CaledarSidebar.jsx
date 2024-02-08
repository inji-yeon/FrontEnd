import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetCalendarAPI, callGetEventListAPI } from "../../apis/CalendarAPICalls";
import { Outlet } from "react-router-dom";
import styles from "./CaledarSidebar.module.css";
import CalendarMain from "./CalendarMain";

function CaledarSidebar() {
    const dispatch = useDispatch();
    const [calendarData, setCalendarData] = useState(useSelector((state) => state.calendar));

    useEffect(() => {
        dispatch(callGetCalendarAPI());
        dispatch(callGetEventListAPI());
    }, [])

    return (
        <>
            {/* <div className={styles.sidemenu2}>
                <div className={styles.sidemenu2_title}>
                    캘린더
                </div>
            </div> */}
            <CalendarMain calendarData={calendarData} setCalendarData={setCalendarData} />
        </>
    )
}

export default CaledarSidebar;