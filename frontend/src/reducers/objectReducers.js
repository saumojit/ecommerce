import { OBJECT_LIST_SORT_REQUEST , OBJECT_LIST_SORT_SUCCESS , OBJECT_LIST_SORT_FAIL , OBJECT_LIST_SORT_RESET} from '../constants/objectConstants'

export const objectListSortReducer=(state={} , action)=>{
    switch(action.type){
        case OBJECT_LIST_SORT_REQUEST:
            return {loading:true}
        case OBJECT_LIST_SORT_SUCCESS:
            return {loading:false , success: true , sortedObjects:action.payload}
        case OBJECT_LIST_SORT_FAIL:
            return {loading:false , error:action.payload}
        case OBJECT_LIST_SORT_RESET:
            return {}
        default:
            return state
    }
}