import ProductPicture from "../../components/userinterface/ProductPicture";
import ProductInformation from "../../components/userinterface/ProductInformation";
import { Grid } from "@mui/material";
import {useLocation} from "react-router-dom"
import { useState } from "react";
import Header from "../../components/userinterface/Header";
import  {useTheme}  from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function ProductDetailUI(){

    const [pageRefresh,setPageRefresh]=useState(false)
    var location=useLocation()
    var item=location?.state?.data
    // alert(JSON.stringify(item))

    var theme=useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    return(
    <div>
        <Header position={'fixed'} marginTop={9}/>
        <Grid container spacing={3} style={{marginTop:matchesSM?80:140}}>
            <Grid item md={6} xs={12} >
                <ProductPicture item={item}/>
            </Grid>
            
            <Grid item md={6} xs={12}>
                <ProductInformation item={item} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}/>
            </Grid>
        </Grid>
    </div>)
}