import { PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL } from '../constants/productConstants'
import { PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL } from '../constants/productConstants'
import { PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_FAIL } from '../constants/productConstants'
import { PRODUCT_BULK_CREATE_REQUEST,PRODUCT_BULK_CREATE_SUCCESS,PRODUCT_BULK_CREATE_FAIL, PRODUCT_BULK_CREATE_RESET } from '../constants/productConstants'
import { PRODUCT_CREATE_REVIEW_REQUEST,PRODUCT_CREATE_REVIEW_SUCCESS,PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


export const productListReducer = (state = {products: []} , action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true , products: []}
        case PRODUCT_LIST_SUCCESS:
            return {loading: false , products: action.payload.products , page : action.payload.page , pages: action.payload.pages}
        case PRODUCT_LIST_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state
    }  
}


export const productDetailListReducer = (state = {product: []} , action)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true , product: []}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false , product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state
    }  
}


export const productDeleteReducer=(state={},action)=>{
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading:true}
        case PRODUCT_DELETE_SUCCESS:
            return {loading:false , success: true}
        case PRODUCT_DELETE_FAIL:
            return {loading:false , error:action.payload}
        default:
            return state
    }
}


export const productCreateReducer=(state={products:[]}, action)=>{
    switch(action.type){
        case PRODUCT_BULK_CREATE_REQUEST:
            return {loading: true}
        case PRODUCT_BULK_CREATE_SUCCESS:
            return {loading: false , success: true , products: action.payload}
        case PRODUCT_BULK_CREATE_FAIL:
            return {loading: true , error: action.payload}
        case PRODUCT_BULK_CREATE_RESET:
            return {products:[]}
        default:
            return state
    }
}

export const productReviewCreateReducer=(state={},action)=>{
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading: true}
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading: false , success: true }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading: false , error: action.payload }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}