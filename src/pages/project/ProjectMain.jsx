import { useEffect, useState } from 'react';
import styles from './projectMain.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { callGetProjectsAPI } from '../../apis/ProjectAPICalls';

function ProjectMain() {
    const dispatch = useDispatch();
    const project = useSelector(state => state.project)
    const [projectData, setProjectData] = useState(null);
    const [projectType, setProjectType] = useState('all');
    const [searchValue, setSearchValue] = useState('');

    const selectedStyle = {
        backgroundColor: "#fa9a85",
        color: 'white'
    }
    useEffect(() => {
        project && setProjectData(project);
    }, [project])
    useEffect(() => {
        projectType && dispatch(callGetProjectsAPI({ projectType, searchValue }))
    }, [projectType])
    useEffect(() => {
        console.log('projectData>>>', projectData);
    }, [projectData])

    return (
        <div className={styles.project_main}>
            {/* 이 곳은 프로젝트 페이지 입니다. */}
            <div className={styles.sidemenu2}>
                <div className={styles.sidemenu2_title}>프로젝트</div>
                <ul>
                    <li style={projectType === 'all' ? selectedStyle : null} onClick={() => setProjectType('all')}>
                        <div>전체 프로젝트</div>
                    </li>
                    <li style={projectType === 'me' ? selectedStyle : null} onClick={() => setProjectType('me')}>
                        <div>내 프로젝트</div>
                    </li>
                    <li style={projectType === 'myDept' ? selectedStyle : null} onClick={() => setProjectType('myDept')}>
                        <div>내 부서 프로젝트</div>
                    </li>
                </ul>
            </div>
            <section className={styles.project_section}>
                <div className={styles.project_header}>
                    <div className={styles.project_header_title}>전체 프로젝트</div>
                    <div className={styles.project_input_wrap}>
                        <input
                            className={styles.project_search_input}
                            name='searchText'
                            type='text'
                            placeholder='프로젝트 검색'
                        />
                        <input
                            className={styles.project_search_button}
                            type='button'
                            value='검색'
                        />
                        <input
                            className={styles.project_create_button}
                            type='button'
                            value='프로젝트 만들기'
                        />
                    </div>
                </div>
                <div className={styles.project_body}>
                    <div className={styles.project_list_wrap}>
                        <div>
                            <table>
                                <tbody>
                                    <tr className={styles.project_element_row_1}>
                                        <td colSpan='2'>
                                            <div>
                                                <span className={styles.project_element_title}>
                                                    회사 로고 변경을 위한 아이디어
                                                </span>
                                                <span className={styles.project_element_dept}>
                                                    개발본부, OOO, OOO, OOO
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className={styles.project_element_row_2}>
                                        <td>
                                            <div></div>
                                        </td>
                                        <td className={styles.project_element_duedate}>
                                            <div> ~2024년 1월 23일</div>
                                        </td>
                                    </tr>
                                    <tr className={styles.project_element_row_3}>
                                        <td className={styles.project_element_status}>
                                            <div>기획중</div>
                                        </td>
                                        <td className={styles.project_element_info}>
                                            <div>
                                                <img src='' alt='잠금여부' />
                                                <img src='' alt='인원:' />
                                                <span>2</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className={styles.project_contains_me}></div>
                            <div className={styles.project_contains_me_text}>Me</div>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className={styles.project_footer}>
                    <input type='button' value='<<' />
                    <input type='button' value='<' />
                    <input type='button' value='1' />
                    <input type='button' value='2' />
                    <input type='button' value='3' />
                    <input type='button' value='4' />
                    <input type='button' value='5' />
                    <input type='button' value='6' />
                    <input type='button' value='7' />
                    <input type='button' value='8' />
                    <input type='button' value='9' />
                    <input type='button' value='10' />
                    <input type='button' value='>' />
                    <input type='button' value='>>' />
                </div>
            </section>
        </div>
    )
}

export default ProjectMain
