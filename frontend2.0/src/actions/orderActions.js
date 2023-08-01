import { CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_FAIL } from '../constants/orderConstants'
import { ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL } from '../constants/orderConstants'
import { ORDER_PAY_REQUEST,ORDER_PAY_SUCCESS,ORDER_PAY_FAIL } from '../constants/orderConstants'
import { ORDER_LIST_REQUEST,ORDER_LIST_SUCCESS,ORDER_LIST_FAIL,ORDER_LIST_RESET } from '../constants/orderConstants'
import { CART_ITEMS_CLEAR } from '../constants/cartConstants'


import axios from 'axios'

export const createOrder=(order)=>async(dispatch , getState)=>{
    try{
        dispatch({type:CREATE_ORDER_REQUEST})
        const jwt_token=getState().userLogin.userInfo.token
        const body = order
        const config={
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${jwt_token}`
            },
        }
        const { data }=await axios.post(
            '/api/orders/add/',
            body,
            config,
        )
        dispatch({type : CREATE_ORDER_SUCCESS , payload : data })
        dispatch({type : CART_ITEMS_CLEAR , payload : data })
        localStorage.removeItem('cartItems')
    }
    catch(error){
        dispatch({
            type : CREATE_ORDER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getOrderDetails=(order_id)=>async(dispatch , getState)=>{
    try{
        dispatch({type:ORDER_DETAILS_REQUEST})
        const jwt_token=getState().userLogin.userInfo.token
        const config={
            headers:{
                'Content-type':'Application/json',
                'Authorization': `Bearer ${jwt_token}`
            },
        }
        const { data }=await axios.get(`/api/orders/${order_id}`,
                                        config)
        dispatch({type:ORDER_DETAILS_SUCCESS , payload:data})
    }
    catch(error){
        dispatch({
            type : ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const payForOrder=(order_id , paymentResult)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ORDER_PAY_REQUEST})
        const body=paymentResult
        const jwt_token=getState().userLogin.userInfo.token
        const config={
            headers:{
                'Content-type':'application/json',
                'Authorization': `Bearer ${jwt_token}`
            }
        }
        const {data}=await axios.put(`/api/orders/${order_id}/pay/`,
                        body,
                        config)
        dispatch({type:ORDER_PAY_SUCCESS , payload:data})
    }
    catch(error){
        dispatch({
            type : ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listMyOrders=()=>async(dispatch,getState)=>{
    try{
        dispatch({type:ORDER_LIST_MY_REQUEST})
        const jwt_token=getState().userLogin.userInfo.token
        const config={
            headers:{
                'Content-type':'Application/json',
                'Authorization':`Bearer ${jwt_token}`
            }
        }
        const { data }=await axios.get('/api/orders/myorders/',
                                        config)
        dispatch({type:ORDER_LIST_MY_SUCCESS , payload : data})
    }
    catch(error){
        dispatch({
            type:ORDER_LIST_MY_FAIL,
            payload :error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,  
        })
    }
}



export const listOrders=()=>async(dispatch,getState)=>{
    try{
        dispatch({type:ORDER_LIST_REQUEST})
        const jwt_token=getState().userLogin.userInfo.token
        const config={
            headers:{
                'Content-type':'Application/json',
                'Authorization':`Bearer ${jwt_token}`
            }
        }
        const { data }=await axios.get('/api/orders',
                                        config)
        dispatch({type:ORDER_LIST_SUCCESS , payload : data})
    }
    catch(error){
        dispatch({
            type:ORDER_LIST_FAIL,
            payload :error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,  
        })
    }
}