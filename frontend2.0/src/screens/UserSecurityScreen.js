import React , {useState , useEffect } from 'react'
import {Form , Button } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getUserDetail, updateUserDetail } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { Loader } from '../components/Loader'
import {Message} from '../components/Message'
import {FormContainer} from '../components/FormContainer'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

export const UserSecurityScreen = () => {
    const [name,setName]=useState('')
    const [email , setEmail]=useState('')
    const [password1 , setPassword1]=useState('')
    const [password2 , setPassword2]=useState('')
    const [message , setMessage]=useState('')
    const [customMessage , setCustomMessage]=useState('')
    const navigate=useNavigate()
    const dispatch=useDispatch()
    // const location=useLocation()
    // const redirect = location.search ? location.search.split('=')[1] : '/'
    
    const userDetail=useSelector(state=>state.userDetail)
    const { error , loading , user }=userDetail

    const userLogin=useSelector(state=>state.userLogin)
    const { userInfo }=userLogin

    const userUpdateDetail=useSelector(state=>state.userUpdateDetail)
    const { success }=userUpdateDetail

    useEffect(()=>{
        console.log(userInfo)
        if(Array.isArray(userInfo) || userInfo==={}){
            navigate('/login?redirect=/profile')
        }
        else{
            if(!user || !user.name || success===true){
                dispatch({type : USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetail())
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch , userInfo , user , success ,navigate,loading])
    


    const submitHandler=(e)=>{
        e.preventDefault()
        if(password1 !== password2){
            setMessage('Passwords do not match')
        }
        if(name || email || (password1===password2 && password1 !== '')){
            console.log('Updating Profile ...')
            dispatch(updateUserDetail(user._id , name ,email ,password1))
            setCustomMessage('User Detail Updated Successfully')
            setMessage('')
        }
        if(name==='' && email==='' && password1===''){
            setName(user.name)
            setEmail(user.email)
            setMessage('Please fill at least one field in the form')
        }
    }


    return (
        <FormContainer>
            <h2>User Secure Credentials </h2>
            {message && <Message variant='danger' children={message}/>}
            {customMessage && <Message variant='success' children={customMessage}/>}
            {error && <Message variant='danger' children={error}/>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="name" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password1' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" placeholder='Enter Password' value={password1} onChange={(e)=>setPassword1(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password2' className='my-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" placeholder='Confirm Password' value={password2} onChange={(e)=>setPassword2(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Update</Button>
            </Form>
        </FormContainer>
    )
}
