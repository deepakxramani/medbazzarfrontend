import { Radio,FormControlLabel,RadioGroup,Grid,Divider } from "@mui/material";
import { BiSolidOffer } from "react-icons/bi";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { MdDeliveryDining } from "react-icons/md";
import {useNavigate} from "react-router-dom"
import { useState,useEffect } from "react";
import { postData} from "../../services/FetchNodeServices";
import logo from "../../assets/logo.png"



export default function PaymentUI(props){

    const navigate = useNavigate()
    const [caption,setCaption]=useState('LOGIN TO PROCEED')


    const productFromRedux = props.products
    var product = Object.values(productFromRedux)

    var totalamount=product.reduce((p1,p2)=>{
        var amt = p2.qty*p2.price
        return p1+amt
    },0);

    var amount=product.reduce((p1,p2)=>{
        var amt = p2.qty*(p2.offerprice!==0?p2.offerprice:p2.price)
        return p1+amt
    },0);

    var discountAmt = totalamount-amount
    var netamount = totalamount-discountAmt


    const generateOrder=async(paymentid)=>{
        var result = await postData('users/save_order',{userid:props?.userData?.userid,orderdate:props?.userData?.orderdate,mobileno:props?.userData?.mobileno,emailid:props?.userData?.emailid,paymentstatus:'Online',paymentid:paymentid,orderlist:product})
        alert(result.status)
    }

    ///***********PAYMENT GATEWAY*********** */

        const options = {
            key: "rzp_test_GQ6XaPC6gMPNwH",
            amount: (netamount)*100, // 100 paise = INR 1
            name: "MedBazzar",
            description: 'Some Desciption',
            image: `${logo}`,
            handler: function (response){
                generateOrder(response.razorpay_payment_id)
                alert(response.razorpay_payment_id);
            },
            prefill: {
                name: props?.userData?.username,
                contact: props?.userData?.mobileno,
                email: props?.userData?.emailid,
            }, 
            notes: {
                address: 'some address'
            },
            theme: {
                color: "blue",
                hide_topbar: false,
            },
        };


        const openPayModel = () =>{
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        };

        useEffect(()=>{
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            document.body.appendChild(script);
        },[]);



    ///************************************* */

    const handleLogin=()=>{
        if(caption.toUpperCase()==="MAKE PAYMENT")
        openPayModel()
        else
        navigate("/loginscreen")
    }

    useEffect(function(){
        if(props?.userAddress?.length>0)
        {
            setCaption('MAKE PAYMENT')
        }
    },[props.userAddress])

    
 return(
 <div style={{width:'95%',height:640,border:'1px solid rgba(0,0,0,0.3)',borderRadius:5,margin:'10px auto',padding:'10px 10px'}}>
    <Grid container >
        <Grid item xs={12}>
            <p style={{margin:5,fontSize:17,fontWeight:500}}>Payment Details</p>
        </Grid>
        <Grid item xs={12} style={{padding:'10px 15px'}}>
            <Grid container spacing={1}>
                <Grid item xs={12} style={{display:"flex",alignItems:'center',justifyContent:'space-between'}}>
                    <p style={{fontSize:16,}}>Total Amount</p>
                    <p style={{fontSize:17,fontWeight:600}}>&#8377;{totalamount}.00</p>
                </Grid>
                <Grid item xs={12} style={{display:"flex",alignItems:'center',justifyContent:'space-between'}}>
                    <p style={{fontSize:16,}}>Savings</p>
                    <p style={{fontSize:14,fontWeight:600}}>&#8377;{discountAmt}</p>
                </Grid>
                <Grid item xs={12} style={{display:"flex",alignItems:'center',justifyContent:'space-between',margin:0}}>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} style={{margin:'10px 0px'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',height:40,background:'#fff212',borderRadius:10,padding:'10px 15px'}}>
                <h4>Order Total</h4>
                <h4>&#8377;{netamount}.00</h4>
            </div>
            <p style={{fontStyle:'italic',fontSize:13,marginLeft:8,marginTop:10,opacity:0.8}}>Price may vary depending on the product batch*</p>
        </Grid>
        
    </Grid>
    <Grid container>
    <Divider style={{background:'#A0ABBB',width:'100%',height:4,margin:'20px auto',opacity:0.3}}/>
        <Grid item xs={12}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
                <div style={{display:"flex",alignItems:'center',gap:10}}>
                    <div>
                        <BiSolidOffer style={{fontSize:25,color:'green'}}/>
                    </div>
                    <div>
                        <p style={{fontWeight:500}}>Use coupons</p>
                        <p style={{fontSize:14,fontWeight:500,opacity:0.7}}>Also get a gift code after placing this order</p>
                    </div>
                </div>
                <div style={{cursor:'pointer'}}>
                    <KeyboardArrowRightIcon style={{fontSize:32}}/>
                </div>
  
            </div>
        </Grid>
        <Divider style={{background:'#A0ABBB',width:'100%',height:4,margin:'20px auto',opacity:0.3}}/>
    </Grid>

    <Grid container style={{height:'auto',border:'1px solid rgba(140,140,140,0.3)',borderTopLeftRadius:10,borderTopRightRadius:10,borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
        <Grid item xs={12} style={{display:'flex',alignItems:'center',gap:20,padding:'10px 20px',height:50,background:'#ffc43d',borderTopLeftRadius:10,borderTopRightRadius:10}}>
            <InfoOutlinedIcon />
            <p style={{fontSize:13}}>Shop for ₹499 or more to get free delivery</p>
        </Grid>
        <Grid item xs={12}>
        <div style={{background:'lightgrey',paddingLeft:5}} >
            <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="D"
                name="radio-buttons-group"
            >
                <FormControlLabel value="D"  control={<Radio size="small"  />} label="Cash on Delivery" />
                <FormControlLabel value="P" control={<Radio size="small"  />} label="Make Payment" style={{marginLeft:'auto'}}/>
            </RadioGroup>
            </div>
        </Grid>
        <Grid item xs={12} style={{margin:'5px 0px'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'2px 20px'}}>
                <div>
                    <p style={{fontSize:12}}>{product.length} ITEM</p>
                    <p style={{fontSize:15,fontWeight:600}}>₹{netamount}</p>
                </div>
                <div>
                    <button onClick={handleLogin} style={{fontSize:16,fontWeight:500,paddingTop:10,paddingBottom:10,paddingLeft:25,paddingRight:25,borderRadius:5,background:'#00391C',color:'#fff',cursor:'pointer',border:'none'}}>{caption}</button>
                </div>
            </div>
        </Grid>
    </Grid>
<Grid container>
    <Divider style={{background:'#A0ABBB',width:'100%',height:4,margin:'20px auto',opacity:0.3}}/>
        <Grid item xs={12} style={{marginBottom:10,paddingLeft:10}}>
            <p style={{fontSize:17,fontWeight:500}}>Delivery Instruction</p>
        </Grid>
        <Grid item xs={12} style={{display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,paddingLeft:10}}>
                <MdDeliveryDining style={{fontSize:28}}/>
                <p style={{fontWeight:500}}>Add Delivery Instructions</p>
            </div>
            <div style={{cursor:'pointer'}}>
                    <KeyboardArrowRightIcon style={{fontSize:32}}/>
            </div>
        </Grid>
    <Divider style={{background:'#A0ABBB',width:'100%',height:4,margin:'20px auto',opacity:0.3}}/>

</Grid>
 </div>)
}