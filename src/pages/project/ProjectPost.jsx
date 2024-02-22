import { useDispatch, useSelector } from 'react-redux';
import styles from './projectPost.module.css'
import { useEffect, useRef, useState } from 'react';
import { callCreateProjectPostAPI, callGetProjectPostListAPI, callUploadImage } from '../../apis/ProjectAPICalls';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Editor, Viewer } from '@toast-ui/react-editor';
import chartPlugin from '@toast-ui/editor-plugin-chart';
import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight';
import colorPlugin from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCellPlugin from '@toast-ui/editor-plugin-table-merged-cell';
import umlPlugin from '@toast-ui/editor-plugin-uml';

function ProjectPost({ projectCode }) {
    const dispatch = useDispatch()
    const project = useSelector(state => state.project)
    const [postList, setPostList] = useState({
        data: [],
        pageInfo: null
    });
    const [searchValue, setSearchValue] = useState('');
    const [pageRange, setPageRange] = useState([]);
    const editorRef = useRef();
    const [editor, setEditor] = useState(null);
    const [editorText, setEditorText] = useState('');
    const [uploadImageList, setUploadImageList] = useState([]);

    useEffect(() => {
        console.log('asd');
        dispatch(callGetProjectPostListAPI({ projectCode, searchValue }));
    }, [])
    useEffect(() => {
        editorRef && setEditor(editorRef.current.getInstance());
    }, [editorRef])
    useEffect(() => {
        project?.uploadImageList && setUploadImageList(project?.uploadImageList)
    }, [project?.uploadImageList])
    useEffect(() => {
        console.log('uploadImageList', uploadImageList);
    }, [uploadImageList])
    useEffect(() => {
        if (editor) {
            console.log('editor.getHTML()', editor.getHTML());
            editor.addHook('addImageBlobHook', (form, callback) => {
                const file = new FormData();
                file.append('file', form);
                console.log('form>>>>>>', form);
                dispatch(callUploadImage({ file, callback }));
            })
        }
        // return () => {
        //     if (editor) {
        //         editor.removeHook('addImageBlobHook')
        //     }
        // }
    }, [editor])
    useEffect(() => {
        project?.projectPostListWithPaging && setPostList(project?.projectPostListWithPaging)
    }, [project?.projectPostListWithPaging]);

    useEffect(() => {
        console.log('postList', postList);
        if (postList.pageInfo) {
            console.log('postList.pageInfo', postList.pageInfo);
            const pageStart = postList?.pageInfo?.pageStart;
            const pageEnd = postList?.pageInfo?.pageEnd;
            console.log('pageStart', pageStart);
            console.log('pageEnd', pageEnd);
            const range = Array.from({ length: pageEnd - pageStart + 1 }, (_, index) => index + pageStart)
            setPageRange(range);
        }
    }, [postList])
    useEffect(() => {
        console.log('pageRange', pageRange);
    }, [pageRange])

    const searchValueHandler = (e) => {
        setSearchValue(e.target.value);
    }
    const resetSearchValueHandler = () => {
        setSearchValue('');
    }
    const paging = (searchValue, offset) => {
        dispatch(callGetProjectPostListAPI({ projectCode, searchValue, offset }))
    }


    const changeEditorHandler = (e) => {
        setEditorText(editor.getHTML())
    }
    useEffect(() => {
        console.log(editorText);
    }, [editorText])
    const commentHandler = () => {
        const projectPost = {
            projectCode: projectCode,
            projectPostCreationDate: new Date(),
            projectPostContent: editorText,
            projectPostType: '수동',
            ProjectPostFileList: uploadImageList
        }
        dispatch(callCreateProjectPostAPI({ projectCode, projectPost }))
    }
    return (
        <div className={styles.post_wrap}>
            <div className={styles.post_header}>
                <input type='text' placeholder='내용 입력' value={searchValue} onChange={searchValueHandler} />
                <input type='button' value='x' onClick={resetSearchValueHandler} />
                <button>게시글 검색</button>
            </div>
            <div className={styles.post_list}>
                {postList
                    ?.data
                    ?.map(post => {
                        return (
                            <div key={post.projectPostCode}
                                className={styles.viewer_wrap}>
                                <Viewer
                                    initialValue={post.projectPostContent}
                                // plugins={[chartPlugin, codeSyntaxHighlightPlugin, colorPlugin, tableMergedCellPlugin, umlPlugin]}
                                />
                            </div>)
                    })}
            </div>
            <div className={styles.post_selector}>
                <button disabled={postList?.pageInfo?.cri?.pageNum === 1 || postList?.pageInfo?.total === 0} onClick={() => { paging(searchValue, 1) }}>&lt;&lt;</button>
                <button disabled={!postList?.pageInfo?.prev} onClick={() => { paging(searchValue, postList?.pageInfo?.cri?.pageNum - 1) }}>&lt;</button>
                {pageRange?.map(page => {
                    return (
                        <button
                            key={page}
                            disabled={postList?.pageInfo?.cri?.pageNum === page}
                            onClick={() => { paging(searchValue, page) }}>
                            {page}</button>
                    )
                })}
                <button disabled={!postList?.pageInfo?.next} onClick={() => { paging(searchValue, postList?.pageInfo?.cri?.pageNum + 1) }}>&gt;</button>
                <button disabled={postList?.pageInfo?.cri?.pageNum === postList?.pageInfo?.realEnd || postList?.pageInfo?.total === 0} onClick={() => { paging(searchValue, postList?.pageInfo?.pageEnd) }}>&gt;&gt;</button>
            </div>
            <div className={styles.post_editor_wrap}>
                <button onClick={commentHandler}>보내기</button>
                <Editor
                    previewStyle='vertical'
                    initialEditType='markdown'
                    toolbarItems={[
                        ['heading', 'bold', 'italic', 'strike'],
                        ['hr', 'quote'],
                        ['ul', 'ol', 'task', 'indent', 'outdent'],
                        ['table', 'image', 'link'],
                        ['code', 'codeblock'],
                    ]}
                    ref={editorRef}
                    plugins={[chartPlugin, codeSyntaxHighlightPlugin, colorPlugin, tableMergedCellPlugin, umlPlugin]}
                    placeholder='게시글을 입력하세요.'
                    initialValue={editorText}
                    usageStatistics={false}
                    onChange={changeEditorHandler}
                />
            </div>
        </div >)
}

export default ProjectPost;