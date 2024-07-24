import Header from "../../components/userinterface/Header"
import SliderComponent from "../../components/userinterface/SliderComponent"
import BrandsSliderComponent from "../../components/userinterface/BrandsSliderComponent"
import CategoriesSliderComponent from "../../components/userinterface/CategoriesSliderComponent"
import ProductCard from "../../components/userinterface/ProductCard"
import FooterComponent from "../../components/userinterface/FooterComponent"
import { postData,getData } from "../../services/FetchNodeServices"
import { useState,useEffect } from "react"
import ConcernSlider from "../../components/userinterface/ConcernSlider"
import useMediaQuery from '@mui/material/useMediaQuery';
import  {useTheme}  from '@mui/material/styles';


export default function Home()
{

    const [bannerList, setBannerList]=useState([])
    const [brandList, setBrandList]=useState([])
    const [categoryList, setCategoryList]=useState([])
    const [concernList, setConcernList]=useState([])
    const [productListByOffer, setProductListByOffer]=useState([])
    const [pageRefresh,setPageRefresh]=useState(false)


    var theme=useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchAllBanners=async()=>{
        var result=await postData('userinterface/show_all_banners',{bannertype:'General'})
        setBannerList(result.data)
    }

    const fetchAllBrands=async()=>{
        var result=await getData('userinterface/show_all_brands')
        setBrandList(result.data)
    }

    const fetchAllCategory=async()=>{
        var result=await getData('userinterface/display_all_category')
        setCategoryList(result.data)
    }

    const fetchAllProductDetails=async(offertype)=>{
        var result=await postData('userinterface/display_all_product_details_by_offer',{offertype:offertype})
        setProductListByOffer(result.data)
        console.log(result.data)
    }

    const fetchAllConcerns=async()=>{
        var result=await getData('userinterface/display_all_concerns')
        setConcernList(result.data)
        console.log(result.data)
    }

    useEffect(function(){
        fetchAllBanners()
        fetchAllBrands()
        fetchAllCategory()
        fetchAllProductDetails('deal of the day!')
        fetchAllConcerns()
    })

    return(<div style={{fontFamily:'Kanit, sans-serif'}}>

    <Header />
    
        <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
            <SliderComponent data={bannerList}/>
        </div>

        <div style={{textAlign:'center',display:'flex',justifyContent:'center',flexDirection:'column',marginTop:20, padding:30}}>
        <h3 style={{fontSize:matchesMd?'1.1rem':'1.5rem',textAlign:'start', marginLeft:10}}>Browse by brands</h3>
        
            <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
                <BrandsSliderComponent data={brandList} />
            </div>
        </div>

        <div style={{textAlign:'center',display:'flex',justifyContent:'center',flexDirection:'column',marginTop:20, padding:30}}>
            <h1 style={{fontSize:matchesMd?'1.1rem':'1.5rem',textAlign:'start', marginLeft:10}}>Browse by category</h1>
            <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
            <CategoriesSliderComponent data={categoryList} />
            </div>
        </div> 

        <div style={{display:'flex', flexWrap:'wrap',padding:30,gap:1}}>
        
        <ProductCard pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} title="Deal of the day!" data={productListByOffer}  />
            
        </div>

        <div style={{textAlign:'center',display:'flex',justifyContent:'center',flexDirection:'column',marginTop:20, padding:30}}>
            <h1 style={{fontSize:matchesMd?'1.1rem':'1.5rem'|| matchesSM?'1.2rem':'1rem',textAlign:'start', marginLeft:10}}>Shop by concern</h1>
            <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
            <ConcernSlider data={concernList} />
            </div>
        </div> 

        <FooterComponent />

    </div>)
}