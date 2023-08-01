import React , { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row , Col } from 'react-bootstrap'

//import products from '../products.js'
import { Loader } from '../components/Loader'
import {Message} from '../components/Message'
import {Product} from '../components/Product'
import {listProducts} from '../actions/productActions'
import { useLocation } from 'react-router-dom'
import { Paginate } from '../components/Paginate'


export const HomeScreen = () => {
  const dispatch=useDispatch() //dispatching actions
  const location=useLocation()
  const productList=useSelector(state => state.productList) //getting states
  const { loading , products , page , pages , error } = productList

  let keyword = location.search
  console.log(keyword)
  console.log(page)
  console.log(pages)

  useEffect(() => {
    dispatch(listProducts(keyword))
  },[dispatch , keyword])


  return (
    <div>
      <h1>Latest Products</h1>
      {
        loading ? <Loader/>
            : error ? <Message variant='danger' children={error}/>
              :
                <div>
                  <Row>
                  {products.map((product)=>{return (
                      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        {/* <h3>{product.name}</h3> */}
                        <Product product={product}/>
                        </Col>
                    )})}
                  </Row>
                  <Paginate pages={pages} page={page} keyword={keyword}/>
                </div>
                
      }
    </div>
  )
}