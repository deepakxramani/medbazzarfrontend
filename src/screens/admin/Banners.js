import { useState, useEffect } from "react";
import {Button, Grid, TextField,Avatar} from "@mui/material"
import {FormControl,Select,MenuItem,InputLabel} from '@mui/material'
import { useStyles } from "./CategoriesCss";
import TitleComponent from "../../components/admin/TitleComponent";
import { postData, getData } from "../../services/FetchNodeServices";


import Swal from "sweetalert2"

export default function Banners()
{  var classes = useStyles()
    const [bannerType,setBannerType]=useState('')
    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])
    const [picture,setPicture]=useState({file: [], bytes:''})
    const [error,setError]=useState({})
    
    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }
    const handleReset=()=>{
        
        setPicture({file:[],bytes:''})
        console.log(picture.file)
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

    const handleSubmit=async()=>{
        // alert(category.length)
        var submit=true
        if(bannerType.length===0)
        {
            handleError('bannerType','Please select banner type!')
            submit=false
            console.log(error)
        }
        if(brandId.length===0)
        {
            handleError('brandId','Please select brand!')
            submit=false
            console.log(error)
        }
        if(picture.file.length<5)
        {
            handleError('picture','Please choose atleast 5 pictures!')
            setPicture([])            
            submit=false
        }
        if(submit)
        {   var formData = new FormData()
            formData.append('bannertype',bannerType)
            formData.append('brandid',brandId)
            picture.file.map((item,i)=>{
                formData.append('picture'+i,item)
    
                })
            
            var result=await postData('banner/submit_banner_details',formData)
            // console.log(result.status)
            // alert(result.message)
        }
        if(result && result.status)
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

    const handlePicture=(event)=>{
        // alert(JSON.stringify(event.target.files))
        console.log(event.target.files)

        if(Object.values(event.target.files).length>=5)
        {
            setPicture({file: Object.values(event.target.files),bytes:event.target.files})
        }
        else
        {
            Swal.fire({
                icon: "info",
                title: "Please upload 5 or more files...",
                timer: 1500,
                
              });
        }
    }
    const showImages = () => {
        return picture?.file?.length > 0 ? picture.file.map((item,index) => {

            return (<div style={{ marginLeft: 2,marginRight: 2,padding:'0px 4px', cursor: 'pointer' }}><Avatar key={index} alt="Remy Sharp" src={URL.createObjectURL(item)} style={{width:40,height:40,borderRadius:20}} variant="Rounded" /></div>)

        }): null

    }
    return(<div className={classes.root}>
        <div className={classes.box} style={{width:800}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent title="Add Banners" logo="logo.png" listicon="list.png" page='/displayallcategory' />
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Banner Type</InputLabel>
                        <Select
                            label="Banner Type"
                            value={bannerType}
                            onChange={(e)=>setBannerType(e.target.value)}
                            onFocus={()=>handleError('bannerType',null)}
                            error={error.bannerType}
                            >
                                <MenuItem value="General">General</MenuItem>
                                <MenuItem value="Brand">Brand</MenuItem>
                                <MenuItem value="Trending">Trending</MenuItem>
                                <MenuItem value="Latest">Latest</MenuItem>
                                <MenuItem value="Populor">Populor</MenuItem>
                            </Select>
                            {error.bannerType?<span style={{fontSize:13,fontFamily:'Kanit',margin:'2%',color:'#d32f2f'}}> {error.bannerType}</span>:<></>}

                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Brand</InputLabel>
                        <Select
                            label="Brand"
                            value={brandId}
                            onChange={(event)=>setBrandId(event.target.value)}
                            onFocus={()=>handleError('brand',null)}
                            error={error.brand}
                            >
                                {bannerType === 'Brand' ? (
                                    fillAllBrands()
                                ) : (
                                    <MenuItem value={0}>None</MenuItem>
                                )}
                            </Select>
                            {error.brand?<span style={{fontSize:13,fontFamily:'Kanit',margin:'2%',color:'#d32f2f'}}> {error.brand}</span>:<></>}

                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                <Button variant="contained" component="label" fullWidth>
                    Upload
                    <input onClick={()=> handleError('picture', null)}  onChange={handlePicture} type="file" hidden accept="images/*" multiple/>
                </Button>
                {error.picture?<span style={{color:'#d32f2f',fontSize:12,marginLeft:12.5}}>{error.picture}</span>:<></>}
                </Grid>

                <Grid item xs={6} style={{display:'flex', justifyContent:'center',alignItems:'center' }}>
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