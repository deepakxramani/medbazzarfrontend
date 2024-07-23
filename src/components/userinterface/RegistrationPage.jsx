import {Grid,TextField,Paper} from "@mui/material"
import LoginImage from "../../assets/loginpage-image.webp"
import useMediaQuery from '@mui/material/useMediaQuery';
import  {useTheme}  from '@mui/material/styles';
import { useState } from "react";
import OtpInput from 'react-otp-input';
import { blue } from "@mui/material/colors";
import { postData } from "../../services/FetchNodeServices";


export default function RegistrationPage(){
    const [isHover,setIsHover]=useState(false)
    const [otp, setOtp] = useState(0);
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [emailId,setEmailId] = useState('');
    const [mobileNo,setMobileNo] = useState('');
    const [status,setStatus] = useState(true)

    const theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));


    
    const generateOTP=()=>{
        var myotp=parseInt(Math.random(1899)+1000)
        alert(myotp)
        setOtp(myotp)
    }

    const handleSubmit=async()=>{
        var result = await postData('users/submit_user',{mobileno:mobileNo,emailid:emailId,username:firstName+" "+lastName})
        
        if(result && result.status===false)
        {
            setStatus(status)
            generateOTP()
        }
        
        else
        {
            setStatus(!status)
            generateOTP()
        }
    }

    return(<div>
        <Grid container style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',flexDirection:'row'}}>
            {matchesMd?<div></div>:<Grid item xs={12} md={6}  style={{width:500,height:500,marginTop:50}}>
                <img src={LoginImage} alt="Login Cover" style={{width:'100%'}} />
            </Grid>}
            
            <Grid item xs={12} md={6} style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'column',width:100,height:400,padding:'20px 40px'}}>
            <Paper elevation={10} style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'column',padding:'20px 40px',borderRadius:30}} >
                {status?<div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <h1 style={{fontSize:40}}>Welcome to MedBazzar</h1>
                    <p style={{fontSize:17,marginLeft:3,fontWeight:500}}>Please enter your details for better shopping experience.</p>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',marginTop:30}}>
                        <input onChange={(e)=>setFirstName(e.target.value)} placeholder="Enter First Name*" style={{width:400,height:35,fontSize:17,paddingLeft:10,fontWeight:600,margin:8,backgroundColor:'transparent',border:'0px solid',borderBottom:'2px solid',outline:'none',padding:'5px 10px',letterSpacing:2,fontWeight:600}}/>    
                        <input onChange={(e)=>setLastName(e.target.value)} placeholder="Enter Last Name (Optional)" style={{width:400,height:35,paddingLeft:10,fontSize:17,fontWeight:600,margin:8,backgroundColor:'transparent',border:'0px solid',borderBottom:'2px solid',outline:'none',padding:'5px 10px',letterSpacing:2,fontWeight:600}}/>    
                        <input onChange={(e)=>setEmailId(e.target.value)} placeholder="Enter Email Id (Optional)" style={{width:400,height:35,paddingLeft:10,fontSize:17,fontWeight:600,margin:8,backgroundColor:'transparent',border:'0px solid',borderBottom:'2px solid',outline:'none',padding:'5px 10px',letterSpacing:2,fontWeight:600}}/>    
                        <input onChange={(e)=>setMobileNo(e.target.value)} placeholder="Enter Mobile Number*" style={{width:400,height:35,paddingLeft:10,fontSize:17,fontWeight:600,margin:8,backgroundColor:'transparent',border:'0px solid',borderBottom:'2px solid',outline:'none',padding:'5px 10px',letterSpacing:2,fontWeight:600}}/>    
                    </div>
                </div>:
                
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <h1 style={{fontSize:40}}>Verify OTP</h1>
                <p style={{fontSize:17,marginLeft:3,fontWeight:500}}>+91-<span style={{fontWeight:600}}>{mobileNo}</span> <span style={{color:'#2962ff',fontWeight:600,cursor:'pointer'}}>Change?</span></p>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',marginTop:30}}>
                <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={{width:50,height:50,fontSize:25, fontWeight:600,margin:10}}
                />
                </div>
            </div>}
                <div style={{display:'flex',alignItems:'center',flexDirection:'column',marginTop:100}}>
                    <button onClick={()=>handleSubmit()} onMouseMove={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} style={{fontSize:18,fontWeight:700,border:'none',padding:'10px 100px',borderRadius:30,color:'white',background:isHover?'#004361':'#0078ad',cursor:'pointer'}}>{status?'Get Started':'Verify OTP'}</button>
                    <p style={{margin:10}}>By continuing, you agree to our <span style={{color:'#0c5273',fontWeight:700,cursor:'pointer'}}>Terms of Service</span> and <span style={{color:'#0c5273',cursor:'pointer',fontWeight:700}}>Privacy & Legal Policy</span></p>
                </div>
                </Paper>
            </Grid>
            
        </Grid>
    </div>)
}