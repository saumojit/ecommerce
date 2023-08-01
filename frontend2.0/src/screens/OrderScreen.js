import React , {useEffect } from 'react'
import { Link , useNavigate , useParams } from 'react-router-dom'
import {Button ,Row, Col, ListGroup , Image , Card } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'

import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'
import { payForOrder } from '../actions/orderActions'

// eslint-disable-next-line
import { ORDER_PAY_RESET } from '../constants/orderConstants'



export const OrderScreen = () => {
    const { id }=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const orderDetails=useSelector(state=>state.orderDetails)
    const { error , loading , order}=orderDetails

    const userLogin=useSelector(state=>state.userLogin)
    const { userInfo }=userLogin

    const orderPay=useSelector(state=>state.orderPay)
    const { loading:loadingPay , success:successPay }=orderPay

    useEffect(()=>{
        if(Array.isArray(userInfo) || userInfo==={}){
            navigate('/login')
        }
        if(!order || order._id!==id || successPay ){
            
            dispatch(getOrderDetails(id))
            dispatch({type:ORDER_PAY_RESET})
        }
    },[dispatch,navigate,id,order,userInfo , successPay ])

    const paymentHandler=(e)=>{
        e.preventDefault()
        //console.log('order is paid')
        dispatch(payForOrder(id , {paymentRef:'#111-222-333'}))
    }


    return loading ? <Loader/>
                :error ? (<Message variant='danger' children={error}/>)
                    :(
                        <div>
                            <h1>Order ID : #{order._id}</h1>
                        <Row>
                            <Col md={8}>
                                <ListGroup variant='flush'>
                                        <ListGroup.Item className='my-3'>
                                            <h2>Shipping Details</h2>
                                            <p><strong>Name : </strong>{order.user.name}</p>
                                            <p>
                                                <strong>Email : </strong>
                                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                            </p>
                                            <p>
                                                <strong>Shipping</strong> : { 
                                                                    order.shippingAddress.address+' , ' +
                                                                    order.shippingAddress.city + ', Postal-Code ' +
                                                                    order.shippingAddress.postalCode + ' , ' +
                                                                    order.shippingAddress.country 
                                                                    }
                                            </p>
                                            {
                                                order.isDelivered
                                                    ? <Message variant="success" children={`Delivered on ${order?.deliveredAt}`}/>
                                                    : <Message variant="warning" children="Not Delivered"/>
                                            }
                                        </ListGroup.Item>
                                        <ListGroup.Item  className='my-3'>
                                            <h2>Payment Method</h2>
                                            <p>
                                                <strong>Method</strong> : {order.paymentMethod}
                                            </p>
                                            {
                                                order.isPaid
                                                    ? <Message variant="success" children={`Paid on ${order?.paidAt}`}/>
                                                    : <Message variant="warning" children="Pending"/>
                                            }
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h2>Order Items</h2>
                                            {order.orderItems.length===0 ? 
                                                <Message variant="info" children="There are no order items in the cart."/> :(
                                                    <ListGroup variant="flush">
                                                        {order.orderItems.map((item) => {
                                                            return (<ListGroup.Item key={item.product}>
                                                                <Row>
                                                                    <Col md={1}>
                                                                        <Link to={`/product/${item.product}`}>
                                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                                        </Link>
                                                                    </Col>

                                                                    <Col>
                                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                                    </Col>

                                                                    <Col md={4}>
                                                                    {item.qty} X ${item.price} = ${(item.qty*item.price).toFixed(2)}
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>)
                                                        })}
                                                    </ListGroup>
                                                )}
                                        </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={4}>
                                <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item >
                                        <Row className='my-3'>
                                            <Col><h1>Order Summary</h1></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Ordered On</Col>
                                            <Col>{order.createdAt.substring(0,10)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${order.orderItems.reduce((acc,item)=>acc+Number(item.qty)*Number(item.price),0).toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Order Total</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    
                                    {/* {
                                        error &&
                                        <ListGroup.Item>
                                            <Message className='my-2' variant="danger" children={error}/>
                                        </ListGroup.Item>
                                    } */}

                                    {
                                        !order.isPaid && (
                                            <ListGroup.Item>
                                                {   
                                                loadingPay ? <Loader variant='info'/> :
                                                    (
                                                    (!successPay) && 
                                                        <Row className='my-3'>
                                                        <Button onClick={paymentHandler} className='btn-block' variant="info" 
                                                            disabled={order.orderItems.length===0} type="button">
                                                            <strong>Pay</strong>
                                                        </Button>
                                                        </Row>)
                                            }
                                            </ListGroup.Item>
                                        )
                                    }

                                    
                                    
                                    {order.isDelivered ?                                     
                                        (<ListGroup.Item>
                                            <Row>
                                            <Button className='btn-block' type="button">Return Order</Button>
                                            </Row>
                                        </ListGroup.Item>
                                        )
                                        :(
                                        <ListGroup.Item>
                                            <Row>
                                            <Button className='btn-block' disabled={false} type="button">Cancel Order</Button>
                                            </Row>
                                        </ListGroup.Item>
                                        )
                                    }

                                </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                        </div>
            )
}
