import { useEffect, useState } from "react"
import { useStyles } from "./ProductsCss"
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
import mainLogo from '../../../src/assets/logo2.png'

export default function  DisplayAllProducts(){
    
    var navigate=useNavigate()

    const [productData,setProductData]=useState([])
    const [open,setOpen]=useState(false)
    const [showBtn,setShowBtn]=useState(false)
    const [error,setError]=useState({})
    const [picture,setPicture]=useState({file:'producticon.png',bytes:''})
    const [tempPicture,setTempPicture]=useState('')
    const [description,setDescription]=useState('')
    const [productId,setProductId]=useState('')
    const [product,setProduct]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [subCategoryId,setSubCategoryId]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [brandId,setBrandId]=useState('')


    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))

    }

   const handlePicture=(event)=>{
    setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setShowBtn(true)
   }

    const fetchAllSubCategory=async(cid)=>{
        var  result=await postData('subcategory/fetch_all_subcategory_by_categoryid',{categoryid:cid})
        if(result.status)
        {
            setSubCategoryList(result.data)
        }
    }
    useEffect(function(){fetchAllSubCategory()},[])

    const fillAllSubCategory=()=>{
        return  subCategoryList.map((item)=>{
            return <MenuItem value={item.subcategoryid} >{item.subcategoryname}</MenuItem>
        })
    }


    const fetchAllBrands=async()=>{
        var result=await getData('brands/display_all_brands')
        if(result.status)
        {setBrandList(result.data)}
    }
    useEffect(function(){fetchAllBrands()},[])

    const fillAllBrands=()=>{
        return brandList.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }


    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        if(result.status)
        {setCategoryList(result.data)}
    }
    useEffect(function(){fetchAllCategory()},[])

    const fillAllCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>

        })

    }

    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
    }


    const fetchAllProducts=async()=>{
        var result=await getData('products/display_all_products')
        if(result.status)
        {
            setProductData(result.data)
        }
    }
    useEffect(function(){fetchAllProducts()},[])


    const handleEditData=async()=>{
        var body={categoryid:categoryId, subcategoryid:subCategoryId, brandid: brandId, productname:product, description: description,productid: productId}
        var result=await  postData('products/edit_product_data',body)
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
           fetchAllProducts()
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
            title: "Do you want to delete the Product?",
            toast:true,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              var body={productid:rowData.productid}
              var result=await postData('products/delete_product_data',body)
              if (result.status)
              {
              Swal.fire({toast:true,title:"Product Deleted!",icon:"success"})
              fetchAllProducts()
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

    const handleClose=()=>{
      setOpen(false)
      setShowBtn(false)
  }
    const handleOpen=(rowData)=>{
      setOpen(true)
      fetchAllSubCategory(rowData.categoryid)
      setCategoryId(rowData.categoryid)
      setSubCategoryId(rowData.subcategoryid)
      setBrandId(rowData.brandid)
      setProductId(rowData.productid)
      setProduct(rowData.productname)
      setDescription(rowData.description)
      setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
      setTempPicture({file:`${serverURL}/images/${rowData.picture}`})
    }



    const ShowProductForm=()=>{
      return(
        <Dialog
         open={open}
         close={handleClose}
         maxWidth={"md"}>
          <DialogContent>
          <div style={useStyles.box}>
           <Grid container spacing={3}>
            <Grid item  xs={12}>
                <TitleComponent title="Edit Product" logo="logo.png" listicon="list.png" />
            </Grid>

            <Grid item  xs={4}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category"
                     value={categoryId}
                     onChange={handleCategoryChange}
                     error={error.categoryId}
                     onFocus={()=>handleError('categoryId',null)}>
                        
                        {fillAllCategory()}

                    </Select>
                    {error.categoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.categoryId}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel>SubCategory</InputLabel>
                    <Select label="Subcategory"
                    value={subCategoryId}
                    onChange={(event)=>setSubCategoryId(event.target.value)}
                    error={error.subCategoryId}
                    onFocus={()=>handleError('subCategoryId',null)}>
                        {fillAllSubCategory()}

                    </Select>
                    {error.subCategoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.subCategoryId}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={4}>
            <FormControl fullWidth>
                    <InputLabel>Brand</InputLabel>
                    <Select label="Brand"
                    value={brandId}
                    onChange={(event)=>setBrandId(event.target.value)}
                    error={error.brandId}
                    onFocus={()=>handleError('brandId',null)}>
                        {fillAllBrands()}
                    </Select>
                    {error.brandId?<span style={{fontSize:13,fontFamily:'Kanit',margin:'2%',color:'#d32f2f'}}> {error.brandId}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <TextField value={product} onFocus={()=>handleError('product',null)}  error={error.product}  helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.product}</span>} onChange={(event)=>setProduct(event.target.value)}  label="Product Name" fullWidth/>
            </Grid>

            <Grid item xs={12}>
                <TextField label="Descripton" onFocus={()=>handleError('description',null)} value={description}  helperText={<span style={{fontFamily:'kanit',fontSize:13}}>{error.description}</span> } error={error.description} onChange={(event)=>setDescription(event.target.value)} fullWidth/>
            </Grid>

            <Grid item xs={6}>
                   {showBtn?<div style={{width:'100%',height:100,justifyContent:'space-evenly',display:'flex',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture} >Save</Button><Button variant="contained" onClick={handleCancel}>Cancel</Button></div>:<div style={{width:'100%',height:100,display:'flex',alignItems:'center'}}>
                    <Button variant="contained" component="label" fullWidth >
                        Set New Picture
                        <input onClick={()=>handleError('picture',null)}  onChange={handlePicture} type="file" hidden accept="images/*" multiple/> 
                    </Button>
                    </div>}
                </Grid>

            <Grid item xs={6} style={{display:'flex',justifyContent:'center'}} >
                 <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" />
            </Grid>

           
           </Grid>
        </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditData}>Edit Data</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>

        </Dialog>
      )

    }

    function ShowAllProducts() {
        return (
          <MaterialTable
          title={<img src={mainLogo} alt="Logo" width={150} />}
            columns={[
              { title: 'ProductId',field:'productid'},
              { title: 'Category', field: 'categoryname' },
              { title: 'SubCategory', field: 'subcategoryname' },
              { title: 'Brand', field: 'brandname' },
              { title: 'Product',field:'productname'},
              { title: 'Description',field:'description' },
              { title: 'Picture',field:'picture',render:(rowData)=><><img  src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}}/> </>}
          
            ]}
            data={productData}
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
                tooltip: 'Edit Product',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Product',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New Product',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/products')
              }
            ]}
            
          />
        )
      }

    
    return(<div style={useStyles.root}>
        <div style={useStyles.boxDisplay}  >
        {ShowAllProducts()}
            
        </div>
        {ShowProductForm()}
        

    </div>)
}