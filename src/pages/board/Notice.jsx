import { useParams } from "react-router-dom";

function Notice(){

   const {boardCode} = useParams(); //이름 파라미터


    return (<>
        <div>공지</div>
        <div>공지</div>
        <div>공지</div>
        <div>공지</div>

    
    </>);
}

export default Notice;
