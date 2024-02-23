import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './projectBoard.module.css'
import {
    callDelegateAdmin,
    callGetEmployees,
    callGetProjectAPI,
    callInviteProjectMemberAPI,
    callKickedProjectMember,
    callLeaveProject,
    callModifyProjectAPI,
    callReset,
    callResetError,
    callResetGetProjects
} from '../../apis/ProjectAPICalls'
import { format } from 'date-fns'
import ProjectPost from './ProjectPost'
import { DELETEGATE_ADMIN, GET_EMPLOYEES, INVITE_PROJECT_MEMBER, KICKED_PROJECT_MEMBER, LEAVE_PROJECT, PUT_PROJECT, RESET_MESSAGE } from '../../modules/ProjectModule'
import { userEmployeeCode } from '../../utils/tokenUtils'

function ProjectBoard() {
    const dispatch = useDispatch()
    const { projectCode } = useParams() // 여기에는 생성에 성공하든 뭐든 값이 들어올 것
    const navigate = useNavigate();

    const project = useSelector(state => state.project)

    const selectRef = useRef();

    const [manager, setManager] = useState(null)
    const [details, setDetails] = useState(null)
    const [memberList, setMemberList] = useState([])
    const [pageData, setPageData] = useState([]);
    const [pageInfo, setPageInfo] = useState(null);
    const [nameValue, setNameValue] = useState('');
    const [isInvite, setIsInvite] = useState(false);
    const [employeeList, setEmployeeList] = useState([]);


    const [form, setForm] = useState({
        projectCode: null,
        projectTitle: '',
        projectDescription: '',
        progressStatus: '',
        projectDeadline: '',
        projectLockedStatus: '',
        projectProgressStatus: ''
    })

    useEffect(() => {
        dispatch(callResetGetProjects());
        dispatch(callGetProjectAPI({ projectCode }))
    }, [])
    useEffect(() => {
        if (project?.projectInfo) {
            const projectInfo = project?.projectInfo
            setManager(projectInfo?.projectManager)
            setDetails(projectInfo?.project)
            setMemberList(projectInfo?.projectMemberList)
        }
    }, [project?.projectInfo])
    useEffect(() => {
        if (project?.projectPostListWithPaging) {
            const projectPostData = project?.projectPostListWithPaging;
            setPageData(projectPostData.data);
            setPageInfo(projectPostData.pageInfo)
        }
    }, [project?.projectPostListWithPaging])
    useEffect(() => {
        if (selectRef) {
            const current = selectRef.current;
            switch (current.value) {
                case '프로젝트 생성':
                    current.style.color = "#FF3F3F"
                    break;
                case '기획중':
                    current.style.color = "#FF843F"
                    break;
                case '기획완료':
                    current.style.color = "#43FF3F"
                    break;
                case '프로젝트 진행중':
                    current.style.color = "#3FBAFF"
                    break;
                case '프로젝트 완료':
                    current.style.color = "#7C3FFF"
                    break;
                case '피드백':
                    current.style.color = "#FB3FFF"
                    break;
                default:
            }
        }
    }, [selectRef?.current?.value])
    useEffect(() => {
        details && setForm({
            projectCode: details.projectCode,
            projectTitle: details.projectTitle,
            projectDescription: details.projectDescription,
            progressStatus: details.progressStatus,
            projectDeadline: format(details.projectDeadline, "yyyy-MM-dd", { timeZone: 'Asia/Seoul' }),
            projectLockedStatus: details.projectLockedStatus,
            projectProgressStatus: details.projectProgressStatus
        })
    }, [details])
    useEffect(() => {
        if (project?.errorPage) {
            dispatch(callResetError());
            navigate('/projects');
        }
    }, [project?.errorPage])

    const goBackHandler = () => {
        dispatch(callReset())
        navigate('/projects');
    }
    const formHandler = (e) => {
        if (e.target.name === 'projectDescription') {
            const maxLength = 200;
            if (e.target.value.length <= maxLength) {
                setForm({
                    ...form,
                    projectDescription: e.target.value,
                })
            }
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            })
        }
    }
    useEffect(() => {
        if (project?.message) {
            switch (project?.message) {
                case PUT_PROJECT:
                    dispatch(callGetProjectAPI({ projectCode }));
                    alert('프로젝트 정보 수정을 성공했습니다.');
                    break;
                case KICKED_PROJECT_MEMBER:
                    dispatch(callGetProjectAPI({ projectCode }));
                    alert('해당 사원을 내보내는데 성공했습니다.');
                    break;
                case INVITE_PROJECT_MEMBER:
                    dispatch(callGetProjectAPI({ projectCode }));
                    alert('해당 사원을 초대하는데 성공했습니다.');
                    break;
                case LEAVE_PROJECT:
                    alert('프로젝트에 나가기를 성공했습니다.');
                    navigate('/projects');
                    break;
                case DELETEGATE_ADMIN:
                    dispatch(callGetProjectAPI({ projectCode }));
                    alert('해당 사원에게 관리자 위임에 성공했습니다.')
                    break;
                case GET_EMPLOYEES:
                    setEmployeeList(project?.employeeList);
                    break;
                default:
            }
            dispatch({ type: RESET_MESSAGE })
        }
    }, [project?.message])

    const submitHandler = (e) => {
        dispatch(callModifyProjectAPI({ form }))
    }
    const nameValueHandler = (e) => {
        setNameValue(e.target.value);
    }
    useEffect(() => {
        isInvite && dispatch(callGetEmployees())
    }, [isInvite])
    const isInviteHandler = () => {
        setIsInvite(!isInvite);
    }
    const kickedHandler = (employeeCode) => {
        // 자기자신이면 나가기 메서드가 실행된다.
        if (userEmployeeCode() === employeeCode) {
            const result = window.confirm('정말로 나가시겠습니까?')
            result && dispatch(callLeaveProject({ projectCode, employeeCode }));
        } else {
            const result = window.confirm('정말로 내보내겠습니까?')
            result && dispatch(callKickedProjectMember({ projectCode, employeeCode }));
        }
    }
    const inviteHandler = (employeeCode) => {
        const result = window.confirm('해당 사원을 초대하시겠습니까?');
        result && dispatch(callInviteProjectMemberAPI({ projectCode, employeeCode }))
    }
    const delegateHandler = (employeeCode) => {
        const result = window.confirm('해당 사원에게 프로젝트 관리자 권한을 위임시키겠습니까?');
        result && dispatch(callDelegateAdmin({ projectCode, employeeCode }));
    }
    return (
        <div className={styles.project_section_wrap}>
            <div className={styles.menu_separate_border_line}></div>
            <section className={styles.project_section}>
                <div className={styles.title_wrap}>
                    <button onClick={goBackHandler}>&lt;</button>
                    <span>프로젝트 게시판</span>
                </div>
                <div className={styles.body}>
                    <div className={styles.manager}>
                        <div className={styles.manager_title}>
                            프로젝트 관리자
                        </div>
                        <div className={styles.employee_info} key={manager?.employee?.employeeCode}>
                            <div className={styles.employee_col_1}>
                                <div className={styles.employee_profile}>
                                    <img src={manager?.profileList
                                        ?.filter(profile => profile?.profileDeleteStatus === "N")[0]?.profileChangedFile
                                        ? `http://${process.env.REACT_APP_RESTAPI_IP}:1208/web-images/${manager?.profileList?.filter(profile => profile?.profileDeleteStatus === "N")[0]?.profileChangedFile}`
                                        : '임시 사진'} alt='프로필' />
                                </div>
                                <div className={styles.employee_name}>
                                    {manager?.employeeName}
                                </div>
                            </div>
                            <div className={styles.employee_col_2}>
                                <div className={styles.employee_dept_name}>
                                    {manager?.department?.departmentName}
                                </div>
                                <div className={styles.employee_job_name}>
                                    {manager?.job?.jobName ?? ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.info_row_1}>
                            <div>제목</div>
                            <input
                                type='text'
                                value={form.projectTitle}
                                name='projectTitle'
                                onChange={formHandler}
                            />
                        </div>
                        <div className={styles.info_row_2}>
                            <div>
                                설명</div>
                            <textarea
                                maxLength={200}
                                value={form.projectDescription}
                                name='projectDescription'
                                onChange={formHandler} />
                        </div>
                        <div className={styles.info_row_3}>
                            <div>마감기한</div>
                            <input type='date'
                                value={form.projectDeadline}
                                name='projectDeadline'
                                onChange={formHandler}
                            />
                        </div>
                        <div className={styles.info_row_4}>
                            <div>잠금여부</div>
                            <select
                                value={form.projectLockedStatus}
                                onChange={formHandler}
                                name='projectLockedStatus'
                            >
                                <option value='Y'>O</option>
                                <option value='N'>X</option>
                            </select>
                        </div>
                        <div className={styles.info_row_5}>
                            <div>진행도</div>
                            <select value={form.projectProgressStatus} onChange={formHandler} name='projectProgressStatus' ref={selectRef}
                                className={styles.progress_status_select}>
                                <option value='프로젝트 생성'>프로젝트 생성</option>
                                <option value='기획중'>기획중</option>
                                <option value='기획완료'>기획완료</option>
                                <option value='프로젝트 진행중'>프로젝트 진행중</option>
                                <option value='프로젝트 완료'>프로젝트 완료</option>
                                <option value='피드백'>피드백</option>
                            </select>
                        </div>
                        <div className={styles.info_row_6}>
                            <button onClick={submitHandler}>수정하기</button>
                        </div>
                    </div>
                    <div className={styles.member}>
                        <div className={styles.member_row_1}>
                            <div className={styles.member_row_1_title}>{isInvite ? '사원 목록' : '프로젝트 참여자'}</div>
                            {manager?.employeeCode === userEmployeeCode() && <button className={styles.invite_window} onClick={isInviteHandler}>{isInvite ? '돌아가기' : '초대하기'}</button>}
                        </div>
                        <div className={styles.member_row_2}>
                            <input placeholder='이름 입력'
                                value={nameValue}
                                onChange={nameValueHandler}
                            />
                        </div>
                        <div className={styles.member_row_3}>
                            {isInvite
                                ? employeeList
                                    ?.filter(employee => !memberList?.map(member => member?.employee?.employeeCode)?.includes(employee.employeeCode))
                                    ?.filter(employee => employee?.employeeName.includes(nameValue))
                                    ?.map(employee => {
                                        return (
                                            <div className={styles.employee_info} key={employee?.employeeCode}>
                                                <div className={styles.employee_col_1}>
                                                    <div className={styles.employee_profile}>
                                                        <img src={employee?.profileList
                                                            ?.filter(profile => profile?.profileDeleteStatus === "N")[0]?.profileChangedFile
                                                            ? `http://${process.env.REACT_APP_RESTAPI_IP}:1208/web-images/${employee?.profileList?.filter(profile => profile?.profileDeleteStatus === "N")[0]?.profileChangedFile}`
                                                            : '임시 사진'} alt='프로필' />
                                                    </div>
                                                    <div className={styles.employee_name}>
                                                        {employee?.employeeName}
                                                    </div>
                                                </div>
                                                <div className={styles.employee_col_2}>
                                                    <div className={styles.employee_dept_name}>
                                                        {employee?.department?.departmentName}
                                                    </div>
                                                    <div className={styles.employee_job_name}>
                                                        {employee?.job?.jobName ?? ''}
                                                    </div>
                                                    {manager?.employeeCode === userEmployeeCode()
                                                        && <>
                                                            <button className={styles.invite_button} onClick={() => inviteHandler(employee?.employeeCode)}>초대하기</button>
                                                        </>}
                                                </div>
                                            </div>
                                        )
                                    })
                                : memberList
                                    ?.filter(member => member?.employee?.employeeName.includes(nameValue))
                                    ?.sort((member1, member2) => member1?.employee?.employeeCode === userEmployeeCode() ? -1 : 1)
                                    ?.map(member => {
                                        return (
                                            <div className={styles.employee_info} key={member?.employee?.employeeCode}>
                                                <div className={styles.employee_col_1}>
                                                    <div className={styles.employee_profile}>
                                                        <img src={member?.employee?.profileList
                                                            ?.filter(profile => profile?.profileDeleteStatus === "N")[0]?.profileChangedFile
                                                            ? `http://${process.env.REACT_APP_RESTAPI_IP}:1208/web-images/${member?.employee?.profileList?.filter(profile => profile?.profileDeleteStatus === "N")[0]?.profileChangedFile}`
                                                            : '임시 사진'} alt='프로필' />
                                                    </div>
                                                    <div className={styles.employee_name}>
                                                        {member?.employee?.employeeName}
                                                    </div>
                                                </div>
                                                <div className={styles.employee_col_2}>
                                                    <div className={styles.employee_dept_name}>
                                                        {member?.employee?.department?.departmentName}
                                                    </div>
                                                    <div className={styles.employee_job_name}>
                                                        {member?.employee?.job?.jobName ?? ''}
                                                    </div>
                                                    {manager?.employeeCode === userEmployeeCode() && member?.employee?.employeeCode !== manager?.employeeCode
                                                        && <>
                                                            <button className={styles.kicked_button} onClick={() => kickedHandler(member?.employee?.employeeCode)}>{member?.employee?.employeeCode === userEmployeeCode() ? '나가기' : '내보내기'}</button>
                                                            <button onClick={() => delegateHandler(member?.employee?.employeeCode)}>위임하기</button>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })}
                        </div>
                    </div>
                    <ProjectPost projectCode={projectCode} />
                </div>
            </section >
        </div>
    )
}

export default ProjectBoard
