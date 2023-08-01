import React , {useState , useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {Form , Button , Row , Col } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import { register } from '../actions/userActions'
import { Loader } from '../components/Loader'
import {Message} from '../components/Message'
import { FormContainer } from '../components/FormContainer'


export const RegisterScreen = () => {
    const [name,setName]=useState('')
    const [email , setEmail]=useState('')
    const [password1 , setPassword1]=useState('')
    const [password2 , setPassword2]=useState('')
    const [message , setMessage]=useState('')
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const location=useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    
    const userRegister=useSelector(state=>state.userRegister)
    const { error, loading ,userInfo }=userRegister

    useEffect(()=>{
        if(userInfo && !Array.isArray(userInfo)){
            navigate(redirect)
        }
    },[userInfo , redirect , navigate])


    const submitHandler=(e)=>{
        e.preventDefault()
        console.log('user register activity')
        if(password1!==password2){
            setMessage('Passwords do not match')
        }
        else{
            dispatch(register(name,email,password1))
        }
        
    }
    return (
        <FormContainer>
            <h1>Register</h1>
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
            </Row>
        </FormContainer>
    )
}