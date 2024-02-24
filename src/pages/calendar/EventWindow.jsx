import { useEffect, useRef, useState } from 'react'
import {
    callCreateEventAPI,
    callDeleteEventAPI,
    callModifyEventAPI
} from '../../apis/CalendarAPICalls'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'
import styles from './eventWindow.module.css'
import { calendarEventDataSet } from '../../utils/calendarUtils'

function EventWindow({ eventWindow, setEventWindow, calendar }) {
    /* 
              여기에는 두가지 경우가 들어온다.
              1. 이벤트를 클릭한 경우 (state가 'clicked'이고 event와 nativeEvent가 들어오는)
              2. 날짜(들)을 클릭한 경우 (state가 'selected'이고 start, end, isAllday, nativeEvent가 들어오는)
      
              그런데 여기서 하나더 추가된다.
              3. 이벤트를 클릭한 상태에서
                  수정버튼을 누른경우. 이 경우
                      -1 원래 데이터가 필요함
                      -2 그러면 그냥 state 만 적절하게 바꾸면 될거 같음.
           */
    const dispatch = useDispatch()
    const eventWindowRef = useRef()

    const [form, setForm] = useState(null)
    useEffect(() => {
        console.log('eventWindow>>>', eventWindow)
        if (eventWindow?.state === 'clicked') {
            setForm({
                title: eventWindow.event.title ?? '',
                body: eventWindow.event.body ?? '',
                startDate: format(eventWindow.event.start.getTime(), 'yyyy-MM-dd'),
                startTime: format(eventWindow.event.start.getTime(), 'HH:mm'),
                endDate: format(eventWindow.event.end.getTime(), 'yyyy-MM-dd'),
                endTime: format(eventWindow.event.end.getTime(), 'HH:mm'),
                location: eventWindow.event.location ?? '',
                isAllday: eventWindow.event.isAllday ? 'true' : 'false',
                eventCategory: eventWindow.event.eventCategory ?? 'other'
            })
        } else if (eventWindow?.state === 'created') {
            console.log(eventWindow.isAllday)
            setForm({
                title: '',
                body: '',
                startDate: format(eventWindow.start.getTime(), 'yyyy-MM-dd'),
                startTime: format(eventWindow.start.getTime(), 'HH:mm'),
                endDate: format(eventWindow.end.getTime(), 'yyyy-MM-dd'),
                endTime: format(eventWindow.end.getTime(), 'HH:mm'),
                location: '',
                isAllday: eventWindow.isAllday ? 'true' : 'false',
                eventCategory: 'other'
            })
        }
    }, [eventWindow])

    const formHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const eventModifyHandler = event => {
        console.log('수정버튼 눌렀어!', event)
        setEventWindow({ ...eventWindow, state: 'modify' })
    }

    const eventCreateAcceptHandler = e => {
        const eventOptions = {
            event: {
                eventTitle: form.title,
                eventContent: form.body,
                eventStartDate:
                    form.isAllday === 'true'
                        ? form.startDate
                        : `${form.startDate}T${form.startTime}`,
                eventEndDate:
                    form.isAllday === 'true'
                        ? form.endDate
                        : `${form.endDate}T${form.endTime}`,
                eventLocation: form.location,
                eventIsAllDay: form.isAllday === 'true' ? 'Y' : 'N',
                eventColor: calendarEventDataSet.find(
                    event => event.name === form.eventCategory
                ).color,
                eventBackgroundColor: calendarEventDataSet.find(
                    event => event.name === form.eventCategory
                ).backgroundColor,
                eventDragBackgroundColor: calendarEventDataSet.find(
                    event => event.name === form.eventCategory
                ).dragBackgroundColor,
                eventBorderColor: calendarEventDataSet.find(
                    event => event.name === form.eventCategory
                ).borderColor,
                eventCategory: form.eventCategory
            }
        }
        console.log('eventOptions<<>>', eventOptions)
        console.log('생성버튼 눌렀어!', eventOptions)
        dispatch(callCreateEventAPI({ eventOptions }))
        eventWindowExitHandler()
    }

    const eventModifyAcceptHandler = event => {
        console.log('수정 적용버튼 눌렀어!', event)
        const eventOptions = {
            event: {
                eventCode: event.id,
                eventTitle: form.title,
                eventContent: form.body,
                eventStartDate:
                    form.isAllday === 'true'
                        ? form.startDate
                        : `${form.startDate}T${form.startTime}`,
                eventEndDate:
                    form.isAllday === 'true'
                        ? form.endDate
                        : `${form.endDate}T${form.endTime}`,
                eventLocation: form.location,
                eventIsAllDay: form.isAllday === 'true' ? 'Y' : 'N',
                eventColor: calendarEventDataSet.find(
                    event => event.name === form.eventCategory
                ).color,
                eventBackgroundColor: calendarEventDataSet.find(
                    event => event.name === form.eventCategory
                ).backgroundColor,
                eventDragBackgroundColor: calendarEventDataSet.find(
                    event => event.name === form.eventCategory
                ).dragBackgroundColor,
                eventBorderColor: calendarEventDataSet.find(
                    event => event.name === form.eventCategory
                ).borderColor,
                eventCategory: form.eventCategory
            }
        }
        console.log(eventOptions)
        dispatch(callModifyEventAPI({ eventOptions }))
        eventWindowExitHandler()
    }

    const eventDeleteHandler = event => {
        console.log('삭제버튼 눌렀어!', event)
        const eventCode = event.id
        dispatch(callDeleteEventAPI({ eventCode }))
        eventWindowExitHandler()
    }

    const eventWindowExitHandler = () => {
        console.log('윈도우 끌거야')
        calendar.clearGridSelections()
        setEventWindow({ state: null })
    }
    const exitHandler = e => {
        setEventWindow({ state: null })
    }
    const notExitHandler = e => {
        e.stopPropagation()
    }
    return (
        <div
            className={styles.eventWindow}
            ref={eventWindowRef}
            onClick={exitHandler}
        >
            <div className={styles.formWindow} onClick={notExitHandler}>
                <div className={styles.inputWindow}>
                    <div className={styles.exit} onClick={exitHandler}>
                        x
                    </div>
                    <div className={styles.inputWindow_row_1}>
                        <div>제목</div>
                        <input
                            type='text'
                            value={form?.title ?? ''}
                            name='title'
                            onChange={eventWindow?.state !== 'clicked' ? formHandler : null}
                            readOnly={eventWindow?.state === 'clicked'}
                        />
                    </div>
                    <div className={styles.inputWindow_row_2}>
                        <div>내용</div>
                        <textarea
                            value={form?.body ?? ''}
                            name='body'
                            onChange={eventWindow?.state !== 'clicked' ? formHandler : null}
                            readOnly={eventWindow?.state === 'clicked'}
                        />
                    </div>
                    <div className={styles.inputWindow_row_3}>
                        <div>시간</div>
                        <input
                            type='date'
                            value={form?.startDate ?? format(new Date(), 'yyyy-MM-dd')}
                            name='startDate'
                            onChange={eventWindow?.state !== 'clicked' ? formHandler : null}
                            readOnly={eventWindow?.state === 'clicked'}
                        />
                        <input
                            type='time'
                            value={form?.startTime ?? format(new Date(), 'HH:mm')}
                            name='startTime'
                            onChange={eventWindow?.state !== 'clicked' || form?.isAllday !== 'true' ? formHandler : null}
                            readOnly={
                                eventWindow?.state === 'clicked' || form?.isAllday !== 'true'
                            }
                        />
                        <div> ~ </div>
                        <input
                            type='date'
                            value={form?.endDate ?? format(new Date(), 'yyyy-MM-dd')}
                            name='endDate'
                            onChange={eventWindow?.state !== 'clicked' ? formHandler : null}
                            readOnly={eventWindow?.state === 'clicked'}
                        />
                        <input
                            type='time'
                            value={form?.endTime ?? format(new Date(), 'HH:mm')}
                            name='endTime'
                            onChange={eventWindow?.state !== 'clicked' || form?.isAllday !== 'true' ? formHandler : null}
                            readOnly={
                                eventWindow?.state === 'clicked' || form?.isAllday !== 'true'
                            }
                        />
                    </div>
                    <div className={styles.inputWindow_row_4}>
                        <div>위치</div>
                        <input
                            type='text'
                            value={form?.location ?? ''}
                            name='location'
                            onChange={eventWindow?.state !== 'clicked' ? formHandler : null}
                            readOnly={eventWindow?.state === 'clicked'}
                        />
                    </div>
                    <div className={styles.inputWindow_row_5}>
                        <div>하루종일</div>
                        <select
                            value={form?.isAllday ?? 'true'}
                            name='isAllday'
                            onChange={eventWindow?.state !== 'clicked' ? formHandler : null}
                            disabled={eventWindow?.state === 'clicked'}
                        >
                            <option value='true'>O</option>
                            <option value='false'>X</option>
                        </select>
                    </div>
                    <div className={styles.inputWindow_row_6}>
                        <div>카테고리</div>
                        <select
                            value={form?.eventCategory ?? ''}
                            name='eventCategory'
                            onChange={eventWindow?.state !== 'clicked' ? formHandler : null}
                            disabled={eventWindow?.state === 'clicked'}
                            className={
                                form?.eventCategory === 'meeting' ? styles.meeting :
                                    form?.eventCategory === 'personal' ? styles.personal :
                                        form?.eventCategory === 'important' ? styles.important :
                                            form?.eventCategory === 'vacation' ? styles.vacation :
                                                form?.eventCategory === 'birthday' ? styles.birthday :
                                                    form?.eventCategory === 'todo' ? styles.todo :
                                                        form?.eventCategory === 'other' ? styles.other :
                                                            styles.meeting
                            }
                        >
                            <option value='meeting' className={styles.meeting}>회의</option>
                            <option value='personal' className={styles.personal}>개인 일정</option>
                            <option value='important' className={styles.important}>중요한 일정</option>
                            <option value='vacation' className={styles.vacation}>휴가</option>
                            <option value='birthday' className={styles.birthday}>생일(기념일)</option>
                            <option value='todo' className={styles.todo}>할일</option>
                            <option value='other' className={styles.other}>기타</option>
                        </select>
                    </div>
                </div>
                <div className={styles.button_wrap}>
                    {eventWindow?.state === 'clicked' && (
                        <>
                            <button onClick={() => eventModifyHandler(eventWindow.event)}>
                                수정
                            </button>
                            <button onClick={() => eventDeleteHandler(eventWindow.event)}>
                                삭제
                            </button>
                        </>
                    )}
                    {eventWindow?.state === 'created' && (
                        <button onClick={eventCreateAcceptHandler}>생성</button>
                    )}
                    {eventWindow?.state === 'modify' && (
                        <button onClick={() => eventModifyAcceptHandler(eventWindow.event)}>
                            적용
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EventWindow
