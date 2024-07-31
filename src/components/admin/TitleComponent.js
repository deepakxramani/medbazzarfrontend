import { useNavigate } from "react-router-dom";
import mainLogo from "../../../src/assets/logo2.png"
import listLogo from "../../../src/assets/list.png"

export default function TitleComponent({title,logo,listicon,page})
{   var navigate = useNavigate();
    return(<div style={{display:'flex', justifyContent:'space-between'}}>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'left', alignItems:'center',}}>
            <img src={mainLogo} style={{width:160,  marginBottom:10,marginRight:40}} />
            <div style={{color:'#2c3e50', fontWeight:600, fontSize:'22', marginRight:55, marginTop:10}}>{title}</div>
        </div>
        <div style={{cursor:'pointer'}} onClick={()=>navigate(page)}>
            <img src={listLogo} width='30' />
        </div>
    </div>)
}
