import './createPost.css';

const CreatePost = () => {


    return <>

        <div className="CreatePost">
        <h2>글쓰기</h2>

        <br />

        <table style={{textAlign: 'left'}}>

            <tbody>
                <tr>
                    <th>게시판 분류</th>
                    <td style={{paddingRight: '-30px'}}>
                        <select>
                            <option>사내게시판</option>
                            <option>부서게시판</option>
                            <option>익명게시판</option>
                        </select>

                        <select>
                            <option>하위게시판</option>
                            <option>과 관련된</option>
                            <option>게시판들</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <th>제목</th>
                    <td><input type="text" textarea="제목" style={{width: '100%'}} /></td>
                </tr>

                <tr>
                    <th>파일 첨부</th>
                    {/* 파일이름과 목록으로 보여져야 한다 */}
                    <td>
                        <div className="input_area" style={{backgroundColor: '#F5F5F5'}}>
                        <input type="file" name="file" title="파일선택" multiple="" accept="undefined"
                            style={{width: '100%' ,minHeight: '200px'}} />	
                        
                        </div>
                        <div className="msg">이 곳에 파일을 드래그 하세요. 또는
                            <span className="txt">파일선택</span><br />
                            
                            <span id="total_size" className="size">( 0MB )</span>
                        </div>

                    </td>
                </tr>

            </tbody>

        </table>


        <textarea className="summernote" name=""></textarea>

        <br />
        <table>
            <tbody>


                <tr>
                    <th>직원 알림 설정</th>
                    <td>
                        
                        <input type="checkbox" id="myDept"/>
                        <label for="myDept">부서 알림</label>
                        <span><input type="checkbox" id="isEmployee" />
                        <label for="isEmployee">직원 추가</label></span>
                        
                        <div id="addEmployees" style={{display: 'none', position: 'absolute'}}>
                            <div style={{backgroundColor: '#F5F5F5', padding: '6px 13px'}}>
                                <span style={{paddingRight: '15px'}}>차윤하 팀장</span>
                                <span>차윤하 팀장</span>
                            </div>
                            <div>특정 직원에게 알림을 설정할 수 있습니다.</div>
                        </div>


                    </td>
                </tr>

                <tr>
                    <th>공지글 설정</th>
                    <td>
                        <span><input type="checkbox" id="addNotice"/></span>
                        <div id="dateNotice" style={{display: 'none', position: 'absolute'}}><input type="date" /></div>
                    </td>
                
                </tr>

            </tbody>

        </table>

            <div style={{textAlign: 'right'}}>
                <button type="submit" className="btn">임시 저장</button>
                <button type="submit" className="btn" style={{letterSpacing: 1 +'px'}}>제출</button>
            </div>

        </div>
    
    </>
}

export default CreatePost;