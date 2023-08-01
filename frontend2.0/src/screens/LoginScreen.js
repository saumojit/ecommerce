import React , {useState , useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {Form , Button , Row , Col } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import { login } from '../actions/userActions'
import { Loader } from '../components/Loader'
import {Message} from '../components/Message'
import { FormContainer } from '../components/FormContainer'


export const LoginScreen = () => {
    const [email , setEmail]=useState('')
    const [password , setPassword]=useState('')
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const location=useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    
    const userLogin=useSelector(state=>state.userLogin)
    const { error, loading ,userInfo }=userLogin

    useEffect(()=>{
        if(userInfo && !Array.isArray(userInfo)){
            navigate(redirect)
        }
    },[userInfo , redirect , navigate])


    const submitHandler=(e)=>{
        e.preventDefault()
        console.log('user signin activity')
        dispatch(login(email,password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger' children={error}/>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type="email" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Sign In</Button>
            </Form>
            <Row className='py-2'>
                <Col>
                New Customer ? 
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}