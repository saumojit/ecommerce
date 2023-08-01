import React, { useState } from 'react'
import { Row , Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AddHomeIcon from '@mui/icons-material/AddHome';

export const AddressListScreen = () => {
    const [hoverEffect , setHoverEffect]=useState(false)
    const handleMouseOver=()=>{
        setHoverEffect(true)
    }
    const handleMouseOut=()=>{
        setHoverEffect(false)
    }
    return (
        <div style={{ marginLeft : '100px'}}  >
            <h3>Your Addresses</h3>
            <Col>
                <Link to='/addresslist/add/' style={{textDecoration: 'none'}} >
                    <div className="card  my-3 rounded" style={{width : '20rem', height : '20rem' , 
                            display: 'flex' , alignItems:'center' , justifyContent: 'center' , 
                            backgroundColor :  hoverEffect && '#D3D3D3' }}  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
                            >
                        <div className="card-body" style={{ width:'50%' , height:'40%' , marginLeft : '10%' , marginTop:'20%'}}>
                            <AddHomeIcon style={{width:'80%' , height:'60%'}}/>
                            <Row>
                                <p className="card-text py-1" >Add Address </p>
                            </Row>
                        </div>
                    </div>
                </Link>
            </Col>
        </div>
    )
}