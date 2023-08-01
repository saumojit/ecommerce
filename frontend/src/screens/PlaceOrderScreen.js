import React , {useEffect } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import {Button ,Row, Col, ListGroup , Image , Card } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'

import { Message } from '../components/Message'
import { CheckOutSteps } from '../components/CheckOutSteps'
import { createOrder} from '../actions/orderActions'
import { getOrderDetails } from '../actions/orderActions'
import { CREATE_ORDER_RESET } from '../constants/orderConstants'

export const PlaceOrderScreen = () => {
    const orderCreate=useSelector(state=>state.orderCreate)
    const { error , success , order}=orderCreate
    const cart=useSelector(state=>state.cart)
    const { cartItems , shippingAddress , paymentMethod }=cart
    const full_shipping_address=shippingAddress.address+' , ' +
                                shippingAddress.city + ', Postal-Code ' +
                                shippingAddress.postalCode + ' , ' +
                                shippingAddress.country
    const items_total_price=(cartItems.reduce((acc,item)=> acc+item.qty*item.price , 0)).toFixed(2)
    const shippingPrice=(items_total_price > 200 ? 0 : 10).toFixed(2)
    const taxPrice=Number(0.08 * items_total_price).toFixed(2)
    const totalPrice=(Number(items_total_price)+Number(shippingPrice)+Number(taxPrice)).toFixed(2)

    const dispatch=useDispatch()
    const navigate=useNavigate()

    if(!paymentMethod){
        navigate('/payment')
    }

    useEffect(()=>{
        console.log(success,'_success')
        if(success){
            navigate(`/orders/${order._id}`)
            dispatch({type:CREATE_ORDER_RESET})
        }
        // eslint-disable-next-line
    },[dispatch,navigate, success])

    const placeOrderHandler=(e)=>{
        e.preventDefault()
        const order={
            orderItems:cartItems,
            shippingAddress:shippingAddress,
            paymentMethod:paymentMethod,
            taxPrice:taxPrice,
            shippingPrice:shippingPrice,
            totalPrice:totalPrice
        }
        dispatch(createOrder(order))
    }

    const mapxcart_v2 = cartItems.map((item) => {
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
    })


    return (
        <div>
            <CheckOutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                            <ListGroup.Item className='my-3'>
                                <h2>Shipping Address</h2>
                                <p>
                                    <strong>Shipping : {full_shipping_address}</strong>
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item  className='my-3'>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method : {paymentMethod}</strong>
                                </p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {cartItems.length===0 ? 
                                    <Message variant="info" children="There are no items in the cart."/> :(
                                        <ListGroup variant="flush">
                                            {mapxcart_v2}
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
                                <Col>Items</Col>
                                <Col>${items_total_price}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Order Total</Col>
                                <Col>${totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                        {
                            error &&
                            <ListGroup.Item>
                                <Message className='my-2' variant="danger" children={error}/>
                            </ListGroup.Item>
                        }
                        <ListGroup.Item>
                            <Row className='my-3'>
                                <Button onClick={placeOrderHandler} className='btn-block' disabled={cartItems.length===0} type="button">Place Order</Button>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
