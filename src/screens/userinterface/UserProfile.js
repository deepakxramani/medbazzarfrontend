import Header from '../../components/userinterface/Header';
import { Grid } from '@mui/material';
import UserInfoProfile from '../../components/userinterface/UserInfoProfile';
import useMediaQuery from '@mui/material/useMediaQuery';
import  {useTheme}  from '@mui/material/styles';
export default function UserProfile() {
    var theme=useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <Header />
    <Grid container style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:matchesMd?180:130}}>
      <UserInfoProfile />
    </Grid>
    </div>
  );
}
