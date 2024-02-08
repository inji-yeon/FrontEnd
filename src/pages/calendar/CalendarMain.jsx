import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import styles from './CalendarMain.module.css';
import { useEffect, useRef, useState } from 'react';

function CalendarMain({ calendarData, setCalendarData }) {
    const calendarRef = useRef();
    const [calendar, setCalendar] = useState(null);
    const [calendarTypeValue, setCalendarTypaValue] = useState('month');


    useEffect(() => {
        setCalendar(calendarRef.current.getInstance());
    }, [])

    useEffect(() => {
        calendar && console.log(calendar);
    }, [calendar]);

    const calendarTypeChangeHandler = (e) => {
        setCalendarTypaValue(e.target.value);
    }
    useEffect(() => {
        console.log(calendarTypeValue);
    }, [calendarTypeValue])

    return (
        <>
            <div className={styles.calendar_section}>
                <div className={styles.calendar_header}>
                    <div>
                        <button>
                            오늘
                        </button>
                        <button>
                            &lt;
                        </button>
                        <button>
                            &gt;
                        </button>
                        <span>
                            날짜부분
                        </span>
                    </div>
                    <div>
                        <button>
                            쓰레기통
                        </button>
                        <button>
                            검색버튼
                        </button>
                        <select value={calendarTypeValue} onChange={calendarTypeChangeHandler}>
                            <option value='month'>월</option>
                            <option value='week'>주</option>
                            <option value='day'>일</option>
                            <option value='list'>목록</option>
                        </select>
                    </div>
                </div>
                <div className={styles.calendar_body}>
                    <Calendar
                        ref={calendarRef}
                        view={calendarTypeValue}
                    />
                </div>
            </div>
        </>
    )
}
export default CalendarMain
