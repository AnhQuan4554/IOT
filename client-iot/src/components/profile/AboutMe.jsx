import { Typography, Box, Grid } from "@mui/material";
import React from "react";
import avatar2 from "../../img/avatar2.jpg";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SchoolIcon from "@mui/icons-material/School";
import { InforProfileGridStyled } from "./ProfileStyled";
const AboutMe = () => {
  return (
    <Box sx={{ padding: "0 120px 0 120px", marginTop: "30px" }}>
      <Typography align="center" variant="h4">
        Get To Know More
      </Typography>
      <Typography align="center" variant="h2">
        About Me
      </Typography>
      <Grid
        container
        columnSpacing={6}
        sx={{ marginTop: "30px" }}
        alignItems={"center"}
      >
        <Grid item xs={4}>
          <img
            src={avatar2}
            style={{
              width: "80%",
              borderRadius: "20px",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            }}
          />
        </Grid>

        <Grid item xs={8}>
          <Grid container xs={12} justifyContent={"space-between"}>
            <InforProfileGridStyled item xs={5.5}>
              <WorkspacePremiumIcon sx={{ fontSize: "40px" }} />
              <Typography variant="h4" fontWeight={600}>
                Experience
              </Typography>
              <Typography variant="h5">1 years</Typography>
              <Typography variant="h5">Frontend Development</Typography>
            </InforProfileGridStyled>
            <InforProfileGridStyled item xs={5.5}>
              <SchoolIcon sx={{ fontSize: "40px" }} />
              <Typography variant="h4" fontWeight={600}>
                Education
              </Typography>
              <Typography variant="h5">4 years</Typography>
              <Typography align="center" variant="h5">
                Posts and Telecommunications Institute of Technology
              </Typography>
            </InforProfileGridStyled>
          </Grid>
          <Grid container xs={12} sx={{ marginTop: "30px" }}>
            <Typography>
              I am a fourth-year Multimedia Technology student at the Posts and
              Telecommunications Institute of Technology (PTIT) with a focus on
              multimedia application development. With a year of experience as a
              front-end developer at Starack, I have cultivated a passion for
              emerging technologies. Eager to apply my skills and enthusiasm to
              contribute effectively in a dynamic work environment
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutMe;
