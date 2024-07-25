import { useState, useEffect } from "react";
import {Button, Grid, TextField,Avatar} from "@mui/material"
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { useStyles } from "./ProductDetailsCss";
import TitleComponent from "../../components/admin/TitleComponent";
import { postData, getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMemo } from "react";
import ClearIcon from '@mui/icons-material/Clear';

export default function ProductDetails(){
    
    const modules = useMemo(() => ({
        toolbar: {
          container: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', "strike"],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['image', "link","video"],
            [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
          ],
          
        },
      }), [])

    const [picture, setPicture]=useState({file: [],bytes:''})
    const [error, setError]=useState({})
    const [categoryId, setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [brandId, setBrandId]=useState('')
    const [productId, setProductId]=useState('')
    const [categoryList, setCategoryList]=useState([])
    const [subCategoryList, setSubCategoryList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [productList,setProductList]=useState([])
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
    const [concernId, setConcernId]=useState('')
    const [concernList, setConcernList]=useState([])


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
                // console.log(result.data)
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
            // console.log(item)
            return <MenuItem key={item.subcategoryid} value={item.subcategoryid} >{item.subcategoryname}</MenuItem>
        })
    }


     



    const fetchAllBrands=async()=>{
        var result=await getData('brands/display_all_brands')
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


    const fetchAllConcern=async()=>{
        var result=await getData('concern/display_all_concerns')
        if(result && result.status)
        {setConcernList(result.data)}
    }
    useEffect(function(){fetchAllConcern()},[])

    const fillAllConcerns=()=>{
        return concernList.map((item)=>{
            return <MenuItem key={item.concernid} value={item.concernid}>{item.concernname}</MenuItem>
        })
    }



    const handlePicture=(event)=>{
        // alert(JSON.stringify(event.target.files))
        // console.log(event.target.files)
        if(Object.values(event.target.files).length<3)
        {
            Swal.fire({
                icon: "info",
                title: "Please upload 3 or more files...",
                timer: 1500,
                
              });
        }
        else
        {
            setPicture({file: Object.values(event.target.files),bytes:event.target.files})
        }
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handleReset=()=>{
        setCategoryId('')
        setSubCategoryId('')
        setBrandId('')
        setProductId('')
        setProductSubName('')
        setConcernId('')
        setDescription('')
        setWeight('')
        setWeightType('')
        setType('')
        setPackaging('')
        setQuantity('')
        setPrice('')
        setOfferPrice('')
        setOfferType('')
        setPicture({file: [],bytes:''})
    }

    const handleSubmit=async()=>{
        // alert(category.length)
        var submit=true
        if(categoryId.length===0)
        {
            handleError('categoryId','Please select category!')
            submit=false
            console.log(error)
        }
        if(subCategoryId.length===0)
        {
            handleError('subCategoryId','Please select subcategory!')
            submit=false
            console.log(error)
        }
        if(brandId.length===0)
        {
            handleError('brandId','Please select brand!')
            submit=false
            console.log(error)
        }
        if(productId.length===0)
        {
            handleError('productId','Please select product!')
            submit=false
            console.log(error)
        }
        if(productSubName.length===0)
        {
            handleError('productSubName','Please input product subname!')
            submit=false
            console.log(error)
        }
        if(concernId.length===0)
        {
            handleError('concern','Please select concern!')
            submit=false
            console.log(error)
        }
        if(description.length===0)
        {
            handleError('description','Please input description!')
            submit=false
            console.log(error)
        }
        if(weight.length===0)
        {
            handleError('weight','Please input weight!')
            submit=false
            console.log(error)
        }
        if(weightType.length===0)
        {
            handleError('weightType','Please select weight type!')
            submit=false
            console.log(error)
        }
        if(Type.length===0)
        {
            handleError('Type','Please select type!')
            submit=false
            console.log(error)
        }
        if(packaging.length===0)
        {
            handleError('packaging','Please select packaging!')
            submit=false
            console.log(error)
        }
        if(quantity.length===0)
        {
            handleError('quantity','Please input quantity!')
            submit=false
            console.log(error)
        }
        if(price.length===0)
        {
            handleError('price','Please input price!')
            submit=false
            console.log(error)
        }
        if(offerPrice.length===0)
        {
            handleError('offerPrice','Please input offer price!')
            submit=false
            console.log(error)
        }
        if(offerType.length===0)
        {
            handleError('offerType','Please select offer type!')
            submit=false
            console.log(error)
        }
        if(picture.file.length<3)
        {
            Swal.fire({
                icon: "info",
                title: "Please upload 3 pictures atleast!",
                timer: 1500,
                toast: true
              });
            handleError('picture','Please choose atleast 3 pictures!')
            setPicture([])
            submit=false
        }
        if(submit)
        {   var formData = new FormData()
            formData.append('categoryid',categoryId)
            formData.append('subcategoryid',subCategoryId)
            formData.append('brandid',brandId)
            formData.append('productid',productId)
            formData.append('productsubname', productSubName)
            formData.append('concernid' ,concernId)
            formData.append('description',description)
            formData.append('weight',weight)
            formData.append('weighttype', weightType)
            formData.append('type', Type)
            formData.append('packaging', packaging)
            formData.append('qty', quantity)
            formData.append('price', price)
            formData.append('offerprice', offerPrice)
            formData.append('offertype', offerType)
            picture?.file?.forEach((item,i)=>{
            formData.append('picture'+i,item)

            })
            var result=await postData('productdetails/submit_product_details',formData)
            // console.log(result.status)
            // alert(result.message)
        }
        if(result.status)
        {
            Swal.fire({
                icon: "success",
                title: result.message,
                timer: 1500,
                toast: true
              });
        }
        else
        {
            Swal.fire({
                icon: "error",
                title: result.message,
                timer: 1500,
                toast: true
              });
        }
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

      useEffect(function(){showImages()})

    return(<div style={useStyles.root}>
        <div style={useStyles.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent title="Insert Product Details" logo="logo.png" listicon="list.png" page='/admindashboard/displayallproductdetails' />
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

                <Grid item xs={6}>
                    <TextField value={productSubName} onFocus={()=>handleError('productSubName',null)} error={error.productSubName} helperText={<span style={{color:'#d32f2f',fontSize:12, fontFamily:'Kanit'}}>{error.productSubName}</span>} onChange={(event)=>setProductSubName(event.target.value)} label="Product Subname" fullWidth/>
                </Grid>

                <Grid item xs={6}>
                <FormControl fullWidth>
                        <InputLabel>Concern</InputLabel>
                        <Select
                            label="Concern"
                            value={concernId}
                            onChange={(event)=>setConcernId(event.target.value)}
                            onFocus={()=>handleError('concern',null)}
                            error={error.brandId}
                        >
                                {fillAllConcerns()}
                            </Select>
                            {error.concern?<span style={{fontSize:13,fontFamily:'Kanit',margin:'2%',color:'#d32f2f'}}> {error.concern}</span>:<></>}

                    </FormControl>                
                    </Grid>

                <Grid item xs={12}>
                    <div style={{height:'auto'}}>
                        <ReactQuill placeholder="Description" modules={modules} theme="snow" value={description} onChange={(e)=>setDescription(e)} style={{height:100,overflowY:'scroll'}} />                
                    </div>
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
                                <MenuItem value="liter">liter</MenuItem>
                                <MenuItem value="mm">mm</MenuItem>
                                <MenuItem value="gm">gm</MenuItem>
                                <MenuItem value="kg">kg</MenuItem>
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
                                <MenuItem value="Lotion">Lotion</MenuItem>
                                <MenuItem value="Powder">Powder</MenuItem>
                                <MenuItem value="Gel">Gel</MenuItem>
                                <MenuItem value="Spray">Spray</MenuItem>
                                <MenuItem value="Cream">Cream</MenuItem>
                                <MenuItem value="Juice">Juice</MenuItem>
                                <MenuItem value="Bar">Bar</MenuItem>
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
                                <MenuItem value="Bottles">Bottles</MenuItem>
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
                <Button variant="contained" component="label" fullWidth>
                    Upload
                    <input onClick={()=> handleError('picture', null)}  onChange={handlePicture} type="file" hidden accept="images/*" multiple/>
                </Button>
                {error.picture?<span style={{color:'#d32f2f',fontSize:12,marginLeft:12.5}}>{error.picture}</span>:<></>}
                </Grid>

                <Grid item xs={6} style={{display:'flex', justifyContent:'center', }}>
                    {showImages()}
                </Grid> 

                <Grid item xs={6} style={{display:'flex', justifyContent:'center', }}>
                <Button onClick={handleSubmit} variant="contained" fullWidth>
                    Submit
                </Button>
                </Grid>

                <Grid item xs={6} style={{display:'flex', justifyContent:'center', }}>
                    <Button onClick={handleReset} variant="contained" fullWidth>
                        Reset
                    </Button>
                </Grid>

            </Grid>
        </div>
    </div>)
}