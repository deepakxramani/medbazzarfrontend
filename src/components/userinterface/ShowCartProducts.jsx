import { useSelector } from "react-redux";
import {Divider,Paper} from "@mui/material"
import {useNavigate} from "react-router-dom"


export default function ShowCartProducts(props)
{   var navigate = useNavigate()
    var products = useSelector((state)=>state.data)
    var keys = Object?.keys(products)
    var productsList  = Object?.values(products)

    const showProducts=()=>{
        return productsList?.map((item)=>{
            return <div style={{display:'flex',justifyContent:'space-between',marginTop:6,padding:'0px 4px'}}>
                        <div style={{marginRight:10}}>{item.productname}</div> 
                        <div>{item.qty}</div>
                   </div>
        })
    }

    return(
        <Paper elevation={2} style={{display:props.isOpen?'flex':'none',position:'fixed',top:60,right:50,zIndex:10000,borderRadius:10,}}>
            <div style={{width:300,height:'auto',display:'flex',flexDirection:'column',padding:5}}>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:'0px 4px'}}>
                    <div style={{fontSize:16,fontWeight:600}}>Order Summary</div>
                    <div style={{fontSize:16,fontWeight:600}}>{keys.length} Items</div>
                </div>
                <Divider style={{background:'#A0ABBB',width:'100%',height:3,marginTop:2,borderRadius:10}}/>
                {showProducts()}
                <div onClick={()=>navigate('/productcart')} style={{display:'flex',alignItems:'center',justifyContent:'center',margin:'10px auto',background:'#00391c',color:'#fff',width:'80%',height:40,borderRadius:10,fontWeight:500,cursor:'pointer'}}>
                    Proceed to Cart
                </div>
            </div>
        </Paper>
        
    )
   
}