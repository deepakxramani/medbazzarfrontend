import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { serverURL } from '../../services/FetchNodeServices';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import  {useTheme}  from '@mui/material/styles';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SliderComponent(props) {
  var sld=createRef()
  var theme=useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  var banners = props?.data || {}
  var images = Object.values(banners)[0]?.picture?.split(',');
  const showSlide = () => {
    return images?.map((item,i) => {
      return (
        
        <div key={i}>
          <img
            src={`${serverURL}/images/${item}`}
            style={{
                width: "95%",
                borderRadius: 10,
                height: 'auto',
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                aspectRatio: 4/2
            }}
          /> 
        </div> 
       
      );
    });
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: 'infinite',

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
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
    <div style={{ width: '85%', position: 'relative',marginTop:matchesSM?160:100 }}>
        <div style={{position:'absolute',top: '40%',display:matchesSM?'none':'flex',alignItems:'center',justifyContent:'center',width:40,height:40, borderRadius:20,background:'#95a5a6', opacity:0.6, zIndex:1, cursor: 'pointer'}}>
            <ArrowBackIosIcon onClick={handleForward} />
        </div>
            <Slider ref={sld} {...settings}>{showSlide()}</Slider>
        <div style={{position:'absolute',top:'40%',right: '0.07%',display:matchesSM?'none':'flex',alignItems:'center',justifyContent:'center',width:40,height:40, borderRadius:20,background:'#95a5a6', opacity:0.6, zIndex:1, cursor: 'pointer'}}>
            <ArrowForwardIosIcon onClick={handleBackward}/>
        </div>
    </div>
  );
}
