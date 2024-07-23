import thumbsup from "../../../src/assets/thumbsup.webp"
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Divider from '@mui/material/Divider';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import { serverURL } from "../../services/FetchNodeServices";
import PlusMinusComp from "./PlusMinusComp";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useMediaQuery from '@mui/material/useMediaQuery';
import  {useTheme}  from '@mui/material/styles';
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom"


export default function ProductCard(props){

      var dispatch = useDispatch()
      var navigate = useNavigate()
      const [pink,setPink]=useState(false)

      var productFromRedux = useSelector(state=>state.data)
      var productRedux = Object.values(productFromRedux)

      var product =  props?.data
      var title = props.title
      
      const theme = useTheme()
      const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
      const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
      const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

      
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
          <div className="product-name" style={{fontSize:matchesSM?'12px':'14px' ,height:matchesMd?35:30 || matchesSM?30:35,}}>{item.productname} | {item.productsubname} | {item.weight}{item.weighttype}</div>
          <div className="product-price" style={{marginTop:matchesSM?25:30}}>
            {/* Conditionally render discount if available */}
              {item.offerprice!==0?<div>
              <span className="product-price-old" style={{fontSize:matchesMd?'13px':'16px'}}>₹{item.price}</span>
              <span className="product-price-new" style={{fontSize:matchesMd?'1rem':'1.2rem'}}>₹{item.offerprice}</span>
              </div>:
              <span className="product-price-new" style={{fontSize:matchesMd?'1rem':'1.2rem'}}>₹{item.price}</span>

              }
          </div>
        </div>
        <Divider style={{background:'#A0ABBB',width:'90%', margin:'0px auto'}}/>
        <div className="product-delivery" style={{fontSize:matchesMd?'0.7rem':'0.9rem' || matchesSM?'0.8rem':'0.9rem' || matchesXS?'0.1rem':'0.9rem'}}><WatchLaterIcon style={{fontSize:matchesMd?12:18, marginRight:3}}/>Delivery within <span style={{marginLeft:3,fontWeight:600}}>1-3 days</span></div>
        <div className="product-actions">
          <PlusMinusComp qty={productFromRedux[item?.productdetailid]?.qty===undefined?0:productFromRedux[item?.productdetailid]?.qty} onChange={(v)=>handleChange(v,item)}/>
          <button style={{background:'#00391c',fontSize:14,width:60,height:matchesSM?'25px':'30px'}}>Buy <LocalMallIcon style={{marginLeft:5, fontSize:15}}/></button>
          {/* Add other actions as needed, e.g., wishlist, compare */}
        </div>
        
      </div>
      )
      })
}

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: matchesMd?4:6 ,
  slidesToScroll: 1,
  autoplay: 'infinite',
  responsive: [
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 340,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 390,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 420,
      settings: {
        slidesToShow: 2,
      },
    },
    
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1080,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1120,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1180,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 6,
      },
    },
    ],
  
};

return (
  <div style={{ width: '95%', position: 'relative' }}>
    <h2 style={{fontSize:matchesMd?'1.1rem':'1.5rem',marginLeft:10,marginBottom:10}}>{title}</h2>
      <div style={{position:'absolute',top: '40%',display:matchesSM?'none':'flex',alignItems:'center',justifyContent:'center',width:40,height:40, borderRadius:20,background:'#95a5a6', opacity:0.6, zIndex:1}}>
          {<ArrowBackIosIcon />}
      </div>
      <div>
          <Slider {...settings}>{productDetail()}</Slider>
      </div>
      <div style={{position:'absolute',top:'40%',right: '0.09%',display:matchesSM?'none':'flex',alignItems:'center',justifyContent:'center',width:40,height:40, borderRadius:20,background:'#95a5a6', opacity:0.6, zIndex:1}}>
          {<ArrowForwardIosIcon />}
      </div>
  </div>
);

}