import * as React from 'react';
import {Accordion,Grid,Divider,MenuItem,Paper,InputBase,IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getData, postData } from '../../services/FetchNodeServices'; 
import { useState,useEffect } from 'react';

export default function FilterComp(){

    const [category,setCategory]=useState([])
    const [subCategory,setSubCategory]=useState([])


    const fetchAllCategory=async()=>{
        var result=await getData('userinterface/display_all_category')
        // console.log('DAAATTAAA',result.data)
        if(result.status)
        {   
            console.log("CATEGORY DATA",result.data)
            setCategory(result.data)
        
        }
        
        }

        const fetchAllSubCategory=async(categoryid)=>{
            var result=await postData('userinterface/fetch_all_subcategory_by_categoryid',{categoryid:categoryid})
            if(result.status)
            {   
                console.log("SUB-CATEGORY DATA",result.data)
                setSubCategory(result.data)
            
            }
            
            }

        useEffect(function(){
            fetchAllCategory()
            fetchAllSubCategory()
    
        },[])

        const handleSubCategory=(categoryid,event)=>{
            fetchAllSubCategory(categoryid)
        }

        const showAllCategory=()=>{
            return category?.map((item)=>{   
                return(
                       <Accordion style={{width:'100%',background:"#F5F5F5",boxShadow:'0 0 0 #F5F5F5',fontSize:12}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{marginLeft:'auto'}}/>}
                                onClick={(event)=>handleSubCategory(item.categoryid,event)} 
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography>{item.categoryname}</Typography>
                            </AccordionSummary >
                        <AccordionDetails >
                            <Typography>
                                {showAllSubCategory()}
                            </Typography>
                        </AccordionDetails>
                        </Accordion>
                    
               )
            })
        }


        const showAllSubCategory=()=>{
            return subCategory?.map((item)=>{
                return( 
                  <MenuItem style={{background:"#F5F5F5",fontSize:15}} >{item.subcategoryname} </MenuItem>
                )
            })
            }


            const searchBarComponent=()=>{
                return(
                <Paper
              component="form"
              sx={{ p: '2px 4px',margin:1, display: 'flex',border:'1px solid #A5AFBF', fontWeight:'bold',borderRadius:50,height:25,alignItems: 'center', width:'92%',background:'#ffff',opacity:0.5 }}
            >
            
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Brands.."
                inputProps={{ 'aria-label': 'search google maps' }}
                style={{color:'#0D0F11'}}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon style={{color:'black'}}/>
              </IconButton>
              
            </Paper>)
            }

    return(
    <div>
        <Grid container style={{display:'flex',flexDirection:'column'}}>
            <Grid item style={{width:350,height:'auto',background:'#f1f2f6',marginLeft:20,marginTop:20,borderRadius:10,boxShadow:'0px 0px 5px 2px rgba(0,0,0,0.2)'}}>
                <div>
                    <p style={{fontWeight:500,padding:'15px 15px'}}>FILTERS</p>
                    <Divider style={{background:'#A0ABBB',width:'92%',height:2,margin:'5px auto',opacity:0.3}}/>
                </div>
                <div>
                    <p style={{color:'#4b5768',fontSize:15, fontWeight:600,marginLeft:15}}>Category</p>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',marginTop:10}}>
                        {searchBarComponent()}
                        
                            <div style={{marginTop:10,display:"flex",flexDirection:'column',width:'100%',fontWeight:'lighter'}}>
                                {showAllCategory()}
                            </div>
                        
                    </div>
                </div>
            </Grid>

        </Grid>
    </div>)
}