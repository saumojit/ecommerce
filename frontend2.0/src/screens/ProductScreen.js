import React, { useState , useEffect }from 'react'
import { Link , useParams } from 'react-router-dom'
import { Row , Col , Image , ListGroup ,Button , Card , Form } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { listProductDetail , createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { Rating } from '../components/Rating'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import useCounter from '../utils/customHooks/useCounter'


export const ProductScreen = () => {
  const { id }=useParams()
  const dispatch=useDispatch()
  const navigate=useNavigate()
  //const [qty , setQty]=useState(1)
  const [rating , setRating]=useState(0)
  const [comment , setComment]=useState('')

  const productDetail=useSelector(state => state.productDetailList)
  const { loading , product , error } = productDetail
  const userLogin=useSelector(state=>state.userLogin)
  const { userInfo }=userLogin
  const productReviewCreate=useSelector(state=> state.productReviewCreate)
  const { loading : loadingProductReviewCreate , error : errorProductReviewCreate , success : successProductReviewCreate}=productReviewCreate

  // new qty logic for incr/decr button
  const {value: qty , increment , decrement}=useCounter(1 , product.countInStock)

  useEffect(()=>{
    if(successProductReviewCreate){
      setRating(0)
      setComment('')
    }
    dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    dispatch(listProductDetail(id))
  },[dispatch,id , successProductReviewCreate])

  const addToCartHandler=()=>{
    console.log('add to cart=',id)
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitReviewHandler=(e)=>{
    e.preventDefault()
    const review_body={
      "rating":rating , 
      "comment":comment
    }
    dispatch(createProductReview(id, review_body))
  }

  // const countHandler=()=>{
  //   useCounter()
  // }
  
  return (
    <div>
      <Link to="/" className='btn btn-dark my-3'>Go Back</Link>
        {
          loading ? <Loader/>
              :( error ? <Message variant="danger" children={error}/>
                    :(
                    <div>
                    <Row>
                        <Col md={6}>
                          {/* Custom style added to shape the image fit */}
                          <Image src={product.image} alt={product.name} style={{width:'100%' , height:'100%'}}/>
                        </Col>
                        <Col md={3}>
                          <ListGroup variant="flush">
                            <ListGroup.Item>
                              <h3>{product.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                              <Rating value={product.rating} text={`${product.numReviews} reviews`}color={'#FFD133'}/>
                            </ListGroup.Item>

                            <ListGroup.Item>
                              Price : ${product.price}
                            </ListGroup.Item>

                            <ListGroup.Item>
                              Description : {product.description}
                            </ListGroup.Item>
                          </ListGroup>
                        </Col>

                        <Col md={3}>
                          <Card>
                            <ListGroup variant="flush">
                              <ListGroup.Item>
                              <Row>
                                <Col>Price:</Col>
                                <Col>
                                  <strong>${product.price}</strong>
                                </Col>
                              </Row>
                              </ListGroup.Item>

                              <ListGroup.Item>
                              <Row>
                                <Col>Status:</Col>
                                <Col>
                                  <strong>{ product.countInStock ? "In Stock " : "Out of Stock"}</strong>
                                </Col>
                              </Row>
                              </ListGroup.Item>

                              { product.countInStock>0 && (
                                <ListGroup.Item>
                                <Row>
                                  <Col>Qty</Col>
                                  <Col xs="auto" className='my-1'>
                                    {/* <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                                      {
                                        [...Array(product.countInStock).keys()].map((x)=>(
                                          <option key={x+1} value={x+1}>
                                            {x+1}
                                          </option>
                                        ))
                                      }
                                    </Form.Control> */}
                                    
                                    <span style={{color:'#D54444'}}>
                                    <i class="fa fa-minus-circle  fa-2xl mx-3" aria-hidden="true" onClick={decrement}></i>
                                    </span>
                                    {qty}
                                    <i class="fa fa-plus-circle  fa-2xl mx-3" aria-hidden="true" onClick={increment}></i>
                                  </Col>
                                </Row>
                                </ListGroup.Item>
                              )}

                              <ListGroup.Item>
                                <Row>
                                <Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock===0} type="button">Add to Cart</Button>
                                </Row>
                                
                              </ListGroup.Item>

                            </ListGroup>
                            
                          </Card>
                        </Col>
                    </Row>
                    <br/>
                    {(loading===false && error===undefined) &&
                      <Row>
                      <Col md={6}>
                        <h4>Reviews</h4>
                        { product.reviews.length === 0  && <Message variant={"info"} children={"No Reviews Available For This Product"}/>}
                      <ListGroup variant="flush">
                        {
                          product.reviews.map((review)=>(
                            <ListGroup.Item key={review._id}>
                              <strong>{review.name}</strong>
                              <Rating value={review.rating} color='#f8e825'/>
                              <p>{review.createdAt.substring(0,10)}</p>
                              <p>{review.comment}</p>
                            </ListGroup.Item>
                          ))
                        }
                        <ListGroup.Item>
                          <h4>Write A Review</h4>
                          {loadingProductReviewCreate && <Loader/>}
                          {successProductReviewCreate && <Message variant={"success"} children={"Review Submitted Successfully"}/>}
                          {errorProductReviewCreate && <Message variant={"danger"} children={errorProductReviewCreate}/>}
                          { userInfo ?
                            <Form onSubmit={submitReviewHandler}>
                              <Form.Group controlId='rating'>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control as='select' value={rating} onChange={(e)=>setRating(Number(e.target.value))}>
                                  <option value=''>Select A Rating </option>
                                  <option value='1'>1 - Poor</option>
                                  <option value='2'>2 - Fair</option>
                                  <option value='3'>3 - Good </option>
                                  <option value='4'>4 - Very Good </option>
                                  <option value='5'>5 - Excellent </option>
                                </Form.Control>
                              </Form.Group>
                              <Form.Group controlId='comment'>
                                <Form.Label>Review</Form.Label>
                                <Form.Control as="textarea" row="5" value={comment} onChange={(e)=>setComment(e.target.value)}>
                                </Form.Control>
                              </Form.Group>
                              <Button className='my-3' disabled={loadingProductReviewCreate} type="submit" variant="primary">Submit</Button>
                            </Form>
                            :(
                              <Link to='/login'>
                                <Message variant={"info"} children={"Please Log In To Write A Review"}/>
                              </Link>
                            )
                          }
                        </ListGroup.Item>
                      </ListGroup>
                      </Col>
                      </Row>
                    }
                    </div>
                  ))
          }
    </div>
  )
}



// // // // // Extra Piece Of Codes

//import products from '../products'
  //const product=products.find((p) => p._id === id)
  
  // const [ product , setProduct ]=useState({})
  // useEffect(()=>{
  //   async function fetchProduct(){
  //     console.log('Product Page First Time Open')
  //     const { data } = await axios.get(`/api/products/${id}/`)
  //     setProduct(data)
  //   }
  //   fetchProduct()
  // },[])