import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetCalendarAPI, callGetEventListAPI } from "../../apis/CalendarAPICalls";

function CalendarMain() {
    const dispatch = useDispatch();
    const calendar = useSelector((state) => state.calendar);

    useEffect(() => {
        dispatch(callGetCalendarAPI());
        dispatch(callGetEventListAPI());
    }, [])

    useEffect(() => {
        console.log('[Calendar.jsx] => Calendar :', calendar);
    }, [calendar]);

    return (
        <>
            {/* 이 곳은 캘린더 페이지 입니다. */}
            <div>캘린더 페이지</div>
        </>
    )
}

export default CalendarMain;