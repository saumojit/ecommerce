import React , {useState , useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {Form , Button , Row , Col , Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import { getUserDetail, updateUserDetail } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { sortObjectList } from '../actions/objectActions'
import { Loader } from '../components/Loader'
import {Message} from '../components/Message'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { OBJECT_LIST_SORT_RESET } from '../constants/objectConstants'
import {SearchBox} from '../components/SearchBox'

export const ProfileScreen = () => {
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

    const orderListMy=useSelector(state=>state.orderListMy)
    const { loading: loadingOrders, orders:myorders ,error: errorOrders }=orderListMy

    const objectList=useSelector(state=>state.objectList)
    const { loading: loadingObjects, sortedObjects , success: sortSuccess , error:errorObjects }=objectList

    useEffect(()=>{
        console.log(userInfo)
        if(Array.isArray(userInfo) || userInfo==={}){
            // console.log('tologin page')
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
    },[dispatch , userInfo , user , success ,navigate,sortSuccess,sortedObjects,myorders,loading])
    


    const submitHandler=(e)=>{
        e.preventDefault()
        // console.log('user profile update activity')
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


    const [sortToggle , setSortToggle]=useState(true)
    const [prevColumn , setPrevColumn]=useState("")
    const [sortIcons, setSortIcons]=useState(["","","",""])
    const totalsortableColumns=4
    const sortHandler=(colHeadIndex,colHead,colType="String")=>{
        setPrevColumn(colHead)
        dispatch({type:OBJECT_LIST_SORT_RESET})
        dispatch(sortObjectList(myorders,colHead,sortToggle,colType))
        if(prevColumn===colHead){
            setSortToggle(!sortToggle)
            let new_sortIconList=[...sortIcons.slice(0,colHeadIndex), sortToggle ? "\u25BC" : "\u25B2" ,...sortIcons.slice(colHeadIndex+1)]
            setSortIcons(new_sortIconList)
        }
        else{
            if(prevColumn==='')
                setSortToggle(!sortToggle)  // Logic is If You Switch Column , It will start from ascending
            else
                setSortToggle(true) 
            const default_icons_list=Array(totalsortableColumns).fill("") //["","","",""]
            let new_sortIconList=[...default_icons_list.slice(0,colHeadIndex),"\u25B2",...default_icons_list.slice(colHeadIndex+1)]
            setSortIcons(new_sortIconList)
        }
    }


    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
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
            </Col>
            <Col md={9}>
                <Row className='my-2 align-items-center'><Col><h2>My Orders</h2></Col> <SearchBox/></Row>
                
                {
                    (loadingOrders || loadingObjects) ? <Loader/>
                    :(
                        error ? <Message variant="danger" children={errorOrders}/>
                        :(
                        <Table striped responsive hover className='table-sm'>
                            <thead style={{backgroundColor:"#504A56" , color:"white" , fontWeight:"bold"}}>
                                <tr style={{textAlign: "center"}}>
                                    <th>ID</th>
                                    <th onClick={()=>sortHandler(0,"createdAt")}>Date {sortIcons[0]}</th>
                                    <th onClick={()=>sortHandler(1,"totalPrice","Number")}>Total {sortIcons[1]}</th>
                                    <th onClick={()=>sortHandler(2,"isPaid")}>Paid {sortIcons[2]}</th>
                                    <th onClick={()=>sortHandler(3,"isDelivered")}>Delivered {sortIcons[3]}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    //myorders.sort((a,b)=>Number(a.totalPrice) > Number(b.totalPrice) ? 1 : -1)
                                    //myorders.sort((a,b)=>a.isPaid > b.isPaid ? 1 : -1)
                                    //myorders.sort((a,b)=>a.createdAt < b.createdAt ? 1 : -1)
                                    (sortSuccess===true && !errorObjects) ?
                                        (sortedObjects.map((order)=>{
                                            return  <LinkContainer to={`/orders/${order._id}`} key={order._id}>
                                                    <tr>
                                                        <td style={{textAlign: "center"}}>{order._id}</td>
                                                        <td style={{textAlign: "center"}}>{order.createdAt.substring(0,10)}</td>
                                                        <td style={{textAlign: "center"}}>${ order.totalPrice }</td>
                                                        <td style={{textAlign: "center"}}>{order.isPaid ? order.paidAt.substring(0,10) : <CancelRoundedIcon style={{color:"red"}}/>}</td>
                                                        <td style={{textAlign: "center"}}>{order.isDelivered ? order.deliveredAt.substring(0,10): <CancelRoundedIcon style={{color:"orange"}}/>}</td>
                                                    </tr>
                                                    </LinkContainer>}))
                                        :(myorders.map((order)=>{
                                        return  <LinkContainer to={`/orders/${order._id}`} key={order._id}>
                                                <tr>
                                                    <td style={{textAlign: "center"}}>{order._id}</td>
                                                    <td style={{textAlign: "center"}}>{order.createdAt.substring(0,10)}</td>
                                                    <td style={{textAlign: "center"}}>${ order.totalPrice }</td>
                                                    <td style={{textAlign: "center"}}>{order.isPaid ? order.paidAt.substring(0,10) : <CancelRoundedIcon style={{color:"red"}}/>}</td>
                                                    <td style={{textAlign: "center"}}>{order.isDelivered ? order.deliveredAt.substring(0,10) : <CancelRoundedIcon style={{color:"orange"}}/>}</td>
                                                </tr>
                                                </LinkContainer>}))
                                }       
                            </tbody>
                        </Table>
                        )
                    )
                }
            </Col>
        </Row>
    )
}


//Sort Method Over Objects/Strings/Numbers/Decimals and Etc.
//replace the compare method inside sort function
//[1,3,2,5,6,4].sort((a,b)=>a>b ? 1 : -1)

// Ascending
// const compareFunction_asc_oneline=(a,b)=>(a-b)
// //Descending
// const compareFunction_dsc_online=(a,b)=>(b-a)

// // Ascending
// const compareFunction_asc=(a,b)=>{ return (a>b) ? 1 : -1 }
// // Descending
// const compareFunction_dsc=(a,b)=>{ return (a>b) ? 1 : -1 }