import React , {useState , useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import {Form , Button } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import { FormContainer } from '../components/FormContainer'
import { CheckOutSteps } from '../components/CheckOutSteps'
import { saveShippingAddress } from '../actions/cartActions'




export const ShippingScreen = () => {
    const { shippingAddress }=useSelector(state=>state.cart)
    const [address , setAddress]=useState(shippingAddress.address)
    const [city , setCity]=useState(shippingAddress.city)
    const [postalCode , setPostalCode]=useState(shippingAddress.postalCode)
    const [country , setCountry]=useState(shippingAddress.country)

    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    const submitHandler=(e)=>{
        e.preventDefault()
        const shippingAddresData={
            address : address,
            city : city,
            postalCode : postalCode,
            country : country,
        }
        dispatch(saveShippingAddress(shippingAddresData))
        navigate('/payment')
        console.log('shipping entry done')
    }

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <CheckOutSteps step1 step2 />
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address' className='my-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        required type="text" placeholder='Enter Address' value={address ? address : ''} onChange={(e)=>setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='city' className='my-3'>
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                        required type="text" placeholder='Enter City' value={city ? city : ''} onChange={(e)=>setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode' className='my-3'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control 
                        required type="text" placeholder='Enter Postal Code' value={postalCode ? postalCode : ''} onChange={(e)=>setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='country' className='my-3'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control 
                        required type="text" placeholder='Enter Country' value={country ? country : ''} onChange={(e)=>setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
