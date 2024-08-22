import axios from "axios";
var serverURL="http://localhost:5000"       //   http://localhost:5000 or https://medbazzarbackend.onrender.com
const postData=async(url,body)=>{
    try
    {
      var response=await axios.post(`${serverURL}/${url}`,body)
      var result=response.data
      // console.log(result.data)
      return(result)
      
    }
    catch(e)
    {
        return(null)
    }


}


const getData=async(url)=>{
    try
    {
      var response=await axios.get(`${serverURL}/${url}`)
      var result=response.data
      return(result) 
    }
    catch(e)
    {
        return(null)
    }


}


export{serverURL,postData,getData}