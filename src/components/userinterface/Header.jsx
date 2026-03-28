import {
  AppBar,
  Box,
  Toolbar,
  Badge,
  Tooltip,
  Zoom,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData, serverURL } from '../../services/FetchNodeServices';
import { useAuth } from '../../context/AuthContext';
import ShowCartProducts from '../userinterface/ShowCartProducts';
import logo from '../../assets/MedBazzarNewLogo1.png';

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  drawerHeader: {
    background: 'linear-gradient(135deg, #00391c 0%, #005c2e 100%)',
    padding: '28px 20px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  drawerName: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 16,
    marginTop: 4,
    letterSpacing: 0.3,
  },
  drawerEmail: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
  },
  drawerPhone: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 12,
  },
};

const MENU_ITEMS = [
  { label: 'Dashboard', Icon: DashboardIcon, path: null },
  {
    label: 'Category List',
    Icon: DraftsIcon,
    path: '/admindashboard/displayallcategory',
  },
  {
    label: 'Sub Categories',
    Icon: DraftsIcon,
    path: '/admindashboard/displayallsubcategory',
  },
  {
    label: 'Brands List',
    Icon: DraftsIcon,
    path: '/admindashboard/displayallbrands',
  },
  {
    label: 'Products List',
    Icon: DraftsIcon,
    path: '/admindashboard/displayallproducts',
  },
  {
    label: 'ProductDetails List',
    Icon: DraftsIcon,
    path: '/admindashboard/displayallproductdetails',
  },
  { label: 'Banners', Icon: DraftsIcon, path: '/admindashboard/banners' },
  { label: 'Concern', Icon: DraftsIcon, path: '/admindashboard/concerns' },
  { label: 'Sales Report', Icon: DraftsIcon, path: null },
];

// ─── SearchBar ────────────────────────────────────────────────────────────────
function SearchBar({ matches, onSearch, onPatternChange }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: matches ? '85%' : '46%',
        backgroundColor: '#f4f5f7',
        borderRadius: 28,
        padding: '9px 16px',
        margin: matches ? '10px auto' : '0 24px',
        border: '1.5px solid transparent',
        transition: 'all 0.25s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
      onFocus={(e) => {
        e.currentTarget.style.backgroundColor = '#fff';
        e.currentTarget.style.border = '1.5px solid #00391c';
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,57,28,0.12)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.backgroundColor = '#f4f5f7';
        e.currentTarget.style.border = '1.5px solid transparent';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
      }}
    >
      <input
        type='text'
        placeholder='Search 40,000+ Products...'
        onChange={(e) => onPatternChange(e.target.value)}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          fontSize: matches ? 13 : 15,
          color: '#222',
          fontFamily: 'inherit',
        }}
      />
      <button
        type='submit'
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: '2px 4px',
          color: '#777',
        }}
        onMouseOver={(e) => (e.currentTarget.style.color = '#00391c')}
        onMouseOut={(e) => (e.currentTarget.style.color = '#777')}
      >
        <svg
          width='19'
          height='19'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='11' cy='11' r='8' />
          <line x1='21' y1='21' x2='16.65' y2='16.65' />
        </svg>
      </button>
    </form>
  );
}

// ─── UserSection ──────────────────────────────────────────────────────────────
function UserSection({ userData, pictureFile, compact, onNavigate }) {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {userData ? (
        <Avatar
          src={pictureFile}
          onClick={() => onNavigate('/userprofile')}
          style={{
            width: compact ? 36 : 38,
            height: compact ? 36 : 38,
            border: '2px solid #00391c',
            cursor: 'pointer',
          }}
        />
      ) : (
        <IconButton
          onClick={() => onNavigate('/loginscreen')}
          size='small'
          style={{ color: '#111' }}
        >
          <PersonOutlineOutlinedIcon style={{ fontSize: 28 }} />
        </IconButton>
      )}
      {!compact && userData && (
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#00391c',
            marginTop: 2,
          }}
        >
          {userData}
        </span>
      )}
    </div>
  );
}

