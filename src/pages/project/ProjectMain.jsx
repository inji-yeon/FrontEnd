import { useEffect, useRef, useState } from 'react';
import styles from './projectMain.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { callCreateProjectAPI, callGetProjectsAPI, callResetCreateProjectCode } from '../../apis/ProjectAPICalls';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { GET_PROJECTS, RESET_MESSAGE } from '../../modules/ProjectModule';

function ProjectMain() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const project = useSelector(state => state.project)
    const [projectList, setProjectList] = useState([]);
    const [projectPageInfo, setProjectPageInfo] = useState(null);
    const [projectType, setProjectType] = useState('all');
    const [searchValue, setSearchValue] = useState('');
    const [pageRange, setPageRange] = useState([]);
    const [isCreateWindow, setIsCreateWindow] = useState(false);
    const projectListWrapRef = useRef();

    const [createForm, setCreateForm] = useState({
        projectTitle: '',
        projectDeadline: format(new Date(), "yyyy-MM-dd", { timeZone: 'Asia/Seoul' }),
        projectDescription: '',
        projectLockedStatus: 'N',
    })

    const selectedStyle = {
        backgroundColor: "#fa9a85",
        color: 'white'
    }
    useEffect(() => {
        project && console.log('project', project);
    }, [project])
    useEffect(() => {
        setProjectList(project?.projectListWithPaging?.data);
        setProjectPageInfo(project?.projectListWithPaging?.pageInfo);
    }, [project?.projectListWithPaging])

    useEffect(() => {
        if (project?.createProjectCode) {
            navigate(`/projects/${project?.createProjectCode}`);
            dispatch(callResetCreateProjectCode());
        }
    }, [project?.createProjectCode])

    useEffect(() => {
        projectType && dispatch(callGetProjectsAPI({ projectType, searchValue }))
    }, [projectType])
    useEffect(() => {
        if (project?.message) {
            switch (project?.message) {
                case GET_PROJECTS:
                    const current = projectListWrapRef.current;
                    let color = "#FF3F3F"
                    switch (current.value) {
                        case '프로젝트 생성':
                            color = "#FF3F3F"
                            break;
                        case '기획중':
                            color = "#FF843F"
                            break;
                        case '기획완료':
                            color = "#43FF3F"
                            break;
                        case '프로젝트 진행중':
                            color = "#3FBAFF"
                            break;
                        case '프로젝트 완료':
                            color = "#7C3FFF"
                            break;
                        case '피드백':
                            color = "#FB3FFF"
                            break;
                        default:
                    }
                    current.querySelectorAll('div[data="projectProgressStatus"]').forEach(element => element.style.color = color)
                    break;
                default:
            }
        }
        dispatch({ type: RESET_MESSAGE })
    }, [project?.message])

    useEffect(() => {
        projectList?.length && console.log('projectList>>>', projectList);
        projectPageInfo && console.log('projectPageInfo>>>', projectPageInfo);
        const pageStart = projectPageInfo?.pageStart;
        const pageEnd = projectPageInfo?.pageEnd;
        const range = Array.from({ length: pageEnd - pageStart + 1 }, (_, index) => index + pageStart)
        setPageRange(range)
    }, [projectList, projectPageInfo])

    const searchValueHandler = (e) => {
        setSearchValue(e.target.value);
    }
    const searchHandler = (e) => {
        dispatch(callGetProjectsAPI({ projectType, searchValue }))
    }

    const paging = (searchValue, offset) => {
        dispatch(callGetProjectsAPI({ projectType, searchValue, offset }));
    }

    const projectClickHandler = (projectCode) => {
        navigate(`/projects/${projectCode}`)
    }

    const projectCreateHandler = () => {
        setIsCreateWindow(!isCreateWindow)
    }

    const gobackHandler = () => {
        window.location.reload();
    }

    const createFormHandler = (e) => {
        if (e.target.name === 'projectDescription') {
            const maxLength = 200;
            if (e.target.value.length <= maxLength) {
                setCreateForm({
                    ...createForm,
                    projectDescription: e.target.value
                })
            }
        } else {
            setCreateForm({
                ...createForm,
                [e.target.name]: e.target.value,
            })
        }
    }

    const createCompleteHandler = () => {
        dispatch(callCreateProjectAPI({ createForm }))
    }
    return (
        <div className={styles.project_main}>
            <div className={styles.sidemenu2}>
                <div className={styles.sidemenu2_title}>프로젝트</div>
                <div className={styles.sidemenu2_menu}>
                    <div style={!isCreateWindow && projectType === 'all' ? selectedStyle : null} onClick={() => { setProjectType('all'); setIsCreateWindow(false) }}>
                        <span>전체 프로젝트</span>
                    </div>
                    <div style={!isCreateWindow && projectType === 'me' ? selectedStyle : null} onClick={() => { setProjectType('me'); setIsCreateWindow(false); }}>
                        <span>내 프로젝트</span>
                    </div>
                    <div style={!isCreateWindow && projectType === 'myDept' ? selectedStyle : null} onClick={() => { setProjectType('myDept'); setIsCreateWindow(false) }}>
                        <span>내 부서 프로젝트</span>
                    </div>
                </div>
            </div>
            {!isCreateWindow
                && <section className={styles.project_section}>
                    <div className={styles.project_header}>
                        <div className={styles.project_header_title}>{(projectType === 'all' ? '전체 프로젝트'
                            : (projectType === 'me' ? '내 프로젝트' : '내 부서 프로젝트'))}</div>
                    </div>
                    <div className={styles.project_input_wrap}>
                        <input
                            className={styles.project_search_input}
                            name='searchText'
                            type='text'
                            placeholder='프로젝트 검색'
                            onChange={searchValueHandler}
                            value={searchValue}
                        />
                        <input
                            className={styles.project_search_button}
                            type='button'
                            value='검색'
                            onClick={searchHandler}
                        />
                        <input
                            className={styles.project_create_button}
                            type='button'
                            value='프로젝트 만들기'
                            onClick={projectCreateHandler}
                        />
                    </div>
                    <div className={styles.project_body}>
                        <div className={styles.project_list_wrap} ref={projectListWrapRef}>
                            {
                                projectList?.map(project => {
                                    const { projectCode, projectDeadline, projectDescription, projectLockedStatus, projectManagerDeptName, projectManagerName, projectMemberCount, projectProgressStatus, projectTitle } = project;
                                    return (
                                        <div key={projectCode} onClick={() => projectClickHandler(projectCode)}
                                            className={styles.project_element_wrap}>
                                            <div className={styles.project_element_row_1}>
                                                <span className={styles.project_element_title}>
                                                    {projectTitle}
                                                </span>
                                            </div>
                                            <div>
                                                <div className={styles.project_element_row_2}>
                                                    <div className={styles.project_manager}>관리자: {projectManagerName}</div>
                                                </div>
                                                <div className={styles.project_element_row_3}>
                                                    ~ {format(projectDeadline, "yyyy-MM-dd", { timeZone: 'Asia/Seoul' })}
                                                </div>
                                                <div className={styles.project_element_row_4}>
                                                    <div className={styles.project_element_progress_status} data='projectProgressStatus'>{projectProgressStatus}</div>
                                                    <div>
                                                        {projectLockedStatus
                                                            ? <img src='/project/lock.png' alt='잠금' className={styles.lock_img} />
                                                            : ''}
                                                        <img src='/project/member_count.png' alt='인원:' />
                                                        <span>{projectMemberCount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.page_selector}>
                        <button
                            disabled={
                                projectPageInfo?.cri?.pageNum === 1 ||
                                projectPageInfo?.total === 0
                            }
                            onClick={() => {
                                paging(searchValue, 1)
                            }}
                        >
                            &lt;&lt;
                        </button>
                        <button
                            disabled={!projectPageInfo?.prev}
                            onClick={() => {
                                paging(searchValue, projectPageInfo?.cri?.pageNum - 1)
                            }}
                        >
                            &lt;
                        </button>
                        {pageRange?.map(page => {
                            return (
                                <button
                                    key={page}
                                    style={{
                                        backgroundColor: projectPageInfo?.cri?.pageNum === page ? "hsl(12, 92%, 85%)" : ""
                                    }}
                                    onClick={() => {
                                        paging(searchValue, page)
                                    }}
                                >
                                    {page}
                                </button>
                            )
                        })}
                        <button
                            disabled={!projectPageInfo?.next}
                            onClick={() => {
                                paging(searchValue, projectPageInfo?.cri?.pageNum + 1)
                            }}
                        >
                            &gt;
                        </button>
                        <button
                            disabled={
                                projectPageInfo?.cri?.pageNum === projectPageInfo?.realEnd ||
                                projectPageInfo?.total === 0
                            }
                            onClick={() => {
                                paging(searchValue, projectPageInfo?.realEnd)
                            }}
                        >
                            &gt;&gt;
                        </button>
                    </div>
                </section>}
            {
                isCreateWindow
                && <section className={styles.create_section}>
                    <div className={styles.create_header}>
                        <div className={styles.create_header_title}>프로젝트 생성</div>
                    </div>
                    <table className={styles.create_body}>
                        <tbody>
                            <tr>
                                <th>제목</th>
                                <td>
                                    <input
                                        type='text'
                                        className={styles.title}
                                        value={createForm.projectTitle}
                                        name='projectTitle'
                                        onChange={createFormHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>마감기한</th>
                                <td><input
                                    type='date'
                                    min={format(new Date(), 'yyyy-MM-dd', { timeZone: 'Asia/Seoul' })}
                                    className={styles.deadline}
                                    value={createForm.projectDeadline}
                                    name='projectDeadline'
                                    onChange={createFormHandler}
                                /></td>
                            </tr>
                            <tr>
                                <th className={styles.description_text}>설명</th>
                                <td>
                                    <textarea
                                        maxLength={200}
                                        className={styles.description_textarea}
                                        value={createForm.projectDescription}
                                        name='projectDescription'
                                        onChange={createFormHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>잠금여부</th>
                                <td>
                                    <div>
                                        <select
                                            value={createForm.projectLockedStatus}
                                            onChange={createFormHandler}
                                            name='projectLockedStatus'>
                                            <option value='Y'>O</option>
                                            <option value='N'>X</option>
                                        </select>
                                        <input
                                            id='lockCheckbox'
                                            type='checkbox'
                                            className={styles.custom_checkbox_input}
                                            value={createForm.projectLockedStatus}
                                            name='projectLockedStatus'
                                            onChange={createFormHandler} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.create_footer}>
                        <input
                            className={styles.create_exit_button}
                            type='button'
                            value='뒤로가기'
                            onClick={gobackHandler}
                        />
                        <input
                            className={styles.create_complete_button}
                            type='button'
                            value='생성하기'
                            onClick={createCompleteHandler}
                        />
                    </div>
                </section>
            }

        </div >
    )
}

export default ProjectMain
