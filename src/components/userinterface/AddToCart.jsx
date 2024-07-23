import { Avatar,AppBar,Box,Toolbar,Typography,Grid,Paper, Button } from "@mui/material";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';import PlusMinusComp from "./PlusMinusComp";
import useMediaQuery from '@mui/material/useMediaQuery';
import  {useTheme}  from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import { FavoriteBorderOutlined } from "@mui/icons-material";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { serverURL } from "../../services/FetchNodeServices";
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"



export default function AddToCart(props){
    var dispatch = useDispatch()
    const navigate = useNavigate()

    const theme = useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    const productFromRedux = props.products
    var productDetails = Object.values(productFromRedux)

    const handleChange=(v,item)=>{
        if(v>0)
        {
          item['qty']=v
          dispatch({type:'ADD_PRODUCT',payload:[item.productdetailid,item]})
          
        }
        else
        {
          dispatch({type:'DELETE_PRODUCT',payload:[item.productdetailid]})
          
        }
        props.setPageRefresh(!props.pageRefresh) 
        
      }

    const CartBox = () =>{
        return productDetails?.map((item,i)=>{
        return(
        <div style={{width:'95%',height:matchesMd?200:230,border:'1px solid rgba(0,0,0,0.3)',margin:'10px 10px',borderRadius:5}}>
        <Grid container spacing={3} style={{display:'flex',justifyContent:'space-between'}}>
         <Grid item xs={2}>
             <div style={{width:matchesMd?60:100,height:matchesMd?60:100,marginRight:'auto',marginLeft:'auto',marginTop:10,cursor:'pointer'}}>
                 <img src={`${serverURL}/images/${item.picture}`} style={{width:'100%'}}/>
             </div>
         </Grid>
         <Grid item xs={10} style={{marginRight:'auto',marginLeft:'auto'}}>
             <Grid container spacing={4} style={{position:'relative'}}>
                 <Grid item xs={9} style={{margin:'5px 0px',paddingRight:'auto'}}>
                     <h3 style={{fontSize:matchesMd?15:20,margin:'6px 0px',cursor:'pointer'}}>{item.productname}, 100ml</h3>
                     <p style={{margin:'6px 0px',fontSize:matchesMd?12:15}}>{item.brandname} | {item.weight}{item.weighttype}</p>
                     <h2 style={{margin:'6px 0px',fontSize:matchesMd?15:25}}>₹{item.offerprice!=0?item.offerprice:item.price}</h2>
                     <div style={{display:'flex', alignItems:'center',margin:'6px 0px,',fontSize:matchesMd?12:15}}><WatchLaterOutlinedIcon style={{fontSize:matchesMd?12:15, marginRight:3,marginTop:2,color:'red'}}/>Delivery within <span style={{marginLeft:3,fontWeight:600}}>1-3 days</span></div>
                 </Grid>
                 <Grid item xs={3} style={{position:'absolute',right:20,top:15,margin:'10x auto'}}>
                     <div style={{}}><PlusMinusComp qty={item.qty} onChange={(v)=>handleChange(v,item)} /></div>
                 </Grid>
             </Grid>
             <Divider style={{background:'#A0ABBB',width:'93%',margin:'15px 0px'}}/>
 
             <Grid container spacing={4}>
                 <Grid item xs={12} style={{display:'flex', gap:20}}>
                     <div style={{display:'flex', alignItems:'center',gap:1,cursor:'pointer',fontSize:matchesMd?13:15}}><DeleteForeverOutlinedIcon style={{color:'red',fontSize:matchesMd?15:18}}/><p>Remove</p></div>
                     <div style={{display:'flex',alignItems:'center', gap:1,cursor:'pointer',fontSize:matchesMd?13:15}}><BookmarkAddOutlinedIcon style={{fontSize:matchesMd?15:18}}/><p>Add to favorites</p></div>
                 </Grid>
             </Grid>
         </Grid>
 
        </Grid>
        </div>)})
    }

    
    return(
    <div style={{marginTop:matchesSM?60:0}}>
    <h1 style={{fontSize:matchesMd?20:25,fontWeight:700,margin:20}}>{productDetails.length} items in your cart</h1>
        {CartBox()}
       {matchesMd?
       <Divider style={{background:'#A0ABBB',width:'90%',margin:'20px auto'}}/>
       :<></>
    }
    <div style={{display:'inline-flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:18,margin:'0px 20px'}}><Button onClick={()=>navigate('/home')} style={{fontWeight:600,color:'black'}}><AddBoxOutlinedIcon style={{marginRight:4}}/>Add more items</Button></div>
    {matchesMd?
        <Divider style={{background:'#A0ABBB',width:'100%',height:5,margin:'20px auto',opacity:0.3}}/>
        :<></>
    }
    
    </div>
    )
    
}