// ─── DrawerContent ────────────────────────────────────────────────────────────
function DrawerContent({ userInformation, pictureFile, onNavigate }) {
  return (
    <Box sx={{ width: 260 }}>
      <div style={styles.drawerHeader}>
        <Avatar
          src={pictureFile || `${serverURL}/images/1.jpg`}
          style={{
            width: 64,
            height: 64,
            border: '3px solid rgba(255,255,255,0.4)',
          }}
        />
        <div style={styles.drawerName}>
          {userInformation?.username || 'Guest'}
        </div>
        <div style={styles.drawerEmail}>{userInformation?.emailid}</div>
        <div style={styles.drawerPhone}>
          {userInformation?.mobileno ? `+91 ${userInformation.mobileno}` : ''}
        </div>
      </div>

      <List sx={{ py: 1 }}>
        <Divider />
        {MENU_ITEMS.map(({ label, Icon, path }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton
              onClick={() => path && onNavigate(path)}
              sx={{
                py: 1,
                '&:hover': { backgroundColor: '#f0faf4', color: '#00391c' },
                '&:hover .MuiListItemIcon-root': { color: '#00391c' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: '#666' }}>
                <Icon fontSize='small' />{' '}
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 0.5 }} />
        <ListItem disablePadding>
          <ListItemButton
            sx={{ py: 1, '&:hover': { backgroundColor: '#fff5f5' } }}
          >
            <ListItemIcon sx={{ minWidth: 38, color: '#c0392b' }}>
              <LogoutIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText
              primary='Logout'
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: 500,
                color: '#c0392b',
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

// ─── MobileSearchBar ──────────────────────────────────────────────────────────
function MobileSearchBar({
  marginTop,
  position,
  matchesSM,
  onDrawerOpen,
  onSearch,
  onPatternChange,
  userData,
  pictureFile,
  onNavigate,
}) {
  return (
    <Box sx={{ flexGrow: 1, position: 'relative', marginTop }}>
      <AppBar
        position={position}
        style={{
          height: 68,
          background: '#fff',
          justifyContent: 'center',
          marginTop: matchesSM ? 0 : 80,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <Toolbar
          style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}
        >
          <IconButton onClick={onDrawerOpen} style={{ color: '#111' }}>
            <MenuOutlinedIcon style={{ fontSize: 28 }} />
          </IconButton>
          <SearchBar
            matches
            onSearch={onSearch}
            onPatternChange={onPatternChange}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <UserSection
              compact
              userData={userData}
              pictureFile={pictureFile}
              onNavigate={onNavigate}
            />
            <IconButton size='small' style={{ color: '#111' }}>
              <PhoneOutlinedIcon style={{ fontSize: 24 }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────
export default function Header(props) {
  const navigate = useNavigate();
  const theme = useTheme();

  const { cart, cartKeys: keys, displayName: userData, userData: userInformation } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [pattern, setPattern] = useState('');
  const [picture, setPicture] = useState({ file: '', bytes: '' });

  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));

  const handleFilterPage = () =>
    navigate('/filterpage', { state: { pattern } });

  useEffect(() => {
    const fetchPicture = async () => {
      if (!userInformation?.mobileno) return;
      const result = await postData('users/check_userdata', {
        mobileno: userInformation.mobileno,
      });
      if (result.status) {
        setPicture({
          file: `${serverURL}/images/${result.data.picture}`,
          bytes: '',
        });
      }
    };
    fetchPicture();
  }, [userInformation?.mobileno]);

  return (
    <Box
      sx={{ flexGrow: 1, zIndex: 100 }}
      onMouseLeave={() => setCartOpen(false)}
    >
      {/* Primary AppBar */}
      <AppBar
        position={props.position}
        style={{
          height: 72,
          background: '#fff',
          justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        }}
      >
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <img
            src={logo}
            style={{ width: 160, cursor: 'pointer', objectFit: 'contain' }}
            alt='MedBazzar Logo'
            onClick={() => navigate('/')}
          />

          {!matches && (
            <SearchBar
              matches={false}
              onSearch={handleFilterPage}
              onPatternChange={setPattern}
            />
          )}
          {matches && <div />}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: matches ? 4 : 16,
            }}
          >
            {!matches && (
              <Tooltip
                title={userData ? '' : 'Sign In'}
                TransitionComponent={Zoom}
                placement='bottom'
              >
                <div>
                  <UserSection
                    userData={userData}
                    pictureFile={picture.file}
                    compact={false}
                    onNavigate={navigate}
                  />
                </div>
              </Tooltip>
            )}

            <Badge
              badgeContent={keys?.length}
              color='success'
              sx={{ cursor: 'pointer' }}
            >
              <div
                onClick={() => navigate('/productcart')}
                onMouseOver={() => setCartOpen(true)}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <ShoppingCartOutlinedIcon
                  style={{ color: '#111', fontSize: 28 }}
                />
              </div>
            </Badge>

            {!matches && (
              <IconButton size='small' style={{ color: '#111' }}>
                <PhoneOutlinedIcon style={{ fontSize: 26 }} />
              </IconButton>
            )}

            {matches && (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                style={{ color: '#111' }}
              >
                <MenuOutlinedIcon style={{ fontSize: 27 }} />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {/* Mobile Secondary Search AppBar */}
      {matches && (
        <MobileSearchBar
          marginTop={props.marginTop}
          position={props.position}
          matchesSM={matchesSM}
          onDrawerOpen={() => setDrawerOpen(true)}
          onSearch={handleFilterPage}
          onPatternChange={setPattern}
          userData={userData}
          pictureFile={picture.file}
          onNavigate={navigate}
        />
      )}

      {/* Sidebar Drawer */}
      <Drawer
        anchor='left'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <DrawerContent
          userInformation={userInformation}
          pictureFile={picture.file}
          onNavigate={navigate}
        />
      </Drawer>

      {/* Cart Preview */}
      <ShowCartProducts isOpen={cartOpen} />
    </Box>
  );
}
