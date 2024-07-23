import { Button, Grid, Input, Paper} from "@mui/material";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import GetOTP from "./GetOTP";
import { postData } from "../../services/FetchNodeServices";
import LogInDetails from "./LogInDetails";


export default function LogInOTP() {
//   var navigate = useNavigate();
const [status,setStatus]=useState(true)
const [otp,setOtp]=useState('')
const [mobileno,setMobileno]=useState('')
const [userStatus,setUserStatus]=useState(false)
const [userData,setUserData]=useState([])



const generateOTP=()=>{
  var myotp=parseInt(Math.random()*8999)+1000
  alert(myotp)
  setOtp(myotp)
}

const handleOTP=async()=>{
  var result=await postData('users/check_userdata',{mobileno:mobileno})
  if(result.status===false)
  { generateOTP()
    setStatus(!status)
    setUserStatus(false)
  }
  else
  {generateOTP()
    setStatus(!status)
   setUserStatus(true)
   setUserData(result.data)
   
  }
}
// useEffect(handleOTP)
  return (
    <div style={{ width:'100%',display:'flex',justifyContent:'center',alignItems:'center' }} >
    {status?
    <Paper elevation={5} style={{ width: "90%", borderRadius: "60px 10px" }}>
      <Grid
        container
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 500,
          fontFamily: "kanit",
        }}
      >
        <Grid item xs={6}>
          <Grid item xs={12} fullWidth>
            <div style={{ fontWeight: "bold", fontSize: 30, marginBottom: 5 }}>
              Sign in To MedBazzar
            </div>
            <div style={{ fontWeight: "", fontSize: 13 }}>
              to acccess your Addresses, Orders & Whislist
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <div style={{ marginRight: 5, fontWeight: "bold" }}>+91</div>
            <Input
              style={{ fontSize: 16, fontWeight: "bold" }}
              id="standard-basic"
              variant="standard"
              placeholder="Enter Your Mobile No"
              fullWidth
              onChange={(e)=>setMobileno(e.target.value)}
            />
          </Grid>
           
          <Grid item xs={12} style={{ marginTop: 80 }}>
            <Button
              onClick={handleOTP}
              variant="contained"
              fullWidth
            >
              Get OTP
            </Button>
          </Grid>
           
          <Grid item xs={12}>
            <p style={{ fontSize: 14, marginTop: 30 }}>
              By Continuing, you agree to our{" "}
              <span style={{ color: "blue" }}>Terms Of Service</span> and{" "}
              <span style={{ color: "blue" }}>Privacy & Legal Policy</span>{" "}
            </p>
          </Grid>
        </Grid>
      </Grid>
    </Paper>:userStatus?<GetOTP userData={userData}  mobileno={mobileno} otp={otp}/>:<LogInDetails mobileno={mobileno} otp={otp}/>}
    </div>
  );
}
