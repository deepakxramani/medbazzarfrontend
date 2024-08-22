import AddToCart from "../../components/userinterface/AddToCart";
import PaymentUI from "../../components/userinterface/PaymentUI";
import { Grid } from "@mui/material";
import {useSelector} from "react-redux"
import { useEffect, useState } from "react";
import Header from "../../components/userinterface/Header";
import AddAddress from "../../components/userinterface/AddAddress";
import { postData } from "../../services/FetchNodeServices";
import DeliveryAddress from "../../components/userinterface/DeliveryAddress";
import Cookies from "js-cookie"

export default function ProductCart(){
    const [pageRefresh,setPageRefresh]=useState(false)
    const [status, setStatus] = useState(false)
    const [userAddress, setUserAddress]=useState([])


    var products = useSelector(state=>state.data)
    // try{
    //     var products = JSON.parse(Cookies.get('CART'))
    //   }
    //   catch
    //   {
    //     products = {}
    //   }
    
    var userData = Object.values(useSelector(state=>state.user))[0]

    // console.log("User Data:", userData)

    const check_user_address=async()=>{
        
        if(userData?.mobileno===undefined)
        {setStatus(false)}
        else{
        var result=await postData('users/check_user_address',{mobileno:userData?.mobileno})
        if(result.status===false)
        { 
            setStatus(true)
        }
        else
        {
            setStatus(false)
            setUserAddress(result.data)
        }
    }
      }
    
      useEffect(function(){
        check_user_address()
      },[userData?.mobileno,pageRefresh])

    return(
    <div>
        <Header />
        <Grid container spacing={1} style={{position:'relative',display:'flex',justifyContent:'space-between',marginTop:100}}>
            <Grid item md={8} xs={12} >
                <div><DeliveryAddress status={status} setStatus={setStatus} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} userData={userData} userAddress={userAddress}/></div>
                <AddToCart pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} products={products}/>
            </Grid>
            
            <Grid item md={4} xs={12}>
                <PaymentUI userData={userData} userAddress={userAddress}  pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} products={products} />
            </Grid>

        </Grid>
        <AddAddress pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} userData={userData} status={status} setStatus={setStatus}  />
    </div>)
}