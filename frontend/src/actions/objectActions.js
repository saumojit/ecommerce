import { OBJECT_LIST_SORT_REQUEST , OBJECT_LIST_SORT_SUCCESS , OBJECT_LIST_SORT_FAIL } from '../constants/objectConstants'

export const sortObjectList=(objectList,columnHead,ascending,columnType)=>async(dispatch,getState)=>{
    try{
        dispatch({type:OBJECT_LIST_SORT_REQUEST})
        let { data }={}
        //myorders.sort((a,b)=>a.createdAt < b.createdAt ? 1 : -1)
        if(ascending){
            if(columnType==="Number"){
                data=objectList.sort((a,b)=>Number(a[columnHead]) > Number(b[columnHead]) ? 1 : -1)
            }
            else{
                data=objectList.sort((a,b)=>a[columnHead] > b[columnHead] ? 1 : -1)
            }
            
        }else{
            if(columnType==="Number"){
                data=objectList.sort((a,b)=>Number(a[columnHead]) < Number(b[columnHead]) ? 1 : -1)
            }
            else{
                data=objectList.sort((a,b)=>a[columnHead] < b[columnHead] ? 1 : -1)
            }
        }
        dispatch({type:OBJECT_LIST_SORT_SUCCESS , payload : data})
    }
    catch(error){
        dispatch({
            type:OBJECT_LIST_SORT_FAIL,
            payload :error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,  
        })
    }
}


