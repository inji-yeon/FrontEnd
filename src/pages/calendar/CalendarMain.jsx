import Calendar from '@toast-ui/react-calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'

import styles from './CalendarMain.module.css'
import { useEffect, useRef, useState } from 'react'
import moment from 'moment/moment'
import CalendarSearchPage from './CalendarSearchPage'

const formattedDateCalendar = (calendarTypeValue, calendar) => {
    const now = calendar?.getDate()
    const min = calendar?.getDateRangeStart()
    const max = calendar?.getDateRangeEnd()
    console.log(min, now, max)
    if (calendarTypeValue === 'month') {
        return `${now?.getFullYear()}년 ${now?.getMonth() + 1}월`
    } else if (calendarTypeValue === 'week') {
        return `${min?.getFullYear()}년 ${min?.getMonth() + 1
            }월 ${min?.getDate()}일 ~ ${max?.getFullYear()}년 ${max?.getMonth() + 1
            }월 ${max?.getDate()}일`
    } else if (calendarTypeValue === 'day') {
        return `${now?.getFullYear()}년 ${now?.getMonth() + 1
            }월 ${now?.getDate()}일`
    }
}

function CalendarMain({ calendarData, setCalendarData }) {
    const calendarRef = useRef();
    const [calendar, setCalendar] = useState(null);
    const [rootElement, setRootElement] = useState(null);
    const [calendarTypeValue, setCalendarTypaValue] = useState('month');
    const [viewDate, setViewDate] = useState(null);

    const [calendarTheme, setCalendarTheme] = useState(null);
    const [employeeList, setEmployeeList] = useState([]);
    const [eventList, setEventList] = useState(null);
    const [message, setMessage] = useState(null);
    const [searchEventList, setSearchEventList] = useState([]);
    const [tempDeletedEventList, setTempDeletedEventList] = useState([]);

    const [clickedData, setClickedData] = useState({ state: false });
    const [selectedData, setSelectedData] = useState({ state: false });
    const [movedData, setMovedData] = useState({ state: false });


    const calendarTypeChangeHandler = e => {
        setCalendarTypaValue(e.target.value)
        e.target.value === 'list'
            ? (rootElement.style.display = 'none')
            : (rootElement.style.display = 'block')
    }

    const todayHandler = () => {
        console.log('오늘로 이동한다.')
        calendar.today()
        setViewDate(formattedDateCalendar(calendarTypeValue, calendar))
    }
    const prevHandler = () => {
        console.log('이전으로 이동한다.')
        calendar.prev()
        setViewDate(formattedDateCalendar(calendarTypeValue, calendar))
    }
    const nextHandler = () => {
        console.log('이후로 이동한다.')
        calendar.next()
        setViewDate(formattedDateCalendar(calendarTypeValue, calendar))
    }

    useEffect(() => {
        setCalendar(calendarRef.current.getInstance());
        setRootElement(calendarRef.current.getRootElement());

    }, [])

    useEffect(() => {
        // 이벤트를 누를 경우 다른 창이 다 꺼지고 이벤트 정보가 나와야 한다.
        calendar?.on("clickEvent", ({ event, nativeEvent }) => {
            setClickedData({ state: true, event, nativeEvent })
            setSelectedData({ state: false })
            setMovedData({ state: false })
            console.log('클릭한 이벤트:', event);
            console.log('실제 마우스 이벤트', nativeEvent);
        })
        // 빈 날짜를 누를 경우 다른 창이 다 꺼지고 이벤트 생성이 나와야 한다.
        calendar?.on("selectDateTime", ({ start, end, isAllday, nativeEvent, gridSelectionElements }) => {
            setClickedData({ state: false })
            setSelectedData({ state: true, start, end, isAllday, nativeEvent, gridSelectionElements })
            setMovedData({ state: false })
            console.log('시작 위치:', start);
            console.log('끝 위치:', end);
            console.log('하루종일 부분인지:', isAllday);
            console.log('마우스 뗸 경우에 발생하는 네이티브 이벤트:', nativeEvent);
            console.log('선택 영역에 해당하는 엘리먼트 목록:', gridSelectionElements);
            calendar.clearGridSelections(); // 임시. 나중에 처리해야 한다.
        })

        // 기존에 있던 이벤트 정보와 이후에 있던 이벤트 정보를 비교하여 적절한 행위를 한다.
        calendar?.on("beforeUpdateEvent", ({ event, changes }) => {
            setClickedData({ state: false })
            setSelectedData({ state: false })
            setMovedData({ state: true, event, changes })
            // 여기서 update query 전송
        })
    }, [calendar])

    useEffect(() => {
        if (movedData.state) {
            console.log(movedData);
            const { event, changes } = movedData;
            console.log('업데이트 전:', event);
            console.log('업데이트 후:', changes);
            calendar.updateEvent(event.id, event.calendarId, changes);
            // 여기서 dispatch가 발생함.
            setMovedData({ state: false });
        }
    }, [movedData, calendar])


    useEffect(() => {
        setViewDate(formattedDateCalendar(calendarTypeValue, calendar))
        calendar?.setOptions({
            template: {
                // allday(event) {
                //     return `<span style="background-color: ${event.backgroundColor};"> ${event.title}</span>`;
                // }
            }
        })
    }, [calendarTypeValue, calendar])

    useEffect(() => {
        console.log('rootElement', rootElement)
    }, [rootElement])
    useEffect(() => {
        calendarData && console.log('calendarData', calendarData)
    }, [calendarData, calendar])
    useEffect(() => {
        const calendarInfo = calendarData?.calendar;
        console.log(calendarInfo);
        calendarInfo && setCalendarTheme([{
            id: calendarInfo.calendarCode.toString(),
            name: calendarInfo.calendarName,
            color: calendarInfo.calendarColor,
            backgroundColor: calendarInfo.calendarBackgroundColor,
            dragBackgroundColor: calendarInfo.calendarDragBackgroundColor,
            borderColor: calendarInfo.calendarBorderColor
        }])
        console.log('calendarData?.calendar', calendarData?.calendar);
    }, [calendarData?.calendar])
    useEffect(() => {
        setEmployeeList(calendarData?.employeeList)
    }, [calendarData?.employeeList])
    useEffect(() => {
        setEventList(calendarData?.eventList?.map(e => {
            const event = e.event
            console.log('event', event);
            const attendeeList = e.eventAttendeeList
            console.log('attendeeList', attendeeList);
            return {
                id: event.eventCode.toString(),
                calendarId: event.calendarCode.toString(),
                title: event.eventTitle,
                body: event.eventContent,
                isAllday: event.eventIsAllDay === 'Y' ? true : false,
                start: event.eventStartDate,
                end: event.eventEndDate,
                location: event.eventLocation,
                attendees: event.eventAttendeeList?.map(
                    attendee => attendee.employee.employeeName
                ),
                category: event.eventIsAllDay === 'Y' ? 'allday' : 'time',
                recurrenceRule: event.eventRecurrenceRule,
                isVisible: event.eventDeleteStatus === 'N' ? true : false,
                isReadOnly: event.eventEditable === 'N' ? true : false,
                color: event.eventColor,
                backgroundColor: event.eventBackgroundColor,
                dragBackgroundColor: event.eventDragBackgroundColor,
                borderColor: event.eventBorderColor,
                raw: {
                    departmentName: event.departmentName,
                    eventAttendeeCount: event.eventAttendeeCount,
                    eventAttendeeList: attendeeList,
                    eventDeleteTime: event.eventDeleteTime,
                    eventDeleteStatus: event.eventDeleteStatus
                },
            }
        }))
    }, [calendarData?.eventList])
    useEffect(() => {
        setMessage(calendarData?.message)
    }, [calendarData?.message])
    useEffect(() => {
        setSearchEventList(calendarData?.searchEventList)
    }, [calendarData?.searchEventList])
    useEffect(() => {
        setTempDeletedEventList(calendar?.tempDeletedEventList)
    }, [calendar?.tempDeletedEventList])

    return (
        <>
            <div className={styles.calendar_section}>
                <div className={styles.calendar_header}>
                    <div>
                        <button onClick={todayHandler}>오늘</button>
                        <button onClick={prevHandler}>&lt;</button>
                        <button onClick={nextHandler}>&gt;</button>
                        <span>{viewDate}</span>
                    </div>
                    <div>
                        <button>쓰레기통</button>
                        <button>검색버튼</button>
                        <select
                            value={calendarTypeValue}
                            onChange={calendarTypeChangeHandler}
                        >
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
                        calendars={calendarRef.current && calendarTheme}
                        events={eventList}
                        usageStatistics={false}
                    />
                    {calendarTypeValue === 'list' && (
                        <CalendarSearchPage
                            events={eventList}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
export default CalendarMain
