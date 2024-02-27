import { createActions, handleActions } from 'redux-actions';
/* 초기값 */
const initialState = {
    groupList:null,
    groupSearch:[]
}


export const GET_GROUPLIST = 'group/GET_GROUPLIST';
export const GET_GROUPSEARCH = 'group/GET_GROUPSEARCH';



const actions = createActions({
    [GET_GROUPLIST]: () => {},
    [GET_GROUPSEARCH]: () => {},

});


// 리듀서
const groupreducer = handleActions(
    {
        [GET_GROUPLIST]: (state, { payload }) => {
            // console.log('그룹에서 조직리스트 가져오는 모듈-------------')
            
            return payload;
          

        },
        [GET_GROUPSEARCH]: (state, { payload }) => {
            console.log('그룹에서 조직리스트 검색한 값  모듈---------------')
            
            return payload;
          
        },
        
    },
    initialState
    );



export default groupreducer;