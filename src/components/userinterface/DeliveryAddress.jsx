import { Grid, Button,Divider } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function DeliveryAddress(props){

    const showAllAddress=(userAddress)=>{
        return userAddress?.map((item)=>{
            return <div style={{display:'flex',flexDirection:'column',padding:10,margin:10,fontWeight:500}}>
                <div>{item?.address}</div>
                <div>{item?.landmark}</div>
                <div>{item?.state} {item?.city} {item?.pincode}</div>
            </div>
        })
    }
    return(<div>
        <Grid container spacing={1}  style={{display:'flex',justifyContent:'space-between',width:'70%',height:'auto', border:'2px solid #dcdde1',borderRadius:15,marginLeft:15}}>
            <Grid item style={{marginBottom:5,fontWeight:700,padding:10}}>
                Delivery Address
            </Grid>
            <hr style={{width:'100%',height:1.8,background:'#dcdde1',border:'none'}}/>
            <Grid item style={{padding:10}}>
            <Grid container>
            <Grid item xs={12} md={6} style={{width:'70%',margin:'5px 0px'}}>
            {props.userAddress.length==0?<span>
                <p style={{fontWeight:500}}>
                    Please add your address to continue
                </p></span>:<div>
                        <div style={{marginLeft:20, fontWeight:700}}>{props?.userData?.username}</div>
                        {showAllAddress(props?.userAddress)}
                    </div>}
            </Grid>
            <Grid item xs={12} md={6} style={{margin:'5px 0px'}}>
                <Button startIcon={<AddIcon/>} variant="filled" style={{background:'#007FFF',color:'white',borderRadius:20}} fullWidth>
                    Add New Address
                </Button>
            </Grid>
            </Grid>
            </Grid>
        </Grid>
    </div>)
}