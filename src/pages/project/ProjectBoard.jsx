import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './projectBoard.module.css'
import {
    callGetEmployees,
    callGetProjectAPI,
    callModifyProjectAPI,
    callReset,
    callResetCreateProjectCode,
    callResetError,
    callResetGetProjects
} from '../../apis/ProjectAPICalls'
import { format } from 'date-fns'
import ProjectPost from './ProjectPost'
import { GET_EMPLOYEES, PUT_PROJECT, RESET_MESSAGE } from '../../modules/ProjectModule'
import { userEmployeeCode } from '../../utils/tokenUtils'

function ProjectBoard() {
    const dispatch = useDispatch()
    const { projectCode } = useParams() // 여기에는 생성에 성공하든 뭐든 값이 들어올 것
    const navigate = useNavigate();

    const project = useSelector(state => state.project)

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
                    dispatch(callGetProjectAPI({ projectCode }))
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
    return (
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
                        <select value={form.projectProgressStatus} onChange={formHandler} name='projectProgressStatus'>
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
                        <div className={styles.member_row_1_title}>프로젝트 참여자</div>
                        <button className={styles.invite_window} onClick={isInviteHandler}>{isInvite ? '돌아가기' : '초대하기'}</button>
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
                                                {console.log('manager', manager)}
                                                {manager?.employeeCode === userEmployeeCode()
                                                    && <>
                                                        <button className={styles.kicked_button}>내보내기</button>
                                                        <button className={styles.invite_button}>초대하기</button>
                                                    </>}
                                            </div>
                                        </div>
                                    )
                                })
                            : memberList?.map(member => {
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
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <ProjectPost projectCode={projectCode} />
            </div>
        </section >
    )
}

export default ProjectBoard
