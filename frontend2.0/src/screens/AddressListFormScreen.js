import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {Form , Button , Row , Col } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Loader } from '../components/Loader'
import {Message} from '../components/Message'
import { FormContainer } from '../components/FormContainer'


export const AddressListFormScreen = () => {
    const [addressTitle , setAddressTitle]=useState('')
    const [name , setName] = useState('')
    const [isDefaultAddress , setIsDefaultAddress]=useState(false)
    const [availability , setAvailability]=useState('')
    const [addressType , setAddressType]=useState('')
    const mobile="+918334042159"
    const [address , setAddress] = useState('')
    const [landmark , setLandmark] = useState('')
    const [postalCode , setPostalCode]=useState('')
    const [city , setCity] = useState('')
    const [state , setSate] = useState('')
    const [country , setCountry] = useState('')



    return (
        <FormContainer>
            Add
            {/* <h1>Register</h1>
            {message && <Message variant='danger' children={message}/>}
            {error && <Message variant='danger' children={error}/>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        required type="name" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        required type="email" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password1' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        required type="password" placeholder='Enter Password' value={password1} onChange={(e)=>setPassword1(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password2' className='my-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        required type="password" placeholder='Confirm Password' value={password2} onChange={(e)=>setPassword2(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Sign Up</Button>
            </Form>
            <Row className='py-2'>
                <Col>
                Already Have An Account ? 
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
                </Col>
            </Row> */}
        </FormContainer>
    )
}
