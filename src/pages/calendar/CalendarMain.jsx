import Calendar from '@toast-ui/react-calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'

import styles from './CalendarMain.module.css'
import { useEffect, useRef, useState } from 'react'
import CalendarListPage from './CalendarListPage'
import EventWindow from './EventWindow'
import { useDispatch, useSelector } from 'react-redux'
import { callGetCalendarAPI, callGetEventListAPI, callModifyEventAboutDateAPI } from '../../apis/CalendarAPICalls'
import { calendarEventDataSet } from '../../utils/calendarUtils'
import { DELETE_EVENT, GET_EVENTS, POST_EVENT, PUT_EVENT, PUT_EVENT_ABOUT_TIME, PUT_TEMP_DELETED_EVENT, RESET_MESSAGE } from '../../modules/CalendarModule'

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

    useEffect(() => {
        console.log(checkboxes, 'checkboxes');
    }, [checkboxes])

    const [eventWindow, setEventWindow] = useState({ state: null }) // 이벤트 정보 보여주는 부분(자식 컴포넌트로 넘긴다.)
    // 이벤트 정보 보여주는 창
    // 이벤트 수정 보여주는 창(정보창에서 수정 누를 경우)
    // 이벤트 삭제 보여주는 창(정보창에서 삭제 누를 경우)
    // 정보값과 함께 넘긴다.

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
        // 이벤트를 누를 경우 다른 창이 다 꺼지고 이벤트 정보가 나와야 한다.
        calendar?.on('clickEvent', ({ event, nativeEvent }) => {
            setClickedData({ state: true, event, nativeEvent })
            setSelectedData({ state: false })
            setMovedData({ state: false })
        })

        // 빈 날짜를 누를 경우 다른 창이 다 꺼지고 이벤트 생성이 나와야 한다.
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

        // 기존에 있던 이벤트 정보와 이후에 있던 이벤트 정보를 비교하여 적절한 행위를 한다.
        calendar?.on('beforeUpdateEvent', ({ event, changes }) => {
            setClickedData({ state: false })
            setSelectedData({ state: false })
            setMovedData({ state: true, event, changes })
        })

        // 캘린더 관련해서 옵션을 넣는 부분.
        calendar?.setOptions({
            template: {}
        })
    }, [calendar])

    // 이벤트 클릭할 경우 발생하는 useEffect
    useEffect(() => {
        if (clickedData.state) {
            console.log('이벤트 클릭함!', clickedData)
            const { event, nativeEvent } = clickedData
            setEventWindow({ state: 'clicked', event, nativeEvent }) // 이벤트 정보 보여주는 창
            setClickedData({ state: false })
        }
    }, [clickedData])

    // 날짜(들)을 선택할 경우 발생하는 useEffect
    useEffect(() => {
        if (selectedData.state) {
            console.log('날짜(들)을 선택함!', selectedData)
            const { start, end, isAllday, nativeEvent } = selectedData
            setEventWindow({ state: 'created', start, end, isAllday, nativeEvent }) // 이벤트 생성 창
            calendar.clearGridSelections();
            setSelectedData({ state: false })
        }
    }, [selectedData])

    // 일정을 이동(변화)할 경우 발생하는 useEffect
    useEffect(() => {
        if (movedData.state) {
            console.log('일정을 이동(변화)함!', movedData)
            const { event, changes } = movedData
            console.log('event>>>', event);
            console.log('changes>>>', changes);
            /*
                두가지 경우의 수
                1. 일정 자체를 옮길 경우 -> start, end 둘다 존재
                2. 일정을 늘리거나 줄일 경우 -> end만 존재함
            */
            changes['start'] = changes?.start ?? null;
            const eventOptionsAboutDate = {
                eventCode: event?.id,
                calendarCode: event?.calendarId,
                isAllday: event?.isAllday ? 'Y' : 'N',
                startDate: changes?.start?.toDate(),
                endDate: changes?.end?.toDate(),
            }
            dispatch(callModifyEventAboutDateAPI({ eventOptionsAboutDate }))// 여기서 dispatch가 발생함.
        }
    }, [movedData])

    // 날짜 출력 관련 useEffect
    useEffect(() => {
        setViewDate(formattedDateCalendar(calendarTypeValue, calendar))
    }, [calendarTypeValue, calendar])

    // Element 그 자체에 대한 useEffect
    useEffect(() => {
        if (rootElement) {
            console.log('rootelement', rootElement);
            const style = rootElement?.style;
            style.display = 'block'
            style.width = "100%"
            style.padding = "0"
            style.border = "1px solid #606060"
        }
    }, [rootElement])

    // 캘린더 인스턴스와 API로 받은 캘린더 정보 관련 useEffect
    useEffect(() => {
        // console.log('calendarData', calendarData);
    }, [calendarData, calendar])

    // API로 받은 캘린더 정보 관련중 캘린더 정보
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

    // 일정 목록. 이 데이터는 처음에만 읽어온다. 나머지는 react 추가와 db 추가를 따로 한다. 또한, 여기서 필터링 작업도 직접 한다. 일단 계정 관련 일정 다 가져옴
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

    // backend 관련해서 성공여부를 여기로 전달 받는다.


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
                console.log('변경된 이벤트', calendar.getEvent(event?.eventCode.toString(), event?.calendarCode.toString()));
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
                console.log('생성된 이벤트', calendar.getEvent(event?.eventCode.toString(), event?.calendarCode.toString()));
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
                console.log('이벤트 정보>>>', calendar.getEvent(event?.id, event?.calendarId));
                setMovedData({ state: false })
            } else if (calendarData?.message === DELETE_EVENT) {
                const { eventCode, calendarCode, state } = calendarData?.returnData;
                if (state === 'tempDelete') { // 임시 삭제 성공
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
                    console.log('e', eventList);
                    console.log('m', modifyEventList);
                    setEventList(modifyEventList);
                } else { // 완전 삭제 성공
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
            setCheckboxes(prev => (prev.map(checkbox => checkbox.name === e.target.name ? { ...checkbox, checked: !checkbox.checked } : checkbox)))
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
                            setEvents={setEventList}
                            searchText={searchText}
                            isTempDeletedPage={isTempDeletedPage}
                            calendar={calendar} />
                    )}
                </div>
            </div>
        </div >
    )
}
export default CalendarMain
