import { useEffect, useState } from 'react';
import styles from './projectMain.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { callGetProjectsAPI } from '../../apis/ProjectAPICalls';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function ProjectMain() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const project = useSelector(state => state.project)
    const [projectList, setProjectList] = useState([]);
    const [projectPageInfo, setProjectPageInfo] = useState(null);
    const [projectType, setProjectType] = useState('all');
    const [searchValue, setSearchValue] = useState('');
    const [pageRange, setPageRange] = useState([]);
    // const [isCreateWindow, setIsCreateWindow] = useState(false);
    const [isCreateWindow, setIsCreateWindow] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [descriptionValue, setDescriptionValue] = useState('');
    const [deadlineValue, setDeadlineValue] = useState(format(new Date(), "yyyy-MM-dd", { timeZone: 'Asia/Seoul' }));

    const selectedStyle = {
        backgroundColor: "#fa9a85",
        color: 'white'
    }
    useEffect(() => {
        setProjectList(project?.projectListWithPaging?.data);
        setProjectPageInfo(project?.projectListWithPaging?.pageInfo);
    }, [project?.projectListWithPaging])
    useEffect(() => {
        projectType && dispatch(callGetProjectsAPI({ projectType, searchValue }))
    }, [projectType])
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

    const pagingButtonHandler = (offset) => {
        dispatch(callGetProjectsAPI({ projectType, searchValue, offset }));
    }

    const projectClickHandler = (projectCode) => {
        navigate(`/projects/${projectCode}`)
    }

    const projectCreateHandler = () => {
        setIsCreateWindow(!isCreateWindow)
    }

    const descriptionValueHandler = (e) => {
        const maxLength = 200;
        if (e.target.value.length <= maxLength) {
            setDescriptionValue(e.target.value);
        }
    }
    const deadlineValueHandler = (e) => {
        setDeadlineValue(e.target.value)
    }

    const gobackHandler = () => {
        window.location.reload();
    }

    return (
        <div className={styles.project_main}>
            {/* 이 곳은 프로젝트 페이지 입니다. */}
            <div className={styles.sidemenu2}>
                <div className={styles.sidemenu2_title}>프로젝트</div>
                <ul>
                    <li style={!isCreateWindow && projectType === 'all' ? selectedStyle : null} onClick={() => { setProjectType('all'); setIsCreateWindow(false) }}>
                        <div>전체 프로젝트</div>
                    </li>
                    <li style={!isCreateWindow && projectType === 'me' ? selectedStyle : null} onClick={() => { setProjectType('me'); setIsCreateWindow(false); }}>
                        <div>내 프로젝트</div>
                    </li>
                    <li style={!isCreateWindow && projectType === 'myDept' ? selectedStyle : null} onClick={() => { setProjectType('myDept'); setIsCreateWindow(false) }}>
                        <div>내 부서 프로젝트</div>
                    </li>
                </ul>
            </div>
            {!isCreateWindow
                && <section className={styles.project_section}>
                    <div className={styles.project_header}>
                        <div className={styles.project_header_title}>{(projectType === 'all' ? '전체 프로젝트'
                            : (projectType === 'me' ? '내 프로젝트' : '내 부서 프로젝트'))}</div>
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
                    </div>
                    <div className={styles.project_body}>
                        <div className={styles.project_list_wrap}>
                            {
                                projectList?.map(project => {
                                    const { projectCode, projectDeadline, projectDescription, projectLockedStatus, projectManagerDeptName, projectManagerName, projectMemberCount, projectProgressStatus, projectTitle } = project;
                                    return (
                                        <div key={projectCode} onClick={() => projectClickHandler(projectCode)}>
                                            <table>
                                                <tbody>
                                                    <tr className={styles.project_element_row_1}>
                                                        <td colSpan='2'>
                                                            <div>
                                                                <span className={styles.project_element_title}>
                                                                    {projectTitle}
                                                                </span>
                                                                <span className={styles.project_element_dept}>
                                                                    { }
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className={styles.project_element_row_2}>
                                                        <td>
                                                            <div>관리자: {projectManagerName}</div>
                                                        </td>
                                                        <td className={styles.project_element_duedate}>
                                                            <div>~ {format(projectDeadline, "yyyy-MM-dd", { timeZone: 'Asia/Seoul' })} 까지</div>
                                                        </td>
                                                    </tr>
                                                    <tr className={styles.project_element_row_3}>
                                                        <td className={styles.project_element_status}>
                                                            <div>{projectDescription}</div>
                                                        </td>
                                                        <td className={styles.project_element_info}>
                                                            {projectLockedStatus ? <img src='/project/lock.png' alt='잠금' className={styles.lock_img} /> : ''}
                                                            <img src='/project/member_count.png' alt='인원:' />
                                                            <span>{projectMemberCount}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.project_footer}>
                        {/* ${styles.page_button_clicked} */}
                        <input type='button' value='<<' onClick={() => { pagingButtonHandler(1) }} className={`${styles.page_button}`} />
                        <input type='button' value='<' onClick={() => { projectPageInfo?.prev && pagingButtonHandler(projectPageInfo?.cri.pageNum - 1) }} className={`${styles.page_button}`} />
                        {
                            pageRange.map((page) => (
                                <input key={page} type='button' value={page} onClick={() => { pagingButtonHandler(page) }} className={`${styles.page_button} ${projectPageInfo?.cri.pageNum === page ? styles.page_button_clicked : ''}`} />
                            ))
                        }
                        <input type='button' value='>' onClick={() => { projectPageInfo?.next && pagingButtonHandler(projectPageInfo?.cri.pageNum + 1) }} className={`${styles.page_button}`} />
                        <input type='button' value='>>' onClick={() => { pagingButtonHandler(projectPageInfo?.realEnd) }} className={`${styles.page_button}`} />
                    </div>
                </section>}
            {isCreateWindow
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
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>마감기한</th>
                                <td><input
                                    type='date'
                                    value={deadlineValue}
                                    min={format(new Date(), 'yyyy-MM-dd', { timeZone: 'Asia/Seoul' })}
                                    onChange={deadlineValueHandler}
                                    className={styles.deadline}
                                /></td>
                            </tr>
                            <tr>
                                <th className={styles.description_text}>설명</th>
                                <td>
                                    <textarea
                                        value={descriptionValue}
                                        onChange={descriptionValueHandler}
                                        maxLength={200}
                                        className={styles.description_textarea}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>잠금여부</th>
                                <td>
                                    <div className={styles.custom_checkbox}>
                                        <label htmlFor="lockCheckbox" className={`${styles.custom_checkbox_label} ${isChecked ? styles.custom_checkbox_checked : ''}`} />
                                        <input id='lockCheckbox' type='checkbox' className={styles.custom_checkbox_input} value={isChecked} onChange={() => setIsChecked(!isChecked)} />
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
                        // onClick={createCompleteHandler}
                        />
                    </div>
                </section>}

        </div>
    )
}

export default ProjectMain
