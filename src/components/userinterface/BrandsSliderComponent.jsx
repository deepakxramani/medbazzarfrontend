import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { serverURL, getData, postData } from '../../services/FetchNodeServices';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Paper from '@mui/material/Paper';
import { createRef } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import  {useTheme}  from '@mui/material/styles';


export default function BrandsSliderComponent(props) {

 var sld=createRef()
   
 var brands =  props?.data


 const theme = useTheme()
 const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
 const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
 const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const showSlide = () => {
    return brands?.map((item,index) => {
      return (
        <div>
        <Paper elevation={3} style={{width:matchesMd?"90%":"80%",display:'block',borderRadius:15}}>
          <img
            src={`${serverURL}/images/${item.brandicon}`}
            style={{
              width: matchesMd?"90%":"80%",  
              height: 'auto',
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              cursor:'pointer',
              objectFit:'contain',
              aspectRatio:3/3,
              borderRadius:15
              
              
            }}
          />
        </Paper>
        </div>
      );
    });
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: 'infinite',

    responsive: [
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 3,
        },
      },
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

  const handleForward=()=>{
    sld.current.slickNext()
  }
  
  const handleBackward=()=>{
  sld.current.slickPrev()
  }


  return (
    <div style={{ width: '95%', position: 'relative' }}>
        <div style={{position:'absolute',top: '40%',display:matchesSM?'none':'flex',alignItems:'center',justifyContent:'center',width:40,height:40, borderRadius:20,background:'#95a5a6', opacity:0.6, zIndex:1}}>
            <ArrowBackIosIcon onClick={handleForward} />
        </div>
          
            <Slider ref={sld} {...settings}>{showSlide()}</Slider>
           
        <div style={{position:'absolute',top:'40%',right: '0.09%',display:matchesSM?'none':'flex',alignItems:'center',justifyContent:'center',width:40,height:40, borderRadius:20,background:'#95a5a6', opacity:0.6, zIndex:2}}>
            <ArrowForwardIosIcon onClick={handleBackward} />
        </div>
    </div>
  );
}
