import { Grid, Button } from "@mui/material";
import { serverURL } from '../../services/FetchNodeServices';
import { createRef } from 'react';
import React,{ useState } from "react";
import {useNavigate} from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import  {useTheme}  from '@mui/material/styles';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Divider from '@mui/material/Divider';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import parse from 'html-react-parser';
import {useDispatch,useSelector} from 'react-redux';
import PlusMinusComp3 from "./PlusMinusComp3";




export default function ProductInformation(props){

    var sld=createRef()
    var navigate = useNavigate()
    var dispatch = useDispatch()



    var theme=useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    const productFromRedux = useSelector(state=>state.data)
    var values = Object.values(productFromRedux)

    // var product = props?.item
    var product
    // if(values?.length==0)
    // {
    //     // alert("Blank!")
    // }   
    // else
    // {
    //     alert("Product Exist!")
    //     var prd=productFromRedux[product?.productdetailid]
    //     alert(JSON.stringify(prd))
    // }

    if(values?.length==0)
    {
       product=props?.item
       product['qty']=0
    }   
    else
    {
        var prd=productFromRedux[props.item?.productdetailid]
        console.log("PRD",prd)
        if(prd===undefined)
        {
            product=props?.item
            product['qty']=0
        }
        else
        {
            product=prd
        }
        
    }

        // console.log("Product:",product)
    

    const handleChange=(v,item)=>{
        if(v>0)
        {
          item['qty']=v
          dispatch({type:'ADD_PRODUCT',payload:[item.productdetailid,item]})
          
        }
        else
        {
          dispatch({type:'DELETE_PRODUCT',payload:[item.productdetailid]})
          
        }
        props.setPageRefresh(!props.pageRefresh) 
        
      }

    return(<div>
    <div style={{  borderRadius:20, margin:10, padding:10, display:'flex',alignItems:'center',justifyContent:'center'}}>            
            <Grid container spacing={1}>
                <Grid item xs={12} >
                    <div style={{background:"#e8e337",display:'inline-block',width:'auto',clipPath:'polygon(100% 0, 80% 50%, 100% 100%, 0% 100%, 0 50%, 0% 0%)'}}>
                        <p style={{fontSize:14, fontWeight:500, padding:'5px 10px',marginRight:30}}>{product?.offertype}</p>
                    </div>
                </Grid>
                <Grid item xs={12} style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <div>
                        <p style={{fontSize:matchesMd?18:25,fontWeight:600,marginRight:matchesMd?20:10}}>{product?.productname} | {product?.productsubname} | {product?.weight}{product?.weighttype}</p>
                    </div>
                    <div style={{display:'flex', gap:10}}>
                        <BookmarkAddOutlinedIcon style={{fontSize:matchesMd?25:30, cursor:'pointer'}}/>
                        <ShareOutlinedIcon style={{fontSize:matchesMd?25:30,cursor:'pointer'}}/>
                    </div>
                </Grid>

                <Grid item xs={12} style={{display:'flex', alignItems:'center', gap:10,margin:'5px 0px'}}>
                    <div>
                        <p>{product?.brandname}</p>
                    </div>
                    <span>•</span>
                    <div>
                        <p>{product?.weight}{product?.weighttype}</p>
                    </div>
                    <span>•</span>
                    <div style={{background:'#99f6b4', padding:8, borderRadius:40}}>
                        <p style={{fontSize:15, fontWeight:500}}>In Stock</p>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Divider style={{background:'#A0ABBB',width:'100%'}}/>
                </Grid>
                <Grid item xs={12} style={{display:'flex', alignItems:'center', gap:15,margin:'5px 0px'}}>
                    <div><h2>₹{product?.offerprice!=0?product?.offerprice:product?.price}</h2></div>
                    {product?.offerprice==0?<div></div>:<div><p style={{textDecoration:'line-through',color:'#ccc'}}>MRP ₹{product?.price}</p></div>}
                    
                    {product?.offerprice!==0?<div style={{background:"#e8e337",display:'inline-block',borderRadius:40}}>
                        <p style={{fontSize:15, fontWeight:500, padding:"5px 10px",}}>{product?.offerprice!==0?<div>Save: &#8377;{product?.price-product?.offerprice}</div>:<div></div>}</p>
                    </div>:<div></div>}
                </Grid>
                <Grid item xs={12}>
                    <div style={{display:'flex', alignItems:'center',padding:'5px 0px'}}><WatchLaterIcon style={{fontSize:18, marginRight:3,marginTop:3}}/>Delivery within <span style={{marginLeft:3,fontWeight:600}}>1-3 days</span></div>
                </Grid>
                <Grid item xs={12} style={{marginTop:6,marginBottom:6, display:'flex', flexDirection:'column'}}>
                    <h3 style={{fontSize:17}}>Select available variant</h3>
                    <div style={{marginTop:15, display:'inline-flex', gap:10}}>
                    <Button variant="outlined">200ml</Button>
                    <Button variant="outlined">500ml</Button>
                    <Button variant="outlined">1l</Button>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{display:'flex', gap:40,padding:'15px 0px'}}>
                    <PlusMinusComp3  qty={product?.qty} onChange={(v)=>handleChange(v,product)} width={200} height={50} fontSize={18} margin={'0px 10px'} />
                    <button onClick={()=>navigate('/')} style={{display:'inline-flex', alignItems:'center', justifyContent:'center',width: matchesSM?'100px':'200px', height: matchesSM?'40px':'50px', padding:'10px 15px', gap:10, fontSize: matchesSM?12:15, fontWeight:600,color:'#fff',background:'#228B22',border:'none',borderRadius:10, cursor:'pointer'}}>CONTINUE {matchesSM?'':'SHOPPING'}<LocalMallIcon style={{color:'#fff',fontSize:matchesSM?15:18}}/></button>
                    </div>
                </Grid>
                <Grid item xs={12} style={{marginTop:30,marginBottom:30, display:'flex', flexDirection:'column'}}>
                    <p style={{fontSize:18,color:'grey'}}>Description</p>
                    <div style={{marginTop:15, display:'block'}}>
                        {parse(product?.pd_description)}
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Divider style={{background:'#A0ABBB',width:'100%'}}/>
                </Grid>
                <Grid item xs={12} style={{marginTop:30,marginBottom:6, display:'flex', flexDirection:'column'}}>
                   <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <p style={{fontSize:20, fontWeight:500}}>Specifications</p>
                    </Grid>
                   </Grid>

                   <Grid container spacing={2} style={{marginTop:10}}>
                        <Grid item xs={6}>
                            <p style={{fontSize:16, color:'grey'}}>Pack of</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p style={{fontSize:16, fontWeight:500}}>1</p>
                        </Grid>

                        <Grid item xs={6}>
                            <p style={{fontSize:16,color:'grey'}}>Brand</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p style={{fontSize:16, fontWeight:500}}>{product?.brandname}</p>
                        </Grid>

                        <Grid item xs={6}>
                            <p style={{fontSize:16,color:'grey'}}>Quantity</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p style={{fontSize:16, fontWeight:500}}>{product?.weight} {product?.weighttype}</p>
                        </Grid>

                        <Grid item xs={6}>
                            <p style={{fontSize:16,color:'grey'}}>Type</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p style={{fontSize:16, fontWeight:500}}>{product?.type}</p>
                        </Grid>

                        <Grid item xs={6}>
                            <p style={{fontSize:16,color:'grey'}}>Applied For</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p style={{fontSize:16, fontWeight:500}}>{product?.concernname}</p>
                        </Grid>

                        <Grid item xs={6}>
                            <p style={{fontSize:16,color:'grey'}}>Maximum Shell Life</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p style={{fontSize:16, fontWeight:500}}>36 Months</p>
                        </Grid>
                   </Grid>

                </Grid>
            </Grid>
        </div>
    </div>)
    
}