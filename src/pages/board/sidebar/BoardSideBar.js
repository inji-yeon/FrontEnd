import { useState, useEffect } from 'react';
import './boardSideBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { callGetBoardCategoryAPI } from '../../../apis/BoardAPICalls';
import { useNavigate } from 'react-router-dom';

const BoardSideBar = () => {

    const [companyMenuVisible, setcompanyMenuVisible] = useState(true);
    const [depMenuVisible, setDepMenuVisible] = useState(true);
    const [anonyMenuVisible, setAnonyMenuVisible] = useState(true);
    const [active, setActive] = useState(false);


    const navigate = useNavigate();
    const boardData = useSelector(state => state.boardReducer?.boardList);
    const dispatch = useDispatch();


    useEffect(() => {

        dispatch(callGetBoardCategoryAPI());
        setActive(true)
    }, []);


    console.log('boardData ', boardData);

    return <>
            <div className={`BoardSideBar fade-in ${active ? 'active' : ''}`}>
                <div className='board_name'>게시판</div>


                <div className='companyBoard'>
                    <div className='board_title_section' id='boardTitleSection' onClick={() => setcompanyMenuVisible(!companyMenuVisible)}
                     style={{ borderBottom: companyMenuVisible ? 'none' : '1px solid #ccc' }}
                     >
                        <span className='board_title'>사내게시판</span>
                    </div>

                    <div
                        className={`board_menu_section ${companyMenuVisible ? 'visible' : 'hidden'}`}
                        style={{
                        opacity: companyMenuVisible ? 1 : 0,
                        height: companyMenuVisible ? 'auto' : 0,
                        overflow: 'hidden',
                        transition: 'height 0.3s, opacity 0.3s'
                        }}>

                    {boardData?.boardList1?.map(board => 
                        <div onClick={() => navigate(`/board/${board.boardCode}/posts`)}><span>{board.boardTitle}</span></div>
                    
                    )}

                    </div>

                </div>


                <div className='depBoard'>
                    <div className='board_title_section' onClick={() => setDepMenuVisible(!depMenuVisible)}
                    style={{ borderBottom: depMenuVisible ? 'none' : '1px solid #ccc' }}>
                        <div className='board_title'>부서게시판</div>
                    </div>
                    
                    <div className={`board_menu_section ${depMenuVisible ? 'visible' : 'hidden'}`}
                    style={{
                    opacity: depMenuVisible ? 1 : 0,
                    height: depMenuVisible ? 'auto' : 0,
                    overflow: 'hidden',
                    transition: 'height 0.3s, opacity 0.3s'}}>

                        {boardData?.boardList2?.map(board => 
                            <div onClick={() => navigate(`/board/${board.boardCode}/posts`)}><span>{board.boardTitle}</span></div>
                        )}

                        {/* {boardData.filter(board => board.boardGroupCode === 2).map(board => 
                            <div onClick={() => navigate(`${board.boardCode}`)}><span>{board.boardTitle}</span></div>
                        )} */}

                    </div>
                </div>


                {/* <div className='anonyBoard'>

                    <div className='board_title_section'onClick={() => setAnonyMenuVisible(!anonyMenuVisible)}
                     style={{ borderBottom: anonyMenuVisible ? 'none' : 'none' }}>
                        <div className='board_title'>익명게시판</div>
                    </div>

                    <div className={`board_menu_section ${anonyMenuVisible ? 'visible' : 'hidden'}`}
                    style={{
                    opacity: anonyMenuVisible ? 1 : 0,
                    height: anonyMenuVisible ? 'auto' : 0,
                    overflow: 'hidden',
                    transition: 'height 0.3s, opacity 0.3s'}}>

                        {boardData.filter(board => board.boardGroupCode === 3).map(board => 
                            <div><span>{board.boardTitle}</span></div>
                        )}

                    </div>
                </div> */}

            </div>
    
            </>




}

export default BoardSideBar;
