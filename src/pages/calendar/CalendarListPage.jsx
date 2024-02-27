import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { useDispatch, useSelector } from "react-redux";
import { callDeleteEventAPI, callRollbackTempDeletedEventListAPI } from "../../apis/CalendarAPICalls";
import styles from './calendarListPage.module.css'
import { DELETE_EVENT, PUT_TEMP_DELETED_EVENT } from "../../modules/CalendarModule";

function categoryName(eventCategory) {
    let result = '기타'
    switch (eventCategory) {
        case 'meeting':
            result = '회의';
            break;
        case 'personal':
            result = '개인 일정';
            break;
        case 'important':
            result = '중요한 일정';
            break;
        case 'vacation':
            result = '휴가';
            break;
        case 'birthday':
            result = '생일(기념일)';
            break;
        case 'todo':
            result = '할일';
            break;
        default:
    }
    return result;
}

function CalendarListPage({ events, searchText, isTempDeletedPage}) {
    const dispatch = useDispatch();
    const [isFetch, setIsFetch] = useState(false);
    const calendarData = useSelector((state) => state.calendar);

    useEffect(() => {
        if (calendarData?.message === DELETE_EVENT
            || calendarData?.message === PUT_TEMP_DELETED_EVENT) {
            setIsFetch(false);
        }
    }, [calendarData?.message]);
    const rollbackHandler = (eventCode) => {
        setIsFetch(true)
        dispatch(callRollbackTempDeletedEventListAPI({ eventCode }))
    }
    const deleteHandler = (eventCode) => {
        setIsFetch(true)
        dispatch(callDeleteEventAPI({ eventCode }))
    }

    return (<div className={styles.list_page_wrap}>
        {isTempDeletedPage
            && (<div className={styles.delete_message}>7일 이후 ~ 8일 이후 넘어가는 자정에 자동삭제됩니다.</div>)}
        <ul className={styles.list_wrap}>
            {!isTempDeletedPage
                ? (events?.filter(event => (searchText === '' || event.title.includes(searchText)) && event.raw.eventDeleteStatus === 'N').length === 0
                    ? (<div>출력할 내용이 없습니다.</div>
                    ) : (events?.filter(event => (searchText === '' || event.title.includes(searchText)) && event.raw.eventDeleteStatus === 'N')
                        .map(event => {
                            console.table('event', event);
                            return (!isFetch
                                && <li key={event.id} style={{ backgroundColor: event.backgroundColor, color: event.color }}
                                    className={styles.element}>
                                    <div className={styles.title}>제목: {event.title}</div>
                                    {event.category === "allday"
                                        ? <div>기간: {format(event.start, "yyyy-MM-dd")} ~ {format(event.end, "yyyy-MM-dd")} (하루종일)</div>
                                        : <div>기간: {format(event.start, "yyyy-MM-dd HH:mm")} ~ {format(event.end, "yyyy-MM-dd HH:mm")}</div>
                                    }
                                    {event.location && <div>위치: {event.location}</div>}
                                    <div>카테고리: {categoryName(event.raw.eventCategory)}</div>
                                    <div>설명: {event.body}</div>
                                    <div className={styles.element_button_wrap}>
                                        <button onClick={() => deleteHandler(event.id)}>임시삭제</button>
                                    </div>
                                </li>
                            )
                        })))
                : (events?.filter(event => event.raw.eventDeleteStatus === 'T').length === 0
                    ? (<div>출력할 내용이 없습니다.</div>
                    ) : (events?.filter(event => event.raw.eventDeleteStatus === 'T')
                        .map(event => {
                            const deleteTime = new Date(event.raw.eventDeleteTime);
                            deleteTime.setDate(deleteTime.getDate() + 7 + 1);
                            deleteTime.setHours(0, 0, 0, 0);


                            return (!isFetch
                                && <li key={event.id} style={{ backgroundColor: event.backgroundColor, color: event.color }}
                                    className={styles.element}>
                                    <div className={styles.title}>제목: {event.title}</div>
                                    <div className={styles.delete_time}>{format(deleteTime, "yyyy년 MM월 dd일 HH시")} 이후 자동 삭제 예정</div>
                                    {event.category === "allday"
                                        ? <div>기간: {format(event.start, "yyyy-MM-dd")} ~ {format(event.end, "yyyy-MM-dd")} (하루종일)</div>
                                        : <div>기간: {format(event.start, "yyyy-MM-dd HH:mm")} ~ {format(event.end, "yyyy-MM-dd HH:mm")}</div>
                                    }
                                    {event.location && <div>위치: {event.location}</div>}
                                    <div>카테고리: {categoryName(event.raw.eventCategory)}</div>
                                    <div>설명: {event.body}</div>
                                    <div className={styles.element_button_wrap}>
                                        <button onClick={() => rollbackHandler(event.id)}>복구</button>
                                        <button onClick={() => deleteHandler(event.id)}>영구삭제</button>
                                    </div>
                                </li>
                            )
                        }))
                )}
        </ul>
    </div>)
}

export default CalendarListPage;