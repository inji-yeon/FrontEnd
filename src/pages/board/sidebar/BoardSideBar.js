import { useState, useEffect } from 'react';
import './boardSideBar.css'

const BoardSideBar = () => {

    const [companyMenuVisible, setcompanyMenuVisible] = useState(true);
    const [depMenuVisible, setDepMenuVisible] = useState(true);
    const [anonyMenuVisible, setAnonyMenuVisible] = useState(true);
    const [active, setActive] = useState(false);

    useEffect(() => {
        
        setActive(true)
    }, []);    

    return <>
            <div className={`BoardSideBar fade-in ${active ? 'active' : ''}`}>
                <div className='board_name'>게시판</div>

                <div className='companyBoard'>
                    <div className='board_title_section' id='boardTitleSection' onClick={() => setcompanyMenuVisible(!companyMenuVisible)}
                     style={{ borderBottom: companyMenuVisible ? 'none' : '1px solid #ccc' }}
                     >
                        {/* <img className="board_drop_down" src={arrowImg}/> */}
                        <span className='board_title'>사내게시판</span>
                    </div>

                    <div
                    className={`board_menu_section ${companyMenuVisible ? 'visible' : 'hidden'}`}
                    style={{
                    opacity: companyMenuVisible ? 1 : 0,
                    height: companyMenuVisible ? 'auto' : 0,
                    overflow: 'hidden',
                    transition: 'height 0.3s, opacity 0.3s'
                    }}
                    >
                        <div><span>사내 소식</span></div>
                        <div><span>IT 소식</span></div>
                        <div><span>IT 매뉴얼</span></div>
                        <div><span>회사 소개</span></div>
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
                        <div><span>개발부서</span></div>
                        <div><span>경영부서</span></div>

                    </div>

                </div>



                <div className='anonyBoard'>

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
                        <div><span>경영팀 익명게시판</span></div>
                        <div><span>개발부서 자유토론</span></div>
                    </div>

                </div>



            </div>
    
            </>




}

export default BoardSideBar;
