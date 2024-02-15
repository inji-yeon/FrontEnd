import { useNavigate } from "react-router-dom";

function AdminSidebar(){
    let navigate = useNavigate();
    const sidebarMenuSelectHandler = (value) => {
        const box = document.querySelector('.selected_box');
        const texts = ['mail','attendance','group','approval'];
        for(let i=0;i<texts.length;i++){
            document.getElementById(texts[i]).style.color = '#606060';
            if(value === texts[i]){
                document.getElementById(texts[i]).style.color = 'white';
            }
        }
        box.style.opacity = '1';

        switch (value) {
            case 'main':
                box.style.opacity = '0';
                navigate('/');
                break;
            case 'mail': 
                box.style.top = '125px'; 
                navigate('/admin/mail');
                break;
            case 'attendance': 
                box.style.top = '210px'; 

                break;
            case 'group': 
                box.style.top = '293px'; 

                break;
            case 'approval': 
                box.style.top = '376px'; 

                break;
            default:
                box.style.display = 'none';
            
        }

    }

    return (
        <>
            <div className="sidemenu">
                <div onClick={()=>{sidebarMenuSelectHandler('main')}} className="company_name">Admin Page</div>
                <div className="sidemenu_list">
                    <ul>
                        <div className="selected_box"></div>
                        <li onClick={() => { sidebarMenuSelectHandler('mail') }}>
                            <div id="mail">메일 관리</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('attendance') }}>
                            <div id="attendance">근태 관리</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('group') }}>
                            <div id="group">조직 관리</div>
                        </li>
                        <li onClick={() => { sidebarMenuSelectHandler('approval') }}>
                            <div id="approval">결재 관리</div>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default AdminSidebar;