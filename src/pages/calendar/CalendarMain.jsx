import Calendar from '@toast-ui/react-calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'

import styles from './calendarMain.module.css'
import { useEffect, useRef, useState } from 'react'
import CalendarListPage from './CalendarListPage'
import EventWindow from './EventWindow'
import { useDispatch, useSelector } from 'react-redux'
import { callGetCalendarAPI, callGetEventListAPI, callModifyEventAboutDateAPI } from '../../apis/CalendarAPICalls'
import { CALENDAR_ERROR, DELETE_EVENT, POST_EVENT, PUT_EVENT, PUT_EVENT_ABOUT_TIME, PUT_TEMP_DELETED_EVENT } from '../../modules/CalendarModule'
import { useNavigate } from 'react-router-dom'

const formattedDateCalendar = (calendarTypeValue, calendar) => {
    const now = calendar?.getDate()
    const min = calendar?.getDateRangeStart()
    const max = calendar?.getDateRangeEnd()
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

function CalendarMain() {
    const calendarData = useSelector((state) => state.calendar);
    const navigate = useNavigate()

    const selectRef = useRef();
    const dispatch = useDispatch();
    const calendarRef = useRef()
    const [calendar, setCalendar] = useState(null)
    const [rootElement, setRootElement] = useState(null)
    const [calendarTypeValue, setCalendarTypeValue] = useState('month')
    const [viewDate, setViewDate] = useState(null)

    const [calendarTheme, setCalendarTheme] = useState(null)
    const [eventList, setEventList] = useState(null)

    const [clickedData, setClickedData] = useState({ state: false })
    const [selectedData, setSelectedData] = useState({ state: false })
    const [movedData, setMovedData] = useState({ state: false })

    const [isSearch, setIsSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isTempDeletedPage, setIsTempDeletedPage] = useState(false);

    const weekOptions = { taskView: false }

    const [checkboxes, setCheckboxes] = useState([
        { name: 'all', checked: true },
        { name: 'meeting', checked: true },
        { name: 'personal', checked: true },
        { name: 'important', checked: true },
        { name: 'vacation', checked: true },
        { name: 'birthday', checked: true },
        { name: 'todo', checked: true },
        { name: 'other', checked: true },
    ])

    const [eventWindow, setEventWindow] = useState({ state: null })

    const calendarTypeChangeHandler = e => {
        setCalendarTypeValue(e.target.value)
        setIsSearch(false)
        e.target.value === 'list'
            ? (rootElement.style.display = 'none')
            : (rootElement.style.display = 'block')
    }

    const todayHandler = () => {
        calendar.today()
        setViewDate(formattedDateCalendar(calendarTypeValue, calendar))
    }
    const prevHandler = () => {
        calendar.prev()
        setViewDate(formattedDateCalendar(calendarTypeValue, calendar))
    }
    const nextHandler = () => {
        calendar.next()
        setViewDate(formattedDateCalendar(calendarTypeValue, calendar))
    }

    useEffect(() => {
        dispatch(callGetCalendarAPI());
        setCalendar(calendarRef.current.getInstance())
        setRootElement(calendarRef.current.getRootElement())
    }, [])

    useEffect(() => {
        if (calendarData?.error) {
            alert('오류가 발생했습니다. 로그인 페이지로 돌아갑니다.');
            console.error('error Message: ', calendarData?.message);
            navigate('/login');
            dispatch({ type: CALENDAR_ERROR, payload: '' });
        }
    }, [calendarData?.error])

    useEffect(() => {
        calendar?.on('clickEvent', ({ event, nativeEvent }) => {
            setClickedData({ state: true, event, nativeEvent })
            setSelectedData({ state: false })
            setMovedData({ state: false })
        })

        calendar?.on(
            'selectDateTime',
            ({ start, end, isAllday, nativeEvent, gridSelectionElements }) => {
                setClickedData({ state: false })
                setSelectedData({
                    state: true,
                    start,
                    end,
                    isAllday,
                    nativeEvent,
                    gridSelectionElements
                })
                setMovedData({ state: false })
            }
        )

        calendar?.on('beforeUpdateEvent', ({ event, changes }) => {
            setClickedData({ state: false })
            setSelectedData({ state: false })
            setMovedData({ state: true, event, changes })
        })

        calendar?.setOptions({
            template: {}
        })
    }, [calendar])

    useEffect(() => {
        if (clickedData.state) {
            const { event, nativeEvent } = clickedData
            setEventWindow({ state: 'clicked', event, nativeEvent })
            setClickedData({ state: false })
        }
    }, [clickedData])

    useEffect(() => {
        if (selectedData.state) {
            const { start, end, isAllday, nativeEvent } = selectedData
            setEventWindow({ state: 'created', start, end, isAllday, nativeEvent })
            calendar.clearGridSelections();
            setSelectedData({ state: false })
        }
    }, [selectedData])

    useEffect(() => {
        if (movedData.state) {
            const { event, changes } = movedData
            changes['start'] = changes?.start ?? null;
            const eventOptionsAboutDate = {
                eventCode: event?.id,
                calendarCode: event?.calendarId,
                isAllday: event?.isAllday ? 'Y' : 'N',
                startDate: changes?.start?.toDate(),
                endDate: changes?.end?.toDate(),
            }
            dispatch(callModifyEventAboutDateAPI({ eventOptionsAboutDate }))
        }
    }, [movedData])

    useEffect(() => {
        setViewDate(formattedDateCalendar(calendarTypeValue, calendar))
    }, [calendarTypeValue, calendar])

    useEffect(() => {
        if (rootElement) {
            const style = rootElement?.style;
            style.display = 'block'
            style.width = "100%"
            style.padding = "0"
            style.border = "1px solid #606060"
        }
    }, [rootElement])

    useEffect(() => {
        const calendarInfo = calendarData?.calendar
        calendarInfo &&
            setCalendarTheme([
                {
                    id: calendarInfo.calendarCode.toString(),
                    name: calendarInfo.calendarName,
                    color: calendarInfo.calendarColor,
                    backgroundColor: calendarInfo.calendarBackgroundColor,
                    dragBackgroundColor: calendarInfo.calendarDragBackgroundColor,
                    borderColor: calendarInfo.calendarBorderColor
                }
            ])
    }, [calendarData?.calendar])

    useEffect(() => {
        setEventList(
            calendarData?.eventList?.map(event => {
                return {
                    id: event?.eventCode?.toString(),
                    calendarId: event?.calendarCode?.toString(),
                    title: event?.eventTitle,
                    body: event?.eventContent,
                    start: new Date(event?.eventStartDate),
                    end: new Date(event?.eventEndDate),
                    location: event?.eventLocation,
                    category: event?.eventIsAllDay === 'Y' ? 'allday' : 'time',
                    isReadOnly: event?.eventEditable === 'N' ? true : false,
                    color: event?.eventColor,
                    backgroundColor: event?.eventBackgroundColor,
                    dragBackgroundColor: event?.eventDragBackgroundColor,
                    borderColor: event?.eventBorderColor,
                    raw: {
                        eventDeleteTime: event?.eventDeleteTime,
                        eventDeleteStatus: event?.eventDeleteStatus,
                        eventCategory: event?.eventCategory
                    }
                }
            })
        )
    }, [calendarData?.eventList])

    useEffect(() => {
        if (calendarData?.message) {
            if (calendarData?.message === PUT_EVENT) {
                const event = calendarData?.returnData;
                calendar.updateEvent(event?.eventCode.toString(), event?.calendarCode.toString(), {
                    title: event?.eventTitle,
                    body: event?.eventContent,
                    start: new Date(event?.eventStartDate),
                    end: new Date(event?.eventEndDate),
                    location: event?.eventLocation,
                    isAllday: event?.eventIsAllDay === 'Y' ? true : false,
                    category: event?.eventIsAllDay === 'Y' ? 'allday' : 'time',
                    isReadOnly: event?.eventEditable === 'N' ? true : false,
                    color: event?.eventColor,
                    backgroundColor: event?.eventBackgroundColor,
                    dragBackgroundColor: event?.eventDragBackgroundColor,
                    borderColor: event?.eventBorderColor,
                    raw: {
                        eventDeleteTime: event?.eventDeleteTime,
                        eventDeleteStatus: event?.eventDeleteStatus,
                        eventCategory: event?.eventCategory
                    }
                })
            } else if (calendarData?.message === POST_EVENT) {
                const event = calendarData?.returnData
                calendar.createEvents([{
                    id: event?.eventCode.toString(),
                    calendarId: event?.calendarCode.toString(),
                    title: event?.eventTitle,
                    body: event?.eventContent,
                    start: new Date(event?.eventStartDate),
                    end: new Date(event?.eventEndDate),
                    location: event?.eventLocation,
                    isAllday: event?.eventIsAllDay === 'Y' ? true : false,
                    category: event?.eventIsAllDay === 'Y' ? 'allday' : 'time',
                    isReadOnly: event?.eventEditable === 'N' ? true : false,
                    color: event?.eventColor,
                    backgroundColor: event?.eventBackgroundColor,
                    dragBackgroundColor: event?.eventDragBackgroundColor,
                    borderColor: event?.eventBorderColor,
                    raw: {
                        eventDeleteTime: event?.eventDeleteTime,
                        eventDeleteStatus: event?.eventDeleteStatus,
                        eventCategory: event?.eventCategory
                    }
                }])
            }
            else if (calendarData?.message === PUT_EVENT_ABOUT_TIME) {
                const { event, changes } = movedData;
                calendar.updateEvent(event?.id, event?.calendarId, {
                    end: changes?.end
                })
                if (changes?.start) {
                    calendar.updateEvent(event?.id, event?.calendarId, {
                        start: changes?.start
                    })
                }
                setMovedData({ state: false })
            } else if (calendarData?.message === DELETE_EVENT) {
                const { eventCode, calendarCode, state } = calendarData?.returnData;
                if (state === 'tempDelete') {
                    calendar.updateEvent(eventCode.toString(), calendarCode.toString(), {
                        raw: {
                            eventDeleteStatus: "T",
                            eventDeleteTime: new Date()
                        }
                    })
                    const modifyEvent = eventList.filter(event => event?.id === eventCode.toString() && event?.calendarId === calendarCode.toString());
                    const modifyEventList = eventList.filter(event => !(event?.id === eventCode.toString() && event?.calendarId === calendarCode.toString()));
                    modifyEvent[0].raw.eventDeleteStatus = "T";
                    modifyEvent[0].raw.eventDeleteTime = new Date();
                    modifyEventList.push(modifyEvent[0]);
                    setEventList(modifyEventList);
                } else {
                    calendar.updateEvent(eventCode.toString(), calendarCode.toString(), {
                        raw: {
                            eventDeleteStatus: "Y",
                            eventDeleteTime: null
                        }
                    })

                    const modifyEvent = eventList.filter(event => event?.id === eventCode.toString() && event?.calendarId === calendarCode.toString());
                    const modifyEventList = eventList.filter(event => !(event?.id === eventCode.toString() && event?.calendarId === calendarCode.toString()));
                    modifyEvent[0].raw.eventDeleteStatus = "Y";
                    modifyEvent[0].raw.eventDeleteTime = null;
                    modifyEventList.push(modifyEvent[0]);
                    setEventList(modifyEventList);
                }
            } else if (calendarData?.message === PUT_TEMP_DELETED_EVENT) {
                const { eventCode, calendarCode } = calendarData?.returnData;
                calendar.updateEvent(eventCode.toString(), calendarCode.toString(), {
                    raw: {
                        eventDeleteStatus: "N",
                        eventDeleteTime: null
                    }
                })
                const modifyEvent = eventList.filter(event => event?.id === eventCode.toString() && event?.calendarId === calendarCode.toString());
                const modifyEventList = eventList.filter(event => !(event?.id === eventCode.toString() && event?.calendarId === calendarCode.toString()));
                modifyEvent[0].raw.eventDeleteStatus = "N";
                modifyEvent[0].raw.eventDeleteTime = null;
                modifyEventList.push(modifyEvent[0]);
                setEventList(modifyEventList);
            }
            dispatch(callGetEventListAPI())
        }
    }, [calendarData?.message])

    const searchHandler = () => {
        if (!isSearch) {
            setIsSearch(true);
            setIsTempDeletedPage(false);
            setEventWindow({ state: null })
            setCalendarTypeValue('list');
            rootElement.style.display = 'none';
        } else {
            setIsSearch(false);
            setCalendarTypeValue('month');
            rootElement.style.display = 'block';
        }
    }
    const searchTextHandler = (e) => {
        setSearchText(e.target.value)
    }
    useEffect(() => {
        !isSearch && setSearchText('');
    }, [isSearch])
    const tempDeletedPageHandler = (e) => {
        if (!isTempDeletedPage) {
            setIsTempDeletedPage(true);
            setIsSearch(false);
            setEventWindow({ state: null })
            setCalendarTypeValue('list');
            rootElement.style.display = 'none';
        } else {
            setIsTempDeletedPage(false);
            setCalendarTypeValue('month');
            rootElement.style.display = 'block';
        }
    }

    const checkboxHandler = (e) => {
        if (e.target.name === 'all') {
            setCheckboxes([
                { name: 'all', checked: e.target.checked },
                { name: 'meeting', checked: e.target.checked },
                { name: 'personal', checked: e.target.checked },
                { name: 'important', checked: e.target.checked },
                { name: 'vacation', checked: e.target.checked },
                { name: 'birthday', checked: e.target.checked },
                { name: 'todo', checked: e.target.checked },
                { name: 'other', checked: e.target.checked },
            ])
        } else {
            setCheckboxes((prev) => {
                const others = checkboxes.filter(checkbox => checkbox.name !== 'all')
                    .map(checkbox => {
                        if (checkbox.name === e.target.name) {
                            return { ...checkbox, checked: !checkbox.checked }
                        } else {
                            return checkbox;
                        }
                    })
                if (others.filter(checkbox => checkbox.checked).length < 7) {
                    return [{ name: 'all', checked: false }, ...others];
                } else {
                    return [{ name: 'all', checked: true }, ...others];
                }
            })
        }
    }

    return (
        <div className={styles.calendar_wrap}>
            <div className={styles.sidemenu2}>
                <div className={styles.sidemenu2_title}>
                    캘린더
                </div>
                <div className={styles.sidemenu2_body}>
                    <div className={`${styles.category} ${styles.all}`}><input type='checkbox' name='all' id='category_all' checked={checkboxes.find(checkbox => checkbox.name === 'all')?.checked ?? true} onChange={checkboxHandler} /><label htmlFor='category_all'>전체</label></div>
                    <div className={`${styles.category} ${styles.meeting}`}><input type='checkbox' name='meeting' id='category_meeting' checked={checkboxes.find(checkbox => checkbox.name === 'meeting')?.checked ?? true} onChange={checkboxHandler} /><label htmlFor='category_meeting'>회의</label></div>
                    <div className={`${styles.category} ${styles.personal}`}><input type='checkbox' name='personal' id='category_personal' checked={checkboxes.find(checkbox => checkbox.name === 'personal')?.checked ?? true} onChange={checkboxHandler} /><label htmlFor='category_personal'>개인 일정</label></div>
                    <div className={`${styles.category} ${styles.important}`}><input type='checkbox' name='important' id='category_important' checked={checkboxes.find(checkbox => checkbox.name === 'important')?.checked ?? true} onChange={checkboxHandler} /><label htmlFor='category_important'>중요한 일정</label></div>
                    <div className={`${styles.category} ${styles.vacation}`}><input type='checkbox' name='vacation' id='category_vacation' checked={checkboxes.find(checkbox => checkbox.name === 'vacation')?.checked ?? true} onChange={checkboxHandler} /><label htmlFor='category_vacation'>휴가</label></div>
                    <div className={`${styles.category} ${styles.birthday}`}><input type='checkbox' name='birthday' id='category_birthday' checked={checkboxes.find(checkbox => checkbox.name === 'birthday')?.checked ?? true} onChange={checkboxHandler} /><label htmlFor='category_birthday'>생일(기념일)</label></div>
                    <div className={`${styles.category} ${styles.todo}`}><input type='checkbox' name='todo' id='category_todo' checked={checkboxes.find(checkbox => checkbox.name === 'todo')?.checked ?? true} onChange={checkboxHandler} /><label htmlFor='category_todo'>할일</label></div>
                    <div className={`${styles.category} ${styles.other}`}><input type='checkbox' name='other' id='category_other' checked={checkboxes.find(checkbox => checkbox.name === 'other')?.checked ?? true} onChange={checkboxHandler} /><label htmlFor='category_other'>기타</label></div>
                </div>
            </div>
            <div className={styles.calendar_section}>
                <div className={styles.calendar_header}>
                    <div className={styles.calender_header_left}>
                        {!(isSearch || isTempDeletedPage)
                            && <>
                                <button onClick={todayHandler}>오늘</button>
                                <button onClick={prevHandler}>&lt;</button>
                                <button onClick={nextHandler}>&gt;</button>
                                <div>{viewDate}</div>
                            </>}
                    </div>
                    <div className={styles.calendar_header_right}>
                        {!isSearch && <button onClick={tempDeletedPageHandler}>{isTempDeletedPage ? '닫기' : '휴지통'}</button>}
                        {isSearch && <input type="text" value={searchText} onChange={searchTextHandler} />}
                        <button onClick={searchHandler}>{isSearch ? '닫기' : '검색'}</button>
                        <select
                            value={calendarTypeValue}
                            onChange={calendarTypeChangeHandler}
                            ref={selectRef}
                        >
                            <option value='month'>월</option>
                            <option value='week'>주</option>
                            <option value='day'>일</option>
                        </select>
                    </div>
                </div>
                <div className={styles.calendar_body}>
                    <Calendar
                        ref={calendarRef}
                        view={calendarTypeValue}
                        height={'780px'}
                        calendars={calendarRef.current && calendarTheme}
                        events={eventList?.filter(
                            event => {
                                return event.raw.eventDeleteStatus === "N"
                                    && checkboxes
                                        ?.filter(checkbox => checkbox.checked === true)
                                        ?.map(checkbox => checkbox.name)
                                        ?.includes(event?.raw?.eventCategory)
                            }
                        )}
                        usageStatistics={false}
                        week={weekOptions}
                    />
                    {eventWindow?.state !== null &&
                        <EventWindow
                            eventWindow={eventWindow}
                            setEventWindow={setEventWindow}
                            calendar={calendar}
                        />
                    }
                    {(isSearch || isTempDeletedPage) && (
                        <CalendarListPage
                            events={eventList}
                            searchText={searchText}
                            isTempDeletedPage={isTempDeletedPage}
                        />
                    )}
                </div>
            </div>
        </div >
    )
}
export default CalendarMain
