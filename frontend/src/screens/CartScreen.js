import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'


import { Message } from '../components/Message'
// import { Loader } from '../components/Loader'
import { addToCart,removeFromCart } from '../actions/cartActions'
//import useCounter from '../utils/customHooks/useCounter'

export const CartScreen = () => {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const { cartItems } = cart
    console.log(cart)

    // const {value: qty2 , increment , decrement}=useCounter(1)

    useEffect(() => {
        if(id !== ":id"){
            if (id) {
                dispatch(addToCart(id, qty))
            }
        }
    }, [dispatch, id, qty])

    const removeFromCartHandler=(productId)=>{
        dispatch(removeFromCart(productId))
    }

    const checkOutHandler = () =>{
        // console.log('Checkout')
        //It will refer to check login page and then redirect to shipping page / order completeion page
        navigate('/login?redirect=/shipping')
    }

    const mapxcart = cartItems.map((item) => {
        return (<ListGroup.Item key={item.product}>
            <Row>
                <Col md={2}>
                    <Link to={`/product/${item.product}`}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                    </Link>
                </Col>

                <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>

                <Col md={2}>
                    ${item.price}
                </Col>

                <Col>
                    <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value))) }>
                        {
                            [...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                            ))
                        }
                    </Form.Control>
                </Col>

                {/* <i class="fa fa-minus-circle  fa-2xl mx-3" aria-hidden="true" onClick={decrement}></i>
                                    {qty2}
                <i class="fa fa-plus-circle  fa-2xl mx-3" aria-hidden="true" onClick={increment}></i> */}

                <Col md={1}>
                    <Button type="button" variant="light" onClick={()=>removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>)
    })


    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ?
                    <Message variant='info' children="Your Cart is Empty" />
                    :
                    (
                        <ListGroup variant='flush'>
                            {mapxcart}
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc , item) => acc + item.qty , 0)}) Items</h2>
                            ${cartItems.reduce((acc , item )=>acc+item.price*item.qty ,0)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Button type="button" className='btn-block' 
                            disabled={cartItems.length===0} onClick={checkOutHandler}>
                                Proceed To Checkout
                            </Button>
                        </Row>
                    </ListGroup.Item>
                    </ListGroup>
                    
                </Card>
            </Col>
        </Row>
    )

}
