import { Grid, Box, Typography, } from "@mui/material";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import appstore from '../../../src/assets/appstore.png'
import gplay from '../../../src/assets/gplay.png'
import Container from '@mui/material/Container';
import EmailIcon from '@mui/icons-material/Email';
import Divider from '@mui/material/Divider';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';




export default function FooterComponent(){
    return(
        <Box sx={{background:'#323a46',color:'#A0ABBB', padding:'70px 0px'}}>
        <Container maxWidth={"lg"} >
        <Grid container spacing={6} >

            <Grid item md={6} sm={12}>
                <h4 style={{color:'#A0ABBB', fontSize:18}}>Follow us</h4>
                <div style={{display:'flex',flexDirection:'row', gap:12, paddingTop:10}}>
                <div><FacebookOutlinedIcon style={{color:'#A0ABBB', fontSize:42,}}/></div>
                <div><InstagramIcon style={{color:'#A0ABBB', fontSize:42}}/></div>
                <div><TwitterIcon style={{color:'#A0ABBB', fontSize:42}}/></div>
                <div><LinkedInIcon style={{color:'#A0ABBB', fontSize:42}}/></div>
            </div>
            </Grid>

            <Grid item md={6} sm={12}  >
            <div><h4 style={{color:'#A0ABBB', fontSize:18}}>Download the Mobile app</h4></div>
            <div style={{display:'flex',alignItems:'center',flexDirection:'row', gap:12,paddingTop:10}}>
                <div><img src={gplay} style={{width:120}}/></div>
                <div><img src={appstore} style={{width:128}}/></div>
            </div>
            </Grid>

            <Grid item md={6} sm={12}>
                <Grid container spacing={6}>

                <Grid item xs={4} >
                    <div style={{display:'flex', flexDirection:'column',gap:8}}>
                    <h3>Categories</h3>
                    <span>Mom & Baby</span>
                    <span>Personal Care</span>
                    <span>Health and Fitness</span>
                    <span>Elderly Care</span>
                    <span>Food & Beverages</span>
                    <span>Self & Medication</span>
                    <span>Paper & Wipes</span>
                    <span>Pet Supplies</span>
                    <span>Home Care</span>
                    <span>Sexual Wellness</span>
                    <span>Ortho Belts & Supports</span>
                    <span>Mobility & Rehab</span>
                    </div>
                </Grid>

                <Grid item xs={4} >
                    <div style={{display:'flex', flexDirection:'column',gap:8}}>
                    <h3>Medicines</h3>
                    <span>Buy Medicines</span>
                    <span>Upload Prescription</span>
                    </div>
                </Grid>

                <Grid item xs={4} >
                    <div style={{display:'flex', flexDirection:'column',gap:8}}>
                    <h3>Others</h3>
                    <span>Offers</span>
                    <span>Blogs</span>
                    <span>terms & Conditions</span>
                    <span>Privacy Policy</span>
                    <span>Store Locator</span>
                    </div>
                </Grid>

                </Grid>
            </Grid>

            <Grid item md={6} sm={12}>
                <div style={{display:"flex", flexDirection:'column',gap: '30px'}}>
                    <div style={{display:'flex',alignItems:'center', gap:'30px'}}>
                        <EmailIcon style={{fontSize:35}}/>
                        <div style={{display: 'flex',flexDirection: 'column'}}>
                            <h4>Email us</h4>
                            <Typography variant='h6'>info@medbazzar.in</Typography>
                        </div>
                    </div>

                    <div style={{display:'flex',alignItems:'center', gap:'30px'}}>
                        <PhoneInTalkIcon style={{fontSize:35}}/>
                        <div style={{display: 'flex',flexDirection: 'column'}}>
                            <h4>Give us missed call</h4>
                            <Typography variant='h6'>786675767979</Typography>
                        </div>
                    </div>
                    <Divider style={{background:'#A0ABBB'}}/>
                    <div style={{display: 'flex',flexDirection: 'column',gap:10}}>
                        <h3>15 years of trust</h3>
                        <Typography >
                        Over the last 15 years, we have touched the lives of lakhs of Indian families by serving them with only the best quality and genuine healthcare products. With over 300+ stores, a comprehensive website and an easy-to-use app, it is only true to say that Wellness Forever is the one-stop destination for your wellness needs be it online or offline. Copyright MedBazzar 2024.
                        </Typography>
                    </div>
                </div>
            </Grid>


        </Grid>
        </Container>
        </Box>
    )
}