import { styled } from "@mui/material/styles";
import { Box, Accordion, Drawer, Grid, Typography } from "@mui/material";

export const TypographyMui = styled("Typography")({
  color: "red",
});
export const WrapDashboard = styled(Box)(() => ({
  background: "white",
  color: "#000",
}));
export const WeatherInforGrid = styled(Grid)(() => ({
  border: "1px solid black",
  padding: "20px",
  borderRadius: "10px",
}));
