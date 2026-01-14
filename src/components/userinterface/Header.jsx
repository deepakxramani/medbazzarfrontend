import {
  AppBar,
  Box,
  Toolbar,
  Paper,
  InputBase,
  IconButton,
  Badge,
  Tooltip,
  Zoom,
  Avatar,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import logo from '../../assets/MedBazzarNewLogo1.png';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import { useStyles } from '../../screens/userinterface/HomeCss';
import { postData, serverURL } from '../../services/FetchNodeServices';
import { useSelector } from 'react-redux';
import ShowCartProducts from '../userinterface/ShowCartProducts';


export default function Header(props) {
  const navigate = useNavigate();
  const theme = useTheme();

  // try{
  //   var prd = JSON.parse(Cookies.get('CART'))
  // }
  // catch
  // {
  //   prd = {}
  // }

  var products = useSelector((state) => state.data);
  var keys = Object?.keys(products);

  var user = useSelector((state) => state.user);

  var userData = '';
  var userInformation = {};
  try {
    userData = Object.values(user)[0].username.split(' ');
    userData = userData[0];
    userInformation = Object.values(user)[0];
  } catch (e) {}

  const [status, setStatus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pattern, setPattern] = useState('');
  const [mobileno, setMobileno] = useState(userInformation.mobileno);
  const [pageRefresh, setPageRefresh] = useState(false);
  const [picture,setPicture]=useState({file:'', bytes:''})

  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));


  const handleDrawer = () => {
    setStatus(true);
  };

  const handleClose = () => {
    setStatus(false);
  };

  const showCartDetails = () => {
    setIsOpen(!isOpen);
  };
  const hideCartDetails = () => {
    setIsOpen(false);
  };

  const handleCartVisit = () => {
    navigate('/productcart');
  };

  const handleFilterPage = () => {
    navigate('/filterpage', { state: { pattern: pattern } });
  };

  useEffect(() => {
    const getUserData = async () => {
      var body = { mobileno: mobileno };
      var result = await postData('users/check_userdata', body);
      if (result.status) {
        const userDataFromServer = result.data;
        setPicture({ file: `${serverURL}/images/${userDataFromServer.picture}`, bytes: '' });
      } 
    };

    getUserData();
  }, [userInformation.mobileno]);


  const drawerList = () => {
    return (
      <Paper>
        <div style={useStyles.leftBarStyle}>
          <img
            src={`${serverURL}/images/1.jpg`}
            style={{ width: 70, height: 70, borderRadius: 35 }}
            alt="adminimg"
          />
          <div style={useStyles.nameStyle}>{userInformation?.username}</div>
          <div style={useStyles.emailStyle}>{userInformation?.emailid}</div>
          <div
            style={useStyles.phoneStyle}
          >{`+91${userInformation?.mobileno}`}</div>
        </div>
        <div style={useStyles.menuStyle}>
          <List>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={useStyles.menuItemStyle}>Dashboard</span>
                  }
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate('/admindashboard/displayallcategory')}
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={useStyles.menuItemStyle}>Category List</span>
                  }
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  navigate('/admindashboard/displayallsubcategory')
                }
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={useStyles.menuItemStyle}>Sub Categories</span>
                  }
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate('/admindashboard/displayallbrands')}
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={useStyles.menuItemStyle}>Brands List</span>
                  }
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate('/admindashboard/displayallproducts')}
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={useStyles.menuItemStyle}>Products List</span>
                  }
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  navigate('/admindashboard/displayallproductdetails')
                }
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={useStyles.menuItemStyle}>
                      ProductDetails List
                    </span>
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate('/admindashboard/banners')}
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<span style={useStyles.menuItemStyle}>Banners</span>}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate('/admindashboard/concerns')}
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<span style={useStyles.menuItemStyle}>Concern</span>}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={useStyles.menuItemStyle}>Sales Report</span>
                  }
                />
              </ListItemButton>
            </ListItem>

            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<span style={useStyles.menuItemStyle}>Logout</span>}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Paper>
    );
  };

  const secondrySearchBar = () => {
    return (
      <Box
        sx={{ flexGrow: 1, position: 'relative', marginTop: props.marginTop }}
      >
        <AppBar
          style={{
            height: 80,
            background: '#fff',
            justifyContent: 'center',
            marginTop: matchesSM ? 0 : 70,
          }}
          position={props.position}
        >
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <MenuOutlinedIcon
              onClick={handleDrawer}
              style={{ color: 'black', fontSize: 33 }}
            />
            {searchBarComponent()}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: 70,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              > 
                {userData?<Avatar src={picture.file} style={{width:40,height:40, border: '2px solid black'}} onClick={()=> navigate('/userprofile')}></Avatar>:
                  <PersonOutlineOutlinedIcon
                    onClick={() => navigate('/loginscreen')}
                    style={{ fontSize: 32, color: '#000' }}
                  />}
                
              </div>
              <PhoneOutlinedIcon style={{ color: 'black', fontSize: 32 }} />
            </div>
          </Toolbar>
        </AppBar>
        <div></div>
      </Box>
    );
  };

  const searchBarComponent = () => {
    return (
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '60%',
          boxShadow: 2,
          borderRadius: 50,
          margin: 1,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: 18 }}
          placeholder="Search 40,000+ Products...."
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={(e) => setPattern(e.target.value)}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleFilterPage}>
          <SearchOutlinedIcon  />
        </IconButton>
      </Paper>
    );
  };

  return (
    <Box sx={{ flexGrow: 1, zIndex:100 }} onMouseLeave={hideCartDetails}>
      <AppBar
        style={{ height: 80, background: '#fff', justifyContent: 'center' }}
        position={props.position}
      >
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img
            src={logo}
            style={{ width: 180, cursor: 'pointer' }}
            alt="MedBazzar Logo"
            onClick={() => navigate('/')}
          />
          {!matches ? searchBarComponent() : <div></div>}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: !matches ? 110 : 50,
              cursor: 'pointer',
            }}
          >
            {!matches ? (
              <Tooltip
                title={userData ? '' : 'Sign In'}
                TransitionComponent={Zoom}
                placement="bottom"
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginRight: 15,
                  }}
                > {userData?<Avatar src={picture.file} style={{width:40,height:40, border: '2px solid black'}} onClick={()=> navigate('/userprofile')}></Avatar>:
                  <PersonOutlineOutlinedIcon
                    onClick={() => navigate('/loginscreen')}
                    style={{ fontSize: 32, color: '#000' }}
                  />}
                  <div
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 'bolder',
                      color: '#000',
                    }}
                  >
                    {userData}
                  </div>
                </div>
              </Tooltip>
            ) : (
              <div></div>
            )}
            <Badge
              style={{ marginRight: matchesSM?15:0 }}
              badgeContent={keys?.length}
              color="primary"
            >
              <div
                onClick={() => handleCartVisit()}
                onMouseOver={showCartDetails}
              >
                <ShoppingCartOutlinedIcon
                  style={{ color: 'black', fontSize: 32 }}
                />
              </div>
            </Badge>
            {!matches ? (
              <PhoneOutlinedIcon
                style={{ color: 'black', fontSize: 32, marginRight: 40 }}
              />
            ) : (
              <div></div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div>{matches ? secondrySearchBar() : <div></div>}</div>

      <Drawer anchor={'left'} open={status} onClose={handleClose}>
        {drawerList()}
      </Drawer>
      <ShowCartProducts isOpen={isOpen} />
    </Box>
  );
}
