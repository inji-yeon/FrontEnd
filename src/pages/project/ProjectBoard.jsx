import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { callGetProjectAPI, callResetCreateProjectCode, callResetGetProjects } from "../../apis/ProjectAPICalls";

function ProjectBoard() {
    const dispatch = useDispatch();
    const { projectCode } = useParams(); // 여기에는 생성에 성공하든 뭐든 값이 들어올 것

    useEffect(() => {
        dispatch(callResetGetProjects());
        // dispatch(callGetProjectAPI({ projectCode }));
    }, [])


    return (
        <>
            <div>프로젝트 페이지 : {projectCode}</div>
        </>
    )
}

export default ProjectBoard;