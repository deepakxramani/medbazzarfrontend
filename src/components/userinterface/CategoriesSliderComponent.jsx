import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { serverURL, getData, postData } from '../../services/FetchNodeServices';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import  {useTheme}  from '@mui/material/styles';

export default function CategoriesSliderComponent(props) {

  var images = props?.data
  var navigate = useNavigate()
  var sld = createRef()

  const theme = useTheme()
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const handleGotoFilterPage=(item)=>{
    navigate('/filterpage',{state:{categoryid:item.categoryid}})
  }
     
  const showSlide = () => {
    return images?.map((item,i) => {
      return (
        <div key={i} onClick={()=>handleGotoFilterPage(item)}>
        <div  style={{marginLeft:3,marginRight:3,width:"90%",display:'block',borderRadius:10}}>
          <img
            key={i}
            src={`${serverURL}/images/${item.picture}`}
            style={{
              width: matchesMd?"90%":"80%",
              borderRadius: 10,
              height: 'auto',
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              aspectRatio:3/3,
              cursor:'pointer'
            }}
          />
          <div style={{textAlign:'center', fontWeight:600,fontSize:matchesSM?12:15,marginTop:10}}><p style={{cursor:'pointer'}}>{item.categoryname}</p></div>
        </div>
        </div>
      );
    });
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
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
        <div style={{position:'absolute',top: '40%',display:matchesSM?'none':'flex',alignItems:'center',justifyContent:'center',width:40,height:40, borderRadius:20,background:'#95a5a6', opacity:0.6, zIndex:1, cursor: 'pointer'}}>
            <ArrowBackIosIcon onClick={handleForward} />
        </div>
        <div>
            <Slider ref={sld} {...settings}>{showSlide()}</Slider>
        </div>
        <div style={{position:'absolute',top:'40%',right: '0.09%',display:matchesSM?'none':'flex',alignItems:'center',justifyContent:'center',width:40,height:40, borderRadius:20,background:'#95a5a6', opacity:0.6, zIndex:1, cursor: 'pointer'}}>
            <ArrowForwardIosIcon onClick={handleBackward} />
        </div>
    </div>
  );
}
