import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { legacy_createStore as createStore,combineReducers,applyMiddleware } from 'redux'

import { cartReducer } from './reducers/cartReducers'
import {productListReducer,productDetailListReducer, productDeleteReducer , productCreateReducer , productReviewCreateReducer} from './reducers/productReducers'
import { userLoginReducer, userRegisterReducer,userDetailReducer,userUpdateReducer, userListReducer, userDeleteReducer } from './reducers/userReducers'
import { orderCreateReducer,orderDetailsReducer, orderPayReducer , orderListMyReducer ,orderListReducer } from './reducers/orderReducers'
import { objectListSortReducer } from './reducers/objectReducers'


//1
const reducer=combineReducers({
    productList : productListReducer ,
    productDetailList : productDetailListReducer ,
    cart : cartReducer ,
    userLogin : userLoginReducer , 
    userRegister : userRegisterReducer,
    userDetail : userDetailReducer,
    userUpdateDetail : userUpdateReducer ,
    orderCreate : orderCreateReducer ,
    orderDetails : orderDetailsReducer ,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer ,
    orderList: orderListReducer ,
    objectList:objectListSortReducer,
    userList:userListReducer,
    userDelete: userDeleteReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productReviewCreate : productReviewCreateReducer ,
    //For Shipping , There is no Separate Reducer // Handled with Cart Reducer
})

const cartItemsFromStorage=localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage=localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : []
const shippingAddressFromStorage=localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}


//2
const initialState = {
    cart : { cartItems : cartItemsFromStorage , shippingAddress : shippingAddressFromStorage} ,
    userLogin : { userInfo :userInfoFromStorage }
}

//3
const middleware= [thunk]

//1 //2 //3
const store=createStore(reducer , initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store