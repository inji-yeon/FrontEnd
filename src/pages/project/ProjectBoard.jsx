import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './projectBoard.module.css'
import {
    callGetProjectAPI,
    callModifyProjectAPI,
    callReset,
    callResetCreateProjectCode,
    callResetError,
    callResetGetProjects
} from '../../apis/ProjectAPICalls'
import { format } from 'date-fns'

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
    const submitHandler = (e) => {
        dispatch(callModifyProjectAPI({ form }))
    }
    return (
        <section className={styles.project_section}>
            <div className={styles.title}>
                <button onClick={goBackHandler}>&lt;</button>
                프로젝트 게시판
            </div>
            <div className={styles.body}>
                <div className={styles.manager}>
                    <table className={styles.manager_info}>
                        <tbody>
                            <tr>
                                <td colSpan={3} className={styles.manager_title}>
                                    프로젝트 관리자
                                </td>
                            </tr>
                            <tr className={styles.employee_col_2}>
                                <td rowSpan={2} className={styles.employee_profile}>
                                    <img src='' alt='프로필사진' />
                                </td>
                                <td rowSpan={2} className={styles.employee_name}>
                                    {manager?.employeeName}
                                </td>
                                <td className={styles.employee_dept_name}>
                                    {manager?.department?.departmentName}
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.employee_job_name}>
                                    {manager?.job?.jobName ?? ''}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.info}>
                    <table className={styles.project_info}>
                        <tbody>
                            <tr className={styles.project_info_row_1}>
                                <th>제목</th>
                                <td>
                                    <input
                                        type='text'
                                        value={form.projectTitle}
                                        name='projectTitle'
                                        onChange={formHandler}
                                    />
                                </td>
                            </tr>
                            <tr className={styles.project_info_row_2}>
                                <th>설명</th>
                                <td>
                                    <textarea
                                        maxLength={200}
                                        value={form.projectDescription}
                                        name='projectDescription'
                                        onChange={formHandler} />
                                </td>
                            </tr>
                            <tr className={styles.project_info_row_3}>
                                <th>마감기한</th>
                                <td>
                                    <input type='date'
                                        value={form.projectDeadline}
                                        name='projectDeadline'
                                        onChange={formHandler}
                                    />
                                </td>
                            </tr>
                            <tr className={styles.project_info_row_4}>
                                <th>잠금여부</th>
                                <td>
                                    <select
                                        value={form.projectLockedStatus}
                                        onChange={formHandler}
                                        name='projectLockedStatus'
                                    >
                                        <option value='Y'>O</option>
                                        <option value='N'>X</option>
                                    </select>
                                </td>
                            </tr>
                            <tr className={styles.project_info_row_5}>
                                <th>진행도</th>
                                <td>
                                    <select
                                        value={form.projectProgressStatus}
                                        onChange={formHandler}
                                        name='projectProgressStatus'
                                    >
                                        <option value='프로젝트 생성'>프로젝트 생성</option>
                                        <option value='기획중'>기획중</option>
                                        <option value='기획완료'>기획완료</option>
                                        <option value='프로젝트 진행중'>프로젝트 진행중</option>
                                        <option value='프로젝트 완료'>프로젝트 완료</option>
                                        <option value='피드백'>피드백</option>
                                    </select>
                                </td>
                            </tr>
                            <tr className={styles.project_info_row_6}>
                                <td colSpan={2}>
                                    <button onClick={submitHandler}>수정하기</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.member}>
                    <div className={styles.member_row_1}>
                        <div className={styles.member_row_1_title}>프로젝트 참여자</div>
                        <div className={styles.invite_button_wrap}>
                            <button>뒤로가기</button>
                            <button>초대하기</button>
                        </div>
                    </div>
                    <div className={styles.member_row_2}>
                        <input placeholder='이름으로 검색' />
                    </div>
                    <div className={styles.member_row_3}>
                        {memberList?.map(member => {
                            return (
                                <table className={`${styles.employee_info}`} key={member?.employee?.employeeCode}>
                                    <tbody>
                                        <tr className={styles.employee_col_2}>
                                            <td rowSpan={2} className={styles.employee_profile}>
                                                <img src='' alt='프로필사진' />
                                            </td>
                                            <td rowSpan={2} className={styles.employee_name}>
                                                {member?.employee?.employeeName}
                                            </td>
                                            <td className={styles.employee_dept_name}>
                                                {member?.employee?.department?.departmentName}
                                            </td>
                                        </tr>
                                        <tr className={styles.employee_col_3}>
                                            <td className={styles.employee_job_name}>
                                                {member?.employee?.job?.jobName ?? ''}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.post_list_wrap}>
                    <div className={styles.post_list_header}>
                        <input type='text' placeholder='제목 입력' />
                        <button>게시글 검색</button>
                        <button>게시글 등록</button>
                    </div>
                    <table className={styles.post_list_body}>
                        <colgroup>
                            <col style={{ width: '5%' }} />
                            <col style={{ width: '5%' }} />
                            <col style={{ width: '5%' }} />
                            <col />
                            <col style={{ width: '12%' }} />
                            <col style={{ width: '12%' }} />
                            <col style={{ width: '12%' }} />
                        </colgroup>
                        <thead className={styles.post_list_thead}>
                            <tr>
                                <th>번호</th>
                                <th>상태</th>
                                <th>우선순위</th>
                                <th>제목</th>
                                <th>작성일</th>
                                <th>수정일</th>
                                <th>마감기한</th>
                            </tr>
                        </thead>
                        <tbody className={styles.post_list_tbody}>
                            {pageData?.map(data => {
                                return (
                                    <tr>
                                        <td>30</td>
                                        <td>완료</td>
                                        <td>낮음</td>
                                        <td className={styles.post_list_title}>업무제목입니다.</td>
                                        <td>2023년 12월 28일</td>
                                        <td>2023년 12월 30일</td>
                                        <td>2024년 1월 9일</td>
                                    </tr>)
                            })}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.post_list_footer}>
                        {/* page_button_clicked */}
                        <button>&lt;&lt;</button>
                        <button>&lt;</button>
                        <button>1</button>
                        <button>&gt;</button>
                        <button>&gt;</button>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default ProjectBoard
