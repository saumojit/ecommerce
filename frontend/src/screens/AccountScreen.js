import React from 'react'
import { Row , Col , Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import orderIcon from   '../icons/orderIcon.png'
import addressIcon from '../icons/addressIcon.png'
import profileIcon from '../icons/profileIcon.png'
import paymentIcon from '../icons/paymentIcon.jpg'
import securityIcon from '../icons/securityIcon.png'
import supportIcon from '../icons/supportIcon.png'

export const AccountScreen = () => {
    return (
        <div>
            <h1 className='my-2'>Your Account</h1>
            <Row>
                <Col>
                    <Link to='/orders'>
                        <div className="card bg-secondary my-3 rounded" style={{width : '25rem', height : '12rem'}}>
                            <div className="card-header text-white bg-primary mb-3 py-3" style={{borderWidth:'0'}}>Your Orders</div>
                            <div className="card-body">
                                <Row>
                                    <Col md={3}>
                                        <Image src={orderIcon} alt="OrderIcon" style={{width:'100%' , height:'100%'}}/>
                                    </Col>
                                    <Col md={9}><p className="card-text py-3">Track , Return Or Buy Things Again</p></Col>
                                </Row>
                            </div>
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Link to='/security'>
                        <div className="card bg-secondary my-3 rounded" style={{width : '25rem', height : '12rem'}}>
                            <div className="card-header text-white bg-primary mb-3 py-3" style={{borderWidth:'0'}}>Login & Security</div>
                            <div className="card-body">
                                <Row>
                                    <Col md={3}>
                                        <Image src={securityIcon} alt="SecurityIcon" style={{width:'100%' , height:'100%'}}/>
                                    </Col>
                                    <Col md={9}><p className="card-text py-3">Edit Name , Email Or Password</p></Col>
                                </Row>
                            </div>
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Link to='/profile'>
                        <div className="card bg-secondary my-3 rounded" style={{width : '25rem', height : '12rem'}}>
                            <div className="card-header text-white bg-primary mb-3 py-3" style={{borderWidth:'0'}}>Profile</div>
                            <div className="card-body">
                                <Row>
                                    <Col md={3}>
                                        <Image src={profileIcon} alt="ProfileIcon" style={{width:'100%' , height:'100%'}}/>
                                    </Col>
                                    <Col md={9}><p className="card-text py-3">Customize Your Profile</p></Col>
                                </Row>
                            </div>
                        </div>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to='/addresslist'>
                        <div className="card bg-secondary my-3 rounded" style={{width : '25rem',height : '12rem'}}>
                            <div className="card-header text-white bg-primary mb-3 py-3" style={{borderWidth:'0'}}>Your Addresses</div>
                            <div className="card-body">
                                <Row>
                                    <Col md={3}>
                                        <Image src={addressIcon} alt="AddressIcon" style={{width:'100%' , height:'100%'}}/>
                                    </Col>
                                    <Col md={9}><p className="card-text py-3">Edit / Add Addresses for Orders/Gifts</p></Col>
                                </Row>
                            </div>
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Link to='/paymentlist'>
                        <div className="card bg-secondary my-3 rounded" style={{width : '25rem', height : '12rem'}}>
                            <div className="card-header text-white bg-primary mb-3 py-3" style={{borderWidth:'0'}}>Payment Preference</div>
                            <div className="card-body">
                                <Row>
                                    <Col md={3}>
                                        <Image src={paymentIcon} alt="PaymentIcon" style={{width:'100%' , height:'100%'}}/>
                                    </Col>
                                    <Col md={9}><p className="card-text py-3">Edit / Add Payment Preference for Orders/Refunds</p></Col>
                                </Row>
                            </div>
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Link to='/support'>
                        <div className="card bg-secondary my-3 rounded" style={{width : '25rem', height : '12rem'}}>
                            <div className="card-header text-white bg-primary mb-3 py-3" style={{borderWidth:'0'}}>Customer Support</div>
                            <div className="card-body">
                                <Row>
                                    <Col md={3}>
                                        <Image src={supportIcon} alt="SupportIcon" style={{width:'100%' , height:'100%'}}/>
                                    </Col>
                                    <Col md={9}><p className="card-text  py-3">For Any Queries/Resolution , Please Contact Us</p></Col>
                                </Row>
                            </div>
                        </div>
                    </Link>
                </Col>
            </Row>
        </div>
    )
}
