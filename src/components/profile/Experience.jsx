import React from "react";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { Box, Grid, Typography } from "@mui/material";
const Experience = () => {
  const languagesAndTools = [
    "HTML",
    "CSS",
    "ReactJS + Typescript ",
    "NextJS",
    "NodeJs",
    "GitLab",
    "JIRA",
    "Confluence",
    "Slack",
  ];
  const Databases = ["Postgresql", "MySQL", "MongoDB"];
  return (
    <Box sx={{ padding: "0 120px 0 120px", marginTop: "30px" }}>
      <Typography align="center" variant="h4">
        Explore My
      </Typography>
      <Typography align="center" variant="h2" fontWeight={600}>
        Experience
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight={600}>
                Programming Languages and Tools
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                {languagesAndTools.map((item) => (
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={2}>
                        <VerifiedOutlinedIcon />
                      </Grid>
                      <Grid item xs={6}>
                        {item}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight={600}>
                Databases
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                {Databases.map((item) => (
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={2}>
                        <VerifiedOutlinedIcon />
                      </Grid>
                      <Grid item xs={10}>
                        {item}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Experience;
