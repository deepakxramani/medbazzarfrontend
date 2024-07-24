import { useState,useEffect } from "react";
import TitleComponent from "../../components/admin/TitleComponent";
import { subcategoryStyle } from "./SubcategoryCss";
import { Grid,TextField,Button, Avatar } from "@mui/material";
import {FormControl,Select,MenuItem,InputLabel} from '@mui/material'
import { postData, getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";

export default function Subcategory(props){
  
    const [picture,setPicture]=useState({file:'subcategory.png',bytes:''})
    const [error,setError]=useState({})
    const [categoryId,setCategoryId]=useState('')
    const [subCategory,setSubCategory]=useState('')
    const [categoryList,setCategoryList]=useState([])
    
    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        if(result.status)
        { setCategoryList(result.data)}
        
        }

    useEffect(function(){fetchAllCategory()},[])
    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))



    }
    const fillAllCategory=()=>{
       return categoryList.map((item)=>{

            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
        
    }

    const handleSubmit=async()=>{
        var submit=true
        if(categoryId.length===0)
        {
            handleError('categoryid','Pls Input CategoryId....')
            submit=false
        }
        if(subCategory.length===0)
        {
            handleError('subCategory','Pls Input Subcategory Name....')
            submit=false
        }
        if(picture.bytes.length===0)
        {
            handleError('picture','Pls Choose Icon....')
            submit=false
        }
        if(submit)
        {
            var formData = new FormData()
            formData.append('categoryid',categoryId)
            formData.append('subcategoryname',subCategory)
            formData.append('picture',picture.bytes)
            var result=await postData('subcategory/submit_subcategory',formData)
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
    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleReset=()=>{
        setPicture({file:'subcategory.png'})
        setCategoryId('')
        setSubCategory('')
    }
    
    return(<div style={subcategoryStyle.mainBox}>
        <div style={subcategoryStyle.box}>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <TitleComponent logo="logo.png" title=" Add New Sub Categories" listicon='list.png' page="/admindashboard/displayallsubcategory" />  
                </Grid>
                
                <Grid item xs={12}>
                    
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                        label="Category" value={categoryId}
                        onChange={(event)=>setCategoryId(event.target.value)}>
                          {fillAllCategory()}

                        </Select>

                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField  value={subCategory} onFocus={()=>handleError('subCategory',null)} error={error.subCategory} helperText={<span style={{fontSize:13,fontFamily:'kanit'}} >{error.subCategory}</span>}  onChange={(event)=>setSubCategory(event.target.value)} label="Subcategory Name" fullWidth/>
                </Grid>

                <Grid item xs={6}>
                    <Button variant="contained" component="label" fullWidth >
                        Upload
                        <input onClick={()=>handleError('picture',null)}  onChange={handlePicture} type="file" hidden accept="images/*"/> 
                    </Button>
                    {error.picture?<span style={{fontSize:13,fontFamily:'Kanit',margin:'5%',color:'#d32f2f'}}> {error.picture}</span>:<></>}
                </Grid>
                <Grid  item xs={6} style={{display:'flex',justifyContent:'center'}} >
                    <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" />
                </Grid>

                <Grid item  xs={6}>
                    <Button variant="contained" onClick={handleSubmit} fullWidth>
                        Submit             
                    </Button>
                </Grid>

                <Grid item  xs={6}>
                    <Button variant="contained" onClick={handleReset}  fullWidth>
                        Reset             
                    </Button>
                </Grid>
            </Grid>
           
        </div>
    </div>)

}