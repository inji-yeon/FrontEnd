import { useParams } from "react-router-dom";

function ProjectBoard() {
    const { projectCode } = useParams();

    return (
        <>
            {/* 이 곳은 프로젝트 게시판 입니다. */}
            <div>프로젝트 페이지 : {projectCode}</div>
        </>
    )
}

export default ProjectBoard;