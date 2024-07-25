import {Button,IconButton} from "@mui/material"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import  {useTheme}  from '@mui/material/styles';


export default function PlusMinusComp2(props){
    
    const [value,setValue]=useState(props.qty)
    useEffect(function(){
        setValue(props.qty)
    },[props.qty,value])

    const theme = useTheme()
      const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
      const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
      const matchesLG = useMediaQuery(theme.breakpoints.down('lg'));

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
            <button style={{width: matchesLG?'60px':props.width && matchesMd?'20px':props.width, height: matchesSM?'25px':props.height, fontSize:matchesMd?'12px':props.fontSize,display:'flex',alignItems:'center',justifyContent:'center',padding:'5px 0px'}} onClick={handlePlus}>Add <ShoppingCartOutlinedIcon  style={{marginLeft:4, fontSize:matchesMd?'12px':props.fontSize}}/></button>
        </div>:
        <div style={{width: matchesLG?'60px':props.width && matchesMd?'20px':props.width, height: matchesSM?'25px':props.height, background:'#00391c',display:'flex',alignItems:'center',justifyContent:'center',gap:matchesSM?'5px':'10px',backgroundColor:'#007bff',border: 'none',padding: '3px 10px',borderRadius: 8,fontWeight:600}} >
            <div onClick={handleMinus} style={{color:'#fff',fontSize: props.fontSize, fontWeight:600,cursor:'pointer',marginLeft:40}}><RemoveIcon style={{fontSize: props.fontSize,fontWeight:800}}/></div>
            <div style={{width:5,color:'#fff',fontSize:matchesSM?'12px':props.fontSize,fontWeight:700}}>{value}</div>
            <div onClick={handlePlus} style={{color:'#fff',fontSize:14,fontWeight:600,cursor:'pointer',marginRight:40}}><AddIcon style={{fontSize: props.fontSize, fontWeight:800}}/></div>
        </div>}
        </div>)
}