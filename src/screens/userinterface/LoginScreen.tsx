import LogInImage from '../../components/userinterface/LogInImage';
import LogInOTP from '../../components/userinterface/LoginOTP';
import { Grid, Box, useTheme, useMediaQuery, Container } from '@mui/material';
import Header from '../../components/userinterface/Header';

export default function LogInScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f7f6', display: 'flex', flexDirection: 'column' }}>
      <Header position="sticky" />
      
      <Container 
        maxWidth="lg" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          py: { xs: 4, md: 8 }
        }}
      >
        <Grid 
          container 
          spacing={4} 
          alignItems="center" 
          justifyContent="center"
        >
          {!matches && (
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  p: 2
                }}
              >
                <LogInImage />
              </Box>
            </Grid>
          )}

          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <LogInOTP />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
