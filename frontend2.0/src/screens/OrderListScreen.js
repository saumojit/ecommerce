import React , { useEffect } from 'react'
//import { useLocation } from 'react-router-dom'
import { Table ,Button , Row ,Col , Form } from 'react-bootstrap'
//import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Loader } from '../components/Loader'
import {Message} from '../components/Message'
import { listOrders } from '../actions/orderActions' 
import { deleteProduct } from '../actions/productActions' 



export const OrderListScreen = () => {
    const orderList=useSelector(state=>state.orderList)
    const { orders,loading,error } = orderList

    const userLogin=useSelector(state=>state.userLogin)
    const { userInfo }=userLogin

    const productDelete=useSelector(state=>state.productDelete)
    const { loading: loadingDelete , error: errorDelete , success: successDelete }=productDelete

    const orderCreate=useSelector(state=>state.orderCreate)
    const {success : successOrderCreate}=orderCreate

    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        if(userInfo && !Array.isArray(userInfo) && userInfo.isPortalAdmin){
            dispatch(listOrders())
        }
        else{
            navigate('/login')
        }
    },[dispatch,navigate ,userInfo , successDelete , successOrderCreate])


    const deliveryHandler=(productID)=>{
        if(window.confirm("Are You Sure To Confirm to Mark The Order as Delivered?")){
            dispatch(deleteProduct(productID))
            console.log('product marked delivered by admin')
        }
    }


    const sortHandler=(a,b)=>{
        console.log('inside product sorthnmdler')
    }

    return (
        <div>

            <Row className='align-items-center'>
                <Col><h1>Orders</h1></Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant="danger" children={errorDelete}/>}
            {
                loading ? <Loader/>
                    :( error ? <Message variant="danger" children={error}/> 
                        :(
                            <Table striped responsive="xl" hover className='table-sm'>
                                <thead style={{backgroundColor:"#504A56" , color:"white" , fontWeight:"bold"}}>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Tax Price</th>
                                    <th>Shipping Price</th>
                                    <th>Total Price</th>
                                    <th>Total Quantity</th>
                                    <th>Shipping City</th>
                                    <th>Customer Name</th>
                                    <th>Payment Mode</th>
                                    <th>Payment Status</th>
                                    <th>Payment Ref ID</th>
                                    <th>Delivery Status</th>
                                    <th>Delivered On</th>
                                    <th>Delivered By</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map((order)=>{
                                            return (
                                                    <tr key={order._id}>
                                                        <td>{order._id}</td>
                                                        <td>${order.taxPrice}</td>
                                                        <td>${order.shippingPrice}</td>
                                                        <td>${order.totalPrice}</td>
                                                        <td>{order.orderItems.length}</td>
                                                        <td>{order.shippingAddress.city}</td>
                                                        <td>{order.user.name}</td>
                                                        <td>{order.paymentMethod}</td>
                                                        <td>{order.isPaid ? "Completed" : "Pending"}</td>
                                                        <td>{"#PP-111-222-333"}</td>
                                                        <td>{order.isDelivered ? "Completed" : "Pending"}</td>
                                                        <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : "X"}</td>
                                                        <td>{"Deliverer Name"}</td>
                                                    </tr>
                                                    )
                                        })
                                    }
                                </tbody>
                            </Table>
                        )
                )
            }
        </div>
    )
}
