import MaterialTable from "@material-table/core"
import { brandStyles } from "./BrandCss"
import {  useEffect, useState } from "react"
import { getData, postData, serverURL } from "../../services/FetchNodeServices"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button,Grid,Avatar,TextField } from "@mui/material";
import TitleComponent from "../../components/admin/TitleComponent";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import mainLogo from '../../../src/assets/logo2.png'

export default function DisplayAllBrands(){
    
    var navigate=useNavigate()
    
    const [brandData,setBrandData]=useState([])
    const [open,setOpen]=useState(false)
    const [error,setError]=useState({})
    const [brand,setBrand]=useState('')
    const [brandId,setBrandId]=useState('')
    const [showBtn,setShowBtn]=useState(false)
    const [tempPicture,setTepmPicture]=useState('')
    const [picture,setPicture]=useState({file:'brandicon.png',bytes:''})

   const handlePicture=(event)=>{
    setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setShowBtn(true)
   }

   const handleError=(label,msg)=>{
    setError((prev)=>({...prev,[label]:msg}))

   }
   const handleCancel=()=>{
    setPicture({file:tempPicture,bytes:''})
    setShowBtn(false)
   }


     const handleEditData=async()=>{
      var submit=true;
      if(brand.length===0)
      {
        handleError('brand','Pls Input  Brand Name')
        submit=false;
      }
      if (submit)
      {
        var body={brandid:brandId,brandname:brand}
        var result=await postData('brands/edit_brand_data',body)
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
         fetchAllBrand()
         

      }
 }
     

   const handleEditPicture=async()=>{
    var formData=new FormData()
    formData.append('brandid',brandId)
    formData.append('brandicon',picture.bytes)
    var result=await postData('brands/edit_brand_icon',formData)
    if(result.status)
    {
      Swal.fire({
        icon: "success",
        title: result.message,
        timer:1500,
        toast:'true'
      });
      setShowBtn(false)
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
     fetchAllBrand()
   }

   const handleDelete=async(rowData)=>{
    Swal.fire({
      title: "Do you want to delete the brand?",
      toast:true,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body={brandid:rowData.brandid}
        var result=await postData('brands/delete_brand_data',body)
        if (result.status)
        {
           Swal.fire({toast:true,title:"Deleted",icon:"success"})
           fetchAllBrand()
        }
        else
        {
          Swal.fire({toast:true,title:" Fail to Delete Record",icon:"success"});
        }
      } else if (result.isDenied) {
          Swal.fire({toast:true,title:"Your Record is safe",  icon:"info"});
      }
    });

   }

  
  
    const fetchAllBrand =async()=>{
      var result=await getData('brands/display_all_brands')
      
      if (result.status)
      {
        setBrandData(result.data)
      }
      
    }
    useEffect(function(){
      fetchAllBrand()
    },[])

    const handleClose=()=>{
      setOpen(false)
      setShowBtn(false)
    }
    const handleOpen=(rowData)=>{
      setOpen(true)
      setBrandId(rowData.brandid)
      setBrand(rowData.brandname)
      setPicture({file:`${serverURL}/images/${rowData.brandicon}`,bytes:''})
      setTepmPicture(`${serverURL}/images/${rowData.brandicon}`)
    }
  
   const showBrandForm=()=>{
    return(
    <Dialog
     open={open}
     onClose={handleClose}
     maxWidth={'md'}>
      
      <DialogContent>
      <div style={brandStyles.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent title="Edit Brands" listicon="list.png" logo="logo.png" />
                </Grid>

                <Grid item xs={12}>
                    <TextField value={brand}  onFocus={()=>handleError('brand',null)} error={error.brand} helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.brand}</span>} onChange={(event)=>setBrand(event.target.value)} label="Brand Name"  fullWidth/>
                </Grid>

                <Grid item xs={6}>
                  {showBtn?<div style={{width:'100%',height:100,justifyContent:'space-evenly', display:'flex', alignItems:'center'}} ><Button variant="contained" onClick={handleEditPicture} >Save</Button><Button onClick={handleCancel} variant="contained">Cancel</Button> </div>:<div style={{width:'100%',height:100,justifyContent:'space-evenly', display:'flex', alignItems:'center'}} >
                    <Button variant="contained" component="label" fullWidth >
                        Set New Picture
                        <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple/>
                    </Button> 
                   
                    </div> }
                </Grid>

                <Grid item xs={6} style={{display:'flex',justifyContent:'center'}} >
                   <Avatar  src={picture.file} variant="rounded" style={{width:100,height:100}} />
                </Grid>
            </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button  onClick={handleEditData}>Edit Data</Button>
        <Button onClick={handleClose} >Close</Button>
      </DialogActions>

    </Dialog>
   )}

    function ShowBrand() {
        return (
          <MaterialTable
          title={<img src={mainLogo} alt="Logo" width={150} />}
            columns={[
              { title: 'Brand Id', field: 'brandid' },
              { title: 'Brand Name', field: 'brandname' },
              { title: 'Icon', field: 'brandicon',render:(rowData)=><><img src={`${serverURL}/images/${rowData.brandicon}`} style={{width:60,height:60,borderRadius:30}} /></>},
             
            ]}
            data={brandData}
            options={{
              headerStyle: { position: 'sticky', top: 0, background:'	#D0D0D0', zIndex:100}, 
              maxBodyHeight: '340px',
              paging: true,
              pageSize: 3,
              emptyRowsWhenPaging: false,
              pageSizeOptions: [3,5,7,10],
              
            }}     
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Brand',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Brand',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New Brand',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/brand')
              }
            ]}
          />
        )
      }


return(<div style={brandStyles.mainBox}>
    <div style={brandStyles.boxDisplay}>
        {ShowBrand()}
    </div>
    {showBrandForm()}
</div>)


}