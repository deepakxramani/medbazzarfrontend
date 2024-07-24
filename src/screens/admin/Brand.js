import TitleComponent from "../../components/admin/TitleComponent"
import { postData } from "../../services/FetchNodeServices"
import  { brandStyles }  from "./BrandCss"
import { Grid,Button,TextField,Avatar } from "@mui/material"
import { useState } from "react"
import Swal from "sweetalert2"


export default function Brand(props){
    
    
    const [brand,setBrand]=useState('')
    const [error,setError]=useState({})
    const [picture,setPicture]=useState({file:'brandicon.png',bytes:''})

   const handlePicture=(event)=>{
    setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
   }

   const handleError=(label,msg)=>{
    setError((prev)=>({...prev,[label]:msg}))

   }

   const handleReset=()=>{
    setBrand('')
    setPicture({file:'brandicon.png',bytes:''})
   }
    
   const handleSubmit= async()=>{
    var submit=true
    if(brand.length===0)
    {
        handleError('brand','Pls Input Brand Name....')
        submit=false;
    }
    if(picture.bytes.length===0)
    {
        handleError('picture','Pls Choose Icon...')
        submit=false;
    }
    if(submit)
    {
        var formData= new FormData()
        formData.append('brandname',brand)
        formData.append('brandicon',picture.bytes)
        var result=await postData('brands/submit_brand',formData)

        if(result.status)
        {
            Swal.fire({
                icon: "success",
                title: result.message,
                timer:1500,
                toast: true
              });

        }
        else
        {
            Swal.fire({
                icon: "error",
                title: result.message,
                timer:1500,
                toast: true
              });
        }

    }
    
   }





    return(<div style={brandStyles.mainBox}>
        <div style={brandStyles.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent logo="logo.png" title="Add New Brands" listicon='list.png' page="/admindashboard/displayallbrands" />
                </Grid>

                <Grid item xs={12}>
                    <TextField value={brand}  onFocus={()=>handleError('brand',null)} error={error.brand} helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.brand}</span>} onChange={(event)=>setBrand(event.target.value)} label="Brand Name"  fullWidth/>
                </Grid>

                <Grid item xs={6}>
                    <Button variant="contained" component="label" fullWidth >
                        upload
                        <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple/>
                    </Button> 
                    {error.picture?<span style={{fontFamily:'kanit',color:'#d32f2f',marginLeft:'5%',fontSize:13}}>{error.picture}</span>:<></>}
                </Grid>

                <Grid item xs={6} style={{display:'flex',justifyContent:'center'}} >
                   <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" />
                </Grid>

                <Grid item xs={6}>
                    <Button  onClick={handleSubmit} variant="contained" fullWidth >
                        Submit
                    </Button> 
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleReset} variant="contained" fullWidth >
                       Reset
                    </Button> 
                </Grid>

            </Grid>

        </div>
    </div>)
}