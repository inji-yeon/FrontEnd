import { useDispatch, useSelector } from 'react-redux'
import styles from './projectPost.module.css'
import { useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'
import {
    callCreateProjectPostAPI,
    callGetProjectPostListAPI,
    callUploadImage
} from '../../apis/ProjectAPICalls'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import { Editor, Viewer } from '@toast-ui/react-editor'
import chartPlugin from '@toast-ui/editor-plugin-chart'
import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight'
import colorPlugin from '@toast-ui/editor-plugin-color-syntax'
import tableMergedCellPlugin from '@toast-ui/editor-plugin-table-merged-cell'
import umlPlugin from '@toast-ui/editor-plugin-uml'
import { CREATE_PROJECT_POST, RESET_MESSAGE } from '../../modules/ProjectModule'

function ProjectPost({ projectCode }) {
    const dispatch = useDispatch()
    const project = useSelector(state => state.project)
    const [postList, setPostList] = useState({
        data: [],
        pageInfo: null
    })
    const [searchValue, setSearchValue] = useState('')
    const [pageRange, setPageRange] = useState([])
    const editorRef = useRef()
    const postListRef = useRef();
    const [editor, setEditor] = useState(null)
    const [editorText, setEditorText] = useState('')
    const [uploadImageList, setUploadImageList] = useState([])
    const [editorElement, setEditorElement] = useState(null);

    useEffect(() => {
        dispatch(callGetProjectPostListAPI({ projectCode, searchValue }))
    }, [])
    useEffect(() => {
        if (editorRef) {
            setEditor(editorRef.current.getInstance())
            setEditorElement(editorRef.current.getRootElement())
        }
    }, [editorRef])
    useEffect(() => {
        if (editorElement) {
            editorElement.style.borderRadius = "5px"
            editorElement.querySelector('.toastui-editor-toolbar').style.backgroundColor = "hsl(12, 92%, 91%)"
            editorElement.querySelector('.toastui-editor-md-tab-container').style.backgroundColor = "hsl(12, 92%, 91%)"
            editorElement.querySelector('.toastui-editor-md-tab-container').style.borderBottom = "0"
            editorElement.querySelector('.toastui-editor-defaultUI-toolbar').style.backgroundColor = "hsl(12, 92%, 91%)"
            editorElement.querySelector('.toastui-editor-defaultUI-toolbar').style.borderBottom = "0"
            editorElement.querySelector('.toastui-editor-toolbar').style.borderTopLeftRadius = "4px"
            editorElement.querySelector('.toastui-editor-toolbar').style.borderTopRightRadius = "4px"
            editorElement.querySelector('.toastui-editor').style.borderBottomLeftRadius = "4px"
            editorElement.querySelector('.toastui-editor').style.borderBottomRightRadius = "4px"
            editorElement.querySelector('.toastui-editor-toolbar').style.borderBottom = "1px solid hsl(12,92%,85%)"
            editorElement.querySelectorAll('.toastui-editor-toolbar-icons').forEach(element => {
                element.style.backgroundColor = "hsl(12, 92%, 85%)"
                element.addEventListener('mouseover', () => {
                    element.style.backgroundColor = "hsl(12, 92%, 75%)"; // Change background color on hover
                });
                element.addEventListener('mouseout', () => {
                    element.style.backgroundColor = "hsl(12, 92%, 85%)"; // Restore original background color when not hovering
                });
            });
            editorElement.querySelector('.toastui-editor-mode-switch').style.backgroundColor = "hsl(12, 92%, 91%)"
            editorElement.querySelector('.toastui-editor').style.backgroundColor = "hsl(12, 92%, 98%)"
            editorElement.querySelector('.toastui-editor-md-preview').style.backgroundColor = "hsl(12, 92%, 98%)"
            editorElement.querySelector('.toastui-editor-md-preview').style.fontSize = "16px"
            editorElement.querySelector('.toastui-editor-contents').style.fontSize = "16px"
            editorElement.querySelector('.toastui-editor-defaultUI').style.border = "1px solid hsl(12,92%,85%)"
            editorElement.querySelectorAll('.tab-item').forEach(element => element.style.border = "1px solid hsl(12,92%,85%)")
            editorElement.querySelectorAll('.tab-item').forEach(element => element.style.borderBottom = "0")
            editorElement.querySelector('.toastui-editor-defaultUI').removeChild(editorElement.querySelector('.toastui-editor-mode-switch'));
            editorElement.querySelector('.ProseMirror').style.fontSize = "16px"
        }
    }, [editorElement])
    useEffect(() => {
        project?.uploadImageList && setUploadImageList(project?.uploadImageList)
    }, [project?.uploadImageList])
    useEffect(() => {
        if (editor) {
            editor.addHook('addImageBlobHook', (form, callback) => {
                const file = new FormData()
                file.append('file', form)
                dispatch(callUploadImage({ file, callback }))
            })
        }
    }, [editor])
    useEffect(() => {
        project?.projectPostListWithPaging &&
            setPostList(project?.projectPostListWithPaging)
    }, [project?.projectPostListWithPaging])

    useEffect(() => {
        if (postList.pageInfo) {
            const pageStart = postList?.pageInfo?.pageStart
            const pageEnd = postList?.pageInfo?.pageEnd
            const range = Array.from(
                { length: pageEnd - pageStart + 1 },
                (_, index) => index + pageStart
            )
            setPageRange(range)
            postListRef.current.scrollTo({ top: 0, behavior: 'smooth' })
            postListRef.current.querySelectorAll('.toastui-editor-contents')
                .forEach(element => element.style.fontSize = "16px")
        }
    }, [postList])

    const searchValueHandler = e => {
        setSearchValue(e.target.value)
    }
    const resetSearchValueHandler = () => {
        setSearchValue('')
    }
    const paging = (searchValue, offset) => {
        dispatch(callGetProjectPostListAPI({ projectCode, searchValue, offset }))
    }
    const searchHandler = () => {
        dispatch(callGetProjectPostListAPI({ projectCode, searchValue }))
    }

    const changeEditorHandler = e => {
        setEditorText(editor.getHTML())
    }
    const submitHandler = () => {
        const projectPost = {
            projectCode: projectCode,
            projectPostCreationDate: new Date(),
            projectPostContent: editorText,
            projectPostType: '수동',
            ProjectPostFileList: uploadImageList
        }
        dispatch(callCreateProjectPostAPI({ projectCode, projectPost }))
        editor.setHTML('')
    }
    useEffect(() => {
        if (project?.message) {
            switch (project?.message) {
                case CREATE_PROJECT_POST:
                    dispatch(callGetProjectPostListAPI({ projectCode }));
                    break;
                default:
            }
            dispatch({ type: RESET_MESSAGE })
        }
    }, [project?.message])
    return (
        <div className={styles.post_wrap}>
            <div className={styles.post_header}>
                <div className={styles.search_value_wrap}>
                    <input
                        type='text'
                        placeholder='내용 입력'
                        value={searchValue}
                        onChange={searchValueHandler}
                        className={styles.search_value_input}
                    />
                    <button onClick={resetSearchValueHandler} className={styles.clear_button}>x</button>
                </div>
                <button onClick={searchHandler} className={styles.search_button}>검색</button>
            </div>
            <div className={styles.post_list} ref={postListRef}>
                {postList?.data?.map(post => {
                    const employee = post?.projectMember?.employee;
                    return (
                        <div key={post.projectPostCode} className={styles.post_element}>
                            <div className={styles.post_profile_wrap}>
                                <img src={post?.projectMember?.employee?.profileList
                                    ?.filter(profile => profile?.profileDeleteStatus === "N")[0]?.profileChangedFile
                                    ? `http://${process.env.REACT_APP_RESTAPI_IP}:1208/web-images/${post?.projectMember?.employee?.profileList?.filter(profile => profile?.profileDeleteStatus === "N")[0]?.profileChangedFile}`
                                    : '임시 사진'} alt='프로필' />
                            </div>
                            <div className={styles.viewer_wrap}>
                                <div className={styles.arrow}></div>
                                <div className={styles.viewer_header}>
                                    <div><b>{employee?.employeeName} {employee?.job?.jobName}{project?.projectInfo?.projectManager?.employeeCode === employee?.employeeCode ? '(관리자)' : ''}</b></div>
                                    <div>{employee?.department?.departmentName}</div>
                                    <div className={styles.date}>{format(post.projectPostCreationDate, "yyyy-MM-dd HH:mm", { timeZone: 'Asia/Seoul' })}</div>
                                </div>
                                <div className={styles.viewer}>
                                    <Viewer
                                        initialValue={post.projectPostContent}
                                        plugins={[
                                            chartPlugin,
                                            codeSyntaxHighlightPlugin,
                                            //   colorPlugin,
                                            tableMergedCellPlugin,
                                            umlPlugin
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.post_selector}>
                <button
                    disabled={
                        postList?.pageInfo?.cri?.pageNum === 1 ||
                        postList?.pageInfo?.total === 0
                    }
                    onClick={() => {
                        paging(searchValue, 1)
                    }}
                >
                    &lt;&lt;
                </button>
                <button
                    disabled={!postList?.pageInfo?.prev}
                    onClick={() => {
                        paging(searchValue, postList?.pageInfo?.cri?.pageNum - 1)
                    }}
                >
                    &lt;
                </button>
                {pageRange?.map(page => {
                    return (
                        <button
                            key={page}
                            style={{
                                backgroundColor: postList?.pageInfo?.cri?.pageNum === page ? "hsl(12, 92%, 85%)" : ""
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
                    disabled={!postList?.pageInfo?.next}
                    onClick={() => {
                        paging(searchValue, postList?.pageInfo?.cri?.pageNum + 1)
                    }}
                >
                    &gt;
                </button>
                <button
                    disabled={
                        postList?.pageInfo?.cri?.pageNum === postList?.pageInfo?.realEnd ||
                        postList?.pageInfo?.total === 0
                    }
                    onClick={() => {
                        paging(searchValue, postList?.pageInfo?.pageEnd)
                    }}
                >
                    &gt;&gt;
                </button>
            </div>
            <div className={styles.post_editor_wrap}>
                <button onClick={submitHandler} className={styles.submit_button}>
                    보내기
                </button>
                <Editor
                    previewStyle='tab'
                    initialEditType='markdown'
                    toolbarItems={
                        [['heading', 'bold', 'italic', 'strike', 'hr', 'quote', 'ul', 'ol', 'task', 'table', 'image', 'link', 'code', 'codeblock']]
                    }
                    ref={editorRef}
                    plugins={[
                        chartPlugin,
                        codeSyntaxHighlightPlugin,
                        // colorPlugin,
                        tableMergedCellPlugin,
                        umlPlugin
                    ]}
                    placeholder='게시글을 입력하세요.'
                    initialValue={editorText}
                    // usageStatistics={false}
                    onChange={changeEditorHandler}
                />
            </div>
        </div>
    )
}

export default ProjectPost
