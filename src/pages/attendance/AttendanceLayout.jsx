import { Outlet } from "react-router-dom";
import AttendanceSide from "./AttendanceSide";

function AttendanceLayout() {

    const attendanceStyles = {
        position: 'absolute',
        display: 'grid',
        width: '95%',
        gridTemplateColumns: '326px 245px auto',
        top: '5px',
        left: '326px',

    };

    return(
        <>
            <div style={attendanceStyles}>
            <AttendanceSide />
            <Outlet />
            </div>
        </>
    )
}

export default AttendanceLayout