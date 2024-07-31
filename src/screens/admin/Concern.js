import { useState } from "react";
import {Button, Grid, TextField,Avatar} from "@mui/material"
import { useStyles } from "./CategoriesCss";
import TitleComponent from "../../components/admin/TitleComponent";
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2"

export default function Concern()
{  
    const [concern,setConcern]=useState('')
    const [picture,setPicture]=useState({file:'medicon.png', bytes:''})
    const [error,setError]=useState({})
    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
    }
    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }
    const handleReset=()=>{
        setConcern('')
        setPicture({file:'icon.png',bytes:''})
    }
    const handleSubmit=async()=>{
        // alert(category.length)
        var submit=true
        if(concern.length===0)
        {
            handleError('concern','Please input concern name!')
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
            formData.append('concernname',concern)
            formData.append('picture',picture.bytes)
            var result=await postData('concern/submit_concern_details',formData)
            // console.log(result.status)
            
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
    return(<div style={useStyles.root}>
        <div style={useStyles.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <TitleComponent title="Add New Concern" logo="logo2.png" listicon="list.png" page='/admindashboard/displayallconcerns' />
                </Grid>

                <Grid item xs={12}>
                    <TextField value={concern} onFocus={()=>handleError('concern',null)} error={error.concern} helperText={<span style={{color:'#d32f2f',fontSize:12, fontFamily:'Poppins'}}>{error.concern}</span>} onChange={(event)=>setConcern(event.target.value)} label="Concern Name" fullWidth/>
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