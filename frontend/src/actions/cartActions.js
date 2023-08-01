import axios from 'axios'


import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,
    
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,
    } from '../constants/cartConstants'

export const addToCart = (id,qty)=> async(dispatch , getState)=>{
    const { data }=await axios.get(`/api/products/${id}`)

    dispatch({
        type:CART_ADD_ITEM ,
        payload : {
            product : data._id ,
            name : data.name ,
            image : data.image ,
            price : Number(data.price) ,
            countInStock : data.countInStock ,
            qty : qty
        }
    })

    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch , getState) =>{
    dispatch({
        type:CART_REMOVE_ITEM ,
        payload : {
            product : id
        } ,
    })
    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress=(shippingData)=>(dispatch)=>{
    dispatch({type:CART_SAVE_SHIPPING_ADDRESS , payload:shippingData})
    localStorage.setItem('shippingAddress',JSON.stringify(shippingData))
}


export const savePaymentMethod=(paymentMethodData)=>(dispatch)=>{
    dispatch({type:CART_SAVE_PAYMENT_METHOD , payload:paymentMethodData})
    localStorage.setItem('paymentMethod',JSON.stringify(paymentMethodData))
}