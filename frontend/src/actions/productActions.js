import axios from 'axios'

import { PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL } from '../constants/productConstants'
import { PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL } from '../constants/productConstants'
import { PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS,PRODUCT_DELETE_FAIL } from '../constants/productConstants'
import { PRODUCT_BULK_CREATE_REQUEST,PRODUCT_BULK_CREATE_SUCCESS,PRODUCT_BULK_CREATE_FAIL } from '../constants/productConstants'
import { PRODUCT_CREATE_REVIEW_REQUEST,PRODUCT_CREATE_REVIEW_SUCCESS,PRODUCT_CREATE_REVIEW_FAIL } from '../constants/productConstants'


export const listProducts = (keyword='') => async (dispatch) => {
    try{
        dispatch({type : PRODUCT_LIST_REQUEST})
        // keyword format : ?keyword=Morbius // earlier it was only /api/products/
        const { data } = await axios.get(`/api/products${keyword}`)
        dispatch({
            type : PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type : PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listProductDetail = (id) => async(dispatch)=>{
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const {data}=await axios.get(`/api/products/${id}`)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type : PRODUCT_DETAILS_FAIL ,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message, 
        })
    }
}


export const deleteProduct=(productid)=>async(dispatch,getState)=>{
    try{
        dispatch({type: PRODUCT_DELETE_REQUEST})
        const jwt_token=getState().userLogin.userInfo.token
        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization':`Bearer ${jwt_token}`
            }
        }
        const { data } = await axios.delete(`/api/products/delete/${productid}/` , config)
        dispatch({type: PRODUCT_DELETE_SUCCESS , payload: data})
    }
    catch(error){
        dispatch({
            type : PRODUCT_DELETE_FAIL ,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message, 
        })
    }
}


export const createProducts=(dataFromExcel)=>async(dispatch , getState)=>{
    try{
        dispatch({type:PRODUCT_BULK_CREATE_REQUEST})
        const jwt_token = getState().userLogin.userInfo.token
        const config = {
            headers:{
                'Content-type': 'application/json' , 
                'Authorization' : `Bearer ${jwt_token}`
            }
        }
        
        
        // const body={
        //     'name': dataFromExcel[0]['NAME'] ,
        //     'brand': dataFromExcel[0]['BRAND'] ,
        //     'category': dataFromExcel[0]['CATEGORY'] ,
        //     'description': dataFromExcel[0]['DESCRIPTION'] ,
        //     'rating': 0,
        //     'numReviews': 0 ,
        //     'price': dataFromExcel[0]['PRICE ($)'] ,
        //     'countInStock': dataFromExcel[0]['COUNT IN STOCK'] ,
        // }

        // sample structure
        // const body={
        //     'name': 'sample',
        //     'brand': 'sample',
        //     'category': 'sample',
        //     'description': 'sample',
        //     'rating': 0,
        //     'numReviews': 0 ,
        //     'price': 0 ,
        //     'countInStock': 0 ,
        // }

        const getCompatibleObjects=(prow)=>{
            return {
                'name': prow['NAME'] ,
                'brand': prow['BRAND'] ,
                'category': prow['CATEGORY'] ,
                'description': prow['DESCRIPTION'] ,
                'rating': 0,
                'numReviews': 0 ,
                'price': prow['PRICE ($)'] ,
                'countInStock': prow['COUNT IN STOCK'] ,
            }
        }
        const body=dataFromExcel.map((product)=> getCompatibleObjects(product))
        const {data}=await axios.post('/api/products/create/' ,body , config)
        dispatch({ type: PRODUCT_BULK_CREATE_SUCCESS ,  payload: data })
    }
    catch(error){
        dispatch({
            type : PRODUCT_BULK_CREATE_FAIL ,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message, 
        })
    }
}


export const createProductReview=(productId , review_body)=>async(dispatch , getState)=>{
    try{
        dispatch({type:PRODUCT_CREATE_REVIEW_REQUEST})
        const jwt_token=getState().userLogin.userInfo.token
        const config={
            headers:{
                'Content-type':'application/json' ,
                'Authorization': `Bearer ${jwt_token}`
            }
        }
        // const body={
        //     "rating": rating,
        //     "comment" : comment
        // }
        const data=await axios.post(`/api/products/${productId}/reviews/` , review_body , config)
        dispatch({type: PRODUCT_CREATE_REVIEW_SUCCESS , payload: data})
    }
    catch(error){
        dispatch({
            type : PRODUCT_CREATE_REVIEW_FAIL ,
            payload : error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message, 
        })
    }
}