import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import styles from './CalendarMain.module.css';
import { useEffect, useRef, useState } from 'react';
// import moment from 'moment/moment';

const formattedDateCalendar = (calendarTypeValue, calendar) => {
    const now = calendar?.getDate();
    const min = calendar?.getDateRangeStart();
    const max = calendar?.getDateRangeEnd();
    if (calendarTypeValue === 'month') {
        return `${now?.getFullYear()}년 ${now?.getMonth() + 1}월`;
    } else if (calendarTypeValue === 'week') {
        return `${min?.getFullYear()}년 ${min?.getMonth() + 1}월 ${min?.getDate()}일 ~ ${max?.getFullYear()}년 ${max?.getMonth() + 1}월 ${max?.getDate()}일`;
    } else if (calendarTypeValue === 'day') {
        return `${now?.getFullYear()}년 ${now?.getMonth() + 1}월 ${now?.getDate()}일`;
    }
}


function CalendarMain({ calendarData, setCalendarData }) {
    const calendarRef = useRef();
    const [calendar, setCalendar] = useState(null);
    const [calendarTypeValue, setCalendarTypaValue] = useState('month');
    const [viewDate, setViewDate] = useState(null);

    const calendarTypeChangeHandler = (e) => {
        setCalendarTypaValue(e.target.value);
    }

    const todayHandler = () => {
        console.log('오늘로 이동한다.');
        calendar.today();
        setViewDate(formattedDateCalendar(calendarTypeValue, calendar));
    }
    const prevHandler = () => {
        console.log('이전으로 이동한다.');
        calendar.prev();
        setViewDate(formattedDateCalendar(calendarTypeValue, calendar));
    }
    const nextHandler = () => {
        console.log('이후로 이동한다.');
        calendar.next();
        setViewDate(formattedDateCalendar(calendarTypeValue, calendar));
    }

    useEffect(() => {
        setCalendar(calendarRef.current.getInstance());
    }, [])

    useEffect(() => {
        setViewDate(formattedDateCalendar(calendarTypeValue, calendar));
    }, [calendarTypeValue, calendar])

    return (
        <>
            <div className={styles.calendar_section}>
                <div className={styles.calendar_header}>
                    <div>
                        <button onClick={todayHandler}>
                            오늘
                        </button>
                        <button onClick={prevHandler}>
                            &lt;
                        </button>
                        <button onClick={nextHandler}>
                            &gt;
                        </button>
                        <span>
                            {viewDate}
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
