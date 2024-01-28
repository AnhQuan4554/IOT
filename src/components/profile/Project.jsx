import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Pte from "../../img/pte.png";
import Tymlez from "../../img/TYMLEZ.jpg";
import TW from "../../img/tianwei-signature.png";
import {
  ProjectItemGrid,
  TitleProjectTypography,
  WrapProjectImg,
} from "./ProfileStyled";
const Project = () => {
  return (
    <Box
      sx={{
        padding: "0 120px 0 120px",
        marginTop: "50px",
        marginBottom: "100px",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h2"
            fontWeight={600}
            marginBottom={"30px"}
          >
            Projects
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent={"space-between"}>
            <ProjectItemGrid item xs={3.8}>
              <WrapProjectImg>
                <img
                  style={{
                    width: "350px",
                    height: "250px",
                    borderRadius: "40px",
                    objectFit: "contain",
                  }}
                  src={Tymlez}
                />
              </WrapProjectImg>
              <TitleProjectTypography variant="h4" align="center">
                TYMLEZ
              </TitleProjectTypography>
              <Typography>
                The Platform provides companies with a secure, scalable, and
                sustainable solution to monitor and report on their
                carbon-neutral initiatives
              </Typography>
            </ProjectItemGrid>
            <ProjectItemGrid item xs={3.8}>
              <WrapProjectImg>
                <img
                  style={{
                    width: "350px",
                    height: "250px",
                    borderRadius: "40px",
                  }}
                  src={Pte}
                />
              </WrapProjectImg>
              <TitleProjectTypography variant="h4" align="center">
                PTE MAGIC
              </TitleProjectTypography>
              <Typography>
                PTE Magic is an online Learning system with integration to AI
                (NLP).
              </Typography>
            </ProjectItemGrid>
            <ProjectItemGrid item xs={3.8}>
              <WrapProjectImg>
                <img
                  style={{
                    width: "350px",
                    height: "250px",
                    borderRadius: "40px",
                  }}
                  src={TW}
                />
              </WrapProjectImg>
              <TitleProjectTypography variant="h4" align="center">
                TW-CRM
              </TitleProjectTypography>
              <Typography>
                To customize Zoho CRM to enhance the efficiency and
                effectiveness of Relacto, a meal ordering and delivery service.
              </Typography>
            </ProjectItemGrid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Project;
