import React from "react";
import {
  AvatarStyled,
  ImgGridStyled,
  WrapProfileStyled,
} from "./ProfileStyled";
import { Grid, Typography } from "@mui/material";
import avatar from "../../img/avatar.jpg";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import AboutMe from "./AboutMe";
import Experience from "./Experience";
const Profile = () => {
  return (
    <WrapProfileStyled>
      <Grid
        sx={{ padding: "0 120px 0 120px" }}
        justifyContent={"space-around"}
        container
        columnSpacing={2}
      >
        <ImgGridStyled item xs={5}>
          <AvatarStyled src={avatar} />
        </ImgGridStyled>
        <Grid
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
          item
          xs={6}
        >
          <Grid item xs={12}>
            <Typography align="center" variant="h3">
              Hello, I'm
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant="h1" fontWeight={"500"}>
              Quan Nguyen
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant="h2" fontWeight={"500"}>
              Frontend Developer
            </Typography>
          </Grid>
          <Grid item xs={12} display={"flex"}>
            <Grid item xs={6}>
              <Link to="https://github.com/AnhQuan4554">
                <IconButton>
                  <GitHubIcon sx={{ minWidth: "150px", minHeight: "60px" }} />
                </IconButton>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to="https://github.com/AnhQuan4554">
                <IconButton>
                  <FacebookRoundedIcon
                    sx={{ minWidth: "150px", minHeight: "60px" }}
                  />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AboutMe />
      <Experience />
    </WrapProfileStyled>
  );
};

export default Profile;
