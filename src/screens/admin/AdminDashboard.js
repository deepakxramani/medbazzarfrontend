import { useState } from "react";
import { useStyles } from "./AdminDashboardCss";
import { Avatar,AppBar,Box,Toolbar,Typography,Grid,Paper } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Routes,Route,Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/FetchNodeServices"
import Categories from "./Categories";
import DisplayAllCategory from "./DisplayAllCategory";
import Subcategory from "./Subcategory";
import DisplayAllSubCategory from "./DisplayAllSubCategory";
import Brand from "./Brand";
import DisplayAllBrands from "./DisplayAllBrands";
import Products from "./Products";
import DisplayAllProducts from "./DisplayAllProducts";
import ProductDetails from "./ProductDetails";
import DisplayAllProductDetails from "./DisplayAllProductDetails";
import Concern from "./Concern"
import Banners from "./Banners"
import DisplayAllConcerns from "./DisplayAllConcern";


//import Summary from "./Summary";
//import Chart from "../../components/DashboardComponent/Chart";

export default function AdminDashboard(props){
  const classes=useStyles();
  const navigate=useNavigate();
  const adminData = JSON.parse(localStorage.getItem('ADMIN'))
 
  const handleVisit = () =>{
    navigate('/home')
  }
  
  return(
    <Box sx={{ flexGrow: 1 }} >
        <AppBar position="sticky"> 
          <Toolbar variant="dense" style={{display:'flex', justifyContent:'space-between'}}> 
            <Typography variant="h6" color="inherit" component="div">
              MedBazzar
            </Typography>
            <Typography variant="h6" color="inherit" component="div" onClick={handleVisit} style={{cursor:'pointer'}}>
              Go to website
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spaces={3} style={{paddingInlineStart:5}} >
          <Grid item xs={2.2} >
            <Paper >
              <div className={classes.leftBarStyle}>
              <img src={`${serverURL}/images/${adminData.picture}`}  style={{width:70,height:70,borderRadius:35}}/>
                <div className={classes.nameStyle}>{adminData.adminname}</div>
                <div className={classes.emailStyle}>{adminData.emailid}</div>
                <div className={classes.phoneStyle}>+91{adminData.mobileno}</div>
              </div>
              <div className={classes.menuStyle}>
                <List>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Dashboard</span>} />
                    </ListItemButton>
                  </ListItem>


                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallcategory')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>} />
                    </ListItemButton>
                  </ListItem>

                 
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallsubcategory')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Sub Categories</span>} />
                    </ListItemButton>
                  </ListItem>

                  
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallbrands')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Brands List</span>} />
                    </ListItemButton>
                  </ListItem>

                 
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallproducts')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Products List</span>} />
                    </ListItemButton>
                  </ListItem>

                  
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallproductdetails')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>ProductDetails List</span>} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/banners')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Banners</span>} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/concerns')}>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Concern</span>} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton >
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Sales Report</span>} />
                    </ListItemButton>
                  </ListItem>


                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton >
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Logout</span>} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div> 
            </Paper>

          </Grid> 
          
          <Grid item xs={9.8} style={{padding:20}}>
           
           <Routes>
              {/* <Route path="/" element={<Navigate to="/admindashboard/Summary" replace={true} />}/> */}  
              <Route element={<Categories />} path={'/category'}/>
              <Route element={<DisplayAllCategory />} path={'/displayallcategory'}/>
              <Route element={<Brand />} path={'/brand'}/>
              <Route element={<DisplayAllBrands />} path={'/displayallbrands'}/>
              <Route  element={<Subcategory/>} path={'/subcategory'}/>
              <Route  element={<DisplayAllSubCategory/>} path={'/displayallsubcategory'}/>
              <Route  element={<Products/>} path={'/products'}/>
              <Route  element={<DisplayAllProducts/>} path={'/displayallproducts'}/>
              <Route  element={<ProductDetails/>} path={'/productdetails'}/>
              <Route  element={<DisplayAllProductDetails/>} path={'/displayallproductdetails'}/>
              <Route  element={<Banners/>} path={'/banners'}/>
              <Route  element={<Concern/>} path={'/concerns'}/>
              <Route  element={<DisplayAllConcerns/>} path={'/displayallconcerns'}/>
            </Routes> 
 
          </Grid>
        </Grid>
      </Box>
  )
}