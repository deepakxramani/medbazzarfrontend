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
import { Grid, Box, Typography, } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import  {useTheme}  from '@mui/material/styles';


export default function ProductCard2(props){

      var product =  props?.data
      const [pink,setPink]=useState(false)
      
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
      const handleChange=(v)=>{
        
      }

      
    
    const productDetail=()=>{

    return product?.map((item,index)=>{
    return(
       <div style={{width:200,height:260}}>
        <Grid container  style={{border:'2px solid black',borderRadius:10}}>
            <Grid item xs={12} style={{height:30,display:'flex',justifyContent:'flex-end',padding:2,border:'1px solid red'}}>
                <FavoriteBorderIcon />
            </Grid>
            <Grid item xs={12} style={{width:'30%',height:'40%'}}>
                <img src={thumbsup} style={{width:'20%',height:'20%',border:'2px solid red',margin:'0px auto'}}/>
            </Grid>
            <Grid item xs={12}>
              <p>Himalaya Herbals Purifying Neem Face Wash</p>
            </Grid>
            <Grid item xs={12}>
            <p>300Rs</p>
            </Grid>
        </Grid>
        
      </div>)
      })
}

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: matchesMd?3:6,
  slidesToScroll: 1,
  autoplay: 'infinite',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 8,
      },
    },
    ],
};

return (
  <div style={{ width: '95%', position: 'relative' }}>
      <div style={{position:'absolute',top: '40%',display:'flex',alignItems:'center',justifyContent:'center',width:40,height:40, borderRadius:20,background:'#95a5a6', opacity:0.6, zIndex:1}}>
          <ArrowBackIosIcon />
      </div>
      <div style={{}}>
          <Slider {...settings}>{productDetail()}</Slider>
      </div>
      <div style={{position:'absolute',top:'40%',right: '0.09%',display:'flex',alignItems:'center',justifyContent:'center',width:40,height:40, borderRadius:20,background:'#95a5a6', opacity:0.6, zIndex:1}}>
          <ArrowForwardIosIcon />
      </div>
  </div>
);

}