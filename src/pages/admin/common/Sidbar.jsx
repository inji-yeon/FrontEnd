import { Outlet, useNavigate } from "react-router-dom";

function AdminSidebar() {
    let navigate = useNavigate();
    const sidebarMenuSelectHandler = (value) => {
        const box = document.querySelector('.selected_box');
        const texts = ['mail', 'group', 'approval'];
        for (let i = 0; i < texts.length; i++) {
            document.getElementById(texts[i]).style.color = '#606060';
            if (value === texts[i]) {
                document.getElementById(texts[i]).style.color = 'white';
            }
        }
        box.style.opacity = '1';

        switch (value) {
            case 'main':
                box.style.opacity = '0';
                navigate('/main');
                break;
            case 'mail':
                box.style.top = '125px';
                navigate('/admin/mail');
                break;
            case 'group':
                box.style.top = '210px';
                navigate('/admin/group');
                break;
            case 'approval':
                box.style.top = '293px';
                navigate('/admin/approval');
                break;
            default:
                box.style.display = 'none';

        }

    }

    return (
        <>
            <div className="sidemenu" style={{ display: 'flex' }}>
                <div onClick={() => { sidebarMenuSelectHandler('main') }} className="company_name">Admin Page</div>
                <div className="sidemenu_list">
                    <ul>
                        <div className="selected_box"></div>
                        <li onClick={() => { sidebarMenuSelectHandler('mail') }}>
                            <div id="mail">메일 관리</div>
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
            <Outlet />
        </>
    )
}

export default AdminSidebar;