import LogInImage from "../../components/userinterface/LogInImage";
import LogInOTP from "../../components/userinterface/LoginOTP";
import React from "react";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/userinterface/Header";


export default function LogInScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const matchesMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid container spacing={1}>
      <Header/>
      <Grid item xs={12} style={{marginTop: 60,display: "flex",justifyContent: "center",alignItems: "center",}}>
        <Grid md={6} item>
          {!matches ? (
            <div>
              <LogInImage />
            </div>
          ) : (
            <div></div>
          )}
        </Grid>

        <Grid item xs={12} md={6} style={{marginTop:matchesMdUp?60:120,marginRight: 10, display: "flex", justifyContent: "center" }}>
          <LogInOTP />
        </Grid>
      </Grid>
    </Grid>
  );
}
