import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../services/FetchNodeServices";
import { Button,Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Divider} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlusMinusComp from "./PlusMinusComp";
import {  useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import LocalMallIcon from '@mui/icons-material/LocalMall';


export default function ProductListing(props){
    const [pink,setPink]=useState(false)
    var navigate = useNavigate();
    var dispatch=useDispatch()
    var productFromRedux=useSelector(state=>state.data)
    var productRedux=Object.values(productFromRedux)
    
    const theme = useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

    var product = props?.data
    

    const handlePink=()=>{
        setPink(true)
      }
      const handleBlank=()=>{
        setPink(false)
      }

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

      const handleProductDetail=(item)=>{
        navigate('/productdetailsui',{state:{data:item}})
      }
    
    const productDetail=()=>{
      
    return product?.map((item,index)=>{
    return(
        <div className="product-card">
          {/* <div style={{display:'inline-block',width:70,backgroundColor:'yellow',clipPath:'polygon(100% 0, 80% 50%, 100% 100%, 0% 100%, 0 50%, 0% 0%)'}}><p style={{fontSize:13,padding:'2px 5px',fontWeight:500}}>20% Off</p></div> */}
        <div className="bookmark" style={{display:'flex',justifyContent:'end', padding:8,}}><div>{pink?<FavoriteIcon onClick={()=>handleBlank()}  style={{color:'red',cursor:'pointer'}}/>:<FavoriteBorderIcon onClick={()=>handlePink()} style={{color:'#000', cursor:'pointer'}}/>}</div></div>
        <div className="product-image">
          <img src={`${serverURL}/images/${item.picture}`} alt={item.productname} onClick={()=>handleProductDetail(item)}/>
          {/* <img src={product}/> */}
        </div>
        <div className="product-info" onClick={()=>handleProductDetail(item)}>
          <div className="product-name" style={{fontSize:matchesMd?'0.9rem':'1rem',height:matchesMd?35:30,}}>{item.productname} | {item.productsubname} | {item.weight}{item.weighttype}</div>
          <div className="product-price" style={{marginTop:matchesSM?25:30}}>
            {/* Conditionally render discount if available */}
              {item.offerprice!=0?<div>
              <span className="product-price-old" style={{fontSize:matchesMd?'13px':'16px'}}>₹{item.price}</span>
              <span className="product-price-new" style={{fontSize:matchesMd?'1rem':'1.2rem'}}>₹{item.offerprice}</span>
              </div>:
              <span className="product-price-new" style={{fontSize:matchesMd?'1rem':'1.2rem'}}>₹{item.price}</span>

              }
          </div>
        </div>
        <Divider style={{background:'#A0ABBB',width:'90%', margin:'0px auto'}}/>
        <div className="product-delivery" style={{fontSize:matchesMd?'0.7rem':'0.9rem' || matchesSM?'0.8rem':'0.9rem'}}><WatchLaterIcon style={{fontSize:matchesMd?12:18, marginRight:3}}/>Delivery within <span style={{marginLeft:3,fontWeight:600}}>1-3 days</span></div>
        <div className="product-actions">
          <PlusMinusComp qty={productFromRedux[item?.productdetailid]?.qty===undefined?0:productFromRedux[item?.productdetailid]?.qty} onChange={(v)=>handleChange(v,item)}/>
          <button style={{background:'#00391c',}}>Buy <LocalMallIcon style={{marginLeft:5, fontSize:18}}/></button>
          {/* Add other actions as needed, e.g., wishlist, compare */}
        </div>
        
      </div>
      )
      })
    }
    return(
    <div style={{display:'flex',marginLeft:'2%',justifyContent:'flex-start',height:'100%',flexDirection:'column',width:"auto",marginTop:'3%' ,background:"#fff"}}>
    <span>All Product</span>
    <div style={{display:'flex',flexWrap: 'wrap',justifyItems:'left'}}>
    {productDetail()}
    </div>
   
    </div>
    )
}
