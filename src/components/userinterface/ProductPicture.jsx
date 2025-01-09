import Slider from "react-slick";
import { Grid } from "@mui/material";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { serverURL } from '../../services/FetchNodeServices';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createRef } from 'react';
import { useState,useEffect,useRef } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import  {useTheme}  from '@mui/material/styles';


export default function ProductPicture(props){
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    var sld=createRef()
    
    var theme=useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    var productDetails = props?.item
    // console.log(productDetails)
    var images = productDetails.multi_picture.split(",");
   
    useEffect(() => {
      const interval = setInterval(() => {
          if (sliderRef.current) {
              const totalSlides = sliderRef.current.innerSlider.state.slideCount;
              const nextSlide = (currentSlide + 1) % totalSlides;
              setCurrentSlide(nextSlide);
          }
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
  }, [currentSlide]);


    // alert(images)
    const showSlide = () => {
        return images?.reverse()?.map((item,i) => {
          return (
              <div>
              <img
                className="product-slider-image"
                key={i}
                src={`${serverURL}/images/${item}`}
                onMouseOver={()=>handleImage(i)}
                style={{
                    width: 70,
                    height: 70,
                    margin:'0 auto',
                    borderRadius: 5,
                    objectFit:'contain',
                    border:'2px solid black',
                    aspectRatio: 3/3,
                }}
              />
            </div>
          );
        });
      };

      var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: matchesXS?false:true,
        verticalSwiping: true,
        arrows: false,
        autoplay:true,
        pauseOnHover: true,
        beforeChange: (current, next) => setCurrentSlide(next)
      };

    const handleForward=()=>{
        sld.current.slickNext()
    }
    const handleBackward=()=>{
      sld.current.slickPrev()
    }

    const handleImage=(index)=>{
      setCurrentSlide(index)
    }
   
    return(
    <div style={{boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', borderRadius:20, margin:10, padding:10, display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Grid container  style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Grid item xs={3}   style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
              <div>
                {matchesXS?'':<ExpandLessIcon style={{fontSize:60, marginLeft:'auto',marginRight:'auto'}} onClick={handleForward} />}
              </div>
              <div style={{width:'20%',height:'20%',display:'flex',justifyContent:'center',alignItems:'center', gap:6}}>
                <Slider ref={sld} {...settings}>{showSlide()}</Slider>
                </div>
              <div>
              {matchesXS?'':<ExpandMoreIcon style={{fontSize:60}} onClick={handleBackward}/>}
              </div>
            </Grid>
            <Grid item xs={9}  style={{width:'auto',height:350,display:'flex'}}>
          
                { <img src={`${serverURL}/images/${images[currentSlide]}`}  style={{width: '100%', height: '100%',borderRadius: 15,objectFit:'contain',border:'2px solid rgba(190,190,190,0.4)'}}/>}
                 
            </Grid>
            
        </Grid>
    </div>)
}