import React from "react";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { Box, Grid, Typography } from "@mui/material";
import { WrapSkillGrid } from "./ProfileStyled";
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
      <Grid container justifyContent={"space-between"}>
        <WrapSkillGrid item xs={5.5}>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    sx={{ marginBottom: "20px" }}
                  >
                    Frontend Development
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {languagesAndTools.map((item) => (
                      <Grid item xs={6} display={"flex"}>
                        <VerifiedOutlinedIcon sx={{ marginRight: "10px" }} />
                        {item}
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </WrapSkillGrid>

        <WrapSkillGrid item xs={5.5}>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    sx={{ marginBottom: "20px" }}
                  >
                    Databases
                  </Typography>
                </Grid>

                {Databases.map((item) => (
                  <Grid item xs={6} display={"flex"}>
                    <VerifiedOutlinedIcon sx={{ marginRight: "10px" }} />
                    {item}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </WrapSkillGrid>
      </Grid>
    </Box>
  );
};

export default Experience;
