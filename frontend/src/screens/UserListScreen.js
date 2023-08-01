import React , { useEffect } from 'react'
//import { useLocation } from 'react-router-dom'
import { Table ,Button } from 'react-bootstrap'
//import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Loader } from '../components/Loader'
import {Message} from '../components/Message'
import { getUsers , deleteUser} from '../actions/userActions' 

import {useSort} from '../utils/customHooks/useSort'


export const UserListScreen = () => {
    const userList=useSelector(state=>state.userList)
    const { loading , users , error }=userList

    const userLogin=useSelector(state=>state.userLogin)
    const { userInfo }=userLogin

    const userDelete=useSelector(state=>state.userDelete)
    const { success: successDelete }=userDelete

    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        if(userInfo && !Array.isArray(userInfo) && userInfo.isPortalAdmin){
            dispatch(getUsers())
        }
        else{
            navigate('/login')
        }
    },[dispatch,navigate ,userInfo , successDelete])


    const deleteHandler=(userId)=>{
        if(window.confirm("Are You Sure To Delete The User?")){
            dispatch(deleteUser(userId))
            console.log('user deleted by admin')
        }
    }

    const ss=useSort()
    const sortHandler=(a,b)=>{
        console.log('inside sorthnmdler')
        ss(a,b,1)
    }

    return (
        <div>
            <h2>USERS</h2>
            {
                loading ? <Loader/>
                    :( error ? <Message variant="danger" children={error}/> 
                        :(
                            <Table striped responsive hover className='table-sm'>
                                <thead style={{backgroundColor:"#504A56" , color:"white" , fontWeight:"bold"}}>
                                <tr>
                                    <th>ID</th>
                                    <th onClick={()=>sortHandler(1,2)}>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user)=>{
                                            return (
                                                    <tr key={user._id}>
                                                        <td>{user._id}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            {
                                                                user.isPortalAdmin ? <i className='fas fa-check' style={{color:"green"}}></i>
                                                                    :   (<i className='fa fa-times' style={{color:"red"}}></i>)
                                                            }
                                                        </td>
                                                        <td>
                                                            <Button variant="danger" className="btn-sm" onClick={()=>deleteHandler(user._id)}>
                                                                <i className='fas fa-trash'></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                    )
                                        })
                                    }
                                </tbody>
                            </Table>
                        )
                )
            }
        </div>
    )
}
