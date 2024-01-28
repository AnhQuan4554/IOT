import { styled } from "@mui/material/styles";
import { Box, Accordion, Drawer, Grid, Typography } from "@mui/material";

export const WrapProfileStyled = styled(Box)({
  background: "white",
  color: "#000",
});
export const ImgGridStyled = styled(Grid)({
  position: "relative",
  height: "68vh",
  overflow: "hidden",
});
export const AvatarStyled = styled("img")({
  objectFit: "cover",
  width: "80%",
  maxHeight: "100%",
  borderRadius: "50%",
});
export const InforProfileGridStyled = styled(Grid)({
  padding: "20px",
  border: "1px black solid",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
});
export const ExperienceSkillGrid = styled(Grid)({
  border: "1px black solid",
  borderRadius: "20px",
  padding: "20px",
});
export const WrapSkillGrid = styled(Grid)({
  padding: "20px",
  border: "1px black solid",
  borderRadius: "20px",
  marginTop: "20px",
});
export const WrapProjectImg = styled(Box)({
  maxWidth: "350px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
});
export const TitleProjectTypography = styled(Typography)({
  marginTop: "12px",
  fontWeight: "600",
});
export const ProjectItemGrid = styled(Grid)({
  padding: "20px",
  border: "1px solid black",
  borderRadius: "20px",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
});
