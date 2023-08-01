import React , { useEffect, useRef, useState } from 'react'
import { Table ,Button , Row ,Col , Image } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios'
import * as XLSX from 'xlsx'
import { Paginate } from '../components/Paginate'


import { Loader } from '../components/Loader'
import {Message} from '../components/Message'
import { createProducts, listProducts } from '../actions/productActions' 
import { deleteProduct } from '../actions/productActions' 
import { exportToExcel } from '../utils/ExcelManager'



export const ProductListScreen = () => {
    const productList=useSelector(state=>state.productList)
    const { products, pages , page , loading,error } = productList
    

    const userLogin=useSelector(state=>state.userLogin)
    const { userInfo }=userLogin

    const productDelete=useSelector(state=>state.productDelete)
    const { error: errorDelete , success: successDelete }=productDelete

    const productCreate=useSelector(state=>state.productCreate)
    const { loading: loadingCreate , success: successCreate , error: errorCreate }=productCreate

    // const objectList=useSelector(state=>state.objectList)
    // const { loading: loadingObjects, sortedObjects , success: sortSuccess , error:errorObjects }=objectList

    const location=useLocation()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    let keyword=location.search
    const handleImageFileInput=useRef(null)
    const [uploading , setUploading]=useState(false)
    const [productID , setProductID]=useState('')

    useEffect(()=>{
        if(userInfo && !Array.isArray(userInfo) && userInfo.isPortalAdmin){
            dispatch(listProducts(keyword))
        }
        else{
            navigate('/login')
        }
    },[dispatch,navigate ,userInfo , successDelete , keyword ,   successCreate , uploading])


    const deleteHandler=(productID)=>{
        if(window.confirm("Are You Sure To Delete The Product?")){
            dispatch(deleteProduct(productID))
            console.log('product deleted by admin')
        }
    }

    // In progress de-collapse field
    const [deCollapseFlag , setDeCollapseFlag]=useState(false)
    const createProductHandler=()=>{
        console.log('new product create')
        setDeCollapseFlag(true)
    }

    const downloadExcelHandler=(data)=>{
        // More Functioanlity to Add
        exportToExcel(data ,'Products.xlsx')
    }



    // const [sortToggle , setSortToggle]=useState(true)
    // const [prevColumn , setPrevColumn]=useState("")
    // const [sortIcons, setSortIcons]=useState(["","","",""])
    // const totalsortableColumns=4
    const sortHandler=(colHeadIndex,colHead,colType="String")=>{
        // setPrevColumn(colHead)
        // dispatch({type:OBJECT_LIST_SORT_RESET})
        // dispatch(sortObjectList(myorders,colHead,sortToggle,colType))
        // if(prevColumn===colHead){
        //     setSortToggle(!sortToggle)
        //     let new_sortIconList=[...sortIcons.slice(0,colHeadIndex), sortToggle ? "\u25BC" : "\u25B2" ,...sortIcons.slice(colHeadIndex+1)]
        //     setSortIcons(new_sortIconList)
        // }
        // else{
        //     if(prevColumn==='')
        //         setSortToggle(!sortToggle)  // Logic is If You Switch Column , It will start from ascending
        //     else
        //         setSortToggle(true) 
        //     const default_icons_list=Array(totalsortableColumns).fill("") //["","","",""]
        //     let new_sortIconList=[...default_icons_list.slice(0,colHeadIndex),"\u25B2",...default_icons_list.slice(colHeadIndex+1)]
        //     setSortIcons(new_sortIconList)
        // }
    }


    // Excel Import Functionality
    const hiddenFileInput=useRef(null)
    //const [excelData , setExcelData]=useState(null)

    const transferClickEvent=(e)=>{
        hiddenFileInput.current.click()
    }

    const handleFileChange=(e)=>{
        e.preventDefault()
        const selectedFile = e.target.files[0]
        console.log(selectedFile)
        if(selectedFile){
            let reader=new FileReader()
            reader.readAsArrayBuffer(selectedFile)
            reader.onload=(e)=>{
                //console.log(e.target.result)
                uploadExcelHandler(e.target.result)
            }
            e.target.value = null
        }
    }

    const uploadExcelHandler=(file)=>{
        console.log('uploading excel...')
        if(file!==null){
            const workbook=XLSX.read(file , {type:'buffer'})
            const worksheetName=workbook.SheetNames[0]
            const worksheet=workbook.Sheets[worksheetName]
            const data=XLSX.utils.sheet_to_json(worksheet)
            console.log(data)
            console.log(Object.values(data))
            //setExcelData(data)
            dispatch(createProducts(data))
        }
        // else{
        //     setExcelData(null)
        // }
    }
    
    const transferClickEvent_To_UploadFileImageHandler=(e , id)=>{
        // console.log('from transferclick function=id= ', id)
        setProductID(id)
        handleImageFileInput.current.click()
    }
    const uploadFileImageHandler=async(e)=>{
        e.preventDefault()
        // console.log('image uploading ...')
        // console.log('from uploadFileImageHandler id= ',productID)
        const selectedFile = e.target.files[0]
        const formData=new FormData()
        formData.append('image', selectedFile)
        formData.append('product_id', productID)
        setUploading(productID)
        try{
            const config={
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
            //const { data }=
            await axios.post('/api/products/upload/' , formData , config)
            // console.log('Status=',data)
            setUploading(false)
        }
        catch{
            setUploading(false)
        }
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col><h1>Products</h1></Col>
                <Col style={{textAlign:"right"}}>
                    <Button className='my-1 mx-2'  onClick={createProductHandler} size='sm'>
                        <i className='fas fa-plus'></i> Add
                    </Button> 
                    <Button className='my-1 mx-2'  onClick={()=>downloadExcelHandler(products)} size='sm'>
                        <i className='fas fa-download'></i> Export
                    </Button>
                    <Button className='my-1 mx-2'  onClick={transferClickEvent} size='sm'>
                        {/* <i className='fas fa-upload'></i> Import */}
                        {
                            loadingCreate ? <i class="fas fa-cog fa-spin fa-1x"></i> : <div><i className='fas fa-upload'></i> Import</div>
                        }
                        
                    </Button>
                    <input type="file" ref={hiddenFileInput} onChange={handleFileChange} style={{display:'none'}} />
                </Col>
            </Row>
            {/* {loadingDelete && <Loader/>} */}
            {errorDelete && <Message variant="danger" children={errorDelete}/>}
            {errorCreate && <Message variant="danger" children={errorCreate}/>}
            {
                loading ? <Loader/>
                    :( error ? <Message variant="danger" children={error}/> 
                        :(
                            <div>
                            <Table striped responsive hover className='table-sm'>
                                <thead style={{backgroundColor:"#504A56" , color:"white" , fontWeight:"bold"}}>
                                <tr>
                                    <th style={{textAlign: "center"}}>ID</th>
                                    <th style={{textAlign: "center"}} onClick={()=>sortHandler(1,2)}>Name</th>
                                    <th style={{textAlign: "center"}}>Price</th>
                                    <th style={{textAlign: "center"}}>Category</th>
                                    <th style={{textAlign: "center"}}>Brand</th>
                                    <th style={{textAlign: "center"}}>Rating</th>
                                    <th style={{textAlign: "center"}}>Stock Count</th>
                                    <th style={{textAlign: "center"}}>Image</th>
                                    <th style={{textAlign: "center"}}></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {deCollapseFlag && (
                                        <tr>
                                        <td style={{textAlign: "center"}}></td>
                                        <td style={{textAlign: "center"}}><input type="text"/></td>
                                        <td style={{textAlign: "center"}}><input type="text"/></td>
                                        <td style={{textAlign: "center"}}><input type="text"/></td>
                                        <td style={{textAlign: "center"}}><input type="text"/></td>
                                        <td style={{textAlign: "center"}}><input type="text"/></td>
                                        <td style={{textAlign: "center"}}><input type="text"/></td>
                                        <td style={{textAlign: "center"}}><input type="text"/></td>
                                        </tr>
                                    )}
                                    {
                                        products.map((product)=>{
                                            return (
                                                    <tr key={product._id}>
                                                        <td style={{textAlign: "center"}}>{product._id}</td>
                                                        <td style={{textAlign: "center"}}>{product.name}</td>
                                                        <td style={{textAlign: "center"}}>${product.price}</td>
                                                        <td style={{textAlign: "center"}}>{product.category}</td>
                                                        <td style={{textAlign: "center"}}>{product.brand}</td>
                                                        <td style={{textAlign: "center"}}>{product.rating}</td>
                                                        <td style={{textAlign: "center"}}>{product.countInStock}</td>
                                                        <td style={{textAlign: "center"}}>
                                                            {uploading===product._id ?  <Loader variant={"info"} size={'small'}/>
                                                                :(<div style={{width : '100px'}}>
                                                                        {console.log(product.image)}
                                                                        
                                                                        {product.image !== '/images/placeholder.png' && <Image src={product.image} alt={product.name}  style={{width:'50%'}} rounded={true}/>}
                                                                        <AddPhotoAlternateIcon className={product._id} style={{color:'#0875E9' , width:'20%' , height : '20%' }} onClick={(e)=>transferClickEvent_To_UploadFileImageHandler(e,product._id)}/>
                                                                        <input type="file" ref={handleImageFileInput} onChange={uploadFileImageHandler} style={{display:'none'}} />
                                                                    </div>
                                                                    )
                                                            }
                                                        </td>
                                                        <td style={{textAlign: "center"}}>
                                                            <Button variant="danger" className="btn-sm" onClick={()=>deleteHandler(product._id)}>
                                                                <i className='fas fa-trash'></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                    )
                                        })
                                    }
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} isAdmin={true}/>
                            </div>
                        )
                )
            }
        </div>
    )
}
