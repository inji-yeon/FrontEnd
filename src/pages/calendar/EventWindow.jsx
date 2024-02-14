import { useEffect, useRef, useState } from 'react'
import { callGetEmployeeListAPI, callModifyEventAPI } from '../../apis/CalendarAPICalls'
import { useDispatch } from 'react-redux'
import { parseISO, format } from 'date-fns';

function EventWindow({ eventWindow, setEventWindow, calendar, employeeList, setEmployeeList, returnData, setReturnData }) {
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
    const dispatch = useDispatch();

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [startDateTime, setStartDateTime] = useState(new Date())
    const [endDateTime, setEndDateTime] = useState(new Date())
    const [location, setLocation] = useState('')
    const [recurrenceRule, setRecurrenceRule] = useState('')
    const [isAllday, setIsAllday] = useState('')
    const [backgroundColor, setBackgroundColor] = useState('')
    const [color, setColor] = useState('')
    const [dragBackgroundColor, setDragBackgroundColor] = useState('')
    const [borderColor, setBorderColor] = useState('')
    const [employeeCheckedList, setEmployeeCheckedList] = useState([]);

    const [attendeeList, setAttendeeList] = useState([])
    const [searchValue, setSearchValue] = useState('');
    const [windowReturnData, setWindowReturnData] = useState('');

    useEffect(() => {
        console.log(eventWindow.state)
        if (eventWindow.state === 'clicked') {
            setTitle(eventWindow.event.title ?? '')
            setBody(eventWindow.event.body ?? '')
            setStartDateTime(eventWindow.event.start.toDate())
            setEndDateTime(eventWindow.event.end.toDate())
            setLocation(eventWindow.event.location ?? '')
            setRecurrenceRule(eventWindow.event.recurrenceRule ?? '')
            setIsAllday(eventWindow.event.isAllday ? 'true' : 'false')
            setBackgroundColor(eventWindow.event.backgroundColor ?? '')
            setColor(eventWindow.event.color ?? '')
            setDragBackgroundColor(eventWindow.event.dragBackgroundColor ?? '')
            setBorderColor(eventWindow.event.borderColor ?? '')
            setAttendeeList(eventWindow.event.raw.eventAttendeeList ?? [])
        }
    }, [eventWindow])

    const titleHandler = e => setTitle(e.target.value)
    const bodyHandler = e => setBody(e.target.value)
    const startDateTimeHandler = e => setStartDateTime(new Date(e.target.value))
    const endDateTimeHandler = e => setEndDateTime(new Date(e.target.value))
    const locationHandler = e => setLocation(e.target.value)
    const recurrenceRuleHandler = e => setRecurrenceRule(e.target.value)
    const isAlldayHandler = e => {
        setIsAllday(e.target.value)
    }
    const backgroundColorHandler = e => setBackgroundColor(e.target.value)
    const colorHandler = e => setColor(e.target.value)
    const dragBackgroundColorHandler = e => setDragBackgroundColor(e.target.value)
    const borderColorHandler = e => setBorderColor(e.target.value)

    const eventModifyHandler = event => {
        console.log('수정버튼 눌렀어!', event)
        dispatch(callGetEmployeeListAPI());
        setEventWindow({ ...eventWindow, state: 'modify' })
    }

    useEffect(() => {
        if (employeeList.length) {
            const alreadyEmployeeCodeList = attendeeList.map(attendee => attendee.employee.employeeCode);
            const newEmployeeCheckedList = employeeList.map(employee => ({ isChecked: (alreadyEmployeeCodeList.includes(employee.employeeCode) ? true : false), employee }))
            setEmployeeCheckedList(newEmployeeCheckedList);
        }
    }, [employeeList]);
    useEffect(() => {
        // employeeCheckedList.length && console.log('employeeCheckedList>>>', employeeCheckedList);
    }, [employeeCheckedList])

    const eventModifyAcceptHandler = event => {
        console.log('수정 적용버튼 눌렀어!', event)
        const eventOptions = {
            event: {
                eventCode: event.id,
                eventAttendeeCount: employeeCheckedList
                    .filter(employeeChecked => employeeChecked.isChecked).length,
                eventTitle: title,
                eventContent: body,
                eventStartDate: startDateTime,
                eventEndDate: endDateTime,
                eventLocation: location,
                eventRecurrenceRule: recurrenceRule,
                eventColor: color,
                eventBackgroundColor: backgroundColor,
                eventDragBackgroundColor: dragBackgroundColor,
                eventBorderColor: borderColor
            },
            eventAttendeeEmployeeCodeList: employeeCheckedList
                .filter(employeeChecked => employeeChecked.isChecked)
                .map(employeeChecked => employeeChecked.employee.employeeCode),
            // eventAlert: {

            // }
        }
        console.log(eventOptions);
        dispatch(callModifyEventAPI({ eventOptions }));
        eventWindowExitHandler()
    }
    useEffect(() => {
        returnData && setWindowReturnData(returnData);
    }, [returnData])
    useEffect(() => {
        // 메시지가 발생한다. => 뭔가 API 작업이 진행되고 완료여부가 반환됐다.
        // const event = eventWindow.event;
        console.log('windowReturnData', windowReturnData);
        // if (windowReturnData === '일정 수정 성공') {
        //     calendar.updateEvent(event.id, event.calendarId, {
        //         title: title,
        //         body: body,
        //         start: startDateTime,
        //         end: endDateTime,
        //         location: location,
        //         recurrenceRule: recurrenceRule,
        //         color: color,
        //         backgroundColor: backgroundColor,
        //         dragBackgroundColor: dragBackgroundColor,
        //         borderColor: borderColor,
        //         raw: {
        //             eventAttendeeCount: employeeCheckedList
        //                 .filter(employeeChecked => employeeChecked.isChecked)
        //                 .length,
        //             eventAttendeeList: employeeCheckedList
        //                 .filter(employeeChecked => employeeChecked.isChecked)
        //                 .map(employeeChecked => employeeChecked.employee.employeeCode)
        //         }
        //     })
        // }
    }, [windowReturnData])

    const eventDeleteHandler = event => {
        // 삭제 버튼 누를경우 dispatch를 전달한다. -> 이때 eventCode를 전달해야 함.
        console.log('삭제버튼 눌렀어!', event)
        eventWindowExitHandler()
    }

    // 이벤트 윈도우가 더이상 필요없을경우 이 메서드를 부르면 된다.
    const eventWindowExitHandler = () => {
        console.log('윈도우 끌거야')
        calendar.clearGridSelections() // selected 하고 있을경우 제거하는거긴한데 윈도우를 끄면서 제거해도 무방하다.
        // 일단 selected와 clicked는 서로 독립적이다.(둘중에 하나만 가능. 그래서 일단 다른 행위인 경우 null로 바뀌는게 우선이다.)
        setEmployeeList([]); // 윈도우가 꺼지면 가져온 사원 목록도 사라지게
        setEventWindow({ state: null })
    }

    const employeeClickHandler = (employeeCode) => {
        const newEmployeeCheckedList = employeeCheckedList.map(employeeChecked => {
            if (employeeChecked.employee.employeeCode === employeeCode) {
                return { ...employeeChecked, isChecked: !employeeChecked.isChecked }
            } else {
                return employeeChecked
            }
        })
        setEmployeeCheckedList(newEmployeeCheckedList)
    }

    const searchHandler = (e) => {
        setSearchValue(e.target.value);
    }

    return (
        <>
            {eventWindow.state === 'clicked' && (
                <div>
                    <ul>
                        <li>
                            제목: <input type='text' onChange={titleHandler} value={title} readOnly />
                        </li>
                        <li>
                            내용: <input type='text' onChange={bodyHandler} value={body} readOnly />
                        </li>
                        <li>
                            시작시간:
                            {isAllday === 'true' ? (
                                <input
                                    type='date'
                                    onChange={startDateTimeHandler}
                                    value={format(startDateTime, 'yyyy-MM-dd', { timeZone: 'Asia/Seoul' })}
                                    readOnly
                                />
                            ) : (
                                <input
                                    type='datetime-local'
                                    onChange={startDateTimeHandler}
                                    value={format(startDateTime, 'yyyy-MM-dd HH:mm', { timeZone: 'Asia/Seoul' })}
                                    readOnly
                                />
                            )}
                        </li>
                        <li>
                            끝시간:
                            {isAllday === 'true' ? (
                                <input
                                    type='date'
                                    onChange={endDateTimeHandler}
                                    value={format(endDateTime, 'yyyy-MM-dd', { timeZone: 'Asia/Seoul' })}
                                    readOnly
                                />
                            ) : (
                                <input
                                    type='datetime-local'
                                    onChange={endDateTimeHandler}
                                    value={format(endDateTime, 'yyyy-MM-dd HH:mm', { timeZone: 'Asia/Seoul' })}
                                    readOnly
                                />
                            )}
                        </li>
                        <li>
                            위치:
                            <input type='text' onChange={locationHandler} value={location} readOnly />
                        </li>
                        <li>
                            반복여부:
                            <input
                                type='text'
                                onChange={recurrenceRuleHandler}
                                value={recurrenceRule}
                                readOnly
                            />
                        </li>
                        <li>
                            하루종일여부:
                            <select value={isAllday} disabled>
                                <option value='true'>O</option>
                                <option value='false'>X</option>
                            </select>
                        </li>
                        <li>
                            배경색상:
                            <input
                                type='text'
                                onChange={backgroundColorHandler}
                                value={backgroundColor}
                                readOnly
                            />
                        </li>
                        <li>
                            색상: <input type='text' onChange={colorHandler} value={color} readOnly />
                        </li>
                        <li>
                            드래그할때 색상:
                            <input
                                type='text'
                                onChange={dragBackgroundColorHandler}
                                value={dragBackgroundColor}
                                readOnly
                            />
                        </li>
                        <li>
                            경계선 색상:
                            <input
                                type='text'
                                onChange={borderColorHandler}
                                value={borderColor}
                                readOnly
                            />
                        </li>
                        {attendeeList.map(attendee => {
                            return (
                                <ul
                                    key={attendee.eventAttendeeCode}
                                    style={{ border: '1px solid black' }}
                                >
                                    {/* <li>사원번호: {attendee.employee.employeeAssignedCode}</li> */}
                                    <li>사원번호: {attendee.employee.employeeCode}</li>
                                    <li>이름: {attendee.employee.employeeName}</li>
                                    <li>부서: {attendee.employee?.department?.departmentName ?? '부서이름이 없다.'}</li>
                                    <li>직책: {attendee.employee?.job?.jobName ?? '직책이름이 없다.'}</li>
                                    <li>
                                        프로필 이미지:{' '}
                                        {attendee.employee.profileImageURL ?? '기본이미지입니다.'}
                                    </li>
                                </ul>)
                        })}
                    </ul>
                    <button onClick={() => eventModifyHandler(eventWindow.event)}>
                        수정
                    </button>
                    <button onClick={() => eventDeleteHandler(eventWindow.event)}>
                        삭제
                    </button>
                </div>
            )}
            {eventWindow.state === 'selected' && <div>날짜들을 클릭한 경우에</div>}
            {eventWindow.state === 'modify' && (
                <div>
                    <ul>
                        <li>
                            제목: <input type='text' onChange={titleHandler} value={title} />
                        </li>
                        <li>
                            내용: <input type='text' onChange={bodyHandler} value={body} />
                        </li>
                        <li>
                            시작시간:{' '}
                            {isAllday === 'true' ? (
                                <input
                                    type='date'
                                    onChange={startDateTimeHandler}
                                    value={format(startDateTime, 'yyyy-MM-dd', { timeZone: 'Asia/Seoul' })}
                                />
                            ) : (
                                <input
                                    type='datetime-local'
                                    onChange={startDateTimeHandler}
                                    value={format(startDateTime, 'yyyy-MM-dd HH:mm', { timeZone: 'Asia/Seoul' })}
                                />
                            )}
                        </li>
                        <li>
                            끝시간:
                            {isAllday === 'true' ? (
                                <input
                                    type='date'
                                    onChange={endDateTimeHandler}
                                    value={format(endDateTime, 'yyyy-MM-dd', { timeZone: 'Asia/Seoul' })}
                                />
                            ) : (
                                <input
                                    type='datetime-local'
                                    onChange={endDateTimeHandler}
                                    value={format(endDateTime, 'yyyy-MM-dd HH:mm', { timeZone: 'Asia/Seoul' })}
                                />
                            )}
                        </li>
                        <li>
                            위치:
                            <input type='text' onChange={locationHandler} value={location} />
                        </li>
                        <li>
                            반복여부:
                            <input
                                type='text'
                                onChange={recurrenceRuleHandler}
                                value={recurrenceRule}
                            />
                        </li>
                        <li>
                            하루종일여부:
                            <select onChange={isAlldayHandler} value={isAllday}>
                                <option value='true'>O</option>
                                <option value='false'>X</option>
                            </select>
                        </li>
                        <li>
                            배경색상:
                            <input
                                type='text'
                                onChange={backgroundColorHandler}
                                value={backgroundColor}
                            />
                        </li>
                        <li>
                            색상: <input type='text' onChange={colorHandler} value={color} />
                        </li>
                        <li>
                            드래그할때 색상:
                            <input
                                type='text'
                                onChange={dragBackgroundColorHandler}
                                value={dragBackgroundColor}
                            />
                        </li>
                        <li>
                            경계선 색상:
                            <input
                                type='text'
                                onChange={borderColorHandler}
                                value={borderColor}
                            />
                        </li>
                        <div>여기는 현재 이 이벤트에 들어있는 사원 목록</div>
                        {employeeCheckedList
                            .filter(employeeChecked => employeeChecked.isChecked)
                            .map(employeeChecked => {
                                const employee = employeeChecked.employee;
                                return (
                                    <ul
                                        key={employee.employeeCode}
                                        style={{ border: '1px solid black' }}
                                        onClick={() => employeeClickHandler(employee.employeeCode)}
                                    >
                                        {/* <li>사원번호: {employee.employeeAssignedCode}</li> */}
                                        <li>사원번호: {employee.employeeCode}</li>
                                        <li>이름: {employee.employeeName}</li>
                                        <li>부서: {employee?.department?.departmentName ?? '부서이름이 없다.'}</li>
                                        <li>직책: {employee?.job?.jobName ?? '직책이름이 없다.'}</li>
                                        <li>
                                            프로필 이미지:
                                            {employee.profileImageURL ?? '기본이미지입니다.'}
                                        </li>
                                    </ul>
                                )
                            })
                        }
                        <div>여기서부터는 사원 목록</div>
                        <div>검색할거야: <input type='text' onChange={searchHandler} value={searchValue} /></div>
                        {employeeCheckedList
                            .filter(employeeChecked => {
                                const employee = employeeChecked.employee;
                                const name = employee.employeeName;
                                const deptName = employee?.department?.departmentName ?? '';
                                const jobName = employee?.job?.jobName ?? '';
                                return !employeeChecked.isChecked && (
                                    name.includes(searchValue)
                                    || deptName.includes(searchValue)
                                    || jobName.includes(searchValue)
                                )
                            })
                            .map(employeeChecked => {
                                const employee = employeeChecked.employee;
                                return (
                                    <ul
                                        key={employee.employeeCode}
                                        style={{ border: '1px solid black', backgroundColor: 'pink' }}
                                        onClick={() => employeeClickHandler(employee.employeeCode)}
                                    >
                                        {/* <li>사원번호: {employee.employeeAssignedCode}</li> */}
                                        <li>사원번호: {employee.employeeCode}</li>
                                        <li>이름: {employee.employeeName}</li>
                                        <li>부서: {employee?.department?.departmentName ?? '부서이름이 없다.'}</li>
                                        <li>직책: {employee?.job?.jobName ?? '직책이름이 없다.'}</li>
                                        <li>
                                            프로필 이미지:
                                            {employee.profileImageURL ?? '기본이미지입니다.'}
                                        </li>
                                    </ul>
                                )
                            })
                        }
                    </ul>
                    <button onClick={() => eventModifyAcceptHandler(eventWindow.event)}>
                        적용
                    </button>
                    <button onClick={eventWindowExitHandler}>취소</button>
                </div>
            )}
        </>
    )
}

export default EventWindow
