import {Grid} from "@mui/material"
import FilterComp from "../../components/userinterface/FilterComp"
import ProductListing from "../../components/userinterface/ProductListing"
import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import { postData } from "../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from "../../components/userinterface/Header";
import MenuBar from "../../components/userinterface/MenuBar"

export default function FilterPage(props){

    var location=useLocation()
    const [products,setProducts]=useState([])
    const [pageRefresh,setPageRefresh]=useState(false)

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    var categoryid=''
    
    try{
        if(location?.state?.categoryid==undefined)
        {
            categoryid=null
        }
        
        else
        {
            categoryid=location?.state?.categoryid
        }
    }
    catch(e){
       
    }

    var pattern=''
    try
    { if(location?.state?.pattern==undefined)
        {
            pattern=null
        }
        else
        {
            pattern=location?.state?.pattern
        }
        
    }
    catch(e){
        
    }

    const fetchAllProduct=async()=>{
     var result=await postData('userinterface/display_all_productdetail_by_category',{'categoryid':categoryid,'pattern':pattern})
    //  var uniqueData = [...new Set(result.data)];
     setProducts(result.data)
    }
   useEffect(function(){
    fetchAllProduct()

   },[])

    

    return(
        <Grid container spacing={3} style={{marginTop:60,height:'100%',width:'auto',fontFamily:'kanit',display:'flex',flexDirection:'row'}}>
        <Grid item xs={12} style={{display:'block',width:'100%'}}>
            <Header/>
            {matches?<MenuBar/> :<div></div>}
        </Grid>
        {matches?  <Grid item xs={4} style={{background:'#fff'}}>
            <FilterComp/>
        </Grid>:<div></div>}
        <Grid item xs={matches?8:12} style={{background:'#fff'}}>
            <div style={{display:'flex',justifyContent:'flex-start',margin:'0px auto',paddingRight:150}}>
                <ProductListing pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} data={products}/>
            </div>
        </Grid>
        {matches?  <Grid item xs={12} style={{marginTop:'3%'}}>
           {// <FooterComponent/>
           }
        </Grid> :<div></div>}
    </Grid>)
}