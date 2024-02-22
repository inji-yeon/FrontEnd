import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartment } from '../../apis/AdminAPI';
import { fet, fetObj } from '../../apis/MailAPI';
import { useWebSocket } from '../../component/WebSocketContext';

function AdminMail(){
    const wc = useWebSocket();
    const dispatch = useDispatch();
    window.jQuery = require('jquery');
    const RichTextEditor = require('../../component/common/SummerNote').default;
    const [content, setContent] = useState('');
    const handleContent = (e) => {  //섬머노트에 쓴거
        setContent(e);
    }
    const [조직, set조직] = useState([]);
    const [팀, set팀] = useState([]);
    const [선택한조직, set선택한조직] = useState('');
    const [선택한팀, set선택한팀] = useState('');

    useEffect(()=>{
        console.log('조직은:',조직);
    },[조직])

    const department = useSelector(state => {
        if(state){
            if(state.admin){
                if(state.admin.data){
                    if(state.admin.data.data){
                        return state.admin.data.data;
                    }
                }
            }
        }
    });
    useEffect(()=>{
        if(department){
            console.log('ss',department);
            var 조직배열 = [];
            var 팀배열 = [];
            for(let i =0; i<department.length; i++){
                if(department[i].parentDepartmentCode == null){
                    console.log('부모');
                    조직배열.push(department[i]);
                } else {
                    팀배열.push(department[i]);
                }
            }
            set조직(조직배열);
            set팀(팀배열);
        }
    },[department])

    useEffect(()=>{
        //첫 로딩 조직,부서,팀 가져오기 리덕스로    메일 전송은 대충 fetch로 여기서 바로 하자 리덗 필요없자너
        dispatch(getDepartment());
    },[])

    const [selecedOption, setSelecedOption] = useState();
    const [message, setMessage] = useState('옵션을 선택하지 않으면 모두에게 발송됩니다.');
    const [isDisable, setIsDisable] = useState(true);
    const 조직핸들러 = (e) => {
        setMessage('팀을 선택하세요.');
        setIsDisable(false);
        set선택한조직(e.target.value);
    }
    const 팀핸들러 = (e) =>{
        setMessage('');
        set선택한팀(e.target.value);
    }
    const 메일전송 = () => {
        if(선택한조직){
            if(선택한팀){
                //둘다 선택함 그러니까 팀으로 검색해야함
                const 발송내용 = {
                    emailContent: content,
                    emailTite: '관리자 전체 발송',
                    status2: 선택한팀,
                }
                wc.publish({
                    destination: '/app/mail/alert/admin/send2',
                    headers : {Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')},
                    body: JSON.stringify(발송내용)
                });
            } else {
                //조직만 선택함 그러니까 조직으로 검색해서 원래 있던 그거 써야함
                const 발송내용 = {
                    emailContent: content,
                    emailTite: '관리자 전체 발송',
                    status: 선택한조직,
                }
                wc.publish({
                    destination: '/app/mail/alert/admin/send',
                    headers : {Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')},
                    body: JSON.stringify(발송내용)
                });
            }
        }else if(!선택한조직){
            //아무것도 선택안함 == 전체발송
            const 발송내용 = {
                emailContent: content,
                emailTite: '관리자 전체 발송',
                status: 'all',
            }
            wc.publish({
                destination: '/app/mail/alert/admin/send',
                headers : {Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')},
                body: JSON.stringify(발송내용)
            });
            
            console.log('발송함');
        }
    }
    useEffect(()=>{
        if(selecedOption === '조직'){
            

        } else if(selecedOption === '팀'){
            setMessage('');
        }
    },[selecedOption])
    return(
        <>  
            <div>
                <div>{message}</div>
                <select onChange={(e)=>{조직핸들러(e)}} className='조직' defaultChecked='none'>
                    <option value="none" hidden>조직을 선택하세요.</option>
                    {조직?.map((depart) => (
                        <option key={depart.departmentCode}>{depart.departmentName}</option>
                    )) }
                </select>
                <select disabled={isDisable} onChange={(e)=>{팀핸들러(e)}} className='팀' defaultChecked='none'>
                <option value="none" hidden>팀을 선택하세요.</option>
                    {팀?.map((team) => (
                            <option key={team.departmentCode}>{team.departmentName}</option>
                        )) }
                </select>
                <RichTextEditor content={content} onContentChange={(e)=>{handleContent(e)}} />
                <button onClick={()=>{메일전송()}}>전송하기</button>
            </div>
        </>
    )
}

export default AdminMail;