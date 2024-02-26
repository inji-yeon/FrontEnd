import { useEffect, useRef, useState } from 'react';
import styles from './projectMain.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { callCreateProjectAPI, callGetProjectsAPI } from '../../apis/ProjectAPICalls';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { GET_PROJECTS, POST_PROJECT, PROJECT_ERROR, RESET_MESSAGE } from '../../modules/ProjectModule';

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

    const [form, setForm] = useState({
        projectCode: null,
        projectTitle: '',
        projectDescription: '',
        progressStatus: '',
        projectDeadline: '',
        projectLockedStatus: '',
        projectProgressStatus: ''
    })


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
    const selectRef = useRef();


    useEffect(() => {
        if (project?.error) {
            alert('오류가 발생했습니다. 로그인 페이지로 돌아갑니다.');
            console.error('error Message: ', project?.message);
            navigate('/login');
            dispatch({ type: PROJECT_ERROR, payload: '' });
        }
    }, [project?.error])

    useEffect(() => {
        if (selectRef) {
            const current = selectRef?.current;
            switch (current?.value) {
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
    const submitHandler = (e) => {
        dispatch(callCreateProjectAPI({ form }));
    }
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
        projectType && dispatch(callGetProjectsAPI({ projectType, searchValue }))
    }, [projectType])
    const colorType = (text) => {
        let color = "#FF3F3F"
        switch (text) {
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
        return color;
    }
    useEffect(() => {
        if (project?.message) {
            switch (project?.message) {
                case GET_PROJECTS:
                    break;
                case POST_PROJECT:
                    navigate(`/projects/${project?.createProjectCode}`)
                    break;
                default:
            }
            dispatch({ type: RESET_MESSAGE })
        }
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
                ? <section className={styles.project_section}>
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
                                    const { projectCode, projectDeadline, projectDescription, projectLockedStatus, projectManagerDeptName, projectManagerName, projectMemberCount, projectProgressStatus, projectTitle, myParticipationStatus } = project;
                                    return (
                                        <div key={projectCode} onClick={() => projectClickHandler(projectCode)}
                                            className={styles.project_element_wrap}>
                                            {myParticipationStatus === 1
                                                && <>
                                                    <div className={styles.participation} />
                                                    <div className={styles.participation_text}>
                                                        ME
                                                    </div>
                                                </>}
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
                                                    <div className={styles.project_element_progress_status} style={{ color: colorType(projectProgressStatus) }}>{projectProgressStatus}</div>
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
                </section>
                : <section className={styles.create_section}>
                    <div className={styles.create_header}>
                        <div className={styles.create_header_title}>프로젝트 생성</div>
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
                            <button
                                className={styles.create_exit_button}
                                onClick={gobackHandler}
                            >뒤로가기</button>
                            <button onClick={submitHandler}>수정하기</button>
                        </div>
                    </div>
                </section>
            }

        </div >
    )
}

export default ProjectMain
