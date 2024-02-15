import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { useDispatch } from "react-redux";
import { callDeleteEventAPI, callRollbackTempDeletedEventListAPI } from "../../apis/CalendarAPICalls";

function CalendarListPage({ events, setEvents, searchText, isTempDeletedPage, calendar, returnData, setReturnData }) {
    const dispatch = useDispatch();
    const [isFetch, setIsFetch] = useState(false);
    useEffect(() => {
        if (returnData?.message === '일정 롤백 성공'
            || returnData?.message === '일정 삭제 성공') {
            setIsFetch(false);
        }
    }, [returnData]);
    const rollbackHandler = (eventCode) => {
        console.log('복구버튼누름>>>', eventCode);
        setIsFetch(true)
        dispatch(callRollbackTempDeletedEventListAPI({ eventCode }))
    }
    const deleteHandler = (eventCode) => {
        console.log('영구삭제버튼누름>>>', eventCode);
        setIsFetch(true)
        dispatch(callDeleteEventAPI({ eventCode }))
    }

    return (<>
        {isTempDeletedPage
            && (<div>7일 이후 ~ 8일 이후 넘어가는 자정에 자동삭제됩니다.</div>)}
        {!isTempDeletedPage
            ? (events?.filter(event => (searchText === '' || event.title.includes(searchText)) && event.raw.eventDeleteStatus === 'N').length === 0
                ? (<div>출력할 내용이 없습니다.</div>
                ) : (events?.filter(event => (searchText === '' || event.title.includes(searchText)) && event.raw.eventDeleteStatus === 'N')
                    .map(event => {
                        return (
                            <ul key={event.id}>
                                <li>{event.id} ... 제목: {event.title}, {event.start.toString()}, {event.end.toString(0)}</li>
                            </ul>
                        )
                    })))
            : (events?.filter(event => event.raw.eventDeleteStatus === 'T').length === 0
                ? (<div>출력할 내용이 없습니다.</div>
                ) : (events?.filter(event => event.raw.eventDeleteStatus === 'T')
                    .map(event => {
                        return (
                            !isFetch
                            && <ul key={event.id}>
                                <li>{event.id} ... 제목: {event.title}, {event.start.toString()}, {event.end.toString(0)}</li>
                                <li>삭제시기: {format(event.raw.eventDeleteTime, 'yyyy-MM-dd HH:mm', { timeZone: 'Asia/Seoul' })}</li>
                                <button onClick={() => rollbackHandler(event.id)}>복구하기</button>
                                <button onClick={() => deleteHandler(event.id)}>영구삭제하기</button>
                            </ul>
                        )
                    }))
            )
        }
    </>)
}

export default CalendarListPage;