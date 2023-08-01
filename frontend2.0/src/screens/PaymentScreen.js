import React, { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Form, Button,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import { FormContainer } from '../components/FormContainer'
import { CheckOutSteps } from '../components/CheckOutSteps'
import { savePaymentMethod } from '../actions/cartActions'

export const PaymentScreen = () => {
    const [paymentMethod , setPaymentMethod]=useState('PayPal')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const cart=useSelector(state=>state.cart)
    const { shippingAddress }=cart
    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-3'>
                    <Form.Label as="legend">
                        Select Payment Method
                    </Form.Label>
                    <Col>
                        <Form.Check type="radio" label="PayPal or Credit Card" 
                        id="paypal" name="paymentMethod" checked 
                        onChange={(e)=>setPaymentMethod(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    )
}
