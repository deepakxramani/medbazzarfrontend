import { Grid } from "@mui/material"
import React from "react"
import loginImage from "../../assets/login.webp"
import loginImg from "../../assets/login-img.png"


export default function LogInImage(){
    return(
        <Grid container spacing={2} >

            <Grid item xs={12}>
                <div>
                    <img src={loginImg} width={'95%'} alt="login-cover" />
                </div>
            </Grid>

        </Grid>
    )
}