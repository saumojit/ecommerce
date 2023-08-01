import {
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,

    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,
    CART_ITEMS_CLEAR,
    } from '../constants/cartConstants'

export const cartReducer = (state = {cartItems :  localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] , shippingAddress:[] , paymentMethod:[]} , action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item=action.payload
            const existItem=state.cartItems.find(x => x.product === item.product)

            if(existItem){
                return{
                    ...state ,
                    cartItems : state.cartItems.map(x=>
                        x.product === existItem.product ? item : x
                        )
                }
            }
            else{
                return {
                    ...state,cartItems:[...state.cartItems , item]
                }
            }

        case CART_REMOVE_ITEM:
            const itemToRemove=action.payload
            const itemIdToRemove=itemToRemove.product
            return{
                ...state ,
                cartItems : state.cartItems.filter(x=>x.product!==itemIdToRemove)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state,shippingAddress: action.payload}

        case CART_SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod: action.payload}

        case CART_ITEMS_CLEAR:
            return {...state , cartItems : []}

        default:
            return state
    }
}
