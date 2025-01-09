import { useEffect, useState } from "react"
import { useStyles } from "./ProductDetailsCss"
import MaterialTable from "@material-table/core"
import { getData, serverURL,postData } from "../../services/FetchNodeServices"
import TitleComponent from "../../components/admin/TitleComponent"
import { useNavigate } from "react-router-dom"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button,Grid,Avatar,TextField } from "@mui/material"
import {FormControl,MenuItem,Select,InputLabel} from '@mui/material';
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import mainLogo from '../../../src/assets/logo2.png'
import ClearIcon from '@mui/icons-material/Clear';



export default function DisplayAllProductDetails(){
    
    var navigate=useNavigate()

    const [picture, setPicture]=useState({file: 'productdetaillogo.png', bytes:''})
    const [error, setError]=useState({})
    const [productDetailId, setProductDetailId]=useState([])
    const [productDetailData, setProductDetailData]=useState([])
    const [categoryId, setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [brandId, setBrandId]=useState('')
    const [productId, setProductId]=useState('')
    const [categoryList, setCategoryList]=useState([])
    const [subCategoryList, setSubCategoryList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [productList,setProductList]=useState([])
    const [product,setProduct]=useState('')
    const [productSubName,setProductSubName]=useState('')
    const [weight, setWeight]=useState('')
    const [weightType,setWeightType]=useState('')
    const [Type, setType]=useState('')
    const [description,setDescription]=useState('')
    const [quantity, setQuantity]=useState('')
    const [price, setPrice]=useState('')
    const [offerPrice, setOfferPrice]=useState('')
    const [offerType, setOfferType]=useState('')
    const [packaging, setPackaging]=useState('')
    const [open,setOpen]=useState(false)
    const [showBtn,setShowBtn]=useState(false)
    const [tempPicture,setTempPicture]=useState('')

    const fetchAllCategory = async () => {
        var result = await getData('category/display_all_category');
        if (result.status) {
            setCategoryList(result.data);
        }

}
    useEffect(function(){fetchAllCategory()},[])

    const fillAllCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem key={item.categoryid} value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
    }
    const handleSubCategoryChange=(event)=>{
        setSubCategoryId(event.target.value)
        fetchAllBrands(event.target.value)
    }
    const handleBrandChange=(event)=>{
        setBrandId(event.target.value)
        fetchAllProducts(event.target.value)
    }
    const fetchAllSubCategory = async (cid) => {
        try {
            console.log(cid)
            var result = await postData('subcategory/fetch_all_subcategory_by_categoryid',{categoryid:cid});
            if (result && result.status) {
                console.log(result.data)
                setSubCategoryList(result.data);
            }
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            // Handle the error as needed, e.g., show an error message to the user
        }
    }
    useEffect(function(){fetchAllSubCategory()},[])

    const fillAllSubCategory=()=>{
        return  subCategoryList.map((item)=>{
            console.log(item)
            return <MenuItem key={item.subcategoryid} value={item.subcategoryid} >{item.subcategoryname}</MenuItem>
        })
    }

    const fetchAllBrands=async(scid)=>{
        var result=await postData('brands/fetch_all_brands_by_subcategoryid',{subcategoryid: scid})
        if(result && result.status)
        {setBrandList(result.data)}
    }
    useEffect(function(){fetchAllBrands()},[])

    const fillAllBrands=()=>{
        return brandList.map((item)=>{
            return <MenuItem key={item.brandid} value={item.brandid}>{item.brandname}</MenuItem>
        })
    }


    const fetchAllProducts=async(bid)=>{
        var result=await postData('products/fetch_all_products_by_brandid',{brandid:bid})
        if(result && result.status)
        {setProductList(result.data)}
    }
    useEffect(function(){fetchAllProducts()},[])

    const fillAllProducts=()=>{
        return productList.map((item)=>{
            return <MenuItem key={item.productid} value={item.productid}>{item.productname}</MenuItem>
        })
    }

    const fetchAllProductDetails=async()=>{
        var result=await getData('productdetails/display_all_product_details')
        if(result && result.status)
        {setProductDetailData(result.data)}
    }
    useEffect(function(){fetchAllProductDetails()},[])

    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
        setShowBtn(true)
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }


    const handleClose=()=>{
        setOpen(false)
        setShowBtn(false)
    }
      const handleOpen=(rowData)=>{
        setOpen(true)
        fetchAllSubCategory(rowData.categoryid)
        setProductDetailId(rowData.productdetailid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        fetchAllBrands(rowData.subcategoryid)
        setBrandId(rowData.brandid)
        fetchAllProducts(rowData.brandid)
        setProductId(rowData.productid)
        setProduct(rowData.productname)
        setProductSubName(rowData.productsubname)
        setDescription(rowData.description)
        setWeight(rowData.weight)
        setWeightType(rowData.weighttype)
        setType(rowData.type)
        setPackaging(rowData.packaging)
        setQuantity(rowData.qty)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setOfferType(rowData.offertype)
        setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
        setTempPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
      }

    const handleEditData=async()=>{
        var body={categoryid:categoryId, subcategoryid:subCategoryId, brandid: brandId, productid: productId,productsubname:productSubName, description: description, weight: weight, weighttype: weightType, type: Type, packaging: packaging, qty: quantity, price:price, offerprice: offerPrice, offertype:offerType, productdetailid: productDetailId}
        var result=await  postData('productdetails/edit_product_details_data',body)
        if(result.status)
        {
            Swal.fire({
              icon: "success",
              title: result.message,
              timer:1500,
              toast:'true'
            });
            
        }
       else
        {
            Swal.fire({
              icon:"error",
              title:result.message,
              timer:1500,
              toast:'true'
            });
           }
           fetchAllProductDetails()
    }

    const  handleEditPicture=async()=>{
        var formData=new FormData()
        formData.append('productid',productId)
        formData.append('picture',picture.bytes)
        var result=await postData('products/edit_product_picture',formData)
        if(result.status)
        {
            Swal.fire({
              icon: "success",
              title: result.message,
              timer:2000,
              toast:'true'
            });
            setShowBtn(false)
        }
        else
           {
            Swal.fire({
              icon:"error",
              title:result.message,
              timer:2000,
              toast:'true'
             });
            }
           fetchAllProducts()
        
    }


    const handleDelete=async(rowData)=>{
        Swal.fire({
            title: "Do you want to delete the Product Details?",
            toast:true,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              var body={productdetailid:rowData.productdetailid}
              var result=await postData('productdetails/delete_product_details_data',body)
              if (result.status)
              {
              Swal.fire({toast:true,title:"Product Deleted!",icon:"success"})
              fetchAllProductDetails()
            }
              else
              {
              Swal.fire({toast:true,title:"Fail to Delete Record",icon:"error"});
              }
            } else if (result.isDenied) {
              Swal.fire({toast:true,title:"Your Record is safe",  icon:"info"});
            }
          });
      
    }

    const handleCancel=()=>{
        setPicture({file:tempPicture,bytes:''})
        setShowBtn(false)
    }


    const showImages=()=>{
        return picture?.file?.map((item,index)=>{
            return (<div style={{margin:2,}}><ClearIcon key={index} onClick={()=>removeImage(index)}  style={{position:"relative", top:28, left:35, zIndex:50, color:"#FF0000", fontWeight:700, cursor:"pointer"}}/><Avatar key={index} src={URL.createObjectURL(item)} variant="rounded" style={{width:60}} /></div>)

        })
    }
    const removeImage = (index) => {
        const newFileArray = picture.file.filter((_, i) => i !== index);
        setPicture({ ...picture, file: newFileArray });
      };


    const ShowProductDetailForm=()=>{
        return(
            <Dialog
            open={open}
            close={handleClose}
            maxWidth={"md"}>
            <DialogContent>
          <div style={useStyles.boxDisplayPD}>
          <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent title="Insert Product Details" logo="logo.png" listicon="list.png" page='/displayallproductdeatils' />
                </Grid>

                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            label="Category"
                            value={categoryId}
                            error={error.categoryId}
                            onFocus={()=>handleError('categoryId',null)}
                            onChange={handleCategoryChange}
                            >
                                {fillAllCategory()}
                            </Select>
                            {error.categoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.categoryId}</span>:<></>}

                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Sub Category</InputLabel>
                        <Select
                            label="Sub Category"
                            value={subCategoryId}
                            onChange={handleSubCategoryChange}
                            onFocus={()=>handleError('subCategoryId',null)}
                            error={error.subCategoryId}
                            >
                                {fillAllSubCategory()}
                            </Select>
                            {error.subCategoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.subCategoryId}</span>:<></>}

                    </FormControl>
                </Grid>

                
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Brand</InputLabel>
                        <Select
                            label="Brand"
                            value={brandId}
                            onChange={handleBrandChange}
                            onFocus={()=>handleError('brandId',null)}
                            error={error.brandId}
                        >
                                {fillAllBrands()}
                            </Select>
                            {error.brandId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.brandId}</span>:<></>}

                    </FormControl>
                </Grid>
                
                <Grid item xs={3}>
                <FormControl fullWidth>
                        <InputLabel>Product</InputLabel>
                        <Select
                            label="Product"
                            value={productId}
                            onChange={(event)=>setProductId(event.target.value)}
                            onFocus={()=>handleError('productId',null)}
                            error={error.productId}
                        >
                                {fillAllProducts()}
                            </Select>
                            {error.productId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.productId}</span>:<></>}

                    </FormControl>                
                    </Grid>

                <Grid item xs={12}>
                    <TextField value={productSubName} onFocus={()=>handleError('productSubName',null)} error={error.productSubName} helperText={<span style={{color:'#d32f2f',fontSize:12, fontFamily:'Kanit'}}>{error.productSubName}</span>} onChange={(event)=>setProductSubName(event.target.value)} label="Product Subname" fullWidth/>
                </Grid>

                <Grid item xs={12}>
                <TextField value={description} onFocus={()=>handleError('description',null)} error={error.description} helperText={<span style={{color:'#d32f2f',fontSize:12, fontFamily:'Kanit'}}>{error.description}</span>} onChange={(event)=>setDescription(event.target.value)} label="Description" fullWidth/>
                </Grid>

                <Grid item xs={3}>
                    <TextField value={weight} onFocus={()=>handleError('weight',null)} error={error.weight} helperText={<span style={{color:'#d32f2f',fontSize:12, fontFamily:'Kanit'}}>{error.weight}</span>} onChange={(event)=>setWeight(event.target.value)} label="Weight" fullWidth/>
                </Grid>

                <Grid item xs={3}>
                <FormControl fullWidth>
                        <InputLabel>Weight Type</InputLabel>
                        <Select
                            label="Weight Type"
                            value={weightType}
                            onChange={(event)=>setWeightType(event.target.value)}
                            onFocus={()=>handleError('weightType',null)}
                            error={error.weightType}
                        >
                                <MenuItem value="mg">mg</MenuItem>
                                <MenuItem value="ml">ml</MenuItem>
                                <MenuItem value="gm">gm</MenuItem>
                                
                                
                                
                                
                            </Select>
                            {error.weightType?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.weightType}</span>:<></>}

                    </FormControl>                 
                    </Grid>

                    <Grid item xs={3}>
                <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                            label="Type"
                            value={Type}
                            onChange={(event)=>setType(event.target.value)}
                            onFocus={(event)=>handleError('Type',null)}
                            error={error.Type}
                        >       
                                <MenuItem value="Tablet">Tablet</MenuItem>
                                <MenuItem value="Capsule">Capsule</MenuItem>
                                <MenuItem value="Respule">Respule</MenuItem>
                                <MenuItem value="Syrup">Syrup</MenuItem>
                                <MenuItem value="Drop">Drop</MenuItem>
                                <MenuItem value="Inhaler">Inhaler</MenuItem>
                                <MenuItem value="Injection">Injection</MenuItem>
                                <MenuItem value="Patches">Patches</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                            {error.Type?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.Type}</span>:<></>}

                    </FormControl>                 
                    </Grid>

                    <Grid item xs={3}>
                <FormControl fullWidth>
                        <InputLabel>Packaging</InputLabel>
                        <Select
                            label="Packaging"
                            value={packaging}
                            onChange={(event)=>setPackaging(event.target.value)}
                            onFocus={(event)=>handleError('packaging',null)}
                            error={error.packaging}
                        >
                                <MenuItem value="Single">Single</MenuItem>
                                <MenuItem value="Strip">Strip</MenuItem>
                                <MenuItem value="Box">Box</MenuItem>
                            </Select>
                            {error.packaging?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.packaging}</span>:<></>}

                    </FormControl>                 
                    </Grid>

                    <Grid item xs={3}>
                        <TextField value={quantity} onFocus={()=>handleError('quantity',null)} error={error.quantity} helperText={<span style={{color:'#d32f2f',fontSize:12, fontFamily:'Kanit'}}>{error.quantity}</span>} onChange={(event)=>setQuantity(event.target.value)} label="Quantity" fullWidth/>
                    </Grid>

                    <Grid item xs={3}>
                        <TextField value={price} onFocus={()=>handleError('price',null)} error={error.price} helperText={<span style={{color:'#d32f2f',fontSize:12, fontFamily:'Kanit'}}>{error.price}</span>} onChange={(event)=>setPrice(event.target.value)} label="Price" fullWidth/>
                    </Grid>

                    <Grid item xs={3}>
                        <TextField value={offerPrice} onFocus={()=>handleError('offerPrice',null)} error={error.offerPrice} helperText={<span style={{color:'#d32f2f',fontSize:12, fontFamily:'Kanit'}}>{error.offerPrice}</span>} onChange={(event)=>setOfferPrice(event.target.value)} label="Offer Price" fullWidth/>
                    </Grid>

                    <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Offer Type</InputLabel>
                        <Select
                            label="Offer Type"
                            value={offerType}
                            onChange={(event)=>setOfferType(event.target.value)}
                            onFocus={(event)=>handleError('offerType',null)}                            
                            error={error.offerType}
                        >
                                <MenuItem value="Deal of the day!">Deal of the day!</MenuItem>
                                <MenuItem value="Flat 50!">Flat 50!</MenuItem>
                                <MenuItem value="DEAL60!">DEAL60!</MenuItem>
                            </Select>
                            {error.offerType?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.offerType}</span>:<></>}

                    </FormControl>                      
                    </Grid>

                    <Grid item xs={6}>
                   {showBtn?<div style={{width:'100%',height:100,justifyContent:'space-evenly',display:'flex',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture} >Save</Button><Button variant="contained" onClick={handleCancel}>Cancel</Button></div>:<div style={{width:'100%',height:100,display:'flex',alignItems:'center'}}>
                    <Button variant="contained" component="label" fullWidth >
                        Set New Picture
                        <input onClick={()=>handleError('picture',null)}  onChange={handlePicture} type="file" hidden accept="images/*" multiple/> 
                    </Button>
                    </div>}
                </Grid>
                
                <Grid item xs={6} style={{display:'flex', justifyContent:'center', }}>
                    {showImages()}
                </Grid>



            </Grid>
          </div>
          <DialogContent/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditData}>Edit Data</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>

        </Dialog>
        )
    }

    function ShowAllProductDetails() {
        return (
          <MaterialTable
          title={<img src={mainLogo} alt="Logo" width={150} />}
            columns={[
                { title: 'ProductdetailId', field: 'productdetailid' },
                { title: 'Category',  render:(rowData)=><div><div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div></div>  },
              
                { title: 'Product', render:(rowData)=><div><div>{rowData.brandname}</div><div>{rowData.productname} {rowData.productsubname} {rowData.weight} {rowData.weighttype}</div></div>  },
                { title: 'Type', render:(rowData)=><div><div>{rowData.qty} {rowData.type}</div><div>{rowData.packaging} </div></div> },
     
                
                { title: 'Price', render:(rowData)=><div><div><s>&#8377;{rowData.price}</s></div><div>&#8377;{rowData.offerprice} </div></div>  },
                 
                { title: 'Offertype', field: 'offertype' },
                { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture.split(",").pop()}`} style={{width:60,height:60,borderRadius:30}}/></> },
                 
              ]}
            data={productDetailData}
                    
            actions={[
                
              {
                icon: 'edit',
                tooltip: 'Edit Product Detail',
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: 'delete',
                tooltip: 'Delete Product Detail',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New Product Detail',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/productdetails')
              }
            ]}
            options={{ 
              headerStyle: { position: 'sticky', top: 0, background:'	#D0D0D0', zIndex:100}, 
              maxBodyHeight: '400px',
              paging: true,
              pageSize: 3,
              emptyRowsWhenPaging: false,
              pageSizeOptions: [3,5,7,10],
            }}
            
            
          />
        )
      }

    
    return(<div style={useStyles.root}>
        <div style={useStyles.boxDisplay} >
        {ShowAllProductDetails()}
            
        </div>
        {ShowProductDetailForm()}
        

    </div>)

}