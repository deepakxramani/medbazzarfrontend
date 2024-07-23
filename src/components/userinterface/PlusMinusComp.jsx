import {Button,IconButton} from "@mui/material"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import  {useTheme}  from '@mui/material/styles';


export default function PlusMinusComp(props){
    
    const [value,setValue]=useState(props.qty)
    useEffect(function(){
        setValue(props.qty)
    },[props.qty,value])

    const theme = useTheme()
      const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
      const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
      const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    const handleMinus=()=>{
        if(value>=1)
        {setValue((prev)=>prev-1)
        var v=value
        v=v-1
        props.onChange(v)}
    }
    const handlePlus=()=>{
        setValue((prev)=>prev+1)
        var v=value
        v=v+1
        props.onChange(v)
    }
    return(<div style={{display:'flex'}}>
        
        {value==0?<div className="product-actions" style={{padding:0}}>
            <button style={{width: matchesSM?'100px':props.width, height: matchesSM?'40px':props.height, fontSize:matchesSM?'15px':props.fontSize,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={handlePlus}>Add <ShoppingCartOutlinedIcon  style={{marginLeft:10, fontSize: props.fontSize}}/></button>
        </div>:
        <div style={{width: matchesSM?'100px':props.width, height: matchesSM?'40px':props.height, background:'#00391c',display:'flex',alignItems:'center',justifyContent:'space-around',gap:matchesSM?'5px':'10px',backgroundColor:'#007bff',border: 'none',padding: '3px 10px',borderRadius: 8,fontWeight:600}} >
            <div onClick={handleMinus} style={{color:'#fff',fontSize: props.fontSize, fontWeight:600,cursor:'pointer',marginLeft:5}}><RemoveIcon style={{fontSize: props.fontSize,fontWeight:800}}/></div>
            <div style={{color:'#fff',fontSize:matchesSM?'12px':'14px',fontWeight:700}}>{value}</div>
            <div onClick={handlePlus} style={{color:'#fff',fontSize:14,fontWeight:600,cursor:'pointer',marginRight:5}}><AddIcon style={{fontSize: props.fontSize, fontWeight:800}}/></div>
        </div>}
        </div>)
}