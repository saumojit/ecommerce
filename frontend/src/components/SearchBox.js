import React, { useState } from 'react'
import { Form , Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const SearchBox = () => {
    const [keyword , setKeyWord]=useState('')
    const navigate=useNavigate()
    const submitHandler=(e)=>{
        e.preventDefault()
        if(keyword!==''){
            navigate(`/?keyword=${keyword}&page=1`) // &page=1 adding this , so when ever we search , it will first show for page 1 
        }
        else{
            navigate('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex'  style={{width:"70%"}}>
            <Form.Control type="text" name="q" onChange={(e)=>setKeyWord(e.target.value)} className='mr-sm-2 ml-sm-5' style={{ width:"200%" , borderRadius : '25px' }}>
            </Form.Control>
            <Button type="submit" variant='outline-success' className='p-2' style={{ width:"15%" , borderRadius : '25px' }}><i className="fa fa-search fa-lg"></i></Button>
        </Form>
    )
}
