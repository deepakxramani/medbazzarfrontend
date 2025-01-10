import { Grid, Avatar, TextField, Button, Tooltip, Zoom } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import  {useTheme}  from '@mui/material/styles';
import { postData, serverURL } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
export default function UserInfoProfile(){

    var user = useSelector((state) => state.user);
    var userData = Object.values(user)[0]
    
    
    const [username, setUsername]=useState(userData?.username)
    const [mobileno, setMobile]=useState(userData?.mobileno)
    const [emailid, setEmailid]=useState(userData?.emailid)
    const [address, setAddress]=useState(userData?.address)
    const [userDataServer,setUserDataServer]=useState([])
    const [picture,setPicture]=useState({file:'', bytes:''})
    const [btnStatus, setBtnStatus]=useState(true)

    var theme=useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    useEffect(() => {
        const getUserData = async () => {
          var body = { mobileno: mobileno };
          var result = await postData('users/check_userdata', body);
          if (result.status) {
            const userDataFromServer = result.data;
            setPicture({ file: `${serverURL}/images/${userDataFromServer.picture}`, bytes: '' });
          } else {
            
          }
        };
    
        getUserData();
      }, []);
      
    const handleUsername=(value)=>{
        
        if(value===username)
        {
            setBtnStatus(true)
        }
        else{
            setBtnStatus(false)
            setUsername(value)
        }
        
    }
  
    const handleMobile=(value)=>{
        setBtnStatus(false)
        setMobile(value)
    }
    const handleEmail=(value)=>{
        setBtnStatus(false)
        setEmailid(value)
    }
    const handleAddress=(value)=>{
        setBtnStatus(false)
        setAddress(value)
    }

    const handleEditUser=async()=>{
        var body = {username: username, mobileno: mobileno, emailid: emailid, address: address}
        var result = await postData('users/edit_user_data',body)
        
        if(result.status)
        {
            Swal.fire({
                icon: "success",
                title: result.message,
                timer: 1500,
                toast: false
              });
            setBtnStatus(true)
        }
        
    }
    
const handlePicture = async (event) => {
    try {
      const file = event?.target?.files[0];
      setPicture({ file: URL.createObjectURL(file), bytes: file });

      var formData = new FormData();
      formData.append('mobileno', mobileno);
      formData.append('picture', file);

      var result = await postData('users/edit_user_picture', formData);

      if (result.status) {
        Swal.fire({
          icon: "success",
          title: result.message,
          timer: 1500,
          toast: false
        });
      } else {
        Swal.fire({
          icon: "error",
          title: result.message,
          timer: 1500,
          toast: true
        });
      }
    } catch (e) {
      
    }
  };

   
    return(<div>
    <Grid container style={{display: 'flex', flexDirection: matchesSM?'row':'column',width: matchesSM?'100%':'50vw', height: 'auto', marginBottom:50, borderRadius: 15,boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.6)'}}>
        <Grid item xs={12} style={{marginTop: 60}}>
        <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection: 'column', textAlign: 'center'}}>
            <Tooltip
                title={'Click to update picture'}
                TransitionComponent={Zoom}
                placement="top"
              >
                <Button style={{borderRadius: '50%', width:100, height:100}} component="label">
                    <Avatar src={picture.file} style={{width: 100, height: 100, border: '4px solid black'}} onClick={handlePicture}>

                    </Avatar>
                    <input onChange={handlePicture} type="file" hidden accept="images/*" />
                </Button>
            </Tooltip>
            <div>
                <h2 style={{color:'#000', marginTop: 8, fontSize: 18}}>{username}</h2>
                <h2 style={{color:'#000', marginTop: 5, fontSize: 14}}>{mobileno}</h2>
                <h2 style={{color:'#000',  fontSize: 14}}>{emailid}</h2>
            </div>
        </Grid>
        </Grid>
        <Grid item xs={12} style={{marginTop: '30px 0px 10px 10px', padding: 30}}>
        <Grid item xs={10} style={{ margin: '0px auto', padding:10}}>
            <TextField value={username} onChange={(e)=>handleUsername(e.target.value)} label="User Name" size="small" fullWidth />
        </Grid>
        <Grid item xs={10} style={{margin: '0px auto', padding:10}}>
            <TextField value={mobileno} onChange={(e)=>handleMobile(e.target.value)} label="Mobile Number" size="small" fullWidth />
        </Grid>
        <Grid item xs={10} style={{margin: '0px auto', padding:10}}>
            <TextField value={emailid} onChange={(e)=>handleEmail(e.target.value)} label="Email Id" size="small" fullWidth />
        </Grid>
        <Grid item xs={10} style={{margin: '0px auto', padding:10}}>
            <TextField value={address} onChange={(e)=>handleAddress(e.target.value)} label="Address" size="small" fullWidth />
        </Grid>
        <Grid item xs={12} style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around', padding:30}}>
            <Button disabled={btnStatus} onClick={handleEditUser} variant="contained" style={{margin:10}}>Edit</Button>
            <Button  variant="contained" style={{margin:10, padding: '0px 5px', fontSize: matchesSM?12:13}}>Logout</Button>
        </Grid>
        </Grid>
        
    </Grid>
    </div>)
}
