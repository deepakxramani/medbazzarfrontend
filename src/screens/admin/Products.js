import { useState, useEffect } from "react";
import {Button, Grid, TextField,Avatar} from "@mui/material"
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { useStyles } from "./ProductsCss";
import TitleComponent from "../../components/admin/TitleComponent";
import { postData, getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";

export default function Products(){
    var classes = useStyles();
    const [picture,setPicture]=useState({file:'producticon.png', bytes:''})
    const [error,setError]=useState({})
    const [product,setProduct]=useState('')
    const [description,setDescription]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [brandId,setBrandId]=useState('')
    const [categoryList, setCategoryList]=useState([])
    const [subCategoryList, setSubCategoryList]=useState([])
    const [brandList,setBrandList]=useState([])


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



    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handleReset=()=>{
        setCategoryId('')
        setSubCategoryId('')
        setBrandId('')
        setProduct('')
        setDescription('')
        setPicture({file:'producticon.png',bytes:''})
    }

    const handleSubmit=async()=>{
        // alert(category.length)
        var submit=true
        if(categoryId.length===0)
        {
            handleError('categoryid','Please input category!')
            submit=false
            console.log(error)
        }
        if(subCategoryId.length===0)
        {
            handleError('subcategory','Please input sub category name!')
            submit=false
            console.log(error)
        }
        if(brandId.length===0)
        {
            handleError('brand','Please input brand name!')
            submit=false
            console.log(error)
        }
        if(product.length===0)
        {
            handleError('product','Please input product name!')
            submit=false
            console.log(error)
        }
        if(description.length===0)
        {
            handleError('description','Please input description!')
            submit=false
            console.log(error)
        }
        if(picture.bytes.length===0)
        {
            handleError('picture','Please choose icon!')
            submit=false
        }
        if(submit)
        {   var formData = new FormData()
            formData.append('categoryid',categoryId)
            formData.append('subcategoryid',subCategoryId)
            formData.append('brandid',brandId)
            formData.append('productname',product)
            formData.append('description',description)
            formData.append('picture',picture.bytes)
            var result=await postData('products/submit_product',formData)
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

    return(<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent title="Add New Product" logo="logo.png" listicon="list.png" page='/admindashboard/displayallproducts' />
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            label="Category"
                            value={categoryId}
                            error={error.categoryId}
                            
                            onChange={handleCategoryChange}
                            >
                                {fillAllCategory()}
                            </Select>
                            {error.categoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.categoryId}</span>:<></>}

                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel>Sub Category</InputLabel>
                        <Select
                            label="Sub Category"
                            value={subCategoryId}
                            onChange={(event)=>setSubCategoryId(event.target.value)}
                            error={error.subCategoryId}
                            >
                                {fillAllSubCategory()}
                            </Select>
                            {error.subCategoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.subCategoryId}</span>:<></>}

                    </FormControl>
                </Grid>

                
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel>Brand</InputLabel>
                        <Select
                            label="Brand"
                            value={brandId}
                            onChange={(event)=>setBrandId(event.target.value)}
                            error={error.brandId}
                        >
                                {fillAllBrands()}
                            </Select>
                            {error.brandId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.brandId}</span>:<></>}

                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={product} onFocus={()=>handleError('product',null)} error={error.product} helperText={<span style={{color:'#d32f2f',fontSize:12, fontFamily:'Poppins'}}>{error.product}</span>} onChange={(event)=>setProduct(event.target.value)} label="Product Name" fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <TextField value={description} onFocus={()=>handleError('description',null)} error={error.description} helperText={<span style={{color:'#d32f2f',fontSize:12, fontFamily:'Poppins'}}>{error.description}</span>} onChange={(event)=>setDescription(event.target.value)} label="Description" fullWidth/>
                </Grid>

                <Grid item xs={6}>
                <Button variant="contained" component="label" fullWidth>
                    Upload
                    <input onClick={()=> handleError('picture', null)}  onChange={handlePicture} type="file" hidden accept="images/*" />
                </Button>
                {error.picture?<span style={{color:'#d32f2f',fontSize:12,marginLeft:12.5}}>{error.picture}</span>:<></>}
                </Grid>

                <Grid item xs={6} style={{display:'flex', justifyContent:'center', }}>
                    <Avatar alt="" src={picture.file} variant="rounded" style={{width:50}}/>
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